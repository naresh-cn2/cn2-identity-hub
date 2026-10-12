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
 *              (certifications, articles, cv, testimonials)
 *   signal   — oscilloscope traces with a slow sweeping scan
 *              (lab, services, work-with-me)
 *   orbit    — tilted concentric orbits, armillary-style rotation
 *              (research, opportunities, contact, links)
 *   solids   — floating wireframe polyhedra over a receding 3D floor grid,
 *              pointer-parallax camera (identity portrait)
 *   city     — reserved: window twinkles, spire beacon and a glass-glint sweep
 *   cosmos   — full-bleed cosmic sky: three parallax star layers that lean
 *              with the pointer, shooting stars and red embers rising from the
 *              hand (about — the picture itself never moves)
 *
 * Rules honoured here:
 *  - Light originates from drawn sources only; alpha budget stays low so the
 *    content above always wins. Nothing glows from the screen edges.
 *  - One rAF loop per instance; paused when the tab hides or the layer scrolls
 *    out of view; a single static frame is drawn for prefers-reduced-motion.
 *  - Theme-aware: palettes switch with the dark/light token set.
 *  - aria-hidden + pointer-events:none — navigation and controls are untouched.
 */

type Variant = "network" | "field" | "motes" | "signal" | "orbit" | "solids" | "city" | "cosmos";
type Mode = "dark" | "light";
type RGB = [number, number, number];

/* ---------------- 3D meshes for the "solids" variant ----------------
   Unit-size wireframes (half-extent 1) shared by every instance so the
   composition stays deterministic across mounts. */
interface Mesh {
    verts: [number, number, number][];
    edges: [number, number][];
}

const MESHES: Record<string, Mesh> = {
    cube: {
        verts: [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        ],
        edges: [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
        ],
    },
    octa: {
        verts: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
        edges: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [4, 3], [3, 5], [5, 2]],
    },
    tetra: {
        verts: [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]],
        edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]],
    },
};

