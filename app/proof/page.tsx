import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import PosterPlate from "@/components/viz/poster-plates";
import { archiveProjects } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { credentials } from "@/data/certifications";
import { proofStandard, testimonials } from "@/data/proof";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Proof",
    description:
        "The repositories, research entries and measured figures behind my work — each linked to its source.",
    alternates: { canonical: "/proof" },
    openGraph: {
        title: "Proof — Bukya Naresh / CN2.dev",
        description:
            "Public repositories, reproduced research entries and measured figures, each labelled with its method.",
    },
};

export default function ProofPage() {
    const verifiedResearch = researchEntries.filter((e) => e.status === "VERIFIED");
    const repos = archiveProjects.filter((p) => p.github);
    const figures = archiveProjects.flatMap((p) =>
        p.metrics.map((m, i) => ({ key: `${p.id}-${i}`, project: p.shortTitle, ...m }))
    );

    return (
        <>
            {/* ---- hero ---- */}
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <PageAtmosphere variant="field" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <p className="label-mono text-muted">
                                SECTION <span className="text-signal">/</span> 09 — PROOF
                            </p>
                            <p className="label-mono text-faint">
                                {repos.length} REPOSITORIES · {verifiedResearch.length} VERIFIED ENTRIES
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <KineticText className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">PROOF</KineticText>
                    </Reveal>
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
                        <Reveal delay={200}>
                            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                                The repositories, the reproduced research and the measured figures behind my
                                work — each one labelled for the kind of result it is, and each linked to its
                                source.
                            </p>
                        </Reveal>
                        <Reveal delay={260}>
                            <PosterPlate
                                variant="vault"
                                label="PLATE / PROOF"
                                alt="Illustration: a monolith of stacked record strata — three rows lit blue, one marked red — standing in portal light above a reflective floor."
                            />
                        </Reveal>
                    </div>
                </div>
            </header>

            {/* ---- standard ---- */}
            <section aria-label="Proof standard" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
                    <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
                        <Reveal>
                            <p className="label-mono text-signal">WHAT COUNTS AS PROOF</p>
                        </Reveal>
                        <div className="grid gap-px bg-line sm:grid-cols-2">
                            {proofStandard.map((s, i) => (
                                <Reveal key={s.label} delay={i * 70}>
                                    <div className="h-full bg-background p-6">
                                        <p className="label-mono text-foreground">{s.label}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-muted">{s.detail}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- repositories ---- */}
            <section aria-label="Repositories" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">01 — INSPECTABLE SOURCE</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">PUBLIC REPOSITORIES</h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                            The code is the final authority on every claim. A verified repository is a
                            dedicated, public project — systems that are still private are marked private.
                        </p>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
                        {repos.map((p, i) => (
                            <Reveal key={p.id} delay={Math.min(i, 4) * 70}>
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                                >
                                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                                        <span className="display text-xl">{p.shortTitle}</span>
                                        <span
                                            className={`label-mono ${p.githubVerified ? "text-research" : "text-faint"}`}
                                        >
                                            {p.githubVerified ? "PUBLIC · VERIFIED" : "PROFILE LINK · NOT DEDICATED"}
                                        </span>
                                    </div>
                                    <span className="label-mono mt-3 text-[10px] text-faint">{p.evidenceLabel}</span>
                                    <span className="mt-4 break-all font-mono text-xs text-muted">
                                        {p.github?.replace("https://", "")}
                                    </span>
                                    <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                                        OPEN REPOSITORY →
                                    </span>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- verified research ---- */}
            <section aria-label="Verified research" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-research">02 — REPRODUCIBLE RESEARCH</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">VERIFIED ENTRIES</h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                            VERIFIED means the result was reproduced against its artifact — not that it is
                            impressive, only that it holds. Each entry carries its limitation beside the finding.
                        </p>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
                        {verifiedResearch.map((r, i) => (
                            <Reveal key={r.id} delay={Math.min(i, 3) * 80}>
                                <Link
                                    href={`/research/${r.id}`}
                                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                                >
                                    <span className="label-mono text-faint">{r.category}</span>
                                    <h3 className="display mt-3 text-lg md:text-xl">{r.title}</h3>
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

            {/* ---- measured figures ---- */}
            <section aria-label="Measured figures" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">03 — LABELLED FIGURES</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">MEASURED RESULTS</h2>
                        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
                            Every number below carries the label that says what it is — a backtest, a
                            simulation, a self-benchmark. None is presented as live trading performance or as
                            an independent third-party result unless it says so.
                        </p>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                        {figures.map((f, i) => (
                            <Reveal key={f.key} delay={Math.min(i, 5) * 60}>
                                <div className="corner-ticks flex h-full flex-col bg-surface p-6">
                                    <p className="num-mono text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-none text-foreground">
                                        {f.value}
                                    </p>
                                    <p className="label-mono mt-4 text-foreground">{f.label}</p>
                                    <p className="label-mono mt-1 text-faint">{f.context}</p>
                                    <p className="label-mono mt-auto pt-5 text-[10px] text-signal">{f.project}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- testimonials (reserved space) ---- */}
            <section aria-label="Testimonials" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">04 — TESTIMONIALS</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">IN OTHER PEOPLE&apos;S WORDS</h2>
                    </Reveal>
                    <Reveal delay={80}>
                        <div className="mt-8">
                            {testimonials.length > 0 ? (
                                <div className="grid gap-px bg-line md:grid-cols-2">
                                    {testimonials.map((t) => (
                                        <figure key={t.id} className="bg-background p-6 md:p-8">
                                            <blockquote className="text-base leading-relaxed text-foreground md:text-lg">
                                                “{t.quote}”
                                            </blockquote>
                                            <figcaption className="mt-6">
                                                <p className="label-mono text-foreground">{t.name}</p>
                                                <p className="label-mono mt-1 text-faint">{t.role}</p>
                                                <p className="label-mono mt-3 text-[10px] text-faint">{t.context}</p>
                                                {t.source && (
                                                    <a
                                                        href={t.source}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="link-line label-mono mt-3 inline-block text-xs text-research"
                                                    >
                                                        VERIFY →
                                                    </a>
                                                )}
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ) : (
                                <div className="corner-ticks max-w-3xl border border-line bg-surface p-8 md:p-10">
                                    <p className="label-mono text-signal">NO TESTIMONIALS PUBLISHED</p>
                                    <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                                        No testimonials are published yet — this space is reserved for genuine
                                        feedback from people I&apos;ve worked with.
                                    </p>
                                    <p className="label-mono mt-6 text-[10px] leading-relaxed text-faint">
                                        WHAT IS HERE INSTEAD: PUBLIC CODE, REPRODUCIBLE RESEARCH AND MEASURED FIGURES —
                                        HOW THE RESULTS ABOVE WERE PRODUCED.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---- credentials (reserved state) ---- */}
            <section aria-label="Credentials" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">05 — CREDENTIALS</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">CREDENTIALS ON FILE</h2>
                    </Reveal>
                    <Reveal delay={80}>
                        <div className="mt-8">
                            {credentials.length > 0 ? (
                                <div className="grid gap-px bg-line md:grid-cols-2">
                                    {credentials.map((c) => (
                                        <div key={c.id} className="bg-background p-6">
                                            <p className="label-mono text-foreground">{c.state}</p>
                                            <h3 className="display mt-3 text-lg">{c.program}</h3>
                                            <p className="label-mono mt-2 text-faint">{c.provider}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="corner-ticks max-w-3xl border border-line bg-surface p-8 md:p-10">
                                    <p className="label-mono text-signal">CREDENTIALS</p>
                                    <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                                        No accredited certifications are listed here yet — my study record is
                                        documented in full on the certifications page.
                                    </p>
                                    <Link
                                        href="/certifications#study"
                                        className="label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                    >
                                        SEE THE STUDY RECORD →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---- continuation ---- */}
            <section aria-label="Continue" className="border-t border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
                    <Reveal>
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <p className="label-mono text-faint">NEXT</p>
                                <p className="display mt-2 text-2xl md:text-3xl">CHECK THE WORK, THEN START A CONVERSATION</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/case-studies"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                >
                                    CASE STUDIES →
                                </Link>
                                <Link
                                    href="/work-with-me"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                >
                                    WORK WITH ME →
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
