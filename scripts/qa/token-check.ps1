# design-token contrast check -- ASCII only (PowerShell reads no-BOM .ps1 as ANSI).
# Static: parses app/globals.css directly, no server needed. Asserts every
# text token reaches WCAG AA (>= 4.5:1) on every reading surface in both
# themes. Covers foreground, muted, faint, signal and research against
# background, surface and surface-2.
$ErrorActionPreference = "Stop"
$pass = 0
$fail = 0

function Assert([string]$name, [bool]$cond) {
    if ($cond) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

function Get-Luminance([string]$hex) {
    $r = [Convert]::ToInt32($hex.Substring(1, 2), 16)
    $g = [Convert]::ToInt32($hex.Substring(3, 2), 16)
    $b = [Convert]::ToInt32($hex.Substring(5, 2), 16)
    $chans = @($r, $g, $b) | ForEach-Object {
        $c = $_ / 255.0
        if ($c -le 0.03928) { $c / 12.92 } else { [math]::Pow(($c + 0.055) / 1.055, 2.4) }
    }
    $arr = @($chans)
    return 0.2126 * $arr[0] + 0.7152 * $arr[1] + 0.0722 * $arr[2]
}

function Get-Contrast([string]$fg, [string]$bg) {
    $l1 = Get-Luminance $fg
    $l2 = Get-Luminance $bg
    $hi = [math]::Max($l1, $l2)
    $lo = [math]::Min($l1, $l2)
    return ($hi + 0.05) / ($lo + 0.05)
}

$cssPath = Join-Path $PSScriptRoot "..\..\app\globals.css"
$css = Get-Content -Raw $cssPath

function Get-Block([string]$source, [string]$selector) {
    $m = [regex]::Match($source, [regex]::Escape($selector) + "\s*\{([^}]*)\}")
    if (-not $m.Success) { return $null }
    return $m.Groups[1].Value
}

function Get-Token([string]$block, [string]$name) {
    if ($null -eq $block) { return $null }
    $m = [regex]::Match($block, [regex]::Escape($name) + ":\s*(#[0-9a-fA-F]{6})")
    if (-not $m.Success) { return $null }
    return $m.Groups[1].Value
}

$rootBlock = Get-Block $css ":root"
$darkBlock = Get-Block $css ".dark"

$textTokens = @("--foreground", "--muted", "--faint", "--signal", "--research")
$surfaces = @("--background", "--surface", "--surface-2")
$threshold = 4.5

Write-Host "== token contrast (WCAG AA, >= 4.5:1 on all reading surfaces) =="
Assert ":root token block parsed" ($null -ne $rootBlock)
Assert ".dark token block parsed" ($null -ne $darkBlock)

$allWorst = @{}
foreach ($theme in @(@( "light", $rootBlock ), @( "dark", $darkBlock ))) {
    $themeName = $theme[0]
    $block = $theme[1]
    $worst = 99.0
    $worstLabel = ""
    $parsed = $true
    foreach ($tok in $textTokens) {
        $fg = Get-Token $block $tok
        if ($null -eq $fg) { $parsed = $false; continue }
        foreach ($srf in $surfaces) {
            $bg = Get-Token $block $srf
            if ($null -eq $bg) { $parsed = $parsed -and $false; continue }
            $ratio = Get-Contrast $fg $bg
            Write-Host ("  {0,-5} {1,-13} on {2,-13} {3,5:N2}" -f $themeName, $tok, $srf, $ratio)
            if ($ratio -lt $worst) { $worst = $ratio; $worstLabel = "$tok on $srf = $([math]::Round($ratio, 2))" }
        }
    }
    $allWorst[$themeName] = $worstLabel
    Assert ("$themeName tokens all present") $parsed
    Assert ("$themeName worst pair >= $threshold" + " ($worstLabel)") ($worst -ge $threshold)
}

Write-Host ""
Write-Host ("TOTAL: " + ($pass + $fail) + "  PASS: " + $pass + "  FAIL: " + $fail)
if ($fail -gt 0) { exit 1 }
exit 0
