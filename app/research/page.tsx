import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ResearchArchive from "@/components/research/research-archive";
import { researchCategories, researchEntries } from "@/data/research";
import { flagshipProjects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "A research archive across market structure, backtesting, data integrity, risk and quantitative methods. Every entry carries its question, hypothesis, method, evidence, result, limitation and conclusion — including the ones still in progress.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research — Bukya Naresh / CN2.dev",
    description:
      "Questions before conclusions: falsifiable market questions, deterministic methods and published limitations.",
  },
};

const METHOD = [
  "QUESTION",
  "HYPOTHESIS",
  "METHOD",
  "EVIDENCE",
  "RESULT",
  "LIMITATION",
  "CONCLUSION",
] as const;

/** Research-method spine — the visual language of this page, distinct from every other section. */
function MethodSpine() {
  return (
    <svg
      viewBox="0 0 840 96"
      className="h-auto w-full"
      role="img"
      aria-label={`Research method: ${METHOD.join(" then ")}`}
    >
      <line x1="24" y1="30" x2="816" y2="30" stroke="var(--research)" strokeWidth="1" opacity="0.45" />
      {METHOD.map((step, i) => {
        const x = 24 + (i * 792) / (METHOD.length - 1);
        const last = i === METHOD.length - 1;
        return (
          <g key={step}>
            <circle
              cx={x}
              cy="30"
              r={last ? 7 : 4.5}
              fill={last ? "var(--signal)" : "var(--research)"}
            />
            <line x1={x} y1="34" x2={x} y2="46" stroke="var(--line-strong)" strokeWidth="1" />
            <text
              x={x}
              y="64"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.14em"
              fill={last ? "var(--signal)" : "var(--muted)"}
              style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            >
              {step}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ResearchPage() {
  const ongoing = researchEntries.filter((e) => e.status === "ONGOING").length;
  const verified = researchEntries.filter((e) => e.status === "VERIFIED").length;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                DOMAIN <span className="text-research">/</span> 02 — RESEARCH
              </p>
              <p className="label-mono text-faint">
                {researchEntries.length} ENTRIES · {verified} VERIFIED · {ongoing} ONGOING
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">RESEARCH</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Questions before conclusions. Every entry carries its question, hypothesis, method,
              evidence, result, limitation and conclusion — including the ones still in progress and
              the ones whose answer is a limitation rather than a finding.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12">
              <MethodSpine />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- evidence policy ---- */}
      <section aria-label="Research evidence policy" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-research">EVIDENCE POLICY</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-6 sm:grid-cols-2">
                <p className="text-base leading-relaxed text-muted">
                  Three states, and they mean exactly what they say.{" "}
                  <span className="text-foreground">VERIFIED</span> — reproduced against the artifact.{" "}
                  <span className="text-foreground">DOCUMENTED</span> — written up from real work,
                  with limits stated. <span className="text-signal">ONGOING</span> — the question is
                  registered and the answer does not exist yet.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  An unfinished entry stays visible rather than being withheld until it looks
                  impressive. The visual beside each entry is a generative diagram of its category —
                  labelled illustrative, never presented as a measured result.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- archive ---- */}
      <section aria-label="Research archive" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE ARCHIVE</h2>
              <p className="label-mono text-faint">EXPAND ANY ENTRY TO READ THE FULL CHAIN</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          <ResearchArchive entries={researchEntries} />
        </div>
      </section>

      {/* ---- categories ---- */}
      <section aria-label="Research categories" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <h2 className="display text-2xl md:text-4xl">CATEGORIES</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {researchCategories.map((c) => (
              <span key={c} className="label-mono border border-line px-3 py-1.5 text-[10px] text-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- research produced by builds ---- */}
      <section aria-label="Builds producing research" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <p className="label-mono text-faint">WHERE THE EVIDENCE COMES FROM</p>
            <h2 className="display mt-4 text-2xl md:text-4xl">BUILT SYSTEMS, NOT OPINIONS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Most entries here exist because a system was built that could answer the question.
              The builds are the evidence source; the research is what the evidence turned out to
              mean.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {flagshipProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <Link
                  href={`/builds/${p.id}`}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                >
                  <span className="num-mono text-xs text-faint">{p.index}</span>
                  <span className="display mt-3 text-lg">{p.shortTitle}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{p.thesis}</span>
                  <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                    OPEN BUILD →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- continuation ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">
                  READ THE WRITING OR RUN THE INSTRUMENTS
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/articles"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  ARTICLES →
                </Link>
                <Link
                  href="/lab"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  ENTER LAB →
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
