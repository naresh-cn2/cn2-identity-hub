import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/health — liveness endpoint for CI and uptime checks.
 * No side effects, no rate limit, no data. Also gives the CI ground-truth
 * probe a real route to exercise POST transport against (405 = framework
 * answered, which distinguishes transport failures from HTTP answers).
 */
export async function GET() {
    return NextResponse.json({ ok: true, service: "cn2-dev" });
}
