"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * SceneFrame — the shared procedural-visual engine for the signature
 * per-page "aura" visuals in components/visuals/.
 *
 * One implementation of the rules every visual must honour:
 *  - DPR-aware sizing capped at 2x, dynamic resize via ResizeObserver.
 *  - One rAF loop, paused when the layer scrolls out of view
 *    (IntersectionObserver) or the tab hides (visibilitychange).
 *  - prefers-reduced-motion: a single static frame, re-drawn on
 *    resize / theme change, never animated.
 *  - Theme-aware: engines receive the active mode and switch palettes;
 *    light mode is additionally dimmed (same 0.72 factor as PageAtmosphere).
 *  - Wrapper is aria-hidden + pointer-events:none + absolute inset-0, so
 *    navigation, forms and the command palette stay 100% interactive and
 *    the QA gate markers ("fixed inset-0 -z-10", "cn2-atmosphere-plain")
 *    are never produced here.
 *
 * Engines are tiny { init, draw } objects with all state passed through
 * init's return value, so every resize rebuilds entities deterministically
 * from the seed.
 */

export interface Env {
  w: number;
  h: number;
  /** ms since init */
  t: number;
  /** seconds since previous frame */
  dt: number;
  mode: "dark" | "light";
  /** theme alpha budget (light reads calmer) */
  dim: number;
  /** pointer position -1..1 (only when pointer tracking is enabled) */
  px: number;
  py: number;
  /** true when drawing the single reduced-motion frame */
  staticFrame: boolean;
}

export interface Engine<S = unknown> {
  init(w: number, h: number, rnd: () => number): S;
  draw(ctx: CanvasRenderingContext2D, env: Env, st: S): void;
}

/* House palette, mirrored from the design tokens (globals.css):
   dark — icy research blue / ember red / ice-white highlights
   light — deep blueprint blue / signal red / ink highlights */
export const PAL = {
  dark: {
    ice: [111, 150, 242] as [number, number, number],
    red: [233, 64, 48] as [number, number, number],
    bright: [214, 230, 255] as [number, number, number],
    deep: [38, 50, 76] as [number, number, number],
  },
  light: {
    ice: [27, 77, 201] as [number, number, number],
    red: [200, 36, 24] as [number, number, number],
    bright: [21, 25, 34] as [number, number, number],
    deep: [118, 138, 178] as [number, number, number],
  },
};

export const rgba = (c: [number, number, number], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

/** Deterministic PRNG (mulberry32) — same seed, same composition. */
export function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export default function SceneFrame<S>({ engine, seed = 1, pointer = false, className = "" }: {
  engine: Engine<S>;
  seed?: number;
  pointer?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mode: "dark" | "light" = theme === "light" ? "light" : "dark";

    let w = 0;
    let h = 0;
    let st: S | null = null;
    let raf = 0;
    let last = 0;
    let t0 = 0;
    let visible = true;
    let px = 0;
    let py = 0;

    const draw = (t: number, dt: number, isStatic = false) => {
      if (st === null) return;
      engine.draw(
        ctx,
        { w, h, t, dt, mode, dim: mode === "light" ? 0.72 : 1, px, py, staticFrame: isStatic },
        st,
      );
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!t0) {
        t0 = now;
        last = now;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now - t0, dt);
    };

    const sync = () => {
      if (reduced) return;
      const run = visible && !document.hidden;
      if (run && !raf) {
        last = performance.now();
        t0 = 0;
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      st = engine.init(w, h, mulberry(seed));
      if (reduced) draw(0, 0, true);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    let onMove: ((e: PointerEvent) => void) | null = null;
    const onLeave = () => {
      px = 0;
      py = 0;
    };
    if (pointer) {
      onMove = (e: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        px = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        py = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    if (!reduced) sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (pointer) window.removeEventListener("pointerleave", onLeave);
    };
  }, [engine, theme, seed, pointer]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="cn2-visual-canvas" />
    </div>
  );
}
