"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "./scene";

/**
 * PersonalVisual — autonomous agents, personal workspace kernels, and NLP streams.
 *
 * An interconnected graph of autonomous systems: agents, daemons, and intelligence
 * pipelines with continuous telemetry pulses travelling along bidirectional circuits.
 */

const drawPersonal: SceneDraw = (ctx, { t, w, h, pal, dim, small }) => {
  // Radial atmospheric aura
  const cx = w * 0.5;
  const cy = h * 0.5;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
  glow.addColorStop(0, rgba(pal.bright, 0.18 * dim));
  glow.addColorStop(0.5, rgba(pal.deep, 0.08 * dim));
  glow.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Concentric radar scan rings
  ctx.lineWidth = 1;
  const rings = small ? [0.2, 0.4] : [0.15, 0.3, 0.45];
  for (const r of rings) {
    ctx.strokeStyle = rgba(pal.structure, (0.15 + 0.1 * breathe(t, 0.4, r * 10)) * dim);
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(w, h) * r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crosshair axes
  ctx.strokeStyle = rgba(pal.structure, 0.12 * dim);
  ctx.setLineDash([2, 6]);
  ctx.beginPath();
  ctx.moveTo(w * 0.1, cy);
  ctx.lineTo(w * 0.9, cy);
  ctx.moveTo(cx, h * 0.1);
  ctx.lineTo(cx, h * 0.9);
  ctx.stroke();
  ctx.setLineDash([]);
};

const AGENT_NODES = [
  { x: 100, y: 220, label: "QRSIP AGENT", role: "HYPOTHESIS PIPELINE" },
  { x: 280, y: 130, label: "SENTIMENT STREAM", role: "REAL-TIME NLP" },
  { x: 460, y: 220, label: "SYSTEMS KERNEL", role: "WORKSPACE DAEMON" },
  { x: 280, y: 310, label: "EVENT SCHEDULER", role: "TELEMETRY BUS" },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
];

export default function PersonalVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawPersonal} />
      <svg
        viewBox="0 0 560 420"
        focusable="false"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {/* Connecting circuits */}
        {EDGES.map(([fromIdx, toIdx], i) => {
          const from = AGENT_NODES[fromIdx];
          const to = AGENT_NODES[toIdx];
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--line-strong)"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--holo, #0891b2)"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="dash-march"
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* Central intelligence beacon */}
        <circle cx={280} cy={220} r={18} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
        <circle cx={280} cy={220} r={8} fill="var(--holo, #0891b2)" opacity="0.4" className="anim-breathe" />
        <circle cx={280} cy={220} r={3} fill="var(--signal)" className="anim-blink" />

        {/* Agent nodes */}
        {AGENT_NODES.map((node, i) => {
          return (
            <g key={node.label} className="hv">
              {/* Outer halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r={24}
                fill="var(--surface)"
                stroke="var(--line-strong)"
                strokeWidth="1.5"
                className="hv-frame transition-all duration-300"
              />
              {/* Glowing core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={10}
                fill="var(--background)"
                stroke={i === 0 ? "var(--signal)" : "var(--holo, #0891b2)"}
                strokeWidth="1.8"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={4}
                fill={i === 0 ? "var(--signal)" : "var(--holo, #0891b2)"}
                className={i === 0 ? "anim-blink" : "anim-breathe"}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 32}
                textAnchor="middle"
                className="font-mono text-[11px] font-bold"
                fill="var(--foreground)"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y - 18}
                textAnchor="middle"
                className="label-mono text-[8px]"
                fill="var(--faint)"
              >
                {node.role}
              </text>
            </g>
          );
        })}

        <text x={280} y={390} textAnchor="middle" className="label-mono text-[9px]" fill="var(--faint)">
          AUTONOMOUS AGENT TOPOLOGY
        </text>
      </svg>
    </div>
  );
}
