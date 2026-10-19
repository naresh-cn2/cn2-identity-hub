"use client";

import { useEffect, useRef } from "react";

/**
 * CinematicLayers — realistic, connected lighting + atmosphere over the hero.
 *
 * The hero is a single flattened image, so the character / smoke / portal are
 * not separable objects. This component therefore enhances the EXISTING light
 * sources rather than washing the frame:
 *
 *  - The portal is treated as the primary light. A breathing blue-white halo
 *    (CSS) plus a portal-centred ambient (CSS) light the surrounding smoke,
 *    floor and nearby network — never the screen edges.
 *  - A single <canvas> drives every continuous effect in ONE rAF loop:
 *    drifting smoke puffs (pre-rendered soft sprites) around the portal, the
 *    dust field, network node illumination + travelling pulses, floor
 *    reflections (blue near the portal, red under red signals), a restrained
 *    character rim shimmer, and cursor ripples.
 *  - Typography gains depth WITHOUT duplicating glyphs: a blend-mode specular
 *    sweep + portal reflection (CSS) only brighten the already-bright letters,
 *    so no second copy of the text is drawn.
 *
 * The character is NOT deformed or moved — only drifting smoke and a gentle
 * rim highlight interact with it, preserving the original silhouette.
 *
 * Accessibility & performance: every layer is aria-hidden + pointer-events:none
 * (navbar/search/theme/ENTER stay clickable); prefers-reduced-motion renders a
 * single static frame; counts drop and DPR is capped on mobile; the loop pauses
 * when the tab is hidden; canvas colours adapt so light mode reads as icy
 * blue-grey rather than washed-out white.
 */
