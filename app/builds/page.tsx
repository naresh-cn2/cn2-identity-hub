import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import BuildsArchive from "@/components/builds/builds-archive";
import { archiveProjects } from "@/data/archive";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "The complete build archive — quantitative systems, market-data infrastructure, research tooling and financial data engines. Every figure carries its provenance.",
  alternates: { canonical: "/builds" },
  openGraph: {
    title: "Builds — Bukya Naresh / CN2.dev",
    description:
      "Quantitative systems, market-data infrastructure, research tooling and financial data engines, with evidence per claim.",
  },
};

export default function BuildsPage() {
  const flagshipCount = archiveProjects.filter((p) => p.tier === 1).length;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 01 — BUILDS
              </p>
              <p className="label-mono text-faint">
                {archiveProjects.length} SYSTEMS · {flagshipCount} FLAGSHIP
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">BUILDS</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              The complete work archive. Not a highlight reel — every system built for research,
              markets or data infrastructure, including the ones still in development and the ones
              whose evidence surface is deliberately thin.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
              >
                THE RESEARCH BEHIND THEM →
              </Link>
              <Link
                href="/capabilities"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                WHAT I CAN CONTRIBUTE →
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- evidence policy ---- */}
      <section aria-label="Evidence policy" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-signal">EVIDENCE POLICY</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-6 sm:grid-cols-2">
                <p className="text-base leading-relaxed text-muted">
                  Every number on this page carries a provenance tag —{" "}
                  <span className="text-foreground">BACKTEST</span>,{" "}
                  <span className="text-foreground">SIMULATION</span>,{" "}
                  <span className="text-foreground">SELF-BENCHMARK</span>,{" "}
                  <span className="text-foreground">TEST SUITE</span> or{" "}
                  <span className="text-foreground">ILLUSTRATIVE</span>. A backtest is never presented
                  as live trading.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Projects with no published benchmark say so explicitly rather than borrowing
                  credibility from the rest of the archive. Where a visual is a diagram rather than a
                  measurement, it is labelled as a diagram.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- the archive ---- */}
      <section aria-label="Build archive" className="py-16 md:py-24">
        <BuildsArchive projects={archiveProjects} />
      </section>

      {/* ---- source of truth ---- */}
      <section aria-label="Source of evidence" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="corner-ticks flex flex-wrap items-center justify-between gap-8 border border-line bg-surface p-8 md:p-12">
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
    </>
  );
}
