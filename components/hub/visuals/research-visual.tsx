"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "./scene";

/**
 * ResearchVisual â€” investigation and connected evidence.
 *
 * The written method as a chain: question â†’ method â†’ experiment â†’ result â†’
 * conclusion. Light travels the chain node to node; hovering a node lights
 * it and its links. The room behind breathes with a slow drifting light and
 * a sparse field of stars.
 */

const drawResearch: SceneDraw = (ctx, { t, w, h, pal, dim, small }) => {
  /* a soft light wandering over the field â€” where the shimmer comes from */
  const gx = w * (0.5 + Math.sin(t * 0.05) * 0.3);
  const gy = h * (0.5 + Math.cos(t * 0.04) * 0.22);
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.5);
  glow.addColorStop(0, rgba(pal.structure, 0.05 * dim));
  glow.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  /* sparse stars, breathing out of phase */
  const count = small ? 10 : 20;
  for (let i = 0; i < count; i++) {
    const sx = (Math.abs(Math.sin(i * 12.9 + 4.7) * 43758.5) % 1) * w;
    const sy = (Math.abs(Math.sin(i * 31.7 + 1.9) * 43758.5) % 1) * h;
    const a = (0.1 + 0.22 * breathe(t, 0.4 + (i % 5) * 0.18, i * 1.3)) * dim;
    ctx.fillStyle = rgba(pal.bright, a);
    ctx.beginPath();
    ctx.arc(sx, sy, i % 6 === 0 ? 1.3 : 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
};

/* The chain â€” drawn as a gentle rising arc across the plate. */
const NODES: { x: number; y: number; label: string }[] = [
  { x: 70, y: 320, label: "QUESTION" },
  { x: 185, y: 258, label: "METHOD" },
  { x: 300, y: 290, label: "EXPERIMENT" },
  { x: 405, y: 196, label: "RESULT" },
  { x: 505, y: 120, label: "CONCLUSION" },
];

export default function ResearchVisual() {
  const chain = NODES.map((n, i) => `${i === 0 ? "M" : "L"}${n.x},${n.y}`).join(" ");
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawResearch} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* the chain */}
        <path d={chain} fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
        <path
          d={chain}
          fill="none"
          stroke="var(--research)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          pathLength={100}
          className="travel-pulse"
          style={{ animationDuration: "5.2s" }}
        />
        {/* evidence nodes */}
        {NODES.map((n, i) => {
          const final = i === NODES.length - 1;
          return (
            <g key={n.label} className="hv">
              <circle cx={n.x} cy={n.y} r="19" fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1.4" className="hv-frame" />
              {final ? (
                <>
                  <circle cx={n.x} cy={n.y} r="27" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.35" />
                  <circle className="hv-accent" cx={n.x} cy={n.y} r="6" fill="var(--signal)" />
                </>
              ) : (
                <circle className="hv-accent" cx={n.x} cy={n.y} r="5.5" fill="var(--research)" />
              )}
              <text className="label-mono hv-tag" x={n.x} y={n.y - 30} textAnchor="middle" fill="var(--muted)" fontSize="8.5">
                {n.label}
              </text>
            </g>
          );
        })}
        {/* the question mark that starts it all â€” a signal spark over node one */}
        <circle cx={70} cy={320} r="30" fill="none" stroke="var(--research)" strokeWidth="1" strokeDasharray="3 8" opacity="0.5" className="dash-march" />
      </svg>
    </div>
  );
}
