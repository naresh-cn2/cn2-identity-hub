"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * PageAtmosphere — per-route ambient VFX layer for the inner pages.
 *
 * Each header mounts this behind its content (grid-field stays below, the
 * relative content wrapper stays above) so every destination gets its own
 * living art direction while sharing one implementation:
 *
 *   network  — sparse constellation graph with travelling signal pulses
 *              (hub, capabilities, intelligence)
 *   field    — perspective market-topology floor that breathes and scrolls
 *              (builds, case studies, proof, how-i-work)
 *   motes    — drifting luminous dust with occasional red signal motes
 *              (about, certifications, articles, cv, testimonials)
 *   signal   — oscilloscope traces with a slow sweeping scan
 *              (lab, services, work-with-me)
 *   orbit    — tilted concentric orbits, armillary-style rotation
 *              (research, opportunities, contact, links)
 *
 * Rules honoured here:
 *  - Light originates from drawn sources only; alpha budget stays low so the
 *    content above always wins. Nothing glows from the screen edges.
 *  - One rAF loop per instance; paused when the tab hides or the layer scrolls
 *    out of view; a single static frame is drawn for prefers-reduced-motion.
 *  - Theme-aware: palettes switch with the dark/light token set.
 *  - aria-hidden + pointer-events:none — navigation and controls are untouched.
 */

type Variant = "network" | "field" | "motes" | "signal" | "orbit";
type Mode = "dark" | "light";
type RGB = [number, number, number];

interface Palette {
    structure: RGB; // blue-grey network / grid lines
    deep: RGB;      // receding tones
    signal: RGB;    // restrained red accents
    bright: RGB;    // highlight nodes / pulses
}

