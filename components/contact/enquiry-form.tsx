"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * The project-enquiry form. Concise by design: name, email, what you are
 * trying to solve, and optional context. Server-validated (the same rules
 * live in lib/enquiry-submission.ts), honeypot- and dwell-protected, and
 * honest: success is shown only after the server confirms capture, and a
 * failed submit says so instead of pretending.
 */

const PROJECT_TYPE_CHOICES: { value: string; label: string }[] = [
    { value: "freelance", label: "Freelance project" },
    { value: "research", label: "Research collaboration" },
    { value: "employment", label: "Full-time opportunity" },
    { value: "product", label: "Product or tool enquiry" },
    { value: "other", label: "Something else" },
];

const TIMELINE_CHOICES: { value: string; label: string }[] = [
    { value: "", label: "Not decided yet" },
    { value: "exploring", label: "Still exploring options" },
    { value: "within-a-month", label: "Within a month" },
    { value: "one-to-three-months", label: "One to three months" },
    { value: "three-months-plus", label: "Three months or more" },
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

interface FormState {
    name: string;
    email: string;
    organization: string;
    projectType: string;
    problem: string;
    deliverables: string;
    timeline: string;
    budget: string;
    website: string;
}

const INITIAL: FormState = {
    name: "",
    email: "",
    organization: "",
    projectType: "freelance",
    problem: "",
    deliverables: "",
    timeline: "",
    budget: "",
    website: "",
};

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

export default function EnquiryForm() {
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const startedMs = useRef(0);
    useEffect(() => {
        startedMs.current = Date.now();
    }, []);

    function set<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const local: Record<string, string> = {};
        if (form.name.trim().length < 2) local.name = "Please enter your name.";
        if (!EMAIL_RE.test(form.email.trim()))
            local.email = "Please enter a valid email address so I can reply.";
        if (form.problem.trim().length < 30)
            local.problem = "A few sentences at least — what are you trying to solve?";
        setErrors(local);
        if (Object.keys(local).length > 0) return;

        setSending(true);
        try {
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, startedMs: startedMs.current }),
            });
            const data = (await res.json().catch(() => null)) as
                | { ok?: boolean; message?: string; errors?: { field: string; message: string }[] }
                | null;

            if (res.ok && data?.ok) {
                setDone(true);
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
            setErrors({ form: "Network error — please try again, or email directly above." });
        } finally {
            setSending(false);
        }
    }

    if (done) {
        return (
            <div className="border border-line bg-surface p-8 md:p-10" role="status">
                <p className="label-mono text-signal">ENQUIRY RECEIVED</p>
                <p className="display mt-4 text-2xl md:text-3xl">Thank you — it is on its way in.</p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
                    I will reply to the email you provided. If it is urgent, any of the direct
                    channels above reaches me faster.
                </p>
                <Link
                    href="/work"
                    className="label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                    WHILE YOU WAIT — EXPLORE THE WORK →
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="relative border border-line bg-surface/50 p-6 md:p-10">
            {/* honeypot — invisible to people, attractive to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label htmlFor="eq-website">Leave this field empty</label>
                <input
                    id="eq-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Field id="eq-name" label="YOUR NAME *" error={errors.name}>
                    <input
                        id="eq-name"
                        className={INPUT_CLS}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        maxLength={80}
                        autoComplete="name"
                        required
                    />
                </Field>
                <Field
                    id="eq-email"
                    label="EMAIL *"
                    hint="Used only to reply to this enquiry."
                    error={errors.email}
                >
                    <input
                        id="eq-email"
                        type="email"
                        className={INPUT_CLS}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        maxLength={120}
                        autoComplete="email"
                        required
                    />
                </Field>
                <Field id="eq-organization" label="ORGANIZATION (OPTIONAL)" error={errors.organization}>
                    <input
                        id="eq-organization"
                        className={INPUT_CLS}
                        value={form.organization}
                        onChange={(e) => set("organization", e.target.value)}
                        maxLength={80}
                        autoComplete="organization"
                    />
                </Field>
                <Field id="eq-type" label="WHAT KIND OF ENQUIRY? *" error={errors.projectType}>
                    <select
                        id="eq-type"
                        className={INPUT_CLS}
                        value={form.projectType}
                        onChange={(e) => set("projectType", e.target.value)}
                    >
                        {PROJECT_TYPE_CHOICES.map((c) => (
                            <option key={c.value} value={c.value} className="bg-background text-foreground">
                                {c.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="mt-8">
                <Field
                    id="eq-problem"
                    label="WHAT ARE YOU TRYING TO SOLVE? *"
                    hint={`${form.problem.trim().length}/2000 characters — the problem, the data if there is any, and what would count as an answer.`}
                    error={errors.problem}
                >
                    <textarea
                        id="eq-problem"
                        className={`${INPUT_CLS} min-h-40 resize-y`}
                        value={form.problem}
                        onChange={(e) => set("problem", e.target.value)}
                        maxLength={2000}
                        required
                    />
                </Field>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <Field
                    id="eq-deliverables"
                    label="WHAT WOULD SUCCESS LOOK LIKE? (OPTIONAL)"
                    hint="The artifact or outcome that would make this engagement worth it."
                    error={errors.deliverables}
                >
                    <textarea
                        id="eq-deliverables"
                        className={`${INPUT_CLS} min-h-24 resize-y`}
                        value={form.deliverables}
                        onChange={(e) => set("deliverables", e.target.value)}
                        maxLength={400}
                    />
                </Field>
                <div className="grid gap-8">
                    <Field id="eq-timeline" label="TIMELINE (OPTIONAL)" error={errors.timeline}>
                        <select
                            id="eq-timeline"
                            className={INPUT_CLS}
                            value={form.timeline}
                            onChange={(e) => set("timeline", e.target.value)}
                        >
                            {TIMELINE_CHOICES.map((c) => (
                                <option key={c.value} value={c.value} className="bg-background text-foreground">
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field
                        id="eq-budget"
                        label="BUDGET RANGE (OPTIONAL)"
                        hint="A ballpark is enough — or leave it blank."
                        error={errors.budget}
                    >
                        <input
                            id="eq-budget"
                            className={INPUT_CLS}
                            value={form.budget}
                            onChange={(e) => set("budget", e.target.value)}
                            maxLength={80}
                        />
                    </Field>
                </div>
            </div>

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
                    {sending ? "SENDING" : "SEND ENQUIRY"}
                    <span className={`transition-transform ${sending ? "" : "arr-live"}`} aria-hidden="true">
                        →
                    </span>
                </button>
                <p className="label-mono max-w-md text-[10px] leading-relaxed text-faint">
                    USED ONLY TO REPLY TO THIS ENQUIRY. NEVER PUBLISHED, NEVER SHARED. SEE THE
                    PRIVACY PAGE FOR THE FULL DATA HANDLING.
                </p>
            </div>
        </form>
    );
}
