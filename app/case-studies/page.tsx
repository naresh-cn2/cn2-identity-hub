import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ProjectMark from "@/components/builds/project-mark";
import { caseStudyCards } from "@/data/case-studies";
import { researchEntries } from "@/data/research";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "The deep technical proof layer — full evidence chains for the flagship systems: context, problem, research question, hypothesis, architecture, methodology, experiments, results, failures, limitations and current state.",
    alternates: { canonical: "/case-studies" },
    openGraph: {
        title: "Case Studies — Bukya Naresh / CN2.dev",
        description:
            "Context, hypothesis, architecture, experiments, results, failures and limitations for every flagship system.",
    },
};

/** The evidence-chain spine — the visual language of this page. */
const SPINE = [
    "CONTEXT",
    "PROBLEM",
    "HYPOTHESIS",
    "ARCHITECTURE",
    "METHOD",
    "EXPERIMENTS",
    "RESULTS",
    "FAILURES",
    "LIMITS",
] as const;

function Spine() {
    return (
        <svg viewBox="0 0 900 72" className="h-auto w-full" role="img" aria-label={`Case study chain: ${SPINE.join(" then ")}`}>
            <line x1="20" y1="24" x2="880" y2="24" stroke="var(--signal)" strokeWidth="1" opacity="0.35" />
            {SPINE.map((step, i) => {
                const x = 20 + (i * 860) / (SPINE.length - 1);
                return (
                    <g key={step}>
                        <circle cx={x} cy="24" r={i === SPINE.length - 1 ? 6 : 3.5} fill={i === SPINE.length - 1 ? "var(--signal)" : "var(--line-strong)"} />
                        <line x1={x} y1="28" x2={x} y2="38" stroke="var(--line-strong)" strokeWidth="1" />
                        <text
                            x={x}
                            y="54"
                            textAnchor="middle"
                            fontSize="9"
                            letterSpacing="0.12em"
                            fill="var(--muted)"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {step}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default function CaseStudiesPage() {
    return (
        <>
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <p className="label-mono text-muted">
                                SECTION <span className="text-signal">/</span> 02 — CASE STUDIES
                            </p>
                            <p className="label-mono text-faint">{caseStudyCards.length} DEEP DIVES</p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="display mt-8 text-[clamp(2.6rem,9vw,7rem)]">CASE STUDIES</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                            The deep technical proof layer. Where a build page says what a system is, a case study
                            shows how it was reasoned, built, tested, where it failed and what it still cannot
                            claim. Not text walls — the argument is visualised.
                        </p>
                    </Reveal>
                    <Reveal delay={280}>
                        <div className="mt-12">
                            <Spine />
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* ---- honesty policy ---- */}
            <section aria-label="Case study policy" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
                    <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
                        <Reveal>
                            <p className="label-mono text-signal">WHAT A CASE STUDY OWES</p>
                        </Reveal>
                        <Reveal delay={80}>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <p className="text-base leading-relaxed text-muted">
                                    Every study carries its <span className="text-foreground">failures</span> and{" "}
                                    <span className="text-foreground">limitations</span> beside the results, not after
                                    them. A simulated number is labelled simulated; a backtest is never shown as live
                                    performance.
                                </p>
                                <p className="text-base leading-relaxed text-muted">
                                    An unfinished study stays visible with its open question intact. The repository
                                    link is the final authority — the case study summarises, the code proves.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ---- the studies ---- */}
            <section aria-label="Case study archive" className="py-16 md:py-24">
                <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
                    <div className="grid gap-px bg-line lg:grid-cols-2">
                        {caseStudyCards.map((c, i) => {
                            const related = researchEntries.filter((r) => r.relatedProject === c.id);
                            return (
                                <Reveal key={c.id} delay={Math.min(i, 3) * 90}>
                                    <article className="flex h-full flex-col bg-background p-6 md:p-8">
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span className="num-mono text-4xl font-semibold text-line-strong md:text-5xl">
                                                {c.index}
                                            </span>
                                            <span className="label-mono text-faint">{c.category}</span>
                                        </div>

                                        <div className="mt-6 h-32 w-full border border-line bg-surface md:h-36">
                                            <ProjectMark id={c.id} />
                                        </div>

                                        <h2 className="display mt-6 text-2xl md:text-3xl">{c.title}</h2>
                                        <p className="mt-4 text-sm leading-relaxed text-muted">{c.thesis}</p>

                                        <div className="mt-6 border-t border-line pt-5">
                                            <p className="label-mono text-[10px] text-faint">RESEARCH QUESTION</p>
                                            <p className="mt-2 text-sm leading-relaxed text-foreground">
                                                {c.researchQuestion}
                                            </p>
                                        </div>

                                        {c.headlineMetric && (
                                            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                                <span className="num-mono text-2xl font-semibold text-foreground">
                                                    {c.headlineMetric.value}
                                                </span>
                                                <span className="label-mono text-[10px] text-faint">
                                                    {c.headlineMetric.label} · {c.headlineMetric.context}
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                                            <span className="label-mono flex items-center gap-2 text-foreground">
                                                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                                                {c.status}
                                            </span>
                                            <span className="label-mono text-faint">
                                                {related.length} RELATED RESEARCH
                                            </span>
                                        </div>

                                        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                                            <Link
                                                href={`/case-studies/${c.id}`}
                                                className="label-mono border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-signal hover:text-signal"
                                            >
                                                READ CASE STUDY →
                                            </Link>
                                            <Link
                                                href={`/builds/${c.id}`}
                                                className="link-line label-mono text-xs text-muted hover:text-foreground"
                                            >
                                                BUILD OVERVIEW →
                                            </Link>
                                        </div>
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---- continue ---- */}
            <section aria-label="Continue" className="border-t border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
                    <Reveal>
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <p className="label-mono text-faint">NEXT</p>
                                <p className="display mt-2 text-2xl md:text-3xl">FROM PROOF TO THE ARCHIVE ITSELF</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/proof"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                >
                                    EVIDENCE HUB →
                                </Link>
                                <Link
                                    href="/builds"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                >
                                    ALL BUILDS →
                                </Link>
                                <Link
                                    href="/research"
                                    className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                                >
                                    RESEARCH →
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
