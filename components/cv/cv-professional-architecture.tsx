"use client";

import { useState } from "react";
import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 03 — Professional Architecture
 * Interactive network diagram showing how disciplines connect.
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

export function CvProfessionalArchitecture() {
  const [selected, setSelected] = useState<string | null>(null);
  const node = architectureNodes.find((n) => n.id === selected);

  const nodeColor = (id: string) => {
    const n = architectureNodes.find((x) => x.id === id);
    if (!n) return "border-faint text-faint";
    if (selected === id) {
      return n.color === "signal" ? "border-signal bg-signal text-white" :
          n.color === "research" ? "border-research bg-research text-white" :
          "border-electric bg-electric text-white";
    }
    return n.color === "signal" ? "border-signal/30 text-signal" :
        n.color === "research" ? "border-research/30 text-research" :
        "border-electric/30 text-electric";
  };

  return (
    <CvChapterSection
      id="professional-architecture"
      number="03"
      title="Professional Architecture"
      subtitle="How my disciplines connect"
      support="Six capability domains form a connected architecture. Each domain links to real work — repositories, test suites, research entries, and verified credentials."
      accent="signal"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Architecture Network Visualization */}
        <Reveal>
          <div className="relative h-[600px] w-full max-w-full">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {architectureEdges.map(([a, b]) => {
                const na = architectureNodes.find((n) => n.id === a);
                const nb = architectureNodes.find((n) => n.id === b);
                if (!na || !nb) return null;
                const active = selected === a || selected === b;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    className={
                      active
                        ? "stroke-signal/60 stroke-2"
                        : "stroke-line stroke-1"
                    }
                    strokeWidth={active ? 2 : 1}
                  />
                );
              })}
            </svg>

            {architectureNodes.map((n) => {
              const isSelected = selected === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                  className={`absolute rounded-full border px-3 py-2 text-[9px] leading-tight transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isSelected
                      ? n.color === "signal" ? "border-signal bg-signal text-white shadow-[0_0_20px_rgba(255,48,48,0.4)]"
                      : n.color === "research" ? "border-research bg-research text-white shadow-[0_0_20px_rgba(122,167,255,0.4)]"
                      : "border-electric bg-electric text-white shadow-[0_0_20px_rgba(22,119,255,0.4)]"
                      : nodeColor(n.id)
                  }`}
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {n.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Selected Node Detail Panel */}
        <Reveal>
          <div className="border border-line bg-surface p-6 md:p-8">
            {selected ? (
              <>
                <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-2">
                  {node?.label}
                </p>
                <h3 className="font-mono text-base font-bold text-foreground mb-2">{node?.label}</h3>
                <p className="text-sm leading-relaxed text-muted mb-4">{node?.description}</p>

                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">
                  Problems It Addresses
                </p>
                <ul className="space-y-2 mb-4">
                  {node?.problems.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/90">
                      <span className="mt-1 h-px w-3 bg-signal shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line pt-4">
                  <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Evidence</p>
                  <p className="text-sm leading-relaxed text-foreground">{node?.evidence}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-2">
                  Select a domain
                </p>
                <p className="text-sm text-muted">Click any node in the architecture to see its problems, evidence, and connections.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}