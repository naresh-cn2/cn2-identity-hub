"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "./scene";

/**
 * CredentialsVisual â€” knowledge archive and connected learning.
 *
 * Four illuminated strata â€” education, certifications, courses, self-directed
 * study â€” stacked as depth-extruded planes. A spine of light climbs through
 * them, linking each layer to the next; hovering a stratum lights it and
 * names it. The room around it breathes with slow dust and a soft drifting
 * light.
 */

const drawCredentials: SceneDraw = (ctx, { t, w, h, pal, dim, small }) => {
  /* drifting light â€” a soft source wandering behind the strata */
  const gx = w * (0.5 + Math.sin(t * 0.07) * 0.28);
  const gy = h * (0.5 + Math.cos(t * 0.05) * 0.2);
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
  glow.addColorStop(0, rgba(pal.structure, 0.05 * dim));
  glow.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  /* slow luminous dust */
  const count = small ? 14 : 30;
  for (let i = 0; i < count; i++) {
    const seed = Math.abs(Math.sin(i * 71.3 + 9.1) * 43758.5) % 1;
    const seed2 = Math.abs(Math.sin(i * 27.7 + 3.3) * 43758.5) % 1;
    const x = seed * w + Math.sin(t * 0.18 + i) * 6;
    const y = ((seed2 * h - t * (3 + (i % 5))) % h + h) % h;
    const a = (0.07 + 0.1 * breathe(t, 0.5 + (i % 4) * 0.2, i)) * dim;
    ctx.fillStyle = rgba(pal.structure, a);
    ctx.beginPath();
    ctx.arc(x, y, 0.9, 0, Math.PI * 2);
    ctx.fill();
  }
};

const STRATA = [
  { y: 330, label: "SELF-DIRECTED", w: 300 },
  { y: 268, label: "COURSES", w: 360 },
  { y: 206, label: "CERTIFICATIONS", w: 420 },
  { y: 144, label: "EDUCATION", w: 480 },
];
const CX = 280;
const D = 16; // extrusion depth

export default function CredentialsVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawCredentials} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* the spine of light climbing through the layers */}
        <line x1={CX} y1={352} x2={CX} y2={118} stroke="var(--line-strong)" strokeWidth="1.2" />
        <line
          x1={CX}
          y1={352}
          x2={CX}
          y2={118}
          stroke="var(--research)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          pathLength={100}
          className="travel-pulse"
          style={{ animationDuration: "4.2s" }}
        />
        {STRATA.map((s, i) => {
          const x0 = CX - s.w / 2;
          const x1 = CX + s.w / 2;
          return (
            <g key={s.label} className="hv">
              {/* depth: top face + front edge of the plane */}
              <polygon
                className="hv-side"
                points={`${x0},${s.y} ${x0 + D},${s.y - D} ${x1 + D},${s.y - D} ${x1},${s.y}`}
                fill="var(--background)"
                stroke="var(--line-strong)"
                strokeWidth="1"
              />
              <rect className="hv-side" x={x0} y={s.y} width={s.w} height="7" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
              <rect className="hv-accent" x={x0} y={s.y - D + 1} width={s.w} height="2.5" fill="var(--research)" opacity={0.5 + i * 0.12} />
              {/* spine node */}
              <circle cx={CX} cy={s.y - D / 2} r="5" fill="var(--background)" stroke="var(--research)" strokeWidth="1.6" />
              <circle className="hv-accent" cx={CX} cy={s.y - D / 2} r="2" fill="var(--research)" />
              {/* layer label â€” revealed on hover */}
              <text className="label-mono hv-label" x={x1 + 14} y={s.y - D / 2 + 3} textAnchor="start" fill="var(--foreground)" fontSize="10">
                {s.label}
              </text>
              {/* stratum edge lights */}
              {[0.18, 0.5, 0.82].map((f) => (
                <circle key={f} cx={x0 + s.w * f} cy={s.y + 3.5} r="1.6" fill="var(--research)" opacity="0.5" className="anim-breathe" style={{ animationDelay: `${(i * 0.7).toFixed(1)}s` }} />
              ))}
            </g>
          );
        })}
        {/* the illuminated apex â€” learning compounding upward */}
        <circle cx={CX} cy={104} r="16" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.35" />
        <circle cx={CX} cy={104} r="8" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.6" />
        <circle cx={CX} cy={104} r="3" fill="var(--signal)" className="anim-blink" />
      </svg>
    </div>
  );
}
