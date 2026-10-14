/**
 * Server-side validation for project enquiries.
 *
 * Same architecture as lib/review-submission.ts: pure and framework-free so
 * every rule is testable in isolation. The API route owns transport (rate
 * limiting, private capture); this module owns "is this a legitimate,
 * well-formed enquiry?".
 *
 * Anti-abuse layers, weakest to strongest:
 *  - honeypot field must stay empty (silent drop — bots get a fake success)
 *  - minimum dwell time between form render and submit (silent drop)
 *  - per-IP and global rate windows (429, enforced in the route)
 *  - structural checks on every field, length caps, word floor
 *  - markup rejection (no HTML — plain text only; links are allowed in the
 *    problem statement because pointing at a spec or a repo is legitimate)
 */

export const PROJECT_TYPE_VALUES = [
    "freelance",
    "research",
    "employment",
    "product",
    "other",
] as const;
export type ProjectType = (typeof PROJECT_TYPE_VALUES)[number];

export const TIMELINE_VALUES = [
    "exploring",
    "within-a-month",
    "one-to-three-months",
    "three-months-plus",
] as const;
export type EnquiryTimeline = (typeof TIMELINE_VALUES)[number];

/** Problem-statement length bounds (characters after cleanup). */
export const PROBLEM_MIN = 30;
export const PROBLEM_MAX = 2000;
export const PROBLEM_MIN_WORDS = 6;

/** Minimum time (ms) between form mount and a legitimate submit. */
export const MIN_DWELL_MS = 2500;

export interface EnquiryValue {
    name: string;
    email: string;
    organization?: string;
    projectType: ProjectType;
    problem: string;
    deliverables?: string;
    timeline?: EnquiryTimeline;
    budget?: string;
    startedMs: number;
}

export interface ValidationError {
    field: string;
    message: string;
}

export type EnquiryResult =
    | { ok: true; drop: false; value: EnquiryValue }
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
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

/** Validate a raw enquiry payload. */
export function validateEnquiry(input: unknown): EnquiryResult {
    if (!isRecord(input)) {
        return { ok: false, errors: [{ field: "form", message: "Invalid submission." }] };
    }

    // Honeypot: the field is invisible to humans — anything here is a bot.
    if (typeof input.website === "string" && input.website.trim() !== "") {
        return { ok: true, drop: true };
    }

    // Dwell time: a human cannot fill the form in under MIN_DWELL_MS.
    const startedMs =
        typeof input.startedMs === "number" && Number.isFinite(input.startedMs) ? input.startedMs : 0;
    if (!startedMs || Date.now() - startedMs < MIN_DWELL_MS) {
        return { ok: true, drop: true };
    }

    const errors: ValidationError[] = [];

    const name = clean(input.name);
    if (name.length < 2 || name.length > 80 || name.includes("<")) {
        errors.push({ field: "name", message: "Name must be 2-80 characters." });
    }

    const email = clean(input.email).toLowerCase();
    if (email.length > 120 || !EMAIL.test(email)) {
        errors.push({ field: "email", message: "Please enter a valid email address." });
    }

    const organization = clean(input.organization);
    if (organization && (organization.length > 80 || organization.includes("<"))) {
        errors.push({ field: "organization", message: "Organization must be at most 80 characters." });
    }

    const projectType = clean(input.projectType);
    if (!PROJECT_TYPE_VALUES.includes(projectType as ProjectType)) {
        errors.push({ field: "projectType", message: "Choose the kind of enquiry." });
    }

    const problem = cleanMultiline(input.problem);
    if (problem.length < PROBLEM_MIN || problem.length > PROBLEM_MAX) {
        errors.push({
            field: "problem",
            message: `Describe the problem in ${PROBLEM_MIN}-${PROBLEM_MAX} characters.`,
        });
    } else if (problem.split(/\s+/).filter(Boolean).length < PROBLEM_MIN_WORDS) {
        errors.push({
            field: "problem",
            message: "A few full sentences help — what are you trying to solve?",
        });
    } else if (HTML_TAG.test(problem)) {
        errors.push({ field: "problem", message: "Plain text only — remove any markup." });
    }

    const deliverables = cleanMultiline(input.deliverables);
    if (deliverables && (deliverables.length > 400 || HTML_TAG.test(deliverables))) {
        errors.push({
            field: "deliverables",
            message: "Describe success in at most 400 characters of plain text.",
        });
    }

    const timeline = clean(input.timeline);
    if (timeline && !TIMELINE_VALUES.includes(timeline as EnquiryTimeline)) {
        errors.push({ field: "timeline", message: "Choose a timeline, or leave it blank." });
    }

    const budget = clean(input.budget);
    if (budget && (budget.length > 80 || budget.includes("<"))) {
        errors.push({ field: "budget", message: "Budget range must be at most 80 characters." });
    }

    if (errors.length > 0) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        drop: false,
        value: {
            name,
            email,
            organization: organization || undefined,
            projectType: projectType as ProjectType,
            problem,
            deliverables: deliverables || undefined,
            timeline: (timeline || undefined) as EnquiryTimeline | undefined,
            budget: budget || undefined,
            startedMs,
        },
    };
}
