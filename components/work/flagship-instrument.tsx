import Link from "next/link";
import type { FlagshipProject } from "@/data/projects";
import { EquitySurface, PipelineFlow, RegimeMap } from "@/components/viz/quant-primitives";
import ReplayLab from "@/components/research/replay-lab";
import { drawdownSeries, equitySeries } from "@/lib/series";

/**
 * Project-specific instruments.
 *
 * Each flagship build gets a different instrument here, so the four case
 * studies are not the same page with different copy. Instruments that render
 * deterministic synthetic data say so beside the chart — the measured figure
 * always appears separately as text with its provenance.
 */

const ATOS_STAGES: Array<{
  name: string;
  role: string;
  detail?: string[];
  color?: "signal" | "faint" | "foreground";
}> = [
  { name: "HTF CONTEXT", role: "Higher timeframe directional bias & structure", detail: ["Daily / 4H trend", "Key levels", "Regime filter"], color: "signal" },
  { name: "MTF STRUCTURE", role: "Mid timeframe pattern recognition", detail: ["Swing points", "Order blocks", "Liquidity zones"], color: "foreground" },
  { name: "LTF ENTRY", role: "Lower timeframe precision trigger", detail: ["Micro structure", "Entry signal", "Confirmation"], color: "foreground" },
  { name: "SIGNAL VALIDATION", role: "One-way flow gate", detail: ["HTF alignment", "MTF confluence", "LTF trigger"], color: "foreground" },
  { name: "RISK FIREWALL", role: "Structural risk enforcement", detail: ["1% per-trade cap", "1:4 R:R floor", "Cost budget filter", "Profit lock / giveback limit"], color: "signal" },
  { name: "EXECUTION", role: "Deterministic order construction", detail: ["Fee / slippage model", "Position sizing", "Order routing"], color: "foreground" },
  { name: "POSITION", role: "Active trade management", detail: ["Trailing logic", "Partial scaling", "Time-based exit"], color: "faint" },
];

const QRSIP_STAGES: Array<{
  name: string;
  role: string;
  detail?: string[];
  color?: "signal" | "faint" | "foreground";
}> = [
  { name: "HYPOTHESIS", role: "Falsifiable market question", detail: ["Defined prior", "Measurable outcome"], color: "foreground" },
  { name: "EXPERIMENT", role: "Deterministic test execution", detail: ["Fixed seed", "Controlled vars", "Artifact output"], color: "foreground" },
  { name: "VERIFICATION", role: "Byte-identical reproduction", detail: ["352 test suite", "Deterministic fixtures"], color: "signal" },
  { name: "ARTIFACT", role: "Immutable evidence package", detail: ["Equity curves", "Trade logs", "Config hash"], color: "foreground" },
  { name: "REPORT", role: "Structured findings document", detail: ["Method", "Result", "Limitation"], color: "foreground" },
  { name: "PROMOTION", role: "Governance gate", detail: ["Verified only", "No rhetoric bypass"], color: "signal" },
];

const QRSIP_REGIMES: Array<{
  name: string;
  x: number;
  y: number;
  color: string;
  size: number;
  description?: string;
}> = [
  { name: "COMPLETED", x: 0.2, y: 0.8, color: "var(--signal)", size: 0.9, description: "Promoted to deployment consideration" },
  { name: "VERIFIED", x: 0.4, y: 0.6, color: "var(--research)", size: 0.7, description: "Reproducible, limitations documented" },
  { name: "ONGOING", x: 0.6, y: 0.4, color: "var(--muted)", size: 0.5, description: "Experiment in progress" },
  { name: "FAILED GATE", x: 0.8, y: 0.2, color: "var(--chart-axis)", size: 0.4, description: "Did not meet promotion criteria" },
];

const BUSTUB_STAGES: Array<{
  name: string;
  role: string;
  detail?: string[];
  color?: "signal" | "faint" | "foreground";
}> = [
  { name: "P1: DISK & BUFFER POOL", role: "Page-level frame hierarchy & async I/O", detail: ["4096-byte disk pages", "LRU-K backward K-dist", "Dirty frame persistence"], color: "signal" },
  { name: "P2: CONCURRENT B+ TREE", role: "Dynamic index & latch crabbing protocol", detail: ["Optimistic read crabbing", "Pessimistic write crabbing", "Lock-free leaf scans"], color: "foreground" },
  { name: "P3: VOLCANO EXECUTION", role: "Iterator pull model (Init/Next pipeline)", detail: ["SeqScan & IndexScan", "Grace HashJoin", "Aggregation & TopN"], color: "foreground" },
  { name: "P3: QUERY OPTIMIZER", role: "Rule-based & heuristic plan transformation", detail: ["Equi-join to HashJoin", "Sort+Limit to TopN heap", "Predicate pushdown"], color: "foreground" },
  { name: "P4: 2PL CONCURRENCY", role: "Multi-granularity table/row locking", detail: ["5 Modes: IS, IX, S, SIX, X", "Strict 2PL state machine", "Wait-for DFS cycle detector"], color: "signal" },
];

