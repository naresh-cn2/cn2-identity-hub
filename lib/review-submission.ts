import type { Attribution, Relationship, WorkKind } from "@/data/testimonials";

/**
 * Server-side validation for review submissions.
 *
 * Pure and framework-free so every rule is testable in isolation. The API
 * route owns transport (rate limiting, storage, consent-driven publishing);
 * this module owns "is this a legitimate, well-formed submission?".
 *
 * Anti-abuse layers, weakest to strongest:
 *  - honeypot field must stay empty (silent drop — bots get a fake success)
 *  - minimum dwell time between form render and submit (silent drop)
 *  - per-IP and global rate windows (429, enforced in the route)
 *  - structural checks on every field, length caps, word floor
 *  - markup/URL rejection (no HTML, no links — plain text only)
 */

export const RELATIONSHIP_VALUES: Relationship[] = [
    "client",
    "collaborator",
    "researcher",
    "colleague",
    "recruiter",
    "user",
    "other",
];

export const ATTRIBUTION_VALUES: Attribution[] = ["full", "first", "initials", "anonymous"];

export const WORK_KIND_VALUES: WorkKind[] = ["project", "service"];

/** Feedback length bounds (characters after cleanup). */
export const FEEDBACK_MIN = 30;
export const FEEDBACK_MAX = 800;
export const FEEDBACK_MIN_WORDS = 6;

/** Minimum time (ms) between form mount and a legitimate submit. */
export const MIN_DWELL_MS = 2500;

export interface SubmissionValue {
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
    startedMs: number;
}

export interface ValidationError {
    field: string;
    message: string;
}

export type ValidationResult =
    | { ok: true; drop: false; value: SubmissionValue }
    | { ok: true; drop: true }
    | { ok: false; errors: ValidationError[] };

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
}

/** Trim, collapse runs of whitespace, strip control characters. */
function clean(value: unknown): string {
    if (typeof value !== "string") return "";
    return value
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/** Same cleanup but newlines survive (limiting consecutive breaks). */
function cleanMultiline(value: unknown): string {
    if (typeof value !== "string") return "";
    return value
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

const HTML_TAG = /<\s*\/?\s*[a-zA-Z][^>]*>/;
const LINKY = /(https?:\/\/|www\.[a-z0-9]|javascript:|ftp:\/\/)/i;

/**
 * Validate a raw submission payload.
 *
 * `knownWork` is the set of accepted project ids and service slugs; an
 * unknown value is dropped rather than rejected (the person's feedback
 * still matters — only the cross-link is withheld).
 */
export function validateSubmission(input: unknown, knownWork: ReadonlySet<string>): ValidationResult {
    if (!isRecord(input)) {
        return { ok: false, errors: [{ field: "form", message: "Invalid submission." }] };
    }

    // Honeypot: the field is invisible to humans — anything here is a bot.
    if (typeof input.website === "string" && input.website.trim() !== "") {
        return { ok: true, drop: true };
    }

    // Dwell time: a human cannot fill the form in under MIN_DWELL_MS.
    const startedMs = typeof input.startedMs === "number" && Number.isFinite(input.startedMs) ? input.startedMs : 0;
    if (!startedMs || Date.now() - startedMs < MIN_DWELL_MS) {
        return { ok: true, drop: true };
    }

    const errors: ValidationError[] = [];

    const name = clean(input.name);
    if (name.length < 2 || name.length > 80 || name.includes("<")) {
        errors.push({ field: "name", message: "Name must be 2-80 characters." });
    }

    const role = clean(input.role);
    if (role.length < 2 || role.length > 80 || role.includes("<")) {
        errors.push({ field: "role", message: "Role must be 2-80 characters." });
    }

    const organization = clean(input.organization);
    if (organization && (organization.length > 80 || organization.includes("<"))) {
        errors.push({ field: "organization", message: "Organization must be at most 80 characters." });
    }

    const relationship = clean(input.relationship);
    if (!RELATIONSHIP_VALUES.includes(relationship as Relationship)) {
        errors.push({ field: "relationship", message: "Choose a relationship type." });
    }

    let work: string | undefined;
    let workKind: WorkKind | undefined;
    const rawWork = clean(input.work);
    const rawWorkKind = clean(input.workKind);
    if (rawWork) {
        if (WORK_KIND_VALUES.includes(rawWorkKind as WorkKind) && knownWork.has(rawWork)) {
            work = rawWork;
            workKind = rawWorkKind as WorkKind;
        }
        // Unknown work reference: silently withhold the cross-link.
    }

    const rawRating = input.rating;
    const rating =
        typeof rawRating === "string" ? Number(rawRating) : typeof rawRating === "number" ? rawRating : NaN;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        errors.push({ field: "rating", message: "Choose an overall rating from 1 to 5." });
    }

    const feedback = cleanMultiline(input.feedback);
    if (feedback.length < FEEDBACK_MIN || feedback.length > FEEDBACK_MAX) {
        errors.push({
            field: "feedback",
            message: `Feedback must be ${FEEDBACK_MIN}-${FEEDBACK_MAX} characters.`,
        });
    } else if (feedback.split(/\s+/).filter(Boolean).length < FEEDBACK_MIN_WORDS) {
        errors.push({ field: "feedback", message: "Please write at least a few full sentences about the experience." });
    } else if (HTML_TAG.test(feedback)) {
        errors.push({ field: "feedback", message: "Feedback must be plain text — remove any markup." });
    } else if (LINKY.test(feedback)) {
        errors.push({ field: "feedback", message: "Please remove links from your feedback." });
    }

    const attribution = clean(input.attribution);
    if (!ATTRIBUTION_VALUES.includes(attribution as Attribution)) {
        errors.push({ field: "attribution", message: "Choose how you would like to be attributed." });
    }

    if (typeof input.consent !== "boolean") {
        errors.push({ field: "consent", message: "Please confirm your choice about public display." });
    }

    if (errors.length > 0) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        drop: false,
        value: {
            name,
            role,
            organization: organization || undefined,
            relationship: relationship as Relationship,
            work,
            workKind,
            rating,
            feedback,
            attribution: attribution as Attribution,
            consent: input.consent === true,
            startedMs,
        },
    };
}
