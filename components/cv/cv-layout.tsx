"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CvGrid, CvHorizon, CvParticles } from "@/components/cv/cv-visuals";

export interface CvChapter {
  id: string;
  number: string;
  label: string;
}

/** Stable IDs — anchors, links and the scroll-spy depend on these. */
export const CV_CHAPTERS: CvChapter[] = [
  { id: "hero", number: "01", label: "Professional Profile" },
  { id: "executive-summary", number: "02", label: "Executive Summary" },
  { id: "professional-architecture", number: "03", label: "Technical Architecture" },
  { id: "core-capabilities", number: "04", label: "Engineering Capabilities" },
  { id: "technical-skills", number: "05", label: "Technology Stack" },
  { id: "education", number: "06", label: "Education" },
  { id: "certifications", number: "07", label: "Certifications" },
  { id: "engineering-experience", number: "08", label: "Professional Experience" },
  { id: "flagship-projects", number: "09", label: "Selected Projects" },
  { id: "supporting-projects", number: "10", label: "Project Portfolio" },
  { id: "research", number: "11", label: "Research & Development" },
  { id: "achievements", number: "12", label: "Technical Evidence" },
  { id: "professional-direction", number: "13", label: "Professional Interests" },
  { id: "contact-download", number: "14", label: "Contact Information" },
];

interface CvLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CvLayout({ children, className }: CvLayoutProps) {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.classList.add("cv-motion-ready");
    const scenes = [...document.querySelectorAll<HTMLElement>(".cv-scene")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scenes.forEach((scene) => scene.classList.add("is-inview"));
      return;
    }
    let sawIntersection = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            sawIntersection = true;
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    );
    scenes.forEach((scene) => io.observe(scene));
    // Keep the first screen visible even if the observer is slow, without
    // revealing chapters the visitor has not reached yet.
    const fallback = window.setTimeout(() => {
      if (sawIntersection) return;
      scenes.forEach((scene) => {
        if (scene.getBoundingClientRect().top < window.innerHeight * 1.5) {
          scene.classList.add("is-inview");
        }
      });
    }, 1500);
    // Last-resort safety: never leave content hidden in a broken runtime.
    const safety = window.setTimeout(() => {
      if (!sawIntersection) scenes.forEach((scene) => scene.classList.add("is-inview"));
    }, 6000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(safety);
    };
  }, []);

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
    <div ref={rootRef} className={`cv-experience ${className ?? ""}`}>
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
    <section id={id} data-chapter={number} className={`cv-scene ${className ?? ""}`} data-tone={tone}>
      <CvGrid />
      <CvParticles />
      <header className="cv-scene-head">
        {kicker ? <span className="cv-scene-kicker">{kicker}</span> : null}
        <h2 className="cv-scene-title">{title}</h2>
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
