"use client";

import SceneCanvas, { breathe, pulseAt, rgba, type SceneDraw } from "./scene";

/**
 * BuildsVisual â€” technical architecture and data infrastructure.
 *
 * Three extruded system towers stand on a lit floor plate, each wired into a
 * shared data bus where pulses travel between modules. Hovering a tower
 * lights it and names its role. Canvas carries the room â€” floor grid, haze,
 * column glow, bus pulses; SVG carries the crisp structure.
 */

/* Canvas columns line up with the SVG towers (fractions of 560Ã—420). */
const COLS = [130, 280, 430].map((x) => x / 560);
const BUS_Y = 344 / 420;

const drawBuilds: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const floorY = h * 0.74;

  /* haze behind the towers */
  const haze = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.5);
  haze.addColorStop(0, rgba(pal.deep, 0.06 * dim));
  haze.addColorStop(1, rgba(pal.deep, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  /* floor grid under the plate */
  ctx.strokeStyle = rgba(pal.deep, 0.08 * dim);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -5; i <= 5; i++) {
    ctx.moveTo(w * 0.5, floorY);
    ctx.lineTo(w * 0.5 + i * w * 0.16, h * 1.02);
  }
  for (let k = 1; k <= 3; k++) {
    const y = floorY + ((h - floorY) * k) / 3.4;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  /* light columns rising off each tower */
  for (let i = 0; i < COLS.length; i++) {
    const x = COLS[i] * w;
    const a = (0.05 + 0.035 * breathe(t, 0.7, i * 2.1)) * dim;
    const g = ctx.createLinearGradient(x, h * BUS_Y + 8, x, floorY);
    g.addColorStop(0, rgba(pal.structure, a));
    g.addColorStop(1, rgba(pal.structure, 0));
    ctx.fillStyle = g;
    ctx.fillRect(x - w * 0.055, h * BUS_Y + 8, w * 0.11, floorY - h * BUS_Y - 8);
  }

  /* the data bus â€” two pulses running between the risers */
  const by = h * BUS_Y;
  ctx.strokeStyle = rgba(pal.structure, 0.16 * dim);
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 8]);
  ctx.beginPath();
  ctx.moveTo(COLS[0] * w, by);
  ctx.lineTo(COLS[2] * w, by);
  ctx.stroke();
  ctx.setLineDash([]);
  if (!reduced) {
    for (let i = 0; i < 2; i++) {
      const u = pulseAt(t, 3.6 + i * 1.7, i * 0.5);
      const x = (COLS[0] + (COLS[2] - COLS[0]) * u) * w;
      const tx = (COLS[0] + (COLS[2] - COLS[0]) * Math.max(0, u - 0.1)) * w;
      const col = i === 1 ? pal.signal : pal.bright;
      const g = ctx.createLinearGradient(tx, by, x, by);
      g.addColorStop(0, rgba(col, 0));
      g.addColorStop(1, rgba(col, 0.42 * dim));
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(tx, by);
      ctx.lineTo(x, by);
      ctx.stroke();
      ctx.fillStyle = rgba(col, 0.6 * dim);
      ctx.beginPath();
      ctx.arc(x, by, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (small) return; /* towers render in the SVG layer at every size */
};

const TOWERS = [
  { x: 70, w: 120, h: 150, label: "SOFTWARE" },
  { x: 220, w: 120, h: 210, label: "QUANT SYSTEMS" },
  { x: 370, w: 120, h: 120, label: "INFRASTRUCTURE" },
];
const BASE = 300;
const BUS = 344;

export default function BuildsVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawBuilds} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {TOWERS.map((tower, i) => {
          const top = BASE - tower.h;
          const cx = tower.x + tower.w / 2;
          const d = 14; // extrusion depth
          return (
            <g key={tower.label} className="hv">
              {/* extruded top and side faces â€” the tower has real depth */}
              <polygon
                className="hv-side"
                points={`${tower.x},${top} ${tower.x + d},${top - d} ${tower.x + tower.w + d},${top - d} ${tower.x + tower.w},${top}`}
                fill="var(--background)"
                stroke="var(--line-strong)"
                strokeWidth="1"
                opacity="0.9"
              />
              <polygon
                className="hv-side"
                points={`${tower.x + tower.w},${top} ${tower.x + tower.w + d},${top - d} ${tower.x + tower.w + d},${BASE - d} ${tower.x + tower.w},${BASE}`}
                fill="var(--surface)"
                stroke="var(--line-strong)"
                strokeWidth="1"
                opacity="0.65"
              />
              {/* front face */}
              <rect className="hv-frame" x={tower.x} y={top} width={tower.w} height={tower.h} rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.4" />
              <rect className="hv-accent" x={tower.x} y={top} width={tower.w} height="3" fill="var(--research)" opacity="0.85" />
              {/* module slots */}
              {[0.3, 0.55, 0.8].map((f) => (
                <g key={f}>
                  <line x1={tower.x + 10} y1={top + tower.h * f} x2={tower.x + tower.w - 24} y2={top + tower.h * f} stroke="var(--research)" strokeWidth="1" opacity="0.4" />
                  <circle cx={tower.x + tower.w - 13} cy={top + tower.h * f} r="2" fill="var(--research)" opacity="0.55" />
                </g>
              ))}
              {/* red status light */}
              <circle cx={tower.x + tower.w - 13} cy={top + 15} r="3.5" fill="var(--signal)" className="anim-blink" style={{ animationDelay: `${(i * 0.9).toFixed(1)}s` }} />
              {/* riser to the bus */}
              <line x1={cx} y1={BASE} x2={cx} y2={BUS} stroke="var(--line-strong)" strokeWidth="1.2" />
              <circle cx={cx} cy={BUS} r="4.5" fill="var(--background)" stroke="var(--research)" strokeWidth="1.4" />
              {/* role label â€” revealed on hover */}
              <text className="label-mono hv-label" x={cx} y={top - d - 12} textAnchor="middle" fill="var(--foreground)" fontSize="10">
                {tower.label}
              </text>
            </g>
          );
        })}
        {/* the shared bus */}
        <line x1="70" y1={BUS} x2="490" y2={BUS} stroke="var(--research)" strokeWidth="1.6" strokeDasharray="10 12" opacity="0.85" className="dash-march" />
      </svg>
    </div>
  );
}
