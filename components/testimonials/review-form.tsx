"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkKind } from "@/data/testimonials";

/**
 * The review form. Mobile-first (16px inputs prevent iOS zoom, every
 * control is a comfortable touch target), keyboard-complete (the rating
 * is a real radiogroup), and honest about what happens to the data:
 * publication needs consent; low ratings stay private.
 */

export interface WorkOption {
    kind: WorkKind;
    value: string;
    label: string;
}

const RELATIONSHIP_CHOICES: { value: string; label: string }[] = [
    { value: "client", label: "Client — commissioned work" },
    { value: "collaborator", label: "Collaborator" },
    { value: "researcher", label: "Research collaborator" },
    { value: "colleague", label: "Colleague" },
    { value: "recruiter", label: "Recruiter or hiring manager" },
    { value: "user", label: "User of a published tool" },
    { value: "other", label: "Other" },
];

const ATTRIBUTION_CHOICES: { value: string; label: string }[] = [
    { value: "full", label: "Full name" },
    { value: "first", label: "First name only" },
    { value: "initials", label: "Initials" },
    { value: "anonymous", label: "Anonymous" },
];

const INPUT_CLS =
    "mt-3 w-full border border-line bg-transparent px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-faint focus:border-signal";

function Field({
    id,
    label,
    hint,
    error,
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="label-mono block text-[10px] text-faint">
                {label}
            </label>
            {children}
            {error ? (
                <p className="mt-2 text-xs text-signal" role="alert">
                    {error}
                </p>
            ) : (
                hint && <p className="mt-2 text-xs leading-relaxed text-faint">{hint}</p>
            )}
        </div>
    );
}

function StarGlyph({ filled }: { filled: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            aria-hidden="true"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
        >
            <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6z" />
        </svg>
    );
}

interface FormState {
    name: string;
    role: string;
    organization: string;
    relationship: string;
    work: string;
    rating: number;
    feedback: string;
    attribution: string;
    consent: boolean;
    website: string;
}

const INITIAL: FormState = {
    name: "",
    role: "",
    organization: "",
    relationship: "client",
    work: "",
    rating: 0,
    feedback: "",
    attribution: "full",
    consent: false,
    website: "",
};

