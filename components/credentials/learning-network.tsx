"use client";

import { useState } from "react";

/**
 * LearningNetwork — the credentials hero centerpiece.
 *
 * Two concentric rings around one core: the issued certificates on the outer
 * ring, the self-directed study tracks on the inner ring. Node positions are
 * decorative; the counts and the titles come straight from the records on
 * this page. Hovering or focusing a node lights its spoke and names it in the
 * caption below. Every animation is CSS-driven, so the whole figure freezes
 * under prefers-reduced-motion.
 */

const W = 1000;
const H = 440;
const CX = W / 2;
const CY = H / 2;

const RINGS = {
  credential: { rx: 396, ry: 176 },
  track: { rx: 214, ry: 96 },
} as const;

type RingName = keyof typeof RINGS;

interface NetNode {
  key: string;
  tag: string;
  label: string;
  ring: RingName;
}

function ringPoint(ring: RingName, i: number, total: number) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / total;
  const { rx, ry } = RINGS[ring];
  return { x: CX + Math.cos(a) * rx, y: CY + Math.sin(a) * ry, a };
}

function ringPath(ring: RingName, total: number) {
  return (
    Array.from({ length: total }, (_, i) => {
      const p = ringPoint(ring, i, total);
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }).join(" ") + " Z"
  );
}

