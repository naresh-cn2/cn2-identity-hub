import type { FlagshipProject } from "@/data/projects";
import EquityCurve from "@/components/viz/equity-curve";
import RRDistribution from "@/components/viz/rr-distribution";
import ReplayPreview from "./replay-preview";

/**
 * Per-project interactive embeds, keyed by project id.
 * Every chart is a deterministic, seeded illustration derived from project
 * semantics — never presented as live data. Summaries are provided for
 * screen readers and captions.
 */
export default function InteractiveLab({ project }: { project: FlagshipProject }) {
  switch (project.id) {
    case "apex-quant-engine":
      return (
        <div className="space-y-10">
          <div className="border border-line bg-surface p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              EQUITY CURVE + DRAWDOWN — SEEDED ILLUSTRATION OF THE MASTER-FUND BACKTEST SHAPE
            </p>
            <EquityCurve
              seed={42}
              endValuePct={570.18}
              summary="Seeded illustrative equity curve of the Apex master-fund backtest shape ending at plus 570.18 percent net simulated ROI, with a normalized drawdown subplot beneath."
            />
          </div>
          <div className="border border-line bg-surface p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              R-MULTIPLE DISTRIBUTION — SEEDED ILLUSTRATION OF THE TRADE POPULATION SHAPE
            </p>
            <RRDistribution
              seed={7}
              trades={5867}
              summary="Seeded illustrative distribution of trade R-multiples across 5,867 backtest trades. Losses cluster at minus one R; winners extend from one to nine R."
            />
          </div>
        </div>
      );

    case "automated-trading-os":
      return (
        <div className="space-y-10">
          <div className="border border-line bg-surface p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              TRADE DISTRIBUTION — SEEDED ILLUSTRATION UNDER THE 1:4 R:R FLOOR
            </p>
            <RRDistribution
              seed={23}
              trades={1200}
              summary="Seeded illustrative distribution of trade R-multiples shaped by the structural one-to-four minimum reward-to-risk floor. Losers truncate near minus one R; runners concentrate between three and nine R."
            />
          </div>
          <div className="border border-line bg-surface p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              EQUITY SHAPE — SEEDED ILLUSTRATION OF A RISK-CAPPED PIPELINE
            </p>
            <EquityCurve
              seed={11}
              endValuePct={96.5}
              summary="Seeded illustrative equity curve for a risk-capped multi-timeframe pipeline with tight, shallow drawdowns."
            />
          </div>
        </div>
      );

    case "market-data-replay":
      return (
        <div className="border border-line bg-surface p-4 md:p-6">
          <p className="label-mono mb-4 text-faint">
            POINT-IN-TIME PREVIEW — SCRUB THE TIMESTAMP, WATCH THE INFORMATION BOUNDARY
          </p>
          <ReplayPreview />
        </div>
      );

    case "qrsip":
      return (
        <div className="border border-line bg-surface p-4 md:p-6">
          <p className="label-mono mb-4 text-faint">
            EXPERIMENT POPULATION — SEEDED ILLUSTRATION OF VERIFIED VS ONGOING RUNS
          </p>
          <RRDistribution
            seed={63}
            trades={352}
            summary="Seeded illustrative distribution of experiment outcomes in the QRSIP fixture population backing the 352-test deterministic suite."
          />
        </div>
      );

    default:
      return null;
  }
}
