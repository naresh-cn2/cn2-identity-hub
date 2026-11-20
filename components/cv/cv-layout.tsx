"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

export interface CvChapter {
  id: string;
  label: string;
  number: string;
  title: string;
}

export const CV_CHAPTERS: CvChapter[] = [
  { id: "hero", number: "01", label: "Professional Identity", title: "Professional Identity" },
  { id: "executive-summary", number: "02", label: "Executive Summary", title: "Executive Summary" },
  { id: "professional-architecture", number: "03", label: "Professional Architecture", title: "Professional Architecture" },
  { id: "core-capabilities", number: "04", label: "Core Capabilities", title: "Core Capabilities" },
  { id: "technical-skills", number: "05", label: "Technical Skills", title: "Technical Skills" },
  { id: "education", number: "06", label: "Education", title: "Education" },
  { id: "certifications", number: "07", label: "Certifications & Credentials", title: "Certifications & Credentials" },
  { id: "engineering-experience", number: "08", label: "Engineering Experience", title: "Engineering Experience" },
  { id: "flagship-projects", number: "09", label: "Flagship Projects", title: "Flagship Projects" },
  { id: "supporting-projects", number: "10", label: "Supporting Projects & Builds", title: "Supporting Projects" },
  { id: "research", number: "11", label: "Research & Experiments", title: "Research & Experiments" },
  { id: "achievements", number: "12", label: "Achievements & Engineering Evidence", title: "Achievements & Engineering Evidence" },
  { id: "professional-direction", number: "13", label: "Professional Direction", title: "Professional Direction" },
  { id: "contact-download", number: "14", label: "Contact & CV Download", title: "Contact & Download" },
];

interface CvLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CvLayout({ children, className }: CvLayoutProps) {
  const [activeChapter, setActiveChapter] = useState<string>("hero");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    setIsNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`${className ?? ""} relative min-h-screen w-full bg-background`}>
      {/* Persistent chapter navigation (desktop) */}
      <nav
        ref={navRef}
        className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:top-[8rem] lg:bottom-0 lg:z-40 lg:px-6 lg:pb-24 border-r border-line bg-surface/90 backdrop-blur-md"
        aria-label="CV chapter navigation"
      >
        <div className="flex flex-col gap-1">
          {CV_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.id)}
              className={`group flex items-start gap-1 px-4 py-3 border-r-2 border-transparent rounded-r-lg text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                activeChapter === chapter.id
                  ? "bg-signal/10 text-signal border-signal/50"
                  : "text-faint hover:text-signal hover:bg-signal/5"
              }`}
            >
              <span className="text-[9px] text-faint group-hover:text-signal">{chapter.number}</span>
              <span className="text-[10px] font-semibold leading-tight">{chapter.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile nav trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center gap-2 border border-line bg-surface px-3 py-2 text-[10px] font-mono text-faint transition-colors hover:text-signal hover:border-signal"
        >
          <span>MENU</span>
          <span className={`w-4 h-[1px] bg-current transition-all duration-300 ${
            isNavOpen ? "rotate-90" : ""
          }`} />
        </button>
      </div>

      {/* Mobile nav overlay */}
      {isNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-surface/95 backdrop-blur">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsNavOpen(false)}
              className="border border-line bg-surface px-3 py-2 text-[10px] font-mono text-faint transition-colors hover:text-signal"
            >
              CLOSE
            </button>
          </div>
          <div className="p-6 space-y-2">
            {CV_CHAPTERS.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`flex items-center justify-between gap-2 px-4 py-3 border-b border-line text-xs font-mono uppercase tracking-widest transition-colors ${
                  activeChapter === chapter.id
                    ? "bg-signal/10 text-signal border-signal"
                    : "text-faint hover:text-signal hover:bg-signal/5"
                }`}
              >
                <span>{chapter.number}</span>
                <span>{chapter.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="relative lg:ml-[280px] min-h-screen">
        {children}
      </main>

      {/* Scroll progress indicator */}
      <div
        className="cv-scroll-indicator fixed top-0 left-0 lg:ml-[280px] h-1 bg-signal/20 z-30"
      >
        <div
          className="h-full bg-signal transition-all duration-100"
          style={{
            width: `${typeof document !== "undefined" ? Math.min((scrollY.current / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100, 100) : 0}%`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Chapter section wrapper - editorial layout, no cards.
 */
interface CvChapterSectionProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  support?: string;
  accent?: "signal" | "research" | "electric";
  className?: string;
  children: ReactNode;
}

export function CvChapterSection({
  id,
  number,
  title,
  subtitle,
  support,
  accent = "signal",
  className,
  children,
}: CvChapterSectionProps) {
  const accentCls =
    accent === "signal"
      ? "border-signal text-signal"
      : accent === "research"
        ? "border-research text-research"
        : "border-electric text-electric";

  return (
    <section
      id={id}
      className={`relative border-t border-line/60 bg-surface/80 backdrop-blur-md ${className ?? ""}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-12">
          <div className="flex flex-col gap-1">
            <span className={`label-mono text-[10px] ${accentCls}`}>{number}</span>
            <h2 className="display mt-2 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.04] text-foreground">
              {title}
            </h2>
            {subtitle && <p className="label-mono mt-2 text-[10px] text-faint">{subtitle}</p>}
          </div>
          {support && (
            <p className="max-w-xl text-base leading-relaxed text-muted">{support}</p>
          )}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/**
 * Metric display card - prominent number with provenance label.
 */
interface CvMetricProps {
  value: string;
  label: string;
  context?: string;
  provenance?: string;
}

export function CvMetric({ value, label, context, provenance }: CvMetricProps) {
  return (
    <div className="border border-line bg-surface p-5 md:p-6 transition-colors hover:border-signal/50">
      <p className="num-mono font-semibold leading-none text-[clamp(1.8rem,3.5vw,2.8rem)] text-foreground">
        {value}
      </p>
      <p className="label-mono mt-4 text-[10px] text-foreground">{label}</p>
      {context && (
        <p className="label-mono mt-1 text-[9px] text-faint">{context}</p>
      )}
      {provenance && (
        <p className="label-mono mt-3 text-[9px] text-muted leading-relaxed">{provenance}</p>
      )}
    </div>
  );
}

/**
 * Evidence badge - shows verification level.
 */
interface CvEvidenceBadgeProps {
  level: string;
}

export function CvEvidenceBadge({ level }: CvEvidenceBadgeProps) {
  const upper = level.toUpperCase();
  const variants: Record<string, string> = {
    VERIFIED: "border-signal text-signal",
    DOCUMENTED: "border-research text-research",
    "SELF-REPORTED": "border-electric text-electric",
    UNVERIFIED: "border-faint text-faint",
    "IN ACTIVE DEVELOPMENT": "border-research text-research",
    DEMONSTRATED: "border-signal text-signal",
    "RESEARCH DIRECTION": "border-research text-research",
    ONGOING: "border-electric text-electric",
    PRODUCTION: "border-signal text-signal",
  };
  return (
    <span className={`label-mono border px-2.5 py-1 text-[9px] ${variants[upper] ?? "border-faint text-faint"}`}>
      {level}
    </span>
  );
}

/**
 * Link list - external/internal links with arrow.
 */
interface CvLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export function CvLinkList({ links }: { links: CvLinkItem[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="label-mono inline-flex items-center gap-1.5 text-[10px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
        >
          {link.label}
          {link.external && <span aria-hidden="true">↗</span>}
        </a>
      ))}
    </div>
  );
}