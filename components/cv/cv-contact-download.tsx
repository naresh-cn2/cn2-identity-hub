"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 14 — Contact & CV Download
 * Closing experience with contact links and downloadable PDF.
 */

export function CvContactDownload() {
  return (
    <CvChapterSection
      id="contact-download"
      number="14"
      title="Contact & CV Download"
      subtitle="Take the engineering dossier with you"
      accent="signal"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Contact Information */}
        <Reveal>
          <div className="border border-line bg-surface p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Contact</h3>
              <span className="label-mono text-[10px] text-faint">Professional</span>
            </div>
            <div className="space-y-3">
              <a
                href={site.links.email}
                className="label-mono inline-flex items-center gap-2 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
              >
                <span>Email</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono inline-flex items-center gap-2 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
              >
                <span>GitHub</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono inline-flex items-center gap-2 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
              >
                <span>LinkedIn</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.links.contra}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono inline-flex items-center gap-2 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
              >
                <span>Contra</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.links.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono inline-flex items-center gap-2 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
              >
                <span>ORCID</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Download PDF */}
        <Reveal delay={80}>
          <div className="border border-signal bg-signal/5 p-6 md:p-8 rounded-lg">
            <p className="label-mono text-[10px] text-signal uppercase tracking-widest mb-3">
              Engineering Dossier
            </p>
            <h3 className="font-mono text-base font-bold text-foreground mb-2">Download Complete CV — PDF</h3>
            <p className="text-sm leading-relaxed text-muted mb-4">
              The complete CV — all 14 chapters, project details, certifications,
              research, and evidence — in a printable, shareable document.
            </p>
            <button
              onClick={() => window.print()}
              className="w-full border border-signal bg-signal/10 px-5 py-4 text-[10px] font-bold text-signal transition-colors duration-300 hover:bg-signal hover:text-white text-center"
            >
              Download CV — PDF
            </button>
            <p className="label-mono text-[9px] text-faint">
              Uses browser print dialog. Select "Save as PDF" in the destination dropdown.
            </p>
            <div className="mt-4 flex flex-col gap-1">
              <span className="label-mono text-[9px] text-faint">Permanent URL:</span>
              <a
                href={site.url}
                className="font-mono text-xs text-signal break-all"
              >
                https://cn2-identity-hub.vercel.app/cv
              </a>
            </div>
          </div>
        </Reveal>

        {/* Print Footer */}
        <Reveal delay={160} className="border border-line bg-surface p-6 md:p-8 text-center">
          <p className="label-mono text-[10px] text-signal uppercase tracking-widest mb-2">
            CN2.DEV — Quantitative Developer
          </p>
          <p className="text-sm text-muted">
            Engineering dossier generated from verifiable artifacts. Every claim
            backed by working systems, test suites, and certificates with
            verification links.
          </p>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}