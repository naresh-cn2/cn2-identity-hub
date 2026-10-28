"use client";

import SceneCanvas, { breathe, pulseAt, type SceneDraw } from "./scene";

/**
 * UniversePortal — The /hub hero centerpiece.
 *
 * Cinematic 3D Holographic Data Gate:
 * - High-visibility luminous electric-cyan aperture with multi-layered breathing bloom.
 * - Receding 3D perspective floor grid converging on the gate's horizon.
 * - Counter-rotating segmented telemetry rings with glowing neon tick patterns.
 * - Architectural pylon pylons with signature crimson telemetry beacons.
 * - Flowing particle filaments carrying traveling data pulses with glowing trails.
 * - Crisp SVG precision instrument scale overlay.
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
  [0.2, -0.9, -1.45, -0.35],
  [-0.15, -1.0, 1.5, -0.5],
  [0.25, 0.9, 1.55, 0.55],
  [-0.3, 0.85, -1.5, 0.6],
];

const drawPortal: SceneDraw = (ctx, { t, w, h, dim, reduced, small }) => {
  const cx = w * (small ? 0.5 : 0.64);
  const cy = h * 0.47;
  const R = Math.min(w, h) * (small ? 0.24 : 0.3);
  const hz = h * 0.68; // the reflective floor's horizon

  // 1. Atmospheric Ambient Aura
  const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.8);
  haze.addColorStop(0, "rgba(0, 240, 255, 0.22)");
  haze.addColorStop(0.35, "rgba(22, 119, 255, 0.12)");
  haze.addColorStop(0.7, "rgba(4, 7, 20, 0.05)");
  haze.addColorStop(1, "rgba(3, 7, 18, 0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  // 2. 3D Perspective Floor Grid Converging on Horizon
  ctx.lineWidth = 1.1;
  for (let i = -8; i <= 8; i++) {
    const xEnd = cx + i * w * 0.12;
    const alpha = Math.max(0.08, 0.35 - Math.abs(i) * 0.035);
    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(cx, hz);
    ctx.lineTo(xEnd, h * 1.05);
    ctx.stroke();
  }

  const travel = reduced ? 0 : (t * 0.12) % 1;
  for (let k = 0; k < 10; k++) {
    const z = 1 + k + travel;
    const y = hz + (h - hz) / z;
    const depthAlpha = Math.max(0.06, 0.32 * (1 - k / 10));
    ctx.strokeStyle = `rgba(56, 189, 248, ${depthAlpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 3. Floor Reflection Pool (Reflective specular puddle)
  ctx.save();
  ctx.translate(cx, hz + (h - hz) * 0.28);
  ctx.scale(1, 0.42);
  const refl = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.4);
  const reflPulse = (0.22 + 0.08 * breathe(t, 0.9, 0)) * dim;
  refl.addColorStop(0, `rgba(0, 240, 255, ${reflPulse.toFixed(3)})`);
  refl.addColorStop(0.4, "rgba(14, 116, 244, 0.12)");
  refl.addColorStop(1, "rgba(0, 240, 255, 0)");
  ctx.fillStyle = refl;
  ctx.beginPath();
  ctx.arc(0, 0, R * 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Volumetric Light Cone
  const cone = ctx.createLinearGradient(0, cy, 0, hz);
  cone.addColorStop(0, "rgba(0, 240, 255, 0.14)");
  cone.addColorStop(0.6, "rgba(14, 116, 244, 0.06)");
  cone.addColorStop(1, "rgba(0, 240, 255, 0)");
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(cx - R * 0.65, cy);
  ctx.lineTo(cx + R * 0.65, cy);
  ctx.lineTo(cx + R * 1.35, hz);
  ctx.lineTo(cx - R * 1.35, hz);
  ctx.closePath();
  ctx.fill();

  // 5. Filament Pathways with Traveling High-Energy Pulses
  for (let i = 0; i < FILAMENTS.length; i++) {
    const [kx, ky, ex, ey] = FILAMENTS[i];
    const p0: [number, number] = [cx + ex * R * 0.42, cy + ey * R * 0.42];
    const p1: [number, number] = [cx + kx * R, cy + ky * R];
    const p2: [number, number] = [cx + ex * R * 2.4, cy + ey * R * 1.7];

    ctx.strokeStyle = "rgba(0, 240, 255, 0.24)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.quadraticCurveTo(p1[0], p1[1], p2[0], p2[1]);
    ctx.stroke();

    const u = pulseAt(t, 5.5 + i * 1.4, i * 0.23);
    const [px, py] = quad(p0, p1, p2, u);
    const [tx, ty] = quad(p0, p1, p2, Math.max(0, u - 0.14));
    const isRed = i === 2;
    const pulseColor = isRed ? "rgba(255, 48, 48, " : "rgba(0, 240, 255, ";

    const g = ctx.createLinearGradient(tx, ty, px, py);
    g.addColorStop(0, `${pulseColor}0)`);
    g.addColorStop(1, `${pulseColor}0.85)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Pulse Head Node
    ctx.fillStyle = `${pulseColor}1)`;
    ctx.beginPath();
    ctx.arc(px, py, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Segmented Concentric Rings with Counter-Rotation
  const rings = [
    { r: 1.05, dash: [4, 12], speed: 0.04, a: 0.45, lw: 1.4, color: "rgba(0, 240, 255," },
    { r: 0.85, dash: [2, 8], speed: -0.07, a: 0.35, lw: 1.2, color: "rgba(56, 189, 248," },
    { r: 0.62, dash: [8, 14], speed: 0.1, a: 0.55, lw: 1.6, color: "rgba(0, 240, 255," },
    { r: 0.42, dash: [1, 6], speed: -0.14, a: 0.65, lw: 1.0, color: "rgba(255, 48, 48," },
  ];
  for (const ring of rings) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(reduced ? 0.6 : t * ring.speed);
    ctx.strokeStyle = `${ring.color} ${ring.a})`;
    ctx.lineWidth = ring.lw;
    ctx.setLineDash(ring.dash);
    ctx.beginPath();
    ctx.arc(0, 0, R * ring.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.setLineDash([]);

  // 7. Luminous Core Aperture
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
  const coreAlpha = 0.28 + 0.08 * breathe(t, 0.9, 0);
  core.addColorStop(0, `rgba(0, 240, 255, ${coreAlpha.toFixed(3)})`);
  core.addColorStop(0.4, "rgba(22, 119, 255, 0.12)");
  core.addColorStop(1, "rgba(0, 240, 255, 0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // Aperture Rim
  ctx.fillStyle = "rgba(4, 7, 20, 0.45)";
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(0, 240, 255, ${(0.65 + 0.3 * breathe(t, 0.9, 1.2)).toFixed(2)})`;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2);
  ctx.stroke();

  // 8. Architectural Pylons
  const pylonX = R * 1.55;
  const topY = cy - R * 0.7;
  const capY = cy - R * 0.95;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.35)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - pylonX, hz);
  ctx.lineTo(cx - pylonX, topY);
  ctx.moveTo(cx + pylonX, hz);
  ctx.lineTo(cx + pylonX, topY);
  ctx.stroke();

  // Pylon Cross Ticks
  for (const sx of [cx - pylonX, cx + pylonX]) {
    for (let k = 1; k <= 4; k++) {
      const y = hz - ((hz - topY) * k) / 5;
      ctx.beginPath();
      ctx.moveTo(sx - 6, y);
      ctx.lineTo(sx + 6, y);
      ctx.stroke();
    }
  }

  // 9. Crimson Telemetry Beacons
  const beacons: Array<[number, number, number]> = [
    [cx - pylonX, capY + R * 0.25, 0],
    [cx + pylonX, capY + R * 0.25, 2.1],
    [cx, cy + R * 0.62 * 0.95, 4.2],
  ];
  for (const [bx, by, ph] of beacons) {
    const b = breathe(t, 1.7, ph);
    const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 16);
    glow.addColorStop(0, `rgba(255, 48, 48, ${(0.45 * b).toFixed(2)})`);
    glow.addColorStop(1, "rgba(255, 48, 48, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(bx, by, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 48, 48, ${(0.8 + 0.2 * b).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(bx, by, 2.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // 10. Drifting Quantitative Particles
  const count = small ? 18 : 42;
  for (let i = 0; i < count; i++) {
    const sp = 6 + hash(i + 7) * 11;
    const y = ((hash(i) * h - (reduced ? 0 : t * sp)) % h + h) % h;
    const x = hash(i + 50) * w + Math.sin(t * 0.25 + i) * 8;
    const a = 0.2 + 0.3 * breathe(t, 0.6 + hash(i + 3), i);
    const isRed = i % 6 === 0;
    ctx.fillStyle = isRed ? `rgba(255, 48, 48, ${a.toFixed(2)})` : `rgba(0, 240, 255, ${a.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(x, y, isRed ? 1.6 : 1.2, 0, Math.PI * 2);
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
      className="absolute inset-0 h-full w-full pointer-events-none"
    >
      {/* aperture rims — precision rings with cyan glow */}
      <circle
        cx="358"
        cy="216"
        r="128"
        fill="none"
        stroke="#00f0ff"
        strokeWidth="1.2"
        opacity="0.75"
        className="drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
      />
      <circle
        cx="358"
        cy="216"
        r="136"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="0.9"
        strokeDasharray="3 7"
        opacity="0.65"
      />

      {/* graduated tick ring — instrument scale */}
      <g stroke="#00f0ff" strokeWidth="1" opacity="0.7">
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
              opacity={long ? 0.95 : 0.5}
            />
          );
        })}
      </g>

      {/* registration crosses */}
      <g stroke="#38bdf8" strokeWidth="1" opacity="0.6">
        {[
          [70, 70],
          [512, 96],
          [92, 398],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} />
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
