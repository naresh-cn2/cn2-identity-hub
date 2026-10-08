import type { Metadata } from "next";
import Link from "next/link";
import { researchEntries } from "@/data/research";
import { getProject } from "@/data/projects";
import Reveal from "@/components/ui/reveal";
import { DataField } from "@/components/viz/quant-primitives";
import ResearchVisualArtifacts from "@/components/research/research-visual-artifacts";


export const metadata: Metadata = {
  title: "Research",
  description:
    "Questions before conclusions — a research archive across market structure, backtesting, data integrity, risk and quantitative methods, plus the infrastructure case studies.",
  alternates: { canonical: "/research" },
};

const studyIds = ["market-data-replay", "qrsip"] as const;

export default function ResearchPage() {
  const studies = studyIds.map((id) => getProject(id)!);

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 02 — RESEARCH
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">RESEARCH</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Questions before conclusions. Every entry carries its question, hypothesis, method,
              evidence, result, limitation and conclusion — including the ones still in progress.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 h-64 w-full max-w-4xl">
              <DataField seed={99} gridSize={20} amplitude={0.4} showSignalTrace />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- infrastructure case studies ---- */}
      <section aria-label="Infrastructure case studies" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-faint">INFRASTRUCTURE CASE STUDIES</p>
          </Reveal>
          <div className="mt-10 space-y-px bg-line">
            {studies.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <Link
                  href={p.route}
                  className="group grid gap-6 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-12 md:p-10"
                >
                  <span className="num-mono text-5xl font-semibold text-line-strong transition-colors group-hover:text-signal md:text-7xl">
                    {p.index}
                  </span>
                  <span>
                    <span className="label-mono text-faint">{p.category}</span>
                    <span className="display mt-3 block text-3xl md:text-5xl">{p.title}</span>
                    <span className="mt-4 block max-w-2xl text-base leading-relaxed text-muted">
                      {p.thesis}
                    </span>
                  </span>
                  <span className="flex flex-col items-start gap-3 md:items-end">
                    <span className="label-mono border border-line px-3 py-1.5 text-foreground">
                      {p.status}
                    </span>
                    <span className="label-mono text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN CASE STUDY →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- research archive ---- */}
      <section aria-label="Research archive" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE ARCHIVE</h2>
              <p className="label-mono text-faint">
                {researchEntries.length} ENTRIES — QUESTION → CONCLUSION
              </p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-px bg-line">
            {researchEntries.map((entry, i) => (
              <Reveal key={entry.id} delay={Math.min(i, 3) * 60}>
                <details className="group bg-background">
                  <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-6 gap-y-2 p-5 transition-colors hover:bg-surface md:p-7 [&::-webkit-details-marker]:hidden">
                    <span className="num-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display min-w-0 flex-1 text-lg md:text-2xl">
                      {entry.title}
                    </span>
                    <span className="label-mono text-muted">{entry.category}</span>
                    <span
                      className={`label-mono border px-2 py-1 ${
                        entry.status === "VERIFIED"
                          ? "border-line-strong text-foreground"
                          : entry.status === "DOCUMENTED"
                            ? "border-line text-muted"
                            : "border-signal text-signal"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </summary>
                  <div className="grid gap-8 border-t border-line p-5 md:grid-cols-2 md:p-7 lg:grid-cols-3">
                    {(
                      [
                        ["QUESTION", entry.question],
                        ["HYPOTHESIS", entry.hypothesis],
                        ["METHOD", entry.method],
                        ["EVIDENCE", entry.evidence],
                        ["RESULT", entry.result],
                        ["LIMITATION", entry.limitation],
                      ] as const
                    ).map(([label, body]) => (
                      <div key={label}>
                        <p className="label-mono text-signal">{label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                      </div>
                    ))}
                    <div className="md:col-span-2 lg:col-span-3">
                      <p className="label-mono text-foreground">CONCLUSION</p>
                      <p className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-foreground">
                        {entry.conclusion}
                      </p>
                      {entry.relatedProject && (
                        <p className="label-mono mt-4 text-faint">
                          RELATED EVIDENCE — {entry.relatedProject.toUpperCase()}
                        </p>
                      )}
                    </div>
                    {/* Visual artifact per entry */}
                    <ResearchVisualArtifacts 
                      entries={[{ category: entry.category, index: i }]} 
                    />
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}