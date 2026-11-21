"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Bot,
  Code,
  Database,
  FlaskConical,
  Network,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { capabilities } from "@/data/about";
import {
  CvChapterSection,
  CvEvidenceBadge,
  CvLinkList,
} from "@/components/cv/cv-layout";
import { CvHexTile } from "@/components/cv/cv-visuals";

/**
 * Chapter 04 — Core Capabilities
 * A seven-cell honeycomb: six hexagons orbit a core capability. Selecting a
 * cell opens its full purpose, problems and evidence; a compact evidence
 * index below keeps every link and work label visible at a glance.
 */

const hexIcons: Record<string, ReactNode> = {
  "quant-finance": <Activity size={22} strokeWidth={1.4} />,
  "algo-trading": <BarChart3 size={22} strokeWidth={1.4} />,
  "ai-agents": <Bot size={22} strokeWidth={1.4} />,
  "software-eng": <Code size={22} strokeWidth={1.4} />,
  "data-infra": <Database size={22} strokeWidth={1.4} />,
  "biz-analytics": <Network size={22} strokeWidth={1.4} />,
  "research-systems": <FlaskConical size={22} strokeWidth={1.4} />,
};

const shortLabels: Record<string, string> = {
  "quant-finance": "Quant Finance",
  "algo-trading": "Algo Trading",
  "ai-agents": "AI Systems",
  "software-eng": "Software",
  "data-infra": "Data Infra",
  "biz-analytics": "Analytics",
  "research-systems": "Research",
};

const hexPositions = [
  { x: 50, y: 50 },
  { x: 50, y: 12 },
  { x: 84, y: 31 },
  { x: 84, y: 69 },
  { x: 50, y: 88 },
  { x: 16, y: 69 },
  { x: 16, y: 31 },
];

export function CvCoreCapabilities() {
  const [selected, setSelected] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const active = capabilities[selected];

  return (
    <CvChapterSection
      id="core-capabilities"
      number="04"
      title="Core Capabilities"
      kicker="Domains, problems, evidence"
      lead="Seven disciplines, one method: understand the problem, build the representation, verify the result. Every capability carries an honest status and links to real work."
      tone="research"
      visual={
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            aspectRatio: "1 / 1",
            margin: "0 auto",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <polygon
              points="50,12 84,31 84,69 50,88 16,69 16,31"
              fill="none"
              stroke="var(--cv-blue)"
              strokeOpacity="0.28"
              strokeWidth="0.3"
              strokeDasharray="1.5 2"
            />
            {hexPositions.slice(1).map((p, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="var(--cv-red)"
                strokeOpacity="0.18"
                strokeWidth="0.25"
              />
            ))}
          </svg>

          {capabilities.map((cap, i) => {
            const pos = hexPositions[i];
            const isActive = selected === i;
            return (
              <div
                key={cap.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Inspect ${cap.title}`}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused(null)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: "31%",
                  cursor: "pointer",
                  outline:
                    focused === i ? "2px solid var(--cv-cyan)" : "2px solid transparent",
                  outlineOffset: 3,
                  filter: isActive
                    ? "drop-shadow(0 0 14px rgba(255,48,48,0.45))"
                    : "none",
                  transition: "filter 220ms ease, outline-color 220ms ease",
                }}
              >
                <CvHexTile
                  index={String(i + 1).padStart(2, "0")}
                  label={shortLabels[cap.id] ?? cap.title}
                  icon={hexIcons[cap.id]}
                  caption={cap.title}
                />
              </div>
            );
          })}
        </div>
      }
    >
      <div style={{ display: "grid", gap: 8 }}>
        <Reveal>
          <p className="cv-label" style={{ color: "var(--cv-red)" }}>
            Capability map · select a cell
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="cv-panel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div>
                <p className="cv-label">
                  Capability {String(selected + 1).padStart(2, "0")} / 07
                </p>
                <h3
                  style={{
                    marginTop: 8,
                    fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {active.title}
                </h3>
              </div>
              <CvEvidenceBadge level={active.status} />
            </div>

            <p
              style={{
                marginTop: 16,
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--cv-muted)",
              }}
            >
              {active.purpose}
            </p>

            <p className="cv-label" style={{ marginTop: 22, color: "var(--cv-blue)" }}>
              Problems addressed
            </p>
            <ul className="cv-list" style={{ marginTop: 12 }}>
              {active.problems.map((p) => (
                <li className="cv-list-item" key={p}>{p}</li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 20,
                borderTop: "1px solid var(--cv-edge)",
                paddingTop: 16,
              }}
            >
              <p className="cv-label">Evidence</p>
              <div style={{ marginTop: 10 }}>
                <CvLinkList links={active.evidence} />
              </div>
              {active.work ? (
                <p style={{ marginTop: 12, fontSize: 12, color: "var(--cv-dim)" }}>
                  Work: {active.work}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <hr className="cv-rule" style={{ marginTop: 30 }} />
          <p className="cv-label" style={{ marginTop: 18, color: "var(--cv-blue)" }}>
            Evidence index
          </p>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {capabilities.map((cap, i) => (
              <div
                key={cap.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "26px minmax(0, 1fr)",
                  gap: 12,
                  alignItems: "baseline",
                }}
              >
                <span className="cv-label" style={{ color: "var(--cv-red)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 14px",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--cv-ink)" }}>
                    {cap.label}
                  </span>
                  {cap.evidence.map((e, ei) => (
                    <Link key={ei} href={e.href} className="cv-link">
                      {e.label}
                    </Link>
                  ))}
                  {cap.work ? (
                    <span style={{ fontSize: 11, color: "var(--cv-dim)" }}>
                      {cap.work}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}
