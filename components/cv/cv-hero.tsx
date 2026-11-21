"use client";

import { ArrowDown, Download } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";
import { CvChapterSection, CvLinkList } from "@/components/cv/cv-layout";
import { CvGlobe, type CvOrbitNode } from "@/components/cv/cv-visuals";

/**
 * Chapter 01 — Identity
 * Cinematic opening: the person first, a short credible statement, and an
 * orbital map of the four domains. No repeated brand or dossier wording.
 */

const orbitNodes: CvOrbitNode[] = [
  { id: "systems", label: "Systems", x: 14, y: 18, tone: "blue" },
  { id: "markets", label: "Markets", x: 86, y: 18, tone: "red" },
  { id: "data", label: "Data", x: 14, y: 82, tone: "blue" },
  { id: "ai", label: "AI", x: 86, y: 82, tone: "blue" },
];

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
      number="01"
      title="Identity"
      kicker="Quantitative Developer"
      lead="Systems, markets, data and AI — one connected engineering practice."
      tone="signal"
      visual={<CvGlobe nodes={orbitNodes} caption="CN2 · SYSTEMS · MARKETS · DATA · AI" />}
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
            Independent quantitative developer engineering software,
            financial infrastructure, and AI-powered systems with
            verifiable evidence.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button
              type="button"
              className="cv-action"
              onClick={() => window.print()}
            >
              <Download size={15} aria-hidden="true" />
              Download CV
            </button>
            <button
              type="button"
              className="cv-action subtle"
              onClick={explore}
            >
              Explore chapters
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
          <p
            className="cv-label"
            style={{
              marginTop: 16,
              fontSize: 9,
              letterSpacing: "0.06em",
              textTransform: "none",
            }}
          >
            Browser print dialog → Save as PDF · {site.url}/cv
          </p>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}
