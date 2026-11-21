"use client";

import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 13 — Professional Focus
 * Three areas of practice, each grounded in shipped systems and reproducible work.
 */

interface FocusArea {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  evidence: string[];
  projects: string[];
  accent: "signal" | "research" | "electric";
}

const focusAreas: FocusArea[] = [
  {
    id: "systems-backend",
    index: "01",
    title: "Systems / Backend Engineering",
    subtitle: "Reliable software, databases, backend infrastructure and computational systems.",
    description:
      "I build reliable software systems from the ground up — database engines, data pipelines, and full-stack platforms — with an emphasis on determinism, observability, and operational correctness. Every component is designed to be tested, verified, and understood.",
    evidence: [
      "BusTub: 56/56 test suites, ASan/UBSan clean, CMU 15-445/645 compliant",
      "billing-data-gateway: 487,421 rec/s, zero-dependency C11 with POSIX mmap",
      "CN2.DEV: 95+ static routes, 305/305 QA assertions, production on Vercel",
      "qrsip: 352 deterministic tests, CI security validation",
    ],
    projects: ["bustub-engine", "billing-data-gateway", "qrsip", "cn2-identity-hub"],
    accent: "signal",
  },
  {
    id: "quantitative-development",
    index: "02",
    title: "Quantitative Development",
    subtitle: "Quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    description:
      "I build quantitative systems where correctness precedes performance. From deterministic backtesting engines to point-in-time safe market data, every result carries explicit provenance labels — never presented as live trading returns.",
    evidence: [
      "apex-quant-engine: 11.9M+ bars, 5,867 trades, deterministic backtest",
      "market-data-replay: point-in-time safety by construction, adversarial tests",
      "automated-trading-os: 1% per-trade risk cap, 1:4 R:R floor",
      "Research: 7 verified entries on lookahead bias, overfitting, decimal arithmetic",
    ],
    projects: ["apex-quant-engine", "market-data-replay", "automated-trading-os"],
    accent: "research",
  },
  {
    id: "ai-engineering",
    index: "03",
    title: "AI Engineering",
    subtitle: "AI-assisted workflows, agent infrastructure and intelligent software systems.",
    description:
      "I build AI systems where humans define direction and AI accelerates execution. From agent orchestration pipelines to sandboxed execution boundaries, every system is designed with verification gates — accountability is never automated, and every output must earn trust through evidence.",
    evidence: [
      "Context Engineering Labs: 72/72 tests reproduced, 6 agent-stack implementations",
      "CN2.DEV: Next.js 16, React 19 full-stack platform with AI-ready architecture",
      "qrsip: research governance platform with hypothesis-to-promotion workflow",
    ],
    projects: ["context-engineering-labs", "cn2-identity-hub", "qrsip"],
    accent: "electric",
  },
];

const PILL_TONE: Record<FocusArea["accent"], "red" | "cyan" | undefined> = {
  signal: "red",
  research: undefined,
  electric: "cyan",
};

const ICON_COLOR: Record<FocusArea["accent"], string> = {
  signal: "var(--cv-red)",
  research: "var(--cv-blue)",
  electric: "var(--cv-cyan)",
};

function SystemsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="5" rx="1" />
      <rect x="3" y="14" width="18" height="5" rx="1" />
      <path d="M7 11.5h10" />
    </svg>
  );
}

function QuantIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l5-6 4 3 5-8 4 5" />
      <path d="M3 21h18" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7l-5 9M12 7l5 9M7 18h10" />
    </svg>
  );
}

function AreaIcon({ accent }: { accent: FocusArea["accent"] }) {
  if (accent === "signal") return <SystemsIcon />;
  if (accent === "research") return <QuantIcon />;
  return <AiIcon />;
}

export function CvProfessionalDirection() {
  return (
    <CvChapterSection
      id="professional-direction"
      number="13"
      title="Professional Focus"
      lead="Three areas of practice. Each is grounded in shipped systems and reproducible work — the focus follows the evidence."
      tone="research"
    >
      <p className="cv-statement">
        The work concentrates where reliable systems, quantitative computation and AI-assisted engineering meet —
        with verification built into each.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26 }}>
        <span className="cv-label" style={{ fontSize: 9 }}>Practice areas</span>
        <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--cv-red), rgba(122,167,255,0.4), transparent)" }} />
        <span className="cv-label" style={{ fontSize: 9 }}>03</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.95fr 1fr",
          gap: 16,
          alignItems: "start",
          marginTop: 14,
        }}
      >
        {focusAreas.map((area, i) => (
          <div
            key={area.id}
            className="cv-panel"
            style={{ padding: 22, marginTop: i === 1 ? 30 : i === 2 ? 14 : 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  border: "1px solid var(--cv-edge)",
                  color: ICON_COLOR[area.accent],
                }}
              >
                <AreaIcon accent={area.accent} />
              </span>
              <span className="cv-label" style={{ fontSize: 9 }}>{area.index} / 03</span>
            </div>

            <h3 style={{ marginTop: 18, fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)", fontWeight: 600, lineHeight: 1.22, color: "var(--cv-ink)" }}>
              {area.title}
            </h3>
            <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.55, color: "var(--cv-muted)" }}>{area.subtitle}</p>

            <hr className="cv-rule" style={{ margin: "16px 0" }} />

            <p style={{ fontSize: 12, lineHeight: 1.68, color: "var(--cv-muted)" }}>{area.description}</p>

            <p className="cv-label" style={{ marginTop: 18, marginBottom: 10, fontSize: 9 }}>Evidence</p>
            <div className="cv-list">
              {area.evidence.map((item) => (
                <div key={item} className="cv-list-item" style={{ fontSize: 12 }}>
                  {item}
                </div>
              ))}
            </div>

            <p className="cv-label" style={{ marginTop: 18, marginBottom: 10, fontSize: 9 }}>Selected work</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {area.projects.map((project) => (
                <span key={project} className="cv-pill" data-tone={PILL_TONE[area.accent]}>
                  {project}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
        <span className="cv-label" style={{ fontSize: 9, color: "var(--cv-red)" }}>CN2.DEV / 13</span>
        <span style={{ flex: 1, height: 1, background: "var(--cv-edge)" }} />
      </div>
    </CvChapterSection>
  );
}
