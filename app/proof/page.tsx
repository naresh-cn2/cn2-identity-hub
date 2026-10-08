import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { archiveProjects } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { credentials } from "@/data/certifications";
import { proofStandard, testimonials } from "@/data/proof";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Proof",
    description:
        "The evidence hub — public repositories, verified research entries and measured figures with their provenance. Nothing here is claimed that cannot be checked at its source.",
    alternates: { canonical: "/proof" },
    openGraph: {
        title: "Proof — Bukya Naresh / CN2.dev",
        description:
            "Inspectable, reproducible, labelled, verifiable. Real evidence only — with honest empty states where none exists.",
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
                        <h1 className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">PROOF</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                            Everything on this page can be checked. Not a highlight reel — the repositories, the
                            reproduced research and the measured figures, each carrying the label that says what
                            kind of number it actually is. Where proof does not exist, the page says so instead of
                            filling the gap.
                        </p>
                    </Reveal>
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
                            The final authority on every claim is the code. A verified repository is a dedicated,
                            public project; where a system is still private, this page says so rather than implying
                            a link that is only a profile.
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
                        <h2 className="display mt-4 text-2xl md:text-4xl">MEASURED, WITH PROVENANCE</h2>
                        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
                            Every number below is carried with the label that says what it is — a backtest, a
                            simulation, a self-benchmark. None is presented as live trading performance or as an
                            independent third-party result unless it says so.
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

            {/* ---- testimonials (honest empty state) ---- */}
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
                                        There are no client or colleague testimonials on this page, because none has been
                                        given and attributed. Inventing one would be the fastest way to destroy the trust
                                        this page exists to build. When a real testimonial is provided — with a name and a
                                        way to verify it — it appears here, and not before.
                                    </p>
                                    <p className="label-mono mt-6 text-[10px] leading-relaxed text-faint">
                                        WHAT IS HERE INSTEAD: PUBLIC CODE, REPRODUCIBLE RESEARCH AND MEASURED FIGURES WITH
                                        THEIR PROVENANCE — THE EVIDENCE ABOVE.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---- credentials (honest empty state) ---- */}
            <section aria-label="Credentials" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">05 — CREDENTIALS</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">ACCREDITED CERTIFICATION</h2>
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
                                    <p className="label-mono text-signal">NO ACCREDITED CREDENTIALS CLAIMED</p>
                                    <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                                        There is no formal, accredited certification listed on this site, because none has
                                        been issued and independently verified. What exists instead is self-directed study,
                                        evidenced by the systems and research in this repository — labelled as study, never
                                        presented as a credential or as mastery.
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
