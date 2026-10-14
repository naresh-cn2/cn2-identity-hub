# reviews + enquiries API E2E -- ASCII only (PowerShell reads no-BOM .ps1 as ANSI).
# Needs a local server with fresh in-memory rate windows (restart it first):
# each suite's last call intentionally ends on its own per-IP 429 limiter.
param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$pass = 0
$fail = 0

function Assert([string]$name, [bool]$cond) {
    if ($cond) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

function Post-Path([string]$path, $body) {
    # Base fallback: on the CI runner the server answers GETs on localhost
    # but POSTs to 127.0.0.1 get refused - so try every loopback spelling
    # and cache the one that actually reaches the app. Transport failures
    # never reached the server, so retrying cannot double-count against
    # the rate limiter; a real HTTP answer is returned as-is.
    $bases = @($base, "http://127.0.0.1:3000", "http://[::1]:3000")
    if ($script:apiBase) { $bases = @($script:apiBase) + @($bases | Where-Object { $_ -ne $script:apiBase }) }
    $lastErr = $null
    foreach ($b in $bases) {
        try {
            $r = Invoke-WebRequest -Uri ($b + $path) -Method Post -ContentType "application/json" -Body $body -UseBasicParsing -TimeoutSec 30
            $script:apiBase = $b
            return @{ code = $r.StatusCode; body = ($r.Content | ConvertFrom-Json -ErrorAction SilentlyContinue) }
        } catch {
            $code = $null
            try { $code = $_.Exception.Response.StatusCode.value__ } catch { }
            if ($code -ne $null) {
                $script:apiBase = $b
                $raw = ""
                if ($_.ErrorDetails -and $_.ErrorDetails.Message) {
                    $raw = $_.ErrorDetails.Message
                } else {
                    try {
                        $stream = $_.Exception.Response.GetResponseStream()
                        $reader = New-Object System.IO.StreamReader($stream)
                        $raw = $reader.ReadToEnd()
                    } catch { }
                }
                return @{ code = $code; body = ($raw | ConvertFrom-Json -ErrorAction SilentlyContinue) }
            }
            $lastErr = $_
            Write-Host ("diag-post-transport " + $b + " " + $_.Exception.Message)
        }
    }
    Write-Host ("diag-post-error all bases failed: " + $lastErr.Exception.Message)
    return @{ code = $null; body = $null }
}

function Post-RV($body) { Post-Path "/api/testimonials" $body }
function Post-EN($body) { Post-Path "/api/enquiries" $body }

function Get-Path([string]$path) {
    $bases = @($base, "http://127.0.0.1:3000", "http://[::1]:3000")
    if ($script:apiBase) { $bases = @($script:apiBase) + @($bases | Where-Object { $_ -ne $script:apiBase }) }
    foreach ($b in $bases) {
        try {
            $r = Invoke-WebRequest -Uri ($b + $path) -UseBasicParsing -TimeoutSec 30
            $script:apiBase = $b
            return @{ code = $r.StatusCode; body = ($r.Content | ConvertFrom-Json -ErrorAction SilentlyContinue) }
        } catch {
            $code = $null
            try { $code = $_.Exception.Response.StatusCode.value__ } catch { }
            if ($code -ne $null) { $script:apiBase = $b; return @{ code = $code; body = $null } }
        }
    }
    return @{ code = $null; body = $null }
}

$now = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$tpl = @{
    name = "Suite Tester"; role = "Founder"; organization = ""; relationship = "client"
    work = "crypto-platform"; workKind = "project"; rating = 5
    feedback = "Automated suite feedback with enough words to pass validation."
    attribution = "full"; consent = $true; website = ""; startedMs = ($now - 5000)
}
$valid = $tpl | ConvertTo-Json
$hp = $tpl.Clone(); $hp["website"] = "http://spam.example"
$bad = $tpl.Clone(); $bad["rating"] = 7
$linky = $tpl.Clone(); $linky["feedback"] = "See http://example.com for details about this fine work everyone."

Write-Host "== reviews API =="
$t1 = Post-RV $valid
Assert "valid submission accepted" ($t1.code -eq 200 -and $t1.body.ok -eq $true)
Assert "not published without a token" ($t1.body.published -eq $false)

$t2 = Post-RV ($hp | ConvertTo-Json)
Assert "honeypot returns fake success" ($t2.code -eq 200 -and $t2.body.ok -eq $true)
Assert "honeypot carries no message" ([string]::IsNullOrEmpty($t2.body.message))

$t3 = Post-RV ($linky | ConvertTo-Json)
Assert "linked feedback rejected 400" ($t3.code -eq 400)
Assert "feedback field error surfaced" (@($t3.body.errors | Where-Object { $_.field -eq "feedback" }).Count -gt 0)

$t4 = Post-RV ($bad | ConvertTo-Json)
Assert "rate limiter engages (429)" ($t4.code -eq 429)

# diagnostic line for CI annotations — actual codes and truncated bodies
foreach ($t in @(@("t1-valid", $t1), @("t2-honeypot", $t2), @("t3-linky", $t3), @("t4-limiter", $t4))) {
    $b = ""
    try { $b = ($t[1].body | ConvertTo-Json -Compress -Depth 5) } catch { }
    if (-not $b) { $b = "<empty>" }
    if ($b.Length -gt 200) { $b = $b.Substring(0, 200) }
    Write-Host ("diag " + $t[0] + " code=" + $t[1].code + " body=" + $b)
}

Write-Host ""
Write-Host "== health endpoint =="
$h1 = Get-Path "/api/health"
Assert "health responds 200" ($h1.code -eq 200)
Assert "health payload ok" ($h1.body.ok -eq $true)

Write-Host ""
Write-Host "== enquiries API =="
$enow = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$etpl = @{
    name = "Suite Enquirer"; email = "enquirer@example.com"; organization = "Example Org"
    projectType = "freelance"
    problem = "We need a point-in-time correct backfill with deterministic replay and clear failure states."
    deliverables = "A reproducible research harness."; timeline = "one-to-three-months"; budget = ""
    website = ""; startedMs = ($enow - 5000)
}
$evalid = $etpl | ConvertTo-Json
$ehp = $etpl.Clone(); $ehp["website"] = "http://spam.example"
$ebad = $etpl.Clone(); $ebad["email"] = "not-an-email"

$e1 = Post-EN $evalid
Assert "enquiry accepted 200" ($e1.code -eq 200 -and $e1.body.ok -eq $true)
Assert "enquiry carries a real success message" ($e1.body.message -match "received")

$e2 = Post-EN ($ehp | ConvertTo-Json)
Assert "enquiry honeypot fakes success" ($e2.code -eq 200 -and $e2.body.ok -eq $true)
Assert "enquiry honeypot carries no message" ([string]::IsNullOrEmpty($e2.body.message))

$e3 = Post-EN ($ebad | ConvertTo-Json)
Assert "invalid email rejected 400" ($e3.code -eq 400)
Assert "email field error surfaced" (@($e3.body.errors | Where-Object { $_.field -eq "email" }).Count -gt 0)

$e4 = Post-EN "this-is-not-json"
Assert "malformed body rejected 400" ($e4.code -eq 400)

$e5 = Post-EN $evalid
Assert "duplicate enquiry deduped 200" ($e5.code -eq 200 -and $e5.body.ok -eq $true)

$e6 = Post-EN $evalid
Assert "enquiry rate limiter engages (429)" ($e6.code -eq 429)

foreach ($t in @(@("e1-valid", $e1), @("e2-honeypot", $e2), @("e3-bad-email", $e3), @("e4-malformed", $e4), @("e5-dup", $e5), @("e6-limiter", $e6))) {
    $b = ""
    try { $b = ($t[1].body | ConvertTo-Json -Compress -Depth 5) } catch { }
    if (-not $b) { $b = "<empty>" }
    if ($b.Length -gt 200) { $b = $b.Substring(0, 200) }
    Write-Host ("diag " + $t[0] + " code=" + $t[1].code + " body=" + $b)
}

Write-Host ""
Write-Host ("TOTAL: " + ($pass + $fail) + "  PASS: " + $pass + "  FAIL: " + $fail)
if ($fail -gt 0) { exit 1 }
exit 0
