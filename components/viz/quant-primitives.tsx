"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Reusable 3D visualization primitives for quantitative visualizations.
 * All Canvas 2D - no WebGL dependencies. Deterministic, performant, accessible.
 */

/**
 * Camera for 3D projection
 */
export interface Camera {
  rotY: number;
  rotX: number;
  scale: number;
  perspective: number;
  cx: number;
  cy: number;
}

/**
 * Projected 3D point
 */
export interface ProjectedPoint {
  sx: number;
  sy: number;
  depth: number;
}

/**
 * Generic 3D projection utility
 */
export function project3D(
  x: number,
  y: number,
  z: number,
  cam: Camera
): ProjectedPoint {
  // Rotate around Y
  const x1 = x * Math.cos(cam.rotY) - z * Math.sin(cam.rotY);
  const z1 = x * Math.sin(cam.rotY) + z * Math.cos(cam.rotY);
  // Rotate around X
  const y2 = y * Math.cos(cam.rotX) - z1 * Math.sin(cam.rotX);
  const z2 = y * Math.sin(cam.rotX) + z1 * Math.cos(cam.rotX);
  // Perspective projection
  const scale = cam.scale / (cam.perspective + z2);
  return {
    sx: cam.cx + x1 * scale,
    sy: cam.cy - y2 * scale,
    depth: 1 / (1 + z2 * 0.5),
  };
}

/**
 * DataField - A generative 3D field for background visualization
 */
export interface DataFieldProps {
  className?: string;
  seed?: number;
  gridSize?: number;
  amplitude?: number;
  colorScheme?: "signal" | "faint" | "mixed";
  showSignalTrace?: boolean;
  signalFrequency?: number;
}

