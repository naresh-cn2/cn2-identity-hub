"use client";

import SceneCanvas, { breathe, pulseAt, rgba, type SceneDraw } from "./scene";

/**
 * ServicesVisual â€” system integration and delivery pathways.
 *
 * A five-stage pipeline runs problem â†’ design â†’ implementation â†’ validation
 * â†’ delivery, ending in the deliverable. Light travels the stages in
 * sequence; hovering a stage lights it. The room behind carries two faint
 * routing lanes with slow pulses and a soft scanning light.
 */

const drawServices: SceneDraw = (ctx, { t, w, h, pal, dim, reduced }) => {
  /* pipeline routing lanes behind the pipeline */
  const lanes = [
    [0.05, 0.24, 0.55, 0.16, 0.95, 0.3],
    [0.05, 0.86, 0.5, 0.94, 0.95, 0.82],
  ];
  ctx.strokeStyle = rgba(pal.structure, 0.28 * dim);
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 8]);
  ctx.beginPath();
  for (const [x0, y0, xm, ym, x1, y1] of lanes) {
    ctx.moveTo(x0 * w, y0 * h);
    ctx.quadraticCurveTo(xm * w, ym * h, x1 * w, y1 * h);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  if (!reduced) {
    for (let i = 0; i < 2; i++) {
      const [x0, y0, xm, ym, x1, y1] = lanes[i];
      const u = pulseAt(t, 5 + i * 2, i * 0.4);
      const a = 1 - u;
      const x = (a * a * x0 + 2 * a * u * xm + u * u * x1) * w;
      const y = (a * a * y0 + 2 * a * u * ym + u * u * y1) * h;
      ctx.fillStyle = rgba(i === 0 ? pal.bright : pal.signal, 0.85 * dim);
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* scanning light raking the stage row */
  const sweep = ((t * 0.08) % 1.6) - 0.3;
  const sx = sweep * w;
  const g = ctx.createLinearGradient(sx - 70, 0, sx + 70, 0);
  g.addColorStop(0, rgba(pal.bright, 0));
  g.addColorStop(0.5, rgba(pal.bright, 0.18 * dim));
  g.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = g;
  ctx.fillRect(sx - 70, 0, 140, h);

  /* halo under the deliverable end */
  const halo = ctx.createRadialGradient(w * 0.88, h * 0.5, 0, w * 0.88, h * 0.5, w * 0.22);
  halo.addColorStop(0, rgba(pal.signal, 0.35 * dim * breathe(t, 1.2, 0)));
  halo.addColorStop(0.5, rgba(pal.structure, 0.12 * dim));
  halo.addColorStop(1, rgba(pal.signal, 0));
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(w * 0.88, h * 0.5, w * 0.22, 0, Math.PI * 2);
  ctx.fill();
};

const STAGES = ["PROBLEM", "DESIGN", "IMPLEMENT", "VALIDATE", "DELIVER"];
const CHAIN = [36, 124, 212, 300, 388];
const CHAIN_Y = 205;

export default function ServicesVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawServices} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* the pipeline spine */}
        <line x1={CHAIN[0]} y1={CHAIN_Y} x2={500} y2={CHAIN_Y} stroke="var(--line-strong)" strokeWidth="1.2" />
        <line
          x1={CHAIN[0]}
          y1={CHAIN_Y}
          x2={500}
          y2={CHAIN_Y}
          stroke="var(--research)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          pathLength={100}
          className="travel-pulse"
          style={{ animationDuration: "4.6s" }}
        />
        {STAGES.map((stage, i) => {
          const x = CHAIN[i];
          return (
            <g key={stage} className="hv">
              {/* stage plate */}
              <rect className="hv-frame" x={x - 27} y={CHAIN_Y - 22} width="54" height="44" rx="3" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.4" />
              <rect className="hv-accent" x={x - 27} y={CHAIN_Y - 22} width="54" height="2.5" fill="var(--research)" opacity="0.85" style={{ animation: `cn2-breathe 3.4s ease-in-out ${(i * 0.5).toFixed(1)}s infinite` }} />
              {/* stage glyph â€” a small evolving mark per step */}
              {i === 0 && <circle cx={x} cy={CHAIN_Y + 4} r="5" fill="none" stroke="var(--research)" strokeWidth="1.4" />}
              {i === 1 && <path d={`M${x - 6},${CHAIN_Y + 8} L${x},${CHAIN_Y - 4} L${x + 6},${CHAIN_Y + 8} Z`} fill="none" stroke="var(--research)" strokeWidth="1.4" />}
              {i === 2 && <rect x={x - 5} y={CHAIN_Y - 1} width="10" height="10" fill="none" stroke="var(--research)" strokeWidth="1.4" />}
              {i === 3 && <path d={`M${x - 6},${CHAIN_Y + 4} l4,4 l8,-9`} fill="none" stroke="var(--research)" strokeWidth="1.6" strokeLinecap="round" />}
              {i === 4 && <polygon points={`${x},${CHAIN_Y - 3} ${x + 7},${CHAIN_Y + 4} ${x},${CHAIN_Y + 11} ${x - 7},${CHAIN_Y + 4}`} fill="var(--signal)" opacity="0.9" />}
              {/* connector bead */}
              <circle cx={x} cy={CHAIN_Y} r="2" fill="var(--research)" opacity="0.9" />
              {/* stage name â€” always on, promoted on hover */}
              <text className="label-mono hv-tag" x={x} y={CHAIN_Y + 44} textAnchor="middle" fill="var(--muted)" fontSize="9">
                {stage}
              </text>
            </g>
          );
        })}
        {/* the deliverable â€” where every engagement lands */}
        <g>
          <polygon points="516,182 540,205 516,228 492,205" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.8" />
          <polygon points="516,193 529,205 516,217 503,205" fill="var(--signal)" opacity="0.16" />
        </g>
      </svg>
    </div>
  );
}
