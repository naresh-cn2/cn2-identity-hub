import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudy from "@/components/case-study/case-study";
import FlagshipInstrument from "@/components/builds/flagship-instrument";
import Reveal from "@/components/ui/reveal";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";

export function generateStaticParams() {
    return caseStudies.map((p) => ({ project: p.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ project: string }>;
}): Promise<Metadata> {
    const { project: id } = await params;
    const study = getCaseStudy(id);
    if (!study) return { title: "Case study not found" };

    return {
        title: `${study.title} — Case Study`,
        description: study.researchQuestion,
        alternates: { canonical: `/case-studies/${study.id}` },
        openGraph: {
            title: `${study.title} — Case Study — ${site.name} / ${site.identity}`,
            description: study.thesis,
            type: "article",
        },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ project: string }> }) {
    const { project: id } = await params;
    const study = getCaseStudy(id);
    if (!study) notFound();

    const relatedResearch = researchEntries.filter((r) => r.relatedProject === study.id);
    const index = caseStudies.findIndex((p) => p.id === study.id);
    const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
    const next = caseStudies[(index + 1) % caseStudies.length];

    return (
        <>
            {/* breadcrumb */}
            <div className="border-b border-line bg-surface">
                <div className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="label-mono flex flex-wrap items-center gap-2 text-[10px] text-faint"
                    >
                        <Link href="/" className="transition-colors hover:text-foreground">
                            HOME
                        </Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/case-studies" className="transition-colors hover:text-foreground">
                            CASE STUDIES
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-foreground">{study.shortTitle}</span>
                    </nav>
                </div>
            </div>

            <CaseStudy project={study} instrument={<FlagshipInstrument project={study} />} />

            {/* related research */}
            {relatedResearch.length > 0 && (
                <section aria-label="Related research" className="border-t border-line">
                    <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                        <Reveal>
                            <p className="label-mono text-research">RESEARCH THIS STUDY PRODUCED</p>
                        </Reveal>
                        <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
                            {relatedResearch.map((r, i) => (
                                <Reveal key={r.id} delay={i * 80}>
                                    <Link
                                        href={`/research/${r.id}`}
                                        className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                                    >
                                        <p className="label-mono text-faint">{r.category}</p>
                                        <h3 className="display mt-3 text-xl md:text-2xl">{r.title}</h3>
                                        <p className="mt-4 text-sm leading-relaxed text-muted">{r.result}</p>
                                        <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                                            READ THE ENTRY →
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* prev / next + back to overview */}
            <section aria-label="Case study navigation" className="border-t border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
                    <div className="grid gap-px bg-line md:grid-cols-3">
                        <Link href={`/case-studies/${prev.id}`} className="group bg-background p-6 transition-colors hover:bg-surface">
                            <p className="label-mono text-[10px] text-faint">← PREVIOUS STUDY</p>
                            <p className="display mt-3 text-lg text-foreground group-hover:text-signal">{prev.shortTitle}</p>
                        </Link>
                        <Link href={`/builds/${study.id}`} className="group bg-background p-6 transition-colors hover:bg-surface">
                            <p className="label-mono text-[10px] text-faint">PRODUCT OVERVIEW</p>
                            <p className="display mt-3 text-lg text-foreground group-hover:text-signal">{study.shortTitle} — BUILD</p>
                        </Link>
                        <Link href={`/case-studies/${next.id}`} className="group bg-background p-6 text-right transition-colors hover:bg-surface">
                            <p className="label-mono text-[10px] text-faint">NEXT STUDY →</p>
                            <p className="display mt-3 text-lg text-foreground group-hover:text-signal">{next.shortTitle}</p>
                        </Link>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <Link
                            href="/case-studies"
                            className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                        >
                            ← ALL CASE STUDIES
                        </Link>
                        <a
                            href={study.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-line label-mono text-xs text-muted hover:text-signal"
                        >
                            SOURCE OF EVIDENCE — GITHUB →
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
