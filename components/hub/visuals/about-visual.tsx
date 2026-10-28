"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "./scene";

/**
 * AboutVisual â€” cinematic architectural environment.
 *
 * No charts, no panels: a horizon at night. A gateway stands in the distance
 * with a shaft of light above it, a lone figure on the reflective ground
 * walking toward it, stars breathing in three depth layers and one red
 * beacon on the structure. Pure atmosphere â€” the story lives on /about.
 */

const drawAbout: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const hz = h * 0.62; // horizon line
  const gx = w * (small ? 0.5 : 0.52); // gateway x
  const gy = hz - h * 0.001;

  /* three depth layers of stars */
  const count = small ? 40 : 90;
  for (let i = 0; i < count; i++) {
    const layer = (i % 3) / 2; // 0, .5, 1
    const sx = (Math.abs(Math.sin(i * 91.7 + 11.3) * 43758.5) % 1) * w;
    const sy = (Math.abs(Math.sin(i * 47.9 + 3.7) * 43758.5) % 1) * hz * 0.96;
    const drift = reduced ? 0 : Math.sin(t * 0.05 + i) * 2;
    const a = (0.2 + layer * 0.45) * (0.6 + 0.4 * Math.sin(t * (0.3 + layer * 0.4) + i * 1.7)) * dim;
    ctx.fillStyle = rgba(pal.bright, a);
    ctx.beginPath();
    ctx.arc(sx + drift, sy, 0.7 + layer * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  /* volumetric shaft rising above the gateway */
  const shaft = ctx.createLinearGradient(0, h * 0.06, 0, gy);
  shaft.addColorStop(0, rgba(pal.structure, 0));
  shaft.addColorStop(0.5, rgba(pal.structure, 0.18 * dim * breathe(t, 0.5, 0)));
  shaft.addColorStop(1, rgba(pal.bright, 0.4 * dim));
  ctx.fillStyle = shaft;
  ctx.beginPath();
  ctx.moveTo(gx - w * 0.02, gy);
  ctx.lineTo(gx + w * 0.02, gy);
  ctx.lineTo(gx + w * 0.085, h * 0.04);
  ctx.lineTo(gx - w * 0.085, h * 0.04);
  ctx.closePath();
  ctx.fill();

  /* haze bands above the ground */
  for (let k = 0; k < 3; k++) {
    const y = hz - h * (0.03 + k * 0.05);
    const g = ctx.createLinearGradient(0, y - 14, 0, y + 14);
    g.addColorStop(0, rgba(pal.structure, 0));
    g.addColorStop(0.5, rgba(pal.structure, (0.16 - k * 0.03) * dim));
    g.addColorStop(1, rgba(pal.structure, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 14, w, 28);
  }

  /* reflective ground: the gateway's light pooling toward the viewer */
  const pool = ctx.createRadialGradient(gx, hz, 0, gx, hz, h * 0.5);
  pool.addColorStop(0, rgba(pal.bright, 0.28 * dim));
  pool.addColorStop(0.5, rgba(pal.structure, 0.12 * dim));
  pool.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = pool;
  ctx.fillRect(0, hz, w, h - hz);
  pool.addColorStop(0.4, rgba(pal.structure, 0.03 * dim));
  pool.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = pool;
  ctx.fillRect(0, hz, w, h - hz);

  /* red beacon blink on the gateway apex */
  if (!reduced) {
    const b = breathe(t, 1.5, 0);
    const ay = gy - h * 0.16;
    const glow = ctx.createRadialGradient(gx, ay, 0, gx, ay, 12);
    glow.addColorStop(0, rgba(pal.signal, 0.28 * b * dim));
    glow.addColorStop(1, rgba(pal.signal, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(gx, ay, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgba(pal.signal, (0.4 + 0.6 * b) * dim);
    ctx.beginPath();
    ctx.arc(gx, ay, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
};

export default function AboutVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawAbout} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* horizon */}
        <line x1="0" y1="260" x2="560" y2="260" stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.9" />
        {/* ground strata receding toward the viewer */}
        <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.3">
          <line x1="110" y1="296" x2="450" y2="296" />
          <line x1="165" y1="332" x2="395" y2="332" />
          <line x1="215" y1="368" x2="345" y2="368" />
        </g>
        {/* the distant gateway */}
        <g stroke="var(--line-strong)" strokeWidth="1.6" fill="none">
          <path d="M262,260 L262,196 Q292,166 322,196 L322,260" />
          <line x1="250" y1="260" x2="334" y2="260" strokeWidth="2" />
        </g>
        <path d="M270,260 L270,200 Q292,178 314,200 L314,260 Z" fill="var(--research)" opacity="0.08" />
        {/* apex beacon */}
        <circle cx="292" cy="168" r="8" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.4" />
        <circle cx="292" cy="168" r="2.4" fill="var(--signal)" className="anim-blink" />
        {/* a lone figure on the reflective ground */}
        <g fill="var(--foreground)" opacity="0.85">
          <circle cx="234" cy="285" r="3.2" />
          <path d="M234,288.5 L234,298 M234,291 L230,296 M234,291 L238,296 M234,298 L231,305 M234,298 L237,305" stroke="var(--foreground)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>
        {/* the figure's long reflection */}
        <line x1="234" y1="307" x2="234" y2="326" stroke="var(--foreground)" strokeWidth="1.4" opacity="0.18" />
      </svg>
    </div>
  );
}
