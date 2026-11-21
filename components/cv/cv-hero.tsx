"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";
import { CvChapterSection, CvLinkList } from "@/components/cv/cv-layout";

/**
 * Chapter — Introduction
 * Cinematic opening: the person first, a short credible statement, and a
 * portrait. No repeated brand or dossier wording.
 */

const links = [
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Email", href: site.links.email, external: false },
  { label: "ORCID", href: site.links.orcid, external: true },
  { label: "Contra", href: site.links.contra, external: true },
];

export function CvHero() {
  const explore = () => {
    document.getElementById("executive-summary")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <CvChapterSection
      id="hero"
      className="cv-hero-scene"
      number="00"
      title="Bukya Naresh"
      kicker="Quantitative Developer"
      lead="Systems engineering, financial technology, data engineering and AI — one connected technical practice."
      tone="signal"
      visual={
        <div className="cv-portrait-frame">
          <Image
            src="/cv/portrait.png"
            alt="Bukya Naresh, Quantitative Developer"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="cv-portrait-img"
            priority
          />
          <span className="cv-portrait-caption">BUKYA NARESH · QUANTITATIVE DEVELOPER</span>
        </div>
      }
    >
      <div style={{ display: "grid", gap: 34 }}>
        <Reveal>
          <p className="cv-label">Bukya Naresh / CN2</p>
          <h1
            style={{
              marginTop: 16,
              fontSize: "clamp(3.2rem, 8vw, 6rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--cv-ink)",
            }}
          >
            BUKYA
            <br />
            NARESH
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            <span className="cv-pill" data-tone="red">Systems</span>
            <span className="cv-pill">Markets</span>
            <span className="cv-pill" data-tone="cyan">Data</span>
            <span className="cv-pill">AI</span>
          </div>

          <p
            className="cv-label"
            style={{
              marginTop: 18,
              lineHeight: 1.9,
              textTransform: "none",
              letterSpacing: "0.04em",
            }}
          >
            Systems Engineering · Financial Technology · AI Engineering ·
            Software Engineering · Data Engineering · Research &amp;
            Computational Systems
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="cv-statement">
            Independent quantitative developer building software, financial
            infrastructure and AI-assisted systems. The work is documented with
            inspectable artifacts and verification links.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button
              type="button"
              className="cv-action subtle"
              onClick={explore}
            >
              Explore
              <ArrowDown size={15} aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <hr className="cv-rule" />
          <p className="cv-label" style={{ marginTop: 18, marginBottom: 14 }}>
            Elsewhere
          </p>
          <CvLinkList links={links} />
        </Reveal>
      </div>
    </CvChapterSection>
  );
}
