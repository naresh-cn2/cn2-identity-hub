import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import BuildsArchive from "@/components/builds/builds-archive";
import HeroTopology from "@/components/builds/hero-topology";
import { archiveProjects } from "@/data/archive";
import { career } from "@/data/career";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Quantitative systems, market-data infrastructure, research tooling and financial data engines — each project documented from the problem through the implementation to its current status.",
  alternates: { canonical: "/builds" },
  openGraph: {
    title: "Builds — Bukya Naresh / CN2.dev",
    description:
      "Quantitative systems, market-data infrastructure, research tooling and financial data engines, documented project by project.",
  },
};

export default function BuildsPage() {
  const flagshipCount = archiveProjects.filter((p) => p.tier === 1).length;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <HeroTopology projects={archiveProjects} />
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
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">IDEAS INTO WORKING SYSTEMS.</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Explore my work across quantitative finance, algorithmic research, data
              infrastructure, software engineering, and technical automation. Each project
              documents the problem, the approach, the implementation, and the progress made so
              far.
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

      {/* ---- reading the results ---- */}
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
                  Projects still in development are marked as such instead of carrying estimated
                  numbers. Where a visual is a diagram rather than a measurement, it is labelled as
                  a diagram.
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

      {/* ---- the record — preserved from the about page ---- */}
      <section aria-label="The record" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE RECORD</h2>
              <p className="label-mono text-faint">SELECTED SYSTEMS · SOLE ARCHITECT &amp; ENGINEER</p>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              A sequence of systems I built end to end, each with its own results and a link to
              the build or repository behind it.
            </p>
          </Reveal>

          <ol className="mt-12">
            {career.experience.map((item, i) => {
              const isLast = i === career.experience.length - 1;
              return (
                <li key={item.project}>
                  <Reveal delay={Math.min(i, 4) * 80}>
                    <div className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8">
                      <div className="flex flex-col items-center" aria-hidden="true">
                        <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-signal bg-background" />
                        {!isLast && <span className="mt-1 w-px flex-1 bg-line" />}
                      </div>
                      <div className={isLast ? "min-w-0" : "min-w-0 pb-10"}>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="num-mono text-xs text-signal">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="display text-xl md:text-2xl">{item.project}</h3>
                          <span className="label-mono text-[10px] text-faint">{item.role}</span>
                        </div>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.scope}</p>
                        <p className="label-mono mt-3 text-[10px] text-research">{item.metrics}</p>
                        {item.href.startsWith("http") ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-line label-mono mt-4 inline-block text-[10px] text-foreground transition-colors hover:text-signal"
                          >
                            REPOSITORY ↗
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="link-line label-mono mt-4 inline-block text-[10px] text-foreground transition-colors hover:text-signal"
                          >
                            OPEN BUILD →
                          </Link>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
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
