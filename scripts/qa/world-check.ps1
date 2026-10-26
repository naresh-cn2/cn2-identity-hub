param([string]$Base = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$base = $Base
$pass = @(); $fail = @()
function Check($name, $cond) { if ($cond) { $script:pass += $name } else { $script:fail += $name } }

# ============ LEVEL 1: /work showcases ============
$builds = (Invoke-WebRequest -Uri "$base/work" -UseBasicParsing).Content

$buildsR = [regex]::Replace($builds, '<script[\s\S]*?</script>', '')
Check "builds: ENTER PROJECT WORLD x8" (([regex]::Matches($buildsR, 'ENTER PROJECT WORLD')).Count -eq 8)
Check "builds: no OPEN CASE STUDY" (-not $builds.Contains('OPEN CASE STUDY'))
Check "builds: no OPEN BUILD RECORD" (-not $builds.Contains('OPEN BUILD RECORD'))
Check "builds: filter bar kept" ($builds.Contains('Filter projects by category') -and $builds.Contains('ALL PROJECTS'))
Check "builds: title links to crypto world" ($builds -match '<h2 class="display[^"]*"><a class="[^"]*" href="/work/crypto-platform"')
Check "builds: crypto signature" ($builds -match 'SIGNATURE / STATE PIPELINE')
Check "builds: billing signature" ($builds -match 'SIGNATURE / NORMALIZATION FLOW')
Check "builds: costintel signature" ($builds -match 'SIGNATURE / RECONCILIATION FIELD')
Check "builds: forex signature" ($builds -match 'SIGNATURE / CAUSAL LADDER')
Check "builds: apex instrument kept" ($builds -match 'INSTRUMENT / EQUITY SURFACE')
Check "builds: atos instrument kept" ($builds -match 'INSTRUMENT / EXECUTION PIPELINE')
Check "builds: 8 clickable visuals" (([regex]::Matches($builds, 'tabindex="-1" class="block"')).Count -ge 8)
Check "builds: tier-2 scene labelled ILLUSTRATIVE" ($builds -match 'ILLUSTRATIVE \u2014 SYSTEM SHAPE, NOT A MEASUREMENT')
Check "builds: THE RECORD preserved" ($builds -match 'THE RECORD')
Check "builds: hero counter removed" (-not ($builds -match 'SYSTEMS ARCHIVED'))

# ============ LEVEL 2: /work/crypto-platform world ============
$world = (Invoke-WebRequest -Uri "$base/work/crypto-platform" -UseBasicParsing).Content

Check "world: PROJECT WORLD eyebrow" ($world -match 'PROJECT WORLD[\s\S]{0,60}text-signal">/</span>')
Check "world: index 08" ($world -match 'text-signal">/</span>[\s\S]{0,40}08')
Check "world: h1 CRYPTO PLATFORM" ($world -match '<h1 class="display[^"]*">CRYPTO PLATFORM</h1>')
Check "world: CTA explore architecture" ($world -match 'href="#architecture"[^>]*>EXPLORE ARCHITECTURE')
Check "world: CTA view evidence" ($world -match 'href="#evidence"[^>]*>VIEW EVIDENCE')
Check "world: repository CTA" ($world -match 'REPOSITORY \u2192')
Check "world: capability chips" ($world -match 'SQLite WAL persistence')
Check "world: breadcrumb" ($world -match 'aria-label="Breadcrumb"')

# sticky nav - 6 real sections exposed
foreach ($n in @('OVERVIEW','ARCHITECTURE','CASE STUDY','EVIDENCE','DOCUMENTATION','RELATED WORK')) {
  Check "world nav: $n" ($world -match ("aria-label=""Case study chapters""[\s\S]{0,4000}?>" + $n + "</span>"))
}
Check "world: NO research nav" (-not ($world -match 'RESEARCH .{0,8}EXPERIMENTS'))
Check "world: NO research section" (-not $world.Contains('id="research"'))
Check "world: NO engineering log" (-not $world.Contains('ENGINEERING LOG'))
Check "world: section ids exposed" ($world.Contains('id="overview"') -and $world.Contains('id="architecture"') -and $world.Contains('id="case-study"') -and $world.Contains('id="evidence"') -and $world.Contains('id="documentation"') -and $world.Contains('id="related-work"'))

# architecture explorer (Level 4 graph)
Check "explorer: select prompt" ($world -match 'SELECT A COMPONENT')
Check "explorer: exactly 6 nodes" (([regex]::Matches($world, 'class="wx-node group')).Count -eq 6)
foreach ($c in @('INGESTION','STATE ENGINE','DECISION ENGINE','RISK GOVERNOR','CAPITAL GATE','SERVER &amp; CLIENTS')) {
  Check "explorer node: $c" ($world.Contains(">$c<"))
}
Check "explorer: replay evidence" ($world -match '9,608 / 9,608 tick-invariant replay')
Check "explorer: contract hash" ($world -match '8fbc923a')
Check "explorer: verify-contract cmd" ($world -match 'python cli\.py verify-contract')
Check "explorer: backtest result" ($world -match '\+0\.8885R expectancy')
# SSR shows the default-selected node (INGESTION): EVIDENCE + TEST chips.
# LIMITATION/STATE chips are verified interactively in browser QA.
Check "explorer: kind chips (SSR node)" ($world.Contains('>TEST<') -and $world.Contains('>EVIDENCE<'))
Check "explorer: live-capital state" ($world -match 'Real capital \$0\.00')

# case study / evidence / documentation
Check "case: four parts" ($world -match 'THE PROBLEM' -and $world -match 'THE APPROACH' -and $world -match 'RESULTS \u2014 WITH PROVENANCE' -and $world -match 'LIMITATIONS')
Check "case: metric provenance" ($world -match 'BACKTEST SIMULATION')
Check "case: no-benchmark box absent (has metrics)" (-not ($world -match 'NO PUBLISHED BENCHMARK'))
Check "evidence: section + label" ($world -match 'id="evidence"' -and $world -match 'TEST SUITE \u00B7 300/300 TESTS')
Check "evidence: reproduce CTA" ($world -match 'INSPECT THE REPOSITORY')
Check "doc: section + artifacts" ($world -match 'id="documentation"')

# related work (outward knowledge graph) - count rendered HTML only, not RSC payload
$worldR = [regex]::Replace($world, '<script[\s\S]*?</script>', '')
Check "related: exactly 3 cards" (([regex]::Matches($worldR, 'ENTER ITS WORLD')).Count -eq 3)
foreach ($r in @('/work/forex-platform','/work/apex-quant-engine','/work/market-data-replay')) {
  Check "related: $r" ($world.Contains("href=`"$r`""))
}
Check "related: reasons stated" ($world -match 'methodology twin')
Check "world: entrance signature" ($world -match 'SIGNATURE / STATE PIPELINE')
Check "world: atmosphere canvas" (([regex]::Matches($world, '<canvas')).Count -ge 1)
Check "world: back to all projects" ($world -match 'href="/work"[^>]*>\s*[^<]*ALL PROJECTS')

# ============ REGRESSIONS: legacy pages untouched ============
$billing = (Invoke-WebRequest -Uri "$base/work/billing-data-gateway" -UseBasicParsing).Content
Check "regress: billing keeps BUILD RECORD page" ($billing.Contains('BUILD RECORD') -and $billing.Contains('SELF-BENCHMARK'))
Check "regress: billing chapter nav" ($billing.Contains('aria-label="Case study chapters"'))
Check "regress: billing has no world CTA" (-not $billing.Contains('EXPLORE ARCHITECTURE'))

$apex = (Invoke-WebRequest -Uri "$base/work/apex-quant-engine" -UseBasicParsing).Content
Check "regress: apex keeps instrument" ($apex.Contains('INSTRUMENT / EQUITY SURFACE'))
Check "regress: apex case study CTA" ($apex.Contains('/case-studies/apex-quant-engine'))
Check "regress: apex has no world CTA" (-not $apex.Contains('EXPLORE ARCHITECTURE'))

# ============ EVIDENCE SCHEMA: optional fields ============
$qrsipP = (Invoke-WebRequest -Uri "$base/work/qrsip" -UseBasicParsing).Content
$mdrP = (Invoke-WebRequest -Uri "$base/work/market-data-replay" -UseBasicParsing).Content
$atosP = (Invoke-WebRequest -Uri "$base/work/automated-trading-os" -UseBasicParsing).Content
$csQrsip = (Invoke-WebRequest -Uri "$base/case-studies/qrsip" -UseBasicParsing).Content

# populated: result classifications render as badges
Check "schema: apex BACKTEST badge" ($apex.Contains('data-result-class="BACKTEST"'))
Check "schema: apex SELF-BENCHMARK badge" ($apex.Contains('data-result-class="SELF-BENCHMARK"'))
Check "schema: qrsip TEST-SUITE badge" ($qrsipP.Contains('data-result-class="TEST-SUITE"'))

# populated: provenance states honest limits
Check "schema: apex window/seed not documented" ($apex.Contains('evaluation window and seed not documented'))
Check "schema: apex machine spec not documented" ($apex.Contains('machine specification not documented'))

# populated: dated verification records (date + baseline + run link)
Check "schema: qrsip verified 2026-09-25 at 8fc4590" ($qrsipP.Contains('data-verified="2026-09-25"') -and $qrsipP.Contains('8fc4590'))
Check "schema: qrsip run link" ($qrsipP.Contains('actions/runs/36135583631'))
Check "schema: mdr verified 2026-09-17 at a72d803" ($mdrP.Contains('data-verified="2026-09-17"') -and $mdrP.Contains('a72d803'))
Check "schema: mdr run link" ($mdrP.Contains('actions/runs/35232102872'))
Check "schema: case study renders verification too" ($csQrsip.Contains('data-verified="2026-09-25"'))

# evidence links point at real artifacts
Check "schema: qrsip links tests dir" ($qrsipP.Contains('/tree/main/tests'))
Check "schema: mdr links verification guide" ($mdrP.Contains('/blob/main/VERIFICATION_GUIDE.md'))
Check "schema: apex links README artifacts" ($apex.Contains('/blob/main/README.md'))

# claim hygiene: ATOS no longer implies independent verification
Check "schema: atos CONTROLS IN CODE, not VERIFIED CONTROLS" ($atosP.Contains('CONTROLS IN CODE') -and (-not $atosP.Contains('VERIFIED CONTROLS')))
Check "schema: atos admits no CI runs yet" ($atosP.Contains('no CI runs yet'))

# absent optional fields render nothing at all
Check "schema: atos has no verification line" (-not $atosP.Contains('data-verified='))
Check "schema: atos metrics carry no badge" (-not $atosP.Contains('data-result-class='))

# legacy tier-2 record untouched by the new fields
Check "schema: billing legacy record has no badges" (-not ($billing.Contains('data-result-class=') -or $billing.Contains('data-verified=')))

# no serialization leakage in rendered HTML (scripts stripped: RSC payload
# legitimately contains the framework's "$undefined" sentinel)
$all4 = $apex + $qrsipP + $mdrP + $atosP
$all4R = [regex]::Replace($all4, '<script[\s\S]*?</script>', '')
Check "schema: no undefined or object leakage (rendered HTML)" (-not ($all4R.Contains('undefined') -or $all4R.Contains('[object Object]')))

# ============ CSS layer ============
$css = (Get-ChildItem ".next/static/chunks" -Filter "*.css" | ForEach-Object { Get-Content $_.FullName -Raw }) -join "`n"
Check "css: wx-panel animation" ($css.Contains('wx-panel') -and $css.Contains('cn2-panel-in'))
Check "css: wx-node focus" ($css.Contains('.wx-node:focus-visible'))

Write-Host "PASS: $($pass.Count)  FAIL: $($fail.Count)"
if ($fail.Count) { $fail | ForEach-Object { Write-Host "FAILED: $_" }; exit 1 }
exit 0
