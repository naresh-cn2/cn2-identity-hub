<img src="public/images/cn2-hero-final.png" alt="CN2.DEV" width="900" />

# CN2.DEV

**The digital headquarters of Bukya Naresh — Quantitative Developer**

[Live site](https://cn2-identity-hub.vercel.app) · [GitHub](https://github.com/naresh-cn2/cn2-identity-hub) · [ORCID](https://orcid.org/0009-0007-7269-1583) · [Contra](https://contra.com/naresh_cn2)

CN2.DEV is a multi-route professional platform covering quantitative development, systematic trading research, engineering services, and published technical writing. Every claim on the site is backed by real artifacts — working systems, test suites, research entries, certificates with verification links — and nothing is invented: no fabricated credentials, clients, metrics, or quotations.

---

## What lives here

| Destination | What it is |
| --- | --- |
| `/` | Entrance — code-generated mathematical identity with real-time 3D Parametric Implied Volatility Surface |
| `/hub` | Headquarters — the master index with central 3D Holographic Data Gate & 8 animated destination scenes |
| `/work` | WORK — the project catalogue; 3D Isometric Order-Book Depth Mountain & interactive project worlds (`/work/<project>`) |
| `/case-studies` | Deep technical proof per project (`/case-studies/<project>`) |
| `/research` | Research entries with stated method, findings, and 3D Gaussian Probability Density Manifold |
| `/articles` | Engineering articles & methodologies |
| `/capabilities` | 12 core capability domains & searchable 72+ item **Tech Stack & Tooling Architecture** |
| `/services` | Service offerings anchored to capabilities and proven by projects |
| `/lab` | Interactive instruments — 3D risk/return surface, strategy viewer, market replay, experiments |
| `/intelligence` | Knowledge graph connecting projects, research and capabilities |
| `/credentials` | Issued certificates (including **CS50x Harvard**, WorldQuant, NSDC) with verification URLs and PDF viewer |
| `/opportunities` | Career, freelance, collaboration and partnership pathways |
| `/testimonials` | Reviews & testimonials — consented feedback with per-review ratings |
| `/how-i-work` | How engagements actually run — six steps from brief to handover |
| `/privacy`, `/terms` | Plain-language data handling and ground rules |
| `/about`, `/identity`, `/cv`, `/proof`, `/links`, `/contact` | Profile, record and contact surfaces |

The top bar is deliberately minimal — brand, search and the light/dark toggle. Every destination stays reachable through the command palette (<kbd>⌘K</kbd>), the footer route index, `/links` and the hub.

---

## Tech stack & Tooling Architecture

| Category | Technologies & Tools |
| --- | --- |
| **Languages** | C, C++, Python, Rust, TypeScript, JavaScript, C#, R, Scala, Ruby, Java, Bash Script, HTML5, Objective-C, Crystal, Markdown |
| **Frameworks & Runtimes** | Next.js 16 (App Router, Turbopack), React 19, Node.js, FastAPI, Flask, NestJS, Fastify, Deno.js, Electron, Nuxt, Angular.js, React Native, .NET, JavaFX |
| **Data, ML & Quant** | NumPy, Pandas, SciPy, CUDA, Anaconda, Power BI, Chart.js, OpenAPI / Swagger |
| **Databases & Storage** | PostgreSQL, SQLite (WAL), MySQL, Microsoft SQL Server, Amazon DynamoDB |
| **Cloud & Infrastructure** | AWS, Azure, Google Cloud Platform, Cloudflare, DigitalOcean, Firebase, Heroku, Linode, Netlify, Oracle Cloud, OpenStack |
| **DevOps & Tooling** | Docker, Kubernetes, Git, GitHub Actions, GitLab CI, Forgejo, Playwright, Jira, Notion |
| **Visual & 3D Systems** | Pure CSS, SVG, and Canvas 2D/WebGL mathematical surfaces (implied volatility manifold, Gaussian bell density, order-book depth mountain); Blender, Canva, Adobe Creative Cloud |
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
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run lint` | ESLint across the codebase |
| `npm run build` | Type-check + production build (all 76 routes static-prerendered) |
| `npm start` | Serve the production build locally |

---

## Quality standards & Automated QA

- **Editorial honesty** — real evidence only; synthetic visuals are labeled `SIMULATED` or `ILLUSTRATIVE`; testimonials appear only with the writer's consent and their own rating.
- **Cinematic mathematical atmosphere** — living 3D quantitative geometry (implied volatility surfaces, Gaussian probability manifolds, isometric depth mountains), photon cursor ambient lighting, and dual cyan/crimson signal route transitions.
- **Responsive** — verified with rendered overflow sweeps from 320 px to 2560 px on every route; touch devices receive enlarged hit areas for compact controls while desktop sizing stays untouched.
- **Accessible** — keyboard-completable interactions, focus-visible states, reduced-motion freezes every animation at its neutral rest state.
- **Performance-conscious** — static generation for all 76 content routes; canvases are DPR-capped, pause when the tab is hidden or scrolled out of view, and run at 0% CPU at idle.
- **SEO & Identity** — `app/sitemap.ts`, `app/robots.ts`, per-route metadata and canonical URLs, a site-wide Open Graph share card (`next/og`), icons + web manifest, and JSON-LD (`Person` + `WebSite`).

### Automated Test Suites

The rendered-output suites live in `scripts/qa/` and run against any build served on `:3000`:

| Suite | What it asserts | Assertions |
| --- | --- | --- |
| `live-check.ps1` | Site-wide assertions — motion, accessibility, minimal navigation bar, enquiry form, trust pages, 404, share-card head tags | 133 / 133 PASS |
| `hub-check.ps1` | Hub-universe assertions — portal gate, 8 destination scenes, action links | 56 / 56 PASS |
| `world-check.ps1` | Project-world assertions — systems architecture, case studies, quantitative lab | 88 / 88 PASS |
| `api-check.ps1` | End-to-end API checks — reviews + enquiries + health + rate limiters | 18 / 18 PASS |
| `token-check.ps1` | Static design-token contrast — every text token ≥ 4.5:1 on every surface in both themes | 6 / 6 PASS |
| **Total** | **Continuous Automated Verification** | **301 / 301 PASS** |

```powershell
npm run build; npm start          # serve the production build on :3000
.\scripts\qa\token-check.ps1      # static — runs without a server
.\scripts\qa\live-check.ps1       # runs full live suite
```

---

## License & contact

No license file is published — this is a personal project; all rights reserved.

**Bukya Naresh** — Quantitative Developer · [Live site](https://cn2-identity-hub.vercel.app) · [GitHub](https://github.com/naresh-cn2/cn2-identity-hub) · [ORCID](https://orcid.org/0009-0007-7269-1583)
