import Link from "next/link";
import {
    getTestimonialsForWork,
    testimonialDisplayName,
    testimonialPersonLine,
    RELATIONSHIP_LABELS,
    type WorkKind,
} from "@/data/testimonials";
import { Stars } from "./stars";

/**
 * Contextual feedback, placed next to the work it is about — a project
 * world's evidence section, or a service detail page. Renders nothing
 * until a genuinely published, consented review references that work;
 * an empty store means this component never appears anywhere.
 */
export default function WorkEndorsement({ kind, slug }: { kind: WorkKind; slug: string }) {
    const [item] = getTestimonialsForWork(kind, slug);
    if (!item) return null;

    const href = kind === "project" ? `/builds/${slug}` : `/services/${slug}`;
    const linkLabel =
        kind === "project" ? "EXPLORE THE PROJECT WORLD →" : "VIEW THE SERVICE →";

    return (
        <aside aria-label="Feedback about this work" className="border border-line bg-surface/50 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="label-mono text-faint">FEEDBACK FROM THE WORK ITSELF</p>
                <Stars rating={item.rating} className="text-signal" />
            </div>
            <blockquote className="mt-5 text-base leading-relaxed text-foreground md:text-lg">
                &ldquo;{item.feedback}&rdquo;
            </blockquote>
            <p className="label-mono mt-5 text-muted">
                {testimonialDisplayName(item)} — {testimonialPersonLine(item)}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="label-mono border border-line px-2 py-1 text-[10px] text-faint">
                    {RELATIONSHIP_LABELS[item.relationship]}
                </span>
                <Link href={href} className="label-mono text-[10px] text-signal transition-colors hover:text-foreground">
                    {linkLabel}
                </Link>
            </div>
        </aside>
    );
}
