param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$html = (Invoke-WebRequest -Uri ($base + "/hub") -UseBasicParsing).Content
$pass = @(); $fail = @()
function Check($name, $cond) { if ($cond) { $script:pass += $name } else { $script:fail += $name } }

# ---- hero ----
Check "hero: EXPLORE THE line" ($html.Contains('EXPLORE THE'))
Check "hero: CN2.DEV UNIVERSE h1" ($html -match '<h1 class="display mt-3[^"]*">CN2\.DE[Vv]<!-- --> <span class="text-signal">UNIVERSE\.</span>')
Check "hero: tagline" ($html.Contains('One identity. Multiple disciplines. A world of things to build.'))
Check "hero: description" ($html.Contains('A digital environment for quantitative research, software engineering, intelligent automation'))
Check "hero: CTA to #destinations" ($html -match 'href="#destinations">EXPLORE THE UNIVERSE')
Check "hero: descriptor present" ($html.Contains('QUANTITATIVE DEVELOPER'))
Check "main#destinations exists" ($html -match '<main id="destinations" aria-label="The CN2\.DEV universe">')
Check "portal canvas mounted" ($html.Contains('pointer-events-none absolute inset-0 h-full w-full'))
Check "portal overlay structure" ($html.Contains('<circle cx="70" cy="70" r="4" fill="none"'))

# ---- eight sections: rendered-only action links ----
$btnRe = '<a class="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/70 bg-signal/10 px-8 py-4 label-mono text-signal transition-colors hover:bg-signal hover:text-background" href="([a-z/-]+)">([A-Z ]+)<'
$btns = [regex]::Matches($html, $btnRe)
Check "8 rendered action buttons" ($btns.Count -eq 8)
$want = @{
  "/work"="ENTER WORK"; "/credentials"="EXPLORE CREDENTIALS"; "/services"="EXPLORE SERVICES";
  "/lab"="ENTER THE LAB"; "/research"="EXPLORE RESEARCH"; "/opportunities"="EXPLORE OPPORTUNITIES";
  "/about"="GET TO KNOW ME"; "/contact"="GET IN TOUCH"
}
$got = @{}; foreach ($m in $btns) { $got[$m.Groups[1].Value] = $m.Groups[2].Value }
foreach ($k in $want.Keys) { Check "button $k => $($want[$k])" (($got[$k] -eq $want[$k])) }

# ---- region labelling + titles ----
$regions = [regex]::Matches($html, '<section aria-labelledby="dest-(\d\d)"')
Check "8 regions dest-01..08" (($regions | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique).Count -eq 8)
foreach ($t in @('WORK','CREDENTIALS','SERVICES','LABORATORY','RESEARCH','OPPORTUNITIES','ABOUT ME','LET&#x27;S CONNECT')) {
  Check "title contains $t" ($html.Contains(">$t<"))
}

# ---- counters removed ----
Check "no 'OF 08'" (-not $html.Contains('OF 08'))
Check "no 'SYSTEMS ARCHIVED'" (-not $html.Contains('SYSTEMS ARCHIVED'))
Check "no ghost watermark" (-not ($html -match 'opacity-\[0\.05\]'))
Check "no 'INTELLIGENCE NEXUS'" (-not $html.Contains('INTELLIGENCE NEXUS'))
Check "no 'SECONDARY INDEX'" (-not $html.Contains('SECONDARY INDEX'))
Check "no metric block" (-not ($html -match 'num-mono text-3xl'))
Check "ALSO INSIDE index" ($html.Contains('ALSO INSIDE'))
Check "return to entrance removed" (-not $html.Contains('RETURN TO ENTRANCE'))
Check "bottom-left back on hub" ($html.Contains('Go back to the previous page'))

# ---- eyebrow: route label, no numbering ----
Check "eyebrow: DESTINATION /work" ($html -match 'DESTINATION</span> <!-- -->/work')
Check "no 'NN OF' eyebrow" (-not ($html -match 'OF 0?8')) 
Check "8 route eyebrows" (([regex]::Matches($html, 'DESTINATION</span> <!-- -->/[a-z-]+')).Count -eq 8)

# ---- scroll cue + recede ----
Check "scroll cue x8" (([regex]::Matches($html, '<span class="dest-cue"></span>')).Count -eq 8)
Check "recede wrapper x8" (([regex]::Matches($html, '<div class="dest-recede">')).Count -eq 8)

# ---- captions ----
Check "ILLUSTRATIVE captions x7" (([regex]::Matches($html, 'ILLUSTRATIVE <!-- --><!-- -->—')).Count -ge 7 -or ([regex]::Matches($html, 'ILLUSTRATIVE')).Count -ge 7)
Check "connect: REAL CHANNELS" ($html.Contains('REAL CHANNELS'))

# ---- connect: real links ----
Check "connect: mailto" ($html -match '<a href="mailto:bukyanaresh2003@gmail.com" class="chan"')
Check "connect: github" ($html -match '<a href="https://github.com/naresh-cn2" class="chan" target="_blank" rel="noopener noreferrer"')
Check "connect: linkedin" ($html -match '<a href="https://www.linkedin.com/in/bukya-naresh-cn2" class="chan"')
Check "connect: enquiry /contact" ($html -match '<a href="/contact" class="chan"')
Check "connect: channel labels" ($html.Contains('ENQUIRY') -and $html.Contains('LINKEDIN') -and $html.Contains('EMAIL') -and $html.Contains('GITHUB'))

# ---- metadata ----
Check "title: Explore the Universe" ($html -match '<title>Explore the Universe')

# ---- compiled CSS ----
$css = (Get-ChildItem ".next/static/chunks" -Filter "*.css" | ForEach-Object { Get-Content $_.FullName -Raw }) -join "`n"
Check "css: .hv-label" ($css.Contains('.hv-label'))
Check "css: .hv:hover label reveal" ($css.Contains('.hv:hover .hv-label'))
Check "css: .chan:focus-visible" ($css.Contains('.chan:focus-visible'))
Check "css: .dest-cue + cn2-cue" ($css.Contains('.dest-cue') -and $css.Contains('cn2-cue'))
Check "css: cn2-recede + view timeline" ($css.Contains('cn2-recede') -and $css.Contains('animation-timeline:view()'))
Check "css: hub portal parallax" ($css.Contains('hub-portal-parallax') -and $css.Contains('animation-timeline:scroll(root)'))
Check "css: reduced-motion kills timelines" ($css -match 'prefers-reduced-motion[\s\S]{0,3000}?\.dest-recede')

Write-Host "PASS: $($pass.Count)  FAIL: $($fail.Count)"
if ($fail.Count) { $fail | ForEach-Object { Write-Host "FAILED: $_" }; exit 1 }
exit 0
