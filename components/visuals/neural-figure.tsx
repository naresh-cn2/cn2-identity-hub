"use client";

import { useMemo } from "react";
import SceneFrame, { type Engine, PAL, rgba } from "@/components/visuals/scene-frame";

/**
 * NeuralFigure — the "figure formed of light" rendered as code.
 *
 * A human bust (head, neck, shoulders, arms) sampled as a living point
 * cloud with nearest-neighbour neural links, thought bursts travelling
 * through the mesh, a slow biometric scan band sweeping the figure, and
 * a burning red ember held in the right hand with embers rising from it.
 * Pointer parallax gives the cloud a subtle 3D yaw.
 *
 * Used as the /about identity hero (replacing the static cosmos figure)
 * and, in compact form, on /credentials. No WebGL — Canvas2D only, one
 * rAF loop, IntersectionObserver + visibility pauses, reduced-motion
 * renders one static frame (all inherited from SceneFrame).
 */

interface P {
  x: number;
  y: number;
  z: number;
  ph: number;
}
interface Ember { x: number; y: number; vy: number; ph: number; s: number }

interface FigState {
  pts: P[];
  links: [number, number, number][]; // i, j, rest distance
  embers: Ember[];
  bursts: { i: number; t0: number }[];
  hand: { x: number; y: number };
  cx: number;
  cy: number;
  S: number;
  nextBurst: number;
  scanY: number;
}

/* half-width of the torso at height y (normalized bust space, y down) */
function torsoHalf(y: number): number {
  // shoulders peak just below the neck, taper toward the hips
  if (y < -0.3) return 0;
  const k = Math.min(1, (y + 0.3) / 0.22); // shoulder ramp
  const taper = 1 - 0.42 * Math.max(0, (y - 0.1) / 1.05);
  return (0.17 + 0.33 * k) * taper;
}

/* signed distance-ish membership test for the bust shapes */
function inBust(x: number, y: number): boolean {
  // head
  if ((x * x) / (0.24 * 0.24) + ((y + 0.62) * (y + 0.62)) / (0.26 * 0.26) <= 1) return true;
  // neck
  if (Math.abs(x) <= 0.085 && y >= -0.44 && y <= -0.26) return true;
  // torso with shoulders
  if (y >= -0.3 && y <= 1.02 && Math.abs(x) <= torsoHalf(y)) return true;
  // left arm (hangs down)
  if (segDist(x, y, -0.42, -0.16, -0.55, 0.52) <= 0.085) return true;
  // right arm (raised toward the ember)
  if (segDist(x, y, 0.42, -0.16, 0.6, 0.4) <= 0.085) return true;
  return false;
}

function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t * dx - px;
  const qy = ay + t * dy - py;
  return Math.sqrt(qx * qx + qy * qy);
}

