"use client";

import { useEffect, useRef, useState } from "react";

interface ResearchVisualArtifactProps {
  category: string;
  seed: number;
}

function ResearchVisualArtifact({ category, seed }: ResearchVisualArtifactProps) {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const field = makeDeterministicField(seed);
    const GRID = 16;
    let raf = 0;
    let running = true;
    let rotY = 0;
    let rotYOffset = 0;
    let rotXOffset = 0;
    let width = 0;
    let height = 0;
    let colors = { grid: "", signal: "", faint: "", surface: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(128,128,128,.2)",
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

    const point = (gx: number, gz: number) => {
      const h = field(gx, gz) * 0.4;
      const cam: Camera = {
        rotY: rotY + rotYOffset,
        rotX: 0.5 + rotXOffset,
        scale: Math.min(width, 600) * 0.45,
        perspective: 3.0,
        cx: width * 0.5,
        cy: height * 0.65,
      };
      return project3D(gx, h - 0.1, gz, cam);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Grid
      for (let j = 0; j <= GRID; j++) {
        const gz = -1 + (2 * j) / GRID;
        ctx.beginPath();
        for (let i = 0; i <= GRID; i++) {
          const gx = -1 + (2 * i) / GRID;
          const p = point(gx, gz);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        const alpha = 0.3 + 0.5 * (1 - Math.abs(gz));
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.4 * alpha + 0.1;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      for (let i = 0; i <= GRID; i++) {
        const gx = -1 + (2 * i) / GRID;
        ctx.beginPath();
        for (let j = 0; j <= GRID; j++) {
          const gz = -1 + (2 * j) / GRID;
          const p = point(gx, gz);
          if (j === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      // Signal trace
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let i = 0; i <= GRID; i++) {
        const gx = -1 + (2 * i) / GRID;
        const gz = -0.15 + 0.1 * Math.sin(i * 2.2 + rotY * 2);
        const p = point(gx, gz);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = colors.signal;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Contour
      for (let level = 0; level < 3; level++) {
        const threshold = 0.12 + level * 0.2;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= GRID; j++) {
          const gz = -1 + (2 * j) / GRID;
          for (let i = 0; i <= GRID; i++) {
            const gx = -1 + (2 * i) / GRID;
            const h = field(gx, gz) * 0.4;
            if (Math.abs(h - threshold) < 0.015) {
              const p = point(gx, gz);
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
          ctx.strokeStyle = colors.signal;
          ctx.globalAlpha = 0.3;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      rotYOffset += (0 - rotYOffset) * 0.04;
      rotXOffset += (0 - rotXOffset) * 0.04;
      if (!reduced) rotY += 0.0004;
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
    };
  }, [seed, reduced, category]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full"
    />
  );
}

interface ResearchVisualArtifactsProps {
  entries: Array<{ category: string; index: number }>;
}

export default function ResearchVisualArtifacts({ entries }: ResearchVisualArtifactsProps) {
  return (
    <>
      {entries.map(({ category, index }) => (
        <div key={category} className="md:col-span-3 lg:col-span-3">
          <div className="mt-6 h-48 w-full max-w-2xl border border-line bg-background/50">
            <ResearchVisualArtifact category={category} seed={index + 100} />
          </div>
          <p className="label-mono mt-2 text-faint text-xs">
            ILLUSTRATIVE — GENERATIVE VISUAL FOR {category}
          </p>
        </div>
      ))}
    </>
  );
}

// Local implementations for this component (to avoid circular imports)
function makeDeterministicField(seed: number) {
  const rand = mulberry32(seed);
  const offsets: number[][] = [];
  for (let i = 0; i < 6; i++) {
    offsets[i] = [rand() * 1000, rand() * 1000, rand() * 0.5 + 0.5, rand() * 0.02 + 0.01];
  }
  return (x: number, z: number): number => {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      const freq = Math.pow(2, i);
      const [ox, oz, weight, phase] = offsets[i % offsets.length];
      sum += weight * Math.sin((x * freq + ox) * 6) * Math.cos((z * freq + oz) * 6 + phase);
    }
    return Math.max(0, Math.min(1, (sum + 1) / 2));
  };
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function project3D(x: number, y: number, z: number, cam: Camera): { sx: number; sy: number; depth: number } {
  const x1 = x * Math.cos(cam.rotY) - z * Math.sin(cam.rotY);
  const z1 = x * Math.sin(cam.rotY) + z * Math.cos(cam.rotY);
  const y2 = y * Math.cos(cam.rotX) - z1 * Math.sin(cam.rotX);
  const z2 = y * Math.sin(cam.rotX) + z1 * Math.cos(cam.rotX);
  const scale = cam.scale / (cam.perspective + z2);
  return {
    sx: cam.cx + x1 * scale,
    sy: cam.cy - y2 * scale,
    depth: 1 / (1 + z2 * 0.5),
  };
}

interface Camera {
  rotY: number;
  rotX: number;
  scale: number;
  perspective: number;
  cx: number;
  cy: number;
}