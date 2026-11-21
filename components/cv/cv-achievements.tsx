"use client";

import { CvChapterSection } from "@/components/cv/cv-layout";
import { CvGauge } from "@/components/cv/cv-visuals";

/**
 * Technical evidence. Every figure states what was measured,
 * the conditions, and the standard it was measured under.
 */

type Standard = "BACKTEST" | "SIMULATION" | "SELF-BENCHMARK" | "TEST-SUITE";
type Basis = "INDEPENDENT" | "SELF-MEASURED" | "BACKTEST" | "SIMULATED";

const STANDARD_COLOR: Record<Standard, string> = {
  BACKTEST: "var(--cv-red)",
  SIMULATION: "var(--cv-blue)",
  "SELF-BENCHMARK": "var(--cv-cyan)",
  "TEST-SUITE": "#5fe0a8",
};

const BASIS_TONE: Record<Basis, "green" | "red" | undefined> = {
  INDEPENDENT: "green",
  "SELF-MEASURED": undefined,
  BACKTEST: "red",
  SIMULATED: "red",
};

interface EvidenceCellData {
  value: string;
  label: string;
  context: string;
  provenance: string;
  standard: Standard;
  basis: Basis;
}

const evidenceCells: EvidenceCellData[] = [
  {
    value: "56/56",
    label: "Test Suites Verified",
    context: "BusTub database engine (CMU 15-445/645)",
    provenance: "ASan/UBSan clean, 0 leaks, 0 errors",
    standard: "TEST-SUITE",
    basis: "INDEPENDENT",
  },
  {
    value: "352",
    label: "Tests",
    context: "QRSIP deterministic fixtures",
    provenance: "pytest 8.4.2, Python 3.12",
    standard: "TEST-SUITE",
    basis: "INDEPENDENT",
  },
  {
    value: "72/72",
    label: "Tests Passing",
    context: "Context Engineering Labs (6 implementations)",
    provenance: "Re-run from fresh clone",
    standard: "TEST-SUITE",
    basis: "INDEPENDENT",
  },
  {
    value: "487,421",
    label: "Records/sec",
    context: "billing-data-gateway (zero-dependency C11)",
    provenance: "Self-benchmarked, self-measured",
    standard: "SELF-BENCHMARK",
    basis: "SELF-MEASURED",
  },
  {
    value: "+570.18%",
    label: "Net simulated ROI",
    context: "apex-quant-engine master-fund backtest, after modeled fees & slippage",
    provenance: "Simulated master-fund backtest, not live trading",
    standard: "SIMULATION",
    basis: "SIMULATED",
  },
  {
    value: "5,867",
    label: "Completed Trades",
    context: "apex-quant-engine master-fund backtest",
    provenance: "Simulated, not live trading",
    standard: "SIMULATION",
    basis: "SIMULATED",
  },
  {
    value: "9",
    label: "Pipeline Stages",
    context: "market-data-replay (raw → analytics)",
    provenance: "Point-in-time safe",
    standard: "TEST-SUITE",
    basis: "INDEPENDENT",
  },
  {
    value: "305/305",
    label: "QA Assertions",
    context: "CN2.DEV automated verification",
    provenance: "live-check + hub-check + world-check",
    standard: "TEST-SUITE",
    basis: "INDEPENDENT",
  },
];

function StandardTag({ standard }: { standard: Standard }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-plex-mono), monospace",
        fontSize: 9,
        letterSpacing: "0.1em",
        color: STANDARD_COLOR[standard],
        whiteSpace: "nowrap",
      }}
    >
      <i
        aria-hidden="true"
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "currentColor",
          boxShadow: "0 0 8px currentColor",
        }}
      />
      {standard}
    </span>
  );
}

