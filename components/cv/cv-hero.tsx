"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter 01 — Professional Identity
 * Cinematic opening with editorial typography and technical visualization.
 * Single-column editorial composition, no cards.
 */

export function CvHero() {
  return (
    <CvChapterSection
      id="hero"
      number="01"
      title="Professional Identity"
      subtitle="CN2 — Quantitative Developer"
      support="Systems Engineering · Financial Technology · AI Engineering · Software Engineering · Data Engineering · Research & Computational Systems"
      accent="signal"
    >
      <div className="flex flex-col gap-12">
        {/* Hero identity block */}
        <Reveal className="mb-24">
          <div className="flex flex-col gap-2">
            <span className="label-mono text-signal text-[10px] font-bold uppercase tracking-widest">
              CN2.DEV
            </span>
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.92] text-foreground tracking-tighter">
              BUKYA NARESH
            </h1>
            <p className="label-mono text-electric text-[12px] font-semibold uppercase tracking-widest mt-1">
              Quantitative Developer
            </p>
          </div>
        </Reveal>

        {/* Positioning statement */}
        <Reveal delay={80}>
          <div className="border-l-2 border-signal pl-5 py-4">
            <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-2">
              Positioning
            </p>
            <p className="text-base leading-relaxed text-foreground/90">
              Independent quantitative developer engineering software,
              financial infrastructure, and AI-powered systems with
              verifiable evidence.
            </p>
          </div>
        </Reveal>

        {/* Contact & Social Links */}
        <Reveal delay={140}>
          <div className="border border-line bg-surface p-5 md:p-6">
            <p className="label-mono text-[10px] text-faint uppercase tracking-widest mb-3">
              Contact & Professional Links
            </p>
            <div className="space-y-2">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                GitHub →
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                LinkedIn →
              </a>
              <a
                href={site.links.email}
                className="label-mono text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                Email →
              </a>
              <a
                href={site.links.contra}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                Contra →
              </a>
              <a
                href={site.links.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block"
              >
                ORCID →
              </a>
            </div>
          </div>
        </Reveal>

        {/* Download CV shortcut */}
        <Reveal delay={200}>
          <div className="border border-signal bg-signal/10 p-5 md:p-6">
            <p className="label-mono text-[10px] text-signal uppercase tracking-widest mb-3">
              Engineering Dossier
            </p>
            <a
              href="/cv"
              className="block border border-signal bg-signal/20 px-5 py-3 text-[10px] font-bold text-signal transition-colors duration-300 hover:bg-signal hover:text-white text-center"
            >
              Download Complete CV — PDF
            </a>
            <p className="label-mono mt-3 text-[9px] text-faint">
              Permanent URL: cn2-identity-hub.vercel.app/cv
            </p>
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}