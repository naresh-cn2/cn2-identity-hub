# internal link crawler -- ASCII only (PowerShell reads no-BOM .ps1 as ANSI).
# Crawls a fixed set of seed routes, extracts every internal <a href>, and
# asserts: (1) no dead href="#" links anywhere, (2) every unique internal
# destination resolves (200 after redirects). External links are listed but
# not fetched -- offline CI must not depend on third-party availability.
param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$pass = 0
$fail = 0

function Assert([string]$name, [bool]$cond) {
    if ($cond) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

$seeds = @(
    "/", "/hub", "/work", "/research", "/articles", "/case-studies",
    "/services", "/credentials", "/capabilities", "/intelligence", "/proof",
    "/lab", "/about", "/contact", "/links", "/cv", "/opportunities",
    "/testimonials", "/how-i-work", "/privacy", "/terms", "/work-with-me",
    "/research/lookahead-bias", "/work/crypto-platform",
    "/services/deterministic-backtesting", "/articles/determinism-is-not-validity"
)

$internal = New-Object System.Collections.Generic.HashSet[string]
$dead = @()
$badSeeds = @()
$external = 0

Write-Host "== crawl: extracting internal links from $($seeds.Count) seed routes =="
foreach ($seed in $seeds) {
    try {
        $html = (Invoke-WebRequest -Uri ($base + $seed) -UseBasicParsing -TimeoutSec 30).Content
    } catch {
        $badSeeds += $seed
        continue
    }
    if ($html -match 'href="#"') { $dead += "$seed -> href=""#""" }
    $anchorMatches = [regex]::Matches($html, '<a\s[^>]*?href="([^"]+)"')
    foreach ($m in $anchorMatches) {
        $href = $m.Groups[1].Value
        if ($href -eq "#") { $dead += "$seed -> href=""#"""; continue }
        if ($href -match "^(mailto:|tel:|javascript:)") { continue }
        $target = $null
        if ($href.StartsWith("/")) {
            $target = $href
        } elseif ($href.StartsWith($base)) {
            $target = $href.Substring($base.Length)
            if ($target -eq "") { $target = "/" }
        } else {
            $external++
            continue
        }
        # strip query and fragment; skip asset and API namespaces
        $target = ($target -split "\?")[0]
        $target = ($target -split "#")[0]
        if ($target -eq "") { $target = "/" }
        if ($target -match "^(/_next/|/api/)") { continue }
        [void]$internal.Add($target)
    }
}

Assert "every seed route reachable" ($badSeeds.Count -eq 0)
if ($badSeeds.Count -gt 0) { foreach ($s in $badSeeds) { Write-Host ("    seed failed: " + $s) -ForegroundColor Red } }
Assert "no dead href=# links" ($dead.Count -eq 0)
if ($dead.Count -gt 0) { foreach ($d in $dead | Select-Object -Unique) { Write-Host ("    dead: " + $d) -ForegroundColor Red } }
Assert "internal links discovered" ($internal.Count -gt 30)

Write-Host "== resolve: checking $($internal.Count) unique internal destinations =="
$broken = @()
foreach ($target in ($internal | Sort-Object)) {
    $code = 0
    try {
        $r = Invoke-WebRequest -Uri ($base + $target) -UseBasicParsing -TimeoutSec 30
        $code = [int]$r.StatusCode
    } catch {
        try { $code = [int]$_.Exception.Response.StatusCode.value__ } catch { $code = 0 }
    }
    if ($code -ne 200) {
        $broken += "$target -> HTTP $code"
        Write-Host ("    broken: " + $target + " -> HTTP " + $code) -ForegroundColor Red
    }
}
Assert ("all " + $internal.Count + " internal destinations return 200") ($broken.Count -eq 0)
Write-Host ("  info: " + $external + " external links left unchecked (by design)")

Write-Host ""
Write-Host ("TOTAL: " + ($pass + $fail) + "  PASS: " + $pass + "  FAIL: " + $fail)
if ($fail -gt 0) { exit 1 }
exit 0
