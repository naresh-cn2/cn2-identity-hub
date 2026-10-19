"use client";

import { useEffect, useMemo } from "react";
import SceneFrame, { type Engine, PAL, rgba } from "@/components/visuals/scene-frame";

/**
 * SignalResonance — the contact page's beacon.
 *
 * A beacon on the horizon line emits harmonic resonance rings (every
 * fourth one crimson), a live waveform rides the horizon as a sum of
 * harmonics, and a signal-analyzer sweep brightens whatever it passes.
 * The whole field is reactive: focusing any form field on the page (or
 * clicking) kicks the amplitude up and lets it settle back — the page
 * literally answers when someone starts writing.
 */

interface Ring { t0: number; crimson: boolean }
interface SigState {
  rings: Ring[];
  nextRing: number;
  amp: number;
  kick: number;
}

/* bridge so the DOM listeners below can nudge the engine's amplitude */
const KICK = { k: 0 };

function makeEngine(): Engine<SigState> {
  return {
    init() {
      // Pre-seed rings with negative start times so the reduced-motion
      // static frame (t = 0) already shows the resonance field, and the
      // live loop opens mid-song instead of waiting for the first spawn.
      return {
        rings: [
          { t0: -1.1, crimson: false },
          { t0: -2.6, crimson: false },
          { t0: -4.1, crimson: true },
          { t0: -5.6, crimson: false },
        ],
        nextRing: 2.2,
        amp: 1,
        kick: 0,
      };
    },
    draw(ctx, env, st) {
      const { w, h, t, mode, dim, staticFrame } = env;
      const pal = mode === "dark" ? PAL.dark : PAL.light;
      const tt = t / 1000;
      ctx.clearRect(0, 0, w, h);

      const bx = w * 0.5;
      const by = h * 0.62;
      const unit = Math.min(w, 1400);

      if (!staticFrame) {
        st.kick = Math.max(st.kick, KICK.k);
        KICK.k = 0;
        st.kick = Math.max(0, st.kick - env.dt * 0.9);
        st.amp += ((1 + st.kick * 1.6) - st.amp) * Math.min(1, env.dt * 2.2);
        st.nextRing -= env.dt;
        if (st.nextRing <= 0 && st.rings.length < 7) {
          st.rings.push({ t0: tt, crimson: st.rings.length % 4 === 3 });
          st.nextRing = 1.5;
        }
        for (let i = st.rings.length - 1; i >= 0; i--) if (tt - st.rings[i].t0 > 7) st.rings.splice(i, 1);
      }

      // ---- resonance rings (seeded rings also render in the static frame) ----
      for (const ring of st.rings) {
        const age = tt - ring.t0;
        if (age < 0 || age > 7) continue;
        const r = age * unit * 0.085;
        const fade = Math.max(0, 1 - age / 7);
        const c = ring.crimson ? pal.red : pal.ice;
        ctx.strokeStyle = rgba(c, 0.3 * fade * fade * dim);
        ctx.lineWidth = ring.crimson ? 1.6 : 1;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.stroke();
        // dash crown on odd rings
        if (!ring.crimson && age > 1.2) {
          const ticks = 16;
          ctx.strokeStyle = rgba(c, 0.16 * fade * dim);
          for (let i = 0; i < ticks; i++) {
            const a = (i / ticks) * Math.PI * 2 + tt * 0.06;
            ctx.beginPath();
            ctx.moveTo(bx + Math.cos(a) * (r - 4), by + Math.sin(a) * (r - 4));
            ctx.lineTo(bx + Math.cos(a) * (r + 4), by + Math.sin(a) * (r + 4));
            ctx.stroke();
          }
        }
      }

      // ---- horizon waveform ----
      const wl = unit * 0.42;
      const amp = unit * 0.03 * st.amp;
      ctx.lineWidth = 1.4;
      const wg = ctx.createLinearGradient(bx - wl, 0, bx + wl, 0);
      wg.addColorStop(0, rgba(pal.ice, 0));
      wg.addColorStop(0.2, rgba(pal.ice, 0.5 * dim));
      wg.addColorStop(0.5, rgba(pal.bright, 0.7 * dim));
      wg.addColorStop(0.8, rgba(pal.ice, 0.5 * dim));
      wg.addColorStop(1, rgba(pal.ice, 0));
      ctx.strokeStyle = wg;
      ctx.beginPath();
      for (let x = -wl; x <= wl; x += 3) {
        const u = x / wl; // -1..1
        const envl = Math.cos(u * Math.PI * 0.5); // fade at both ends
        const y =
          by +
          envl *
            amp *
            (Math.sin(u * 9 + tt * 1.7) * 0.5 +
              Math.sin(u * 17 - tt * 2.3) * 0.3 +
              Math.sin(u * 31 + tt * 0.9) * 0.2);
        if (x === -wl) ctx.moveTo(bx + x, y);
        else ctx.lineTo(bx + x, y);
      }
      ctx.stroke();

      // ---- beacon ----
      const flick = 0.85 + 0.15 * Math.sin(tt * 3.1);
      const bg = ctx.createRadialGradient(bx, by, 0, bx, by, 26 * flick);
      bg.addColorStop(0, rgba(pal.bright, 0.8 * dim));
      bg.addColorStop(0.3, rgba(pal.ice, 0.4 * dim));
      bg.addColorStop(1, rgba(pal.ice, 0));
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(bx, by, 26 * flick, 0, Math.PI * 2);
      ctx.fill();
      // horizon line through the beacon
      const hg = ctx.createLinearGradient(bx - unit * 0.5, 0, bx + unit * 0.5, 0);
      hg.addColorStop(0, rgba(pal.deep, 0));
      hg.addColorStop(0.5, rgba(pal.deep, 0.5 * dim));
      hg.addColorStop(1, rgba(pal.deep, 0));
      ctx.fillStyle = hg;
      ctx.fillRect(bx - unit * 0.5, by + 0.5, unit, 1);

      // ---- analyzer sweep ----
      if (!staticFrame) {
        const sx = ((tt * 0.07) % 1.3 - 0.15) * w;
        const sg = ctx.createLinearGradient(sx - 46, 0, sx + 46, 0);
        sg.addColorStop(0, rgba(pal.ice, 0));
        sg.addColorStop(0.5, rgba(pal.ice, 0.08 * dim));
        sg.addColorStop(1, rgba(pal.ice, 0));
        ctx.fillStyle = sg;
        ctx.fillRect(sx - 46, 0, 92, h);
      }
      void h;
    },
  };
}

const ENGINE = makeEngine();

export default function SignalResonance({ seed = 11, className = "" }: { seed?: number; className?: string }) {
  const engine = useMemo(() => ENGINE, []);

  // reactive: any form field focus (or a click anywhere) kicks the field
  useEffect(() => {
    const kick = () => {
      KICK.k = 1;
    };
    document.addEventListener("focusin", kick);
    document.addEventListener("pointerdown", kick);
    return () => {
      document.removeEventListener("focusin", kick);
      document.removeEventListener("pointerdown", kick);
    };
  }, []);

  return <SceneFrame engine={engine} seed={seed} className={className} />;
}