const FLOOR_Y = 2.2; // world height of the receding ground plane
const mod = (v: number, m: number) => ((v % m) + m) % m;

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
    solids: 515020,
    city: 7712026,
    cosmos: 99182733,
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

        interface Solid {
            mesh: Mesh;
            nx: number; ny: number; // screen-space anchor, -1..1 from centre
            z: number;              // depth — drives scale, parallax, fade
            s: number;              // world size
            ry: number; ph: number; // spin speed / phase
            tilt: number; bob: number;
            red: boolean;
        }

        interface Twinkle { x: number; y: number; r: number; ph: number; sp: number; base: number; warm: boolean }

        interface CosStar { x: number; y: number; r: number; layer: number; ph: number; sp: number; warm: boolean }
        interface Ember { x: number; y: number; r: number; ph: number; sp: number; rise: number }
        interface Streak { t: number; gap: number; x: number; y: number; vx: number; vy: number }

        const nodes: NetNode[] = [];
        const edges: NetEdge[] = [];
        const pulses: Pulse[] = [];
        const motes: Mote[] = [];
        const traces: Trace[] = [];
        let rings: OrbitRing[] = [];
        const solids: Solid[] = [];
        const twinkles: Twinkle[] = [];
        const cosStars: CosStar[] = [];
        const embers: Ember[] = [];
        const streak: Streak = { t: 8.5, gap: 2, x: 0, y: 0, vx: 0, vy: 0 };

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

        /* eased pointer parallax — the camera drifts around the scene */
        let tYaw = 0;
        let tPitch = 0;
        let pYaw = 0;
        let pPitch = 0;
        const onPointer = (e: PointerEvent) => {
            tYaw = (e.clientX / Math.max(1, w) - 0.5) * -0.16;
            tPitch = (e.clientY / Math.max(1, h) - 0.5) * -0.1;
        };

        /* cosmos: eased sky-lean with the pointer — the picture itself never moves */
        let pParX = 0;
        let pParY = 0;

        if (variant === "solids") {
            // Anchors are screen-space fractions so the composition holds on
            // any viewport; depth then re-seats scale, parallax and fade.
            const layout: Array<[string, number, number, number, number, boolean]> = small
                ? [
                      ["octa", -0.5, -0.5, 4.6, 0.44, true],
                      ["cube", 0.55, -0.32, 5.4, 0.5, false],
                      ["tetra", -0.42, 0.55, 6.4, 0.52, false],
                  ]
                : [
                      ["cube", -0.8, -0.48, 4.2, 0.58, false],
                      ["octa", 0.26, -0.62, 4.9, 0.42, true],
                      ["tetra", 0.84, 0.4, 5.6, 0.62, false],
                      ["octa", -0.85, 0.48, 6.5, 0.5, false],
                      ["cube", 0.04, -0.86, 7.6, 0.8, false],
                  ];
            for (const [m, nx, ny, z, s, red] of layout) {
                solids.push({
                    mesh: MESHES[m],
                    nx,
                    ny,
                    z,
                    s,
                    ry: (0.12 + rand() * 0.2) * (rand() < 0.5 ? -1 : 1),
                    ph: rand() * Math.PI * 2,
                    tilt: 0.3 + rand() * 0.5,
                    bob: 0.03 + rand() * 0.05,
                    red,
                });
            }
        }

        if (variant === "city") {
            // Lit-window glints over the skyline band: below the crest,
            // denser toward the reflective floor of the photograph.
            const count = small ? 26 : 54;
            for (let i = 0; i < count; i++) {
                twinkles.push({
                    x: rand(),
                    y: 0.2 + Math.pow(rand(), 0.8) * 0.72,
                    r: 0.6 + rand() * 1.1,
                    ph: rand() * Math.PI * 2,
                    sp: 0.5 + rand() * 1.5,
                    base: 0.1 + rand() * 0.26,
                    warm: rand() < 0.3,
                });
            }
        }

        if (variant === "cosmos") {
            // Three depth layers of stars across an oversized field (1.2x) so
            // pointer parallax and drift never expose an empty edge.
            const count = small ? 95 : 180;
            for (let i = 0; i < count; i++) {
                const layer = rand();
                cosStars.push({
                    x: rand() * 1.2 - 0.1,
                    y: rand() * 1.2 - 0.1,
                    r: 0.4 + layer * 1.1 + rand() * 0.5,
                    layer,
                    ph: rand() * Math.PI * 2,
                    sp: 0.4 + rand() * 1.4,
                    warm: rand() < 0.06,
                });
            }
            // red embers lifting off the cupped hand (hand sits at ~0.60-0.72
            // of the picture's height — the canvas matches the image exactly)
            const ecount = small ? 8 : 14;
            for (let i = 0; i < ecount; i++) {
                embers.push({
                    x: 0.4 + rand() * 0.16,
                    y: 0.62 + rand() * 0.1,
                    r: 0.7 + rand() * 1.3,
                    ph: rand() * Math.PI * 2,
                    sp: 0.5 + rand() * 0.9,
                    rise: 0.03 + rand() * 0.05,
                });
            }
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

        const drawSolids = (t: number) => {
            const FOCAL = Math.max(w, h) * 0.9;
            const cx = w * 0.5;
            const cy = h * 0.5;

            // ease the camera toward the pointer (no-op under reduced motion)
            pYaw += (tYaw - pYaw) * 0.05;
            pPitch += (tPitch - pPitch) * 0.05;

            const project = (x: number, y: number, z: number): [number, number, number] => {
                const cY = Math.cos(pYaw), sY = Math.sin(pYaw);
                const X = x * cY + z * sY;
                let Z = -x * sY + z * cY;
                const cP = Math.cos(pPitch), sP = Math.sin(pPitch);
                const Y = y * cP - Z * sP;
                Z = y * sP + Z * cP;
                const k = FOCAL / Math.max(1.2, Z + 1.8);
                return [cx + X * k, cy + Y * k, Z];
            };

            /* ---- floor plane receding in true perspective, wrapped in depth ---- */
            const drift = reduced ? 0 : (t * 0.55) % 1.54;
            ctx.lineWidth = 1;
            for (let i = 0; i < 11; i++) {
                const z = 1.6 + mod(i * 1.54 - drift, 15.4);
                const a = (0.07 * (1 - (z - 1.6) / 15.4) + 0.01) * dim;
                ctx.strokeStyle = rgba(pal.deep, a);
                const [x1, y1] = project(-7, FLOOR_Y, z);
                const [x2, y2] = project(7, FLOOR_Y, z);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            for (let c = 0; c <= 10; c++) {
                const x = -7 + c * 1.4;
                ctx.strokeStyle = rgba(pal.deep, 0.05 * dim);
                const [x1, y1] = project(x, FLOOR_Y, 1.7);
                const [x2, y2] = project(x, FLOOR_Y, 16.9);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            /* ---- floating wireframe solids, depth-sorted near to far ---- */
            for (const s of [...solids].sort((a, b) => b.z - a.z)) {
                // world anchor from the screen-space fraction at this depth
                const halfW = ((s.z + 1.8) * (w / 2)) / FOCAL;
                const halfH = ((s.z + 1.8) * (h / 2)) / FOCAL;
                const wx = s.nx * halfW;
                const wy = s.ny * halfH + (reduced ? 0 : Math.sin(t * 0.42 + s.ph) * s.bob * halfH);

                const spin = reduced ? 1.4 : t * s.ry + s.ph;
                const tilt = s.tilt + (reduced ? 0 : Math.sin(t * 0.17 + s.ph) * 0.2);
                const cS = Math.cos(spin), snS = Math.sin(spin);
                const cT = Math.cos(tilt), snT = Math.sin(tilt);

                const pts: [number, number, number][] = [];
                for (const v of s.mesh.verts) {
                    const x = v[0] * s.s, y = v[1] * s.s, z = v[2] * s.s;
                    const y1 = y * cT - z * snT;
                    const z1 = y * snT + z * cT;
                    const x2 = x * cS + z1 * snS;
                    const z2 = -x * snS + z1 * cS;
                    pts.push(project(wx + x2, wy + y1, s.z + z2));
                }

                let zmin = Infinity;
                for (const p of pts) if (p[2] < zmin) zmin = p[2];
                const fade = Math.max(0.3, Math.min(1, 1 - (zmin - 2.6) / 10));

                ctx.lineWidth = s.red ? 1.3 : 1;
                ctx.strokeStyle = rgba(s.red ? pal.signal : pal.structure, (s.red ? 0.36 : 0.15) * fade * dim);
                for (const [a, b] of s.mesh.edges) {
                    ctx.beginPath();
                    ctx.moveTo(pts[a][0], pts[a][1]);
                    ctx.lineTo(pts[b][0], pts[b][1]);
                    ctx.stroke();
                }
                // vertices as faint nodes — the wireframe's light points
                ctx.fillStyle = rgba(s.red ? pal.signal : pal.bright, (s.red ? 0.45 : 0.3) * fade * dim);
                for (const p of pts) {
                    ctx.beginPath();
                    ctx.arc(p[0], p[1], s.red ? 1.7 : 1.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const drawCity = (t: number) => {
            // lit windows breathing across the skyline band
            for (const tw of twinkles) {
                const pulse = 0.35 + 0.65 * Math.sin(t * tw.sp + tw.ph) ** 2;
                ctx.fillStyle = rgba(tw.warm ? pal.bright : pal.structure, tw.base * pulse * dim);
                ctx.beginPath();
                ctx.arc(tw.x * w, tw.y * h, tw.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // spire beacon — a quick red blink on a slow cycle, aircraft-light style
            const bph = (t % 2.6) / 2.6;
            const blink = bph < 0.12 ? Math.sin((bph / 0.12) * Math.PI) ** 2 : 0;
            if (blink > 0.001) {
                const bx = w * 0.515;
                const by = h * 0.13;
                const g = ctx.createRadialGradient(bx, by, 0, bx, by, 14);
                g.addColorStop(0, rgba(pal.signal, 0.5 * blink * dim));
                g.addColorStop(1, rgba(pal.signal, 0));
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(bx, by, 14, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = rgba(pal.signal, 0.85 * blink * dim);
                ctx.beginPath();
                ctx.arc(bx, by, 1.9, 0, Math.PI * 2);
                ctx.fill();
            }

            // slow glint raking across the glass panes every ~25s
            const sweep = ((t * 0.06) % 1.5) - 0.25;
            const sx = sweep * w * 1.2;
            ctx.save();
            ctx.translate(sx, 0);
            ctx.rotate(0.1); // light rakes slightly diagonal
            const sg = ctx.createLinearGradient(-46, 0, 46, 0);
            sg.addColorStop(0, rgba(pal.bright, 0));
            sg.addColorStop(0.5, rgba(pal.bright, 0.055 * dim));
            sg.addColorStop(1, rgba(pal.bright, 0));
            ctx.fillStyle = sg;
            ctx.fillRect(-46, -h, 92, h * 3);
            ctx.restore();
        };

        /* The cosmic sky is self-lit: its own palette, full opacity in both
           themes — the photograph below carries the scene, the canvas only
           adds what moves. The picture itself never transforms. */
        const COS_STAR: RGB = [205, 222, 255];
        const COS_WARM: RGB = [255, 234, 205];
        const COS_RED: RGB = [232, 66, 48];

        const drawCosmos = (t: number) => {
            // eased sky-lean with the pointer (static frame under reduced motion)
            pParX += (tYaw - pParX) * 0.035;
            pParY += (tPitch - pParY) * 0.035;

            // drifting, twinkling star layers — deeper layers lean less
            for (const s of cosStars) {
                const drift = reduced ? 0 : Math.sin(t * 0.05 + s.ph) * 0.008 + t * 0.0012;
                const px = mod(s.x + drift, 1.2) - 0.1;
                const depth = 0.25 + s.layer * 0.75;
                const x = px * w + pParX * w * depth * 0.2;
                const y = s.y * h + pParY * h * depth * 0.14;
                const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
                ctx.fillStyle = rgba(s.warm ? COS_WARM : COS_STAR, (0.12 + s.layer * 0.4) * tw);
                ctx.beginPath();
                ctx.arc(x, y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // a shooting star crosses the sky every ~7-11s
            if (!reduced) {
                streak.t += 1 / 60;
                if (streak.t > 7 + streak.gap) {
                    streak.t = 0;
                    streak.gap = Math.random() * 4;
                    streak.x = 0.1 + Math.random() * 0.8;
                    streak.y = -0.04 + Math.random() * 0.3;
                    streak.vx = (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.25);
                    streak.vy = 0.24 + Math.random() * 0.16;
                }
                const p = streak.t / 1.5;
                if (p >= 0 && p <= 1) {
                    const hx = (streak.x + streak.vx * p) * w;
                    const hy = (streak.y + streak.vy * p) * h;
                    const tx = (streak.x + streak.vx * Math.max(0, p - 0.1)) * w;
                    const ty = (streak.y + streak.vy * Math.max(0, p - 0.1)) * h;
                    const a = Math.sin(p * Math.PI) * 0.7;
                    const g = ctx.createLinearGradient(tx, ty, hx, hy);
                    g.addColorStop(0, rgba(COS_STAR, 0));
                    g.addColorStop(1, rgba(COS_STAR, a));
                    ctx.strokeStyle = g;
                    ctx.lineWidth = 1.3;
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(hx, hy);
                    ctx.stroke();
                    ctx.fillStyle = rgba(COS_STAR, a);
                    ctx.beginPath();
                    ctx.arc(hx, hy, 1.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // red embers lifting off the cupped hand, wobbling as they rise
            for (const e of embers) {
                if (!reduced) e.y -= e.rise / 60;
                if (e.y < 0.56) {
                    e.y = 0.7 + Math.random() * 0.04;
                    e.x = 0.4 + Math.random() * 0.16;
                }
                const wob = Math.sin(t * e.sp * 2 + e.ph) * 0.01;
                const lift = Math.max(0, Math.min(1, (0.74 - e.y) / 0.14));
                const a = 0.3 * lift * (0.5 + 0.5 * Math.sin(t * e.sp + e.ph));
                ctx.fillStyle = rgba(COS_RED, a);
                ctx.beginPath();
                ctx.arc((e.x + wob) * w, e.y * h, e.r, 0, Math.PI * 2);
                ctx.fill();
            }
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
                case "solids":
                    drawSolids(t);
                    break;
                case "city":
                    drawCity(t);
                    break;
                case "cosmos":
                    drawCosmos(t);
                    break;
            }
        };

        /* ---------------- loop lifecycle ---------------- */

        if (reduced) {
            draw(1.2); // one calm static frame
        } else {
            // The camera only drifts when there is a pointer to follow.
            if (variant === "solids" || variant === "cosmos")
                window.addEventListener("pointermove", onPointer, { passive: true });

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
                window.removeEventListener("pointermove", onPointer);
            };
        }

        return () => {
            ro.disconnect();
            window.removeEventListener("pointermove", onPointer);
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
