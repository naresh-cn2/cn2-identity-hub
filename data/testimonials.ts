import raw from "./testimonials.json";

/**
 * Testimonials & reviews — the canonical store, written by
 * `app/api/testimonials/route.ts` (GitHub contents API) and rendered at
 * build time by the testimonials page and the contextual work strips.
 *
 * Publication rules enforced here and nowhere else:
 *  - An entry is only ever surfaced when `consent === true`.
 *  - The public showcase additionally requires `status === "published"`
 *    and a positive rating (4-5). Private feedback (lower ratings, or no
 *    publication consent) is never committed to this file — the repository
 *    is public, so private records live only in the owner's server logs.
 *  - No aggregate score is computed from this filtered set. Per-review
 *    ratings are shown; a site-wide average would misrepresent it.
 *  - Entries are structurally re-validated on import so a malformed write
 *    can never break the build or render a half-formed testimonial.
 */

export type Attribution = "full" | "first" | "initials" | "anonymous";
export type Relationship =
    | "client"
    | "collaborator"
    | "researcher"
    | "colleague"
    | "recruiter"
    | "user"
    | "other";
export type WorkKind = "project" | "service";

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    organization?: string;
    relationship: Relationship;
    work?: string;
    workKind?: WorkKind;
    rating: number;
    feedback: string;
    attribution: Attribution;
    consent: boolean;
    status: "published" | "pending";
    submittedAt: string;
}

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
    client: "CLIENT",
    collaborator: "COLLABORATOR",
    researcher: "RESEARCH COLLABORATOR",
    colleague: "COLLEAGUE",
    recruiter: "RECRUITER",
    user: "PRODUCT USER",
    other: "OTHER",
};

const RELATIONSHIP_KEYS = new Set<string>(Object.keys(RELATIONSHIP_LABELS));
const ATTRIBUTION_KEYS = new Set<string>(["full", "first", "initials", "anonymous"]);

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
}

/** Structural guard — returns null for anything that isn't a complete, consented record. */
function normalize(value: unknown): Testimonial | null {
    if (!isRecord(value)) return null;
    const { id, name, role, relationship, rating, feedback, attribution, consent, status, submittedAt } = value;
    if (typeof id !== "string" || id.length === 0) return null;
    if (typeof name !== "string" || name.trim().length === 0) return null;
    if (typeof role !== "string" || role.trim().length === 0) return null;
    if (typeof relationship !== "string" || !RELATIONSHIP_KEYS.has(relationship)) return null;
    if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) return null;
    if (typeof feedback !== "string" || feedback.trim().length < 30) return null;
    if (typeof attribution !== "string" || !ATTRIBUTION_KEYS.has(attribution)) return null;
    if (consent !== true) return null;
    if (status !== "published" && status !== "pending") return null;
    if (typeof submittedAt !== "string" || Number.isNaN(Date.parse(submittedAt))) return null;

    return {
        id,
        name: name.trim(),
        role: role.trim(),
        organization:
            typeof value.organization === "string" && value.organization.trim()
                ? value.organization.trim()
                : undefined,
        relationship: relationship as Relationship,
        work: typeof value.work === "string" && value.work ? value.work : undefined,
        workKind: value.workKind === "project" || value.workKind === "service" ? value.workKind : undefined,
        rating,
        feedback: feedback.trim(),
        attribution: attribution as Attribution,
        consent: true,
        status,
        submittedAt,
    };
}

interface TestimonialsFile {
    reviews?: unknown;
}

const file = raw as TestimonialsFile;
const rawReviews: unknown[] = Array.isArray(file.reviews) ? file.reviews : [];

/** Every structurally valid record (published + pending). */
export const testimonials: Testimonial[] = rawReviews
    .map(normalize)
    .filter((t): t is Testimonial => t !== null);

/**
 * The public showcase: approved, consented, positive ratings only.
 * Filtered set — never averaged into a headline score.
 */
export const publishedTestimonials: Testimonial[] = testimonials.filter(
    (t) => t.status === "published" && t.rating >= 4
);

/** Reviews that genuinely relate to a specific project world or service. */
export function getTestimonialsForWork(kind: WorkKind, slug: string): Testimonial[] {
    return publishedTestimonials.filter((t) => t.workKind === kind && t.work === slug);
}

/** Attribution-resolved display name (anonymous never exposes identity). */
export function testimonialDisplayName(t: Testimonial): string {
    const parts = t.name.trim().split(/\s+/);
    switch (t.attribution) {
        case "full":
            return t.name.trim();
        case "first":
            return parts[0] ?? "Anonymous";
        case "initials":
            return parts.map((p) => `${p[0].toUpperCase()}.`).join(" ") || "Anonymous";
        case "anonymous":
        default:
            return "Anonymous";
    }
}

/** Person line for display — role/organisation are suppressed for anonymous. */
export function testimonialPersonLine(t: Testimonial): string {
    if (t.attribution === "anonymous") return RELATIONSHIP_LABELS[t.relationship];
    const org = t.organization ? ` — ${t.organization}` : "";
    return `${t.role}${org}`;
}
