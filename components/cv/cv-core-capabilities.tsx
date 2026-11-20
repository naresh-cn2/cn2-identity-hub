"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { capabilities } from "@/data/about";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 04 — Core Capabilities
 * Each capability has its own visual treatment with evidence linkage.
 */

export function CvCoreCapabilities() {
  return (
    <CvChapterSection
      id="core-capabilities"
      number="04"
      title="Core Capabilities"
      subtitle="Domains I work in, with problems addressed and evidence"
      accent="signal"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => (
          <Reveal key={cap.id} className="border border-line bg-surface p-5 md:p-6 transition-colors hover:border-signal/50">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h4 className="font-mono text-sm font-bold text-foreground">{cap.title}</h4>
              <CvEvidenceBadge level={cap.status} />
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{cap.purpose}</p>

            <div className="space-y-3 mb-4">
              <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">
                Problems It Addresses
              </p>
              <ul className="space-y-1">
                {cap.problems.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90 leading-relaxed">
                    <span className="mt-1 h-px w-3 bg-signal shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <div className="flex gap-2">
                {cap.evidence.map((e, i) => (
                  <Link
                    key={i}
                    href={e.href}
                    className="label-mono text-[9px] border border-signal px-2 py-1 text-signal hover:text-white hover:bg-signal/20 transition-colors"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
              {cap.work && (
                <p className="label-mono text-[9px] text-faint">{cap.work}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}