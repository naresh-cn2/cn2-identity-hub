import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Open to quantitative research, engineering, freelance contracts, research collaboration and technical partnerships. Scoped honestly — what gets delivered is what can be evidenced.",
  alternates: { canonical: "/opportunities" },
  openGraph: {
    title: "Opportunities — Bukya Naresh / CN2.dev",
    description:
      "Quantitative research, market-data engineering, freelance contracts, research collaboration and technical partnerships.",
  },
};

const PATHWAYS = [
  {
    code: "01",
    href: "/opportunities/career",
    label: "EMPLOYMENT",
    title: "QUANTITATIVE DEVELOPMENT & RESEARCH ROLES",
    description:
      "Seeking roles in quantitative development, systematic trading research, market-data infrastructure, and risk engineering. This page details education, projects, experience and an actual CV — all evidenced in the archive.",
    status: "ACTIVE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v5" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4" />
      </svg>
    ),
  },
  {
    code: "02",
    href: "/opportunities/freelance",
    label: "FREELANCE & CONTRACTS",
    title: "TECHNICAL PROJECTS & RESEARCH PROTOTYPES",
    description:
      "Available for defined-scope technical projects: research prototypes, market-data tooling, quantitative analysis systems, and automation workflows. All work is evidenced by actual projects in the archive.",
    status: "AVAILABLE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    code: "03",
    href: "/opportunities/collaborate",
    label: "RESEARCH COLLABORATION",
    title: "JOINT EXPERIMENTS & OPEN RESEARCH",
    description:
      "Open to research collaboration on market structure, backtesting, data integrity, risk engineering, and quantitative methods. Collaboration requires shared interest in evidence-based outcomes and transparent methodology.",
    status: "OPEN",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    code: "04",
    href: "/opportunities/partnerships",
    label: "BUSINESS & PARTNERSHIPS",
    title: "TECHNICAL PARTNERSHIPS & PRODUCT OPPORTUNITIES",
    description:
      "Appropriate contact pathway for genuine technical partnerships and future product opportunities. No fake company claims — this is an individual practice with a serious professional identity.",
    status: "SELECTIVE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function OpportunitiesPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="orbit" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 13 — OPPORTUNITIES
              </p>
              <p className="label-mono text-faint">{site.status}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">OPPORTUNITIES</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Open to quantitative research, engineering, freelance contracts, research collaboration
              and technical partnerships. Scoped honestly — what gets delivered is what can be
              evidenced. Each pathway below is a real destination with its own page.
            </p>
          </Reveal>
        </div>
      </header>

      <section aria-label="Opportunity pathways" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">PATHWAYS</h2>
              <p className="label-mono text-faint">SELECT THE ONE THAT MATCHES YOUR NEED</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {PATHWAYS.map((p, i) => (
              <Reveal key={p.code} delay={i * 80}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="label-mono text-faint">PATH / {p.code}</span>
                    <span className="label-mono flex items-center gap-2 text-foreground">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      {p.status}
                    </span>
                  </div>
                  <span className="display mt-6 block text-xl md:text-2xl">{p.label}</span>
                  <span className="mt-4 block flex-1 text-base leading-relaxed text-muted">
                    {p.title}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                  <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                    OPEN PATHWAY →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Direct contact" className="border-b border-line">
        <div className="scanlines relative mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 md:py-32">
          <Reveal>
            <p className="label-mono text-faint">NO FORMS. NO FUNNELS. DIRECT.</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display mt-8 text-[clamp(2.2rem,6.5vw,5rem)]">
              START A<br />
              <span className="text-signal">CONVERSATION</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Describe the problem, the data, and what evidence would count as success. Replies are
              substantive, or an honest statement about fit.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.links.email}
                className="corner-ticks label-mono border border-line-strong bg-surface px-8 py-5 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                EMAIL — {site.email.toUpperCase()}
              </a>
              <Link
                href="/cv"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                CV →
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                LINKEDIN →
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                GITHUB →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">INSPECT THE EVIDENCE FIRST</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/proof"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  PROOF →
                </Link>
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <Link
                  href="/about"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  ABOUT →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
