# reviews API E2E -- ASCII only (PowerShell reads no-BOM .ps1 as ANSI).
# Needs a local server with fresh in-memory rate windows (restart it first):
# the 4 calls below intentionally end on the per-IP 429 limiter.
param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$pass = 0
$fail = 0

function Assert([string]$name, [bool]$cond) {
    if ($cond) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

function Post-RV($body) {
    try {
        $r = Invoke-RestMethod -Uri ($base + "/api/testimonials") -Method Post -ContentType "application/json" -Body $body -TimeoutSec 30
        return @{ code = 200; body = $r }
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
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

Write-Host ""
Write-Host ("TOTAL: " + ($pass + $fail) + "  PASS: " + $pass + "  FAIL: " + $fail)
if ($fail -gt 0) { exit 1 }
