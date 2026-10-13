"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "./scene";

/**
 * LabVisual â€” quantitative instruments and analytical data.
 *
 * An instrument face: a live sweep scans the field, a trace runs beneath a
 * red threshold, and a caliper holds the measured leg. The trace and its
 * overlay pulse are illustrative â€” the real instruments live on /lab, where
 * they run on real data.
 */

const drawLab: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  /* centre halo â€” the instrument's backlight */
  const halo = ctx.createRadialGradient(w * 0.5, h * 0.48, 0, w * 0.5, h * 0.48, Math.max(w, h) * 0.55);
  halo.addColorStop(0, rgba(pal.structure, 0.055 * dim));
  halo.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, w, h);

  /* dense analytical grid */
  const step = small ? 28 : 24;
  ctx.strokeStyle = rgba(pal.deep, 0.07 * dim);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = step; x < w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = step; y < h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  /* the sweep â€” the instrument's moving light */
  const sweep = reduced ? 0.62 : ((t * 0.11) % 1.25) - 0.12;
  const sx = sweep * w;
  const g = ctx.createLinearGradient(sx - 46, 0, sx + 46, 0);
  g.addColorStop(0, rgba(pal.bright, 0));
  g.addColorStop(0.5, rgba(pal.bright, 0.06 * dim));
  g.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = g;
  ctx.fillRect(sx - 46, 0, 92, h);
  ctx.strokeStyle = rgba(pal.bright, 0.14 * dim);
  ctx.beginPath();
  ctx.moveTo(sx, 0);
  ctx.lineTo(sx, h);
  ctx.stroke();

  /* readout glow under the caliper leg */
  const pulse = breathe(t, 1.9, 0);
  const dot = ctx.createRadialGradient(w * 0.848, h * 0.333, 0, w * 0.848, h * 0.333, 14);
  dot.addColorStop(0, rgba(pal.signal, 0.2 * pulse * dim));
  dot.addColorStop(1, rgba(pal.signal, 0));
  ctx.fillStyle = dot;
  ctx.beginPath();
  ctx.arc(w * 0.848, h * 0.333, 14, 0, Math.PI * 2);
  ctx.fill();
};

const TRACE: [number, number][] = [
  [75, 310],
  [130, 285],
  [185, 300],
  [245, 235],
  [300, 258],
  [360, 180],
  [420, 205],
  [475, 140],
  [520, 162],
];

export default function LabVisual() {
  const trace = TRACE.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawLab} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* instrument frame */}
        <path d="M75,75 L75,345 L520,345" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
        {/* frame registration ticks */}
        <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.6">
          {[105, 165, 225, 285].map((y) => (
            <line key={y} x1="69" y1={y} x2="75" y2={y} />
          ))}
          {[135, 195, 255, 315, 375, 435, 495].map((x) => (
            <line key={x} x1={x} y1="345" x2={x} y2="351" />
          ))}
        </g>
        {/* soft guides */}
        {[135, 195, 255, 315].map((y) => (
          <line key={y} x1="75" y1={y} x2="520" y2={y} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="1 12" opacity="0.4" />
        ))}
        {/* the red threshold */}
        <line x1="75" y1="150" x2="520" y2="150" stroke="var(--signal)" strokeWidth="1.4" strokeDasharray="8 10" opacity="0.8" className="dash-march" />
        <text className="label-mono" x="520" y="140" textAnchor="end" fill="var(--signal)" fontSize="8" opacity="0.85">
          THRESHOLD
        </text>
        {/* the trace + its travelling read pulse */}
        <path d={trace} fill="none" stroke="var(--research)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path
          d={trace}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          pathLength={100}
          className="travel-pulse"
          style={{ animationDuration: "4.8s" }}
          opacity="0.9"
        />
        {/* caliper holding the measured leg */}
        <g stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.8">
          <line x1="360" y1="98" x2="475" y2="98" />
          <line x1="360" y1="92" x2="360" y2="104" />
          <line x1="475" y1="92" x2="475" y2="104" />
          <line x1="360" y1="98" x2="360" y2="180" strokeDasharray="2 6" opacity="0.5" />
          <line x1="475" y1="98" x2="475" y2="140" strokeDasharray="2 6" opacity="0.5" />
        </g>
        <circle cx="475" cy="140" r="4.5" fill="var(--signal)" className="anim-blink" />
      </svg>
    </div>
  );
}
