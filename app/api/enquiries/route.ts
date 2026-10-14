import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { validateEnquiry } from "@/lib/enquiry-submission";

/**
 * POST /api/enquiries — the project-enquiry intake.
 *
 * Storage (v1): this deployment has no database and serverless filesystems
 * are ephemeral, so captured enquiries land in the owner's private server
 * logs as structured JSON lines (queryable in Vercel). Enquiry content is
 * confidential by nature — it is never committed to the public repository
 * and never forwarded to any third party. A notification channel (email or
 * a private repository) can be layered on later without changing this
 * contract.
 *
 * Success is only reported after the record has actually been captured;
 * failures answer honestly so the visitor can retry.
 *
 * Abuse layers: request size cap, per-IP and global rate windows, honeypot
 * and dwell-time drops (silent), structural validation, 24h dedup hash.
 */

export const runtime = "nodejs";

const BODY_MAX_BYTES = 12 * 1024;
const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_MAX = 5;
const GLOBAL_MAX = 40;
const DEDUP_MS = 24 * 60 * 60 * 1000;

const ipHits = new Map<string, number[]>();
const globalHits: number[] = [];
const recentEnquiries = new Map<string, number>();

function pruned(list: number[], now: number): number[] {
    return list.filter((t) => now - t < WINDOW_MS);
}

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const globals = pruned(globalHits, now);
    const perIp = pruned(ipHits.get(ip) ?? [], now);
    if (globals.length >= GLOBAL_MAX || perIp.length >= PER_IP_MAX) {
        globalHits.length = 0;
        globalHits.push(...globals);
        ipHits.set(ip, perIp);
        return true;
    }
    globals.push(now);
    perIp.push(now);
    globalHits.length = 0;
    globalHits.push(...globals);
    ipHits.set(ip, perIp);
    return false;
}

function isDuplicate(email: string, problem: string): boolean {
    const now = Date.now();
    const hash = createHash("sha256").update(`${email}\u0000${problem}`).digest("hex");
    const seen = recentEnquiries.get(hash);
    if (seen && now - seen < DEDUP_MS) return true;
    if (recentEnquiries.size > 500) {
        for (const [k, t] of recentEnquiries) if (now - t >= DEDUP_MS) recentEnquiries.delete(k);
    }
    recentEnquiries.set(hash, now);
    return false;
}

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (rateLimited(ip)) {
        return NextResponse.json(
            { ok: false, message: "Too many submissions right now. Please try again later." },
            { status: 429 }
        );
    }

    const text = await req.text();
    if (text.length > BODY_MAX_BYTES) {
        return NextResponse.json({ ok: false, message: "Submission too large." }, { status: 413 });
    }

    let payload: unknown;
    try {
        payload = JSON.parse(text);
    } catch {
        return NextResponse.json({ ok: false, message: "Malformed submission." }, { status: 400 });
    }

    const result = validateEnquiry(payload);
    if (result.ok && result.drop) {
        // Pretend success — never tip off automation that it was filtered.
        return NextResponse.json({ ok: true });
    }
    if (!result.ok) {
        return NextResponse.json(
            { ok: false, message: "Please correct the highlighted fields.", errors: result.errors },
            { status: 400 }
        );
    }

    const value = result.value;
    if (isDuplicate(value.email, value.problem)) {
        return NextResponse.json({ ok: true });
    }

    const id = `en_${Date.now().toString(36)}_${createHash("sha256")
        .update(`${value.email}${value.problem}`)
        .digest("hex")
        .slice(0, 8)}`;

    // Private channel: every enquiry lands in the owner's server logs —
    // the durable store for this deployment.
    console.log(
        JSON.stringify({
            evt: "enquiry",
            id,
            name: value.name,
            email: value.email,
            organization: value.organization ?? null,
            projectType: value.projectType,
            problem: value.problem,
            deliverables: value.deliverables ?? null,
            timeline: value.timeline ?? null,
            budget: value.budget ?? null,
            receivedAt: new Date().toISOString(),
        })
    );

    return NextResponse.json({
        ok: true,
        message: "Thank you — your enquiry has been received. I will reply to the email you provided.",
    });
}
