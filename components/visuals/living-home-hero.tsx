"use client";

import { useMemo } from "react";
import SceneFrame, { type Engine, PAL, rgba } from "@/components/visuals/scene-frame";

/**
 * LivingHomeHero — the interactive "living singularity" stack over the
 * baked portal banner on the entry page.
 *
 * Three coordinated Canvas2D layers, all anchored in image-space and
 * mapped to the container through the same cover/contain fit() as
 * .cn2-hero-bg and CinematicLayers, so every anchor tracks the artwork
 * at any viewport (landscape cover / portrait contain, never cropped):
 *
 *   Layer A — Portal accretion: 80 photon particles on tilted elliptical
 *             orbits around the ring (inner orbits faster), depth-dimmed
 *             on the far side, plus irregular electric arc discharges
 *             bridging points across the ring circumference.
 *   Layer B — Wet-floor ripples: pointer movement (and a slow ambient
 *             timer) spawn chromatic horizontal ripples across the red /
 *             ice floor reflection band — warm and cool passes offset a
 *             couple of pixels for the chromatic edge.
 *   Layer C — Quant telemetry: the active top strip (WS feed + tick-cadence
 *             ping dot, tick-driven latency p99, parser/persistence stack,
 *             session uptime), damped cursor coordinates + crosshair with
 *             edge rulers, and the traveler reticle — rotating dashed ring
 *             with SNR/theta/D markers, dotted coordinate axes running to
 *             the margins, and corner brackets carrying drifting [X, Y]
 *             engineering coordinates and the CN2_OPERATOR ident line.
 *
 * Plus a sub-floor perspective grid (rails converging on a vanishing point
 * at the artwork's floor line, quadratic-spaced depth rows fading into the
 * horizon, intersections illuminating beneath the damped cursor).
 *
 * The home hero is dark-only by design, so the engine uses the dark
 * palette unconditionally. All micro-telemetry (strip, reticle, grid,
 * brackets) hides below 720px (the portrait strip is too small to carry
 * it); accretion + ripples stay. Everything inherits the SceneFrame
 * contract: DPR<=2, IntersectionObserver + visibility pause,
 * reduced-motion = one static frame, pointer-events none, aria-hidden.
 * No DOM text is added — the gate's markup assertions can never see
 * this layer.
 */

const IMG_W = 2048;
const IMG_H = 768;
const IMG_AR = IMG_W / IMG_H;
const COVER_MIN_A = 29 / 25; // mirrors the .cn2-hero-bg media query

// measured image-space anchors (see AUDIT.md §12)
const A_PORTAL_X = 0.6;
const A_PORTAL_Y = 0.47;
const RING_HALF_X = (0.68 - 0.515) / 2; // 0.0825
const RING_HALF_Y = (0.71 - 0.23) / 2; // 0.24
const A_FLOOR = 0.661;
const A_REFL_BOT = 0.78;
const A_TGT_Y = 0.505; // traveler center, just below the ring center

interface Box { x: number; y: number; w: number; h: number }

/** Same three-branch math as the CSS fit (contain width-bound / cover). */
function fit(w: number, h: number): Box {
  const ar = w / h;
  if (ar <= COVER_MIN_A) {
    const iw = w;
    const ih = w / IMG_AR;
    return { x: 0, y: (h - ih) * 0.5, w: iw, h: ih };
  }
  const s = Math.max(w / IMG_W, h / IMG_H);
  const iw = IMG_W * s;
  const ih = IMG_H * s;
  return { x: (w - iw) * 0.45, y: (h - ih) * 0.42, w: iw, h: ih };
}

interface Photon { a: number; k: number; spd: number; red: boolean; sz: number; wob: number }
interface Ripple { x: number; y: number; t0: number; s: number }
interface Arc { a1: number; a2: number; t0: number; life: number; red: boolean }

interface HomeState {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  floorY: number;
  reflBot: number;
  photons: Photon[];
  arcs: Arc[];
  nextArc: number;
  nextAmb: number;
  ripples: Ripple[];
  lastRip: number;
  pxPrev: number;
  pyPrev: number;
  idle: number;
  dampX: number;
  dampY: number;
  snr: number;
  snrTarget: number;
  // active telemetry strip (tick-simulated feed/latency, session uptime)
  uptime: number;
  nextUptime: number;
  lat: number;
  latTarget: number;
  nextLat: number;
  tickEnv: number;
  nextTick: number;
  // drifting engineering coordinate markers on the reticle brackets
  coordX: number;
  coordY: number;
  coordTX: number;
  coordTY: number;
  nextCoord: number;
  // cached vanishing-point gradient for the sub-floor grid
  gridGrad: CanvasGradient | null;
  gridGradKey: string;
}

