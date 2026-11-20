"use client";

import Reveal from "@/components/ui/reveal";
import { studyTracks } from "@/data/credentials";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 06 — Education
 * Formal education and self-directed study tracks.
 * Formal education records are not present in the repository;
 * self-directed study tracks are presented honestly as ongoing.
 */

export function CvEducation() {
  return (
    <CvChapterSection
      id="education"
      number="06"
      title="Education"
      subtitle="Formal education and self-directed study"
      accent="signal"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Formal Education */}
        <Reveal>
          <div className="border border-line bg-surface p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Formal Education</h3>
              <span className="label-mono border px-2 py-1 text-[9px] border-faint text-faint">
                NO RECORD
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">
              No formal education records (degrees, institutions, graduation dates)
              are present in the repository. All technical capabilities below are
              demonstrated through working systems, test suites, and verified
              credentials rather than academic credentials.
            </p>
            <p className="label-mono text-[10px] text-faint">
              Education is demonstrated through evidence: 56/56 test suites,
              352 deterministic tests, 72/72 agent-stack tests, and 10 verified
              certificates — not through institutional credentials.
            </p>
          </div>
        </Reveal>

        {/* Self-Directed Study Tracks */}
        <Reveal delay={80}>
          <div className="border border-line bg-surface p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Self-Directed Study Tracks</h3>
              <span className="label-mono border px-2 py-1 text-[9px] border-research text-research">
                ONGOING
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">
              Self-directed study evidenced by working systems and research.
              These tracks carry no provider, no certificate, and no assessment —
              they are a record of what is being studied and where that study
              has already produced working systems.
            </p>
            <div className="space-y-4">
              {studyTracks.map((track) => (
                <div key={track.id} className="border-t border-line pt-4 first:border-t-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="label-mono text-[9px] text-faint">{track.index}</span>
                    <span className="font-mono text-sm font-bold text-foreground">{track.title}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-2">{track.focus}</p>
                  <div className="flex flex-wrap gap-2">
                    {track.method.map((m, i) => (
                      <span key={i} className="label-mono text-[8px] border border-line bg-surface px-2 py-0.5 text-faint">
                        {m.length > 40 ? m.slice(0, 40) + "…" : m}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="label-mono text-[9px] text-faint">Evidence:</span>
                    {track.evidenceProject && (
                      <span className="font-mono text-xs text-signal">{track.evidenceProject}</span>
                    )}
                    {track.evidenceResearch && (
                      <span className="font-mono text-xs text-research">{track.evidenceResearch}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}