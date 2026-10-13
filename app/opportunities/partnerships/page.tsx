import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { flagshipProjects } from "@/data/projects";
import { PartnershipModules } from "@/components/opportunities/pathway-visuals";

export const metadata: Metadata = {
  title: "Business & Partnerships",
  description:
    "Technical partnerships and product opportunities for quantitative systems, market-data infrastructure and research tooling — from an independent practice.",
  alternates: { canonical: "/opportunities/partnerships" },
  openGraph: {
    title: "Partnerships — Bukya Naresh / CN2.dev",
    description:
      "Technical partnerships and product opportunities for quantitative systems and research infrastructure.",
  },
};

const PARTNERSHIP_TYPES = [
  {
    code: "01",
    title: "TECHNICAL INFRASTRUCTURE",
    focus: "Co-building market-data pipelines, backtesting engines, or risk systems with shared IP.",
    evidence: ["Apex Quant Engine", "Quant Market Data Replay"],
    stage: "EXPLORATION",
  },
  {
    code: "02",
    title: "RESEARCH PRODUCTIZATION",
    focus: "Taking a verified research finding and engineering it into a reusable, documented product.",
    evidence: ["QRSIP", "Automated Trading OS"],
    stage: "VALIDATION",
  },
  {
    code: "03",
    title: "DATA LICENSING",
    focus: "Point-in-time correct market data or derived signals with exact provenance and redistribution rights.",
    evidence: ["Quant Market Data Replay"],
    stage: "SCOPING",
  },
  {
    code: "04",
    title: "OPEN-SOURCE COLLABORATION",
    focus: "Jointly maintaining critical infrastructure — deterministic simulation, exact decimal arithmetic, replay tooling.",
    evidence: ["All public repositories"],
    stage: "ONGOING",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="pathways" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                PATH <span className="text-signal">/</span> 04 — BUSINESS & PARTNERSHIPS
              </p>
              <p className="label-mono text-faint">TECHNICAL PARTNERSHIPS & PRODUCT OPPORTUNITIES</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              PARTNERSHIPS
              <br />
              <span className="text-signal">& PRODUCTS</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                I&apos;m open to technical partnerships and product opportunities where
                quantitative systems, market-data infrastructure or research tooling is central.
                I work independently and take on partnerships selectively.
              </p>
              <div className="viz-frame p-4 md:p-6">
                <div className="relative z-10">
                  <PartnershipModules />
                  <p className="label-mono mt-3 border-t border-line pt-3 text-[10px] text-faint">
                    PARTNERSHIP MODELS — FOUR FORMS, ONE CORE.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <section aria-label="Partnership types" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">PARTNERSHIP MODELS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Each model below builds on systems I have already built and can demonstrate —
              with repositories, case studies and results you can inspect directly.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {PARTNERSHIP_TYPES.map((p, i) => (
              <Reveal key={p.code} delay={i * 80}>
                <div className="corner-ticks h-full bg-background p-6 md:p-8">
                  <span className="num-mono text-xs text-signal">{p.code}</span>
                  <h3 className="display mt-4 text-xl md:text-2xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{p.focus}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.evidence.map((e) => (
                      <span key={e} className="label-mono border border-line px-2 py-1 text-[10px] text-muted">
                        {e}
                      </span>
                    ))}
                  </div>
                  <p className="label-mono mt-6 text-[10px] text-faint">STAGE: {p.stage}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Flagship systems" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">SYSTEMS AVAILABLE FOR PARTNERSHIP</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              The flagship systems that could form the basis of a partnership. Each has its own
              repository, case study, and evidence trail.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {flagshipProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <Link
                  href={`/builds/${p.id}`}
                  className="card-depth group flex h-full flex-col border border-line bg-background p-6"
                >
                  <span className="num-mono text-xs text-faint">{p.index}</span>
                  <span className="display mt-3 text-lg">{p.shortTitle}</span>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.thesis}</p>
                  <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                    OPEN BUILD →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Partnership principles" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">PRINCIPLES</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">WHAT I DON&apos;T TAKE ON</h2>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 space-y-4 max-w-3xl">
              {[
                "No equity-for-work arrangements without a signed agreement and defined scope.",
                "No white-labeling of systems — the archive is the proof, the brand stays CN2.DEV.",
                "No NDAs that prevent publishing methodology, limitations, or negative results.",
                "No partnerships that require misrepresenting backtests as live trading.",
                "No 'advisor' roles where the contribution is a name on a slide deck.",
                "No revenue-share without auditable, reproducible performance attribution.",
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">PROPOSE A PARTNERSHIP</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CONTACT →
                </Link>
                <Link
                  href="/opportunities"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  ALL PATHWAYS →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
