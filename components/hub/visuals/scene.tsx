"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * SceneCanvas — the shared living-light engine behind every /hub visual.
 *
 * Each destination visual composes two layers: a canvas ambience drawn by a
 * pure `SceneDraw` function (light, haze, pulses, particles — analytic
 * functions of time, so every instance and re-mount composes identically)
 * and a crisp SVG overlay that carries the informative geometry.
 *
 * Engine rules (same discipline as PageAtmosphere):
 *  - one rAF loop per instance; paused when the tab hides or the layer
 *    scrolls out of view;
 *  - a single calm static frame for prefers-reduced-motion;
 *  - theme-aware palettes that switch with the dark/light token set;
 *  - DPR-correct sizing through a ResizeObserver;
 *  - aria-hidden + pointer-events:none — interaction lives in the SVG layer.
 */

export type RGB = [number, number, number];

export interface Palette {
  structure: RGB; // blue-grey network / grid lines
  deep: RGB; // receding tones
  signal: RGB; // restrained red accents
  bright: RGB; // highlight nodes / pulses
}

export const PALETTES: Record<"dark" | "light", Palette> = {
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

export const rgba = (c: RGB, a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

export interface SceneEnv {
  /** Seconds since the first frame. */
  t: number;
  /** Element size in CSS pixels. */
  w: number;
  h: number;
  pal: Palette;
  /** Light mode reads calmer on white surfaces. */
  dim: number;
  reduced: boolean;
  /** Narrow viewport — compositions thin out. */
  small: boolean;
}

export type SceneDraw = (ctx: CanvasRenderingContext2D, env: SceneEnv) => void;

/* Slow analytic phase helpers shared by the destination scenes. */
export const pulseAt = (t: number, dur: number, phase: number) =>
  ((t / dur + phase) % 1 + 1) % 1;
export const breathe = (t: number, speed: number, phase: number) =>
  0.5 + 0.5 * Math.sin(t * speed + phase);

export default function SceneCanvas({
  draw,
  className = "",
}: {
  draw: SceneDraw;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mode = theme === "light" ? "light" : "dark";
    const pal = PALETTES[mode];
    const dim = mode === "light" ? 0.72 : 1;
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

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, { t, w, h, pal, dim, reduced, small });
    };

    if (reduced) {
      frame(1.2); // one calm static frame
    } else {
      // Paint immediately so the scene never starts empty, then loop.
      frame(0);
      const start = performance.now();
      const loop = (now: number) => {
        raf = visible ? requestAnimationFrame(loop) : 0;
        frame((now - start) / 1000);
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
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [draw, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
