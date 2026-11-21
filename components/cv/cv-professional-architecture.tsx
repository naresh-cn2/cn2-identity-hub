"use client";

import { useState } from "react";
import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";
import { CvGlobe, type CvOrbitNode } from "@/components/cv/cv-visuals";

/**
 * Chapter — Technical Architecture
 * A layered orbital stack: the full seven-domain graph mapped onto the globe,
 * with ten live connections. Selecting a domain reveals its problems,
 * evidence and neighbours in the detail panel.
 */

interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  problems: string[];
  evidence: string;
  x: number;
  y: number;
  color: "signal" | "research" | "electric";
}

const architectureNodes: ArchitectureNode[] = [
  {
    id: "systems-engineering",
    label: "Systems Engineering",
    description: "Turning ideas into functioning software through programming, design, testing, and debugging.",
    problems: ["Architecture, APIs, and system integration", "Reliability, performance, operational constraints"],
    evidence: "BusTub database engine (C++20, 56/56 tests), billing-data-gateway (zero-dependency C11), CN2.DEV platform (Next.js 16)",
    x: 18, y: 30, color: "signal",
  },
  {
    id: "quantitative-development",
    label: "Quantitative Development",
    description: "Building quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    problems: ["Deterministic backtesting, explicit cost modelling", "Point-in-time correctness, lookahead bias prevention"],
    evidence: "apex-quant-engine (11.9M+ bars, 5,867 trades), market-data-replay (point-in-time safe), automated-trading-os (1% risk cap)",
    x: 52, y: 18, color: "research",
  },
  {
    id: "financial-technology",
    label: "Financial Technology",
    description: "Applying systematic, quantitative approaches to financial systems and markets.",
    problems: ["Risk-first position sizing, structural controls", "Multi-market execution, pre-trade risk gates"],
    evidence: "STRATA-ENGINE (pre-trade invariant gate), automated-trading-os (1:4 R:R floor), forex-platform (causal ladder)",
    x: 82, y: 30, color: "signal",
  },
  {
    id: "software-engineering",
    label: "Software Engineering",
    description: "Reliable software development with clear interfaces, failure handling, and reproducible execution.",
    problems: ["Full-stack architecture, API design", "Memory management, concurrency control"],
    evidence: "CN2.DEV (Next.js 16, React 19), Context Engineering Labs (72/72 tests), stratlab (CS50x capstone)",
    x: 18, y: 70, color: "electric",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    description: "Building reliable processes for collecting, validating, processing, and analyzing information.",
    problems: ["Ingestion, validation, point-in-time correctness", "Time-series stores, deterministic replay"],
    evidence: "market-data-replay (SQLite WAL, nanosecond timestamps), billing-data-gateway (487,421 rec/s)",
    x: 52, y: 70, color: "electric",
  },
  {
    id: "ai-engineering",
    label: "AI Engineering",
    description: "AI-assisted workflows and agent infrastructure with human direction and verification.",
    problems: ["Tool-using agents, context management", "Verification boundaries, human approval points"],
    evidence: "Context Engineering Labs (MCP, plugins, subagents), OPEN-VERSE (personal AI assistant), QRSIP (research governance)",
    x: 82, y: 70, color: "signal",
  },
  {
    id: "research-systems",
    label: "Research Systems",
    description: "Forming hypotheses, evaluating evidence, and improving decisions through structured investigation.",
    problems: ["Experimental design, reproducibility", "Promotion gates, verification methodology"],
    evidence: "qrsip (352 tests, CI security), 7 research entries, deterministic fixtures",
    x: 34, y: 50, color: "research",
  },
];

const architectureEdges: [string, string][] = [
  ["systems-engineering", "quantitative-development"],
  ["systems-engineering", "software-engineering"],
  ["systems-engineering", "data-engineering"],
  ["quantitative-development", "financial-technology"],
  ["quantitative-development", "research-systems"],
  ["financial-technology", "ai-engineering"],
  ["data-engineering", "ai-engineering"],
  ["data-engineering", "research-systems"],
  ["software-engineering", "research-systems"],
  ["ai-engineering", "research-systems"],
];

const globeNodes: CvOrbitNode[] = architectureNodes.map((n): CvOrbitNode => ({
  id: n.id,
  label: n.label,
  x: n.x,
  y: n.y,
  tone: n.color === "signal" ? "red" : "blue",
}));

function toneColor(color: ArchitectureNode["color"]) {
  if (color === "signal") return "var(--cv-red)";
  if (color === "research") return "var(--cv-blue)";
  return "var(--cv-cyan)";
}

