"use client";

import { site } from "@/data/site";
import { CvChapterSection, CvLinkList } from "@/components/cv/cv-layout";

/**
 * Contact chapter: direct channels.
 */

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "EMAIL", href: site.links.email },
  { label: "GITHUB", href: site.links.github, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, external: true },
  { label: "CONTRA", href: site.links.contra, external: true },
  { label: "ORCID", href: site.links.orcid, external: true },
];

export function CvContactDownload() {
  return (
    <CvChapterSection
      id="contact-download"
      number="13"
      title="Contact"
      kicker="Contact"
      lead="Use the channels below for direct contact."
      tone="signal"
    >
      <p className="cv-statement">
        The sections above document the work, the methods and their limits.
      </p>

      <div className="cv-panel" style={{ marginTop: 28, padding: 22 }}>
        <p className="cv-label">Contact details</p>
        <hr className="cv-rule" style={{ margin: "14px 0 16px" }} />
        <CvLinkList links={links} />
      </div>

      <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
        <span className="cv-label" style={{ fontSize: 9, color: "var(--cv-red)" }}>CN2.DEV</span>
        <span style={{ flex: 1, height: 1, background: "var(--cv-edge)" }} />
        <span className="cv-label" style={{ fontSize: 9 }}>QUANTITATIVE DEVELOPER</span>
      </div>
    </CvChapterSection>
  );
}
