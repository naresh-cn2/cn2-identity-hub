"use client";

import { useState } from "react";
import { CvChapterSection } from "@/components/cv/cv-layout";
import { CvGlobe, CvTechPill } from "@/components/cv/cv-visuals";

/**
 * Chapter 05 — Technical Toolkit
 * The complete evidence-backed skills archive, rebuilt as layered stack bands.
 * No percentage ratings: every technology is tied to a system or test suite.
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

type BandTone = "cyan" | "blue" | "red";

interface StackBand {
  label: string;
  note: string;
  categories: string[];
  tone: BandTone;
}

/** Six stack layers holding all seven original categories — nothing is dropped. */
const stackBands: StackBand[] = [
  {
    label: "Languages",
    note: "The vocabulary layer — from low-level memory control to typed application code and automation.",
    categories: ["Programming Languages"],
    tone: "cyan",
  },
  {
    label: "Systems & Runtime",
    note: "Server-side execution: APIs, storage, and deterministic service environments.",
    categories: ["Backend Engineering"],
    tone: "blue",
  },
  {
    label: "Data & Databases",
    note: "Ingestion, validation and replay — correctness treated as an infrastructure property.",
    categories: ["Data Engineering"],
    tone: "cyan",
  },
  {
    label: "AI / ML",
    note: "The intelligence layer: agent systems and the quantitative mathematics beneath them.",
    categories: ["AI & Agentic Systems", "Quantitative Computing"],
    tone: "red",
  },
  {
    label: "Infrastructure",
    note: "The client runtime — framework, rendering and component infrastructure for interactive systems.",
    categories: ["Frontend Engineering"],
    tone: "blue",
  },
  {
    label: "Tools & Workflow",
    note: "CI, test harnesses and sanitizers — the quality engineering loop around every change.",
    categories: ["DevOps & Tooling"],
    tone: "cyan",
  },
];

interface OrbitPill {
  id: string;
  label: string;
  x: number;
  y: number;
  tone?: "red" | "blue";
  band: number;
}

/** Floating technology pills, positioned around the orbit globe. */
const orbitPills: OrbitPill[] = [
  { id: "c-cpp", label: "C / C++", x: 20, y: 22, tone: "red", band: 0 },
  { id: "typescript", label: "TypeScript", x: 74, y: 16, band: 4 },
  { id: "python", label: "Python", x: 88, y: 44, tone: "blue", band: 0 },
  { id: "quantlib", label: "QuantLib", x: 80, y: 76, band: 3 },
  { id: "ai-ml", label: "AI / ML", x: 48, y: 88, tone: "red", band: 3 },
  { id: "quant-libs", label: "Quant Libs", x: 14, y: 72, band: 3 },
  { id: "cloud", label: "Cloud", x: 11, y: 48, tone: "blue", band: 1 },
];

const bandToneColor: Record<BandTone, string> = {
  cyan: "var(--cv-cyan)",
  blue: "var(--cv-blue)",
  red: "var(--cv-red)",
};

const categoriesFor = (names: string[]): SkillCategory[] =>
  names
    .map((name) => skillCategories.find((category) => category.name === name))
    .filter((category): category is SkillCategory => Boolean(category));

export function CvTechnicalSkills() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [selectedPill, setSelectedPill] = useState<string | null>(null);

  return (
    <CvChapterSection
      id="technical-skills"
      number="05"
      title="Technical Toolkit"
      kicker="CHAPTER 05 · TOOLKIT"
      lead="Seven evidence-backed domains, arranged as a working stack. Every technology is tied to a system, a test suite, or a verified credential — never to a self-reported rating."
      tone="research"
      visual={
        <div>
          <CvGlobe
            caption="CN2 / EVIDENCE-BACKED TOOLKIT"
            core={<span>STACK</span>}
            nodes={orbitPills.map(({ id, label, x, y, tone }) => ({ id, label, x, y, tone }))}
            selected={selectedPill}
            onSelect={(id) => {
              setSelectedPill(id);
              const pill = orbitPills.find((p) => p.id === id);
              if (pill) setExpanded(pill.band);
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 18 }}>
            <CvTechPill label="7 DOMAINS" tone="cyan" />
            <CvTechPill label="EVIDENCE TIED" />
            <CvTechPill label="NO RATINGS" tone="red" />
          </div>
        </div>
      }
    >
      <div className="cv-panel" style={{ padding: 0, overflow: "hidden" }}>
        {stackBands.map((band, index) => {
          const categories = categoriesFor(band.categories);
          const open = expanded === index;
          const skillCount = categories.reduce((total, category) => total + category.skills.length, 0);
          return (
            <div
              key={band.label}
              style={{
                borderBottom: index < stackBands.length - 1 ? "1px solid var(--cv-edge)" : undefined,
                background: open ? "linear-gradient(90deg, rgba(122,167,255,0.07), transparent 70%)" : undefined,
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`toolkit-band-${index}`}
                onClick={() => {
                  setExpanded(open ? null : index);
                  setSelectedPill(null);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  background: "transparent",
                  border: "none",
                  color: "var(--cv-ink)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-plex-mono), monospace",
                    fontSize: 10,
                    color: bandToneColor[band.tone],
                    minWidth: 24,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-plex-mono), monospace",
                      fontSize: 13,
                      letterSpacing: "0.06em",
                      color: open ? "var(--cv-ink)" : "var(--cv-muted)",
                    }}
                  >
                    {band.label}
                  </span>
                  <span style={{ display: "block", marginTop: 3, fontSize: 11, color: "var(--cv-dim)" }}>
                    {categories.map((category) => category.name).join(" · ")}
                  </span>
                </span>
                <span className="cv-label" style={{ fontSize: 9, whiteSpace: "nowrap" }}>
                  {String(skillCount).padStart(2, "0")} SKILLS
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-plex-mono), monospace",
                    fontSize: 16,
                    color: bandToneColor[band.tone],
                    width: 16,
                    textAlign: "center",
                  }}
                >
                  {open ? "−" : "+"}
                </span>
              </button>

              {open ? (
                <div id={`toolkit-band-${index}`} style={{ padding: "2px 20px 22px 58px" }}>
                  <p className="cv-label" style={{ marginBottom: 16, lineHeight: 1.5 }}>
                    {band.note}
                  </p>
                  {categories.map((category) => (
                    <div key={category.name} style={{ marginBottom: 18 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-plex-mono), monospace",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          color: bandToneColor[band.tone],
                          marginBottom: 8,
                        }}
                      >
                        {category.name}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.55, marginBottom: 12 }}>
                        {category.description}
                      </p>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                        {category.skills.map((skill) => (
                          <li
                            key={skill.name}
                            style={{ borderLeft: `1px solid ${bandToneColor[band.tone]}`, paddingLeft: 12 }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-plex-mono), monospace",
                                fontSize: 12,
                                color: "var(--cv-ink)",
                              }}
                            >
                              {skill.name}
                            </span>
                            <span style={{ display: "block", fontSize: 11, color: "var(--cv-dim)", lineHeight: 1.5 }}>
                              {skill.evidence}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.6 }}>
        Expand a layer — or select a pill on the globe — to read the evidence behind each technology.
      </p>
    </CvChapterSection>
  );
}