export function CvProfessionalArchitecture() {
  const [selected, setSelected] = useState<string | null>(null);
  const node = architectureNodes.find((n) => n.id === selected);

  const connections = architectureEdges
    .filter(([a, b]) => a === selected || b === selected)
    .map(([a, b]) =>
      architectureNodes.find((n) => n.id === (a === selected ? b : a))?.label
    )
    .filter((label): label is string => Boolean(label));

  return (
    <CvChapterSection
      id="professional-architecture"
      number="03"
      title="Technical Architecture"
      kicker="Systems and domains"
      lead="Seven engineering domains mapped as one stack. Each node links to repositories, test suites, research entries and verified credentials."
      tone="signal"
      visual={
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <defs>
              <linearGradient id="cv-arch-edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff3030" />
                <stop offset="100%" stopColor="#7aa7ff" />
              </linearGradient>
            </defs>
            {architectureEdges.map(([a, b], i) => {
              const na = architectureNodes.find((n) => n.id === a);
              const nb = architectureNodes.find((n) => n.id === b);
              if (!na || !nb) return null;
              const active = selected === a || selected === b;
              return (
                <line
                  key={`${a}-${b}`}
                  className={
                    i === 0 || i === 3 || i === 6
                      ? "cv-flow"
                      : i === 8
                        ? "cv-trace"
                        : undefined
                  }
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="url(#cv-arch-edge)"
                  strokeWidth={active ? 0.65 : 0.28}
                  opacity={active ? 0.9 : 0.3}
                />
              );
            })}
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <CvGlobe
              nodes={globeNodes}
              selected={selected}
              onSelect={(id) =>
                setSelected((prev) => (prev === id ? null : id))
              }
              caption="SELECT A DOMAIN TO INSPECT"
            />
          </div>

          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              pointerEvents: "none",
              textAlign: "center",
              fontFamily: "var(--font-plex-mono), monospace",
              fontSize: 9,
              letterSpacing: "0.16em",
              lineHeight: 1.7,
              color: "var(--cv-ink)",
              textShadow: "0 0 10px #03070d, 0 0 20px #03070d",
            }}
          >
            CN2
            <br />
            ENGINEERING
            <br />
            STACK
          </span>
        </div>
      }
    >
      <div style={{ display: "grid", gap: 24 }}>
        <Reveal>
          <p className="cv-label" style={{ color: "var(--cv-red)" }}>
            Architecture map · 07 domains · 10 links
          </p>
          <p className="cv-statement" style={{ marginTop: 14, fontSize: "1.05rem" }}>
            Select any domain on the stack to inspect the problems it addresses,
            the evidence behind it and the domains it connects to.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {architectureNodes.map((n) => {
              const active = selected === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setSelected((prev) => (prev === n.id ? null : n.id))
                  }
                  className="cv-pill"
                  style={{
                    cursor: "pointer",
                    color: active ? "var(--cv-ink)" : toneColor(n.color),
                    borderColor: active ? toneColor(n.color) : undefined,
                    background: active ? "rgba(255,48,48,0.12)" : undefined,
                  }}
                >
                  {n.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="cv-panel">
            {node ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div>
                    <p className="cv-label">Selected domain</p>
                    <h3
                      style={{
                        marginTop: 8,
                        fontSize: "clamp(1.25rem, 2.4vw, 1.8rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {node.label}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="cv-link"
                    onClick={() => setSelected(null)}
                    style={{ cursor: "pointer", background: "none", border: 0 }}
                  >
                    Clear
                  </button>
                </div>

                <p
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--cv-muted)",
                  }}
                >
                  {node.description}
                </p>

                <p className="cv-label" style={{ marginTop: 22, color: "var(--cv-blue)" }}>
                  Problems addressed
                </p>
                <ul className="cv-list" style={{ marginTop: 12 }}>
                  {node.problems.map((p) => (
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
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "var(--cv-ink)",
                    }}
                  >
                    {node.evidence}
                  </p>
                </div>

                {connections.length ? (
                  <div
                    style={{
                      marginTop: 18,
                      borderTop: "1px solid var(--cv-edge)",
                      paddingTop: 16,
                    }}
                  >
                    <p className="cv-label">Connected domains</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                      {connections.map((label) => (
                        <span className="cv-pill" key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div style={{ padding: "18px 0" }}>
                <p className="cv-label" style={{ color: "var(--cv-red)" }}>
                  Awaiting selection
                </p>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--cv-muted)",
                  }}
                >
                  Choose a node in the orbital stack — or a domain above — to
                  read its description, the problems it addresses, its evidence
                  and its connections.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}
