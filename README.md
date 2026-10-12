# CN2.DEV

**Quantitative Intelligence Digital Headquarters**

CN2.DEV is a premium, cinematic, multi‑page web application that serves as a professional platform for a quantitative developer, researcher, and builder. It showcases quantitative development, algorithmic‑trading research, financial analytics, data engineering, software products, technical projects, research and experimentation, professional credentials, client services, employment and freelance opportunities, and research collaborations.

The site is built with a futuristic science‑fiction aesthetic, deep graphite environments, restrained red‑signal accents, electric‑blue/cyan illumination, reflective surfaces, and sophisticated glass interfaces. Every major route has its own visual design and interactive experience, while sharing a consistent navigation, theming, and accessibility foundation.

---

## Table of Contents

- [About CN2.DEV](#about-cn2dev)
- [Technologies](#technologies)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in Development](#running-in-development)
  - [Linting](#linting)
  - [Building for Production](#building-for-production)
  - [Starting the Production Server](#starting-the-production-server)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Repository Organization](#repository-organization)
- [Contributing](#contributing)
- [License](#license)

---

## About CN2.DEV

CN2.DEV is a single‑source‑of‑truth digital headquarters that combines:

- A cinematic entry hero with portal‑centric lighting, drifting smoke, and subtle parallax.
- Project and product galleries (`/builds`), with individual project pages and case studies (`/case-studies`).
- A credential and education archive (`/credentials` / `/about`).
- Service offerings grounded in real capabilities (`/services` / `data/services.ts`).
- Interactive laboratory tools (`/lab`) – risk calculator, strategy visualizer, etc.
- A research library and technical journal (`/research`).
- Opportunity pathways: career, freelance, collaboration, and partnerships (`/opportunities`).
- An immersive contact page with floating glass panels (`/contact`).
- An intelligence graph connecting projects, cases, research, and credentials (`/intelligence`).

All routes are fully navigable, SEO‑friendly (static HTML generation), and share a consistent navigation bar, theme toggle (dark/light), and accessible controls.

---

## Technologies

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI** | [React 19](https://reactjs.org), [Tailwind CSS 4](https://tailwindcss.com) |
| **3D / Visuals** | [Three.js](https://threejs.org), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/react-three-drei), GSAP |
| **Data / Utilities** | [gray‑matter](https://github.com/jfm display/gray-matter), local `data/` modules (`site.ts`, `capabilities.ts`, `case-studies.ts`, `services.ts`) |
| **Icons** | [lucide-react](https://lucide.dev) |
| **Animation** | [GSAP](https://gsap.com) (timeline & morph animations) |
| **Theme** | Custom dark/light theme tokens, persisted via `prefers-color-scheme` and local storage |
| **Accessibility** | Semantic HTML, ARIA labels, focus-visible states, `prefers-reduced-motion` support |
| **Deployment** | Vercel (continuous deployment from `main` branch) |

---

## Repository Structure

```
app/                ← Next.js App Router pages/routes
  /builds           ← project gallery
  /case-studies     ← case‑study index + per‑project pages
  /services         ← service index + /services/[slug]
  /opportunities    ← career, freelance, collaborate, partnerships
  /lab              ← interactive experiment tools
  /research         ← research articles & technical notes
  /about            ← personal background & capabilities
  /contact          ← immersive floating‑panel contact
  /intelligence     ← connected knowledge graph
  /how-i-work       ← workflow narrative
  /cv               ← downloadable CV
  /proof            │
  /links            │
  /testimonials     │
  /certifications   │
  /work-with-me     │
components/
  home/             ← cinematic hero & entry components
  navigation/       ← navbar, command‑palette, theme toggle
  visualizations/   • rr‑distribution, quant‑primitives, knowledge‑graph, hero‑field,
                    figure‑silhouette, equity‑curve, cinematic‑human‑figure,
                    arch‑flow
  case-study/       • interactive‑lab, replay‑preview, chapter‑nav
  lab/              • risk‑calculator, strategy‑visualizer, experiment‑explorer, …
  contact/          • floating‑panel UI, copy‑email
  layout/           • page‑transition, footer, navbar (with bak)
  ui/               • section‑header, reveal, metric, magnetic, text‑reactive (deleted)
data/               ← structured content
  site.ts           ← navigation metadata
  capabilities.ts   • capability definitions
  case-studies.ts   • project‑case data
  services.ts       • service offerings (anchored to capabilities)
  lab.ts            • lab module definitions
styles/               (Tailwind‑driven; no separate CSS repo)
public/               • static assets (hero image, wordmark SVG, icons)
package.json          • dependencies & scripts
tsconfig.json         • TypeScript configuration
tailwind.config.js    • Tailwind v4 configuration
eslint.config.mjs     • ESLint config
next.config.ts        • Next.js settings
.env*                 • (none required currently; .gitignore covers them)
```

Only the folders and files that exist in the repository are listed; redundant or unused files have been removed during the recent organization pass.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) **v20 or later** (the project uses Next 16 which requires Node 20+).
- [pnpm](https://pnpm.io) (recommended) – the lockfile is `pnpm-lock.yaml`. If you prefer npm or yarn, the scripts in `package.json` will also work with those managers.

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/naresh-cn2/cn2-identity-hub.git
cd cn2-identity-hub

# 2️⃣ Install dependencies (pnpm)
pnpm install
# or with npm/yarn:
#   npm install
#   yarn install
```

### Running in Development

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The development server starts at <http://localhost:3000>. Open that URL in a browser to see the site. Hot‑module replacement is enabled; modifying any `app/`, `components/`, or `data/` file updates the page automatically.

### Linting

```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```

ESlint runs against the whole codebase. No errors or warnings are produced when the code is in a clean state.

### Building for Production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

This invokes `next build`, which:

- Type‑checks all `.tsx` files.
- Prerenders every route listed in the app directory (SSG/Static HTML).
- Emits the `.next` build cache and `out/` directory (if using the older export).
- Produces a production‑optimized bundle.

The just‑completed build output (as of the last successful run) shows all expected routes, e.g.:

```
/, /builds, /case-studies, /services, /lab, /research, /about,
/opportunities, /contact, /intelligence, /credentials, /how‑i‑work,
/cv, /proof, /links, /work‑with‑me
plus all slugged sub‑routes.
```

### Starting the Production Server

```bash
pnpm start
# or
npm start
# or
yarn start
```

Serves the `.next` build on <http://localhost:3000>. This mirrors the Vercel production environment.

---

## Available Scripts (package.json)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Starts the Next.js development server with HMR. |
| `build` | `next build` | Produces a production build (type‑check + SSG). |
| `start` | `next start` | Serves the production build locally. |
| `lint` | `eslint` | Runs ESLint across the codebase. |

> **Note:** No test script is currently configured. If you add Jest, Playwright, or similar, you can extend `package.json` accordingly.

---

## Environment Variables

The repository’s `.gitignore` already contains `*.env*`, meaning any `.env` files you create will be ignored by Git. At present the site does **not** require any environment variables to run. If you need to inject configuration (e.g., a Google Analytics ID), add a `.env.local` file and reference `process.env.YOUR_VAR` in your code; just remember to add the variable to `.gitignore` if it contains secrets.

---

## Deployment

The project is configured for seamless deployment on **Vercel**:

1. Connect the GitHub repository `naresh-cn2/cn2-identity-hub` to a new Vercel project.
2. Vercel will automatically run `pnpm build` on each push to `main`.
3. The production site will be available at `https://cn2-identity-hub.vercel.app/` (the current live URL).

No special `vercel.json` configuration is required beyond the default Next.js preset. If you add server‑side functions, place them in `api/` and they will be auto‑deployed.

---

## Repository Organization (for future maintainers)

- **`app/`** – All route files and page components. The App Router structure mirrors the specification’s route tree.
- **`components/`** – Reusable UI pieces, grouped by domain (home, navigation, visualizations, case‑study, lab, contact, layout, generic UI).
- **`data/`** – Single‑source‑of‑truth data modules (`site.ts`, `capabilities.ts`, `case-studies.ts`, `services.ts`, `lab.ts`). These drive the static site generation and navigation metadata.
- **`public/`** – Static assets: the hero background image, CN2.DEV wordmark SVG, favicons, and any other publicly referenced files.
- **`styles/`** – Tailwind‑based styling; no separate CSS repo. All design tokens (colors, fonts, breakpoints) live in `tailwind.config.js`.
- **`package.json` / `pnpm-lock.yaml`** – Dependencies and reproducible installs.
- **`tsconfig.json`** – TypeScript strict mode; no `any` unless truly necessary.
- **`eslint.config.mjs`** – Linting rules aligned with the Next.js recommended config plus custom rules (e.g., no `console.log` in production, accessible anchor patterns).

When adding new pages or features, prefer extending existing modules rather than creating parallel implementations. Keep route slugs stable and reference them from `sitemap.ts` and the navigation config.

---

## Contributing

1. **Preserve existing work.** Before making any changes, run `pnpm build` and `pnpm lint` to confirm the baseline is clean.
2. **Create a feature branch** off `main` (e.g., `git checkout -b feat/new‑lab‑tool`).
3. **Implement** the change, keeping the cinematic visual direction, accessibility, and theming constraints in mind.
4. **Test** locally: `pnpm dev`, verify dark/light theme toggle, check reduced‑motion preference.
5. **Commit** with a descriptive message (e.g., `chore(repo): add risk‑calculator accessible labels`).
6. **Push** and open a Pull Request against `main`. The CI (Vercel preview) will automatically run the build; resolve any failures before merging.
7. **Respect the `.gitignore`** – never commit `.next`, `node_modules`, `*.env*`, or Vercel cache files.

If you are unsure whether a change fits the project’s scope, open a discussion issue first.

---

## License

No license file is currently present in the repository. If you wish to add one, consider a permissive license (e.g., MIT) or a custom statement that reflects the quantitative‑research nature of the project. Until a license is added, the code is for personal/internal use only.

---

## Contact

- **GitHub:** <https://github.com/naresh-cn2/cn2-identity-hub>
- **Live site:** <https://cn2-identity-hub.vercel.app/>
- **Author:** BUKYA NARESH – Quantitative Developer & Researcher

---

*Generated on 2026‑10‑12. The repository is in a clean, buildable state with all routes prerendered, lint passing, and TypeScript checks passing.*