"use client";

import SceneCanvas, { pulseAt, rgba, type SceneDraw } from "./scene";

/**
 * OpportunitiesVisual â€” branching pathways.
 *
 * Four routes leave one origin â€” career, freelance, research, collaboration
 * â€” each with its own line treatment and a gateway at its end. Travelling
 * dots ride the routes; hovering a route lights it and its gateway. The
 * paths land on the real pages of /opportunities behind the ENTER button.
 */

const drawOpportunities: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  /* ground haze under the origin */
  const haze = ctx.createRadialGradient(w * 0.5, h * 0.95, 0, w * 0.5, h * 0.95, w * 0.5);
  haze.addColorStop(0, rgba(pal.structure, 0.22 * dim));
  haze.addColorStop(0.5, rgba(pal.deep, 0.1 * dim));
  haze.addColorStop(1, rgba(pal.deep, 0));
  ctx.fillStyle = haze;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.95, w * 0.5, 0, Math.PI * 2);
  ctx.fill();

  if (reduced || small) return;

  /* analytic luminous dots riding each route */
  const routes: [number, number, number, number, number, number][] = [
    [0.5, 0.85, 0.34, 0.52, 0.232, 0.28],
    [0.5, 0.85, 0.46, 0.44, 0.425, 0.155],
    [0.5, 0.85, 0.55, 0.44, 0.575, 0.155],
    [0.5, 0.85, 0.68, 0.52, 0.768, 0.28],
  ];
  for (let i = 0; i < routes.length; i++) {
    const [x0, y0, cx, cy, x1, y1] = routes[i];
    const u = pulseAt(t, 4 + i * 0.8, i * 0.25);
    const a = 1 - u;
    const x = (a * a * x0 + 2 * a * u * cx + u * u * x1) * w;
    const y = (a * a * y0 + 2 * a * u * cy + u * u * y1) * h;
    ctx.fillStyle = rgba(i === 3 ? pal.signal : pal.bright, 0.85 * dim);
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
};

const BRANCHES = [
  { d: "M280,357 C280,270 170,250 130,118", x: 130, y: 118, label: "CAREER", dash: undefined },
  { d: "M280,357 C280,260 240,200 238,65", x: 238, y: 65, label: "FREELANCE", dash: "10 8" },
  { d: "M280,357 C280,260 320,200 322,65", x: 322, y: 65, label: "RESEARCH", dash: "2 7" },
  { d: "M280,357 C280,270 390,250 430,118", x: 430, y: 118, label: "COLLABORATION", dash: "14 5 2 5" },
];

export default function OpportunitiesVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawOpportunities} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* shared canopy hint */}
        <path d="M110,104 Q280,20 450,104" fill="none" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
        {BRANCHES.map((b) => (
          <g key={b.label} className="hv">
            {/* the route â€” its own line treatment */}
            <path className="hv-link" d={b.d} fill="none" stroke="var(--research)" strokeWidth="1.8" strokeDasharray={b.dash} />
            {/* gateway at the end of the route */}
            <circle className="hv-frame" cx={b.x} cy={b.y} r="16" fill="var(--background)" stroke="var(--research)" strokeWidth="1.6" />
            <circle className="hv-accent" cx={b.x} cy={b.y} r="4.5" fill="var(--research)" opacity="0.9" />
            <text className="label-mono hv-tag" x={b.x} y={b.y - 26} textAnchor="middle" fill="var(--muted)" fontSize="8.5">
              {b.label}
            </text>
          </g>
        ))}
        {/* the shared origin */}
        <line x1="280" y1="400" x2="280" y2="357" stroke="var(--line-strong)" strokeWidth="2" />
        <circle cx="280" cy="357" r="9" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.8" />
        <circle cx="280" cy="357" r="3" fill="var(--signal)" className="anim-blink" />
      </svg>
    </div>
  );
}
