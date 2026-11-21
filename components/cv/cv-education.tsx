"use client";

import Link from "next/link";
import { studyTracks } from "@/data/credentials";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 06 — Education
 * An honest learning path: no formal records exist, so six self-directed
 * study tracks are shown with the working systems that evidence them.
 */

/** Deterministic sine mesh — no Math.random, so SSR and client agree. */
const wavePaths = Array.from({ length: 7 }, (_, k) =>
  Array.from({ length: 41 }, (_, i) => {
    const x = (i / 40) * 520;
    const y = 70 + k * 62 + Math.sin(i / 3.4 + k * 0.55) * 20;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ")
);

const pathNodes = studyTracks.map((track, index) => ({
  id: track.id,
  index: track.index,
  x: index % 2 === 0 ? 116 : 388,
  y: 96 + index * 82,
}));

function LearningPathVisual() {
  const pathD = pathNodes.map((node, i) => `${i === 0 ? "M" : "L"}${node.x} ${node.y}`).join(" ");
  return (
    <div
      style={{
        border: "1px solid var(--cv-edge)",
        background: "linear-gradient(180deg, rgba(9,20,36,0.6), rgba(3,7,13,0.2))",
        padding: 18,
      }}
    >
      <svg
        viewBox="0 0 520 600"
        width="100%"
        role="img"
        aria-label="Self-directed learning path across six study tracks"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="cv-edu-wave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#35d6ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7aa7ff" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="cv-edu-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff3030" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff3030" stopOpacity="0" />
          </radialGradient>
          <filter id="cv-edu-blur"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        {wavePaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#cv-edu-wave)"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.7}
          />
        ))}
        <path d={pathD} fill="none" stroke="rgba(255,48,48,0.85)" strokeWidth="1.4" strokeDasharray="4 5" />
        {pathNodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="30" fill="url(#cv-edu-glow)" filter="url(#cv-edu-blur)" />
            <circle cx={node.x} cy={node.y} r="13" fill="none" stroke="rgba(53,214,255,0.35)" strokeWidth="1" />
            <circle cx={node.x} cy={node.y} r="5" fill="#ff3030" />
            <text
              x={node.x + (node.x < 260 ? 24 : -24)}
              y={node.y + 4}
              textAnchor={node.x < 260 ? "start" : "end"}
              fill="#a7b4c8"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              {node.index}
            </text>
          </g>
        ))}
        <text
          x="260"
          y="576"
          textAnchor="middle"
          fill="#6d819c"
          fontSize="9"
          letterSpacing="3"
          fontFamily="ui-monospace, monospace"
        >
          SELF-DIRECTED / EVIDENCED
        </text>
      </svg>
    </div>
  );
}

export function CvEducation() {
  return (
    <CvChapterSection
      id="education"
      number="06"
      title="Education"
      kicker="CHAPTER 06 · EDUCATION"
      lead="No formal education record exists in this repository. What follows is a self-directed learning path — no provider, no certificate, no assessment — shown with the working systems it has already produced."
      tone="research"
      visual={<LearningPathVisual />}
    >
      <div className="cv-panel" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span className="cv-status" data-tone="red">No formal record</span>
          <span className="cv-label">Degrees · institutions · graduation dates</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--cv-muted)", lineHeight: 1.7, marginBottom: 12 }}>
          No formal education records (degrees, institutions, graduation dates) are present in the
          repository. All technical capabilities below are demonstrated through working systems,
          test suites, and verified credentials rather than academic credentials.
        </p>
        <p style={{ fontSize: 11, color: "var(--cv-dim)", lineHeight: 1.6 }}>
          Education is demonstrated through evidence: 56/56 test suites, 352 deterministic tests,
          72/72 agent-stack tests, and 10 verified certificates — not through institutional credentials.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <p className="cv-label">Self-directed study tracks · 06 ongoing</p>
        <span className="cv-label" style={{ color: "var(--cv-blue)" }}>No provider · no certificate</span>
      </div>
      <hr className="cv-rule" style={{ margin: "12px 0 24px" }} />

      <div className="cv-timeline">
        {studyTracks.map((track) => (
          <div className="cv-timeline-item" key={track.id}>
            <span className="cv-timeline-date">{track.index} / 06 · ONGOING</span>
            <h3
              style={{
                marginTop: 8,
                fontFamily: "var(--font-plex-mono), monospace",
                fontSize: 14,
                lineHeight: 1.35,
                color: "var(--cv-ink)",
              }}
            >
              {track.title}
            </h3>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.65 }}>
              {track.focus}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {track.method.map((method, i) => (
                <span
                  key={i}
                  className="cv-pill"
                  style={{
                    minHeight: "auto",
                    padding: "5px 9px",
                    borderRadius: 4,
                    letterSpacing: 0,
                    fontSize: 10,
                    lineHeight: 1.45,
                    whiteSpace: "normal",
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
              {track.evidenceProject ? (
                <Link className="cv-link" href={`/work/${track.evidenceProject}`}>
                  Work / {track.evidenceProject} →
                </Link>
              ) : null}
              {track.evidenceResearch ? (
                <Link className="cv-link" href={`/research/${track.evidenceResearch}`}>
                  Research / {track.evidenceResearch} →
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 6, fontSize: 11, color: "var(--cv-dim)", lineHeight: 1.6 }}>
        These tracks carry no provider, no certificate and no assessment — they are a record of what
        is being studied and where that study has already produced working systems.
      </p>
    </CvChapterSection>
  );
}