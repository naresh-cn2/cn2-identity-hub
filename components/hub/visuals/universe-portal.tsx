"use client";

import SceneCanvas, { breathe, pulseAt, rgba, type SceneDraw } from "./scene";

/**
 * UniversePortal â€” the /hub hero centerpiece.
 *
 * One powerful custom visual: a large circular data gate standing in a dark
 * reflective environment. Blue-white light originates from the portal; a
 * perspective floor carries its reflection; two architectural pylons frame
 * the gate; restrained red signal lights blink on the structure; fine
 * filament pathways reach out of the ring with travelling pulses. A crisp
 * SVG tick-structure sits over the moving canvas light.
 *
 * Pure atmosphere â€” no labels, no statistics. All motion is analytic in
 * `drawPortal`, so every mount composes identically and the global
 * reduced-motion rule freezes it on one calm frame.
 */

const hash = (i: number) => {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return Math.abs(v - Math.floor(v));
};

const quad = (
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  u: number
): [number, number] => {
  const a = (1 - u) * (1 - u);
  const b = 2 * (1 - u) * u;
  const c = u * u;
  return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]];
};

const FILAMENTS: Array<[number, number, number, number]> = [
  // control-point lift and exit direction for each filament
  [0.2, -0.9, -1.45, -0.35],
  [-0.15, -1.0, 1.5, -0.5],
  [0.25, 0.9, 1.55, 0.55],
  [-0.3, 0.85, -1.5, 0.6],
];

