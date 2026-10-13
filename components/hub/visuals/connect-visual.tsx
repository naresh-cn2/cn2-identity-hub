"use client";

import SceneCanvas, { pulseAt, rgba, type SceneDraw } from "./scene";
import { site } from "@/data/site";

/**
 * ConnectVisual â€” communication network.
 *
 * The only destination visual with real links: every node is an actual
 * channel â€” email, GitHub, LinkedIn, or the enquiry form behind /contact.
 * Nothing here is decorative; each point opens what it names. Canvas draws
 * the living room around the network; SVG carries the focusable nodes.
 */

const NODES: { x: number; y: number; label: string; href: string; external?: boolean }[] = [
  { x: 118, y: 112, label: "EMAIL", href: site.links.email },
  { x: 442, y: 112, label: "GITHUB", href: site.links.github, external: true },
  { x: 118, y: 310, label: "LINKEDIN", href: site.links.linkedin, external: true },
  { x: 442, y: 310, label: "ENQUIRY", href: "/contact" },
];

const CX = 280;
const CY = 211;

const drawConnect: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const cx = (CX / 560) * w;
  const cy = (CY / 420) * h;

  /* core glow */
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
  core.addColorStop(0, rgba(pal.signal, 0.06 * dim));
  core.addColorStop(0.5, rgba(pal.structure, 0.035 * dim));
  core.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, w, h);

  if (reduced || small) return;

  /* one pulse riding each spoke, staggered */
  for (let i = 0; i < NODES.length; i++) {
    const nx = (NODES[i].x / 560) * w;
    const ny = (NODES[i].y / 420) * h;
    const u = pulseAt(t, 4.2 + i * 0.7, i * 0.25);
    const x = cx + (nx - cx) * u;
    const y = cy + (ny - cy) * u;
    const tx = cx + (nx - cx) * Math.max(0, u - 0.12);
    const ty = cy + (ny - cy) * Math.max(0, u - 0.12);
    const col = i === 3 ? pal.signal : pal.bright;
    const g = ctx.createLinearGradient(tx, ty, x, y);
    g.addColorStop(0, rgba(col, 0));
    g.addColorStop(1, rgba(col, 0.4 * dim));
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = rgba(col, 0.55 * dim);
    ctx.beginPath();
    ctx.arc(x, y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
};

export default function ConnectVisual() {
  return (
    <div className="relative aspect-[560/420] w-full">
      <SceneCanvas draw={drawConnect} />
      <svg viewBox="0 0 560 420" className="absolute inset-0 h-full w-full">
        {/* spokes */}
        {NODES.map((n) => (
          <line key={n.label} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.75" />
        ))}
        {/* central identity core with radar pings */}
        <circle className="nexus-ping" cx={CX} cy={CY} r="40" fill="none" stroke="var(--signal)" strokeWidth="1.4" />
        <circle className="nexus-ping" cx={CX} cy={CY} r="40" fill="none" stroke="var(--signal)" strokeWidth="1.4" style={{ animationDelay: "1.4s" }} />
        <circle cx={CX} cy={CY} r="33" fill="var(--surface)" stroke="var(--signal)" strokeWidth="1.6" />
        <circle cx={CX} cy={CY} r="24" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
        <text x={CX} y={CY + 3} textAnchor="middle" fill="var(--foreground)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.12em">
          CN2.DEV
        </text>
        {/* the real channels */}
        {NODES.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="chan"
            {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <title>{`Open ${n.label.toLowerCase()} â€” ${n.href}`}</title>
            {/* focus ring â€” lights on keyboard focus */}
            <circle className="chan-ring" cx={n.x} cy={n.y} r="23" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0" />
            <circle className="chan-frame" cx={n.x} cy={n.y} r="16" fill="var(--background)" stroke="var(--research)" strokeWidth="1.6" />
            <circle className="chan-core" cx={n.x} cy={n.y} r="5" fill="var(--research)" />
            <text className="label-mono chan-label" x={n.x} y={n.y + 38} textAnchor="middle" fill="var(--muted)" fontSize="9">
              {n.label}
            </text>
          </a>
        ))}
      </svg>
    </div>
  );
}
