"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CvGrid, CvHorizon, CvParticles } from "@/components/cv/cv-visuals";

export interface CvChapter {
  id: string;
  number: string;
  label: string;
}

/** Stable IDs — anchors, links and the scroll-spy depend on these. */
export const CV_CHAPTERS: CvChapter[] = [
  { id: "hero", number: "01", label: "Identity" },
  { id: "executive-summary", number: "02", label: "Executive" },
  { id: "professional-architecture", number: "03", label: "Architecture" },
  { id: "core-capabilities", number: "04", label: "Capabilities" },
  { id: "technical-skills", number: "05", label: "Toolkit" },
  { id: "education", number: "06", label: "Education" },
  { id: "certifications", number: "07", label: "Certifications" },
  { id: "engineering-experience", number: "08", label: "Experience" },
  { id: "flagship-projects", number: "09", label: "Projects" },
  { id: "supporting-projects", number: "10", label: "Portfolio" },
  { id: "research", number: "11", label: "Research" },
  { id: "achievements", number: "12", label: "Evidence" },
  { id: "professional-direction", number: "13", label: "Focus" },
  { id: "contact-download", number: "14", label: "Contact" },
];

interface CvLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CvLayout({ children, className }: CvLayoutProps) {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    let last = 0;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.round((window.scrollY / max) * 100)));

      const marker = window.innerHeight * 0.38;
      let current = CV_CHAPTERS[0].id;
      for (const chapter of CV_CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el && el.getBoundingClientRect().top <= marker) current = chapter.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      update();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = useCallback((id: string) => {
    setActive(id);
    setDrawer(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const before = window.scrollY;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Some embedded/headless browsers do not run smooth scrolling or rAF at
    // all — guarantee the chapter is reached even in those environments.
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - before) < 2) {
        window.scrollTo({ top, behavior: "instant" });
      }
    }, 200);
  }, []);

  const railItems = (inDrawer: boolean) =>
    CV_CHAPTERS.map((chapter) => (
      <button
        key={chapter.id}
        type="button"
        className={inDrawer ? "cv-drawer-row" : "cv-rail-item"}
        data-active={active === chapter.id ? "true" : undefined}
        aria-current={active === chapter.id ? "step" : undefined}
        onClick={() => goTo(chapter.id)}
      >
        {inDrawer ? (
          <><span>{chapter.label}</span><span className="cv-rail-num">{chapter.number}</span></>
        ) : (
          <><span className="cv-rail-num">{chapter.number}</span><span>{chapter.label}</span></>
        )}
      </button>
    ));

  return (
    <div className={`cv-experience ${className ?? ""}`}>
      <div className="cv-top-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      <nav className="cv-rail" aria-label="CV chapter navigation">
        <div className="cv-rail-head">
          <span className="cv-rail-brand">CN2<span>.</span>DEV</span>
          <span className="cv-rail-count">CV / 14</span>
        </div>
        <div className="cv-rail-list">{railItems(false)}</div>
        <div className="cv-rail-foot">
          <div className="cv-rail-progress"><i style={{ width: `${progress}%` }} /></div>
          <div className="cv-rail-meta"><span>READING</span><span>{progress}%</span></div>
        </div>
      </nav>

      <div className="cv-mobile-bar lg:hidden">
        <span className="cv-rail-brand">CN2<span>.</span>DEV</span>
        <button
          type="button"
          className="cv-menu-button"
          aria-expanded={drawer}
          aria-controls="cv-drawer"
          onClick={() => setDrawer((v) => !v)}
        >
          {drawer ? "CLOSE" : "CHAPTERS"}
        </button>
      </div>

      {drawer ? (
        <div className="cv-drawer lg:hidden" id="cv-drawer" role="dialog" aria-modal="true" aria-label="CV chapters">
          {railItems(true)}
        </div>
      ) : null}

      <main className="cv-main">{children}</main>
    </div>
  );
}

interface CvChapterSectionProps {
  id: string;
  number: string;
  title: ReactNode;
  kicker?: string;
  lead?: string;
  visual?: ReactNode;
  children: ReactNode;
  tone?: "signal" | "research" | "electric";
  className?: string;
}

/** A full-height chapter scene: numbered header, content column, optional live visual, horizon. */
export function CvChapterSection({
  id,
  number,
  title,
  kicker,
  lead,
  visual,
  children,
  tone = "signal",
  className,
}: CvChapterSectionProps) {
  return (
    <section id={id} className={`cv-scene ${className ?? ""}`} data-tone={tone}>
      <CvGrid />
      <CvParticles />
      <header className="cv-scene-head">
        <span className="cv-scene-kicker">{kicker ?? `CHAPTER ${number}`}</span>
        <h2 className="cv-scene-title">
          <em>{number}</em> <span aria-hidden="true">/</span> {title}
        </h2>
        {lead ? <p className="cv-scene-lead">{lead}</p> : null}
      </header>
      <div className={`cv-scene-body ${visual ? "has-visual" : ""}`}>
        <div className="cv-scene-content">{children}</div>
        {visual ? <div className="cv-scene-visual">{visual}</div> : null}
      </div>
      <CvHorizon />
    </section>
  );
}

interface CvMetricProps {
  value: string;
  label: string;
  context?: string;
  provenance?: string;
}

export function CvMetric({ value, label, context, provenance }: CvMetricProps) {
  return (
    <div className="cv-panel" style={{ padding: 22 }}>
      <p className="num-mono" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", lineHeight: 1, color: "var(--cv-red)" }}>{value}</p>
      <p className="cv-label" style={{ marginTop: 16, color: "var(--cv-ink)" }}>{label}</p>
      {context ? <p style={{ marginTop: 6, fontSize: 12, color: "var(--cv-muted)" }}>{context}</p> : null}
      {provenance ? <p className="cv-label" style={{ marginTop: 14, fontSize: 9, lineHeight: 1.5 }}>{provenance}</p> : null}
    </div>
  );
}

export function CvEvidenceBadge({ level }: { level: string }) {
  const tone = /VERIFIED|PRODUCTION|COMPLETED|DEMONSTRATED/i.test(level)
    ? "green"
    : /ACTIVE|ONGOING|DEVELOPMENT|RESEARCH/i.test(level)
      ? "red"
      : undefined;
  return <span className="cv-status" data-tone={tone}>{level}</span>;
}

interface CvLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export function CvLinkList({ links }: { links: CvLinkItem[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px" }}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="cv-link"
        >
          {link.label} {link.external ? "↗" : "→"}
        </a>
      ))}
    </div>
  );
}
