import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { researchEntries } from "@/data/research";
import { ResearchConvergence } from "@/components/opportunities/pathway-visuals";

export const metadata: Metadata = {
  title: "Research Collaboration",
  description:
    "Open to research collaboration on market structure, backtesting, data integrity, risk engineering, and quantitative methods — with collaborators who value reproducible results and transparent methodology.",
  alternates: { canonical: "/opportunities/collaborate" },
  openGraph: {
    title: "Research Collaboration — Bukya Naresh / CN2.dev",
    description:
      "Joint experiments, open research, and technical collaboration on quantitative methods and market structure.",
  },
};

const COLLAB_THEMES = [
  {
    title: "MARKET STRUCTURE",
    focus: "Microstructure, liquidity dynamics, and order-flow toxicity in crypto and traditional venues.",
    related: ["market-data-replay", "qrsip"],
  },
  {
    title: "BACKTESTING INTEGRITY",
    focus: "Deterministic simulation, lookahead-bias prevention, cost modelling, and reproducible artifacts.",
    related: ["apex-quant-engine", "automated-trading-os"],
  },
  {
    title: "DATA INTEGRITY",
    focus: "Point-in-time correctness, representation error, vendor disagreement, and canonical modelling.",
    related: ["quant-market-data-replay", "qrsip"],
  },
  {
    title: "RISK ENGINEERING",
    focus: "Structural risk controls, position sizing under ergodicity, and pre-trade enforcement.",
    related: ["apex-quant-engine", "automated-trading-os"],
  },
  {
    title: "QUANTITATIVE METHODS",
    focus: "Ergodicity economics, ensemble vs time averages, small-edge detection, regime attribution.",
    related: ["research", "articles"],
  },
];

const BUILD_IDS = ["apex-quant-engine", "automated-trading-os", "market-data-replay", "qrsip"];

/** Resolve a related-systems slug to its real destination; null keeps a plain chip. */
function relatedHref(slug: string): { href: string; external: boolean } | null {
  if (slug === "quant-market-data-replay") {
    return { href: "https://github.com/naresh-cn2/quant-market-data-replay", external: true };
  }
  if (slug === "research" || slug === "articles") {
    return { href: `/${slug}`, external: false };
  }
  if (BUILD_IDS.includes(slug)) {
    return { href: `/builds/${slug}`, external: false };
  }
  return null;
}

export default function CollaboratePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="pathways" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                PATH <span className="text-signal">/</span> 03 — RESEARCH COLLABORATION
              </p>
              <p className="label-mono text-faint">JOINT EXPERIMENTS & OPEN RESEARCH</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              COLLABORATE
              <br />
              <span className="text-signal">ON RESEARCH</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                I&apos;m open to research collaboration on market structure, backtesting, data
                integrity, risk engineering, and quantitative methods — work where the question
                is registered up front and the methodology stays transparent.
              </p>
              <div className="viz-frame p-4 md:p-6">
                <div className="relative z-10">
                  <ResearchConvergence />
                  <p className="label-mono mt-3 border-t border-line pt-3 text-[10px] text-faint">
                    COLLABORATION MODEL — REGISTERED QUESTIONS, SHOWN METHOD.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <section aria-label="Collaboration themes" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">COLLABORATION THEMES</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These are the research areas where joint work produces compounding value. Each theme
              connects to existing systems and published research entries.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {COLLAB_THEMES.map((theme, i) => (
              <Reveal key={theme.title} delay={Math.min(i, 3) * 80}>
                <div className="card-depth corner-ticks h-full border border-line bg-background p-6 md:p-8">
                  <span className="num-mono text-xs text-research">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-xl md:text-2xl">{theme.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{theme.focus}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {theme.related.map((r) => {
                      const link = relatedHref(r);
                      if (!link) {
                        return (
                          <span key={r} className="label-mono border border-line px-2 py-1 text-[10px] text-muted">
                            {r.toUpperCase()}
                          </span>
                        );
                      }
                      const cls =
                        "label-mono border border-line px-2 py-1 text-[10px] text-muted transition-colors hover:border-research hover:text-research";
                      return link.external ? (
                        <a key={r} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {r.toUpperCase()} ↗
                        </a>
                      ) : (
                        <Link key={r} href={link.href} className={cls}>
                          {r.toUpperCase()} →
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Governance" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">GOVERNANCE</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">HOW WE WORK TOGETHER</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", t: "REGISTER THE HYPOTHESIS", d: "Every collaboration starts with a falsifiable question, registered before data is touched." },
                { n: "02", t: "AGREE THE EVIDENCE", d: "What artifact would prove the result? Fixed before any code runs." },
                { n: "03", t: "RUN THE EXPERIMENT", d: "Deterministic code, explicit costs, reproducible artifacts." },
                { n: "04", t: "PROMOTION GATE", d: "Verification against the artifact. The gate refuses to bend — that is the feature." },
              ].map((s) => (
                <div key={s.n} className="bg-background p-6">
                  <span className="num-mono text-xs text-research">{s.n}</span>
                  <h3 className="display mt-3 text-lg">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Open research" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">OPEN RESEARCH ENTRIES</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These ongoing entries are open to external contribution — the question is registered,
              the answer does not exist yet.
            </p>
          </Reveal>
          <div className="mt-12 space-y-px bg-line">
            {researchEntries
              .filter((r) => r.status === "ONGOING")
              .slice(0, 4)
              .map((r, i) => (
                <Reveal key={r.id} delay={i * 70}>
                  <Link
                    href={`/research/${r.id}`}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <span className="label-mono text-faint">{r.category}</span>
                    <h3 className="display mt-3 text-xl md:text-2xl">{r.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{r.result}</p>
                    <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-faint">
                      <span className="label-mono text-[10px] text-signal">LIMITATION — </span>
                      {r.limitation}
                    </p>
                    <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                      READ THE ENTRY →
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">PROPOSE A HYPOTHESIS</p>
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
