# CN2.DEV

**The digital headquarters of Bukya Naresh — Quantitative Developer**

[Live site](https://cn2.is-a.dev) · [GitHub](https://github.com/naresh-cn2/cn2-identity-hub) · [ORCID](https://orcid.org/0009-0007-7269-1583) · [Contra](https://contra.com/naresh_cn2)

CN2.DEV is a multi-route professional platform covering quantitative development, systematic trading research, engineering services, and published technical writing. Every claim on the site is backed by real artifacts — working systems, test suites, research entries, certificates with verification links — and nothing is invented: no fabricated credentials, clients, metrics, or quotations.

> **Current release `v1.2.1`** — 125 static routes · 305/305 automated assertions green · CI runs on every push to `main`.

---

## Professional Identity

**CN2 — Quantitative Developer**

*Systems Engineering · Financial Technology · AI Engineering*

| Dimension | What it communicates |
|---|---|
| **Who I am** | An independent engineer building computational and intelligent systems. |
| **How I think** | Systems thinking, analytical reasoning, structured problem-solving. |
| **What I build** | Software platforms, financial systems, data infrastructure, AI-powered tools. |
| **How I work** | Human-directed engineering, AI-assisted execution, testing and verification. |
| **Where I am going** | Building increasingly integrated, reliable and intelligent systems. |

---

## Professional Experiences

CN2.DEV presents three connected but distinct professional experiences:

| Experience | Route | Purpose |
|---|---|---|
| **About — Professional Identity** | `/about` | Who I am, how I think, my engineering philosophy, vision, mindset, AI relationship, journey, capabilities, and work. |
| **CV — Engineering Dossier** | `/cv` | Comprehensive professional record: skills, independent engineering experience, flagship projects, research, certifications, education, and achievements. |
| **Résumé — Career Opportunity** | `/resume` | Targeted professional presentations: Systems/Backend Engineer, Quantitative Developer, AI Engineer — each a focused, role-specific résumé. |

The About page tells the story. The CV proves the engineering work. The résumé communicates professional relevance.

---

## Complete Website Architecture

### Core routes

| Route | What it is |
|---|---|
| `/` | Entrance — code-generated mathematical identity |
| `/hub` | Headquarters — master index with Holographic Data Gate & 8 animated destination scenes |
| `/builds` | BUILDS — three-section destination: Products, Projects, Independent |
| `/works` | Catalogue — Products & Platforms, Projects, Personal Builds; each item opens a full engineering case study at `/works/<project>` |
| `/works/context-engineering-labs` | Context Engineering Labs — six agent-stack implementations in one repository, with per-unit verification and stated limitations |
| `/works/cs50-ai` | Harvard CS50 AI — twelve applied AI projects, official certificate and validation methodology |
| `/case-studies` | Deep technical proof per project (`/case-studies/<project>`) |
| `/research` | Research entries with stated method, findings, and Gaussian Probability Density Manifold |
| `/articles` | Engineering articles & methodologies |
| `/capabilities` | 12 core capability domains & searchable 72+ item Tech Stack & Tooling Architecture |
| `/services` | Service offerings anchored to capabilities and proven by projects |
| `/lab` | Interactive instruments — risk/return surface, strategy viewer, market replay, experiments |
| `/intelligence` | Knowledge graph connecting projects, research and capabilities |
| `/credentials` | Issued certificates (CS50x Harvard, WorldQuant, NSDC) with a stated verification method per record — **issuer link** or **certificate document** — plus a PDF viewer |
| `/opportunities` | Career, freelance, collaboration and partnership pathways |
| `/testimonials` | Reviews & testimonials — consented feedback with per-review ratings |
| `/how-i-work` | How engagements actually run — six steps from brief to handover |
| `/privacy`, `/terms` | Plain-language data handling and ground rules |
| `/about`, `/identity`, `/cv`, `/proof`, `/links`, `/contact` | Profile, record and contact surfaces |
| `/resume` | Résumé — professional direction selector |
| `/resume/systems-backend` | Résumé — Systems/Backend Engineer |
| `/resume/quantitative-developer` | Résumé — Quantitative Developer |
| `/resume/ai-engineer` | Résumé — AI Engineer |

The top bar is deliberately minimal — brand, search and the light/dark toggle. Every destination stays reachable through the command palette (<kbd>⌘K</kbd>), the footer route index, `/links` and the hub.

### URL compatibility

Two generations of URL coexist and both resolve. Legacy paths redirect permanently rather than 404:

| Legacy | Now |
|---|---|
| `/builds/<project>` (12 slugs) | `/work/<project>` |
| `/certifications` | `/credentials` |
| `/quant`, `/quant/<project>` | `/work`, `/work/<project>` |
| `/research/market-data-replay`, `/research/qrsip` | `/work/…` |
| `/career`, `/capabilities`, `/about/capabilities` | `/about#capability-map` |

**Not a redirect — a canonical:** `/builds/projects/cs50-ai` serves the same page as `/works/cs50-ai` and declares `/works/cs50-ai` as its canonical, so the two URLs never compete in search.

`next.config.ts` holds the redirect table. Legacy slugs are enumerated rather than matched by a `:project` wildcard: Next.js checks redirects *before* the filesystem, so a wildcard would shadow the live `/builds/products|projects|personal` pages.

---

## Release history

### v1.2.1 — Professional identity experiences: About, CV, Résumé

**Added**

- **`/about`** — Professional identity experience: cinematic hero ("I THINK IN SYSTEMS. I BUILD WHAT'S POSSIBLE."), engineering journey timeline, completed project showcase, and professional profile panels linking to CV and Résumé.
- **`/cv`** — Comprehensive engineering dossier: flagship projects (BusTub, APEX Quant Engine, QRSIP, Market Data Replay, Automated Trading OS, Billing Data Gateway, Context Engineering Labs, StratLab), supporting projects, research & development, verified certifications (CS50x Harvard, CS50AI, WorldQuant, DataTeach.ai, QuantConnect, Reliance Foundation/NSDC, SFJ Business Solutions/NSDC, NASSCOM/NSDC, Unstop), and printable PDF export.
- **`/resume`** — Professional direction selector with three targeted résumé destinations.
- **`/resume/systems-backend`** — Targeted résumé: Systems/Backend Engineer — C++20, C11, Python, TypeScript, databases, Docker, Linux/POSIX.
- **`/resume/quantitative-developer`** — Targeted résumé: Quantitative Developer — deterministic backtesting, point-in-time data, risk engineering, structural controls.
- **`/resume/ai-engineer`** — Targeted résumé: AI Engineer — agent orchestration, MCP tool protocols, sandboxed execution, lifecycle observability.

### v1.2.0 — Context Engineering Labs, CS50 AI case study, legacy URL repair

**Added**

- **`/works/context-engineering-labs`** — a case study for six agent-stack implementations held in a single public repository: Agent Skills, Model Context Protocol, Plugins, Subagents, Hooks and a Nano Harness. The page carries a source-verified record per unit (problem, capabilities, stack, engineering concepts, source path, evidence class), a re-run of the repository's test suite, and a *where it stops matching its own documentation* section on every unit. Presented as **6 implementations · 1 repository**, never as six separate products. **No certificate is claimed.**
- **`/works/cs50-ai`** — canonical Harvard CS50 AI case study (twelve projects, official certificate, validation methodology). `/builds/projects/cs50-ai` now re-exports it as a legacy route with a canonical URL, so the older inbound link keeps working.
- **`/credentials` verification model** — each record now declares *how* it can be checked: `ISSUER LINK` (the provider's own verification page) or `CERTIFICATE DOCUMENT` (the issued certificate held on the site). A record never implies an issuer check it does not have.
- **`ExploreNext`** closing navigation on the new case study.

**Fixed**

- **Twelve legacy `/builds/<project>` URLs returned 404.** `128f514` removed the blanket `/builds/:project → /work/:project` redirect when `/builds` became a real destination. Dropping the top-level rule was correct; dropping the deep-link rule stranded every old project URL. The twelve slugs are now enumerated explicitly — a `:project` wildcard would shadow the live `/builds/products|projects|personal` pages, because Next.js checks redirects *before* the filesystem.
- **`next.config.ts` documented a redirect that did not exist.** Its header comment claimed `/builds[/*] → /work[/*]` while the array contained no such rule. The comment now describes what the code actually does.
- **Three QA suites asserted pre-rename copy** and had been failing on production too:
  - `hub-check.ps1` still expected `ENTER WORKS`, `EXPLORE RESEARCH`, `ENTER THE LAB`, `EXPLORE OPPORTUNITIES` and the `WORKS`/`CREDENTIALS`/`ABOUT ME` headings from before the works → builds naming unification; it also required two sections that were deliberately removed (`ALSO INSIDE`, `REAL CHANNELS`).
  - `world-check.ps1` matched `PROJECT WORLD` page-wide, so the `PROJECT WORLDS` nav button — whose `num-mono` badge renders a `text-[10px]` class containing digits — was read as a numbered eyebrow. The check is now scoped to the eyebrow element and fails loudly if the markup moves.
  - `live-check.ps1` expected `/builds` to redirect to `/work`, expected the old hero subhead, and expected `aria-label="WORK"` where the heading is now `BUILDS`.

**Deliberately unchanged**

- No licence was added — this remains a personal project; all rights reserved.
- No existing project, case study, research entry or credential record was modified beyond the verification-method field described above.
- No performance, adoption or user metrics were introduced anywhere. The only numbers on the site are ones that can be reproduced from a repository.
- Production deployment still requires an explicit push to `main`; nothing auto-publishes from a branch.

---

## Technology Stack & Tooling Architecture

| Category | Technologies & Tools |
|---|---|
| **Languages** | C, C++, Python, Rust, TypeScript, JavaScript, C#, R, Scala, Ruby, Java, Bash Script, HTML5, Objective-C, Crystal, Markdown |
| **Frameworks & Runtimes** | Next.js 16 (App Router, Turbopack), React 19, Node.js, FastAPI, Flask, NestJS, Fastify, Deno.js, Electron, Nuxt, Angular.js, React Native, .NET, JavaFX |
| **Data, ML & Quant** | NumPy, Pandas, SciPy, CUDA, Anaconda, Power BI, Chart.js, OpenAPI / Swagger |
| **Databases & Storage** | PostgreSQL, SQLite (WAL), MySQL, Microsoft SQL Server, Amazon DynamoDB |
| **Cloud & Infrastructure** | AWS, Azure, Google Cloud Platform, Cloudflare, DigitalOcean, Firebase, Heroku, Linode, Netlify, Oracle Cloud, OpenStack |
| **DevOps & Tooling** | Docker, Kubernetes, Git, GitHub Actions, GitLab CI, Forgejo, Playwright, Jira, Notion |
| **Visual Systems** | Pure CSS, SVG, and Canvas 2D/WebGL mathematical surfaces (implied volatility manifold, Gaussian bell density, order-book depth mountain); Blender, Canva, Adobe Creative Cloud |
| **Deployment** | Vercel — every push to `main` deploys production |

---

## Getting started

**Requirements:** Node.js 20+ and npm (the repository ships a `package-lock.json`).

```bash
git clone https://github.com/naresh-cn2/cn2-identity-hub.git
cd cn2-identity-hub
npm install
npm run dev        # development server → http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run lint` | ESLint across the codebase |
| `npm run build` | Type-check + production build |
| `npm start` | Serve the production build locally |
| `npx tsc --noEmit` | Standalone type-check (run after `npm run build`, which emits route types) |

---

## Quality standards & Automated QA

- **Editorial honesty** — real evidence only; synthetic visuals say so beside them; simulated figures carry `SIMULATED` or `BACKTEST` provenance; testimonials appear only with the writer's consent and their own rating.
- **Cinematic mathematical atmosphere** — living quantitative geometry (implied volatility surfaces, Gaussian probability manifolds, isometric depth mountains), cursor ambient lighting, and dual cyan/crimson signal route transitions.
- **Responsive** — verified with rendered overflow sweeps from 320 px to 2560 px on every route; touch devices receive enlarged hit areas for compact controls while desktop sizing stays untouched.
- **Accessible** — keyboard-completable interactions, focus-visible states, reduced-motion freezes every animation at its neutral rest state.
- **Performance-conscious** — static generation for all content routes; canvases are DPR-capped, pause when the tab is hidden or scrolled out of view, and run at 0% CPU at idle.
- **SEO & Identity** — `app/sitemap.ts`, `app/robots.ts`, per-route metadata and canonical URLs, a site-wide Open Graph share card (`next/og`), icons + web manifest, and JSON-LD (`Person` + `WebSite`).

### Automated test suites

The rendered-output suites live in `scripts/qa/` and run against any build served on `:3000`:

| Suite | What it asserts | Result |
|---|---|---|
| `live-check.ps1` | Site-wide assertions — motion, accessibility, minimal navigation bar, enquiry form, trust pages, 404, permanent redirects, share-card head tags, landmarks | 133 / 133 |
| `hub-check.ps1` | Hub-universe assertions — portal gate, 8 destination scenes, action links, region labelling, compiled CSS | 56 / 56 |
| `world-check.ps1` | Project-world assertions — systems architecture, case studies, evidence schema, quantitative lab | 88 / 88 |
| `api-check.ps1` | End-to-end API checks — reviews + enquiries + health + rate limiters | 18 / 18 |
| `link-check.ps1` | Crawls seed routes and resolves every internal destination | 4 / 4 (92 destinations) |
| `token-check.ps1` | Static design-token contrast — every text token ≥ 4.5:1 on every surface in both themes | 6 / 6 |
| **Total** | **Continuous automated verification** | **305 / 305** |

```powershell
npm run build; npm start          # serve the production build on :3000
.\scripts\qa\token-check.ps1      # static — runs without a server
.\scripts\qa\api-check.ps1        # run first: it ends on the per-IP 429 limiter by design
.\scripts\qa\live-check.ps1       # run last: needs the rate-limit window to have expired
```

> `api-check.ps1` must run against a **freshly started** server — its final case deliberately trips the rate limiter, which then fails any suite run in the same window.

CI (`.github/workflows/ci.yml`) runs lint, token contrast, production build, type-check and all five server-backed suites on every push to `main` and on every pull request, on `windows-latest` so the PowerShell suites execute under the runtime they were authored against.

---

## Design-system refinements

- Removed all decorative numbering (`DOMAIN / 02 — RESEARCH`, `SECTION / 03 — LAB`, `01 / COMMERCIAL & PLATFORM SYSTEMS`, big `01/02/03` category doors, `NN —` eyebrow numbers); numbering is kept only for genuinely ordered sequences (research methodology spine, chapter navigation, career timeline).
- Removed redundant `ILLUSTRATIVE` artwork captions and corner badges; synthetic visuals carry plain disclosure text beside them (`SYNTHETIC SERIES`, `NOT A MEASUREMENT`, `DETERMINISTIC DIAGRAM`).
- Removed self-referential design commentary (descriptions of the site's own 3D/cinematic/visual design); the cinematic backgrounds, grids, 3D/particle/SVG visuals, accents, typography, animations, and per-page compositions are unchanged.
- Preserved all meaningful technical/scientific disclosures: chart axis/legend/unit info, data sources and limitations, backtest/simulation/paper-trading classifications, synthetic dataset disclosures.

---

## License & contact

No license file is published — this is a personal project; all rights reserved.

**Bukya Naresh** — Quantitative Developer · [Live site](https://cn2.is-a.dev) · [GitHub](https://github.com/naresh-cn2/cn2-identity-hub) · [ORCID](https://orcid.org/0009-0007-7269-1583)