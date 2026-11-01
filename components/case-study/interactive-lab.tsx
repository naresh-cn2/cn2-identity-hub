import Image from "next/image";
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
          <div className="viz-frame p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              EQUITY CURVE + DRAWDOWN — SEEDED ILLUSTRATION OF THE MASTER-FUND BACKTEST SHAPE
            </p>
            <EquityCurve
              seed={42}
              endValuePct={570.18}
              summary="Seeded illustrative equity curve of the Apex master-fund backtest shape ending at plus 570.18 percent net simulated ROI, with a normalized drawdown subplot beneath."
            />
          </div>
          <div className="viz-frame p-4 md:p-6">
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
          <div className="viz-frame p-4 md:p-6">
            <p className="label-mono mb-4 text-faint">
              TRADE DISTRIBUTION — SEEDED ILLUSTRATION UNDER THE 1:4 R:R FLOOR
            </p>
            <RRDistribution
              seed={23}
              trades={1200}
              summary="Seeded illustrative distribution of trade R-multiples shaped by the structural one-to-four minimum reward-to-risk floor. Losers truncate near minus one R; runners concentrate between three and nine R."
            />
          </div>
          <div className="viz-frame p-4 md:p-6">
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
        <div className="viz-frame p-4 md:p-6">
          <p className="label-mono mb-4 text-faint">
            POINT-IN-TIME PREVIEW — SCRUB THE TIMESTAMP, WATCH THE INFORMATION BOUNDARY
          </p>
          <ReplayPreview />
        </div>
      );

    case "qrsip":
      return (
        <div className="viz-frame p-4 md:p-6">
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

    case "bustub-engine":
      return (
        <div className="space-y-8">
          <div className="viz-frame p-4 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <p className="label-mono text-signal">
                AUTOMATED VERIFICATION TELEMETRY — CTEST &amp; ADDRESSSANITIZER
              </p>
              <span className="label-mono text-[10px] text-faint">56 / 56 SUITES PASSED · 0 DEFECTS</span>
            </div>
            <div className="overflow-hidden rounded border border-line bg-background/50">
              <Image
                src="/works/bustub/assets/terminal_verification_card.svg"
                alt="BusTub Terminal Verification Card"
                width={800}
                height={420}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                id: "p1",
                title: "P1: Buffer Pool Manager",
                src: "/works/bustub/assets/project_card_p1.svg",
                log: "/works/bustub/telemetry/p1_bpm_tests.log",
                stats: "11/11 Suites Passed · 39.41s",
              },
              {
                id: "p2",
                title: "P2: Concurrent B+ Tree Index",
                src: "/works/bustub/assets/project_card_p2.svg",
                log: "/works/bustub/telemetry/p2_b_plus_tree_tests.log",
                stats: "6/6 Concurrent Tests · 2.58s",
              },
              {
                id: "p3",
                title: "P3: Volcano Execution Engine",
                src: "/works/bustub/assets/project_card_p3.svg",
                log: "/works/bustub/telemetry/p3_execution_optimizer_tests.log",
                stats: "21/21 SQLLogicTests · Full AST Opt",
              },
              {
                id: "p4",
                title: "P4: 2PL & Deadlock Detection",
                src: "/works/bustub/assets/project_card_p4.svg",
                log: "/works/bustub/telemetry/p4_concurrency_tests.log",
                stats: "11/11 Concurrency Tests · DFS Graph",
              },
            ].map((card) => (
              <div key={card.id} className="viz-frame flex flex-col justify-between p-4">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">{card.title}</span>
                    <span className="label-mono text-[9px] text-signal">{card.stats}</span>
                  </div>
                  <div className="overflow-hidden rounded border border-line/60 bg-background/40">
                    <Image
                      src={card.src}
                      alt={card.title}
                      width={660}
                      height={150}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <a
                    href={card.log}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[10px] text-research hover:underline"
                  >
                    INSPECT RAW TELEMETRY LOG ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
