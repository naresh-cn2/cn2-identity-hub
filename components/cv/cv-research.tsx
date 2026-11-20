"use client";

import Reveal from "@/components/ui/reveal";
import { researchEntries } from "@/data/research";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 11 — Research & Experiments
 * Editorial presentation with stated methods, findings, and limitations.
 */

export function CvResearch() {
  return (
    <CvChapterSection
      id="research"
      number="11"
      title="Research & Experiments"
      subtitle="Investigations with stated methods, findings, and limitations"
      accent="research"
    >
      <div className="space-y-6">
        {researchEntries.map((entry) => (
          <Reveal key={entry.id} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-research/50">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <h4 className="font-mono text-sm font-bold text-foreground">{entry.title}</h4>
              <CvEvidenceBadge level={entry.status} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Question</p>
                <p className="text-xs text-muted leading-relaxed">{entry.question}</p>
              </div>
              <div>
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Hypothesis</p>
                <p className="text-xs text-muted leading-relaxed">{entry.hypothesis}</p>
              </div>
              <div>
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Category</p>
                <span className="font-mono text-xs text-faint">{entry.category}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Method</p>
              <p className="text-xs text-muted leading-relaxed">{entry.method}</p>
            </div>
            <div className="mt-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Result</p>
              <p className="text-xs text-foreground/90 leading-relaxed">{entry.result}</p>
            </div>
            <div className="mt-4">
              <p className="label-mono text-[9px] text-research uppercase tracking-widest mb-1">Limitation</p>
              <p className="text-xs text-research/90 leading-relaxed">{entry.limitation}</p>
            </div>
            <div className="mt-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Conclusion</p>
              <p className="text-xs text-foreground/90 leading-relaxed">{entry.conclusion}</p>
            </div>
            {entry.relatedProject && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Related Project</p>
                <span className="font-mono text-xs text-signal">{entry.relatedProject}</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}