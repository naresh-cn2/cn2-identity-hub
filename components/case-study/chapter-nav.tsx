"use client";

import { useEffect, useState } from "react";

interface Chapter {
  id: string;
  label: string;
}

/**
 * Sticky chapter navigation for case studies.
 * Tracks the chapter currently in view via IntersectionObserver.
 */
export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Case study chapters" className="sticky top-20 hidden lg:block">
      <p className="label-mono mb-4 text-faint">CHAPTERS</p>
      <ol className="space-y-1 border-l border-line">
        {chapters.map((c, i) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-3 border-l-2 py-1.5 pl-4 transition-colors duration-300 ${
                  isActive
                    ? "-ml-px border-signal text-foreground"
                    : "-ml-px border-transparent text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`num-mono text-[10px] transition-colors ${isActive ? "text-signal" : "text-faint"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-mono">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
