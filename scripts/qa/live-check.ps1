# live-motion-pass QA — ASCII only (PowerShell reads no-BOM .ps1 as ANSI).
param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$pass = 0
$fail = 0

function Get-Page([string]$path) {
    (Invoke-WebRequest -Uri ($base + $path) -UseBasicParsing).Content
}

# Like Get-Page but reads the body of an expected non-2xx (e.g. 404).
function Get-ErrorPage([string]$path) {
    try { return (Invoke-WebRequest -Uri ($base + $path) -UseBasicParsing).Content }
    catch {
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            if ($stream.CanSeek) { $stream.Position = 0 }
            $reader = New-Object System.IO.StreamReader($stream)
            $body = $reader.ReadToEnd()
            $reader.Dispose()
            return $body
        } catch { return "" }
    }
}

function Assert([string]$name, [bool]$cond) {
    if ($cond) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

Write-Host "== hero identity regression lock (P1-F) =="
$heroHtml = Get-Page "/"
Assert "hero identity: QUANTITATIVE DEVELOPER present and former tagline absent" ($heroHtml.Contains("QUANTITATIVE DEVELOPER") -and (-not $heroHtml.Contains("AI-NATIVE SYSTEMS ARCHITECT")))

Write-Host "== stylesheet: new live-motion CSS =="
$homeHtml = Get-Page "/"
$cssLinks = [regex]::Matches($homeHtml, 'href="(/_next/static/[^"]+\.css)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
Assert "stylesheet link found" ($cssLinks.Count -gt 0)
$css = ($cssLinks | ForEach-Object { (Invoke-WebRequest -Uri ($base + $_) -UseBasicParsing).Content }) -join "`n"
Assert "cn2-cta-sheen keyframes" $css.Contains("cn2-cta-sheen")
Assert "cn2-nudge-x keyframes" $css.Contains("cn2-nudge-x")
Assert "cn2-nudge-y keyframes" $css.Contains("cn2-nudge-y")
Assert "cn2-flow-drop keyframes" $css.Contains("cn2-flow-drop")
Assert "cn2-rule-sweep keyframes" $css.Contains("cn2-rule-sweep")
Assert "arr-live utility" $css.Contains(".arr-live")
Assert "arr-down utility" $css.Contains(".arr-down")
Assert "flow-live utility" $css.Contains(".flow-live")
Assert "signal-rule sweep animation" $css.Contains(".signal-rule")
Assert "research-rule sweep animation" $css.Contains(".research-rule")
Assert "reduced-motion kill for sheen" ($css -match 'a\.corner-ticks[^}]*animation:\s*none')
Assert "reduced-motion kill for flow dot" ($css -match '\.flow-live:?after[^}]*animation:\s*none')

Write-Host "== site ambience layer: present on inner routes =="
foreach ($p in @("/work", "/work/crypto-platform", "/research/lookahead-bias", "/articles", "/case-studies", "/services", "/credentials", "/contact", "/cv")) {
    $html = Get-Page $p
    Assert ("ambience on " + $p) $html.Contains("fixed inset-0 -z-10")
    Assert ("ambience canvas on " + $p) $html.Contains("cn2-atmosphere-plain")
}

Write-Host "== site ambience layer: excluded routes stay untouched =="
foreach ($p in @("/", "/hub", "/about", "/identity")) {
    $html = Get-Page $p
    Assert ("no ambience on " + $p) (-not $html.Contains("fixed inset-0 -z-10"))
}

Write-Host "== per-route ambience variant mapping =="
$html = Get-Page "/research/lookahead-bias"
Assert "research uses lattice variant (canvas has cn2-atmosphere-plain only, variant drawn client-side)" $html.Contains("cn2-atmosphere-plain")

Write-Host "== micro-motion markup =="
$buildsHtml = Get-Page "/work"
Assert "showcase ENTER arrow has arr-live" ($buildsHtml -match 'arr-live[^>]*>\s*(<span[^>]*>)?\s*\u2192|\barr-live\b')
Assert "CTA sheen targets rendered anchors" $buildsHtml.Contains("corner-ticks")

$worldHtml = Get-Page "/work/crypto-platform"
Assert "world EXPLORE arrow has arr-down" $worldHtml.Contains("arr-down")
Assert "world section diamond breathes" $worldHtml.Contains("anim-breathe")
Assert "arch-flow spine pulse wired" $worldHtml.Contains("flow-live")
Assert "flow delay stagger set" ($worldHtml -match 'flow-delay')
Assert "world nav still derives" $worldHtml.Contains("ENTER ITS WORLD") -or $worldHtml.Contains("OVERVIEW")

$hubHtml = Get-Page "/hub"
Assert "hub destination arrow nudges" $hubHtml.Contains("arr-live")
Assert "hub explore arrow nudges" $hubHtml.Contains("arr-down")

$articleHtml = Get-Page "/articles/determinism-is-not-validity"
Assert "article research rule present" $articleHtml.Contains("research-rule")

$navHtml = Get-Page "/capabilities"
Assert "navbar signal rule present" $navHtml.Contains("signal-rule")

Write-Host "== navigation surface (minimal bar: brand + search + theme) =="
$capNav = Get-Page "/capabilities"
Assert "no primary nav strip on inner pages" (-not ($capNav -match 'aria-label="Primary"'))
Assert "no MENU trigger rendered" (-not ($capNav.Contains('aria-controls="mobile-menu"')))
Assert "no menu overlay rendered" (-not ($capNav.Contains('id="mobile-menu"')))
Assert "brand lockup on inner page" $capNav.Contains("CN2.DEV")
Assert "search present on inner page" $capNav.Contains("Open search")
Assert "theme toggle present on inner page" ($capNav.Contains("Switch to light mode") -or $capNav.Contains("Switch to dark mode"))
Assert "destinations still indexed in footer" ($capNav.Contains('href="/work"') -and $capNav.Contains('href="/research"'))
Assert "bottom-left back on inner page" $capNav.Contains("Go back to the previous page")
$homeNav = Get-Page "/"
Assert "entry panel keeps brand + search" ($homeNav.Contains("Open search") -and $homeNav.Contains("CN2.DEV"))
Assert "no back button on entry page" (-not $homeNav.Contains("Go back to the previous page"))
$idNav2 = Get-Page "/identity"
Assert "no back button on identity page" (-not $idNav2.Contains("Go back to the previous page"))
$hubNav2 = Get-Page "/hub"
Assert "return to entrance gone from hub" (-not $hubNav2.Contains("RETURN TO ENTRANCE"))

Write-Host "== route migration (IA v4: WORK & CREDENTIALS) =="
function Get-StatusAndLocation($path) {
    try {
        $r = Invoke-WebRequest -Uri ($base + $path) -MaximumRedirection 0 -UseBasicParsing -ErrorAction Stop
        $loc = [string]$r.Headers.Location
        if (-not $loc) { $loc = [string]$r.Headers["Location"] }
        return [pscustomobject]@{ code = [int]$r.StatusCode; loc = $loc }
    } catch {
        $resp = $_.Exception.Response
        if ($null -eq $resp) { return [pscustomobject]@{ code = 0; loc = "" } }
        $loc = [string]$resp.Headers.Location
        if (-not $loc) { $loc = [string]$resp.Headers["Location"] }
        return [pscustomobject]@{ code = [int]$resp.StatusCode; loc = $loc }
    }
}
$m1 = Get-StatusAndLocation "/builds"
Assert "permanent redirect /builds → /work" (($m1.code -eq 301 -or $m1.code -eq 308) -and $m1.loc -match "/work$")
$m2 = Get-StatusAndLocation "/builds/crypto-platform"
Assert "permanent redirect /builds/crypto-platform → /work/crypto-platform" (($m2.code -eq 301 -or $m2.code -eq 308) -and $m2.loc -match "/work/crypto-platform$")
$m3 = Get-StatusAndLocation "/certifications"
Assert "permanent redirect /certifications → /credentials" (($m3.code -eq 301 -or $m3.code -eq 308) -and $m3.loc -match "/credentials$")
$m4 = Get-StatusAndLocation "/quant"
Assert "permanent redirect /quant → /work" (($m4.code -eq 301 -or $m4.code -eq 308) -and $m4.loc -match "/work$")

Write-Host "== WORK landing (IA v4) =="
Assert "hero subhead PRODUCTS. PROJECTS. ENGINEERING." $buildsHtml.Contains("PRODUCTS. PROJECTS. ENGINEERING.")
Assert "work title is Work" ((Get-Page "/work") -match "<title>[^<]*Work")
Assert "credentials title is Credentials" ((Get-Page "/credentials") -match "<title>[^<]*Credentials")

Write-Host "== testimonials & reviews =="
$tHtml = Get-Page "/testimonials"
Assert "testimonials page loads" $tHtml.Contains("TESTIMONIALS")
Assert "premium empty state present" $tHtml.Contains("THIS SPACE EARNS ITS CONTENT")
Assert "legacy placeholder gone" (-not $tHtml.Contains("NO TESTIMONIALS TO SHOW"))
Assert "WHAT PEOPLE SAY heading" $tHtml.Contains("WHAT PEOPLE SAY")
Assert "HAVE YOU WORKED WITH ME heading" $tHtml.Contains("HAVE YOU WORKED WITH ME")
Assert "share form rendered" $tHtml.Contains("rv-feedback")
Assert "rating radiogroup present" $tHtml.Contains("radiogroup")
Assert "honeypot field wired" $tHtml.Contains("rv-website")
Assert "consent control present" ($tHtml.Contains("rv-consent") -or $tHtml.Contains("consent"))
Assert "footer indexes testimonials route" ($tHtml.Contains('href="/testimonials">21'))
Assert "no endorsement strip without data" (-not $tHtml.Contains("FEEDBACK FROM THE WORK ITSELF"))
$hubHtml2 = Get-Page "/hub"
Assert "hub secondary links testimonials" ($hubHtml2 -match 'TESTIMONIALS')
$contactHtml2 = Get-Page "/contact"
Assert "contact LEAVE FEEDBACK card" $contactHtml2.Contains("LEAVE FEEDBACK")

Write-Host "== cinematic pass =="
Assert "kinetic rise keyframes" $css.Contains("kt-rise")
Assert "route veil keyframes" $css.Contains("curtain-veil-fade")
Assert "tilt card styles" $css.Contains(".tilt-card")
Assert "cursor light styles" $css.Contains(".cursor-light-dot")
Assert "scroll reel styles" $css.Contains(".scroll-progress-bar")
Assert "star twinkle styles" $css.Contains("star-twinkle")
Assert "kinetic heading rendered" $buildsHtml.Contains("kt-word")
Assert "kinetic aria label intact" $buildsHtml.Contains('aria-label="WORK"')
Assert "scroll reel on inner page" $buildsHtml.Contains("scroll-progress-bar")
Assert "cursor light on inner page" $buildsHtml.Contains("cursor-light-dot")
Assert "cursor light off on hub" (-not $hubHtml.Contains("cursor-light-dot"))
Assert "cursor light off on identity" (-not $idNav2.Contains("cursor-light-dot"))
Assert "palette spring hook" $buildsHtml.Contains('data-open="false"')
$wwmHtml = Get-Page "/work-with-me"
Assert "accent heading label assembled" $wwmHtml.Contains('aria-label="WORK WITH ME"')

Write-Host "== conversion core (enquiry form) =="
Assert "contact hosts the enquiry form" $contactHtml2.Contains("PROJECT ENQUIRY")
Assert "enquiry problem field rendered" $contactHtml2.Contains("eq-problem")
Assert "enquiry honeypot rendered" $contactHtml2.Contains("eq-website")
Assert "enquiry submit rendered" $contactHtml2.Contains("SEND ENQUIRY")
Assert "privacy note shown above submit" $contactHtml2.Contains("PRIVACY PAGE FOR THE FULL DATA HANDLING")
Assert "copy-email button mounted" $contactHtml2.Contains("COPY ADDRESS")

Write-Host "== service detail completeness =="
$svcHtml = Get-Page "/services/deterministic-backtesting"
Assert "slug page shows per-service process" $svcHtml.Contains("HOW THIS ENGAGEMENT RUNS")
Assert "slug page has ordered process stages" ($svcHtml -match "<ol[^>]*>[^<]*<li")
Assert "slug page shows WHO THIS IS FOR" $svcHtml.Contains("WHO THIS IS FOR")
Assert "services index shows WHO THIS IS FOR" ((Get-Page "/services").Contains("WHO THIS IS FOR"))

Write-Host "== process page: real links only =="
$hiwHtml = Get-Page "/how-i-work"
Assert "no dead href=# links" (-not $hiwHtml.Contains('href="#"'))
Assert "step anchors rendered" $hiwHtml.Contains('id="step-discover"')
Assert "next-step chain wired" $hiwHtml.Contains('href="#step-define"')
Assert "last step routes to contact" ($hiwHtml.Contains("START THE CONVERSATION") -and $hiwHtml.Contains('href="/contact"'))

Write-Host "== trust pages & 404 =="
$privacyHtml = Get-Page "/privacy"
Assert "privacy loads" ($privacyHtml -match "<title>[^<]*Privacy")
Assert "privacy states no tracking" $privacyHtml.Contains("NO TRACKING. NO SURPRISES.")
$termsHtml = Get-Page "/terms"
Assert "terms loads" ($termsHtml -match "<title>[^<]*Terms")
Assert "terms plain-terms heading" $termsHtml.Contains("PLAIN TERMS.")
Assert "footer links privacy" ($termsHtml.Contains('href="/privacy"'))
Assert "footer links terms" ($termsHtml.Contains('href="/terms"'))
$indexHtml = Get-Page "/links"
Assert "links index lists privacy" $indexHtml.Contains('href="/privacy"')
$nf = Get-StatusAndLocation "/this-route-does-not-exist"
Assert "unknown route answers 404" ($nf.code -eq 404)
$nfHtml = Get-ErrorPage "/this-route-does-not-exist"
Assert "custom 404 renders" $nfHtml.Contains("THIS COORDINATE DOES NOT EXIST.")
Assert "custom 404 offers destinations" ($nfHtml.Contains("SUGGESTED DESTINATIONS") -and $nfHtml.Contains('href="/work"'))

Write-Host "== sitemap completeness =="
$sitemapXml = Get-Page "/sitemap.xml"
foreach ($entry in @("/testimonials", "/how-i-work", "/privacy", "/terms")) {
    Assert ("sitemap contains " + $entry) $sitemapXml.Contains("<loc>https://cn2-identity-hub.vercel.app" + $entry + "</loc>")
}

Write-Host "== head tags: share card, icons, JSON-LD =="
foreach ($p in @("/contact", "/hub", "/work", "/research", "/privacy", "/services")) {
    Assert ("og:image on " + $p) ((Get-Page $p).Contains('property="og:image"'))
}
Assert "twitter card present" $contactHtml2.Contains('name="twitter:card"')
Assert "manifest linked" $contactHtml2.Contains('rel="manifest"')
Assert "icon linked" ($contactHtml2.Contains('rel="icon"'))
Assert "JSON-LD Person injected" $contactHtml2.Contains('"@type":"Person"')

Write-Host "== landmark sanity =="
$homeOnly = Get-Page "/"
$mainCount = ([regex]::Matches($homeOnly, "<main[ >]")).Count
Assert "entry page has exactly one <main>" ($mainCount -eq 1)

Write-Host ""
Write-Host ("TOTAL: " + ($pass + $fail) + "  PASS: " + $pass + "  FAIL: " + $fail)
if ($fail -gt 0) { exit 1 }
exit 0
