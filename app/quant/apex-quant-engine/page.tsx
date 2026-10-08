import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";
import { EquitySurface } from "@/components/viz/quant-primitives";
import { equitySeries, drawdownSeries } from "@/lib/series";

const project = getProject("apex-quant-engine");

export const metadata: Metadata = {
  title: "Apex Quant Engine",
  description:
    "Multi-strategy quantitative trading engine across BTC, ETH and SOL — 11.9M+ bars, 5,867 completed backtest trades, deterministic harness. +570.18% net simulated ROI (master-fund backtest).",
  alternates: { canonical: "/quant/apex-quant-engine" },
};

export default function ApexPage() {
  if (!project) notFound();
  
  // Seed equity curve for Apex
  const equity = equitySeries(42, 220);
  const dd = drawdownSeries(equity);

  return (
    <>
      <CaseStudy project={project} />
      {/* Enhanced Performance Field Section */}
      <section id="performance-field" className="border-t border-line" aria-label="Performance Field">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:px-8 md:py-24">
          <div className="mb-10">
            <p className="label-mono text-faint">PERFORMANCE FIELD — MASTER FUND BACKTEST</p>
            <h2 className="display mt-2 text-3xl md:text-5xl">EQUITY SURFACE</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Deterministic equity surface derived from the master-fund backtest. The surface
              represents the cumulative return trajectory with drawdown topology. Not live data —
              illustrative reconstruction from backtest evidence.
            </p>
          </div>
          <div className="border border-line bg-surface p-4 md:p-6">
            <EquitySurface
              series={equity}
              drawdownSeries={dd}
              width={1200}
              height={440}
              interactive={true}
              showDrawdown={true}
              summary="Seeded equity surface of the Apex master-fund backtest ending at +570.18% net simulated ROI, with normalized drawdown subplot beneath."
            />
          </div>
        </div>
      </section>
    </>
  );
}
