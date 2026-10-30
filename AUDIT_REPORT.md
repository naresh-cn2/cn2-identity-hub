# CN2.DEV Design-System Refinement — Audit Report

**Date:** Fri Oct 30 2026  
**Repo:** `C:\Users\nares\Workspace\cn2-identity-hub`  
**Branch/state:** Working tree clean at start; all changes uncommitted  
**Verification:** `npm run lint` (clean), `npm run build` (95 routes, clean), QA suites pass, rendered-page inspection clean

---

## Objective

Perform a global design-system refinement of the CN2.DEF website to remove:

1. **Decorative numbering** (e.g. `DOMAIN / 02 — RESEARCH`, `SECTION / 03 — LAB`, `01 / COMMERCIAL & PLATFORM SYSTEMS`, big `01/02/03` category numbers, `NN —` eyebrow numbers) — keep numbering only for genuinely ordered sequences.
2. **Redundant `ILLUSTRATIVE`/artwork captions** — preserve required disclosures (synthetic datasets, simulated/backtest/paper-trading classifications, chart axis/legend/unit info, data sources and limitations).
3. **Self-referential design commentary** (text describing the site's own 3D/cinematic/visual design) — remove, do not rename.

While preserving: dark cinematic backgrounds, grid environments, 3D/particle/SVG visuals, red/blue/cyan accents, typography, animations, light/dark themes, per-page distinct compositions, and all meaningful technical/scientific disclosures.

---

## Summary of changes

| Category | What changed | Files touched |
|---|---|---|
| A. Page-eyebrow numbering | Dropped `NN —` from `SECTION/DOMAIN/CHANNEL/INDEX/PATH/CV / NN — LABEL` eyebrows; kept plain label | 17 page files |
| B. Works-category numbering | Removed `number` field from `WORK_CATEGORIES`, big `01/02/03` category doors, `TIER N —` caption, `01./02./03.` CTA prefixes, per-project `{index}` hero eyebrows | `data/works.ts`, `components/work/category-doors.tsx`, `components/work/category-catalogue.tsx`, `app/works/page.tsx`, `app/works/{products,projects,personal-builds}/page.tsx`, `components/{case-study,projects,work}/*.tsx` |
| C. Illustrative captions | Dropped `ILLUSTRATIVE — …` artwork labels and `IllustrativeTag` corner badges; kept synthetic-series / not-a-measurement disclosures | `components/lab/market-timeline.tsx`, `components/research/research-archive.tsx`, `app/research/[research]/page.tsx`, `components/hub/visuals/personal-visual.tsx`, `components/projects/tier-two-signatures.tsx`, `components/work/flagship-instrument.tsx`, `components/work/tier-two-case-study.tsx`, `components/services/service-schematics.tsx`, `data/services.ts`, `app/services/[slug]/page.tsx`, `components/services/service-studio.tsx` |
| D. Self-referential design text | Removed `3D VOL-SURFACE`, `GRID: 3D PARAMETRIC`, `PROJECTED 3D … BUILT-IN`, `PANEL ART IS SCHEMATIC REPRESENTATION`, `GENERATIVE ARTIFACT`, `3D DENSITY DISTRIBUTION`, `ABOUT / IDENTITY / 001` hero metadata | `components/home/entry-hero.tsx`, `app/lab/page.tsx`, `app/research/page.tsx`, `app/about/page.tsx`, `data/lab.ts`, `data/capabilities.ts` |
| E. QA scripts | Updated assertions that enforced removed patterns | `scripts/qa/hub-check.ps1`, `scripts/qa/world-check.ps1` |

---

## Preserved-by-design numbering (intentionally kept)

These represent genuine ordered sequences or required position indicators, so they were **not** touched:

- Research methodology spine (7 stages) — `app/research/page.tsx` `MethodSpine`
- Chapter/section sequence numbers on `/about` (`SECTION / {index}` chapters 001–008)
- Chronological career timeline `<ol>` on `/works` (`{String(i+1).padStart(2,"0")}`)
- Ordered process lists: service `PROCESS` `<ol>`, freelance "how to start", collaborate governance, work-with-me starting point
- `ENTRY NN / TOTAL` position indicators
- `S{i+1}` credentials learning-map sequence
- Experiment `STAGE`/`GATES` counters (`components/lab/experiment-explorer.tsx`)
- `ERROR / 404 — NOT FOUND` (label without decorative numbering)
- `LAB / SURF-01`, `LAB / EXP-01` etc. in **code comments only** (not rendered)
- `num-mono` class itself and chart axes / metric values (genuinely quantitative, not decorative)

---

## Route-by-route audit

### Inspected routes (all 43 `app/**/page.tsx` routes)

| Route | Inspected | Changed | Intentionally preserved | Remaining inconsistencies |
|---|---|---|---|---|
| `/` (hub) | ✓ | Removed hub illustrative caption / eyebrow numbering enforcement | Chapter sequence, `code` keys (non-visible) | — |
| `/about` | ✓ | Removed `ABOUT / IDENTITY / 001` hero metadata → `ABOUT / IDENTITY` | Chapter sequence `001`–`008`, `SECTION / {index}` | — |
| `/articles` | ✓ | Removed `DOMAIN / 04 — ARTICLES`, lead `{index}` big number, index `{a.index}` | Date/category/readingTime metadata | — |
| `/articles/[article]` | ✓ | Removed `NOTE {article.index}` | Body section ordinals `01`/`02`… (genuine sequence) | — |
| `/capabilities` | ✓ | Removed `SECTION / 07 — CAPABILITIES` | — | — |
| `/case-studies` | ✓ | Removed `SECTION / 02 — CASE STUDIES`, `STUDY / {index}`, `ILLUSTRATIVE` taxonomy | `BACKTEST`/`SIMULATION`/`SELF-BENCHMARK`/`TEST SUITE` provenance labels | — |
| `/case-studies/[project]` | ✓ | Removed `CASE STUDY / {index}`, `BUILD / {project.index}`, `02/03/…` section headings, `LAYER 0x`, `CHALLENGE 0x`, `CASE 0x` | Chapter nav sequence numbers `01`–`12` (genuine sequence) | — |
| `/contact` | ✓ | Removed `CHANNEL / 12 — CONTACT` | `01`/`02`/`03` "what to include" (genuine sequence) | — |
| `/credentials` | ✓ | — | `S1–Sn` learning-map sequence | — |
| `/cv` | ✓ | Removed `CV / 01 — HEADER` | `code` section labels (CV section codes) | — |
| `/error` / 404 | ✓ | — | `ERROR / 404 — NOT FOUND` (label preserved) | — |
| `/how-i-work` | ✓ | Removed `SECTION / 17 — HOW I WORK` | `01`–`04` starting-point sequence | — |
| `/hub` | ✓ | — | `code` keys non-visible (drive ambients/anchors) | — |
| `/identity` | ✓ | Removed `SECTION / 10 — IDENTITY` | — | — |
| `/intelligence` | ✓ | Removed `DOMAIN / 06 — INTELLIGENCE`, `{p.index}` | — | — |
| `/lab` | ✓ | Removed `SECTION / 03 — LAB`, `PANEL ART IS SCHEMATIC…`, `PROJECTED 3D … BUILT-IN`, `ILLUSTRATIVE` badge | `SYNTHETIC SERIES` disclosure, backtest explorer text | — |
| `/lab/*` (instruments) | ✓ | Removed self-referential `3D` in `data/lab.ts` description | `SURF-01`/`STRAT-01` codes (non-visible comments) | — |
| `/links` | ✓ | Removed `INDEX / 10 — LINKS` | — | — |
| `/opportunities` | ✓ | Removed `SECTION / 13 — OPPORTUNITIES`, `PATH / {code}` | `code` values non-visible (route keys) | — |
| `/opportunities/career` | ✓ | Removed `PATH / 01 — EMPLOYMENT`, `{track.index}` big number | `01`–`04` study tracks | — |
| `/opportunities/collaborate` | ✓ | Removed `PATH / 03 — RESEARCH COLLABORATION`, theme ordinals | `01`–`04` governance sequence | — |
| `/opportunities/freelance` | ✓ | Removed `PATH / 02 — FREELANCE & CONTRACTS`, area ordinals | `01`–`04` starting-point sequence | — |
| `/opportunities/partnerships` | ✓ | Removed `PATH / 04 — BUSINESS & PARTNERSHIPS`, `{p.code}` | `code` values non-visible | — |
| `/privacy` | ✓ | — | `01`–`06` collection items (genuine sequence) | — |
| `/proof` | ✓ | Removed `SECTION / 09 — PROOF`, `01–05` section labels | `BACKTEST`/`SIMULATION` figure labels, verified-entry disclosures | — |
| `/research` | ✓ | Removed `DOMAIN / 02 — RESEARCH`, `3D DENSITY DISTRIBUTION`, illustrative sentence | Method spine (7 stages), `SYNTHETIC SERIES` | — |
| `/research/[research]` | ✓ | Removed `GENERATIVE ARTIFACT`, `ILLUSTRATIVE — …` caption | `DETERMINISTIC DIAGRAM … NO MEASUREMENT DATA` disclosure | — |
| `/services` | ✓ | Removed `SECTION / 16 — SERVICES` | `illustrative` flag removed from data & schematics | — |
| `/services/[slug]` | ✓ | Removed `illustrative={category.illustrative}`, `BUILD / {p.index}` | `BACKTEST`/`SELF-BENCHMARK` badges, verified dates | — |
| `/testimonials` | ✓ | Removed `SECTION / 18 — TESTIMONIALS` | — | — |
| `/terms` | ✓ | — | `01`–`0n` term items (genuine sequence) | — |
| `/work-with-me` | ✓ | Removed `SECTION / 08 — WORK WITH ME`, area ordinals | `01`–`04` starting-point sequence | — |
| `/work`, `/works`, `/works/*` | ✓ | Removed `01/02/03` category numbers, `01./02./03.` CTAs, `TIER {number}`, `number` field, `{project.index}` | Career timeline ordinals (genuine sequence) | — |

### Components (non-page) audited

| Component | Change |
|---|---|
| `components/work/category-doors.tsx` | Removed big `01/02/03` + `/` number prefixes |
| `components/work/category-catalogue.tsx` | Removed `TIER {category.number} —` caption |
| `components/work/category-showcase-list.tsx` | Removed big `{item.index}` number |
| `components/work/comprehensive-case-study.tsx` | Removed hero `{item.index}`, `02–12 /` section headings, `PROBLEM STATEMENT 0x`, `CHALLENGE 0x`, `CASE 0x`, `LAYER 0x` |
| `components/work/flagship-instrument.tsx` | `ILLUSTRATIVE —` → disclosure-only note; comment wording |
| `components/work/tier-two-case-study.tsx` | Removed `BUILD RECORD / {index}`, `ILLUSTRATIVE` diagram caption |
| `components/work/project-overview.tsx` | Removed `BUILD / {index} —` |
| `components/case-study/case-study.tsx` | Removed `CASE STUDY / {index}` |
| `components/projects/project-world.tsx` | Removed `PROJECT WORLD / {index}` |
| `components/lab/market-timeline.tsx` | Removed `ILLUSTRATIVE` badge; kept `SYNTHETIC SERIES` / "not measured market data" |
| `components/research/research-archive.tsx` | Removed per-entry `ILLUSTRATIVE — …` caption |
| `components/hub/visuals/personal-visual.tsx` | Removed `ILLUSTRATIVE — AUTONOMOUS AGENT TOPOLOGY` |
| `components/projects/tier-two-signatures.tsx` | Removed `note` prop + four `ILLUSTRATIVE — …` Frame notes |
| `components/services/service-schematics.tsx` | Removed `IllustrativeTag` component + corner badge; comment wording |
| `components/home/entry-hero.tsx` | Removed `3D` from `SYSTEMS / 3D VOL-SURFACE` and `GRID: 3D PARAMETRIC` |
| `components/layout/footer.tsx` | Removed `{route.code} —` prefix from footer index links |

### Data files

| File | Change |
|---|---|
| `data/works.ts` | Removed `number` field from `CategoryMeta` and all three category entries |
| `data/services.ts` | Removed `illustrative` field from `ServiceCategoryMeta` and all entries |
| `data/lab.ts` | Removed `projected-3D wireframe` self-reference |
| `data/capabilities.ts` | Removed `real-time 3D risk manifolds` self-reference |

---

## Verification results

| Check | Result |
|---|---|
| `npm run lint` | ✅ Clean (0 errors, 0 warnings) |
| `npm run build` | ✅ Clean, 95 static/SSG routes generated |
| `scripts/qa/hub-check.ps1` | ✅ 56 / 56 PASS |
| `scripts/qa/world-check.ps1` | ✅ 88 / 88 PASS |
| `scripts/qa/link-check.ps1` | ✅ 4 / 4 PASS (all 26 seed routes + 71 internal destinations 200) |
| Rendered-page text grep (27 routes) | ✅ No `ILLUSTRATIVE`, no `NN — LABEL`, no `01 /` / `02 /` / `03 /`, no `PROJECTED 3D`, no `SCHEMATIC REPRESENTATION`, no `GENERATIVE ARTIFACT` |
| Accessibility snapshot (`/works`, `/research`, `/lab`) | ✅ Clean structure, no decorative numbers |

> Note: browser screenshots could not be captured because the Chromium instance has no visible desktop window in this execution context. Rendered output was verified via accessibility snapshots (element text) and direct HTTP fetch + text grep of the production build instead.

---

## Files modified (complete list)

```
app/about/page.tsx
app/articles/page.tsx
app/articles/[article]/page.tsx
app/capabilities/page.tsx
app/case-studies/page.tsx
app/contact/page.tsx
app/cv/page.tsx
app/how-i-work/page.tsx
app/intelligence/page.tsx
app/lab/page.tsx
app/links/page.tsx
app/opportunities/page.tsx
app/opportunities/career/page.tsx
app/opportunities/collaborate/page.tsx
app/opportunities/freelance/page.tsx
app/opportunities/partnerships/page.tsx
app/proof/page.tsx
app/research/page.tsx
app/research/[research]/page.tsx
app/services/page.tsx
app/services/[slug]/page.tsx
app/testimonials/page.tsx
app/work-with-me/page.tsx
app/works/page.tsx
app/works/products/page.tsx
app/works/projects/page.tsx
app/works/personal-builds/page.tsx
components/work/category-doors.tsx
components/work/category-catalogue.tsx
components/work/category-showcase-list.tsx
components/work/comprehensive-case-study.tsx
components/work/flagship-instrument.tsx
components/work/tier-two-case-study.tsx
components/work/project-overview.tsx
components/case-study/case-study.tsx
components/projects/project-world.tsx
components/lab/market-timeline.tsx
components/research/research-archive.tsx
components/hub/visuals/personal-visual.tsx
components/projects/tier-two-signatures.tsx
components/services/service-schematics.tsx
components/home/entry-hero.tsx
components/layout/footer.tsx
data/works.ts
data/services.ts
data/lab.ts
data/capabilities.ts
scripts/qa/hub-check.ps1
scripts/qa/world-check.ps1
```

---

## Next steps (optional)

- Re-enable browser screenshot inspection once a visible desktop window is available, to confirm the visual composition at desktop + mobile breakpoints.
- Deploy to Vercel and re-run QA against `https://cn2-identity-hub.vercel.app`.