export default function CinematicLayers() {
  // The home page is dark-only by design — the light-mode treatment caused
  // artifacts over the baked-in hero image, so the cinematic layers always
  // render in dark mode here. Other routes keep both themes.
  const light = false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    // ---------- artwork anchors (image-space, measured from the banner) ----------
    // public/images/cn2-hero-portal.png is 2048×768 (2.667:1). Coordinates are
    // fractions OF THE IMAGE (grid-overlay measurement of the artwork) and are
    // mapped to container space by fit(), so every effect tracks the artwork
    // regardless of viewport aspect or cover/contain fit — mirroring the exact
    // background-size/position math in globals.css (.cn2-hero-bg).
    const IMG_A = 2048 / 768;
    const COVER_MIN_A = 1.16; // must match the CSS 29/25 breakpoint in globals.css
    const A_TEXT = { x0: 0.285, y0: 0.395, x1: 0.505, y1: 0.585 };
    const A_PORTAL = { x: 0.6, y: 0.47 };
    const A_FLOOR = 0.661;
    const A_POOL = 0.8;

    interface NetNode { ix: number; iy: number; x: number; y: number; red: boolean; phase: number; period: number }

    let fit: (ix: number, iy: number) => [number, number] = (ix, iy) => [ix, iy];
    let nodesRef: NetNode[] | null = null;
    const portal = { x: A_PORTAL.x, y: A_PORTAL.y };
    let floorY = A_FLOOR;
    let poolY = A_POOL;
    let bottomY = 1;
    const textBox = { x0: A_TEXT.x0, y0: A_TEXT.y0, x1: A_TEXT.x1, y1: A_TEXT.y1 };
    const rippleZone = { x0: 0.26, y0: 0.2, x1: 0.72, y1: 0.64 };

    const setVar = (k: string, v: string) => document.documentElement.style.setProperty(k, v);

    const mapAll = () => {
      const pm = fit(A_PORTAL.x, A_PORTAL.y);
      portal.x = pm[0];
      portal.y = pm[1];
      floorY = fit(0.5, A_FLOOR)[1];
      poolY = fit(0.5, A_POOL)[1];
      bottomY = fit(0.5, 1)[1];
      const [tx0, ty0] = fit(A_TEXT.x0, A_TEXT.y0);
      const [tx1, ty1] = fit(A_TEXT.x1, A_TEXT.y1);
      textBox.x0 = Math.min(tx0, tx1);
      textBox.y0 = Math.min(ty0, ty1);
      textBox.x1 = Math.max(tx0, tx1);
      textBox.y1 = Math.max(ty0, ty1);
      rippleZone.x0 = Math.min(textBox.x0, portal.x - 0.1) - 0.02;
      rippleZone.x1 = Math.max(textBox.x1, portal.x + 0.1) + 0.02;
      rippleZone.y0 = Math.min(textBox.y0, portal.y - 0.18) - 0.02;
      rippleZone.y1 = Math.max(textBox.y1, portal.y + 0.18) + 0.02;
      if (nodesRef) {
        for (const n of nodesRef) {
          const [nx, ny] = fit(n.ix, n.iy);
          n.x = nx;
          n.y = ny;
        }
      }
      // DOM layers (portal halo, text sweep/tint, floor pool) share the anchors
      setVar("--cn2-portal-x", `${(portal.x * 100).toFixed(2)}%`);
      setVar("--cn2-portal-y", `${(portal.y * 100).toFixed(2)}%`);
      setVar("--cn2-text-x", `${(textBox.x0 * 100).toFixed(2)}%`);
      setVar("--cn2-text-y", `${(textBox.y0 * 100).toFixed(2)}%`);
      setVar("--cn2-text-w", `${((textBox.x1 - textBox.x0) * 100).toFixed(2)}%`);
      setVar("--cn2-text-h", `${((textBox.y1 - textBox.y0) * 100).toFixed(2)}%`);
    };

    // ---------- sizing (positions stored relative, scaled at draw) ----------
    let w = 0;
    let h = 0;
    let sc = 1; // scale factor for px-sized features
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      sc = Math.min(w, h) / 900;
      const A = w / h;
      if (A <= COVER_MIN_A) {
        // portrait/tablet: CSS switches .cn2-hero-bg to background-size: contain
        const m = A / IMG_A;
        fit = (ix, iy) => [ix, 0.5 * (1 - m) + iy * m];
      } else if (A <= IMG_A) {
        // landscape: cover, height-bound (background-position-x 45%)
        const k = IMG_A / A;
        fit = (ix, iy) => [ix * k - 0.45 * (k - 1), iy];
      } else {
        // ultra-wide: cover, width-bound (background-position-y 42%)
        const g = IMG_A / A;
        fit = (ix, iy) => [ix, iy * g + 0.42 * (1 - g)];
      }
      mapAll();
      // Higher DPR cap for 8K-resolution feel — sharper smoke, crisper particles
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---------- soft radial sprites (reused -> cheap draws) ----------
    const makeSprite = (r: number, g: number, b: number, peak: number) => {
      const size = 128;
      const s = document.createElement("canvas");
      s.width = size;
      s.height = size;
      const sctx = s.getContext("2d");
      if (!sctx) return s;
      const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, `rgba(${r},${g},${b},${peak})`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},${peak * 0.35})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, size, size);
      return s;
    };
    const spriteBlue = makeSprite(150, 200, 255, 0.55);
    const spriteWhite = makeSprite(228, 242, 255, 0.5);
    const spriteRed = makeSprite(255, 80, 60, 0.5);

    // ---------- drifting smoke puffs (concentrated around the portal) ----------
    // Enhanced: more puffs, strong light-reactive alpha, volumetric depth layers
    interface Puff { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number; curl: number; white: boolean; depth: number; lightResp: number }
    const PUFFS = reduced ? 0 : small ? 16 : 40;
    const puffs: Puff[] = [];
    for (let i = 0; i < PUFFS; i++) {
      const floorBias = Math.random() < 0.4;
      const depth = 0.3 + Math.random() * 0.7; // 0=far, 1=near
      puffs.push({
        x: 0.42 + Math.random() * 0.4,
        y: floorBias ? 0.68 + Math.random() * 0.22 : 0.3 + Math.random() * 0.5,
        r: (80 + Math.random() * 160) * (0.6 + depth * 0.6),
        vx: (Math.random() - 0.5) * 0.012,
        vy: floorBias ? (Math.random() - 0.5) * 0.006 : -(0.006 + Math.random() * 0.016),
        a: 0.06 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2,
        curl: 0.008 + Math.random() * 0.02,
        white: Math.random() < 0.45,
        depth,
        lightResp: 0.6 + Math.random() * 0.4, // strong response to portal light
      });
    }

    // ---------- dust particles ----------
    interface Particle { x: number; y: number; z: number; r: number; vx: number; vy: number; red: boolean; base: number; tw: number }
    const PCOUNT = reduced ? 0 : small ? 32 : 80;
    const particles: Particle[] = [];
    for (let i = 0; i < PCOUNT; i++) {
      const z = 0.35 + Math.random() * 0.65;
      particles.push({
        x: Math.random(), y: Math.random(), z,
        r: (0.5 + Math.random() * 1.6) * z,
        vx: (Math.random() - 0.5) * 0.007 * z,
        vy: -(0.003 + Math.random() * 0.01) * z,
        red: Math.random() < 0.12,
        base: 0.18 + Math.random() * 0.4,
        tw: Math.random() * Math.PI * 2,
      });
    }

    // ---------- portal light cycling (slow cinematic on/off) ----------
    // Each state holds for 10s, so one full coming-and-going cycle takes
    // 20s — slow motion rather than a 1-2s strobe. Transitions themselves
    // ease over ~2-3s (see lerpSpeed below).
    let portalLightLevel = 1; // 0=off, 1=full on
    let portalTarget = 1;
    const PORTAL_CYCLE_PERIOD = 10000; // ms per state (10s on / 10s off)
    let lastPortalCycle = 0;

    // ---------- network nodes (measured artwork dots — image-space, mapped) ----------
    const nodeDefs: Array<[number, number, boolean]> = [
      [0.115, 0.22, true], [0.40, 0.19, true], [0.17, 0.425, true],
      [0.725, 0.42, true], [0.845, 0.55, true], [0.94, 0.175, true],
      [0.02, 0.44, false], [0.17, 0.50, false], [0.17, 0.557, false],
      [0.82, 0.44, false], [0.82, 0.555, false], [0.945, 0.50, false],
    ];
    const nodes: NetNode[] = nodeDefs.map(([ix, iy, red]) => ({
      ix, iy, x: ix, y: iy, red, phase: Math.random() * Math.PI * 2, period: 10 + Math.random() * 8,
    }));
    nodesRef = nodes;
    mapAll(); // map the initial node positions through the fit function

    // ---------- travelling pulses (pairs follow visible artwork lines) ----------
    interface NetPulse { a: number; b: number; t: number; dur: number; wait: number; red: boolean }
    const pulsePairs: Array<[number, number]> = [[2, 7], [7, 8], [9, 10], [5, 11], [4, 9], [0, 1], [1, 3]];
    const pulses: NetPulse[] = pulsePairs.map(([a, b], i) => ({
      a, b, t: Math.random(), dur: 6 + Math.random() * 4, wait: 5 + Math.random() * 5, red: i % 3 === 0,
    }));

    // ---------- cursor ripples ----------
    interface Ripple { x: number; y: number; r: number; life: number; red: boolean }
    const ripples: Ripple[] = [];

    // ---------- pointer (parallax + ripple spawn) ----------
    let px = 0;
    let py = 0;
    let lastRipple = 0;
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const rx = (e.clientX - rect.left) / rect.width;
      const ry = (e.clientY - rect.top) / rect.height;
      px = Math.max(-1, Math.min(1, rx * 2 - 1));
      py = Math.max(-1, Math.min(1, ry * 2 - 1));
      setVar("--cn2-px", px.toFixed(3));
      setVar("--cn2-py", py.toFixed(3));
      // Ripples respond inside the mapped text + portal region
      const now = performance.now();
      if (
        !reduced && ripples.length < 12 && now - lastRipple > 100 &&
        rx > rippleZone.x0 && rx < rippleZone.x1 && ry > rippleZone.y0 && ry < rippleZone.y1
      ) {
        lastRipple = now;
        ripples.push({ x: rx * w, y: ry * h, r: 6, life: 0, red: ry < portal.y });
      }
    };
    const onLeave = () => { px = 0; py = 0; setVar("--cn2-px", "0"); setVar("--cn2-py", "0"); };
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    // ---------- draw helpers ----------
    let sweepX = -0.35;

    const drawSmoke = (isDark: boolean, dt: number, t: number) => {
      ctx.globalCompositeOperation = isDark ? "screen" : "source-over";
      for (const p of puffs) {
        const nearPortal = 1 - Math.min(1, Math.abs(p.x - portal.x) / 0.28);
        const curl = Math.sin(t * 0.0004 + p.phase) * p.curl * (0.3 + nearPortal);
        p.x += (p.vx + curl) * dt * 4;
        p.y += p.vy * dt * 4;
        if (p.y < 0.14) { p.y = 0.9; p.x = 0.42 + Math.random() * 0.4; }
        if (p.x < 0.36) p.x = 0.86;
        else if (p.x > 0.88) p.x = 0.38;
        const r = p.r * sc;
        // Dramatic light-reactive: smoke blazes when portal light is on, nearly vanishes when off
        const lightBoost = 0.02 + 0.98 * portalLightLevel * p.lightResp;
        const alpha = p.a * (isDark ? 1 : 0.8) * (0.7 + 0.5 * nearPortal) * lightBoost;
        ctx.globalAlpha = Math.min(0.5, alpha);
        const sprite = p.white ? spriteWhite : spriteBlue;
        // Near-portal smoke gets strong additive illumination from portal light
        if (nearPortal > 0.2 && portalLightLevel > 0.05) {
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = Math.min(0.4, alpha * nearPortal * portalLightLevel * 2);
          ctx.drawImage(sprite, p.x * w - r, p.y * h - r, r * 2, r * 2);
          ctx.globalCompositeOperation = isDark ? "screen" : "source-over";
        }
        ctx.drawImage(sprite, p.x * w - r, p.y * h - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const drawParticles = (isDark: boolean, dt: number) => {
      for (const p of particles) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.tw += dt * 0.6;
        if (p.y < -0.01) { p.y = 1.01; p.x = Math.random(); }
        if (p.x < -0.01) p.x = 1.01; else if (p.x > 1.01) p.x = -0.01;
        const twk = 0.6 + 0.4 * Math.sin(p.tw);
        const a = p.base * twk * (isDark ? 1 : 0.5);
        const col = p.red ? (isDark ? "255,74,58" : "205,48,38") : (isDark ? "174,212,255" : "86,116,170");
        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x * w + px * 10 * p.z, p.y * h + py * 7 * p.z, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNodes = (isDark: boolean, dt: number) => {
      for (const n of nodes) {
        n.phase += dt;
        const pulse = 0.5 + 0.5 * Math.sin((n.phase / n.period) * Math.PI * 2);
        const nx = n.x * w;
        const ny = n.y * h;
        const R = (2 + 2 * pulse) * sc;
        if (isDark) {
          // additive glow halo using a reused sprite
          const halo = 0.1 + 0.28 * pulse * pulse;
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = halo;
          const hs = R * 7;
          ctx.drawImage(n.red ? spriteRed : spriteBlue, nx - hs, ny - hs, hs * 2, hs * 2);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
        }
        const core = n.red ? (isDark ? "255,90,70" : "200,46,36") : (isDark ? "180,215,255" : "80,120,180");
        const a = (isDark ? 0.5 : 0.55) * (0.5 + 0.5 * pulse);
        ctx.fillStyle = `rgba(${core},${a.toFixed(3)})`;
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
        if (pl.t >= 1) { pl.t = 0; pl.wait = 5 + Math.random() * 5; }
        const A = nodes[pl.a];
        const B = nodes[pl.b];
        const col = pl.red ? (isDark ? "255,80,60" : "200,50,40") : (isDark ? "170,210,255" : "90,130,185");
        const tail = 0.12;
        const t0 = Math.max(0, pl.t - tail);
        const x0 = (A.x + (B.x - A.x) * t0) * w;
        const y0 = (A.y + (B.y - A.y) * t0) * h;
        const x1 = (A.x + (B.x - A.x) * pl.t) * w;
        const y1 = (A.y + (B.y - A.y) * pl.t) * h;
        ctx.strokeStyle = `rgba(${col},${isDark ? 0.5 : 0.34})`;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        if (isDark) {
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = 0.8;
          const hs = 10 * sc;
          ctx.drawImage(pl.red ? spriteRed : spriteBlue, x1 - hs, y1 - hs, hs * 2, hs * 2);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.fillStyle = `rgba(${col},${isDark ? 0.9 : 0.6})`;
        ctx.beginPath(); ctx.arc(x1, y1, 1.8 * sc, 0, Math.PI * 2); ctx.fill();
      }
    };

    const drawFloor = (isDark: boolean, dt: number, t: number) => {
      const fy0 = floorY * h;
      // blue portal reflection pooled on the floor beneath the portal
      // Dramatically responsive to portal light level
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      ctx.globalAlpha = (isDark ? 0.3 : 0.2) * portalLightLevel;
      const pr = 180 * sc;
      const pulse = 0.7 + 0.3 * Math.sin(t * 0.00045);
      ctx.drawImage(spriteBlue, portal.x * w - pr, poolY * h - pr * 0.5, pr * 2, pr * pulse);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // slow moving highlight sweep across the reflective floor
      sweepX += dt * 0.05;
      if (sweepX > 1.35) sweepX = -0.35;
      const bandW = w * 0.5;
      const cx = sweepX * w;
      const g = ctx.createLinearGradient(cx - bandW / 2, 0, cx + bandW / 2, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.5, isDark ? "rgba(150,205,255,0.18)" : "rgba(120,160,215,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      // clamp the sweep to the artwork's own bottom edge (letterbox-safe)
      ctx.fillRect(cx - bandW / 2, fy0, bandW, Math.max(0, bottomY * h - fy0));

      // red reflections beneath red signals that sit above the floor
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      for (const n of nodes) {
        if (!n.red || n.iy < 0.4 || n.iy > 0.72) continue;
        const pulseR = 0.5 + 0.5 * Math.sin((n.phase / n.period) * Math.PI * 2);
        const ra = (0.06 + 0.08 * pulseR) * (isDark ? 1 : 0.7);
        ctx.globalAlpha = ra;
        const rxp = n.x * w;
        // streak length measured in image space so it never spills outside
        // the artwork strip when the banner is letterboxed (contain fit)
        const streakH = Math.max(0, (bottomY - n.y) * h * 0.5);
        if (streakH >= 2) ctx.drawImage(spriteRed, rxp - 18 * sc, n.y * h, 36 * sc, streakH);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // ---------- cursor ripples ----------
    const drawRipples = (isDark: boolean, dt: number) => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life += dt; rp.r += dt * 46;
        const a = Math.max(0, 0.45 * (1 - rp.life / 1.1));
        if (a <= 0 || rp.life > 1.1) { ripples.splice(i, 1); continue; }
        const col = rp.red ? (isDark ? "255,80,64" : "205,55,44") : (isDark ? "210,232,255" : "110,150,205");
        const g = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.r);
        g.addColorStop(0, `rgba(${col},${(a * 0.22).toFixed(3)})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
      }
    };

    // ---------- volumetric light beams from portal (subtle, short — don't cross character) ----------
    const drawLightBeams = (isDark: boolean, t: number) => {
      if (portalLightLevel < 0.05) return;
      ctx.globalCompositeOperation = "lighter";
      const beamCount = 8;
      for (let i = 0; i < beamCount; i++) {
        const angle = (i / beamCount) * Math.PI * 2 + t * 0.0004;
        // Short beams — stay within portal area, don't reach character
        const beamLen = (0.08 + 0.04 * Math.sin(t * 0.0003 + i)) * w;
        const beamWidth = (10 + 5 * Math.sin(t * 0.0004 + i * 2)) * sc;
        const x0 = portal.x * w;
        const y0 = portal.y * h;
        const x1 = x0 + Math.cos(angle) * beamLen;
        const y1 = y0 + Math.sin(angle) * beamLen;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        const intensity = 0.08 * portalLightLevel * (0.5 + 0.5 * Math.sin(t * 0.0005 + i));
        grad.addColorStop(0, `rgba(180,220,255,${intensity.toFixed(3)})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = beamWidth;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    // ---------- portal glow halo (subtle — stays within portal ring, doesn't cross character) ----------
    const drawPortalHalo = (isDark: boolean, t: number) => {
      const breathe = 0.6 + 0.4 * Math.sin(t * 0.0005);
      const intensity = portalLightLevel * breathe;
      if (intensity < 0.02) return;
      ctx.globalCompositeOperation = "lighter";
      const cx = portal.x * w;
      const cy = portal.y * h;
      const baseR = 120 * sc;
      // Outer halo — small, stays inside portal ring
      const haloR = baseR * (1.1 + 0.2 * intensity);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      const a = 0.08 * intensity * (isDark ? 1 : 0.6);
      grad.addColorStop(0, `rgba(80,150,255,${a.toFixed(3)})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();
      // Core glow — minimal
      const coreR = baseR * 0.3 * intensity;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      const ca = 0.15 * intensity;
      coreGrad.addColorStop(0, `rgba(200,230,255,${ca.toFixed(3)})`);
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const drawStatic = () => {
      const isDark = darkRef.current;
      ctx.clearRect(0, 0, w, h);
      drawPortalHalo(isDark, 0);
      drawLightBeams(isDark, 0);
      drawSmoke(isDark, 0, 0);
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      drawParticles(isDark, 0);
      ctx.globalCompositeOperation = "source-over";
      drawNodes(isDark, 0);
      drawFloor(isDark, 0, 0);
    };

    // ---------- single loop ----------
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const isDark = darkRef.current;

      // Portal light cycling — slow, cinematic transitions (~2-3s to settle)
      if (!reduced) {
        if (now - lastPortalCycle > PORTAL_CYCLE_PERIOD) {
          lastPortalCycle = now;
          portalTarget = portalTarget > 0.5 ? 0 : 1;
        }
        // Gentle interpolation: tau = 2s, so the fade reads as slow motion
        const lerpSpeed = dt * 0.5;
        portalLightLevel += (portalTarget - portalLightLevel) * lerpSpeed;
      }

      ctx.clearRect(0, 0, w, h);
      drawPortalHalo(isDark, now);
      drawLightBeams(isDark, now);
      drawSmoke(isDark, dt, now);
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      drawParticles(isDark, dt);
      ctx.globalCompositeOperation = "source-over";
      drawNodes(isDark, dt);
      drawPulses(isDark, dt);
      drawFloor(isDark, dt, now);
      drawRipples(isDark, dt);
    };

    if (reduced) drawStatic();
    else raf = requestAnimationFrame(loop);

    // pause when the tab is hidden OR the hero is fully scrolled out of view
    let heroVisible = true;
    const onVis = () => {
      if (reduced) return;
      const shouldRun = !document.hidden && heroVisible;
      if (!shouldRun) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      onVis();
    }, { threshold: 0 });
    io.observe(wrap);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (!reduced) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      }
    };
  }, []);

  return (
    <div ref={wrapRef} className={`cn2-cinematic ${light ? "is-light" : "is-dark"}`} aria-hidden="true">
      {/* portal-centred ambient (replaces the old edge wash) */}
      <div className="cn2-ambient-glow" />
      <div className="cn2-vignette" />
      <div className="cn2-floor-glow" />
      {/* typography depth — blend modes only brighten the existing letters */}
      <div className="cn2-text-tint" />
      <div className="cn2-text-shimmer" />
      <div className="cn2-portal-glow">
        <div className="cn2-portal-glow-core" />
      </div>
      <canvas ref={canvasRef} className="cn2-fx-canvas" />
    </div>
  );
}
