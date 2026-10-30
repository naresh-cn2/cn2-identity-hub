"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RELATIONSHIP_LABELS, type Relationship } from "@/data/testimonials";
import TiltCard from "@/components/ui/tilt-card";
import { Stars } from "./stars";

/** Serialized review view-model, built server-side by the testimonials page. */
export interface TestimonialView {
    id: string;
    display: string;
    personLine: string;
    relationship: Relationship;
    rating: number;
    feedback: string;
    dateLabel: string;
    workHref?: string;
    workLabel?: string;
}

const FILTER_ALL = "ALL";

/**
 * The published collection below the featured panel: one filter row derived
 * from the relationships actually present in the data (no placeholder
 * categories), and the review panels themselves.
 */
export default function TestimonialGrid({ items }: { items: TestimonialView[] }) {
    const [active, setActive] = useState<string>(FILTER_ALL);

    const filters = useMemo(() => {
        const present = new Set(items.map((t) => t.relationship));
        return (Object.keys(RELATIONSHIP_LABELS) as Relationship[]).filter((r) => present.has(r));
    }, [items]);

    const shown = active === FILTER_ALL ? items : items.filter((t) => t.relationship === active);

    return (
        <>
            {filters.length >= 2 && (
                <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter reviews by relationship">
                    {[FILTER_ALL, ...filters].map((f) => (
                        <button
                            key={f}
                            type="button"
                            aria-pressed={active === f}
                            onClick={() => setActive(f)}
                            className={`label-mono chip-hit border px-3.5 py-2 text-[10px] transition-colors duration-200 ${
                                active === f
                                    ? "border-signal bg-signal text-white"
                                    : "border-line text-muted hover:border-line-strong hover:text-foreground"
                            }`}
                        >
                            {f === FILTER_ALL ? "ALL" : RELATIONSHIP_LABELS[f as Relationship]}
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
                {shown.map((t) => (
                    <TiltCard key={t.id} className="h-full">
                        <figure className="flex h-full flex-col border border-line bg-surface/40 p-6 md:p-8">
                        <div className="flex items-center justify-between gap-4">
                            <Stars rating={t.rating} className="text-signal" />
                            <span className="label-mono text-faint">{t.dateLabel}</span>
                        </div>
                        <blockquote className="mt-6 flex-1 text-base leading-relaxed text-foreground md:text-lg">
                            &ldquo;{t.feedback}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 border-t border-line pt-5">
                            <p className="display text-lg">{t.display}</p>
                            <p className="label-mono mt-1.5 text-muted">{t.personLine}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                <span className="label-mono border border-line px-2 py-1 text-[10px] text-faint">
                                    {RELATIONSHIP_LABELS[t.relationship]}
                                </span>
                                {t.workHref && (
                                    <Link
                                        href={t.workHref}
                                        className="label-mono text-[10px] text-signal transition-colors hover:text-foreground"
                                    >
                                        {t.workLabel} →
                                    </Link>
                                )}
                            </div>
                        </figcaption>
                        </figure>
                    </TiltCard>
                ))}
            </div>
        </>
    );
}
