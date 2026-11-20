"use client";

import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 13 — Professional Direction
 * Role directions supported by actual evidence.
 * Mature language, no generic marketing.
 */

interface ProfessionalDirection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  evidence: string[];
  strongestProjects: string[];
  accent: "signal" | "research" | "electric";
}

const directions: ProfessionalDirection[] = [
  {
    id: "systems-backend",
    title: "Systems / Backend Engineer",
    subtitle: "Reliable software, databases, backend infrastructure and computational systems.",
    description:
      "I build reliable software systems from the ground up — database engines, data pipelines, and full-stack platforms — with an emphasis on determinism, observability, and operational correctness. Every component is designed to be tested, verified, and understood.",
    evidence: [
      "BusTub: 56/56 test suites, ASan/UBSan clean, CMU 15-445/645 compliant",
      "billing-data-gateway: 487,421 rec/s, zero-dependency C11 with POSIX mmap",
      "CN2.DEV: 95+ static routes, 305/305 QA assertions, production on Vercel",
      "qrsip: 352 deterministic tests, CI security validation",
    ],
    strongestProjects: ["bustub-engine", "billing-data-gateway", "qrsip", "cn2-identity-hub"],
    accent: "signal",
  },
  {
    id: "quantitative-developer",
    title: "Quantitative Developer",
    subtitle: "Quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    description:
      "I build quantitative systems where correctness precedes performance. From deterministic backtesting engines to point-in-time safe market data, every result carries explicit provenance labels — never presented as live trading returns.",
    evidence: [
      "apex-quant-engine: 11.9M+ bars, 5,867 trades, deterministic backtest",
      "market-data-replay: point-in-time safety by construction, adversarial tests",
      "automated-trading-os: 1% per-trade risk cap, 1:4 R:R floor",
      "Research: 7 verified entries on lookahead bias, overfitting, decimal arithmetic",
    ],
    strongestProjects: ["apex-quant-engine", "market-data-replay", "automated-trading-os"],
    accent: "research",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    subtitle: "AI-assisted workflows, agent infrastructure and intelligent software systems.",
    description:
      "I build AI systems where humans define direction and AI accelerates execution. From agent orchestration pipelines to sandboxed execution boundaries, every system is designed with verification gates — accountability is never automated, and every output must earn trust through evidence.",
    evidence: [
      "Context Engineering Labs: 72/72 tests reproduced, 6 agent-stack implementations",
      "CN2.DEV: Next.js 16, React 19 full-stack platform with AI-ready architecture",
      "qrsip: research governance platform with hypothesis-to-promotion workflow",
    ],
    strongestProjects: ["context-engineering-labs", "cn2-identity-hub", "qrsip"],
    accent: "electric",
  },
];

export function CvProfessionalDirection() {
  return (
    <CvChapterSection
      id="professional-direction"
      number="13"
      title="Professional Direction"
      subtitle="Role directions supported by actual evidence"
      accent="signal"
    >
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {directions.map((dir) => (
          <Reveal key={dir.id} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-signal/50">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h4 className="font-mono text-sm font-bold text-foreground">{dir.title}</h4>
              <span className={`label-mono border px-2 py-1 text-[9px] ${
                dir.accent === "signal" ? "border-signal text-signal" :
                dir.accent === "research" ? "border-research text-research" :
                "border-electric text-electric"
              }`}>
                DIRECTION
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{dir.subtitle}</p>
            <p className="text-xs text-muted leading-relaxed mb-4">{dir.description}</p>

            <div className="mb-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Strongest Evidence</p>
              <ul className="space-y-2">
                {dir.evidence.map((e, i) => (
                  <li key={i} className="flex gap-2 text-xs text-foreground/90 leading-relaxed">
                    <span className="mt-1 h-px w-3 bg-signal shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Strongest Projects</p>
              <div className="flex flex-wrap gap-2">
                {dir.strongestProjects.map((p, j) => (
                  <span key={j} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}