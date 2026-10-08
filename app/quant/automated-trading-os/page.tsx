import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";
import { PipelineFlow } from "@/components/viz/quant-primitives";

const project = getProject("automated-trading-os");

export const metadata: Metadata = {
  title: "Automated Trading OS",
  description:
    "Multi-timeframe quantitative trading and execution architecture — HTF to LTF information flow with a 1% risk cap, 1:4 R:R floor and full cost modelling as structural gates.",
  alternates: { canonical: "/quant/automated-trading-os" },
};

export default function AtosPage() {
  if (!project) notFound();

  const pipelineStages: Array<{
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

  return (
    <>
      <CaseStudy project={project} />
      {/* Enhanced Pipeline Visualization Section */}
      <section id="pipeline-flow" className="border-t border-line" aria-label="Pipeline Flow">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="mb-10">
            <p className="label-mono text-faint">EXECUTION PIPELINE — ONE-WAY INFORMATION FLOW</p>
            <h2 className="display mt-2 text-3xl md:text-5xl">MULTI-TIMEFRAME ARCHITECTURE</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              The Automated Trading OS enforces a strict one-way information flow from higher
              timeframes down to execution. No lower timeframe can override a higher timeframe
              constraint. Risk controls are structural gates, not advisory.
            </p>
          </div>
          <div className="border border-line bg-surface p-6 md:p-8">
            <PipelineFlow stages={pipelineStages} flowDirection="vertical" animated={true} />
          </div>
        </div>
      </section>
    </>
  );
}
