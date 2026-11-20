"use client";

import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 05 — Technical Skills
 * Evidence-backed skill categories with provenance.
 * No arbitrary percentage ratings — evidence-backed categories only.
 */

interface SkillCategory {
  name: string;
  description: string;
  skills: { name: string; evidence: string }[];
  accent: "signal" | "research" | "electric";
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    description: "Languages I have used to build production systems and verified test suites.",
    accent: "signal",
    skills: [
      { name: "C / C++20", evidence: "bustub-engine (CMU 15-445/645, 56/56 tests), billing-data-gateway (zero-dependency C11)" },
      { name: "Python", evidence: "apex-quant-engine, market-data-replay, qrsip, automated-trading-os" },
      { name: "TypeScript", evidence: "CN2.DEV platform (Next.js 16, React 19), Context Engineering Labs plugins" },
      { name: "JavaScript", evidence: "CN2.DEV visuals, Context Engineering Labs lifecycle hooks" },
      { name: "Rust", evidence: "strata-engine execution routing and state machine" },
      { name: "Bash / PowerShell", evidence: "QA test suites, build automation, CI pipelines" },
    ],
  },
  {
    name: "Backend Engineering",
    description: "Server-side systems, APIs, and deterministic execution environments.",
    accent: "research",
    skills: [
      { name: "FastAPI", evidence: "market-data-replay pipeline, sentiment-stream design" },
      { name: "Flask", evidence: "stratlab (CS50x capstone web backend)" },
      { name: "SQLite WAL", evidence: "market-data-replay storage, stratlab analytics" },
      { name: "Next.js API Routes", evidence: "CN2.DEV API endpoints" },
      { name: "Docker", evidence: "strata-engine dockerized deployment, qrsip CI" },
    ],
  },
  {
    name: "Frontend Engineering",
    description: "Client-side interfaces and reactive systems.",
    accent: "electric",
    skills: [
      { name: "React 19", evidence: "CN2.DEV platform, Context Engineering Labs dashboard" },
      { name: "Next.js 16", evidence: "CN2.DEV portfolio platform (95+ routes)" },
      { name: "Tailwind CSS v4", evidence: "CN2.DEV design system" },
      { name: "Canvas / WebGL", evidence: "CN2.DEV mathematical visualizations" },
      { name: "SVG", evidence: "CN2.DEV architecture diagrams, technical schematics" },
    ],
  },
  {
    name: "Data Engineering",
    description: "Ingestion, validation, storage, and deterministic replay pipelines.",
    accent: "signal",
    skills: [
      { name: "Point-in-Time Correctness", evidence: "market-data-replay (adversarial lookahead-bias tests pass)" },
      { name: "Exact Decimal Arithmetic", evidence: "market-data-replay (no floating-point drift)" },
      { name: "Deterministic Replay", evidence: "market-data-replay (byte-identical replays)" },
      { name: "Zero-Copy Parsing", evidence: "billing-data-gateway (POSIX mmap, 487,421 rec/s)" },
      { name: "SQLite WAL", evidence: "market-data-replay, stratlab" },
    ],
  },
  {
    name: "Quantitative Computing",
    description: "Deterministic backtesting, risk controls, and mathematical systems.",
    accent: "research",
    skills: [
      { name: "Deterministic Backtesting", evidence: "apex-quant-engine (byte-identical replays)" },
      { name: "Risk Controls", evidence: "automated-trading-os (1% risk cap, 1:4 R:R floor)" },
      { name: "Cost Modelling", evidence: "apex-quant-engine, automated-trading-os (fees + slippage)" },
      { name: "Multi-Timeframe Analysis", evidence: "automated-trading-os (HTF/MTF/LTF pipeline)" },
      { name: "NumPy / Pandas", evidence: "apex-quant-engine data processing" },
    ],
  },
  {
    name: "AI & Agentic Systems",
    description: "Agent orchestration, MCP, sandboxing, and human-directed AI.",
    accent: "electric",
    skills: [
      { name: "Agent Orchestration", evidence: "Context Engineering Labs (4-role multi-agent pipeline)" },
      { name: "Model Context Protocol", evidence: "Context Engineering Labs (MCP server over JSON-RPC 2.0)" },
      { name: "Sandboxed Execution", evidence: "Context Engineering Labs (Nano Harness, path confinement)" },
      { name: "Agent Skills", evidence: "Context Engineering Labs (portable dataset validator)" },
      { name: "Lifecycle Observability", evidence: "Context Engineering Labs (500-event ring buffer dashboard)" },
    ],
  },
  {
    name: "DevOps & Tooling",
    description: "CI/CD, testing, and quality engineering infrastructure.",
    accent: "signal",
    skills: [
      { name: "GitHub Actions", evidence: "CN2.DEV CI (305/305 assertions), qrsip CI security" },
      { name: "pytest", evidence: "qrsip (352 tests), market-data-replay (70 tests)" },
      { name: "GoogleTest / SQLLogicTest", evidence: "bustub-engine (56 test suites)" },
      { name: "Playwright", evidence: "CN2.DEV QA suites" },
      { name: "AddressSanitizer / UBSan", evidence: "bustub-engine (0 leaks, 0 errors)" },
    ],
  },
];

export function CvTechnicalSkills() {
  return (
    <CvChapterSection
      id="technical-skills"
      number="05"
      title="Technical Skills"
      subtitle="Evidence-backed technologies, not self-reported proficiency scores"
      accent="signal"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <Reveal key={cat.name} className="border border-line bg-surface p-5 md:p-6 transition-colors hover:border-signal/50">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">{cat.name}</h3>
              <span className={`label-mono border px-2 py-1 text-[9px] ${
                cat.accent === "signal" ? "border-signal text-signal" :
                cat.accent === "research" ? "border-research text-research" :
                "border-electric text-electric"
              }`}>
                EVIDENCED
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-4">{cat.description}</p>
            <ul className="space-y-3">
              {cat.skills.map((s) => (
                <li key={s.name} className="flex items-baseline gap-2">
                  <span className="font-mono text-sm text-foreground">{s.name}</span>
                  <span className="label-mono text-[9px] text-faint">{s.evidence}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}