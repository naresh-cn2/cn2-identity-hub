"use client";

import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 02 — Executive Summary
 * Editorial narrative composition — no cards.
 */

export function CvExecutiveSummary() {
  return (
    <CvChapterSection
      id="executive-summary"
      number="02"
      title="Executive Summary"
      subtitle="Who I am, what I build, and how I work"
      accent="signal"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Professional Summary - editorial column */}
        <Reveal>
          <div className="border border-line bg-surface p-6 md:p-8">
            <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-4">
              Professional Summary
            </p>
            <p className="text-base leading-relaxed text-foreground/90 mb-6">
              I am a quantitative developer who engineers software systems,
              financial infrastructure, and AI-powered tools. My work sits at
              the convergence of quantitative finance, software engineering,
              data infrastructure, and artificial intelligence — connected
              through systems thinking. Every claim in this CV is backed by
              inspectable artifacts: working systems, test suites, research
              entries, and certificates with verification links.
            </p>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-signal font-bold">●</span> I build systems where
                correctness precedes performance — every result carries explicit
                provenance labels, never presented as live trading returns.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-signal font-bold">●</span> I treat engineering
                as an evidence discipline: hypotheses are explicit, experiments
                are reproducible, and promotion decisions are backed by verified
                artifacts.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-signal font-bold">●</span> I see AI as a way
                to extend human capability — never a replacement for
                understanding the problem. Human judgment accepts, rejects, or
                revises. Accountability is never automated.
              </p>
            </div>
          </div>
        </Reveal>

        {/* At-a-Glance Panel */}
        <Reveal delay={80}>
          <div className="border border-line bg-surface p-6 md:p-8">
            <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-4">
              At a Glance
            </p>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Professional Identity</span>
                <span className="text-base font-bold text-foreground">CN2 — Quantitative Developer</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Primary Domains</span>
                <span className="text-base font-bold text-foreground">Systems · Quant · FinTech · AI · Data</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Flagship Projects</span>
                <span className="text-base font-bold text-foreground">8 verified systems</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Verified Credentials</span>
                <span className="text-base font-bold text-foreground">10 certificates issued</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Research Entries</span>
                <span className="text-base font-bold text-foreground">7 documented investigations</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="label-mono text-[9px] text-faint">Automated QA</span>
                <span className="text-base font-bold text-foreground">305/305 assertions green</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Status Badge Strip */}
      <Reveal delay={160}>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="label-mono border px-3 py-1.5 text-[9px] border-signal text-signal">OPEN TO SELECTED WORK</span>
          <span className="label-mono border px-3 py-1.5 text-[9px] border-research text-research">RESEARCH · COLLABORATION</span>
          <span className="label-mono border px-3 py-1.5 text-[9px] border-electric text-electric">VERIFIED EVIDENCE</span>
        </div>
      </Reveal>
    </CvChapterSection>
  );
}