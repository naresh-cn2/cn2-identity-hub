"use client";

import React, { useEffect, useRef } from "react";

/**
 * QuantitativeUniverse — A 100% code-generated 3D mathematical environment.
 *
 * Replaces photographic background images with a real-time, interactive,
 * mathematical universe tailored specifically for a Quantitative Developer:
 *
 * 1. 3D Parametric Implied Volatility Surface:
 *    Renders the classic financial volatility smile / bivariate probability density
 *    using pure 3D perspective projection and undulating wave harmonics.
 *
 * 2. 3D Receding Horizon & Depth Grid:
 *    A mathematical coordinate plane extending into the distance with perspective fog.
 *
 * 3. Stochastic Brownian Particles:
 *    Particles simulating Geometric Brownian Motion and market flow with cyan,
 *    ice-blue, and signature crimson anomaly pulses.
 *
 * 4. Coordinate Axes & Mathematical Ticks:
 *    Spatial axes for Volatility (σ), Moneyness (K/S), and Maturity (τ).
 *
 * 5. Hardware-Accelerated & Accessible:
 *    Zero external dependencies, rAF-managed single canvas loop, pauses when hidden,
 *    supports high-DPI (Retina/4K), and respects prefers-reduced-motion.
 */
export default function QuantitativeUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Viewport & Scale State
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Camera & Perspective Projection
    const focalLength = 750;
    const cameraDist = 850;
    let rotX = 0.32; // Pitch angle (looking slightly down)
    let rotY = -0.38; // Yaw angle (viewing from side-angle)
    let targetRotX = rotX;
    let targetRotY = rotY;

    // Surface Parameters (Implied Volatility / Bivariate Gaussian Surface)
    const gridResU = 34; // Resolution along moneyness (strike)
    const gridResV = 28; // Resolution along maturity (time)
    const surfaceScaleX = 420;
    const surfaceScaleZ = 360;
    const surfaceAmplitude = 140;

    // Stochastic Particles
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      colorType: "cyan" | "ice" | "crimson";
      alpha: number;
      phase: number;
    }

    const particleCount = window.innerWidth < 768 ? 65 : 160;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCrimson = Math.random() < 0.12;
      const isIce = Math.random() < 0.35;
      particles.push({
        x: (Math.random() - 0.5) * 1100,
        y: (Math.random() - 0.5) * 500 - 40,
        z: (Math.random() - 0.5) * 900,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35 - 0.1,
        vz: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.2 + 0.8,
        colorType: isCrimson ? "crimson" : isIce ? "ice" : "cyan",
        alpha: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 3D Perspective Projection Matrix
    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      // Rotate around X (pitch)
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z1 = z * cosX + y * sinX;

      // Rotate around Y (yaw)
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x2 = x * cosY + z1 * sinY;
      const z2 = z1 * cosY - x * sinY;

      // Perspective divide
      const depth = cameraDist + z2;
      if (depth <= 20) return null; // Behind camera clipping

      const scale = focalLength / depth;
      return {
        px: cx + x2 * scale,
        py: cy - y1 * scale,
        scale,
        depth: z2,
      };
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer Interaction (Silky Smooth Parallax)
    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = -0.38 + nx * 0.16;
      targetRotX = 0.32 - ny * 0.12;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Mathematical Surface Elevation Function
    // Computes Black-Scholes Volatility Smile + Gaussian Probability Density
    const getSurfaceHeight = (u: number, v: number, time: number) => {
      // u: moneyness (K/S - 1), v: maturity time (T)
      const rSq = u * u + v * v;
      // Gaussian probability bell
      const bell = Math.exp(-rSq * 1.5) * 1.25;
      // Volatility smile curvature (parabolic wings at out-of-the-money / in-the-money)
      const smile = 0.55 * u * u * (1.0 + 0.35 * v);
      // Continuous stochastic wave harmonics
      const harmonic1 = Math.sin(u * 2.8 + time * 0.75) * Math.cos(v * 2.4 + time * 0.6) * 0.14;
      const harmonic2 = Math.cos(u * 4.2 - time * 0.9) * 0.06;

      return (bell + smile + harmonic1 + harmonic2) * surfaceAmplitude;
    };

    let animationId: number;
    let startTime = performance.now();
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !reducedMotion) {
        startTime = performance.now();
        animationId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Main Render Loop
    const render = (now: number) => {
      if (!isTabVisible) return;

      const elapsed = (now - startTime) * 0.001;

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Clear with dark transparent depth
      ctx.clearRect(0, 0, width, height);

      // Center offset: Place surface slightly right & center-down to leave hero typography breathing room
      const isMobile = width < 768;
      const isTablet = width < 1024;
      const centerOffsetX = isMobile ? width * 0.5 : isTablet ? width * 0.62 : width * 0.66;
      const centerOffsetY = isMobile ? height * 0.58 : height * 0.52;

      // -------------------------------------------------------------
      // 1. Atmospheric Ambient Radial Glow (Behind the Math Surface)
      // -------------------------------------------------------------
      const glowGrad = ctx.createRadialGradient(
        centerOffsetX,
        centerOffsetY - 30,
        10,
        centerOffsetX,
        centerOffsetY - 30,
        Math.max(width, height) * 0.55
      );
      glowGrad.addColorStop(0, "rgba(0, 240, 255, 0.16)");
      glowGrad.addColorStop(0.25, "rgba(14, 116, 244, 0.09)");
      glowGrad.addColorStop(0.6, "rgba(255, 42, 31, 0.025)");
      glowGrad.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 2. 3D Perspective Floor Grid (Vanishing to Horizon)
      // -------------------------------------------------------------
      const floorY = 160; // Coordinate below surface
      const floorSize = 900;
      const floorSteps = 16;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.065)";

      // Longitudinal lines
      for (let i = -floorSteps / 2; i <= floorSteps / 2; i++) {
        const xCoord = (i / (floorSteps / 2)) * floorSize;
        const pStart = project(xCoord, -floorY, -floorSize, centerOffsetX, centerOffsetY);
        const pEnd = project(xCoord, -floorY, floorSize, centerOffsetX, centerOffsetY);
        if (pStart && pEnd) {
          ctx.beginPath();
          ctx.moveTo(pStart.px, pStart.py);
          ctx.lineTo(pEnd.px, pEnd.py);
          ctx.stroke();
        }
      }

      // Transverse lines
      for (let j = -floorSteps / 2; j <= floorSteps / 2; j++) {
        const zCoord = (j / (floorSteps / 2)) * floorSize;
        const pStart = project(-floorSize, -floorY, zCoord, centerOffsetX, centerOffsetY);
        const pEnd = project(floorSize, -floorY, zCoord, centerOffsetX, centerOffsetY);
        if (pStart && pEnd) {
          // Fade as it recedes into depth
          const depthAlpha = Math.max(0, 0.09 * (1 - (zCoord + floorSize) / (2 * floorSize)));
          ctx.strokeStyle = `rgba(0, 240, 255, ${depthAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pStart.px, pStart.py);
          ctx.lineTo(pEnd.px, pEnd.py);
          ctx.stroke();
        }
      }

      // -------------------------------------------------------------
      // 3. 3D Parametric Implied Volatility Surface
      // -------------------------------------------------------------
      // Compute 3D points
      interface ProjectedPoint {
        px: number;
        py: number;
        heightRatio: number;
        depth: number;
      }

      const gridPoints: (ProjectedPoint | null)[][] = [];

      for (let i = 0; i < gridResU; i++) {
        gridPoints[i] = [];
        const u = (i / (gridResU - 1) - 0.5) * 2; // -1 to 1
        const x = u * surfaceScaleX;

        for (let j = 0; j < gridResV; j++) {
          const v = (j / (gridResV - 1) - 0.5) * 2; // -1 to 1
          const z = v * surfaceScaleZ;
          const y = getSurfaceHeight(u, v, elapsed);

          const proj = project(x, y, z, centerOffsetX, centerOffsetY);
          if (proj) {
            gridPoints[i][j] = {
              px: proj.px,
              py: proj.py,
              heightRatio: y / surfaceAmplitude,
              depth: proj.depth,
            };
          } else {
            gridPoints[i][j] = null;
          }
        }
      }

      // Draw wireframe grid along U direction (Moneyness curves)
      for (let i = 0; i < gridResU; i++) {
        ctx.beginPath();
        let drawing = false;

        for (let j = 0; j < gridResV; j++) {
          const pt = gridPoints[i][j];
          if (!pt) {
            drawing = false;
            continue;
          }

          if (!drawing) {
            ctx.moveTo(pt.px, pt.py);
            drawing = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }

        // Highlight central strike curve with brighter cyan, outer wings with deep blue
        const uNorm = Math.abs(i / (gridResU - 1) - 0.5) * 2;
        const lineAlpha = (0.42 - uNorm * 0.22).toFixed(3);
        const strokeColor =
          i === Math.floor(gridResU / 2)
            ? "rgba(255, 42, 31, 0.75)" // Signature Crimson at At-The-Money (K = S)
            : `rgba(0, 240, 255, ${lineAlpha})`;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = i === Math.floor(gridResU / 2) ? 1.8 : 1.1;
        ctx.stroke();
      }

      // Draw wireframe grid along V direction (Term structure / Maturity curves)
      for (let j = 0; j < gridResV; j++) {
        ctx.beginPath();
        let drawing = false;

        for (let i = 0; i < gridResU; i++) {
          const pt = gridPoints[i][j];
          if (!pt) {
            drawing = false;
            continue;
          }

          if (!drawing) {
            ctx.moveTo(pt.px, pt.py);
            drawing = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }

        const vNorm = j / (gridResV - 1);
        const lineAlpha = (0.28 - vNorm * 0.12).toFixed(3);
        ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Peak vertices highlights (Sparkling nodal intersections)
      for (let i = 0; i < gridResU; i += 2) {
        for (let j = 0; j < gridResV; j += 2) {
          const pt = gridPoints[i][j];
          if (!pt) continue;

          if (pt.heightRatio > 0.65) {
            const glow = (pt.heightRatio - 0.65) / 0.35;
            ctx.fillStyle = `rgba(228, 242, 255, ${(glow * 0.85).toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // -------------------------------------------------------------
      // 4. Mathematical Coordinate Axes & Ticks
      // -------------------------------------------------------------
      // Origin and axis endpoints
      const pOrigin = project(-surfaceScaleX * 0.52, -20, surfaceScaleZ * 0.52, centerOffsetX, centerOffsetY);
      const pAxisK = project(surfaceScaleX * 0.56, -20, surfaceScaleZ * 0.52, centerOffsetX, centerOffsetY); // Moneyness (Strike)
      const pAxisT = project(-surfaceScaleX * 0.52, -20, -surfaceScaleZ * 0.56, centerOffsetX, centerOffsetY); // Maturity (Time)
      const pAxisVol = project(-surfaceScaleX * 0.52, surfaceAmplitude * 1.15, surfaceScaleZ * 0.52, centerOffsetX, centerOffsetY); // Volatility

      if (pOrigin && pAxisK && pAxisT && pAxisVol) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(0, 240, 255, 0.45)";

        // Draw Moneyness Axis
        ctx.beginPath();
        ctx.moveTo(pOrigin.px, pOrigin.py);
        ctx.lineTo(pAxisK.px, pAxisK.py);
        ctx.stroke();

        // Draw Maturity Axis
        ctx.beginPath();
        ctx.moveTo(pOrigin.px, pOrigin.py);
        ctx.lineTo(pAxisT.px, pAxisT.py);
        ctx.stroke();

        // Draw Volatility Vertical Axis
        ctx.strokeStyle = "rgba(255, 42, 31, 0.6)"; // Red signal on Vol axis
        ctx.beginPath();
        ctx.moveTo(pOrigin.px, pOrigin.py);
        ctx.lineTo(pAxisVol.px, pAxisVol.py);
        ctx.stroke();

        // Axis Mathematical Labels
        ctx.font = "10px ui-monospace, 'SF Mono', monospace";
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
        ctx.fillText("K / S (Moneyness) →", pAxisK.px + 8, pAxisK.py + 4);

        ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
        ctx.fillText("τ (Maturity) →", pAxisT.px - 15, pAxisT.py - 10);

        ctx.fillStyle = "rgba(255, 80, 70, 0.9)";
        ctx.fillText("σ_iv (Vol Surface) ↑", pAxisVol.px - 20, pAxisVol.py - 10);
      }

      // -------------------------------------------------------------
      // 5. Stochastic Brownian Motion Particles (Market Trajectories)
      // -------------------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          // Geometric Brownian Motion step
          p.x += p.vx + (Math.random() - 0.5) * 0.4;
          p.y += p.vy + (Math.random() - 0.5) * 0.35;
          p.z += p.vz + (Math.random() - 0.5) * 0.4;

          // Boundary wraps
          if (p.x > 600) p.x = -600;
          if (p.x < -600) p.x = 600;
          if (p.y > 300) p.y = -300;
          if (p.y < -300) p.y = 300;
          if (p.z > 500) p.z = -500;
          if (p.z < -500) p.z = 500;
        }

        const proj = project(p.x, p.y, p.z, centerOffsetX, centerOffsetY);
        if (!proj) continue;

        const pulse = Math.sin(elapsed * 2.5 + p.phase) * 0.25 + 0.75;
        const finalAlpha = Math.min(1, p.alpha * pulse * proj.scale);

        let color = "rgba(0, 240, 255, ";
        if (p.colorType === "crimson") color = "rgba(255, 48, 48, ";
        else if (p.colorType === "ice") color = "rgba(228, 242, 255, ";

        ctx.fillStyle = `${color}${finalAlpha.toFixed(3)})`;
        ctx.beginPath();
        const rad = Math.max(0.6, p.size * proj.scale);
        ctx.arc(proj.px, proj.py, rad, 0, Math.PI * 2);
        ctx.fill();

        // Subtle bloom around crimson & bright cyan points
        if (p.colorType === "crimson" || rad > 1.8) {
          ctx.fillStyle = `${color}${(finalAlpha * 0.22).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, rad * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render(0);
    } else {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