export default function LearningNetwork({
  credentials,
  tracks,
}: {
  credentials: { id: string; program: string; provider: string }[];
  tracks: { id: string; title: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const nodes: NetNode[] = [
    ...credentials.map((c, i) => ({
      key: c.id,
      tag: `C${i + 1}`,
      label: `${c.program} — ${c.provider}`,
      ring: "credential" as RingName,
    })),
    ...tracks.map((t, i) => ({
      key: t.id,
      tag: `S${i + 1}`,
      label: t.title,
      ring: "track" as RingName,
    })),
  ];

  const byRing = (ring: RingName) => nodes.filter((n) => n.ring === ring);
  const activeNode = nodes.find((n) => n.key === active);

  const spoke = (n: NetNode) => {
    const list = byRing(n.ring);
    const p = ringPoint(n.ring, list.indexOf(n), list.length);
    const lit = active === n.key;
    const dim = active !== null && !lit;
    return (
      <g key={`spoke-${n.key}`}>
        <line
          x1={CX}
          y1={CY}
          x2={p.x}
          y2={p.y}
          stroke={lit ? (n.ring === "credential" ? "var(--signal)" : "var(--research)") : "var(--line-strong)"}
          strokeWidth={lit ? 1.6 : 1}
          strokeDasharray="3 6"
          opacity={dim ? 0.25 : lit ? 0.95 : 0.5}
          style={{ transition: "stroke 260ms ease, opacity 260ms ease" }}
        />
        <line
          x1={CX}
          y1={CY}
          x2={p.x}
          y2={p.y}
          pathLength={100}
          className="travel-pulse"
          stroke={lit ? (n.ring === "credential" ? "var(--signal)" : "var(--research)") : "var(--line-strong)"}
          strokeWidth={lit ? 3 : 2}
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          opacity={dim ? 0 : lit ? 0.95 : 0.4}
          style={{ transition: "stroke 260ms ease, opacity 260ms ease", animationDelay: `${(n.tag.charCodeAt(1) % 7) * 0.5}s` }}
        />
      </g>
    );
  };

  const nodeMark = (n: NetNode) => {
    const list = byRing(n.ring);
    const p = ringPoint(n.ring, list.indexOf(n), list.length);
    const lit = active === n.key;
    const dim = active !== null && !lit;
    const stroke = n.ring === "credential" ? "var(--signal)" : "var(--research)";
    // label sits just outside the ring, along the node's radius
    const lx = p.x + Math.cos(p.a) * 30;
    const ly = p.y + Math.sin(p.a) * 24;
    return (
      <g
        key={n.key}
        tabIndex={0}
        role="button"
        aria-label={`${n.tag} — ${n.label}`}
        onMouseEnter={() => setActive(n.key)}
        onMouseLeave={() => setActive((prev) => (prev === n.key ? null : prev))}
        onFocus={() => setActive(n.key)}
        onBlur={() => setActive((prev) => (prev === n.key ? null : prev))}
        className="cursor-pointer outline-none"
        opacity={dim ? 0.45 : 1}
        style={{ transition: "opacity 260ms ease" }}
      >
        <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
        <circle
          cx={p.x}
          cy={p.y}
          r={lit ? 9 : 6.5}
          fill="var(--background)"
          stroke={stroke}
          strokeWidth={lit ? 2.2 : 1.4}
          style={{ transition: "r 260ms ease, stroke-width 260ms ease" }}
        />
        <circle cx={p.x} cy={p.y} r={lit ? 3.4 : 2.2} fill={stroke} style={{ transition: "r 260ms ease" }} />
        <text
          x={lx}
          y={ly + 3}
          textAnchor="middle"
          fontSize="11"
          letterSpacing="0.08em"
          fill={lit ? stroke : "var(--faint)"}
          style={{ fontFamily: "var(--font-mono)", transition: "fill 260ms ease" }}
        >
          {n.tag}
        </text>
      </g>
    );
  };

  const credentialsCount = credentials.length;
  const tracksCount = tracks.length;

  return (
    <figure className="m-0">
      <div className="viz-frame p-4 sm:p-6">
        {/* ---- wide composition: two rings around the core ---- */}
        <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full sm:block">
          <title>Learning network: issued certificates and self-directed study tracks</title>

          {/* ring guides */}
          <path
            d={ringPath("credential", credentialsCount)}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.6"
          />
          <path
            d={ringPath("track", tracksCount)}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.6"
          />

          {nodes.map(spoke)}

          {/* core */}
          <g>
            <circle cx={CX} cy={CY} r={38} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={4} fill="var(--signal)" className="pulse-dot" />
            <text
              x={CX}
              y={CY + 62}
              textAnchor="middle"
              fontSize="11"
              letterSpacing="0.22em"
              fill="var(--muted)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CONTINUOUS LEARNING
            </text>
          </g>

          {nodes.map(nodeMark)}
        </svg>

        {/* ---- compact composition for small screens ---- */}
        <svg viewBox="0 0 360 150" className="h-auto w-full sm:hidden" aria-hidden="true">
          <title>Learning network: issued certificates and self-directed study tracks</title>
          <line x1="18" y1="42" x2="342" y2="42" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 6" />
          <line x1="18" y1="112" x2="342" y2="112" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 6" />
          {Array.from({ length: credentialsCount }, (_, i) => {
            const x = 24 + (i * 312) / Math.max(1, credentialsCount - 1);
            return <circle key={`c${i}`} cx={x} cy={42} r="4" fill="var(--signal)" opacity="0.85" />;
          })}
          {Array.from({ length: tracksCount }, (_, i) => {
            const x = 30 + (i * 300) / Math.max(1, tracksCount - 1);
            return <circle key={`s${i}`} cx={x} cy={112} r="4" fill="var(--research)" opacity="0.85" />;
          })}
          <text x="18" y="22" fontSize="10" letterSpacing="0.16em" fill="var(--faint)" style={{ fontFamily: "var(--font-mono)" }}>
            {credentialsCount} ISSUED CERTIFICATES
          </text>
          <text x="18" y="136" fontSize="10" letterSpacing="0.16em" fill="var(--faint)" style={{ fontFamily: "var(--font-mono)" }}>
            {tracksCount} SELF-DIRECTED TRACKS
          </text>
        </svg>
      </div>

      <figcaption className="label-mono mt-4 min-h-[2.5em] text-center text-[10px] leading-relaxed text-faint" aria-live="polite">
        {activeNode ? (
          <span className="text-foreground">
            {activeNode.tag} — {activeNode.label}
          </span>
        ) : (
          <>
            C1–C{credentialsCount} ISSUED CERTIFICATES · S1–S{tracksCount} SELF-DIRECTED TRACKS
            <span className="hidden sm:inline"> — HOVER OR FOCUS A NODE TO NAME IT</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
