import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { validateSubmission } from "@/lib/review-submission";
import { archiveProjects } from "@/data/archive";
import { serviceSlugs } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";

/**
 * POST /api/testimonials — the reviews intake.
 *
 * Storage: this deployment has no database and serverless filesystems are
 * ephemeral, so the public store is the repository itself — the validated,
 * consented, positive record is committed to `data/testimonials.json`
 * through the GitHub contents API, the existing GitHub -> Vercel pipeline
 * rebuilds, and the testimonial appears on the site. Zero new services.
 *
 * Requirements (see .env.example):
 *   REVIEWS_GH_TOKEN      fine-grained PAT, Contents: Read+Write on this repo
 *   REVIEWS_REPO           optional, defaults to naresh-cn2/cn2-identity-hub
 *   REVIEWS_PUBLISH_MODE   auto (default) | queue
 *
 * Publication rules:
 *   - consent === true AND rating >= 4 -> eligible for the public showcase
 *   - everything else (low ratings, withheld consent) is NEVER committed:
 *     the repository is public, so private feedback lives only in the
 *     owner's server logs (structured JSON line, queryable in Vercel).
 *   - without a configured token, all submissions are accepted into those
 *     private logs and automatic publishing activates when the token lands.
 *
 * Abuse layers: request size cap, per-IP and global rate windows, honeypot
 * and dwell-time drops (silent), structural validation, 24h dedup hash.
 */

export const runtime = "nodejs";

const BODY_MAX_BYTES = 8 * 1024;
const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_MAX = 3;
const GLOBAL_MAX = 30;
const DEDUP_MS = 24 * 60 * 60 * 1000;

const ipHits = new Map<string, number[]>();
const globalHits: number[] = [];
const recentFeedback = new Map<string, number>();

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

function isDuplicate(feedback: string, name: string): boolean {
    const now = Date.now();
    const hash = createHash("sha256").update(`${feedback}\u0000${name}`).digest("hex");
    const seen = recentFeedback.get(hash);
    if (seen && now - seen < DEDUP_MS) return true;
    // keep the map small: drop expired entries on the way through
    if (recentFeedback.size > 500) {
        for (const [k, t] of recentFeedback) if (now - t >= DEDUP_MS) recentFeedback.delete(k);
    }
    recentFeedback.set(hash, now);
    return false;
}

async function commitEntry(entry: Testimonial): Promise<{ committed: boolean }> {
    const token = process.env.REVIEWS_GH_TOKEN;
    if (!token) return { committed: false };
    const repo = process.env.REVIEWS_REPO || "naresh-cn2/cn2-identity-hub";
    const apiUrl = `https://api.github.com/repos/${repo}/contents/data/testimonials.json`;
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    for (let attempt = 0; attempt < 2; attempt++) {
        const get = await fetch(apiUrl, { headers, cache: "no-store" });
        if (!get.ok) {
            console.error(JSON.stringify({ evt: "review-commit-read-failed", status: get.status }));
            return { committed: false };
        }
        const current = (await get.json()) as { sha: string; content: string };
        const data = JSON.parse(Buffer.from(current.content, "base64").toString("utf8")) as {
            reviews?: Testimonial[];
        };
        if (!Array.isArray(data.reviews)) data.reviews = [];
        if (data.reviews.some((r) => r.id === entry.id)) return { committed: true };
        data.reviews.push(entry);

        const put = await fetch(apiUrl, {
            method: "PUT",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify({
                message: `testimonials: add ${entry.rating}-star ${entry.relationship} review`,
                content: Buffer.from(`${JSON.stringify(data, null, 2)}\n`).toString("base64"),
                sha: current.sha,
            }),
        });
        if (put.ok) return { committed: true };
        if (put.status !== 409 && put.status !== 422) {
            const detail = await put.text();
            console.error(JSON.stringify({ evt: "review-commit-write-failed", status: put.status, detail: detail.slice(0, 300) }));
            return { committed: false };
        }
        // 409/422 = concurrent write, refresh the sha and retry once
    }
    return { committed: false };
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

    const knownWork = new Set<string>([
        ...archiveProjects.map((p) => p.id),
        ...serviceSlugs,
    ]);

    const result = validateSubmission(payload, knownWork);
    if (result.ok && result.drop) {
        // Pretend success — never tip off automation that it was filtered.
        return NextResponse.json({ ok: true, published: false });
    }
    if (!result.ok) {
        return NextResponse.json(
            { ok: false, message: "Please correct the highlighted fields.", errors: result.errors },
            { status: 400 }
        );
    }

    const value = result.value;
    if (isDuplicate(value.feedback, value.name)) {
        return NextResponse.json({ ok: true, published: false });
    }

    const eligible = value.consent && value.rating >= 4;
    const publishMode = process.env.REVIEWS_PUBLISH_MODE === "queue" ? "queue" : "auto";
    const hasToken = Boolean(process.env.REVIEWS_GH_TOKEN);
    const status: Testimonial["status"] = eligible && publishMode === "auto" ? "published" : "pending";

    const entry: Testimonial = {
        id: `rv_${Date.now().toString(36)}_${createHash("sha256")
            .update(`${value.feedback}${value.name}`)
            .digest("hex")
            .slice(0, 8)}`,
        name: value.name,
        role: value.role,
        organization: value.organization,
        relationship: value.relationship,
        work: value.work,
        workKind: value.workKind,
        rating: value.rating,
        feedback: value.feedback,
        attribution: value.attribution,
        consent: value.consent,
        status,
        submittedAt: new Date().toISOString(),
    };

    // Private channel: every submission lands in the owner's server logs —
    // the only place low ratings and unconsented feedback are kept.
    console.log(
        JSON.stringify({
            evt: "review-submission",
            id: entry.id,
            name: entry.name,
            role: entry.role,
            organization: entry.organization ?? null,
            relationship: entry.relationship,
            rating: entry.rating,
            consent: entry.consent,
            eligible,
            work: entry.work ?? null,
            feedback: entry.feedback,
            submittedAt: entry.submittedAt,
        })
    );

    let published = false;
    if (eligible && hasToken) {
        const { committed } = await commitEntry(entry);
        published = committed && status === "published";
    }

    return NextResponse.json({
        ok: true,
        published,
        message: published
            ? "Thank you — your review is now published."
            : "Thank you — your feedback has been received.",
    });
}
