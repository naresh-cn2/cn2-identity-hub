"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { getAllWorks } from "@/data/works";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 09 — Flagship Projects
 * Each flagship project gets its own substantial presentation.
 * No generic cards — each project has its own architecture description,
 * tech stack, evidence, and results.
 */

const FLAGSHIP_IDS = [
  "bustub-engine",
  "apex-quant-engine",
  "qrsip",
  "market-data-replay",
  "automated-trading-os",
  "billing-data-gateway",
  "context-engineering-labs",
  "stratlab",
];

export function CvFlagshipProjects() {
  const projects = getAllWorks().filter((w) => FLAGSHIP_IDS.includes(w.id));

  return (
    <CvChapterSection
      id="flagship-projects"
      number="09"
      title="Flagship Projects"
      subtitle="Most significant completed projects with full architectural detail"
      accent="signal"
    >
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.id} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-signal/50">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <h3 className="font-mono text-base font-bold text-foreground">{project.shortTitle}</h3>
              <CvEvidenceBadge level={project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") ? "VERIFIED" : "DOCUMENTED"} />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 5).map((t) => (
                <span key={t} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{project.summary}</p>
            {project.keyCapabilities.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Key Capabilities</p>
                <ul className="space-y-1">
                  {project.keyCapabilities.slice(0, 3).map((cap, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/90">
                      <span className="mt-1 h-px w-3 shrink-0 text-signal" />
                      {cap.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-2">
              <span className="label-mono text-[9px] text-faint">Status</span>
              <span className="font-mono text-xs text-foreground">{project.status.split(" · ")[0]}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.linksList.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="label-mono text-[9px] border border-signal px-2 py-1 text-signal hover:text-white hover:bg-signal/20 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {project.metrics.length > 0 && (
              <div className="mt-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Results</p>
                <ul className="space-y-1">
                  {project.metrics.map((m, i) => (
                    <li key={i} className="flex justify-between text-sm text-muted">
                      <span className="text-foreground">{m.value}</span>
                      <span className="text-faint">{m.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.evidenceAndResults.length > 0 && (
              <div className="mt-4">
                <p className="label-mono text-[9px] text-faint uppercase tracking-widest mb-1">Evidence</p>
                <ul className="space-y-1">
                  {project.evidenceAndResults.slice(0, 2).map((e, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 h-px w-3 text-signal shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </CvChapterSection>
  );
}