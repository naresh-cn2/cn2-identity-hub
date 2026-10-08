"use client";

import { useEffect, useRef, useState } from "react";
import { makeField, project, type Camera } from "@/lib/field";

interface HeroFieldProps {
  className?: string;
  seed?: number;
}

/**
 * Signature computational field — a deterministic projected-3D data landscape
 * representing market topology, probability fields, and quantitative structure.
 * Canvas 2D: no WebGL dependency, degrades everywhere. Generative, not live data.
 * Respects prefers-reduced-motion.
 */
export default function HeroField({ className = "", seed = 20 }: HeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = makeField(seed, 18);
    const GRID = 28;
    let raf = 0;
    let running = true;
    let rotY = -0.65;
    let width = 0;
    let height = 0;
    let colors = { grid: "", axis: "", signal: "", faint: "", surface: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(128,128,128,.2)",
        axis: cs.getPropertyValue("--chart-axis").trim() || "rgba(128,128,128,.4)",
        signal: cs.getPropertyValue("--signal").trim() || "#e6392a",
        faint: cs.getPropertyValue("--faint").trim() || "rgba(128,128,128,.5)",
        surface: cs.getPropertyValue("--signal-soft").trim() || "rgba(230,57,42,.08)",
      };
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const point = (gx: number, gz: number, cam: Camera) => {
      const h = field(gx, gz);
      return project(gx, h * 0.45 - 0.08, gz, cam);
    };

    const draw = () => {
      const cam: Camera = {
        rotY: rotY,
        rotX: 0.58,
        scale: Math.min(width, 1400) * 0.5,
        perspective: 3.4,
        cx: width * 0.5,
        cy: height * 0.7,
      };
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Deep grid (constant z) - subtle
      for (let j = 0; j <= GRID; j++) {
        const gz = -1 + (2 * j) / GRID;
        ctx.beginPath();
        for (let i = 0; i <= GRID; i++) {
          const gx = -1 + (2 * i) / GRID;
          const p = point(gx, gz, cam);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        const alpha = 0.2 + 0.5 * (1 - Math.abs(gz));
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.35 * alpha + 0.1;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      // Layer 2: Cross grid (constant x) - subtle
      for (let i = 0; i <= GRID; i++) {
        const gx = -1 + (2 * i) / GRID;
        ctx.beginPath();
        for (let j = 0; j <= GRID; j++) {
          const gz = -1 + (2 * j) / GRID;
          const p = point(gx, gz, cam);
          if (j === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Layer 3: Filled surface bands (elevation contours)
      for (let level = 0; level < 6; level++) {
        const threshold = 0.15 + level * 0.15;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= GRID; j++) {
          const gz = -1 + (2 * j) / GRID;
          for (let i = 0; i <= GRID; i++) {
            const gx = -1 + (2 * i) / GRID;
            const h = field(gx, gz);
            if (Math.abs(h - threshold) < 0.02) {
              const p = point(gx, gz, cam);
              if (first) {
                ctx.moveTo(p.sx, p.sy);
                first = false;
              } else {
                ctx.lineTo(p.sx, p.sy);
              }
            }
          }
        }
        if (!first) {
          ctx.strokeStyle = level === 2 ? colors.signal : colors.faint;
          ctx.globalAlpha = level === 2 ? 0.6 : 0.15;
          ctx.lineWidth = level === 2 ? 1.5 : 0.7;
          ctx.stroke();
        }
      }

      // Layer 4: Primary signal trace - the red line
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let i = 0; i <= GRID; i++) {
        const gx = -1 + (2 * i) / GRID;
        const gz = -0.25 + 0.15 * Math.sin(i * 1.8 + rotY * 2);
        const p = point(gx, gz, cam);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      // Gradient stroke for signal trace
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, colors.signal);
      grad.addColorStop(0.5, colors.signal);
      grad.addColorStop(1, colors.faint);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Signal trace points
      for (let i = 0; i <= GRID; i += 3) {
        const gx = -1 + (2 * i) / GRID;
        const gz = -0.25 + 0.15 * Math.sin(i * 1.8 + rotY * 2);
        const p = point(gx, gz, cam);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = colors.signal;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        // glow ring
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 6, 0, Math.PI * 2);
        ctx.strokeStyle = colors.signal;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Layer 5: Sparse data particles across the field
      ctx.fillStyle = colors.faint;
      for (let j = 3; j <= GRID - 3; j += 7) {
        for (let i = 3; i <= GRID - 3; i += 7) {
          const gx = -1 + (2 * i) / GRID;
          const gz = -1 + (2 * j) / GRID;
          const h = field(gx, gz);
          const p = point(gx, gz, cam);
          if (h > 0.1) {
            ctx.globalAlpha = 0.4 * p.depth;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Layer 6: Axis reference lines
      const origin = point(0, 0, cam);
      // X axis
      const px = point(1, 0, cam);
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(px.sx, px.sy);
      ctx.strokeStyle = colors.axis;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      // Z axis
      const pz = point(0, 1, cam);
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(pz.sx, pz.sy);
      ctx.stroke();
      // Labels
      ctx.fillStyle = colors.faint;
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("VOLATILITY", px.sx, px.sy - 8);
      ctx.fillText("TIME", pz.sx, pz.sy - 8);
      ctx.globalAlpha = 1;

      // Layer 7: Regime markers (small triangles at specific field locations)
      const regimes = [
        { gx: 0.6, gz: 0.6, label: "TREND" },
        { gx: -0.6, gz: -0.4, label: "MEAN REV" },
        { gx: 0.4, gz: -0.6, label: "BREAKOUT" },
        { gx: -0.4, gz: 0.4, label: "CHOPPY" },
      ];
      for (const r of regimes) {
        const p = point(r.gx, r.gz, cam);
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy - 8);
        ctx.lineTo(p.sx - 6, p.sy + 4);
        ctx.lineTo(p.sx + 6, p.sy + 4);
        ctx.closePath();
        ctx.fillStyle = colors.signal;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.font = "9px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = colors.faint;
        ctx.globalAlpha = 0.5;
        ctx.fillText(r.label, p.sx, p.sy + 18);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      if (!reduced) rotY += 0.0006;
      draw();
      raf = requestAnimationFrame(tick);
    };

    readColors();
    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMouse = () => {
      // Mouse interaction disabled for reduced motion
      if (reduced) return;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [seed, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
