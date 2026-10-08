"use client";

import { useEffect, useRef } from "react";
import { makeField, project, type Camera } from "@/lib/field";

interface HeroFieldProps {
  className?: string;
  seed?: number;
}

/**
 * Restrained computational field behind the hero typography —
 * a deterministic projected-3D data landscape with a single red signal trace.
 * Canvas 2D: no WebGL dependency, degrades everywhere. Generative, not live data.
 */
export default function HeroField({ className = "", seed = 20 }: HeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = makeField(seed, 18);
    const GRID = 26;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let rotY = -0.65;
    let targetRotYOffset = 0;
    let targetRotXOffset = 0;
    let rotYOffset = 0;
    let rotXOffset = 0;
    let width = 0;
    let height = 0;
    let colors = { grid: "", axis: "", signal: "", faint: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(128,128,128,.2)",
        axis: cs.getPropertyValue("--chart-axis").trim() || "rgba(128,128,128,.4)",
        signal: cs.getPropertyValue("--signal").trim() || "#e6392a",
        faint: cs.getPropertyValue("--faint").trim() || "rgba(128,128,128,.5)",
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
      return project(gx, h * 0.42 - 0.1, gz, cam);
    };

    const draw = () => {
      const cam: Camera = {
        rotY: rotY + rotYOffset,
        rotX: 0.62 + rotXOffset,
        scale: Math.min(width, 1400) * 0.52,
        perspective: 3.2,
        cx: width * 0.5,
        cy: height * 0.68,
      };
      ctx.clearRect(0, 0, width, height);

      // wireframe rows (constant z)
      for (let j = 0; j <= GRID; j++) {
        const gz = -1 + (2 * j) / GRID;
        ctx.beginPath();
        for (let i = 0; i <= GRID; i++) {
          const gx = -1 + (2 * i) / GRID;
          const p = point(gx, gz, cam);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        const alpha = 0.35 + 0.65 * (1 - Math.abs(gz));
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.55 * alpha + 0.15;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // wireframe columns (constant x)
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
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // red signal trace — one deterministic path across the field
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let i = 0; i <= GRID; i++) {
        const gx = -1 + (2 * i) / GRID;
        const gz = -0.28 + 0.12 * Math.sin(i * 1.7);
        const p = point(gx, gz, cam);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = colors.signal;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // data points on the trace
      for (let i = 0; i <= GRID; i += 4) {
        const gx = -1 + (2 * i) / GRID;
        const gz = -0.28 + 0.12 * Math.sin(i * 1.7);
        const p = point(gx, gz, cam);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = colors.signal;
        ctx.fill();
      }

      // sparse reference points across the surface
      ctx.fillStyle = colors.faint;
      for (let j = 2; j <= GRID - 2; j += 6) {
        for (let i = 2; i <= GRID - 2; i += 6) {
          const gx = -1 + (2 * i) / GRID;
          const gz = -1 + (2 * j) / GRID;
          const p = point(gx, gz, cam);
          ctx.globalAlpha = 0.5 * p.depth;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      rotYOffset += (targetRotYOffset - rotYOffset) * 0.04;
      rotXOffset += (targetRotXOffset - rotXOffset) * 0.04;
      if (!reduced) rotY += 0.0009;
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

    const onMouse = (e: MouseEvent) => {
      targetRotYOffset = (e.clientX / window.innerWidth - 0.5) * 0.22;
      targetRotXOffset = (e.clientY / window.innerHeight - 0.5) * -0.08;
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
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