function Frame({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="viz-frame p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <p className="label-mono text-research">{label}</p>
        <p className="label-mono text-faint">{note}</p>
      </div>
      {children}
    </div>
  );
}

export default function FlagshipInstrument({
  project,
  embedded = false,
}: {
  project: FlagshipProject;
  /** Inside an ancestor <a>: the read/dossier links render as inert styled
   *  spans (the wrapper link already navigates the card). Avoids nested
   *  anchors — a React hydration error. */
  embedded?: boolean;
}) {
  switch (project.id) {
    case "bustub-engine": {
      return (
        <Frame
          label="INSTRUMENT / 4-PILLAR RELATIONAL DATABASE SUBSYSTEMS"
          note="ARCHITECTURAL INVARIANTS & CONCURRENCY PROTOCOLS"
        >
          <PipelineFlow stages={BUSTUB_STAGES} flowDirection="vertical" animated />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              The full relational stack: from raw 4096-byte disk blocks up through the LRU-K frame cache,
              concurrent latch-crabbing B+ Tree, Volcano iterator execution engine, and multi-granularity
              Two-Phase Locking (2PL) with background DFS cycle detection.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {embedded ? (
                <span className="inline-flex items-center gap-1.5 rounded border border-signal/40 bg-signal/10 px-3 py-1.5 text-signal">
                  READ FULL CASE STUDY →
                </span>
              ) : (
                <Link
                  href="/case-studies/bustub-engine"
                  className="inline-flex items-center gap-1.5 rounded border border-signal/40 bg-signal/10 px-3 py-1.5 text-signal transition-colors hover:bg-signal/20"
                >
                  READ FULL CASE STUDY →
                </Link>
              )}
              {embedded ? (
                <span className="inline-flex items-center gap-1.5 rounded border border-line bg-surface/50 px-3 py-1.5 text-foreground">
                  VERIFICATION DOSSIER ↗
                </span>
              ) : (
                <a
                  href="/works/bustub/WORK_PROOF.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-line bg-surface/50 px-3 py-1.5 text-foreground transition-colors hover:border-research hover:text-research"
                >
                  VERIFICATION DOSSIER ↗
                </a>
              )}
            </div>
          </div>
        </Frame>
      );
    }

    case "apex-quant-engine": {
      const equity = equitySeries(42, 220);
      const dd = drawdownSeries(equity);
      return (
        <Frame
          label="INSTRUMENT / EQUITY SURFACE"
          note="SEEDED DETERMINISTIC SHAPE — NOT THE BACKTEST ARTIFACT"
        >
          <EquitySurface
            series={equity}
            drawdownSeries={dd}
            width={1200}
            height={440}
            interactive
            showDrawdown
            summary="Equity surface with normalized drawdown subplot. This is a seeded deterministic shape for instrument demonstration, not the master-fund backtest artifact. The measured backtest result is reported separately as text."
          />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            The surface demonstrates the shape of a multi-strategy equity trajectory with its
            drawdown topology. Hover to inspect any point. The measured master-fund result appears
            in the results chapter below — a backtest outcome at a single point in history, not a
            forecast.
          </p>
        </Frame>
      );
    }

    case "automated-trading-os":
      return (
        <Frame
          label="INSTRUMENT / EXECUTION PIPELINE"
          note="ARCHITECTURE DIAGRAM — NOT A PERFORMANCE MEASUREMENT"
        >
          <PipelineFlow stages={ATOS_STAGES} flowDirection="vertical" animated />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            One-way information flow: no lower timeframe can override a higher timeframe constraint.
            The risk firewall sits before order construction, so a setup that fails the 1% cap, the
            1:4 R:R floor or the cost budget never becomes an order.
          </p>
        </Frame>
      );

    case "market-data-replay":
      return (
        <Frame
          label="INSTRUMENT / POINT-IN-TIME REPLAY"
          note="STRUCTURAL DEMONSTRATION — SYNTHETIC DETERMINISTIC SERIES"
        >
          <ReplayLab />
        </Frame>
      );

    case "qrsip":
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="viz-frame p-4 md:p-6">
            <p className="label-mono mb-5 text-research">INSTRUMENT / GOVERNANCE FLOW</p>
            <PipelineFlow stages={QRSIP_STAGES} flowDirection="vertical" animated />
          </div>
          <div className="viz-frame p-4 md:p-6">
            <p className="label-mono mb-5 text-research">INSTRUMENT / EXPERIMENT TOPOLOGY</p>
            <RegimeMap regimes={QRSIP_REGIMES} width={600} height={480} />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Experiment states across the verification landscape. Nothing reaches{" "}
              <span className="text-foreground">PROMOTION</span> without a verified artifact and a
              documented limitation.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