const drawPortal: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const cx = w * (small ? 0.5 : 0.64);
  const cy = h * 0.47;
  const R = Math.min(w, h) * (small ? 0.24 : 0.3);
  const hz = h * 0.68; // the reflective floor's horizon

  /* ---- atmosphere: deep haze behind the gate ---- */
  const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.6);
  haze.addColorStop(0, rgba(pal.structure, 0.07 * dim));
  haze.addColorStop(0.55, rgba(pal.deep, 0.04 * dim));
  haze.addColorStop(1, rgba(pal.deep, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  /* ---- perspective floor converging on the gate ---- */
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba(pal.deep, 0.09 * dim);
  ctx.beginPath();
  for (let i = -7; i <= 7; i++) {
    ctx.moveTo(cx, hz);
    ctx.lineTo(cx + i * w * 0.13, h * 1.02);
  }
  ctx.stroke();
  const travel = reduced ? 0 : (t * 0.1) % 1;
  ctx.strokeStyle = rgba(pal.structure, 0.055 * dim);
  ctx.beginPath();
  for (let k = 0; k < 9; k++) {
    const z = 1 + k + travel;
    const y = hz + (h - hz) / z;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  /* ---- the gate's reflection smeared across the floor ---- */
  const refl = ctx.createLinearGradient(0, hz, 0, h);
  refl.addColorStop(0, rgba(pal.bright, (0.09 + 0.03 * breathe(t, 0.9, 0)) * dim));
  refl.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = refl;
  ctx.fillRect(cx - R * 0.8, hz, R * 1.6, h - hz);

  /* ---- volumetric light cone dropping from the gate ---- */
  const cone = ctx.createLinearGradient(0, cy, 0, hz);
  cone.addColorStop(0, rgba(pal.bright, 0.06 * dim));
  cone.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(cx - R * 0.55, cy);
  ctx.lineTo(cx + R * 0.55, cy);
  ctx.lineTo(cx + R * 1.2, hz);
  ctx.lineTo(cx - R * 1.2, hz);
  ctx.closePath();
  ctx.fill();

  /* ---- filament pathways reaching out of the gate ---- */
  ctx.lineWidth = 1;
  for (let i = 0; i < FILAMENTS.length; i++) {
    const [kx, ky, ex, ey] = FILAMENTS[i];
    const p0: [number, number] = [cx + ex * R * 0.42, cy + ey * R * 0.42];
    const p1: [number, number] = [cx + kx * R, cy + ky * R];
    const p2: [number, number] = [cx + ex * R * 2.4, cy + ey * R * 1.7];
    ctx.strokeStyle = rgba(pal.structure, 0.08 * dim);
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.quadraticCurveTo(p1[0], p1[1], p2[0], p2[1]);
    ctx.stroke();
    // one travelling pulse per filament â€” analytic, staggered
    const u = pulseAt(t, 5.5 + i * 1.4, i * 0.23);
    const [px, py] = quad(p0, p1, p2, u);
    const [tx, ty] = quad(p0, p1, p2, Math.max(0, u - 0.12));
    const col = i === 2 ? pal.signal : pal.bright;
    const g = ctx.createLinearGradient(tx, ty, px, py);
    g.addColorStop(0, rgba(col, 0));
    g.addColorStop(1, rgba(col, 0.4 * dim));
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.fillStyle = rgba(col, 0.6 * dim);
    ctx.beginPath();
    ctx.arc(px, py, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
  }

  /* ---- counter-rotating dashed ring system ---- */
  const rings = [
    { r: 1.0, dash: [3, 10], speed: 0.05, a: 0.22, lw: 1.1 },
    { r: 0.78, dash: [1, 9], speed: -0.085, a: 0.17, lw: 1 },
    { r: 0.56, dash: [7, 13], speed: 0.12, a: 0.3, lw: 1.2 },
  ];
  for (const ring of rings) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(reduced ? 0.6 : t * ring.speed);
    ctx.strokeStyle = rgba(pal.structure, ring.a * dim);
    ctx.lineWidth = ring.lw;
    ctx.setLineDash(ring.dash);
    ctx.beginPath();
    ctx.arc(0, 0, R * ring.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.setLineDash([]);

  /* ---- the core: breathing blue-white light ---- */
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
  core.addColorStop(0, rgba(pal.bright, (0.13 + 0.04 * breathe(t, 0.9, 0)) * dim));
  core.addColorStop(0.45, rgba(pal.structure, 0.05 * dim));
  core.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
  ctx.fill();

  /* aperture â€” a dark disc with a bright breathing rim */
  ctx.fillStyle = rgba(pal.deep, 0.14 * dim);
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = rgba(pal.bright, (0.35 + 0.2 * breathe(t, 0.9, 1.2)) * dim);
  ctx.lineWidth = 1.6;
  ctx.stroke();

  /* ---- architectural pylons framing the gate ---- */
  const pylonX = R * 1.55;
  const topY = cy - R * 0.7;
  const capY = cy - R * 0.95;
  ctx.strokeStyle = rgba(pal.structure, 0.2 * dim);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - pylonX, hz);
  ctx.lineTo(cx - pylonX, topY);
  ctx.moveTo(cx + pylonX, hz);
  ctx.lineTo(cx + pylonX, topY);
  ctx.stroke();
  // lintel arc joining the caps
  ctx.strokeStyle = rgba(pal.structure, 0.1 * dim);
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 9]);
  ctx.beginPath();
  ctx.moveTo(cx - pylonX, capY + R * 0.25);
  ctx.quadraticCurveTo(cx, capY - R * 0.55, cx + pylonX, capY + R * 0.25);
  ctx.stroke();
  ctx.setLineDash([]);
  // structural cross ticks on each pylon
  ctx.strokeStyle = rgba(pal.structure, 0.12 * dim);
  ctx.beginPath();
  for (const sx of [cx - pylonX, cx + pylonX]) {
    for (let k = 1; k <= 3; k++) {
      const y = hz - ((hz - topY) * k) / 4;
      ctx.moveTo(sx - 4, y);
      ctx.lineTo(sx + 4, y);
    }
  }
  ctx.stroke();

  /* ---- restrained red signal lights on the structure ---- */
  const beacons: Array<[number, number, number]> = [
    [cx - pylonX, capY + R * 0.25, 0],
    [cx + pylonX, capY + R * 0.25, 2.1],
    [cx, cy + R * 0.56 * 0.9, 4.2],
  ];
  for (const [bx, by, ph] of beacons) {
    const b = breathe(t, 1.7, ph);
    const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 11);
    glow.addColorStop(0, rgba(pal.signal, 0.22 * b * dim));
    glow.addColorStop(1, rgba(pal.signal, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(bx, by, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgba(pal.signal, (0.45 + 0.5 * b) * dim);
    ctx.beginPath();
    ctx.arc(bx, by, 1.9, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---- drifting motes in the air ---- */
  const count = small ? 12 : 26;
  for (let i = 0; i < count; i++) {
    const sp = 5 + hash(i + 7) * 9;
    const y = ((hash(i) * h - (reduced ? 0 : t * sp)) % h + h) % h;
    const x = hash(i + 50) * w + Math.sin(t * 0.25 + i) * 5;
    const a = (0.08 + 0.12 * breathe(t, 0.6 + hash(i + 3), i)) * dim;
    ctx.fillStyle = rgba(i % 7 === 0 ? pal.signal : pal.structure, a);
    ctx.beginPath();
    ctx.arc(x, y, i % 7 === 0 ? 1.1 : 0.9, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** Crisp static structure drawn over the moving light. */
function PortalOverlay() {
  const ticks = Array.from({ length: 60 }, (_, i) => i * 6);
  return (
    <svg
      viewBox="0 0 560 460"
      focusable="false"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      {/* aperture rims â€” double precision ring around the light */}
      <circle cx="358" cy="216" r="128" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.55" />
      <circle cx="358" cy="216" r="136" fill="none" stroke="var(--research)" strokeWidth="0.8" strokeDasharray="2 7" opacity="0.5" />
      {/* graduated tick ring â€” the gate's instrument scale */}
      <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.6">
        {ticks.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const long = i % 5 === 0;
          const r1 = long ? 138 : 143;
          const r2 = 149;
          return (
            <line
              key={deg}
              x1={358 + Math.cos(rad) * r1}
              y1={216 + Math.sin(rad) * r1}
              x2={358 + Math.cos(rad) * r2}
              y2={216 + Math.sin(rad) * r2}
              opacity={long ? 0.9 : 0.45}
            />
          );
        })}
      </g>
      {/* registration crosses â€” drafting-plate detail */}
      <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.5">
        {[
          [70, 70],
          [512, 96],
          [92, 398],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
            <circle cx={x} cy={y} r="4" fill="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function UniversePortal() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <SceneCanvas draw={drawPortal} />
      <PortalOverlay />
    </div>
  );
}
