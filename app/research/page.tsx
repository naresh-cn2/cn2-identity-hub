import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import ResearchArchive from "@/components/research/research-archive";
import ResearchLattice from "@/components/research/research-lattice";
import { MethodChainStrip } from "@/components/research/method-chain";
import { researchEntries } from "@/data/research";
import { getArchiveProject } from "@/data/archive";
import { flagshipProjects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "My research explores how markets, quantitative methods, data and software systems interact — the questions I investigate, the methods I use, and the findings and limitations of each study.",
  alternates: { canonical: "/research" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Research — Bukya Naresh / CN2.dev",
    description:
      "Falsifiable market questions, deterministic methods, and the findings and limitations of each study.",
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
  const featured = researchEntries[0];
  const featuredBuild = featured.relatedProject
    ? getArchiveProject(featured.relatedProject)
    : undefined;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="lattice" />
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

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Reveal delay={100}>
                <KineticText className="display text-[clamp(3rem,10vw,8rem)]">QUESTIONS INTO EVIDENCE.</KineticText>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  I investigate how markets, quantitative methods, data and software systems
                  interact. Every entry follows the same spine — question, hypothesis, method,
                  evidence, result, limitation and conclusion — including the ones still in progress
                  and the ones whose answer is a limitation rather than a finding.
                </p>
              </Reveal>
            </div>
            <Reveal delay={240}>
              <div className="viz-frame p-4">
                <ResearchLattice />
                <p className="label-mono mt-3 text-center text-[10px] text-faint">
                  RESEARCH LATTICE
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-14 max-w-5xl">
              <MethodSpine />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- featured investigation ---- */}
      <section aria-label="Featured investigation" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label-mono text-research">FEATURED INVESTIGATION</p>
                <h2 className="display mt-4 max-w-4xl text-3xl md:text-5xl">{featured.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="label-mono text-research">{featured.category}</span>
                <span className="label-mono border border-line-strong px-2 py-1 text-foreground">
                  {featured.status}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground md:text-xl">
              {featured.question}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="viz-frame mt-10 p-5 md:p-8">
              <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="label-mono text-faint">METHOD CHAIN — {featured.status} AT THE TERMINAL NODE</p>
                  {featuredBuild && (
                    <p className="label-mono text-faint">
                      EVIDENCE SOURCE —{" "}
                      <Link href={`/work/${featuredBuild.id}`} className="link-line text-research">
                        {featuredBuild.shortTitle}
                      </Link>
                    </p>
                  )}
                </div>
                <MethodChainStrip entry={featured} className="mt-4" />

                <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
                  <div>
                    <p className="label-mono text-research">METHOD</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.method}</p>
                    <p className="label-mono mt-6 text-research">EVIDENCE</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.evidence}</p>
                  </div>
                  <div>
                    <p className="label-mono text-research">RESULT</p>
                    <p className="mt-3 text-base leading-relaxed text-foreground">{featured.result}</p>
                    <p className="label-mono mt-6 text-signal">LIMITATION</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.limitation}</p>
                    <p className="label-mono mt-6 text-foreground">CONCLUSION</p>
                    <p className="mt-3 text-base font-medium leading-relaxed text-foreground">
                      {featured.conclusion}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <Link
                    href={`/research/${featured.id}`}
                    className="label-mono inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                  >
                    OPEN THE FULL ENTRY →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- reading guidance ---- */}
      <section aria-label="How entries are structured" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-research">HOW ENTRIES ARE STRUCTURED</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-6 sm:grid-cols-2">
                <p className="text-base leading-relaxed text-muted">
                  Each entry carries one of three statuses.{" "}
                  <span className="text-foreground">VERIFIED</span> — reproduced against the artifact.{" "}
                  <span className="text-foreground">DOCUMENTED</span> — written up from real work,
                  with limits stated. <span className="text-signal">ONGOING</span> — the question is
                  registered and the answer does not exist yet.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Every entry states its question, method, evidence, result and limitation —
                  including entries still in progress, which are marked as such and published
                  alongside completed work. The visual beside each entry is a generative diagram of
                  its category, labelled illustrative.
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

      {/* ---- research produced by builds ---- */}
      <section aria-label="Builds producing research" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <p className="label-mono text-faint">WHERE THE EVIDENCE COMES FROM</p>
            <h2 className="display mt-4 text-2xl md:text-4xl">BUILT SYSTEMS</h2>
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
                  href={`/work/${p.id}`}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                >
                  <span className="num-mono text-xs text-faint">{p.index}</span>
                  <span className="display mt-3 text-lg">{p.shortTitle}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{p.thesis}</span>
                  <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                    OPEN PROJECT →
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
                  href="/capabilities"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CAPABILITIES →
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
