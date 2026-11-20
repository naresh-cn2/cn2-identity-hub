"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { career } from "@/data/career";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 08 — Engineering Experience
 * Independent engineering work presented honestly with roles, scope, and evidence.
 */

export function CvEngineeringExperience() {
  return (
    <CvChapterSection
      id="engineering-experience"
      number="08"
      title="Engineering Experience"
      subtitle="Independent engineering and development work"
      accent="signal"
    >
      <div className="space-y-8">
        {career.experience.map((entry, i) => (
          <Reveal key={entry.project} delay={i * 60} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-signal/50">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
              <div>
                <h3 className="font-mono text-lg font-bold text-foreground">{entry.project}</h3>
                <p className="label-mono text-[10px] text-faint">{entry.role}</p>
              </div>
              <CvEvidenceBadge level="VERIFIED" />
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{entry.scope}</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-line bg-surface p-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Metrics</p>
                <p className="text-sm font-mono text-foreground">{entry.metrics}</p>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {entry.skills.map((s, j) => (
                    <span key={j} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Evidence</p>
                {entry.href.startsWith("/") ? (
                  <Link
                    href={entry.href}
                    className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
                  >
                    CASE STUDY →
                  </Link>
                ) : (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
                  >
                    REPOSITORY →
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}