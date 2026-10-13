import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import ChainVisual from "@/components/case-study/chain-visual";
import ProjectMark from "@/components/builds/project-mark";
import { caseStudies } from "@/data/case-studies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Deep-dive case studies for each flagship system — the problem, architecture, data flow, experiments, results and limitations behind it.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Bukya Naresh / CN2.dev",
    description:
      "Falsifiable questions, deterministic methods, published limitations — each study traces the question through method and evidence to the conclusion.",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="field" />
        <ChainVisual />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 02 — CASE STUDIES
              </p>
              <p className="label-mono text-faint">
                {caseStudies.length} DEEP-DIVE STUDIES
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">CASE STUDIES</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Every substantial project gets a case study: a deep dive into the problem,
              architecture, data flow, methods, experiments, results and limitations — the same
              work the build overview covers, at full depth.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/builds"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
              >
                THE BUILDS →
              </Link>
              <Link
                href="/research"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                THE RESEARCH →
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      <section aria-label="Reading the results" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-signal">READING THE RESULTS</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-6 sm:grid-cols-2">
                <p className="text-base leading-relaxed text-muted">
                  Results are labelled by how they were produced —{" "}
                  <span className="text-foreground">BACKTEST</span>,{" "}
                  <span className="text-foreground">SIMULATION</span>,{" "}
                  <span className="text-foreground">SELF-BENCHMARK</span>,{" "}
                  <span className="text-foreground">TEST SUITE</span> or{" "}
                  <span className="text-foreground">ILLUSTRATIVE</span>, so a simulated figure is
                  never read as live trading.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Studies whose system is still in development are marked as such instead of
                  carrying estimated numbers. Where a visual is a diagram rather than a
                  measurement, it is labelled as a diagram.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Case study index" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE STUDIES</h2>
              <p className="label-mono text-faint">SELECT ANY STUDY TO READ THE FULL CHAIN</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.id} delay={Math.min(i, 3) * 80}>
                <Link
                  href={`/case-studies/${study.id}`}
                  className="card-depth group flex h-full flex-col border border-transparent bg-background p-6 transition-colors hover:bg-surface md:p-8"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="label-mono text-faint">STUDY / {study.index}</span>
                    <span className="label-mono flex items-center gap-2 text-foreground">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      {study.status}
                    </span>
                  </div>
                  <span className="viz-frame mt-5 block h-24 w-full md:h-28" aria-hidden="true">
                    <ProjectMark id={study.id} />
                  </span>
                  <span className="display mt-6 block text-xl md:text-2xl">{study.title}</span>
                  <span className="mt-4 block flex-1 text-base leading-relaxed text-muted">
                    {study.thesis}
                  </span>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted">
                      {study.category}
                    </span>
                  </div>
                  <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                    OPEN CASE STUDY →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Method" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <p className="label-mono text-faint">EVERY STUDY FOLLOWS THIS CHAIN</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-2xl md:text-4xl">QUESTION → HYPOTHESIS → METHOD → EVIDENCE → RESULT → LIMITATION → CONCLUSION</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Each study follows this chain, from the question asked to the conclusion drawn —
              including any step that is still open or unresolved.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Source of evidence" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="corner-ticks flex flex-wrap items-center justify-between gap-8 border border-line bg-background p-8 md:p-12">
              <div className="max-w-xl">
                <p className="label-mono text-faint">SOURCE OF EVIDENCE</p>
                <h2 className="display mt-3 text-2xl md:text-4xl">REPOSITORY IS THE RECORD</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Case studies summarise. The repositories are the actual artifact — commit history,
                  test suites and build configuration included.
                </p>
              </div>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line-strong px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                GITHUB — ALL REPOSITORIES →
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
                <p className="display mt-2 text-2xl md:text-3xl">FROM THE STUDY TO THE BUILD</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <Link
                  href="/research"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                >
                  RESEARCH →
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  GITHUB →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
