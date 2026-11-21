"use client";

import Link from "next/link";
import { career } from "@/data/career";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Professional Experience — independent engineering work: systems, scope and evidence.
 * Presented as self-directed work, not salaried employment.
 */

interface Tower {
  x: number;
  width: number;
  height: number;
  red: boolean;
}

const towers: Tower[] = [
  { x: 40, width: 64, height: 168, red: false },
  { x: 122, width: 70, height: 232, red: true },
  { x: 200, width: 58, height: 196, red: false },
  { x: 276, width: 78, height: 276, red: true },
  { x: 368, width: 72, height: 214, red: false },
];

const skylineWindows = towers.flatMap((tower, ti) => {
  const top = 440 - tower.height;
  const rows = Math.floor((tower.height - 18) / 20);
  const cols = Math.floor((tower.width - 14) / 14);
  const cells: { x: number; y: number; lit: boolean; red: boolean; key: string }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const lit = (row * 7 + col * 3 + ti * 2) % 5 < 2;
      cells.push({
        x: tower.x + 9 + col * 14,
        y: top + 12 + row * 20,
        lit,
        red: lit && tower.red,
        key: `${ti}-${row}-${col}`,
      });
    }
  }
  return cells;
});

function SkylineVisual() {
  return (
    <div
      style={{
        border: "1px solid var(--cv-edge)",
        background: "linear-gradient(180deg, rgba(9,20,36,0.6), rgba(3,7,13,0.2))",
        padding: 18,
      }}
    >
      <svg viewBox="0 0 520 520" width="100%" role="img" aria-label="Glass skyline of five engineering systems" style={{ display: "block" }}>
        <defs>
          <linearGradient id="cv-exp-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(122,167,255,0.22)" />
            <stop offset="100%" stopColor="rgba(9,20,36,0.1)" />
          </linearGradient>
          <linearGradient id="cv-exp-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,48,48,0.35)" />
            <stop offset="100%" stopColor="rgba(255,48,48,0)" />
          </linearGradient>
          <filter id="cv-exp-glow"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <circle cx="356" cy="150" r="116" fill="rgba(27,77,201,0.16)" filter="url(#cv-exp-glow)" />
        {[120, 200, 280, 360].map((y) => (
          <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(122,167,255,0.06)" />
        ))}
        {towers.map((tower, i) => {
          const top = 440 - tower.height;
          return (
            <g key={i}>
              <rect
                x={tower.x}
                y={top}
                width={tower.width}
                height={tower.height}
                fill="url(#cv-exp-glass)"
                stroke={tower.red ? "rgba(255,48,48,0.5)" : "rgba(122,167,255,0.45)"}
              />
              <line
                x1={tower.x + tower.width / 2}
                y1={top}
                x2={tower.x + tower.width / 2}
                y2="440"
                stroke={tower.red ? "rgba(255,48,48,0.28)" : "rgba(122,167,255,0.24)"}
                className={tower.red ? "cv-trace" : undefined}
              />
              <line
                x1={tower.x}
                y1={top}
                x2={tower.x + tower.width}
                y2={top}
                stroke={tower.red ? "#ff3030" : "#7aa7ff"}
                strokeWidth="1.5"
              />
              {tower.red ? (
                <>
                  <circle cx={tower.x + tower.width / 2} cy={top - 8} r="9" fill="rgba(255,48,48,0.6)" filter="url(#cv-exp-glow)" />
                  <circle cx={tower.x + tower.width / 2} cy={top - 8} r="2.5" fill="#ff3030" />
                </>
              ) : null}
              <text
                x={tower.x + tower.width / 2}
                y="458"
                textAnchor="middle"
                fill="#6d819c"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        {skylineWindows.map((window) => (
          <rect
            key={window.key}
            x={window.x}
            y={window.y}
            width="5"
            height="8"
            fill={window.lit ? (window.red ? "#ff3030" : "#35d6ff") : "rgba(122,167,255,0.08)"}
            opacity={window.lit ? 0.9 : 1}
          />
        ))}
        <rect x="0" y="440" width="520" height="46" fill="url(#cv-exp-ground)" opacity="0.35" />
        <line x1="0" y1="440" x2="520" y2="440" stroke="rgba(255,48,48,0.55)" strokeWidth="1" />
        <text x="260" y="500" textAnchor="middle" fill="#6d819c" fontSize="9" letterSpacing="3" fontFamily="ui-monospace, monospace">
          FIVE SYSTEMS / SELF-DIRECTED
        </text>
      </svg>
    </div>
  );
}

export function CvEngineeringExperience() {
  return (
    <CvChapterSection
      id="engineering-experience"
      number="08"
      title="Professional Experience"
      kicker="Engineering history"
      lead="Five systems built end to end through independent, self-directed engineering, with the role, scope, metrics and supporting evidence recorded for each."
      tone="signal"
      visual={<SkylineVisual />}
    >
      <div className="cv-statement" style={{ marginBottom: 26 }}>
        Independent engineering work — personal projects and open research, not salaried employment.
      </div>
      <hr className="cv-rule" style={{ margin: "0 0 24px" }} />

      <div className="cv-timeline">
        {career.experience.map((entry, i) => (
          <div className="cv-timeline-item" key={entry.project}>
            <span className="cv-timeline-date">ENTRY {String(i + 1).padStart(2, "0")} / 05</span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "baseline",
                marginTop: 6,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-plex-mono), monospace",
                  fontSize: 15,
                  lineHeight: 1.3,
                  color: "var(--cv-ink)",
                }}
              >
                {entry.project}
              </h3>
              <CvEvidenceBadge level="VERIFIED" />
            </div>
            <p className="cv-label" style={{ marginTop: 6 }}>
              {entry.role} · Independent work
            </p>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.65 }}>
              {entry.scope}
            </p>
            <div style={{ marginTop: 10, borderLeft: "1px solid rgba(255,48,48,0.4)", paddingLeft: 12 }}>
              <p className="cv-label">Metrics</p>
              <p
                style={{
                  marginTop: 4,
                  fontFamily: "var(--font-plex-mono), monospace",
                  fontSize: 12,
                  color: "var(--cv-ink)",
                  lineHeight: 1.5,
                }}
              >
                {entry.metrics}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {entry.skills.map((skill) => (
                <span key={skill} className="cv-pill">{skill}</span>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              {entry.href.startsWith("/") ? (
                <Link className="cv-link" href={entry.href}>Case study →</Link>
              ) : (
                <a className="cv-link" href={entry.href} target="_blank" rel="noopener noreferrer">
                  Repository ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </CvChapterSection>
  );
}