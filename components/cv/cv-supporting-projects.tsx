"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { getAllWorks } from "@/data/works";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 10 — Supporting Projects & Builds
 * Additional completed and ongoing work with accurate status labels.
 * Each project gets its own treatment, not identical cards.
 */

const SUPPORTING_IDS = [
  "ifm-costintel",
  "forex-platform",
  "crypto-platform",
  "settle-iq",
  "b2b-lead-prospector",
  "forge-stream",
  "zero-latency-engine",
  "forge-core",
  "forge-engine",
  "forge-workspace",
  "forge-ipc",
  "axiom-probe",
  "axiom-protocol-release",
  "axiom-protocol",
  "hydra-core",
  "axiom-json",
  "omni-ledger-engine",
  "cloud-cost-engine",
];

export function CvSupportingProjects() {
  const projects = getAllWorks().filter((w) => SUPPORTING_IDS.includes(w.id));

  return (
    <CvChapterSection
      id="supporting-projects"
      number="10"
      title="Supporting Projects & Builds"
      subtitle="Additional completed and ongoing work with accurate status labels"
      accent="research"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Reveal key={project.id} className="border border-line bg-surface p-5 md:p-6 transition-colors hover:border-signal/50">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h4 className="font-mono text-sm font-bold text-foreground">{project.shortTitle}</h4>
              <CvEvidenceBadge level={project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") ? "VERIFIED" : "DOCUMENTED"} />
            </div>
            <p className="text-xs text-muted leading-relaxed mb-3">{project.summary}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.technologies.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="label-mono text-[9px] text-faint">Status</span>
              <span className="font-mono text-xs text-foreground">{project.status.split(" · ")[0]}</span>
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                GITHUB →
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}