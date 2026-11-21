import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { credentials } from "@/data/credentials";
import { getAllWorks } from "@/data/works";
import { RESUME_DIRECTIONS, getResumeDirection } from "../resume-data";
import ResumePrintButton from "../resume-print-button";
import "../resume.css";

export function generateStaticParams() {
  return RESUME_DIRECTIONS.map((direction) => ({ direction: direction.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ direction: string }>;
}): Promise<Metadata> {
  const { direction } = await params;
  const dir = getResumeDirection(direction);
  if (!dir) return { title: "Résumé not found" };
  return {
    title: `Résumé — ${dir.title} — CN2.DEV`,
    description: dir.subtitle,
    alternates: { canonical: `/resume/${direction}` },
  };
}

function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

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
  return `${months[Number(month) - 1]} ${year}`;
}

export default async function ResumeDirectionPage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction } = await params;
  const dir = getResumeDirection(direction);
  if (!dir) notFound();

  const works = getAllWorks();
  const projects = dir.projectIds
    .map((id) => works.find((work) => work.id === id))
    .filter((work): work is NonNullable<typeof work> => Boolean(work))
    .slice(0, 3);
  const certs = dir.credentialIds
    .map((id) => credentials.find((credential) => credential.id === id))
    .filter((credential): credential is NonNullable<typeof credential> => Boolean(credential));

  const others = RESUME_DIRECTIONS.filter((item) => item.id !== dir.id);

  return (
    <div className="resume-shell">
      <article className="resume-doc" aria-label={`Résumé — ${dir.title}`}>
        <header className="resume-doc-top">
          <div>
            <div className="resume-doc-name">Bukya Naresh</div>
            <div className="resume-doc-role">{dir.title}</div>
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
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                cn2.is-a.dev
              </a>
            </div>
          </div>
        </header>

        <div className="resume-doc-nav">
          <div>
            <Link href="/resume">← ALL DIRECTIONS</Link>
            <span aria-hidden="true"> · </span>
            {others.map((item, index) => (
              <span key={item.id}>
                {index > 0 ? " · " : ""}
                <Link href={`/resume/${item.id}`}>{item.title}</Link>
              </span>
            ))}
          </div>
          <ResumePrintButton />
        </div>

        <section className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary">{dir.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <dl className="resume-skills">
            {dir.skills.map((group) => (
              <Fragment key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </Fragment>
            ))}
          </dl>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <p className="resume-note">
            No formal degree or institution is recorded in the source portfolio. Technical study is
            self-directed and evidenced by working systems.
          </p>
          <ul className="resume-list">
            {dir.studyTracks.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2>Certifications &amp; Credentials</h2>
          <div className="resume-cred-grid">
            {certs.map((cert) => (
              <div className="resume-cred" key={cert.id}>
                <strong>{cert.program}</strong>
                <br />
                <span>
                  {cert.provider} · {shortDate(cert.date)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Engineering Work</h2>
          <p className="resume-note">Independent systems and research builds — not employment history.</p>
          <ul className="resume-list">
            {dir.work.map((item) => (
              <li key={item.name}>
                <strong>{item.name} — </strong>
                {item.detail}
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2>Selected Projects</h2>
          <ul className="resume-list">
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.shortTitle} — </strong>
                {clip(project.summary, 150)} {project.technologies.slice(0, 3).join(", ")}.
              </li>
            ))}
          </ul>
        </section>

        <footer className="resume-doc-foot">
          <span>
            CN2.DEV · RÉSUMÉ · {dir.index} — {dir.title.toUpperCase()}
          </span>
          <span>{site.url}/resume/{dir.id}</span>
        </footer>
      </article>
    </div>
  );
}
