"use client";

import React, { useEffect, useRef } from "react";

/**
 * SystemsUniverse — 100% Coded Computational Architecture & Trajectories Canvas.
 *
 * Replaces the photographic about-cosmos.png image with a real-time, interactive,
 * mathematically grounded systems visualization:
 * - Interconnected systems nodes (Deterministic Order Flow, Statistical Inference,
 *   High-Throughput Replay, Risk Constraints).
 * - Animated trajectory pulses and flowing vectors.
 * - Deep coordinate grid perspective and responsive camera parallax.
 * - Full prefers-reduced-motion support.
 */
export default function SystemsUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    interface Node {
      x: number;
      y: number;
      z: number;
      label: string;
      sub: string;
      isPrimary?: boolean;
    }

    const nodes: Node[] = [
      { x: 0, y: -60, z: 0, label: "DECISION CORE", sub: "Deterministic Logic", isPrimary: true },
      { x: -280, y: 70, z: 80, label: "MARKET PIPELINES", sub: "Tick Ingestion & WAL" },
      { x: 280, y: 60, z: 60, label: "RISK GOVERNOR", sub: "Pre-Trade Invariants" },
      { x: -170, y: -190, z: -80, label: "QUANTITATIVE RESEARCH", sub: "Lookahead-Free Search" },
      { x: 190, y: -180, z: -70, label: "EXECUTION KERNEL", sub: "Sub-Millisecond Engine" },
      { x: 0, y: 200, z: 120, label: "EVALUATION & PROOF", sub: "Walk-Forward Verification" },
    ];

    interface Pulse {
      from: number;
      to: number;
      progress: number;
      speed: number;
      color: "signal" | "cyan";
    }

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 5], [2, 5], [3, 4], [1, 3], [2, 4]
    ];

    const pulses: Pulse[] = edges.map(([from, to], i) => ({
      from,
      to,
      progress: Math.random(),
      speed: 0.0035 + Math.random() * 0.004,
      color: i % 3 === 0 ? "signal" : "cyan",
    }));

    // Particle field
    interface FieldParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      alpha: number;
      vy: number;
    }

    const particles: FieldParticle[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 600,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
        vy: -(0.1 + Math.random() * 0.3),
      });
    }

    let rotX = 0.18;
    let rotY = 0;
    let targetRotX = rotX;
    let targetRotY = rotY;

    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z1 = z * cosX + y * sinX;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x2 = x * cosY + z1 * sinY;
      const z2 = z1 * cosY - x * sinY;

      const depth = 850 + z2;
      if (depth <= 20) return null;
      const scale = 750 / depth;

      return {
        px: cx + x2 * scale,
        py: cy + y1 * scale,
        scale,
        z: z2,
      };
    };

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
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.22;
      targetRotX = 0.18 + ny * 0.12;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let scrollOffset = 0;
    const onScroll = () => {
      if (!reducedMotion) {
        scrollOffset = window.scrollY;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;

    const render = () => {
      // Scroll-driven camera parallax: as the user scrolls, the network gracefully orbits & breathes
      const maxScroll = Math.max(1, (document.documentElement.scrollHeight || 1000) - window.innerHeight);
      const scrollRatio = Math.min(scrollOffset / maxScroll, 1);
      const scrollTilt = scrollRatio * 0.42;
      const scrollYaw = scrollRatio * 0.55;

      rotX += (targetRotX + scrollTilt - rotX) * 0.05;
      rotY += (targetRotY + scrollYaw - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // On desktop, position systems graphics toward the right side so it frames the text
      const isDesktop = width >= 768;
      const cx = isDesktop ? width * 0.68 : width * 0.5;
      const cy = height * 0.48;

      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      // Radial background aura
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.5);
      if (isDark) {
        grad.addColorStop(0, "rgba(0, 240, 255, 0.12)");
        grad.addColorStop(0.35, "rgba(14, 116, 244, 0.07)");
        grad.addColorStop(0.7, "rgba(255, 48, 48, 0.02)");
        grad.addColorStop(1, "rgba(3, 4, 8, 0)");
      } else {
        grad.addColorStop(0, "rgba(11, 87, 208, 0.09)");
        grad.addColorStop(0.35, "rgba(8, 145, 178, 0.05)");
        grad.addColorStop(0.7, "rgba(200, 36, 24, 0.02)");
        grad.addColorStop(1, "rgba(238, 242, 249, 0)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Ambient particle drift
      for (const p of particles) {
        if (!reducedMotion) {
          p.y += p.vy;
          if (p.y < -400) p.y = 400;
        }
        const pr = project(p.x, p.y, p.z, cx, cy);
        if (pr) {
          ctx.fillStyle = `rgba(0, 240, 255, ${(p.alpha * pr.scale).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, p.size * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Project all nodes
      const projectedNodes = nodes.map((n) => project(n.x, n.y, n.z, cx, cy));

      // Draw Edges
      for (const [fromIdx, toIdx] of edges) {
        const p1 = projectedNodes[fromIdx];
        const p2 = projectedNodes[toIdx];
        if (!p1 || !p2) continue;

        const isCenterConnected = fromIdx === 0 || toIdx === 0;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = isCenterConnected ? "rgba(0, 240, 255, 0.28)" : "rgba(56, 189, 248, 0.14)";
        ctx.lineWidth = isCenterConnected ? 1.4 : 0.8;
        ctx.stroke();
      }

      // Draw Pulses along edges
      for (const pulse of pulses) {
        if (!reducedMotion) {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) pulse.progress = 0;
        }

        const p1 = projectedNodes[pulse.from];
        const p2 = projectedNodes[pulse.to];
        if (!p1 || !p2) continue;

        const px = p1.px + (p2.px - p1.px) * pulse.progress;
        const py = p1.py + (p2.py - p1.py) * pulse.progress;

        const color = pulse.color === "signal" ? "rgba(255, 48, 48, 0.9)" : "rgba(0, 240, 255, 0.9)";
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Nodes & Labels
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pr = projectedNodes[i];
        if (!pr) continue;

        const isPrimary = n.isPrimary;
        const radius = isPrimary ? 7 : 4.5;

        // Node Glow Ring
        ctx.fillStyle = isPrimary ? "rgba(255, 48, 48, 0.22)" : "rgba(0, 240, 255, 0.18)";
        ctx.beginPath();
        ctx.arc(pr.px, pr.py, radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = isPrimary ? "#ff2a1f" : "#00f0ff";
        ctx.beginPath();
        ctx.arc(pr.px, pr.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Monospace Typography Labels
        ctx.font = isPrimary
          ? "bold 11px ui-monospace, 'SF Mono', monospace"
          : "10px ui-monospace, 'SF Mono', monospace";
        ctx.fillStyle = isPrimary ? "#ffffff" : "rgba(255, 255, 255, 0.85)";
        ctx.fillText(n.label, pr.px + 12, pr.py - 2);

        ctx.font = "9px ui-monospace, 'SF Mono', monospace";
        ctx.fillStyle = isPrimary ? "rgba(255, 80, 80, 0.85)" : "rgba(0, 240, 255, 0.65)";
        ctx.fillText(n.sub, pr.px + 12, pr.py + 11);
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

