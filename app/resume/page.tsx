import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { credentials } from "@/data/credentials";
import { UNIVERSAL_RESUME } from "./resume-data";
import ResumePrintButton from "./resume-print-button";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé — Bukya Naresh (CN2) — CN2.DEV",
  description:
    "Universal engineering résumé for Bukya Naresh (CN2): Systems Engineering, Financial Technology, and AI Engineering — backed by verified projects, test suites, and credentials.",
  alternates: { canonical: "/resume" },
};

function shortDate(iso?: string) {
  if (!iso) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month] = iso.split("-");
  if (!year || !month) return "";
  return `${months[Number(month) - 1] ?? ""} ${year}`.trim();
}

export default function ResumePage() {
  const { identity, about, skillGroups, projects, practiceAndResearch, education } =
    UNIVERSAL_RESUME;

  const verifiedCredentials = education.credentialIds
    .map((id) => credentials.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="resume-shell">
      <div className="resume-container">
        <div className="resume-toolbar" aria-label="Résumé actions">
          <div className="resume-toolbar-links">
            <Link href="/cv">FULL ENGINEERING CV →</Link>
            <Link href="/works">PROJECTS &amp; PROOF →</Link>
            <Link href="/credentials">CREDENTIALS →</Link>
          </div>
          <ResumePrintButton />
        </div>

        <article className="resume-doc" aria-label="Universal Engineering Résumé — Bukya Naresh">
          <header className="resume-doc-top">
            <div>
              <p className="resume-eyebrow">{identity.brand}</p>
              <h1 className="resume-doc-name">{identity.name}</h1>
              <p className="resume-doc-role">{identity.direction}</p>
            </div>
            <div className="resume-doc-contact">
              <div>{site.email}</div>
              <div>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                  github.com/naresh-cn2
                </a>
              </div>
              <div>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/bukya-naresh-cn2
                </a>
              </div>
              <div>
                <a href={site.links.orcid} target="_blank" rel="noopener noreferrer">
                  orcid.org/0009-0007-7269-1583
                </a>
              </div>
              <div>
                <a href="https://cn2.is-a.dev" target="_blank" rel="noopener noreferrer">
                  cn2.is-a.dev
                </a>
              </div>
            </div>
          </header>

          <section className="resume-section" aria-labelledby="resume-about">
            <h2 id="resume-about">About</h2>
            <div className="resume-about">
              {about.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="resume-section" aria-labelledby="resume-skills">
            <div className="resume-section-head">
              <h2 id="resume-skills">Technical Skills</h2>
              <span className="resume-legend">
                Evidence levels: Demonstrated (completed builds) · Active · Familiarity
              </span>
            </div>
            <div className="resume-skills-grid">
              {skillGroups.map((group) => (
                <div className="resume-skill-card" key={group.category}>
                  <h3>{group.category}</h3>
                  <p className="resume-skill-summary">{group.summary}</p>
                  <ul className="resume-skill-tags">
                    {group.items.map((item) => (
                      <li key={item.name} data-level={item.level.toLowerCase()}>
                        <span>{item.name}</span>
                        <span className="resume-skill-level">{item.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section" aria-labelledby="resume-projects">
            <h2 id="resume-projects">Projects &amp; Engineering Work</h2>
            <div className="resume-projects-list">
              {projects.map((project) => (
                <article className="resume-project-card" key={project.id}>
                  <div className="resume-project-head">
                    <h3>{project.name}</h3>
                    <span className="resume-status-badge" data-tone={project.statusTone}>
                      {project.status}
                    </span>
                  </div>
                  <p className="resume-project-desc">{project.description}</p>
                  <p className="resume-project-meta">
                    <strong>Contribution:</strong> {project.contribution}
                  </p>
                  <p className="resume-project-meta">
                    <strong>Verification:</strong> {project.evidence}
                  </p>
                  <div className="resume-project-foot">
                    <div className="resume-tech-row">
                      {project.technologies.map((tech) => (
                        <span className="resume-tech-pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="resume-project-links">
                      {project.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label} ↗
                          </a>
                        ) : (
                          <Link key={link.label} href={link.href}>
                            {link.label} →
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section" aria-labelledby="resume-practice">
            <h2 id="resume-practice">Engineering Practice &amp; Research</h2>
            <p className="resume-note">
              Independent engineering, research, and open-source work — not salaried employment.
            </p>
            <div className="resume-practice-grid">
              {practiceAndResearch.map((item) => (
                <div className="resume-practice-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  {item.href ? (
                    <Link className="resume-inline-link" href={item.href}>
                      Inspect evidence →
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section" aria-labelledby="resume-education">
            <h2 id="resume-education">Education &amp; Credentials</h2>
            <div className="resume-edu-block">
              <div className="resume-edu-title">
                <strong>{education.formal.degree}</strong> — {education.formal.institution}
              </div>
              <p className="resume-edu-status">{education.formal.status}</p>
              <p className="resume-note">{education.formal.note}</p>
            </div>

            <div className="resume-cred-grid">
              {verifiedCredentials.map((cert) => (
                <div className="resume-cred" key={cert.id}>
                  <div className="resume-cred-top">
                    <strong>{cert.program}</strong>
                    <span className="resume-cred-state">{cert.state}</span>
                  </div>
                  <div className="resume-cred-sub">
                    {[cert.provider, shortDate(cert.date), cert.credentialId ? `ID: ${cert.credentialId}` : ""]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="resume-doc-foot">
            <span>CN2.DEV · UNIVERSAL ENGINEERING RÉSUMÉ</span>
            <span>https://cn2.is-a.dev/resume</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