export default function ReviewForm({ workOptions }: { workOptions: WorkOption[] }) {
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState<null | { published: boolean }>(null);
    const startedMs = useRef(0);
    useEffect(() => {
        startedMs.current = Date.now();
    }, []);
    const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

    function set<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const local: Record<string, string> = {};
        if (form.name.trim().length < 2) local.name = "Please enter your name.";
        if (form.role.trim().length < 2) local.role = "Please enter your role or title.";
        if (form.rating < 1) local.rating = "Please choose an overall rating.";
        if (form.feedback.trim().length < 30)
            local.feedback = "Please write at least a few sentences about the experience.";
        if (!form.consent) local.consent = "Please confirm your choice about public display.";
        setErrors(local);
        if (Object.keys(local).length > 0) return;

        const [workKind, workValue] = form.work ? form.work.split(/:(.+)/) : ["", ""];

        setSending(true);
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    work: workValue || "",
                    workKind: workKind || "",
                    startedMs: startedMs.current,
                }),
            });
            const data = (await res.json().catch(() => null)) as
                | { ok?: boolean; published?: boolean; message?: string; errors?: { field: string; message: string }[] }
                | null;

            if (res.ok && data?.ok) {
                setDone({ published: Boolean(data.published) });
                return;
            }
            if (Array.isArray(data?.errors)) {
                const map: Record<string, string> = {};
                for (const er of data.errors) map[er.field] = er.message;
                setErrors(map);
            } else {
                setErrors({ form: data?.message || "Something went wrong. Please try again." });
            }
        } catch {
            setErrors({ form: "Network error — please try again." });
        } finally {
            setSending(false);
        }
    }

    if (done) {
        return (
            <div className="border border-line bg-surface p-8 md:p-10" role="status">
                <p className="label-mono text-signal">RECEIVED</p>
                <p className="display mt-4 text-2xl md:text-3xl">
                    {done.published ? "Your review is now published." : "Your feedback has been recorded."}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
                    {done.published
                        ? "Thank you — it appears with the attribution you chose, and it now sits beside the work it is about."
                        : "Thank you. It stays with me as feedback for improvement; it will appear publicly only after it has been reviewed, with your permission intact."}
                </p>
                {done.published && (
                    <a
                        href="#voices"
                        className="label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                    >
                        READ IT ABOVE →
                    </a>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="relative border border-line bg-surface/50 p-6 md:p-10">
            {/* honeypot — invisible to people, attractive to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label htmlFor="rv-website">Leave this field empty</label>
                <input
                    id="rv-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Field id="rv-name" label="YOUR NAME *" error={errors.name}>
                    <input
                        id="rv-name"
                        className={INPUT_CLS}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        maxLength={80}
                        autoComplete="name"
                        required
                    />
                </Field>
                <Field id="rv-role" label="ROLE OR TITLE *" error={errors.role}>
                    <input
                        id="rv-role"
                        className={INPUT_CLS}
                        value={form.role}
                        onChange={(e) => set("role", e.target.value)}
                        maxLength={80}
                        autoComplete="organization-title"
                        placeholder="e.g. Founder, Quant Developer, Hiring Manager"
                        required
                    />
                </Field>
                <Field id="rv-org" label="ORGANIZATION" hint="Optional — only include it if you are comfortable with it being shown." error={errors.organization}>
                    <input
                        id="rv-org"
                        className={INPUT_CLS}
                        value={form.organization}
                        onChange={(e) => set("organization", e.target.value)}
                        maxLength={80}
                        autoComplete="organization"
                    />
                </Field>
                <Field id="rv-relationship" label="RELATIONSHIP *" error={errors.relationship}>
                    <select
                        id="rv-relationship"
                        className={INPUT_CLS}
                        value={form.relationship}
                        onChange={(e) => set("relationship", e.target.value)}
                    >
                        {RELATIONSHIP_CHOICES.map((c) => (
                            <option key={c.value} value={c.value} className="bg-background text-foreground">
                                {c.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field id="rv-work" label="RELATED WORK" hint="If your feedback concerns a specific project or service, connect it here." error={errors.work}>
                    <select
                        id="rv-work"
                        className={INPUT_CLS}
                        value={form.work}
                        onChange={(e) => set("work", e.target.value)}
                    >
                        <option value="" className="bg-background text-foreground">
                            Not tied to one piece of work
                        </option>
                        <optgroup label="PROJECTS" className="bg-background">
                            {workOptions
                                .filter((w) => w.kind === "project")
                                .map((w) => (
                                    <option key={w.value} value={`project:${w.value}`} className="bg-background text-foreground">
                                        {w.label}
                                    </option>
                                ))}
                        </optgroup>
                        <optgroup label="SERVICES" className="bg-background">
                            {workOptions
                                .filter((w) => w.kind === "service")
                                .map((w) => (
                                    <option key={w.value} value={`service:${w.value}`} className="bg-background text-foreground">
                                        {w.label}
                                    </option>
                                ))}
                        </optgroup>
                    </select>
                </Field>
                <Field id="rv-attribution" label="HOW SHOULD YOU BE ATTRIBUTED? *" error={errors.attribution}>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                        {ATTRIBUTION_CHOICES.map((c) => (
                            <label key={c.value} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-muted">
                                <input
                                    type="radio"
                                    name="attribution"
                                    value={c.value}
                                    checked={form.attribution === c.value}
                                    onChange={() => set("attribution", c.value)}
                                    className="h-4 w-4 accent-signal"
                                />
                                {c.label}
                            </label>
                        ))}
                    </div>
                </Field>
            </div>

            <div className="mt-8">
                <p className="label-mono text-[10px] text-faint" id="rv-rating-label">
                    OVERALL EXPERIENCE *
                </p>
                <div
                    className="mt-3 flex flex-wrap items-center gap-1"
                    role="radiogroup"
                    aria-labelledby="rv-rating-label"
                    onKeyDown={(e) => {
                        const i = form.rating - 1;
                        let next: number | null = null;
                        if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(4, i + 1);
                        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(0, i - 1);
                        else if (e.key === "Home") next = 0;
                        else if (e.key === "End") next = 4;
                        if (next !== null && i >= 0) {
                            e.preventDefault();
                            set("rating", next + 1);
                            starRefs.current[next]?.focus();
                        }
                    }}
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <button
                            key={i}
                            type="button"
                            role="radio"
                            aria-checked={form.rating === i}
                            aria-label={`${i} of 5`}
                            tabIndex={form.rating === i || (form.rating === 0 && i === 1) ? 0 : -1}
                            ref={(el) => {
                                starRefs.current[i - 1] = el;
                            }}
                            onClick={() => set("rating", i)}
                            className={`flex min-h-11 min-w-11 items-center justify-center transition-colors ${
                                i <= form.rating ? "text-signal" : "text-line-strong hover:text-muted"
                            }`}
                        >
                            <StarGlyph filled={i <= form.rating} />
                        </button>
                    ))}
                    <span className="label-mono ml-3 text-faint">
                        {form.rating > 0 ? `${form.rating} / 5` : "CHOOSE 1-5"}
                    </span>
                </div>
                {errors.rating && (
                    <p className="mt-2 text-xs text-signal" role="alert">
                        {errors.rating}
                    </p>
                )}
            </div>

            <div className="mt-8">
                <Field
                    id="rv-feedback"
                    label="YOUR FEEDBACK *"
                    hint={`${form.feedback.trim().length}/800 characters — your own words about the experience.`}
                    error={errors.feedback}
                >
                    <textarea
                        id="rv-feedback"
                        className={`${INPUT_CLS} min-h-40 resize-y`}
                        value={form.feedback}
                        onChange={(e) => set("feedback", e.target.value)}
                        maxLength={800}
                        required
                    />
                </Field>
            </div>

            <label className="mt-8 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                <input
                    id="rv-consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-signal"
                />
                <span>
                    I consent to this feedback being published publicly on CN2.DEV with the attribution chosen above.
                </span>
            </label>
            {errors.consent && (
                <p className="mt-2 text-xs text-signal" role="alert">
                    {errors.consent}
                </p>
            )}

            {errors.form && (
                <p className="mt-6 border border-signal/40 bg-signal/5 p-4 text-sm text-signal" role="alert">
                    {errors.form}
                </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                    type="submit"
                    disabled={sending}
                    className="corner-ticks group inline-flex min-h-12 items-center gap-3 border border-signal px-8 py-4 text-[11px] tracking-[0.2em] text-signal transition-colors hover:bg-signal hover:text-background disabled:opacity-50"
                >
                    {sending ? "SENDING" : "SHARE YOUR EXPERIENCE"}
                    <span className={`transition-transform ${sending ? "" : "arr-live"}`} aria-hidden="true">
                        →
                    </span>
                </button>
                <p className="label-mono max-w-md text-[10px] leading-relaxed text-faint">
                    PUBLISHED ONLY WITH YOUR PERMISSION AND YOUR OWN RATING. BELOW 4 STARS, OR WITHOUT CONSENT,
                    FEEDBACK STAYS PRIVATE.
                </p>
            </div>
        </form>
    );
}
