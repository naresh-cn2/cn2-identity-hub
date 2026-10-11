"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * CinematicLayers — ambient, theme-aware motion for the homepage hero.
 *
 * The hero is a single flattened image, so the character / smoke / portal are
 * not independent objects. Instead this component layers LIGHT and MOTION on
 * top of the existing image so the scene feels alive without redrawing it:
 *
 *  - CSS layers (theme wash, vignette, portal glow, floor light) cross-fade
 *    smoothly when the theme toggles. They never use an aggressive filter, so
 *    the baked-in wordmark, character and portal stay intact.
 *  - A single <canvas> runs ONE requestAnimationFrame loop that draws all the
 *    particle / network-pulse / floor-sweep / cursor-ripple effects together
 *    (no per-particle loops or per-effect timers).
 *
 * Accessibility & performance:
 *  - Every layer is aria-hidden and pointer-events:none, so the navbar, search,
 *    theme toggle and ENTER button stay fully clickable / focusable.
 *  - Honours prefers-reduced-motion (renders a single static frame, no loop).
 *  - Fewer particles + lower DPR on small screens; loop pauses when the tab is
 *    hidden. Canvas colours adapt to the active theme so light mode reads as
 *    icy blue-grey rather than washed-out white.
 */
export default function CinematicLayers() {
  const { theme } = useTheme();
  const light = theme === "light";
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(true);

  useEffect(() => {
    darkRef.current = theme === "dark";
  }, [theme]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    // ---------- sizing ----------
    let w = 0;
    let h = 0;
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
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---------- particles ----------
    interface Particle {
      x: number; y: number; z: number; r: number;
      vx: number; vy: number; red: boolean; base: number; tw: number;
    }
    const PCOUNT = reduced ? 0 : small ? 20 : 52;
    const particles: Particle[] = [];
    for (let i = 0; i < PCOUNT; i++) {
      const z = 0.35 + Math.random() * 0.65;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        r: (0.5 + Math.random() * 1.7) * z,
        vx: (Math.random() - 0.5) * 6 * z,
        vy: -(2 + Math.random() * 8) * z,
        red: Math.random() < 0.12,
        base: 0.18 + Math.random() * 0.4,
        tw: Math.random() * Math.PI * 2,
      });
    }

    // ---------- network nodes (approx. positions over the baked grid) ----------
    interface NetNode { x: number; y: number; red: boolean; phase: number; period: number }
    const nodeDefs: Array<[number, number, boolean]> = [
      [0.31, 0.205, true], [0.945, 0.398, true], [0.885, 0.622, true],
      [0.055, 0.445, true], [0.13, 0.707, true], [0.545, 0.63, true],
      [0.63, 0.345, false], [0.575, 0.425, false], [0.47, 0.51, false],
      [0.78, 0.28, false], [0.22, 0.33, false], [0.7, 0.66, false],
    ];
    const nodes: NetNode[] = nodeDefs.map(([x, y, red]) => ({
      x, y, red, phase: Math.random() * Math.PI * 2, period: 2.6 + Math.random() * 3.4,
    }));

    // ---------- travelling pulses between node pairs ----------
    interface NetPulse { a: number; b: number; t: number; dur: number; wait: number; red: boolean }
    const pulsePairs: Array<[number, number]> = [
      [0, 5], [1, 11], [2, 7], [3, 8], [4, 9], [6, 10], [7, 11],
    ];
    const pulses: NetPulse[] = pulsePairs.map(([a, b], i) => ({
      a, b, t: Math.random(), dur: 2.2 + Math.random() * 2.6,
      wait: Math.random() * 4, red: i % 3 === 0,
    }));

    // ---------- cursor ripples over the baked typography ----------
    interface Ripple { x: number; y: number; r: number; life: number; red: boolean }
    const ripples: Ripple[] = [];

    // ---------- pointer (parallax + ripple spawn) ----------
    let px = 0;
    let py = 0;
    let lastRipple = 0;
    const setVar = (v: string) => {
      document.documentElement.style.setProperty("--cn2-px", v);
    };
    const setVarY = (v: string) => {
      document.documentElement.style.setProperty("--cn2-py", v);
    };
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const rx = (e.clientX - rect.left) / rect.width;
      const ry = (e.clientY - rect.top) / rect.height;
      px = Math.max(-1, Math.min(1, rx * 2 - 1));
      py = Math.max(-1, Math.min(1, ry * 2 - 1));
      setVar(px.toFixed(3));
      setVarY(py.toFixed(3));
      const now = performance.now();
      if (
        !reduced && ripples.length < 14 && now - lastRipple > 90 &&
        rx > 0.06 && rx < 0.52 && ry > 0.34 && ry < 0.62
      ) {
        lastRipple = now;
        // white wordmark band -> restrained red highlight; red lettering -> cool highlight
        ripples.push({ x: rx * w, y: ry * h, r: 6, life: 0, red: ry < 0.465 });
      }
    };
    const onLeave = () => {
      px = 0; py = 0; setVar("0"); setVarY("0");
    };
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    // ---------- render helpers ----------
    let sweepX = -0.35;
    let redT = 0;

    const drawParticles = (isDark: boolean, dt: number) => {
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.tw += dt * 1.4;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        else if (p.x > w + 8) p.x = -8;
        const twk = 0.6 + 0.4 * Math.sin(p.tw);
        const a = p.base * twk * (isDark ? 1 : 0.5);
        const col = p.red
          ? (isDark ? "255,74,58" : "205,48,38")
          : (isDark ? "174,212,255" : "86,116,170");
        const ox = px * 10 * p.z;
        const oy = py * 7 * p.z;
        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNodes = (isDark: boolean, dt: number) => {
      for (const n of nodes) {
        n.phase += dt;
        const pulse = 0.5 + 0.5 * Math.sin((n.phase / n.period) * Math.PI * 2);
        const a = (0.12 + 0.4 * pulse * pulse) * (isDark ? 1 : 0.75);
        const R = 1.6 + 1.6 * pulse;
        const col = n.red
          ? (isDark ? "255,70,54" : "200,46,36")
          : (isDark ? "150,200,255" : "80,120,180");
        const nx = n.x * w;
        const ny = n.y * h;
        if (isDark && a > 0.14) {
          const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, R * 6);
          g.addColorStop(0, `rgba(${col},${(a * 0.5).toFixed(3)})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(nx, ny, R * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(nx, ny, R, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawPulses = (isDark: boolean, dt: number) => {
      ctx.lineWidth = 1;
      for (const pl of pulses) {
        if (pl.wait > 0) { pl.wait -= dt; continue; }
        pl.t += dt / pl.dur;
        if (pl.t >= 1) { pl.t = 0; pl.wait = 1.5 + Math.random() * 4; }
        const A = nodes[pl.a];
        const B = nodes[pl.b];
        const col = pl.red
          ? (isDark ? "255,80,60" : "200,50,40")
          : (isDark ? "170,210,255" : "90,130,185");
        const tail = 0.12;
        const t0 = Math.max(0, pl.t - tail);
        ctx.strokeStyle = `rgba(${col},${isDark ? 0.5 : 0.34})`;
        ctx.beginPath();
        ctx.moveTo((A.x + (B.x - A.x) * t0) * w, (A.y + (B.y - A.y) * t0) * h);
        ctx.lineTo((A.x + (B.x - A.x) * pl.t) * w, (A.y + (B.y - A.y) * pl.t) * h);
        ctx.stroke();
        ctx.fillStyle = `rgba(${col},${isDark ? 0.9 : 0.6})`;
        ctx.beginPath();
        ctx.arc((A.x + (B.x - A.x) * pl.t) * w, (A.y + (B.y - A.y) * pl.t) * h, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFloor = (isDark: boolean, dt: number) => {
      sweepX += dt * 0.055;
      if (sweepX > 1.35) sweepX = -0.35;
      const fy0 = h * 0.7;
      const bandW = w * 0.5;
      const cx = sweepX * w;
      const inten = isDark ? 0.14 : 0.1;
      const g = ctx.createLinearGradient(cx - bandW / 2, 0, cx + bandW / 2, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.5, isDark ? `rgba(150,205,255,${inten})` : `rgba(120,160,215,${inten})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(cx - bandW / 2, fy0, bandW, h - fy0);

      // occasional restrained red reflection streak near the character
      redT += dt * 0.5;
      const ra = (0.05 + 0.05 * (0.5 + 0.5 * Math.sin(redT))) * (isDark ? 1 : 0.7);
      const rxp = w * 0.56;
      const rg = ctx.createLinearGradient(rxp - 26, 0, rxp + 26, 0);
      rg.addColorStop(0, "rgba(0,0,0,0)");
      rg.addColorStop(0.5, `rgba(255,70,54,${ra.toFixed(3)})`);
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(rxp - 26, fy0, 52, h - fy0);
    };

    const drawRipples = (isDark: boolean, dt: number) => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life += dt;
        rp.r += dt * 46;
        const a = Math.max(0, 0.5 * (1 - rp.life / 1.1));
        if (a <= 0 || rp.life > 1.1) { ripples.splice(i, 1); continue; }
        const col = rp.red
          ? (isDark ? "255,80,64" : "205,55,44")
          : (isDark ? "210,232,255" : "110,150,205");
        const g = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.r);
        g.addColorStop(0, `rgba(${col},${(a * 0.25).toFixed(3)})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawStatic = () => {
      const isDark = darkRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      drawParticles(isDark, 0);
      drawNodes(isDark, 0);
    };

    // ---------- loop ----------
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const isDark = darkRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      drawParticles(isDark, dt);
      drawNodes(isDark, dt);
      drawPulses(isDark, dt);
      drawFloor(isDark, dt);
      ctx.globalCompositeOperation = "source-over";
      drawRipples(isDark, dt);
    };

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => {
      if (reduced) return;
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (!reduced) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`cn2-cinematic ${light ? "is-light" : "is-dark"}`}
      aria-hidden="true"
    >
      <div className="cn2-ambient-wash" />
      <div className="cn2-vignette" />
      <div className="cn2-floor-light" />
      <div className="cn2-portal-glow">
        <div className="cn2-portal-glow-core" />
      </div>
      <canvas ref={canvasRef} className="cn2-fx-canvas" />
    </div>
  );
}
