/**
 * Proof layer (spec §17).
 *
 * The evidence hub aggregates verifiable material that already exists elsewhere
 * in the codebase — public repositories, verified research entries and measured
 * figures carried with their provenance. It introduces no new claims and
 * duplicates no content: every item below is derived from its source of truth.
 *
 * Testimonials follow the same rule as credentials — nothing is published here
 * that was not actually given. The array is empty because no testimonial has
 * been provided, and the page renders an honest empty state rather than filling
 * the gap with invented praise.
 */

export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    /** Optional verifiable link (the person's profile or the shared post). */
    source?: string;
    /** How the testimonial was obtained — provenance travels with the quote. */
    context: string;
}

/**
 * Real testimonials only. Empty by design — see the note above. An entry appears
 * here only when a real person has actually given one and it can be attributed.
 */
export const testimonials: Testimonial[] = [];

/** What this page counts as proof — the standard every item below meets. */
export const proofStandard: { label: string; detail: string }[] = [
    { label: "INSPECTABLE", detail: "A public repository you can read — not a screenshot." },
    { label: "REPRODUCIBLE", detail: "A result that regenerates from the same inputs and code." },
    { label: "LABELLED", detail: "Every figure carries its provenance — backtest, simulation, self-benchmark." },
    { label: "VERIFIABLE", detail: "A third party can confirm the claim at its source." },
];
