"use client";

import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";
import { CvChapterSection, CvMetric } from "@/components/cv/cv-layout";

/**
 * Chapter 12 — Achievements & Engineering Evidence
 * Evidence-driven achievements with provenance labels.
 */

export function CvAchievements() {
  return (
    <CvChapterSection
      id="achievements"
      number="12"
      title="Achievements & Engineering Evidence"
      subtitle="Every metric carries provenance — no unsupported claims"
      accent="signal"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CvMetric
          value="56/56"
          label="Test Suites Verified"
          context="BusTub database engine (CMU 15-445/645)"
          provenance="ASan/UBSan clean, 0 leaks, 0 errors"
        />
        <CvMetric
          value="352"
          label="Tests"
          context="QRSIP deterministic fixtures"
          provenance="pytest 8.4.2, Python 3.12"
        />
        <CvMetric
          value="72/72"
          label="Tests Passing"
          context="Context Engineering Labs (6 implementations)"
          provenance="Re-run from fresh clone"
        />
        <CvMetric
          value="487,421"
          label="Records/sec"
          context="billing-data-gateway (zero-dependency C11)"
          provenance="Self-benchmarked, self-measured"
        />
        <CvMetric
          value="11.9M+"
          label="Bars Processed"
          context="apex-quant-engine (BTC/ETH/SOL)"
          provenance="Deterministic backtest harness"
        />
        <CvMetric
          value="5,867"
          label="Completed Trades"
          context="apex-quant-engine master-fund backtest"
          provenance="Simulated, not live trading"
        />
        <CvMetric
          value="9"
          label="Pipeline Stages"
          context="market-data-replay (raw → analytics)"
          provenance="Point-in-time safe"
        />
        <CvMetric
          value="305/305"
          label="QA Assertions"
          context="CN2.DEV automated verification"
          provenance="live-check + hub-check + world-check"
        />
      </div>

      <div className="mt-8 border border-line bg-surface p-6 md:p-8">
        <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-4">
          Provenance Standards
        </p>
        <div className="space-y-3">
          <div className="flex gap-4">
            <span className="text-signal font-bold text-sm">BACKTEST</span>
            <span className="text-sm text-muted">Simulated result from historical data — not live performance.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-research font-bold text-sm">SIMULATION</span>
            <span className="text-sm text-muted">Model-based result — forward validity not implied.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-electric font-bold text-sm">SELF-BENCHMARK</span>
            <span className="text-sm text-muted">Self-measured on project's own harness — not third-party verified.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-faint font-bold text-sm">TEST-SUITE</span>
            <span className="text-sm text-muted">Automated test execution — independently reproducible.</span>
          </div>
        </div>
      </div>
    </CvChapterSection>
  );
}