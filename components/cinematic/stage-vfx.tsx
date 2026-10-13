"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * StageVFX — the cinematic stage layer for every inner route.
 *
 * Mounts once at the root (after SiteAmbience) as an absolute layer pinned
 * to the top of the document — one viewport tall — so it composes behind
 * each page's hero: portal light pools, slow volumetric haze, drifting dust
 * and a per-route motif with real depth cues (projection, parallax, front/
 * back shading). This is the home hero's atmosphere, redistributed: the
 * same pool/vignette language everywhere ("same theme"), a different
 * motif per route ("different style").
 *
 * Motifs (10-20s cycles, matching the slow-motion home pass):
 *   ring    — portal ring with a light sweep orbiting every 14s   /builds
 *   chain   — serpentine rail with energy pulses                  /case-studies
 *   stars   — rotating projected starfield with rare meteors      /research, /testimonials
 *   horizon — perspective grid floor scrolling toward the viewer  /proof, /cv
 *   wave    — layered 3D oscilloscope ribbon                      /services, /lab
 *   orbit   — armillary rings with depth-shaded travellers        /contact, /links, /certifications
 *   paths   — branching light routes with flowing pulses          /opportunities, /work-with-me
 *   lattice — bobbing constellation mesh with a drifting shimmer  /capabilities, /intelligence
 *   dust    — volumetric light shaft over dense drifting dust     /articles, /how-i-work, default
 *
 * Rules honoured (same as PageAtmosphere/CinematicLayers):
 *  - aria-hidden + pointer-events:none; layered under content at -z.
 *  - One rAF loop; IntersectionObserver pauses it past the first fold,
 *    visibilitychange pauses it in hidden tabs.
 *  - prefers-reduced-motion draws one static frame (and on resize).
 *  - Pointer parallax only for fine pointers; both themes carry their
 *    own alpha budget; counts drop on small screens.
 *  - Excluded routes (/, /hub, /about, /identity) return null — they
 *    carry their own full treatments.
 */

type StageMotif =
    | "ring"
    | "chain"
    | "stars"
    | "horizon"
    | "wave"
    | "orbit"
    | "paths"
    | "lattice"
    | "dust";

function motifFor(path: string): StageMotif | null {
    if (path === "/") return null;
    if (path.startsWith("/hub")) return null;
    if (path.startsWith("/about")) return null;
    if (path.startsWith("/identity")) return null;
    if (path.startsWith("/builds")) return "ring";
    if (path.startsWith("/case-studies")) return "chain";
    if (path.startsWith("/research")) return "stars";
    if (path.startsWith("/testimonials")) return "stars";
    if (path.startsWith("/proof")) return "horizon";
    if (path.startsWith("/cv")) return "horizon";
    if (path.startsWith("/services")) return "wave";
    if (path.startsWith("/lab")) return "wave";
    if (path.startsWith("/contact") || path.startsWith("/links")) return "orbit";
    if (path.startsWith("/certifications")) return "orbit";
    if (path.startsWith("/opportunities")) return "paths";
    if (path.startsWith("/work-with-me")) return "paths";
    if (path.startsWith("/capabilities") || path.startsWith("/intelligence")) return "lattice";
    return "dust"; // articles, how-i-work and the remaining routes
}

type Mode = "dark" | "light";
type RGB = [number, number, number];

interface StagePalette {
    glow: RGB;      // portal pool / primary light
    structure: RGB; // mesh lines, rails
    signal: RGB;    // restrained red accents
    bright: RGB;    // highlights, sweeps, sparks
    deep: RGB;      // receding tones, haze
}