function makeEngine(opts: { compact: boolean; anchor: number }): Engine<FigState> {
  return {
    init(w, h, rnd) {
      const small = w < 720;
      const target = opts.compact ? (small ? 260 : 420) : small ? 420 : 820;
      const pts: P[] = [];
      let guard = target * 40;
      while (pts.length < target && guard-- > 0) {
        const x = (rnd() * 2 - 1) * 0.95;
        const y = -0.95 + rnd() * 2.05;
        if (!inBust(x, y)) continue;
        pts.push({ x, y, z: (rnd() - 0.5) * 0.42, ph: rnd() * Math.PI * 2 });
      }
      // nearest-neighbour links via a coarse grid
      const links: [number, number, number][] = [];
      const cell = 0.11;
      const grid = new Map<string, number[]>();
      pts.forEach((p, i) => {
        const k = `${Math.round(p.x / cell)},${Math.round(p.y / cell)}`;
        const arr = grid.get(k);
        if (arr) arr.push(i);
        else grid.set(k, [i]);
      });
      const seen = new Set<number>();
      pts.forEach((p, i) => {
        const gx = Math.round(p.x / cell);
        const gy = Math.round(p.y / cell);
        let best = -1;
        let bestD = 0.12;
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const arr = grid.get(`${gx + ox},${gy + oy}`);
            if (!arr) continue;
            for (const j of arr) {
              if (j <= i) continue;
              const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
              if (d < bestD && !seen.has(i * 4096 + j)) {
                bestD = d;
                best = j;
              }
            }
          }
        }
        if (best >= 0) {
          seen.add(i * 4096 + best);
          links.push([i, best, bestD]);
        }
      });
      const embers: Ember[] = [];
      const emberN = small ? 14 : 24;
      for (let i = 0; i < emberN; i++) {
        embers.push({ x: 0, y: 0, vy: -(0.1 + rnd() * 0.18), ph: rnd() * Math.PI * 2, s: rnd() });
      }
      const S = opts.compact ? Math.min(h * 0.4, w * 0.3) : small ? Math.min(h * 0.34, w * 0.42) : Math.min(h * 0.4, w * 0.3);
      const cx = (small ? opts.anchor * 0.6 + 0.2 : opts.anchor) * w;
      return {
        pts,
        links,
        embers,
        bursts: [],
        hand: { x: 0.64, y: 0.36 },
        cx,
        cy: h * (opts.compact ? 0.56 : 0.52),
        S,
        nextBurst: 1.6,
        scanY: -0.2,
      };
    },
    draw(ctx, env, st) {
      const { w, t, mode, dim } = env;
      const pal = mode === "dark" ? PAL.dark : PAL.light;
      const tt = t / 1000;
      ctx.clearRect(0, 0, w, env.h);

      const yaw = Math.sin(tt * 0.16) * 0.38 + env.px * 0.55;
      const cyaw = Math.cos(yaw);
      const syaw = Math.sin(yaw);
      const breathe = 1 + Math.sin(tt * 0.5) * 0.006;
      const proj = (p: P) => {
        const x = p.x * cyaw + p.z * syaw;
        const z = -p.x * syaw + p.z * cyaw;
        const k = 1 / (1 + z * 0.22);
        return {
          sx: st.cx + x * st.S * k,
          sy: st.cy + p.y * st.S * k * breathe + env.py * 7,
          k,
          z,
        };
      };

      // ---- scan band position (slow biometric sweep) ----
      if (!env.staticFrame) st.scanY = -0.25 + ((tt * 0.11) % 1.5);
      const scanOn = st.scanY > -0.25 && st.scanY < 1.1;

      // ---- thought bursts: schedule + one-hop flashes ----
      if (!env.staticFrame) {
        st.nextBurst -= env.dt;
        if (st.nextBurst <= 0 && st.bursts.length < 3) {
          st.bursts.push({ i: Math.floor(Math.random() * st.pts.length), t0: tt });
          st.nextBurst = 2.2 + Math.random() * 2.4;
        }
        for (let i = st.bursts.length - 1; i >= 0; i--) if (tt - st.bursts[i].t0 > 2.4) st.bursts.splice(i, 1);
      }
      const burstGlow = new Map<number, number>();
      for (const b of st.bursts) {
        const age = tt - b.t0;
        const bx = st.pts[b.i];
        for (const [li, lj] of st.links) {
          const other = li === b.i ? lj : lj === b.i ? li : -1;
          if (other < 0) continue;
          const p = st.pts[other];
          const d = Math.hypot(p.x - bx.x, p.y - bx.y);
          const wave = Math.exp(-Math.pow(age - d * 0.9, 2) / 0.045) * Math.max(0, 1 - age / 2.2);
          if (wave > 0.01) burstGlow.set(other, Math.max(burstGlow.get(other) ?? 0, wave));
        }
      }

      // ---- neural links ----
      ctx.lineWidth = 1;
      for (const [li, lj, ld] of st.links) {
        const a = st.pts[li];
        const b = st.pts[lj];
        const pa = proj(a);
        const pb = proj(b);
        const depth = (pa.k + pb.k) / 2;
        const tw = 0.35 + 0.3 * Math.sin(tt * 0.9 + ld * 26);
        const bg = Math.max(burstGlow.get(li) ?? 0, burstGlow.get(lj) ?? 0);
        const al = (0.1 + 0.16 * tw + 0.5 * bg) * dim * (depth - 0.15);
        if (al <= 0.012) continue;
        ctx.strokeStyle = rgba(bg > 0.15 ? pal.bright : pal.ice, Math.min(0.65, al));
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      // ---- points ----
      for (let i = 0; i < st.pts.length; i++) {
        const p = st.pts[i];
        const q = proj(p);
        const tw = 0.5 + 0.5 * Math.sin(tt * 1.4 + p.ph);
        const distScan = scanOn ? Math.abs(p.y - st.scanY) : 9;
        const scan = distScan < 0.05 ? 1 - distScan / 0.05 : 0;
        const bg = burstGlow.get(i) ?? 0;
        const base = (0.16 + 0.26 * tw) * (q.k - 0.1);
        const al = Math.min(0.95, base + 0.55 * scan + 0.6 * bg) * dim;
        const r = (0.9 + 0.7 * tw + 1.6 * scan + 1.4 * bg) * q.k;
        ctx.fillStyle = rgba(scan > 0.3 || bg > 0.3 ? pal.bright : pal.ice, al);
        ctx.beginPath();
        ctx.arc(q.sx, q.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- scan line itself ----
      if (scanOn && !env.staticFrame) {
        const sy = st.cy + st.scanY * st.S;
        const halfW = st.S * 0.72;
        const g = ctx.createLinearGradient(st.cx - halfW, 0, st.cx + halfW, 0);
        g.addColorStop(0, rgba(pal.ice, 0));
        g.addColorStop(0.5, rgba(pal.ice, 0.34 * dim));
        g.addColorStop(1, rgba(pal.ice, 0));
        ctx.fillStyle = g;
        ctx.fillRect(st.cx - halfW, sy - 0.6, halfW * 2, 1.2);
      }

      // ---- ember in the right hand + rising embers ----
      const ex = st.cx + st.hand.x * st.S;
      const ey = st.cy + st.hand.y * st.S;
      const flick = 0.78 + 0.22 * Math.sin(tt * 6.3) * Math.sin(tt * 2.7 + 1.4);
      const er = 22 * flick;
      const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, er * 3.4);
      eg.addColorStop(0, rgba(pal.red, 0.85 * flick * dim));
      eg.addColorStop(0.25, rgba(pal.red, 0.3 * flick * dim));
      eg.addColorStop(1, rgba(pal.red, 0));
      ctx.fillStyle = eg;
      ctx.beginPath();
      ctx.arc(ex, ey, er * 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(pal.bright, 0.9 * dim);
      ctx.beginPath();
      ctx.arc(ex, ey, 2.4 * flick, 0, Math.PI * 2);
      ctx.fill();

      if (!env.staticFrame) {
        for (const emb of st.embers) {
          if (emb.y === 0 || emb.y < -0.9) {
            emb.x = (Math.random() - 0.5) * 0.05;
            emb.y = 0;
            emb.vy = -(0.1 + Math.random() * 0.2);
          }
          emb.y += emb.vy * env.dt;
        }
      }
      for (const emb of st.embers) {
        const life = Math.max(0, 1 + emb.y / 0.9);
        const sway = Math.sin(tt * 1.8 + emb.ph) * 0.035 * (1 - life * 0.4);
        const px2 = ex + (emb.x + sway) * st.S * 2.2;
        const py2 = ey + emb.y * st.S * 1.7;
        const al = life * 0.7 * dim * (0.5 + 0.5 * Math.sin(tt * 7 + emb.ph));
        if (al <= 0.01) continue;
        ctx.fillStyle = rgba(pal.red, al);
        ctx.beginPath();
        ctx.arc(px2, py2, 0.8 + emb.s * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

const ENGINE_SLIM = makeEngine({ compact: false, anchor: 0.66 });
const ENGINE_COMPACT = makeEngine({ compact: true, anchor: 0.72 });

export default function NeuralFigure({
  compact = false,
  seed = 7,
  className = "",
}: {
  compact?: boolean;
  seed?: number;
  className?: string;
}) {
  const engine = useMemo(() => (compact ? ENGINE_COMPACT : ENGINE_SLIM), [compact]);
  return <SceneFrame engine={engine} seed={seed} pointer className={className} />;
}
