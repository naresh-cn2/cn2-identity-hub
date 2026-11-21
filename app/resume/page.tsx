import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_DIRECTIONS } from "./resume-data";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé — CN2.DEV",
  description:
    "Three targeted professional résumés — Systems / Backend Engineer, Quantitative Developer and AI Engineer — drawn from verified work, credentials and research.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="resume-shell">
      <header style={{ maxWidth: 820, margin: "0 auto 30px" }}>
        <p
          style={{
            fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--resume-accent)",
            textTransform: "uppercase",
          }}
        >
          Résumé / Career directions
        </p>
        <h1 className="resume-select-heading" style={{ marginTop: 12, fontWeight: 700 }}>
          Three focused résumés. One verified body of work.
        </h1>
        <p style={{ marginTop: 14, maxWidth: 640, fontSize: 14, lineHeight: 1.6, color: "var(--resume-muted)" }}>
          Select a direction to open a clean, one-page document. Each version prioritizes the skills,
          engineering work, credentials and evidence relevant to that role.
        </p>
      </header>

      <main style={{ maxWidth: 820, margin: "0 auto" }}>
        <section aria-labelledby="resume-directions">
          <h2
            id="resume-directions"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Select a direction
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {RESUME_DIRECTIONS.map((dir) => (
              <Link key={dir.id} href={`/resume/${dir.id}`} className="resume-select-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span className="resume-select-tag">{dir.index}</span>
                  <span className="resume-select-action">VIEW RÉSUMÉ →</span>
                </div>
                <h3 style={{ marginTop: 18 }}>{dir.title}</h3>
                <p style={{ marginTop: 8 }}>{dir.subtitle}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {dir.skills.slice(0, 4).flatMap((group) => group.items.slice(0, 2)).slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        border: "1px solid var(--resume-rule)",
                        padding: "2px 7px",
                        fontSize: 10,
                        color: "var(--resume-muted)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p style={{ marginTop: "auto", paddingTop: 20, fontSize: 10, color: "var(--resume-faint)" }}>
                  {dir.credentialIds.length} verified credentials · {dir.projectIds.length} selected projects
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