function ringPoint(cx: number, cy: number, rx: number, ry: number, ang: number, tilt: number) {
  const dx = Math.cos(ang) * rx;
  const dy = Math.sin(ang) * ry;
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  return { x: cx + dx * c - dy * s, y: cy + dx * s + dy * c };
}

function makeEngine(): Engine<HomeState> {
  return {
    init(w, h, rnd) {
      const box = fit(w, h);
      const cx = box.x + A_PORTAL_X * box.w;
      const cy = box.y + A_PORTAL_Y * box.h;
      const rx = RING_HALF_X * box.w;
      const ry = RING_HALF_Y * box.h;
      const small = w < 720;
      const n = small ? 44 : 80;
      const photons: Photon[] = [];
      for (let i = 0; i < n; i++) {
        const k = 0.82 + rnd() * 0.55;
        photons.push({
          a: rnd() * Math.PI * 2,
          k,
          spd: (0.3 + rnd() * 0.55) / Math.sqrt(k), // inner orbits faster (Kepler-ish)
          red: rnd() < 0.28,
          sz: 0.7 + rnd() * 1.5,
          wob: rnd() * Math.PI * 2,
        });
      }
      return {
        cx,
        cy,
        rx,
        ry,
        floorY: box.y + A_FLOOR * box.h,
        reflBot: Math.min(h, box.y + A_REFL_BOT * box.h),
        photons,
        arcs: [],
        nextArc: 1.4 + rnd() * 2.4,
        nextAmb: 1.8 + rnd() * 2,
        ripples: [],
        lastRip: -1,
        pxPrev: 0,
        pyPrev: 0,
        idle: 99,
        dampX: w * 0.7,
        dampY: h * 0.62,
        snr: 97.5,
        snrTarget: 97.5,
        uptime: 4 * 3600 + 18 * 60 + 22, // SESSION UPTIME starts at 04:18:22
        nextUptime: 1,
        lat: 8.4,
        latTarget: 8.4,
        nextLat: 0.6,
        tickEnv: 0,
        nextTick: 0.25 + rnd() * 0.6,
        coordX: 104.22,
        coordY: 890.11,
        coordTX: 104.22,
        coordTY: 890.11,
        nextCoord: 2,
        gridGrad: null,
        gridGradKey: "",
      };
    },
    draw(ctx, env, st) {
      const { w, h, t, dt, staticFrame } = env;
      const pal = PAL.dark; // home hero is dark-only by design
      const tt = t / 1000;
      ctx.clearRect(0, 0, w, h);

      const tilt = 0.13 * Math.sin(tt * 0.05);

      // ================= Layer A — accretion photons =================
      if (!staticFrame) {
        for (const p of st.photons) p.a += p.spd * dt;
      }
      ctx.lineWidth = 1;
      for (const p of st.photons) {
        const front = Math.sin(p.a) > 0;
        const pos = ringPoint(st.cx, st.cy, st.rx * p.k, st.ry * p.k, p.a, tilt);
        const tw = 0.6 + 0.4 * Math.sin(tt * 2.6 + p.wob);
        const al = (front ? 0.5 : 0.24) * tw;
        const c = p.red ? pal.red : pal.ice;
        // motion streak
        const prev = ringPoint(st.cx, st.cy, st.rx * p.k, st.ry * p.k, p.a - p.spd * 0.16, tilt);
        ctx.strokeStyle = rgba(c, al * 0.45);
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        // head
        ctx.fillStyle = rgba(c, Math.min(0.7, al + 0.1));
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.sz * (front ? 1.15 : 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- electric arc discharges across the ring ----
      if (!staticFrame) {
        st.nextArc -= dt;
        if (st.nextArc <= 0 && st.arcs.length < 2) {
          const a1 = Math.random() * Math.PI * 2;
          const span = (0.5 + Math.random() * 1.5) * (Math.random() < 0.5 ? -1 : 1);
          st.arcs.push({
            a1,
            a2: a1 + span,
            t0: tt,
            life: 0.26 + Math.random() * 0.22,
            red: Math.random() < 0.3,
          });
          st.nextArc = 1.6 + Math.random() * 3.2;
        }
        for (let i = st.arcs.length - 1; i >= 0; i--) if (tt - st.arcs[i].t0 > st.arcs[i].life) st.arcs.splice(i, 1);
      }
      for (const arc of st.arcs) {
        const age = tt - arc.t0;
        if (age < 0 || age > arc.life) continue;
        const envl = Math.min(1, age / 0.03) * Math.exp(-age / (arc.life * 0.4));
        const p1 = ringPoint(st.cx, st.cy, st.rx, st.ry, arc.a1, tilt);
        const p2 = ringPoint(st.cx, st.cy, st.rx, st.ry, arc.a2, tilt);
        const segs = 6;
        const pts: { x: number; y: number }[] = [{ x: p1.x, y: p1.y }];
        for (let i = 1; i < segs; i++) {
          const u = i / segs;
          const jx = p1.x + (p2.x - p1.x) * u;
          const jy = p1.y + (p2.y - p1.y) * u;
          const nx = p2.y - p1.y;
          const ny = -(p2.x - p1.x);
          const nl = Math.hypot(nx, ny) || 1;
          const jit = (Math.random() - 0.5) * 14 * Math.sin(u * Math.PI);
          pts.push({ x: jx + (nx / nl) * jit, y: jy + (ny / nl) * jit });
        }
        pts.push({ x: p2.x, y: p2.y });
        const c = arc.red ? pal.red : pal.bright;
        ctx.lineJoin = "round";
        // glow pass
        ctx.strokeStyle = rgba(c, 0.3 * envl);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
        // bright core
        ctx.strokeStyle = rgba(c, 0.85 * envl);
        ctx.lineWidth = 1.1;
        ctx.stroke();
        // endpoint sparks
        ctx.fillStyle = rgba(c, 0.8 * envl);
        for (const p of [p1, p2]) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2 * envl + 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.lineWidth = 1;
      }

      // ---- pointer movement, idle fade, telemetry sim (shared by B and C) ----
      const pdx = env.px - st.pxPrev;
      const pdy = env.py - st.pyPrev;
      st.pxPrev = env.px;
      st.pyPrev = env.py;
      const moved = Math.abs(pdx) + Math.abs(pdy);
      if (!staticFrame) {
        if (moved > 0.0012) st.idle = 0;
        else st.idle += dt;
        // market-tick simulation: variable cadence pulse + latency wander
        st.nextTick -= dt;
        if (st.nextTick <= 0) {
          st.tickEnv = 1;
          st.nextTick = 0.18 + Math.random() * 0.75;
        }
        st.tickEnv = Math.max(0, st.tickEnv - dt * 4.2);
        st.nextLat -= dt;
        if (st.nextLat <= 0) {
          st.latTarget = Math.random() < 0.1 ? 10.8 + Math.random() * 2.2 : 7.6 + Math.random() * 1.9;
          st.nextLat = 0.5 + Math.random() * 0.9;
        }
        st.lat += (st.latTarget - st.lat) * Math.min(1, dt * 3);
        st.nextUptime -= dt;
        if (st.nextUptime <= 0) {
          st.uptime += 1;
          st.nextUptime = 1;
        }
        // engineering coordinate markers wander like a tracking solution
        st.nextCoord -= dt;
        if (st.nextCoord <= 0) {
          st.coordTX = 60 + Math.random() * 880;
          st.coordTY = 300 + Math.random() * 640;
          st.nextCoord = 1.8 + Math.random() * 1.6;
        }
        st.coordX += (st.coordTX - st.coordX) * Math.min(1, dt * 0.8);
        st.coordY += (st.coordTY - st.coordY) * Math.min(1, dt * 0.8);
      }
      const fade = Math.max(0, Math.min(1, (3 - st.idle) / 1.5));

      // ================= Sub-floor perspective grid (ground layer) ==========
      // Rails converge on a vanishing point at the artwork's floor line;
      // transverse rows use quadratic spacing (denser toward the horizon) and
      // a shared vertical gradient so the grid dissolves into the horizon.
      // Intersections illuminate softly beneath the damped cursor.
      if (w >= 720) {
        const vpX = st.cx;
        const vpY = st.floorY;
        const yB = h;
        if (yB - vpY > 40) {
          const depth = yB - vpY;
          const key = `${Math.round(vpY)}|${Math.round(yB)}|${Math.round(w)}`;
          if (st.gridGradKey !== key) {
            const g = ctx.createLinearGradient(0, vpY, 0, yB);
            g.addColorStop(0, rgba(pal.ice, 0));
            g.addColorStop(0.3, rgba(pal.ice, 0.016));
            g.addColorStop(1, rgba(pal.ice, 0.05));
            st.gridGrad = g;
            st.gridGradKey = key;
          }
          const cols = 17;
          const railXs: number[] = [];
          ctx.lineWidth = 1;
          ctx.strokeStyle = st.gridGrad ?? rgba(pal.ice, 0.03);
          for (let i = 0; i < cols; i++) {
            const xb = -0.25 * w + (i / (cols - 1)) * 1.5 * w;
            railXs.push(xb);
            ctx.beginPath();
            ctx.moveTo(vpX, vpY);
            ctx.lineTo(xb, yB);
            ctx.stroke();
          }
          const rows = 11;
          const rowYs: number[] = [];
          for (let j = 1; j <= rows; j++) {
            const k = j / rows;
            const gy = vpY + depth * k * k;
            rowYs.push(gy);
            ctx.strokeStyle = rgba(pal.ice, 0.05 * k);
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(w, gy);
            ctx.stroke();
          }
          if (fade > 0.01) {
            for (let j = 0; j < rows; j++) {
              const k = (j + 1) / rows;
              const iy = rowYs[j];
              const tproj = k * k;
              for (let i = 0; i < cols; i++) {
                const ix = vpX + (railXs[i] - vpX) * tproj;
                const d = Math.hypot(ix - st.dampX, iy - st.dampY);
                if (d > 150) continue;
                const glow = Math.exp(-d / 55) * fade;
                if (glow < 0.02) continue;
                ctx.fillStyle = rgba(pal.ice, 0.45 * glow);
                ctx.beginPath();
                ctx.arc(ix, iy, 1.2 + glow, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // ================= Layer B — wet-floor ripples =================
      if (!staticFrame) {
        if (moved > 0.0012 && st.ripples.length < 9 && tt - st.lastRip > 0.06) {
          const rx2 = ((env.px + 1) / 2) * w;
          const ryRaw = ((env.py + 1) / 2) * h;
          st.ripples.push({
            x: rx2,
            y: Math.max(st.floorY + 4, Math.min(ryRaw, st.reflBot)),
            t0: tt,
            s: 0.7 + Math.random() * 0.6,
          });
          st.lastRip = tt;
        }
        st.nextAmb -= dt;
        if (st.nextAmb <= 0 && st.ripples.length < 7) {
          st.ripples.push({
            x: w * (0.12 + Math.random() * 0.76),
            y: st.floorY + Math.random() * (st.reflBot - st.floorY),
            t0: tt,
            s: 0.55 + Math.random() * 0.5,
          });
          st.nextAmb = 2.2 + Math.random() * 2.4;
        }
        for (let i = st.ripples.length - 1; i >= 0; i--) if (tt - st.ripples[i].t0 > 2.6) st.ripples.splice(i, 1);
      }
      for (const rp of st.ripples) {
        const age = tt - rp.t0;
        if (age < 0 || age > 2.6) continue;
        const fade = 1 - age / 2.6;
        const R = (14 + age * 170) * rp.s;
        for (let row = -1; row <= 1; row++) {
          const rowY = rp.y + row * (3 + age * 3.5);
          const rowA = 0.3 * fade * (1 - Math.abs(row) * 0.35);
          // chromatic passes: warm right, cool left, bright centre
          for (const pass of [
            { c: pal.red, off: 2.2, m: 0.75 },
            { c: pal.ice, off: -2.2, m: 0.75 },
            { c: pal.bright, off: 0, m: 0.55 },
          ]) {
            ctx.strokeStyle = rgba(pass.c, rowA * pass.m);
            ctx.beginPath();
            let first = true;
            for (let u = -R; u <= R; u += 7) {
              const q = u / R;
              const fall = 1 - q * q;
              if (fall <= 0.02) continue;
              const yy = rowY + Math.sin(u * 0.055 + age * 6 + row * 1.7) * 2.6 * fade;
              if (first) {
                ctx.moveTo(rp.x + u + pass.off, yy);
                first = false;
              } else ctx.lineTo(rp.x + u + pass.off, yy);
            }
            ctx.stroke();
          }
        }
      }

      // ================= Layer C — telemetry HUD =================
      // damped cursor tracker
      const tx = ((env.px + 1) / 2) * w;
      const ty = ((env.py + 1) / 2) * h;
      if (!staticFrame) {
        const kf = Math.min(1, dt * 7);
        st.dampX += (tx - st.dampX) * kf;
        st.dampY += (ty - st.dampY) * kf;
        st.snrTarget = 96.2 + Math.random() * 3.4;
        st.snr += (st.snrTarget - st.snr) * Math.min(1, dt * 1.2);
      }

      const mono = (size: number) =>
        `${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`;

      // targeting ring (desktop): dashed rotating ring + telemetry markers
      if (w >= 720) {
        const tgtCy = st.cy + (A_TGT_Y - A_PORTAL_Y) * (st.ry / RING_HALF_Y);
        const tr = Math.min(st.rx, st.ry) * 0.5;
        ctx.save();
        ctx.translate(st.cx, tgtCy);
        if (!staticFrame) ctx.rotate(tt * 0.25);
        ctx.setLineDash([4, 7]);
        ctx.strokeStyle = rgba(pal.ice, 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, tr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        // cardinal ticks
        ctx.strokeStyle = rgba(pal.bright, 0.5);
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * (tr - 4), Math.sin(a) * (tr - 4));
          ctx.lineTo(Math.cos(a) * (tr + 4), Math.sin(a) * (tr + 4));
          ctx.stroke();
        }
        // centre dot
        ctx.fillStyle = rgba(pal.red, 0.55);
        ctx.beginPath();
        ctx.arc(0, 0, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // telemetry labels at fixed bearings (counter the ring rotation)
        const theta = ((tt * 7.5) % 360).toFixed(0).padStart(3, "0");
        const labels = [
          { a: -Math.PI / 2, txt: `SNR ${st.snr.toFixed(1)}%` },
          { a: Math.PI / 6, txt: `θ ${theta}°` },
          { a: (5 * Math.PI) / 6, txt: `Δ ${(0.38 + 0.12 * Math.sin(tt * 0.45)).toFixed(2)}` },
        ];
        ctx.font = mono(9);
        ctx.textBaseline = "middle";
        for (const lb of labels) {
          const lx = st.cx + Math.cos(lb.a) * (tr + 6);
          const ly = tgtCy + Math.sin(lb.a) * (tr + 6);
          const ex = st.cx + Math.cos(lb.a) * (tr + 12);
          const ey = tgtCy + Math.sin(lb.a) * (tr + 12);
          ctx.strokeStyle = rgba(pal.ice, 0.35);
          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.fillStyle = rgba(pal.ice, 0.45);
          const right = Math.cos(lb.a) > -0.01;
          ctx.textAlign = right ? "left" : "right";
          ctx.fillText(lb.txt, ex + (right ? 4 : -4), ey);
        }
        ctx.textAlign = "left";

        // architectural coordinate axes: thin dotted lines from the reticle
        // out toward the margins (kept at ~12% so copy always wins)
        ctx.setLineDash([1, 7]);
        ctx.strokeStyle = rgba(pal.ice, 0.12);
        ctx.beginPath();
        ctx.moveTo(16, tgtCy);
        ctx.lineTo(st.cx - tr - 26, tgtCy);
        ctx.moveTo(st.cx + tr + 26, tgtCy);
        ctx.lineTo(w - 16, tgtCy);
        ctx.moveTo(st.cx, 108);
        ctx.lineTo(st.cx, tgtCy - tr - 26);
        ctx.moveTo(st.cx, tgtCy + tr + 26);
        ctx.lineTo(st.cx, h - 30);
        ctx.stroke();
        ctx.setLineDash([]);

        // corner brackets framing the traveler + engineering markers
        const halfW = Math.min(Math.max(st.rx * 1.5, 96), st.cx - 24, w - 24 - st.cx);
        const bxL = st.cx - halfW;
        const bxR = st.cx + halfW;
        const byT = tgtCy - tr * 1.9;
        const byB = tgtCy + tr * 1.9;
        const arm = 11;
        ctx.strokeStyle = rgba(pal.bright, 0.32);
        const bracket = (bx: number, by: number, sx: number, sy: number) => {
          ctx.beginPath();
          ctx.moveTo(bx + sx * arm, by);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx, by + sy * arm);
          ctx.stroke();
        };
        bracket(bxL, byT, 1, 1);
        bracket(bxR, byT, -1, 1);
        bracket(bxL, byB, 1, -1);
        bracket(bxR, byB, -1, -1);
        ctx.font = mono(8.5);
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = rgba(pal.ice, 0.3);
        ctx.fillText(`[X: ${st.coordX.toFixed(2)}, Y: ${st.coordY.toFixed(2)}]`, bxL + arm + 5, byT - 3);
        ctx.textBaseline = "top";
        ctx.fillStyle = rgba(pal.ice, 0.26);
        ctx.fillText("IDENT: CN2_OPERATOR // CLEARANCE: LEVEL_1", bxL + arm + 5, byB + 3);
      }

      // active telemetry strip (below the nav pill): variable-cadence ping
      // dot + tick-driven latency, parser/persistence stack, session uptime
      if (w >= 720) {
        ctx.font = mono(9.5);
        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        const full = w >= 980;
        const l1 = full
          ? `WS_FEED: BINANCE_WS_L1 [ACTIVE] · LATENCY: ${st.lat.toFixed(1)}ms (p99) · PARSER: C11_CORE`
          : `WS_FEED: [ACTIVE] · LATENCY: ${st.lat.toFixed(1)}ms`;
        const up = st.uptime;
        const hh = String(Math.floor(up / 3600) % 100).padStart(2, "0");
        const mm = String(Math.floor(up / 60) % 60).padStart(2, "0");
        const ss = String(Math.floor(up) % 60).padStart(2, "0");
        const l2 = `SESSION UPTIME: ${hh}:${mm}:${ss} · PERSISTENCE: SQLITE_WAL · ALLOCATION: 0.00 LIVE`;
        ctx.fillStyle = rgba(pal.ice, 0.44);
        ctx.fillText(l1, w - 24, 76);
        const twd = ctx.measureText(l1).width;
        ctx.fillStyle = rgba(pal.red, 0.3 + 0.65 * st.tickEnv);
        ctx.beginPath();
        ctx.arc(w - 24 - twd - 10, 81, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(pal.ice, 0.36);
        ctx.fillText(l2, w - 24, 90);
        ctx.textAlign = "left";
      }

      // coordinate readout (bottom-right) + damped crosshair
      ctx.font = mono(9);
      ctx.textBaseline = "bottom";
      ctx.textAlign = "right";
      const nx = Math.max(0, Math.min(1, st.dampX / w)).toFixed(3);
      const ny = Math.max(0, Math.min(1, st.dampY / h)).toFixed(3);
      ctx.fillStyle = rgba(pal.ice, 0.4);
      ctx.fillText(`X ${nx}  Y ${ny}`, w - 24, h - 22);
      ctx.textAlign = "left";

      if (fade > 0.01 && w >= 720) {
        const x = st.dampX;
        const y = st.dampY;
        // faint dashed traverses
        ctx.setLineDash([3, 8]);
        ctx.strokeStyle = rgba(pal.ice, 0.12 * fade);
        ctx.beginPath();
        ctx.moveTo(x - 70, y);
        ctx.lineTo(x + 70, y);
        ctx.moveTo(x, y - 56);
        ctx.lineTo(x, y + 56);
        ctx.stroke();
        ctx.setLineDash([]);
        // bright centre cross with gap
        ctx.strokeStyle = rgba(pal.bright, 0.55 * fade);
        ctx.beginPath();
        ctx.moveTo(x - 13, y);
        ctx.lineTo(x - 4, y);
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + 13, y);
        ctx.moveTo(x, y - 13);
        ctx.lineTo(x, y - 4);
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x, y + 13);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.stroke();
        // edge rulers
        ctx.strokeStyle = rgba(pal.ice, 0.45 * fade);
        ctx.beginPath();
        ctx.moveTo(w - 9, y);
        ctx.lineTo(w - 2, y);
        ctx.moveTo(x, h - 9);
        ctx.lineTo(x, h - 2);
        ctx.stroke();
      }
    },
  };
}

const ENGINE = makeEngine();

export default function LivingHomeHero({ seed = 13 }: { seed?: number }) {
  const engine = useMemo(() => ENGINE, []);
  return <SceneFrame engine={engine} seed={seed} pointer />;
}
