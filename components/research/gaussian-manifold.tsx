"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * GaussianManifold — 3D Gaussian Probability Density Surface & Brownian Motion.
 *
 * Cinematic quantitative research visual:
 * - 3D wireframe bell manifold: z = A * exp(-(x^2 + y^2)/(2*sigma^2))
 * - Perspective coordinate floor grid
 * - Statistical confidence intervals (-2sigma, -1sigma, mu, +1sigma, +2sigma)
 * - Stochastic Brownian walk particles streaming through the density peak
 * - Deterministic, theme-aware, 60fps, paused when off-screen.
 */
export default function GaussianManifold({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mode = theme === "light" ? "light" : "dark";

    const cyan = mode === "light" ? [27, 77, 201] : [111, 150, 242];
    const red = mode === "light" ? [200, 36, 24] : [233, 64, 48];
    const bright = mode === "light" ? [21, 25, 34] : [214, 230, 255];
    const dim = mode === "light" ? 0.75 : 1.0;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t0 = 0;
    let visible = true;

    // Stochastic particles
    const P_COUNT = 24;
    const particles = Array.from({ length: P_COUNT }, (_, i) => ({
      x: (i / P_COUNT) * 2 - 1,
      y: (Math.sin(i * 1.7) * 0.8),
      speed: 0.15 + (i % 5) * 0.05,
      flash: i % 4 === 0,
    }));

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

    const render = (now: number) => {
      if (!t0) t0 = now;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.58;

      // Projection angles
      const yaw = Math.PI / 4 + Math.sin(t * 0.15) * 0.08;
      const pitch = 0.52 + Math.cos(t * 0.12) * 0.04;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const scaleX = w * 0.38;
      const scaleY = h * 0.28;
      const peakH = h * 0.44;

      const project = (gx: number, gy: number, gz: number) => {
        // Yaw
        const x1 = gx * cosY - gy * sinY;
        const y1 = gx * sinY + gy * cosY;
        // Pitch
        const y2 = y1 * cosP - gz * sinP;
        const z2 = y1 * sinP + gz * cosP;
        const pScale = 1 / (1 + z2 * 0.3);
        return {
          px: cx + x1 * scaleX * pScale,
          py: cy + y2 * scaleY * pScale - gz * peakH * pScale,
          pScale,
        };
      };

      // 1. Perspective Base Grid
      ctx.lineWidth = 1;
      const GRID_N = 12;
      for (let i = -GRID_N; i <= GRID_N; i += 2) {
        const u = i / GRID_N;
        const p1 = project(u, -1, 0);
        const p2 = project(u, 1, 0);
        ctx.strokeStyle = `rgba(${cyan[0]},${cyan[1]},${cyan[2]},${(0.12 * dim).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(-1, u, 0);
        const p4 = project(1, u, 0);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // 2. 3D Gaussian Bell Curve Manifold
      const STEPS = 20;
      const pts: { px: number; py: number; z: number }[][] = [];

      for (let i = 0; i <= STEPS; i++) {
        const row: { px: number; py: number; z: number }[] = [];
        const u = (i / STEPS) * 2 - 1; // -1 .. 1
        for (let j = 0; j <= STEPS; j++) {
          const v = (j / STEPS) * 2 - 1; // -1 .. 1
          const r2 = u * u + v * v;
          // Gaussian bell distribution with gentle breath
          const breathe = 1 + 0.05 * Math.sin(t * 1.4 + u * 2);
          const z = Math.exp(-r2 * 2.8) * breathe;
          const pt = project(u, v, z);
          row.push({ ...pt, z });
        }
        pts.push(row);
      }

      // Draw wireframe grid lines along U
      for (let i = 0; i <= STEPS; i++) {
        ctx.beginPath();
        for (let j = 0; j <= STEPS; j++) {
          const pt = pts[i][j];
          if (j === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        const midZ = pts[i][Math.floor(STEPS / 2)].z;
        const alpha = (0.15 + midZ * 0.65) * dim;
        ctx.strokeStyle = `rgba(${cyan[0]},${cyan[1]},${cyan[2]},${alpha.toFixed(3)})`;
        ctx.lineWidth = midZ > 0.5 ? 1.5 : 1;
        ctx.stroke();
      }

      // Draw wireframe grid lines along V
      for (let j = 0; j <= STEPS; j++) {
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const pt = pts[i][j];
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        const midZ = pts[Math.floor(STEPS / 2)][j].z;
        const alpha = (0.15 + midZ * 0.65) * dim;
        ctx.strokeStyle = `rgba(${cyan[0]},${cyan[1]},${cyan[2]},${alpha.toFixed(3)})`;
        ctx.lineWidth = midZ > 0.5 ? 1.5 : 1;
        ctx.stroke();
      }

      // 3. Central Peak Glow & Confidence Ring (1-sigma contour)
      const peak = project(0, 0, 1 * (1 + 0.05 * Math.sin(t * 1.4)));
      const glowGrad = ctx.createRadialGradient(peak.px, peak.py, 0, peak.px, peak.py, 70);
      glowGrad.addColorStop(0, `rgba(${bright[0]},${bright[1]},${bright[2]},${(0.55 * dim).toFixed(3)})`);
      glowGrad.addColorStop(0.3, `rgba(${cyan[0]},${cyan[1]},${cyan[2]},${(0.28 * dim).toFixed(3)})`);
      glowGrad.addColorStop(1, `rgba(${cyan[0]},${cyan[1]},${cyan[2]},0)`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(peak.px, peak.py, 70, 0, Math.PI * 2);
      ctx.fill();

      // Peak Indicator Marker
      ctx.fillStyle = `rgba(${red[0]},${red[1]},${red[2]},${(0.9 * dim).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(peak.px, peak.py, 3, 0, Math.PI * 2);
      ctx.fill();

      // 4. Stochastic Brownian Particles
      if (!reduced) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speed * 0.016;
          if (p.x > 1) p.x = -1;
          const r2 = p.x * p.x + p.y * p.y;
          const pz = Math.exp(-r2 * 2.8);
          const pos = project(p.x, p.y, pz);

          const pCol = p.flash ? red : bright;
          ctx.fillStyle = `rgba(${pCol[0]},${pCol[1]},${pCol[2]},${((p.flash ? 0.9 : 0.6) * dim).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pos.px, pos.py, p.flash ? 2.5 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. HUD Telemetry Legend
      ctx.font = "10px monospace";
      ctx.fillStyle = `rgba(${cyan[0]},${cyan[1]},${cyan[2]},${(0.6 * dim).toFixed(3)})`;
      ctx.fillText("N(μ, σ²) — PROBABILITY DENSITY MANIFOLD", 16, 24);
      ctx.fillStyle = `rgba(${bright[0]},${bright[1]},${bright[2]},${(0.4 * dim).toFixed(3)})`;
      ctx.fillText("SIMULATED · 95.4% CI", 16, 40);

      if (!reduced) {
        raf = requestAnimationFrame(render);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !raf && !reduced) {
        raf = requestAnimationFrame(render);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    raf = requestAnimationFrame(render);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [theme]);

  return (
    <div className={`relative aspect-[440/320] w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