export function DataField({
  className = "",
  seed = 42,
  gridSize = 24,
  amplitude = 0.5,
  colorScheme = "mixed",
  showSignalTrace = true,
  signalFrequency = 1.7,
}: DataFieldProps) {
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

  const field = useMemo(() => makeDeterministicField(seed), [seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = gridSize;
    let raf = 0;
    let running = true;
    let rotY = -0.5;
    let width = 0;
    let height = 0;
    let colors = { grid: "", signal: "", faint: "", surface: "", axis: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(128,128,128,.2)",
        signal: cs.getPropertyValue("--signal").trim() || "#e6392a",
        faint: cs.getPropertyValue("--faint").trim() || "rgba(128,128,128,.5)",
        surface: cs.getPropertyValue("--signal-soft").trim() || "rgba(230,57,42,.08)",
        axis: cs.getPropertyValue("--chart-axis").trim() || "rgba(128,128,128,.4)",
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
      const h = field(gx, gz) * amplitude;
      return project3D(gx, h - 0.1, gz, cam);
    };

    const draw = () => {
      const cam: Camera = {
        rotY: rotY,
        rotX: 0.55,
        scale: Math.min(width, 1200) * 0.48,
        perspective: 3.2,
        cx: width * 0.5,
        cy: height * 0.68,
      };
      ctx.clearRect(0, 0, width, height);

      // Grid rows
      for (let j = 0; j <= GRID; j++) {
        const gz = -1 + (2 * j) / GRID;
        ctx.beginPath();
        for (let i = 0; i <= GRID; i++) {
          const gx = -1 + (2 * i) / GRID;
          const p = point(gx, gz, cam);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        const alpha = 0.25 + 0.5 * (1 - Math.abs(gz));
        ctx.strokeStyle = colors.grid;
        ctx.globalAlpha = 0.4 * alpha + 0.1;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Grid columns
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
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Signal trace
      if (showSignalTrace) {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        for (let i = 0; i <= GRID; i++) {
          const gx = -1 + (2 * i) / GRID;
          const gz = -0.2 + 0.12 * Math.sin(i * signalFrequency + rotY);
          const p = point(gx, gz, cam);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, colors.signal);
        grad.addColorStop(1, colors.faint);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Points on trace
        for (let i = 0; i <= GRID; i += 4) {
          const gx = -1 + (2 * i) / GRID;
          const gz = -0.2 + 0.12 * Math.sin(i * signalFrequency + rotY);
          const p = point(gx, gz, cam);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 2, 0, Math.PI * 2);
          ctx.fillStyle = colors.signal;
          ctx.globalAlpha = 0.8;
          ctx.fill();
        }
      }

      // Contour lines (elevation)
      for (let level = 0; level < 4; level++) {
        const threshold = 0.1 + level * 0.18;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= GRID; j++) {
          const gz = -1 + (2 * j) / GRID;
          for (let i = 0; i <= GRID; i++) {
            const gx = -1 + (2 * i) / GRID;
            const h = field(gx, gz) * amplitude;
            if (Math.abs(h - threshold) < 0.015) {
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
          ctx.strokeStyle = level === 1 ? colors.signal : colors.faint;
          ctx.globalAlpha = level === 1 ? 0.5 : 0.12;
          ctx.lineWidth = level === 1 ? 1.2 : 0.6;
          ctx.stroke();
        }
      }

      // Sparse particles
      ctx.fillStyle = colors.faint;
      for (let j = 2; j <= GRID - 2; j += 6) {
        for (let i = 2; i <= GRID - 2; i += 6) {
          const gx = -1 + (2 * i) / GRID;
          const gz = -1 + (2 * j) / GRID;
          const h = field(gx, gz) * amplitude;
          if (h > 0.1) {
            const p = point(gx, gz, cam);
            ctx.globalAlpha = 0.35 * p.depth;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      if (!reduced) rotY += 0.0005;
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
  }, [gridSize, amplitude, colorScheme, showSignalTrace, signalFrequency, field, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

/**
 * Deterministic noise field generator
 */
function makeDeterministicField(seed: number) {
  const rand = mulberry32(seed);
  const offsets: number[][] = [];
  for (let i = 0; i < 8; i++) {
    offsets[i] = [rand() * 1000, rand() * 1000, rand() * 0.5 + 0.5, rand() * 0.02 + 0.01];
  }
  return (x: number, z: number): number => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
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

/**
 * EquitySurface - 3D equity curve surface visualization
 */
export interface EquitySurfaceProps {
  className?: string;
  series: number[];
  drawdownSeries?: number[];
  width?: number;
  height?: number;
  interactive?: boolean;
  showDrawdown?: boolean;
  summary?: string;
}

export function EquitySurface({
  className = "",
  series,
  drawdownSeries,
  width = 1000,
  height = 400,
  interactive = false,
  showDrawdown = true,
  summary = "Equity curve surface",
}: EquitySurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ x: number; y: number; value: number; dd?: number } | null>(null);
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

  const { normalized, dd } = useMemo(() => {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const range = max - min || 1;
    const norm = series.map((v) => (v - min) / range);
    let ddNorm: number[] = [];
    if (drawdownSeries) {
      const ddMax = Math.max(...drawdownSeries);
      ddNorm = drawdownSeries.map((v) => (ddMax > 0 ? v / ddMax : 0));
    }
    return { normalized: norm, dd: ddNorm };
  }, [series, drawdownSeries]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pad = 40;
    const eqH = showDrawdown ? 220 : 300;
    const ddH = 60;
    const totalH = showDrawdown ? eqH + ddH + 40 : eqH;
    const stepX = (width - pad * 2) / (normalized.length - 1 || 1);
    let colors = { grid: "", signal: "", faint: "", axis: "", surface: "", dd: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        grid: cs.getPropertyValue("--chart-grid").trim() || "rgba(128,128,128,.2)",
        signal: cs.getPropertyValue("--signal").trim() || "#e6392a",
        faint: cs.getPropertyValue("--faint").trim() || "rgba(128,128,128,.5)",
        axis: cs.getPropertyValue("--chart-axis").trim() || "rgba(128,128,128,.4)",
        surface: cs.getPropertyValue("--signal-soft").trim() || "rgba(230,57,42,.08)",
        dd: cs.getPropertyValue("--chart-axis").trim() || "rgba(128,128,128,.4)",
      };
    };

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round((totalH + pad * 2) * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${totalH + pad * 2}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, totalH + pad * 2);

      const eqTop = pad;
      const ddTop = showDrawdown ? eqTop + eqH + 40 : 0;

      // Grid lines
      for (let i = 1; i < 4; i++) {
        const y = eqTop + (eqH * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pad, y);
        ctx.lineTo(width - pad, y);
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Y-axis labels
      ctx.fillStyle = colors.faint;
      ctx.font = "11px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("+100%", pad + 4, eqTop + 12);
      ctx.fillText("+50%", pad + 4, eqTop + eqH / 2 + 12);
      ctx.fillText("0%", pad + 4, eqTop + eqH + 12);

      // Equity area
      const areaPath = new Path2D();
      areaPath.moveTo(pad, eqTop + eqH);
      normalized.forEach((v, i) => {
        const x = pad + i * stepX;
        const y = eqTop + (1 - v) * eqH;
        areaPath.lineTo(x, y);
      });
      areaPath.lineTo(width - pad, eqTop + eqH);
      areaPath.closePath();
      ctx.fillStyle = colors.surface;
      ctx.fill(areaPath);

      // Equity line
      ctx.beginPath();
      normalized.forEach((v, i) => {
        const x = pad + i * stepX;
        const y = eqTop + (1 - v) * eqH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = colors.signal;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Drawdown subplot
      if (showDrawdown && dd.length > 0) {
        const ddStepX = (width - pad * 2) / (dd.length - 1 || 1);
        // DD grid
        ctx.beginPath();
        ctx.moveTo(pad, ddTop);
        ctx.lineTo(width - pad, ddTop);
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pad, ddTop + ddH);
        dd.forEach((v, i) => {
          const x = pad + i * ddStepX;
          const y = ddTop + (1 - v) * ddH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = colors.dd;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // DD area
        const ddArea = new Path2D();
        ddArea.moveTo(pad, ddTop + ddH);
        dd.forEach((v, i) => {
          const x = pad + i * ddStepX;
          const y = ddTop + (1 - v) * ddH;
          ddArea.lineTo(x, y);
        });
        ddArea.lineTo(width - pad, ddTop + ddH);
        ddArea.closePath();
        ctx.fillStyle = colors.surface;
        ctx.globalAlpha = 0.4;
        ctx.fill(ddArea);
        ctx.globalAlpha = 1;

        ctx.fillStyle = colors.faint;
        ctx.font = "10px 'IBM Plex Mono', monospace";
        ctx.textAlign = "right";
        const maxDD = Math.max(...dd);
        ctx.fillText(`MAX ${(maxDD * 100).toFixed(1)}%`, width - pad - 4, ddTop + ddH + 14);
        ctx.textAlign = "left";
      }

      // Hover point
      if (hover && hover.x >= pad && hover.x <= width - pad) {
        const idx = Math.round((hover.x - pad) / stepX);
        if (idx >= 0 && idx < normalized.length) {
          const x = pad + idx * stepX;
          const y = eqTop + (1 - normalized[idx]) * eqH;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = colors.signal;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = colors.signal;
          ctx.globalAlpha = 0.3;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      setHover({
        x: (e.clientX - rect.left) * (width / rect.width),
        y: (e.clientY - rect.top) * ((totalH + pad * 2) / rect.height),
        value: 0,
      });
    };
    const onPointerLeave = () => setHover(null);

    readColors();
    draw();

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      mo.disconnect();
    };
  }, [normalized, dd, width, height, showDrawdown, interactive, hover, reduced]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={summary}
      className={`w-full h-auto ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}

/**
 * PipelineFlow - animated pipeline visualization for system architecture
 */
export interface PipelineFlowProps {
  className?: string;
  stages: Array<{
    name: string;
    role: string;
    detail?: string[];
    color?: "signal" | "faint" | "foreground";
  }>;
  flowDirection?: "vertical" | "horizontal";
  animated?: boolean;
}

export function PipelineFlow({
  className = "",
  stages,
  flowDirection = "vertical",
  animated = false,
}: PipelineFlowProps) {
  const [phase, setPhase] = useState(0);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (!animated || reduced) return;
    const id = setInterval(() => setPhase((p) => (p + 0.02) % 1), 50);
    return () => clearInterval(id);
  }, [animated, reduced]);

  return (
    <svg
      viewBox="0 0 800 600"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Pipeline flow: ${stages.map((s) => s.name).join(" → ")}`}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--signal)" />
        </marker>
      </defs>
      {stages.map((stage, i) => {
        const y = flowDirection === "vertical" ? 60 + i * 90 : 60;
        const x = flowDirection === "horizontal" ? 60 + i * 180 : 100;
        const isLast = i === stages.length - 1;
        const color = stage.color === "signal" ? "var(--signal)" : stage.color === "foreground" ? "var(--foreground)" : "var(--faint)";

        return (
          <g key={stage.name} className="group">
            {/* Flow connector */}
            {!isLast && (
              <line
                x1={x + (flowDirection === "horizontal" ? 140 : 0)}
                y1={y + (flowDirection === "vertical" ? 50 : 20)}
                x2={x + (flowDirection === "horizontal" ? 140 : 0)}
                y2={y + (flowDirection === "vertical" ? 90 : 20)}
                stroke={color}
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
                strokeDasharray={animated && !reduced ? "10 10" : "none"}
                strokeDashoffset={animated && !reduced ? phase * 20 : 0}
                className="transition-all duration-1000"
              />
            )}
            {/* Stage node */}
            <rect
              x={x - 80}
              y={y}
              width={160}
              height={50}
              rx={4}
              fill="var(--surface)"
              stroke={color}
              strokeWidth={isLast ? 2 : 1.5}
              className="group-hover:stroke-signal transition-colors duration-300"
            />
            <text
              x={x}
              y={y + 18}
              textAnchor="middle"
              className="display text-sm"
              fill={color}
              fontSize={14}
            >
              {stage.name}
            </text>
            <text
              x={x}
              y={y + 36}
              textAnchor="middle"
              className="label-mono"
              fill="var(--faint)"
              fontSize={9}
            >
              {stage.role}
            </text>
            {stage.detail && (
              <foreignObject
                x={x - 80}
                y={y + 55}
                width={160}
                height={stage.detail.length * 16}
              >
                <div style={{ fontSize: "9px", color: "var(--muted)", textAlign: "center" }}>
                  {stage.detail.map((d, j) => (
                    <div key={j} style={{ margin: "1px 0" }}>
                      {"● " + d}
                    </div>
                  ))}
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * RegimeMap - market regime visualization
 */
export interface RegimeMapProps {
  className?: string;
  regimes: Array<{
    name: string;
    x: number; // 0-1
    y: number; // 0-1
    color: string;
    size: number; // 0-1
    description?: string;
  }>;
  width?: number;
  height?: number;
}

export function RegimeMap({
  className = "",
  regimes,
  width = 800,
  height = 500,
}: RegimeMapProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Market regime map with ${regimes.length} regimes`}
    >
      <title>Market regime map</title>
      {/* Grid */}
      <g stroke="var(--chart-grid)" strokeWidth={0.5}>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} x2={width} y1={f * height} y2={f * height} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} y1={0} y2={height} x1={f * width} x2={f * width} />
        ))}
      </g>
      {/* Axes */}
      <line x1={0} x2={width} y1={height} y2={height} stroke="var(--chart-axis)" strokeWidth={1} />
      <line x1={0} x2={0} y1={0} y2={height} stroke="var(--chart-axis)" strokeWidth={1} />
      <text x={width / 2} y={height + 24} textAnchor="middle" className="label-mono" fill="var(--faint)" fontSize={11}>
        VOLATILITY
      </text>
      <text x={-16} y={height / 2} textAnchor="middle" transform={`rotate(-90, -16, ${height / 2})`} className="label-mono" fill="var(--faint)" fontSize={11}>
        PERFORMANCE
      </text>

      {regimes.map((r) => {
        const cx = 40 + r.x * (width - 80);
        const cy = height - 40 - r.y * (height - 80);
        const radius = 12 + r.size * 40;
        return (
          <g key={r.name}>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill={r.color}
              opacity={0.15}
              stroke={r.color}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <circle
              cx={cx}
              cy={cy}
              r={Math.max(4, radius * 0.3)}
              fill={r.color}
              opacity={0.9}
            />
            <text
              x={cx}
              y={cy + radius + 16}
              textAnchor="middle"
              className="label-mono"
              fill="var(--faint)"
              fontSize={10}
            >
              {r.name}
            </text>
            {r.description && (
              <title>{r.name}: {r.description}</title>
            )}
          </g>
        );
      })}
    </svg>
  );
}