import Link from "next/link";
import type { FlagshipProject } from "@/data/projects";
import Reveal from "@/components/ui/reveal";
import Metric from "@/components/ui/metric";
import ArchFlow from "@/components/viz/arch-flow";
import ProjectMark from "./project-mark";
import FlagshipInstrument from "./flagship-instrument";

/**
 * Product overview (spec §08).
 *
 * The concise, decision-ready view of a flagship build: identity, what it does,
 * the problem, architecture, technology, key evidence and current state — then a
 * single prominent path into the deep case study. This is deliberately NOT the
 * full evidence chain; /case-studies/[project] owns that. Both derive from the
 * same FlagshipProject record, so nothing here can drift from the proof layer.
 */

function SpecRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="border-t border-line py-8 md:grid md:grid-cols-[14rem_1fr] md:gap-12 md:py-10">
            <Reveal>
                <p className="label-mono text-signal">{label}</p>
            </Reveal>
            <Reveal delay={70}>
                <div className="mt-4 md:mt-0">{children}</div>
            </Reveal>
        </div>
    );
}

export default function ProjectOverview({ project }: { project: FlagshipProject }) {
    return (
        <article>
            {/* ---- overview hero ---- */}
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-40">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <p className="label-mono text-muted">
                                BUILD <span className="text-signal">/</span> {project.index} — PRODUCT OVERVIEW
                            </p>
                            <p className="label-mono text-faint">{project.category}</p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="display mt-8 text-[clamp(2.6rem,8vw,6.5rem)]">{project.title}</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
                            {project.position}
                        </p>
                    </Reveal>
                    <Reveal delay={260}>
                        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.summary}</p>
                    </Reveal>
                    <Reveal delay={320}>
                        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                            <span className="label-mono flex items-center gap-2 text-foreground">
                                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                                {project.status}
                            </span>
                            <span className="label-mono max-w-2xl text-faint">{project.statusNote}</span>
                        </div>
                    </Reveal>

                    {/* at-a-glance results — every figure keeps its provenance label */}
                    {project.results.metrics.length > 0 && (
                        <Reveal delay={380}>
                            <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                                {project.results.metrics.map((m) => (
                                    <Metric key={m.label} metric={m} />
                                ))}
                            </div>
                        </Reveal>
                    )}

                    <Reveal delay={440}>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href={`/case-studies/${project.id}`}
                                className="label-mono border border-signal bg-signal px-6 py-3 text-background transition-colors hover:bg-transparent hover:text-signal"
                            >
                                READ CASE STUDY →
                            </Link>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                            >
                                SOURCE ON GITHUB →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* ---- project instrument: the distinct visual for this build ---- */}
            <section aria-label="System instrument" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <p className="label-mono text-faint">
                                SYSTEM INSTRUMENT <span className="text-signal">/</span> {project.shortTitle}
                            </p>
                            <p className="label-mono text-faint">VISUAL METAPHOR — {project.visualMetaphor.toUpperCase()}</p>
                        </div>
                    </Reveal>
                    <Reveal delay={80}>
                        <div className="mt-8">
                            <FlagshipInstrument project={project} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---- spec sheet ---- */}
            <section aria-label="Product specification" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <h2 className="display text-3xl md:text-5xl">THE BUILD AT A GLANCE</h2>
                        <p className="label-mono mt-4 text-faint">
                            WHAT IT IS, WHAT IT SOLVES, HOW IT IS BUILT — THE FULL EVIDENCE CHAIN LIVES IN THE CASE STUDY
                        </p>
                    </Reveal>

                    <div className="mt-12">
                        <SpecRow label="THE PROBLEM">
                            <div className="max-w-3xl space-y-4">
                                {project.problem.map((p, i) => (
                                    <p key={i} className="text-base leading-relaxed text-muted md:text-lg">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </SpecRow>

                        <SpecRow label="WHAT IT DOES">
                            <ul className="max-w-3xl space-y-3">
                                {project.objective.map((o, i) => (
                                    <li key={i} className="flex gap-3 text-base leading-relaxed text-muted">
                                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                                        {o}
                                    </li>
                                ))}
                            </ul>
                        </SpecRow>

                        <SpecRow label="RESEARCH QUESTION">
                            <blockquote className="corner-ticks max-w-3xl border border-line bg-surface p-6">
                                <p className="text-lg leading-relaxed text-foreground">{project.researchQuestion}</p>
                            </blockquote>
                        </SpecRow>

                        <SpecRow label="ARCHITECTURE">
                            <div className="max-w-4xl">
                                <ArchFlow steps={project.architecture} compact />
                            </div>
                        </SpecRow>

                        <SpecRow label="TECHNOLOGY">
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((t) => (
                                    <span key={t} className="label-mono border border-line px-3 py-1.5 text-muted">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </SpecRow>

                        <SpecRow label="KEY EVIDENCE">
                            <div className="grid gap-px bg-line md:grid-cols-3">
                                {project.evidence.map((e) => (
                                    <div key={e.label} className="bg-surface p-5">
                                        <p className="label-mono text-foreground">{e.label}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </SpecRow>

                        <SpecRow label="CURRENT STATE">
                            <div className="corner-ticks max-w-3xl border border-line bg-surface p-6">
                                <p className="label-mono text-signal">{project.status}</p>
                                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{project.statusNote}</p>
                            </div>
                        </SpecRow>
                    </div>
                </div>
            </section>

            {/* ---- demo / interactive ---- */}
            {project.interactive.length > 0 && (
                <section aria-label="Interactive modules" className="border-b border-line">
                    <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                        <Reveal>
                            <p className="label-mono text-faint">TRY IT</p>
                            <h2 className="display mt-4 text-2xl md:text-4xl">INTERACTIVE MODULES</h2>
                        </Reveal>
                        <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
                            {project.interactive.map((mod, i) => (
                                <Reveal key={mod.title} delay={i * 80}>
                                    <Link
                                        href={mod.href}
                                        className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                                    >
                                        <p className="label-mono text-foreground transition-colors group-hover:text-signal">
                                            {mod.title} <span aria-hidden="true">→</span>
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-muted">{mod.description}</p>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---- deep proof CTA ---- */}
            <section aria-label="Read the case study" className="border-b border-line bg-surface">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="label-mono text-signal">GO DEEPER</p>
                                <h2 className="display mt-4 text-3xl md:text-5xl">
                                    THE FULL EVIDENCE CHAIN
                                </h2>
                                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                                    Problem, hypothesis, architecture, methodology, experiments, results — and the
                                    failures and limitations beside them. The case study is where this build is
                                    proven, not merely described.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 md:items-end">
                                <Link
                                    href={`/case-studies/${project.id}`}
                                    className="label-mono border border-signal bg-signal px-8 py-4 text-background transition-colors hover:bg-transparent hover:text-signal"
                                >
                                    READ CASE STUDY →
                                </Link>
                                <div className="h-28 w-full max-w-xs border border-line bg-background md:h-24">
                                    <ProjectMark id={project.id} />
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </article>
    );
}