const PALETTES: Record<Mode, Palette> = {
    dark: {
        structure: [111, 150, 242],
        deep: [60, 76, 120],
        signal: [230, 57, 42],
        bright: [190, 215, 255],
    },
    light: {
        structure: [27, 77, 201],
        deep: [107, 131, 187],
        signal: [200, 36, 24],
        bright: [24, 44, 92],
    },
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

/** Deterministic PRNG so SSR/CSR and re-mounts never shift the composition. */
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

const SEEDS: Record<Variant, number> = {
    network: 20261012,
    field: 771133,
    motes: 424242,
    signal: 9091,
    orbit: 31415,
};

export default function PageAtmosphere({
    variant,
    className = "",
}: {
    variant: Variant;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mode: Mode = theme === "light" ? "light" : "dark";
        const pal = PALETTES[mode];
        const dim = mode === "light" ? 0.72 : 1; // light mode reads calmer on white surfaces
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const small = window.innerWidth < 768;

        let w = 1;
        let h = 1;
        let raf = 0;
        let visible = true;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = Math.max(1, rect.width);
            h = Math.max(1, rect.height);
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const rand = mulberry32(SEEDS[variant]);

        /* ---------------- variant state ---------------- */

        interface NetNode { bx: number; by: number; ph: number; amp: number; big: boolean }
        interface NetEdge { a: number; b: number; len: number }
        interface Pulse { e: number; t: number; dur: number; wait: number; red: boolean }

        interface Mote { x: number; y: number; r: number; vx: number; vy: number; ph: number; red: boolean }

        interface Trace { ph: number; sp: number; amp: number; yFrac: number; red: boolean }

        interface OrbitRing { r: number; tilt: number; speed: number; ph: number; dots: number }

        const nodes: NetNode[] = [];
        const edges: NetEdge[] = [];
        const pulses: Pulse[] = [];
        const motes: Mote[] = [];
        const traces: Trace[] = [];
        let rings: OrbitRing[] = [];

        if (variant === "network") {
            const cols = small ? 5 : 8;
            const rows = small ? 3 : 4;
            for (let iy = 0; iy < rows; iy++) {
                for (let ix = 0; ix < cols; ix++) {
                    if (rand() < 0.22) continue; // sparse — a graph, not a lattice
                    nodes.push({
                        bx: (ix + 0.5) / cols + (rand() - 0.5) * 0.06,
                        by: (iy + 0.5) / rows + (rand() - 0.5) * 0.1,
                        ph: rand() * Math.PI * 2,
                        amp: 0.004 + rand() * 0.008,
                        big: rand() < 0.14,
                    });
                }
            }
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].bx - nodes[j].bx;
                    const dy = nodes[i].by - nodes[j].by;
                    const d = Math.hypot(dx, dy);
                    if (d < 0.24) edges.push({ a: i, b: j, len: d });
                }
            }
            const pulseCount = small ? 2 : 4;
            for (let i = 0; i < pulseCount && edges.length; i++) {
                pulses.push({
                    e: Math.floor(rand() * edges.length),
                    t: rand(),
                    dur: 2.6 + rand() * 2.4,
                    wait: rand() * 3,
                    red: i % 3 === 0,
                });
            }
        }

        if (variant === "motes") {
            const count = small ? 22 : 52;
            for (let i = 0; i < count; i++) {
                motes.push({
                    x: rand(),
                    y: rand(),
                    r: 0.6 + rand() * 1.8,
                    vx: (rand() - 0.5) * 0.006,
                    vy: -(0.002 + rand() * 0.007),
                    ph: rand() * Math.PI * 2,
                    red: rand() < 0.1,
                });
            }
        }

        if (variant === "signal") {
            const tcount = small ? 2 : 3;
            for (let i = 0; i < tcount; i++) {
                traces.push({
                    ph: rand() * Math.PI * 2,
                    sp: 0.25 + rand() * 0.3,
                    amp: 0.05 + rand() * 0.06,
                    yFrac: 0.3 + (i / Math.max(1, tcount - 1)) * 0.42,
                    red: i === tcount - 1 && tcount > 2,
                });
            }
        }

        if (variant === "orbit") {
            rings = [
                { r: 0.16, tilt: 0.32, speed: 0.11, ph: 0, dots: 1 },
                { r: 0.26, tilt: -0.2, speed: -0.07, ph: 1.2, dots: 2 },
                { r: 0.38, tilt: 0.12, speed: 0.045, ph: 2.6, dots: 1 },
            ];
        }

        /* ---------------- drawing ---------------- */

        const netPos = (n: NetNode, t: number): [number, number] => [
            (n.bx + Math.sin(t * 0.18 + n.ph) * n.amp) * w,
            (n.by + Math.cos(t * 0.15 + n.ph) * n.amp) * h,
        ];

        const drawNetwork = (t: number) => {
            ctx.lineWidth = 1;
            for (const e of edges) {
                const [x1, y1] = netPos(nodes[e.a], t);
                const [x2, y2] = netPos(nodes[e.b], t);
                ctx.strokeStyle = rgba(pal.structure, 0.07 * dim);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            for (const n of nodes) {
                const [x, y] = netPos(n, t);
                const tw = 0.55 + 0.45 * Math.sin(t * 0.6 + n.ph);
                if (n.big) {
                    ctx.fillStyle = rgba(pal.structure, 0.1 * tw * dim);
                    ctx.beginPath();
                    ctx.arc(x, y, 9, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = rgba(n.big ? pal.bright : pal.structure, (n.big ? 0.5 : 0.3) * tw * dim);
                ctx.beginPath();
                ctx.arc(x, y, n.big ? 2.2 : 1.3, 0, Math.PI * 2);
                ctx.fill();
            }
            for (const p of pulses) {
                if (p.wait > 0) {
                    p.wait -= 1 / 60;
                    continue;
                }
                p.t += 1 / 60 / p.dur;
                if (p.t >= 1) {
                    p.t = 0;
                    p.wait = 1.5 + Math.random() * 3;
                    p.e = Math.floor(Math.random() * edges.length);
                }
                const e = edges[p.e];
                if (!e) continue;
                const [ax, ay] = netPos(nodes[e.a], t);
                const [bx, by] = netPos(nodes[e.b], t);
                const x = ax + (bx - ax) * p.t;
                const y = ay + (by - ay) * p.t;
                const tx = ax + (bx - ax) * Math.max(0, p.t - 0.14);
                const ty = ay + (by - ay) * Math.max(0, p.t - 0.14);
                const col = p.red ? pal.signal : pal.bright;
                const g = ctx.createLinearGradient(tx, ty, x, y);
                g.addColorStop(0, rgba(col, 0));
                g.addColorStop(1, rgba(col, 0.4 * dim));
                ctx.strokeStyle = g;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.fillStyle = rgba(col, 0.65 * dim);
                ctx.beginPath();
                ctx.arc(x, y, 1.7, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawField = (t: number) => {
            const horizon = h * 0.34;
            const cx = w * 0.5;
            const depth = h - horizon;
            const rowsN = small ? 9 : 14;
            const colsN = small ? 10 : 18;
            const travel = (t * 0.16) % 1; // slow forward scroll

            // contour rows, projected with 1/z perspective
            for (let i = 0; i < rowsN; i++) {
                const z = 1 + i + travel;
                const y = horizon + depth / z;
                const fade = Math.min(1, (1 - (y - horizon) / depth) * 1.6);
                ctx.strokeStyle = rgba(pal.structure, 0.06 * fade * dim);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            // rails converging on the vanishing point
            for (let c = 0; c <= colsN; c++) {
                const spread = (c / colsN - 0.5) * 2; // -1..1
                const xb = cx + spread * w * 1.1;
                ctx.strokeStyle = rgba(pal.deep, 0.07 * dim);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cx, horizon);
                ctx.lineTo(xb, h);
                ctx.stroke();
            }
            // breathing topology hump travelling through the floor
            const waveX = cx + Math.sin(t * 0.22) * w * 0.24;
            const g = ctx.createRadialGradient(waveX, h * 0.78, 0, waveX, h * 0.78, w * 0.2);
            g.addColorStop(0, rgba(pal.structure, 0.09 * dim));
            g.addColorStop(1, rgba(pal.structure, 0));
            ctx.fillStyle = g;
            ctx.fillRect(0, horizon, w, depth);
            // a single restrained red survey marker
            const rx = cx + Math.cos(t * 0.17) * w * 0.3;
            ctx.fillStyle = rgba(pal.signal, 0.22 * dim);
            ctx.beginPath();
            ctx.arc(rx, horizon + depth * 0.55, 1.8, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawMotes = (t: number) => {
            for (const m of motes) {
                if (!reduced) {
                    m.x += m.vx / 60;
                    m.y += m.vy / 60;
                    if (m.y < -0.02) {
                        m.y = 1.02;
                        m.x = Math.random();
                    }
                    if (m.x < -0.02) m.x = 1.02;
                    else if (m.x > 1.02) m.x = -0.02;
                }
                const tw = 0.5 + 0.5 * Math.sin(t * 0.7 + m.ph);
                const col = m.red ? pal.signal : pal.structure;
                ctx.fillStyle = rgba(col, (m.red ? 0.3 : 0.16) * (0.4 + tw * 0.6) * dim);
                ctx.beginPath();
                ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawSignal = (t: number) => {
            const sweep = ((t * 0.09) % 1.3) - 0.15; // 0..1.15 → -0.15..1
            const sweepX = sweep * w;
            for (const tr of traces) {
                const baseY = tr.yFrac * h;
                ctx.beginPath();
                const step = Math.max(6, w / 160);
                for (let x = 0; x <= w; x += step) {
                    const u = x / w;
                    const y =
                        baseY +
                        Math.sin(u * 9 + t * tr.sp + tr.ph) * tr.amp * h * 0.5 +
                        Math.sin(u * 23 - t * tr.sp * 1.7 + tr.ph) * tr.amp * h * 0.18;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                // brighten near the sweep — the scan is the light source
                const near = Math.max(0, 1 - Math.abs(sweepX - w * 0.5) / (w * 0.55));
                ctx.strokeStyle = rgba(tr.red ? pal.signal : pal.structure, (0.1 + near * 0.12) * dim);
                ctx.lineWidth = tr.red ? 1.2 : 1;
                ctx.stroke();
            }
            // vertical scan line with soft falloff
            const sg = ctx.createLinearGradient(sweepX - 40, 0, sweepX + 40, 0);
            sg.addColorStop(0, rgba(pal.bright, 0));
            sg.addColorStop(0.5, rgba(pal.bright, 0.07 * dim));
            sg.addColorStop(1, rgba(pal.bright, 0));
            ctx.fillStyle = sg;
            ctx.fillRect(sweepX - 40, 0, 80, h);
        };

        const drawOrbit = (t: number) => {
            const cx = w * 0.78;
            const cy = h * 0.52;
            const base = Math.min(w, h);
            for (const r of rings) {
                const rad = r.r * base;
                const rot = r.ph + t * r.speed;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(rot);
                ctx.scale(1, Math.abs(Math.sin(r.tilt)) * 0.6 + 0.25);
                ctx.strokeStyle = rgba(pal.structure, 0.1 * dim);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, rad, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
                // orbiting markers ride the same tilted plane
                for (let d = 0; d < r.dots; d++) {
                    const a = rot * 1.6 + (d * Math.PI * 2) / Math.max(1, r.dots);
                    const px = cx + Math.cos(a) * rad;
                    const py = cy + Math.sin(a) * rad * (Math.abs(Math.sin(r.tilt)) * 0.6 + 0.25);
                    const red = d === 0 && r === rings[rings.length - 1];
                    ctx.fillStyle = rgba(red ? pal.signal : pal.bright, 0.5 * dim);
                    ctx.beginPath();
                    ctx.arc(px, py, red ? 2.2 : 1.6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // core — the light source the orbits circle
            const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.1);
            cg.addColorStop(0, rgba(pal.structure, 0.1 * dim));
            cg.addColorStop(1, rgba(pal.structure, 0));
            ctx.fillStyle = cg;
            ctx.beginPath();
            ctx.arc(cx, cy, base * 0.1, 0, Math.PI * 2);
            ctx.fill();
        };

        const draw = (t: number) => {
            ctx.clearRect(0, 0, w, h);
            switch (variant) {
                case "network":
                    drawNetwork(t);
                    break;
                case "field":
                    drawField(t);
                    break;
                case "motes":
                    drawMotes(t);
                    break;
                case "signal":
                    drawSignal(t);
                    break;
                case "orbit":
                    drawOrbit(t);
                    break;
            }
        };

        /* ---------------- loop lifecycle ---------------- */

        if (reduced) {
            draw(1.2); // one calm static frame
        } else {
            // Paint one frame immediately so the layer never starts empty —
            // rAF is throttled while the tab is hidden, and a visible tab
            // should show atmosphere from the very first paint.
            draw(0);
            const start = performance.now();
            const loop = (now: number) => {
                raf = visible ? requestAnimationFrame(loop) : 0;
                draw((now - start) / 1000);
            };
            raf = requestAnimationFrame(loop);

            const io = new IntersectionObserver(
                (entries) => {
                    visible = entries[0]?.isIntersecting ?? true;
                    if (visible && !raf) raf = requestAnimationFrame(loop);
                },
                { rootMargin: "120px" }
            );
            io.observe(canvas);

            const onVis = () => {
                if (document.hidden) {
                    if (raf) {
                        cancelAnimationFrame(raf);
                        raf = 0;
                    }
                } else if (!raf && visible) {
                    raf = requestAnimationFrame(loop);
                }
            };
            document.addEventListener("visibilitychange", onVis);

            return () => {
                if (raf) cancelAnimationFrame(raf);
                ro.disconnect();
                io.disconnect();
                document.removeEventListener("visibilitychange", onVis);
            };
        }

        return () => {
            ro.disconnect();
        };
    }, [variant, theme]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`cn2-atmosphere pointer-events-none absolute inset-0 h-full w-full ${className}`}
        />
    );
}