const PALETTES: Record<Mode, StagePalette> = {
    dark: {
        glow: [86, 148, 255],
        structure: [111, 150, 242],
        signal: [230, 57, 42],
        bright: [198, 222, 255],
        deep: [54, 72, 118],
    },
    light: {
        glow: [64, 118, 232],
        structure: [27, 77, 201],
        signal: [200, 36, 24],
        bright: [24, 60, 132],
        deep: [107, 131, 187],
    },
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

/** Deterministic PRNG so every mount draws the same composition. */
function mulberry32(seed: number) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const SEEDS: Record<StageMotif, number> = {
    ring: 31091,
    chain: 7710710,
    stars: 11235813,
    horizon: 1618033,
    wave: 2718281,
    orbit: 3141592,
    paths: 14142135,
    lattice: 161803,
    dust: 424242,
};

export default function StageVFX() {
    const pathname = usePathname();
    const motif = motifFor(pathname ?? "/");
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!motif) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mode: Mode = theme === "light" ? "light" : "dark";
        const pal = PALETTES[mode];
        const dim = mode === "light" ? 0.66 : 1;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(pointer: fine)").matches;
        const small = window.innerWidth < 768;

        /* ---------------- sizing ---------------- */
        let w = 1;
        let h = 1;
        let sc = 1;
        let lastDt = 1 / 60;
        let drawFrame: ((t: number, dt: number) => void) | null = null;
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = Math.max(1, rect.width);
            h = Math.max(1, rect.height);
            sc = Math.min(w, h) / 900;
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (reduced && drawFrame) drawFrame(0, lastDt);
        };

        /* ---------------- pointer parallax (depth) ---------------- */
        let px = 0;
        let py = 0;
        let tx = 0;
        let ty = 0;
        const onMove = (e: PointerEvent) => {
            tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
            ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
        };
        if (!reduced && fine) window.addEventListener("pointermove", onMove, { passive: true });

        /* ---------------- reusable soft sprites ---------------- */
        const makeSprite = (r: number, g: number, b: number, peak: number) => {
            const size = 96;
            const s = document.createElement("canvas");
            s.width = size;
            s.height = size;
            const sctx = s.getContext("2d");
            if (!sctx) return s;
            const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            grad.addColorStop(0, `rgba(${r},${g},${b},${peak})`);
            grad.addColorStop(0.45, `rgba(${r},${g},${b},${peak * 0.32})`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            sctx.fillStyle = grad;
            sctx.fillRect(0, 0, size, size);
            return s;
        };
        const spriteGlow = makeSprite(pal.glow[0], pal.glow[1], pal.glow[2], 0.5);
        const spriteBright = makeSprite(pal.bright[0], pal.bright[1], pal.bright[2], 0.55);
        const spriteRed = makeSprite(pal.signal[0], pal.signal[1], pal.signal[2], 0.5);

        const rand = mulberry32(SEEDS[motif]);

        /* ---------------- base atmosphere state ---------------- */
        interface Puff { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number }
        const PUFFS = reduced ? 0 : small ? 7 : 12;
        const puffs: Puff[] = [];
        for (let i = 0; i < PUFFS; i++) {
            puffs.push({
                x: 0.44 + rand() * 0.42,
                y: 0.2 + rand() * 0.55,
                r: (90 + rand() * 130) * (0.7 + 0.5),
                vx: (rand() - 0.5) * 0.006,
                vy: -(0.002 + rand() * 0.006),
                a: 0.05 + rand() * 0.05,
                ph: rand() * Math.PI * 2,
            });
        }

        interface Mote { x: number; y: number; z: number; r: number; vx: number; vy: number; ph: number; red: boolean }
        const MOTES = reduced ? 0 : small ? 20 : motif === "dust" ? 64 : 44;
        const motes: Mote[] = [];
        for (let i = 0; i < MOTES; i++) {
            motes.push({
                x: rand(), y: rand(), z: 0.3 + rand() * 0.7,
                r: (0.5 + rand() * 1.4), vx: (rand() - 0.5) * 0.004, vy: -(0.002 + rand() * 0.006),
                ph: rand() * Math.PI * 2, red: rand() < 0.12,
            });
        }

        /* ---------------- motif state ---------------- */
        interface ChainPulse { u: number; dur: number; wait: number; red: boolean }
        const chainPts: Array<[number, number]> = [
            [0.05, 0.64], [0.18, 0.5], [0.3, 0.57], [0.44, 0.43],
            [0.57, 0.48], [0.7, 0.34], [0.83, 0.4], [0.95, 0.27],
        ];
        const chainPulses: ChainPulse[] = [0, 1, 2].map((i) => ({
            u: rand(), dur: 7 + rand() * 3, wait: rand() * 5, red: i === 1,
        }));
        // Lengths are recomputed per sample from the current canvas size so
        // pulses move at a uniform speed regardless of when resize happened.
        const chainPoint = (u: number): [number, number] => {
            const lens: number[] = [];
            let total = 0;
            for (let i = 0; i < chainPts.length - 1; i++) {
                const dx = (chainPts[i + 1][0] - chainPts[i][0]) * w;
                const dy = (chainPts[i + 1][1] - chainPts[i][1]) * h;
                const L = Math.hypot(dx, dy);
                lens.push(L);
                total += L;
            }
            let target = Math.max(0, Math.min(1, u)) * total;
            for (let i = 0; i < lens.length; i++) {
                if (target <= lens[i]) {
                    const f = lens[i] ? target / lens[i] : 0;
                    return [
                        (chainPts[i][0] + (chainPts[i + 1][0] - chainPts[i][0]) * f) * w,
                        (chainPts[i][1] + (chainPts[i + 1][1] - chainPts[i][1]) * f) * h,
                    ];
                }
                target -= lens[i];
            }
            const lastP = chainPts[chainPts.length - 1];
            return [lastP[0] * w, lastP[1] * h];
        };

        interface Star { x: number; y: number; z: number; s: number; ph: number; red: boolean; giant: boolean }
        const STARS = reduced ? 0 : small ? 46 : 96;
        const stars: Star[] = [];
        for (let i = 0; i < STARS; i++) {
            stars.push({
                x: rand() * 2 - 1, y: (rand() * 2 - 1) * 0.62, z: rand() * 2 - 1,
                s: 0.5 + rand() * 1.6, ph: rand() * Math.PI * 2, red: i > 0 && rand() < 0.07,
                giant: i % 34 === 0,
            });
        }
        let meteorAt = 4 + rand() * 6; // seconds
        let meteorT = -1;

        let horizonScroll = 0;

        interface PathPulse { i: number; u: number; dur: number; wait: number; red: boolean }
        const pathPulses: PathPulse[] = [0, 1, 2, 3].map((i) => ({
            i, u: rand(), dur: 8 + rand() * 4, wait: rand() * 6, red: i === 3,
        }));

        interface OrbitRing { rx: number; ry: number; rot: number; period: number; ph: number; dots: number }
        const orbitRings: OrbitRing[] = [
            { rx: 0.3, ry: 0.1, rot: -0.42, period: 26, ph: 0, dots: 2 },
            { rx: 0.24, ry: 0.16, rot: 0.34, period: 21, ph: 2, dots: 2 },
            { rx: 0.34, ry: 0.06, rot: 1.15, period: 31, ph: 4, dots: 1 },
        ];

        interface LatNode { x: number; y: number; ph: number; red: boolean }
        const latNodes: LatNode[] = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 6; c++) {
                latNodes.push({
                    x: 0.1 + (c / 5) * 0.8 + (rand() - 0.5) * 0.03,
                    y: 0.16 + (r / 3) * 0.56 + (rand() - 0.5) * 0.04,
                    ph: rand() * Math.PI * 2, red: (r * 6 + c) % 7 === 3,
                });
            }
        }
        const latCols = 6;
        const latRows = 4;
        interface LatPulse { edge: number; u: number; dur: number; wait: number }
        const latPulses: LatPulse[] = [0, 1, 2].map(() => ({
            edge: Math.floor(rand() * (latCols * (latRows - 1) + (latCols - 1) * latRows)),
            u: rand(), dur: 5 + rand() * 3, wait: rand() * 6,
        }));

        interface Branch { cpx: number; cpy: number; ex: number; ey: number; wd: number; ph: number }
        const pathTrunk: Array<[number, number]> = [[0.04, 0.55], [0.24, 0.53], [0.48, 0.5]];
        const branches: Branch[] = [
            { cpx: 0.64, cpy: 0.4, ex: 0.95, ey: 0.16, wd: 3.4, ph: 0 },
            { cpx: 0.66, cpy: 0.46, ex: 0.94, ey: 0.4, wd: 2.8, ph: 1.6 },
            { cpx: 0.66, cpy: 0.56, ex: 0.95, ey: 0.64, wd: 2.4, ph: 3.1 },
            { cpx: 0.64, cpy: 0.62, ex: 0.9, ey: 0.84, wd: 2.1, ph: 4.6 },
        ];

        /* ---------------- helpers ---------------- */
        const poolBreath = (t: number) => 0.72 + 0.28 * Math.sin(t * 0.0005); // ~12.6s
        const floorPulse = (t: number) => 0.7 + 0.3 * Math.sin(t * 0.0004);   // ~15.7s

        /* ---------------- draws ---------------- */

        const drawPools = (t: number) => {
            const breath = poolBreath(t);
            const cx = 0.64 * w + px * 10;
            const cy = 0.42 * h + py * 7;
            const R = Math.max(w, h) * 0.5;
            // primary portal pool
            let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
            g.addColorStop(0, rgba(pal.glow, (mode === "dark" ? 0.17 : 0.11) * breath * dim));
            g.addColorStop(0.4, rgba(pal.glow, (mode === "dark" ? 0.06 : 0.04) * breath * dim));
            g.addColorStop(1, rgba(pal.glow, 0));
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            // floor reflection pool (ellipse via uniform scale at the pool centre)
            const fy = 0.9 * h;
            const fw = w * 0.42;
            ctx.save();
            ctx.translate(0.62 * w + px * 8, fy);
            ctx.scale(1, 0.3);
            g = ctx.createRadialGradient(0, 0, 0, 0, 0, fw);
            g.addColorStop(0, rgba(pal.bright, (mode === "dark" ? 0.1 : 0.07) * floorPulse(t) * dim));
            g.addColorStop(1, rgba(pal.bright, 0));
            ctx.fillStyle = g;
            ctx.fillRect(-fw, -fw, fw * 2, fw * 2);
            ctx.restore();
        };

        const drawVignette = () => {
            if (mode !== "dark") return;
            const g = ctx.createRadialGradient(w * 0.5, h * 0.46, Math.min(w, h) * 0.35, w * 0.5, h * 0.46, Math.max(w, h) * 0.75);
            g.addColorStop(0, "rgba(4,5,9,0)");
            g.addColorStop(1, "rgba(4,5,9,0.5)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        };

        const drawHaze = (t: number) => {
            if (!puffs.length) return;
            const breath = poolBreath(t);
            ctx.globalCompositeOperation = mode === "dark" ? "screen" : "source-over";
            for (const p of puffs) {
                p.x += p.vx * lastDt;
                p.y += p.vy * lastDt;
                if (p.y < 0.08) { p.y = 0.78; p.x = 0.44 + rand() * 0.42; }
                if (p.x < 0.36) p.x = 0.88;
                else if (p.x > 0.9) p.x = 0.4;
                const r = p.r * (0.9 + 0.1 * Math.sin(t * 0.0004 + p.ph)) * (sc + 0.35);
                const a = p.a * dim * (0.4 + 0.6 * breath) * (mode === "dark" ? 1 : 0.75);
                ctx.globalAlpha = Math.min(0.4, a);
                const sx = p.x * w + px * 6 - r;
                const sy = p.y * h + py * 4 - r;
                ctx.drawImage(spriteGlow, sx, sy, r * 2, r * 2);
            }
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";
        };

        const drawMotes = (t: number) => {
            ctx.globalCompositeOperation = mode === "dark" ? "lighter" : "source-over";
            for (const m of motes) {
                if (!reduced) {
                    m.x += m.vx * lastDt;
                    m.y += m.vy * lastDt;
                    if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
                    if (m.x < -0.02) m.x = 1.02;
                    else if (m.x > 1.02) m.x = -0.02;
                }
                const tw = 0.55 + 0.45 * Math.sin(t * 0.0006 + m.ph); // ~10.5s
                const col = m.red ? pal.signal : pal.bright;
                const a = (mode === "dark" ? 0.5 : 0.34) * tw * m.z * dim;
                const x = m.x * w + px * 4 * m.z;
                const y = m.y * h + py * 3 * m.z;
                if (m.red) {
                    ctx.globalAlpha = a;
                    const rr = m.r * 3.4;
                    ctx.drawImage(spriteRed, x - rr, y - rr, rr * 2, rr * 2);
                    ctx.globalAlpha = 1;
                } else {
                    ctx.fillStyle = rgba(col, a);
                    ctx.beginPath();
                    ctx.arc(x, y, m.r * m.z, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalCompositeOperation = "source-over";
        };

        const drawMotifRing = (t: number) => {
            const cx = 0.64 * w + px * 14;
            const cy = 0.42 * h + py * 10;
            const R = Math.min(w, h) * 0.17;
            const breath = poolBreath(t);
            // halo disc
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
            g.addColorStop(0, rgba(pal.glow, 0.1 * breath * dim));
            g.addColorStop(1, rgba(pal.glow, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
            ctx.fill();
            // base ring
            ctx.strokeStyle = rgba(pal.structure, 0.4 * dim);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.stroke();
            // light sweep — one lap every 14s
            const a0 = (t / 14000) * Math.PI * 2;
            ctx.strokeStyle = rgba(pal.bright, 0.16 * dim);
            ctx.lineWidth = 9;
            ctx.beginPath();
            ctx.arc(cx, cy, R, a0 - 0.9, a0 + 0.5);
            ctx.stroke();
            ctx.strokeStyle = rgba(pal.bright, 0.85 * dim);
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.arc(cx, cy, R, a0 - 0.55, a0);
            ctx.stroke();
            // counter-rotating dashed inner ring — 24s
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(-(t / 24000) * Math.PI * 2);
            ctx.strokeStyle = rgba(pal.structure, 0.3 * dim);
            ctx.lineWidth = 1.2;
            ctx.setLineDash([2, 9]);
            ctx.beginPath();
            ctx.arc(0, 0, R * 0.8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
            // orbiting sparks — 18s+
            for (let i = 0; i < 6; i++) {
                const ang = (t / (18000 + i * 1600)) * Math.PI * 2 + (i * Math.PI * 2) / 6;
                const rr = R * (i % 2 ? 1.12 : 0.72);
                const sx = cx + Math.cos(ang) * rr;
                const sy = cy + Math.sin(ang) * rr * 0.96;
                const s = (4 + 2 * Math.sin(t * 0.0007 + i)) * sc + 3;
                ctx.globalAlpha = 0.5 * dim;
                ctx.drawImage(i === 2 ? spriteRed : spriteBright, sx - s, sy - s, s * 2, s * 2);
                ctx.globalAlpha = 1;
            }
        };

        const drawMotifChain = (t: number) => {
            const ox = px * 10;
            const oy = py * 7;
            ctx.strokeStyle = rgba(pal.structure, 0.3 * dim);
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            for (let i = 0; i < chainPts.length; i++) {
                const x = chainPts[i][0] * w + ox;
                const y = chainPts[i][1] * h + oy;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            // stations
            for (let i = 0; i < chainPts.length; i++) {
                const x = chainPts[i][0] * w + ox;
                const y = chainPts[i][1] * h + oy;
                const pulse = 0.5 + 0.5 * Math.sin((t / (10000 + i * 1300)) * Math.PI * 2 + i);
                const red = i === 2 || i === 6;
                const r = (2.2 + 1.6 * pulse) * sc + 1.4;
                ctx.fillStyle = rgba(red ? pal.signal : pal.bright, (0.35 + 0.45 * pulse) * dim);
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 0.4 * pulse * dim;
                ctx.drawImage(red ? spriteRed : spriteBright, x - r * 4, y - r * 4, r * 8, r * 8);
                ctx.globalAlpha = 1;
            }
            // energy pulses
            for (const p of chainPulses) {
                if (reduced) break;
                if (p.wait > 0) { p.wait -= lastDt; continue; }
                p.u += lastDt / p.dur;
                if (p.u >= 1) { p.u = 0; p.wait = 5 + rand() * 6; continue; }
                const [hx, hy] = chainPoint(p.u);
                const [tx2, ty2] = chainPoint(p.u - 0.05);
                ctx.strokeStyle = rgba(p.red ? pal.signal : pal.bright, 0.55 * dim);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(tx2 + ox, ty2 + oy);
                ctx.lineTo(hx + ox, hy + oy);
                ctx.stroke();
                const s = 7 * sc + 5;
                ctx.globalAlpha = 0.9 * dim;
                ctx.drawImage(p.red ? spriteRed : spriteBright, hx + ox - s, hy + oy - s, s * 2, s * 2);
                ctx.globalAlpha = 1;
            }
        };

        const drawMotifStars = (t: number) => {
            const cx = 0.6 * w + px * 12;
            const cy = 0.4 * h + py * 8;
            const field = Math.min(w, h) * 0.62;
            const A = t * 0.00005; // slow yaw — full turn ~2 min
            const cosA = Math.cos(A);
            const sinA = Math.sin(A);
            for (const s of stars) {
                const rx = s.x * cosA + s.z * sinA;
                const rz = -s.x * sinA + s.z * cosA;
                const k = 2.2 / (2.2 + rz * 0.85);
                const sx = cx + rx * k * field;
                const sy = cy + s.y * k * field * 0.72;
                const tw = 0.6 + 0.4 * Math.sin(t * 0.00055 + s.ph);
                const a = Math.max(0, (0.2 + 0.55 * (k - 0.75)) * tw * dim);
                const r = s.s * k;
                if (s.red) {
                    ctx.fillStyle = rgba(pal.signal, Math.min(0.8, a * 1.2));
                    ctx.beginPath();
                    ctx.arc(sx, sy, r + 0.4, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = rgba(pal.bright, Math.min(0.85, a));
                    ctx.beginPath();
                    ctx.arc(sx, sy, r, 0, Math.PI * 2);
                    ctx.fill();
                }
                if (s.giant && a > 0.1) {
                    ctx.strokeStyle = rgba(pal.bright, a * 0.5);
                    ctx.lineWidth = 0.8;
                    const L = r * 7;
                    ctx.beginPath();
                    ctx.moveTo(sx - L, sy);
                    ctx.lineTo(sx + L, sy);
                    ctx.moveTo(sx, sy - L);
                    ctx.lineTo(sx, sy + L);
                    ctx.stroke();
                    ctx.globalAlpha = a * 0.55;
                    ctx.drawImage(spriteBright, sx - r * 8, sy - r * 8, r * 16, r * 16);
                    ctx.globalAlpha = 1;
                }
            }
            // rare meteor — fires every 12-20s, crosses in ~1.2s
            if (!reduced) {
                if (meteorT < 0 && t * 0.001 > meteorAt) {
                    meteorT = 0;
                    meteorAt = t * 0.001 + 12 + rand() * 8;
                }
                if (meteorT >= 0) {
                    meteorT += lastDt;
                    const u = meteorT / 1.2;
                    if (u >= 1) meteorT = -1;
                    else {
                        const mx = (0.78 - 0.34 * u) * w;
                        const my = (0.14 + 0.2 * u) * h;
                        const tail = 0.1;
                        ctx.strokeStyle = rgba(pal.bright, (1 - u) * 0.7 * dim);
                        ctx.lineWidth = 1.4;
                        ctx.beginPath();
                        ctx.moveTo(mx, my);
                        ctx.lineTo(mx + w * tail * 0.4, my - h * tail * 0.28);
                        ctx.stroke();
                    }
                }
            }
        };

        const drawMotifHorizon = (t: number) => {
            const vx = 0.64 * w + px * 8;
            const vy = 0.5 * h + py * 5;
            if (!reduced) horizonScroll += lastDt * 0.06; // one depth cell ≈ 17s
            const frac = horizonScroll % 1;
            // depth rings
            for (let i = 0; i < 13; i++) {
                const d = i + frac;
                const y = vy + (h * 0.62) / (0.9 + d * 0.62);
                if (y > h + 2) continue;
                const a = Math.max(0, 0.3 * (1 - i / 13) * dim);
                ctx.strokeStyle = rgba(pal.structure, a);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            // converging rails
            ctx.strokeStyle = rgba(pal.structure, 0.16 * dim);
            ctx.lineWidth = 1;
            for (let j = 0; j <= 8; j++) {
                const bx = vx + ((j / 8) - 0.5) * w * 2.4;
                ctx.beginPath();
                ctx.moveTo(vx, vy);
                ctx.lineTo(bx, h + 10);
                ctx.stroke();
            }
            // horizon beacons — 12-16s pulses
            for (let i = 0; i < 5; i++) {
                const bx = (0.14 + i * 0.18) * w + px * 4;
                const pulse = 0.5 + 0.5 * Math.sin((t / (12000 + i * 1400)) * Math.PI * 2 + i * 1.7);
                const red = i === 1 || i === 4;
                const s = (3 + 3 * pulse) * sc + 3;
                ctx.globalAlpha = (0.3 + 0.5 * pulse) * dim;
                ctx.drawImage(red ? spriteRed : spriteBright, bx - s, vy - s, s * 2, s * 2);
                ctx.globalAlpha = 1;
                ctx.fillStyle = rgba(red ? pal.signal : pal.bright, (0.5 + 0.4 * pulse) * dim);
                ctx.beginPath();
                ctx.arc(bx, vy, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawMotifWave = (t: number) => {
            const midY = 0.5 * h + py * 6;
            const tilt = Math.sin(t * 0.00008) * 80; // ≈ 78s sway
            const layers = [
                { a: 0.14, wd: 1.6, off: -14, sp: 0.00031 },
                { a: 0.3, wd: 2, off: 0, sp: 0.0004 },
                { a: 0.18, wd: 1.6, off: 15, sp: 0.00048 },
            ];
            for (const L of layers) {
                ctx.strokeStyle = rgba(pal.glow, L.a * dim);
                ctx.lineWidth = L.wd;
                ctx.beginPath();
                for (let x = 0.04 * w; x <= 0.96 * w; x += 14) {
                    const u = x / w - 0.5;
                    const y = midY + L.off
                        + Math.sin(x * 0.008 + t * L.sp + L.off) * (24 + L.off * 0.4)
                        + Math.sin(x * 0.0031 - t * 0.00027) * 38
                        + u * tilt;
                    if (x <= 0.04 * w) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            // under-glow for the middle layer
            ctx.strokeStyle = rgba(pal.glow, 0.07 * dim);
            ctx.lineWidth = 12;
            ctx.beginPath();
            for (let x = 0.04 * w; x <= 0.96 * w; x += 14) {
                const u = x / w - 0.5;
                const y = midY + Math.sin(x * 0.008 + t * 0.0004) * 24 + Math.sin(x * 0.0031 - t * 0.00027) * 38 + u * tilt;
                if (x <= 0.04 * w) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            // sweep marker — one pass per 16s
            if (!reduced) {
                const mu = (t % 16000) / 16000;
                const mx = 0.04 * w + mu * 0.92 * w;
                const u = mx / w - 0.5;
                const my = midY + Math.sin(mx * 0.008 + t * 0.0004) * 24 + Math.sin(mx * 0.0031 - t * 0.00027) * 38 + u * tilt;
                ctx.strokeStyle = rgba(pal.bright, 0.1 * dim);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mx, midY - 70);
                ctx.lineTo(mx, midY + 70);
                ctx.stroke();
                const s = 7 * sc + 4;
                ctx.globalAlpha = 0.9 * dim;
                ctx.drawImage(spriteBright, mx - s, my - s, s * 2, s * 2);
                ctx.globalAlpha = 1;
            }
        };

        const drawMotifOrbit = (t: number) => {
            const cx = 0.64 * w + px * 14;
            const cy = 0.42 * h + py * 10;
            const base = Math.min(w, h) * 0.34;
            for (const ring of orbitRings) {
                const rx = ring.rx * base;
                const ry = ring.ry * base;
                const cosR = Math.cos(ring.rot);
                const sinR = Math.sin(ring.rot);
                // ring stroke (ellipse, tilted)
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(ring.rot);
                ctx.strokeStyle = rgba(pal.structure, 0.3 * dim);
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                ctx.stroke();
                // tick mesh
                ctx.strokeStyle = rgba(pal.structure, 0.16 * dim);
                ctx.lineWidth = 1;
                for (let k = 0; k < 24; k++) {
                    const a = (k / 24) * Math.PI * 2;
                    const c = Math.cos(a);
                    const s = Math.sin(a);
                    ctx.beginPath();
                    ctx.moveTo(c * rx, s * ry);
                    ctx.lineTo(c * rx * 1.05, s * ry * 1.05);
                    ctx.stroke();
                }
                ctx.restore();
                // travellers with front/back depth shading
                for (let d = 0; d < ring.dots; d++) {
                    const a = (t / (ring.period * 1000)) * Math.PI * 2 + ring.ph + (d * Math.PI * 2) / ring.dots;
                    const lx = Math.cos(a) * rx;
                    const ly = Math.sin(a) * ry;
                    const x = cx + lx * cosR - ly * sinR;
                    const y = cy + lx * sinR + ly * cosR;
                    const front = Math.sin(a) > 0;
                    const s = (front ? 6 : 3.6) * sc + (front ? 4 : 2.4);
                    ctx.globalAlpha = (front ? 0.9 : 0.45) * dim;
                    ctx.drawImage(d === 1 ? spriteRed : spriteBright, x - s, y - s, s * 2, s * 2);
                    ctx.globalAlpha = 1;
                }
            }
            // core — 13s breathe
            const cb = 0.7 + 0.3 * Math.sin((t / 13000) * Math.PI * 2);
            const cs = (26 + 10 * cb) * sc + 16;
            ctx.globalAlpha = 0.7 * cb * dim;
            ctx.drawImage(spriteGlow, cx - cs, cy - cs, cs * 2, cs * 2);
            ctx.globalAlpha = 1;
        };

        const drawMotifPaths = (t: number) => {
            const ox = px * 10;
            const oy = py * 7;
            const sway = (ph: number) => Math.sin(t * 0.0001 + ph) * 14; // ≈ 63s
            const qPoint = (b: Branch, u: number): [number, number] => {
                const p0x = pathTrunk[2][0] * w + ox;
                const p0y = pathTrunk[2][1] * h + oy;
                const p1x = b.ex * w + ox;
                const p1y = (b.ey + (sway(b.ph) / h)) * h + oy;
                const cpx = b.cpx * w + ox;
                const cpy = b.cpy * h + oy;
                const mu = 1 - u;
                return [
                    mu * mu * p0x + 2 * mu * u * cpx + u * u * p1x,
                    mu * mu * p0y + 2 * mu * u * cpy + u * u * p1y,
                ];
            };
            // trunk
            ctx.strokeStyle = rgba(pal.structure, 0.34 * dim);
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(pathTrunk[0][0] * w + ox, pathTrunk[0][1] * h + oy);
            ctx.quadraticCurveTo(
                pathTrunk[1][0] * w + ox, pathTrunk[1][1] * h + oy,
                pathTrunk[2][0] * w + ox, pathTrunk[2][1] * h + oy,
            );
            ctx.stroke();
            // branches
            for (const b of branches) {
                const p0x = pathTrunk[2][0] * w + ox;
                const p0y = pathTrunk[2][1] * h + oy;
                const p1x = b.ex * w + ox;
                const p1y = b.ey * h + oy + sway(b.ph);
                ctx.strokeStyle = rgba(pal.structure, 0.28 * dim);
                ctx.lineWidth = b.wd;
                ctx.beginPath();
                ctx.moveTo(p0x, p0y);
                ctx.quadraticCurveTo(b.cpx * w + ox, b.cpy * h + oy, p1x, p1y);
                ctx.stroke();
                // tip node
                const s = 5 * sc + 3;
                ctx.globalAlpha = 0.75 * dim;
                ctx.drawImage(spriteBright, p1x - s, p1y - s, s * 2, s * 2);
                ctx.globalAlpha = 1;
            }
            // flowing pulses — one pass every 12-16s per branch
            if (!reduced) {
                for (const p of pathPulses) {
                    if (p.wait > 0) { p.wait -= lastDt; continue; }
                    p.u += lastDt / p.dur;
                    if (p.u >= 1) { p.u = 0; p.wait = 4 + rand() * 5; continue; }
                    const b = branches[p.i];
                    for (let k = 0; k < 5; k++) {
                        const uu = Math.max(0, p.u - k * 0.035);
                        const [x, y] = qPoint(b, uu);
                        const s = (k === 0 ? 6 : 4.6 - k * 0.7) * sc + 2;
                        ctx.globalAlpha = (k === 0 ? 0.9 : 0.5 - k * 0.09) * dim;
                        ctx.drawImage(p.red && k === 0 ? spriteRed : spriteBright, x - s, y - s, s * 2, s * 2);
                    }
                    ctx.globalAlpha = 1;
                }
            }
        };

        const drawMotifLattice = (t: number) => {
            const ox = px * 10;
            const oy = py * 7;
            const pos = (n: LatNode): [number, number] => [
                n.x * w + ox,
                (n.y + Math.sin((t / 13000) * Math.PI * 2 + n.ph) * 0.008) * h + oy,
            ];
            const sweep = ((t / 14000) % 1) * 1.3 - 0.15; // drifting shimmer
            const nodeIndex = (r: number, c: number) => r * latCols + c;
            // links
            for (let r = 0; r < latRows; r++) {
                for (let c = 0; c < latCols; c++) {
                    const a = latNodes[nodeIndex(r, c)];
                    const [ax, ay] = pos(a);
                    const right = c < latCols - 1 ? latNodes[nodeIndex(r, c + 1)] : null;
                    const down = r < latRows - 1 ? latNodes[nodeIndex(r + 1, c)] : null;
                    for (const b of [right, down]) {
                        if (!b) continue;
                        const [bx2, by2] = pos(b);
                        const mx = ((a.x + b.x) / 2);
                        const shimmer = Math.exp(-(((mx - sweep) / 0.09) ** 2)) * 0.28;
                        ctx.strokeStyle = rgba(pal.structure, (0.14 + shimmer) * dim);
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(bx2, by2);
                        ctx.stroke();
                    }
                }
            }
            // nodes
            for (const n of latNodes) {
                const [x, y] = pos(n);
                const pulse = 0.5 + 0.5 * Math.sin((t / 11000) * Math.PI * 2 + n.ph);
                const s = (3 + 2 * pulse) * sc + 2.4;
                ctx.globalAlpha = (0.3 + 0.3 * pulse) * dim;
                ctx.drawImage(n.red ? spriteRed : spriteGlow, x - s * 2, y - s * 2, s * 4, s * 4);
                ctx.globalAlpha = 1;
                ctx.fillStyle = rgba(n.red ? pal.signal : pal.bright, (0.4 + 0.4 * pulse) * dim);
                ctx.beginPath();
                ctx.arc(x, y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
            // edge pulses
            if (!reduced) {
                for (const p of latPulses) {
                    if (p.wait > 0) { p.wait -= lastDt; continue; }
                    p.u += lastDt / p.dur;
                    if (p.u >= 1) { p.u = 0; p.wait = 6 + rand() * 6; continue; }
                    const horizontal = p.edge < latCols * (latRows - 1);
                    let aI: [number, number];
                    let bI: [number, number];
                    if (horizontal) {
                        const c = p.edge % latCols;
                        const r = Math.floor(p.edge / latCols);
                        aI = [r, c];
                        bI = [r, c + 1];
                    } else {
                        const e = p.edge - latCols * (latRows - 1);
                        const c = e % latCols;
                        const r = Math.floor(e / latCols);
                        aI = [r, c];
                        bI = [r + 1, c];
                    }
                    const a = latNodes[nodeIndex(aI[0], aI[1])];
                    const b = latNodes[nodeIndex(bI[0], bI[1])];
                    const [ax, ay] = pos(a);
                    const [bx2, by2] = pos(b);
                    const x = ax + (bx2 - ax) * p.u;
                    const y = ay + (by2 - ay) * p.u;
                    const s = 5 * sc + 3;
                    ctx.globalAlpha = 0.85 * dim;
                    ctx.drawImage(spriteBright, x - s, y - s, s * 2, s * 2);
                    ctx.globalAlpha = 1;
                }
            }
        };

        const drawMotifDust = (t: number) => {
            // volumetric light shaft from the upper portal area — 79s sway
            const shift = Math.sin(t * 0.00008) * 22;
            const g = ctx.createLinearGradient(0.78 * w + shift, 0, 0.5 * w + shift, h);
            g.addColorStop(0, rgba(pal.bright, 0.06 * dim));
            g.addColorStop(0.55, rgba(pal.glow, 0.03 * dim));
            g.addColorStop(1, rgba(pal.glow, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(0.7 * w + shift, -8);
            ctx.lineTo(0.86 * w + shift, -8);
            ctx.lineTo(0.62 * w + shift, h + 8);
            ctx.lineTo(0.36 * w + shift, h + 8);
            ctx.closePath();
            ctx.fill();
        };

        const drawMotif = (t: number) => {
            switch (motif) {
                case "ring": drawMotifRing(t); break;
                case "chain": drawMotifChain(t); break;
                case "stars": drawMotifStars(t); break;
                case "horizon": drawMotifHorizon(t); break;
                case "wave": drawMotifWave(t); break;
                case "orbit": drawMotifOrbit(t); break;
                case "paths": drawMotifPaths(t); break;
                case "lattice": drawMotifLattice(t); break;
                case "dust": drawMotifDust(t); break;
            }
        };

        /* ---------------- frame ---------------- */
        drawFrame = (t: number, dt: number) => {
            lastDt = dt;
            if (!reduced) {
                px += (tx - px) * 0.05;
                py += (ty - py) * 0.05;
            }
            ctx.clearRect(0, 0, w, h);
            drawPools(t);
            drawMotif(t);
            drawHaze(t);
            drawMotes(t);
            drawVignette();
        };

        /* ---------------- lifecycle ---------------- */
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        let raf = 0;
        let visible = true;
        let last = performance.now();

        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            drawFrame(now, dt);
            raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
        };
        const onVis = () => {
            if (document.hidden) {
                if (raf) { cancelAnimationFrame(raf); raf = 0; }
            } else if (visible && !raf && !reduced) {
                last = performance.now();
                raf = requestAnimationFrame(loop);
            }
        };
        const io = new IntersectionObserver(
            (entries) => {
                visible = entries[0]?.isIntersecting ?? true;
                if (visible && !raf && !document.hidden && !reduced) {
                    last = performance.now();
                    raf = requestAnimationFrame(loop);
                } else if (!visible && raf) {
                    cancelAnimationFrame(raf);
                    raf = 0;
                }
            },
            { rootMargin: "80px" },
        );
        io.observe(canvas);
        document.addEventListener("visibilitychange", onVis);

        if (reduced) {
            drawFrame(0, 0);
        } else {
            raf = requestAnimationFrame(loop);
        }

        return () => {
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            if (!reduced && fine) window.removeEventListener("pointermove", onMove);
        };
    }, [motif, theme]);

    if (!motif) return null;

    return (
        <div className="stage-layer" aria-hidden="true">
            <canvas ref={canvasRef} className="stage-canvas" />
        </div>
    );
}
