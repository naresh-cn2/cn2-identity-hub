"use client";

import type { ReactNode } from "react";

export function CvGrid() {
  return <div className="cv-grid" aria-hidden="true" />;
}

/** Deterministic star field — no Math.random, so SSR and client agree. */
export function CvParticles({ count = 26 }: { count?: number }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: count }, (_, i) => {
        const x = (i * 37 + 13) % 97;
        const y = (i * 53 + 29) % 89;
        const size = i % 7 === 0 ? 2 : 1;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 4 === 0 ? "rgba(255,48,48,0.65)" : "rgba(122,167,255,0.55)",
              boxShadow: "0 0 8px currentColor",
              opacity: 0.35 + (i % 5) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

/** Mountain / planetary horizon used as the baseline of every chapter. */
export function CvHorizon() {
  return (
    <svg
      className="cv-scene-horizon"
      viewBox="0 0 1200 210"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cv-horizon-glow" cx="50%" cy="100%" r="72%">
          <stop offset="0%" stopColor="rgba(255,48,48,0.30)" />
          <stop offset="45%" stopColor="rgba(27,77,201,0.16)" />
          <stop offset="100%" stopColor="rgba(3,7,13,0)" />
        </radialGradient>
        <linearGradient id="cv-horizon-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(122,167,255,0.05)" />
          <stop offset="50%" stopColor="rgba(255,48,48,0.55)" />
          <stop offset="100%" stopColor="rgba(122,167,255,0.05)" />
        </linearGradient>
      </defs>
      <rect x="0" y="40" width="1200" height="170" fill="url(#cv-horizon-glow)" />
      <path
        d="M0 168 L120 132 L220 158 L340 96 L448 150 L560 118 L690 164 L810 104 L930 152 L1050 122 L1200 170 L1200 210 L0 210 Z"
        fill="rgba(5,12,22,0.92)"
        stroke="url(#cv-horizon-line)"
        strokeWidth="1"
      />
      <path
        d="M0 196 L180 172 L310 190 L470 158 L620 192 L790 166 L960 194 L1120 176 L1200 196 L1200 210 L0 210 Z"
        fill="rgba(3,7,13,0.96)"
      />
    </svg>
  );
}

export interface CvOrbitNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tone?: "red" | "blue";
}

interface CvGlobeProps {
  caption?: string;
  nodes?: CvOrbitNode[];
  selected?: string | null;
  onSelect?: (id: string) => void;
  core?: ReactNode;
}

/** The recurring orbital/globe system used across identity, architecture and toolkit chapters. */
export function CvGlobe({ caption = "CN2 SYSTEMS", nodes = [], selected, onSelect, core }: CvGlobeProps) {
  return (
    <div className="cv-globe-wrap">
      <div className="cv-globe">
        <div className="cv-orbit" aria-hidden="true"><i className="cv-orbit-dot" /></div>
        <div className="cv-orbit" data-tone="red" aria-hidden="true"><i className="cv-orbit-dot" /></div>
        <div className="cv-globe-sphere" aria-hidden="true">
          <i className="cv-globe-lat" />
          <i className="cv-globe-lat" />
          <i className="cv-globe-lat" />
        </div>
        <div className="cv-globe-core" aria-hidden="true" />
        {core ? <span className="cv-globe-caption">{core}</span> : null}
      </div>
      {nodes.map((node) => (
        <button
          key={node.id}
          type="button"
          className="cv-node"
          data-tone={node.tone === "red" ? "red" : undefined}
          data-active={selected === node.id ? "true" : undefined}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => onSelect?.(node.id)}
          aria-pressed={selected === node.id}
        >
          {node.label}
        </button>
      ))}
      {caption ? <span className="cv-globe-caption">{caption}</span> : null}
    </div>
  );
}

export interface CvHexProps {
  index: string;
  label: string;
  icon?: ReactNode;
  caption?: string;
}

export function CvHexTile({ index, label, icon, caption }: CvHexProps) {
  return (
    <div className="cv-hex" title={caption}>
      <span className="cv-hex-index">{index}</span>
      {icon ? <span aria-hidden="true" style={{ color: "var(--cv-cyan)", display: "grid", placeItems: "center" }}>{icon}</span> : null}
      <span className="cv-hex-label">{label}</span>
    </div>
  );
}

interface CvGaugeProps {
  value: string;
  label: string;
  detail?: string;
  percent?: number;
}

export function CvGauge({ value, label, detail, percent = 76 }: CvGaugeProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dash = (Math.min(Math.max(percent, 0), 100) / 100) * circumference;
  return (
    <div className="cv-gauge">
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
        <defs>
          <linearGradient id="cv-gauge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff3030" />
            <stop offset="100%" stopColor="#7aa7ff" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(120,170,230,0.14)" strokeWidth="2.4" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#cv-gauge-grad)"
          strokeWidth="2.4"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(122,167,255,0.12)" strokeWidth="0.5" strokeDasharray="1 3" />
      </svg>
      <div className="cv-gauge-label">
        <span className="cv-gauge-value">{value}</span>
        <span className="cv-label">{label}</span>
        {detail ? <span style={{ color: "var(--cv-dim)", fontSize: 11 }}>{detail}</span> : null}
      </div>
    </div>
  );
}

export function CvTechPill({ label, tone }: { label: string; tone?: "red" | "cyan" }) {
  return <span className="cv-pill" data-tone={tone}>{label}</span>;
}

export function CvMeter({ value }: { value: number }) {
  return (
    <div className="cv-meter" aria-hidden="true">
      <i style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}