function EvidenceCell({ cell }: { cell: EvidenceCellData }) {
  return (
    <div className="cv-panel" style={{ padding: 18, display: "grid", alignContent: "start" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span className="cv-label" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
          {cell.label}
        </span>
        <StandardTag standard={cell.standard} />
      </div>
      <p
        className="num-mono"
        style={{ marginTop: 14, fontSize: "clamp(1.5rem, 2.6vw, 2.15rem)", lineHeight: 1, color: "var(--cv-ink)" }}
      >
        {cell.value}
      </p>
      <p style={{ marginTop: 11, fontSize: 12, lineHeight: 1.5, color: "var(--cv-muted)" }}>{cell.context}</p>
      <hr className="cv-rule" style={{ margin: "13px 0 11px" }} />
      <p className="cv-label" style={{ fontSize: 9, letterSpacing: "0.06em", lineHeight: 1.6 }}>
        {cell.provenance}
      </p>
      <span className="cv-status" data-tone={BASIS_TONE[cell.basis]} style={{ marginTop: 12 }}>
        {cell.basis}
      </span>
    </div>
  );
}

const legend: { standard: Standard; definition: string }[] = [
  {
    standard: "BACKTEST",
    definition: "Simulated result from historical data — not live performance.",
  },
  {
    standard: "SIMULATION",
    definition: "Model-based result — forward validity not implied.",
  },
  {
    standard: "SELF-BENCHMARK",
    definition: "Self-measured on the project's own harness — not third-party verified.",
  },
  {
    standard: "TEST-SUITE",
    definition: "Automated test execution — independently reproducible.",
  },
];

export function CvAchievements() {
  return (
    <CvChapterSection
      id="achievements"
      number="12"
      title="Technical Evidence"
      kicker="Measurements and provenance"
      lead="Every figure states what was measured, the conditions, and the standard it was measured under. Simulated results are never presented as verified live performance."
      tone="signal"
      visual={
        <div style={{ display: "grid", gap: 16 }}>
          <div className="cv-panel" style={{ padding: "18px 12px 22px" }}>
            <p className="cv-label" style={{ textAlign: "center", marginBottom: 6 }}>
              PRIMARY MEASUREMENT / BACKTEST
            </p>
            <CvGauge
              value="11.9M+"
              label="Bars Processed"
              detail="apex-quant-engine · BTC / ETH / SOL"
              percent={88}
            />
          </div>
          <div className="cv-panel" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span className="cv-label">Dataset</span>
              <StandardTag standard="BACKTEST" />
            </div>
            <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: "var(--cv-ink)" }}>
              11.9M+ bars processed across BTC, ETH and SOL.
            </p>
            <p className="cv-label" style={{ marginTop: 12, fontSize: 9, lineHeight: 1.6 }}>
              Deterministic backtest harness · bars processed, not live execution.
            </p>
            <span className="cv-status" data-tone="red" style={{ marginTop: 12 }}>
              BACKTEST
            </span>
          </div>
        </div>
      }
    >
      <p className="cv-statement">
        Each figure below records what was measured, the conditions and the measurement standard. Results are
        classified as independently reproducible, self-benchmarked or simulated, with the basis stated alongside
        every entry.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
          marginTop: 28,
        }}
      >
        {evidenceCells.map((cell) => (
          <EvidenceCell key={`${cell.label}-${cell.value}`} cell={cell} />
        ))}
      </div>

      <div className="cv-panel" style={{ marginTop: 20, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p className="cv-label">Provenance standards</p>
          <span className="cv-label" style={{ fontSize: 9, color: "var(--cv-dim)" }}>
            STANDARDS
          </span>
        </div>
        <hr className="cv-rule" style={{ margin: "14px 0 4px" }} />
        <div style={{ display: "grid", gap: 0 }}>
          {legend.map((item) => (
            <div
              key={item.standard}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: 16,
                alignItems: "baseline",
                padding: "12px 0",
                borderBottom: "1px solid rgba(120,170,230,0.12)",
              }}
            >
              <StandardTag standard={item.standard} />
              <span style={{ fontSize: 13, lineHeight: 1.55, color: "var(--cv-muted)" }}>{item.definition}</span>
            </div>
          ))}
        </div>
        <p className="cv-label" style={{ marginTop: 14, fontSize: 9, lineHeight: 1.6 }}>
          Green status = independently reproducible · blue = self-measured · red = simulated / backtest.
        </p>
      </div>
    </CvChapterSection>
  );
}
