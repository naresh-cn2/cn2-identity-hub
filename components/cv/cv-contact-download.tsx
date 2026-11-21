"use client";

import { site } from "@/data/site";
import { CvChapterSection, CvLinkList } from "@/components/cv/cv-layout";

/**
 * Contact chapter: direct channels and a print-ready document.
 */

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "EMAIL", href: site.links.email },
  { label: "GITHUB", href: site.links.github, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, external: true },
  { label: "CONTRA", href: site.links.contra, external: true },
  { label: "ORCID", href: site.links.orcid, external: true },
];

export function CvContactDownload() {
  const permanentUrl = `${site.url}/cv`;

  return (
    <CvChapterSection
      id="contact-download"
      number="14"
      title="Contact Information"
      kicker="Professional contact"
      lead="The evidence is on the record. If the work is relevant, the next step is a direct conversation."
      tone="signal"
      visual={
        <div style={{ position: "relative", display: "grid", placeItems: "center", minHeight: 400, isolation: "isolate" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "min(78%, 420px)",
              aspectRatio: "1",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,48,48,0.22), rgba(27,77,201,0.12) 45%, transparent 70%)",
              filter: "blur(34px)",
              zIndex: 0,
            }}
          />
          <div
            className="cv-pdf"
            aria-hidden="true"
            style={{ position: "absolute", transform: "rotate(5deg) translate(16px, 10px)", opacity: 0.45 }}
          />
          <div
            className="cv-pdf"
            style={{
              position: "relative",
              width: 178,
              zIndex: 1,
              boxShadow: "20px 22px 0 -10px rgba(9,20,36,0.85), 0 0 60px rgba(255,48,48,0.22), 0 0 90px rgba(27,77,201,0.3)",
            }}
          >
            <div style={{ width: "100%", padding: 18, display: "grid", gap: 7 }}>
              <span className="cv-label" style={{ fontSize: 8, color: "var(--cv-red)" }}>CN2.DEV / CV</span>
              <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "var(--cv-ink)" }}>
                BUKYA NARESH
              </span>
              <hr className="cv-rule" style={{ margin: "3px 0" }} />
              {[92, 80, 86, 70, 78, 64].map((width, i) => (
                <i key={i} style={{ display: "block", height: 2, width: `${width}%`, background: "rgba(122,167,255,0.38)" }} />
              ))}
              <span className="cv-label" style={{ marginTop: 6, fontSize: 8 }}>PRINT-READY CV</span>
            </div>
          </div>
          <p className="cv-label" style={{ position: "absolute", bottom: 6, fontSize: 9, textAlign: "center", color: "var(--cv-dim)" }}>
            DOCUMENT PREVIEW · GENERATED FROM THIS PAGE
          </p>
        </div>
      }
    >
      <p className="cv-statement">
        This chapter closes the record. The sections above document the work, the methods and their limits. Use the
        channels below for direct contact.
      </p>

      <div className="cv-panel" style={{ marginTop: 28, padding: 22 }}>
        <p className="cv-label">Direct channels</p>
        <hr className="cv-rule" style={{ margin: "14px 0 16px" }} />
        <CvLinkList links={links} />
      </div>

      <div className="cv-panel" style={{ marginTop: 16, padding: 22 }}>
        <p className="cv-label">Print-ready document</p>
        <h3 style={{ marginTop: 12, fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 600, color: "var(--cv-ink)" }}>
          Download CV (PDF)
        </h3>
        <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.65, color: "var(--cv-muted)" }}>
          A print-ready copy of the full record — evidence, project detail and provenance — generated directly from
          this page.
        </p>
        <button type="button" className="cv-action" onClick={() => window.print()} style={{ marginTop: 18, width: "100%" }}>
          Download CV (PDF)
        </button>
        <p className="cv-label" style={{ marginTop: 12, fontSize: 9, lineHeight: 1.6 }}>
          Opens your browser print dialog. Choose “Save as PDF” in the destination dropdown.
        </p>
        <hr className="cv-rule" style={{ margin: "16px 0 14px" }} />
        <p className="cv-label" style={{ fontSize: 9 }}>Permanent URL</p>
        <a href={permanentUrl} className="cv-link" style={{ display: "inline-block", marginTop: 8, fontSize: 11 }}>
          {permanentUrl}
        </a>
      </div>

      <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
        <span className="cv-label" style={{ fontSize: 9, color: "var(--cv-red)" }}>CN2.DEV</span>
        <span style={{ flex: 1, height: 1, background: "var(--cv-edge)" }} />
        <span className="cv-label" style={{ fontSize: 9 }}>QUANTITATIVE DEVELOPER</span>
      </div>
    </CvChapterSection>
  );
}
