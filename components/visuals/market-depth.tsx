"use client";

import { useMemo } from "react";
import SceneFrame, { type Engine, PAL, rgba } from "@/components/visuals/scene-frame";

/**
 * MarketDepth — an isometric order-book depth matrix.
 *
 * A live depth ladder: bid energy (ice) stacked left of the mid line,
 * ask energy (crimson) stacked right, columns streaming left over time
 * like a tape, an oscillating spread band around the mid, occasional
 * large-trade flashes, and a perspective floor grid grounding it all.
 * Deterministic layered sines + a slow random walk keep it smooth and
 * believable without ever touching real data.
 */

interface Col { b: number; a: number; walk: number; flash: number }
interface DepthState {
  cols: Col[];
  maxCol: number;
  tAcc: number;
  scroll: number;
  sweep: number;
}

const N = 46;

function makeEngine(): Engine<DepthState> {
  return {
    init(w, h, rnd) {
      const cols: Col[] = [];
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        cols.push({
          b: Math.exp(-Math.pow((u - 0.42) * 2.6, 2)) * 0.85 + rnd() * 0.14,
          a: Math.exp(-Math.pow((u - 0.58) * 2.6, 2)) * 0.8 + rnd() * 0.14,
          walk: rnd() * Math.PI * 2,
          flash: 0,
        });
      }
      return { cols, maxCol: 1, tAcc: 0, scroll: 0, sweep: -0.2 };
    },
    draw(ctx, env, st) {
      const { w, h, t, mode, dim } = env;
      const pal = mode === "dark" ? PAL.dark : PAL.light;
      const tt = t / 1000;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const baseY = h * 0.66;
      const colW = Math.min(w * 0.92, 1100) / N;
      const originX = cx - (colW * N) / 2;
      const skew = 0.34; // isometric lean: columns shear right as they rise
      const maxH = h * 0.34;

      if (!env.staticFrame) {
        st.tAcc += env.dt;
        if (st.tAcc > 0.42) {
          st.tAcc = 0;
          st.cols.shift();
          const lastCol = st.cols[st.cols.length - 1];
          const walk = (lastCol?.walk ?? 0) + (Math.random() - 0.5) * 1.1;
          st.cols.push({
            b: Math.max(0.08, Math.min(1, (lastCol?.b ?? 0.5) + (Math.random() - 0.5) * 0.22 + Math.sin(walk) * 0.03)),
            a: Math.max(0.08, Math.min(1, (lastCol?.a ?? 0.5) + (Math.random() - 0.5) * 0.22 - Math.sin(walk) * 0.03)),
            walk,
            flash: Math.random() < 0.08 ? 1 : 0,
          });
          if (Math.random() < 0.3) {
            const victim = Math.floor(Math.random() * st.cols.length);
            st.cols[victim].flash = 1;
          }
        }
        st.sweep += env.dt * 0.16;
        if (st.sweep > 1.25) st.sweep = -0.25;
      }

      // ---- perspective floor ----
      ctx.lineWidth = 1;
      for (let i = 0; i <= 6; i++) {
        const u = i / 6;
        const y = baseY + u * u * (h - baseY) * 0.96;
        ctx.strokeStyle = rgba(pal.deep, (0.16 + 0.3 * u) * dim);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let i = -6; i <= 6; i++) {
        const xTop = cx + i * colW * 3.2;
        const xBot = cx + i * colW * 7.4;
        ctx.strokeStyle = rgba(pal.deep, 0.16 * dim);
        ctx.beginPath();
        ctx.moveTo(xTop, baseY);
        ctx.lineTo(xBot, h);
        ctx.stroke();
      }

      // ---- spread band around the mid ----
      const spread = 3 + 2.4 * Math.sin(tt * 0.7);
      const sg = ctx.createLinearGradient(0, baseY - maxH - 20, 0, baseY);
      sg.addColorStop(0, rgba(pal.bright, 0));
      sg.addColorStop(1, rgba(pal.bright, 0.05 * dim));
      ctx.fillStyle = sg;
      ctx.fillRect(originX, baseY - maxH - 20, colW * N, maxH + 20);
      ctx.strokeStyle = rgba(pal.ice, 0.28 * dim);
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(originX, baseY - spread - 6);
      ctx.lineTo(originX + colW * N, baseY - spread - 6);
      ctx.stroke();
      ctx.setLineDash([]);

      // ---- depth columns (bids left, asks right of each slot) ----
      for (let i = 0; i < st.cols.length; i++) {
        const col = st.cols[i];
        const x = originX + i * colW;
        const mid = i === Math.floor(st.cols.length / 2);
        for (const side of [-1, 1] as const) {
          const v = side < 0 ? col.b : col.a;
          const hh = v * maxH * (0.86 + 0.14 * Math.sin(tt * 1.3 + i * 0.5 + side));
          const c = side < 0 ? pal.ice : pal.red;
          const bx = x + colW * 0.5 + side * colW * 0.22;
          const topX = bx + hh * skew * 0.5;
          const topY = baseY - hh;
          // stem
          const g = ctx.createLinearGradient(0, baseY, 0, topY);
          g.addColorStop(0, rgba(c, 0.05 * dim));
          g.addColorStop(1, rgba(c, (0.4 + 0.3 * v) * dim));
          ctx.fillStyle = g;
          ctx.fillRect(bx - colW * 0.2, topY, colW * 0.4, hh);
          // lean (isometric top shear)
          ctx.strokeStyle = rgba(c, 0.5 * dim);
          ctx.beginPath();
          ctx.moveTo(bx - colW * 0.2, topY);
          ctx.lineTo(topX - colW * 0.2, topY - colW * skew * 0.5);
          ctx.moveTo(bx + colW * 0.2, topY);
          ctx.lineTo(topX + colW * 0.2, topY - colW * skew * 0.5);
          ctx.stroke();
          // cap tick
          ctx.fillStyle = rgba(c, (0.55 + 0.35 * v) * dim);
          ctx.fillRect(topX - colW * 0.24, topY - colW * skew * 0.5 - 1.5, colW * 0.48, 1.5);
          // trade flash
          if (col.flash > 0.02) {
            ctx.fillStyle = rgba(pal.bright, col.flash * 0.5 * dim);
            ctx.fillRect(topX - 0.75, topY - maxH * 0.34, 1.5, maxH * 0.34);
            if (!env.staticFrame) col.flash *= 0.9;
          }
        }
        if (mid) {
          ctx.fillStyle = rgba(pal.bright, 0.5 * dim);
          ctx.fillRect(x + colW * 0.44, baseY - 2, colW * 0.12, 2);
        }
      }

      // ---- mid line ----
      const midX = originX + (colW * N) / 2;
      const mg = ctx.createLinearGradient(0, baseY - maxH * 1.15, 0, baseY + 12);
      mg.addColorStop(0, rgba(pal.bright, 0));
      mg.addColorStop(0.6, rgba(pal.bright, 0.3 * dim));
      mg.addColorStop(1, rgba(pal.bright, 0));
      ctx.fillStyle = mg;
      ctx.fillRect(midX - 0.6, baseY - maxH * 1.15, 1.2, maxH * 1.15 + 12);

      // ---- analyzer sweep ----
      if (!env.staticFrame && st.sweep > 0 && st.sweep < 1) {
        const sx2 = originX + st.sweep * colW * N;
        const sg2 = ctx.createLinearGradient(sx2 - 30, 0, sx2 + 30, 0);
        sg2.addColorStop(0, rgba(pal.ice, 0));
        sg2.addColorStop(0.5, rgba(pal.ice, 0.12 * dim));
        sg2.addColorStop(1, rgba(pal.ice, 0));
        ctx.fillStyle = sg2;
        ctx.fillRect(sx2 - 30, baseY - maxH - 24, 60, maxH + 24);
      }
      void w;
    },
  };
}

const ENGINE = makeEngine();

export default function MarketDepth({ seed = 3, className = "" }: { seed?: number; className?: string }) {
  const engine = useMemo(() => ENGINE, []);
  return <SceneFrame engine={engine} seed={seed} className={className} />;
}
