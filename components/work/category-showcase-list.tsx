"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import TiltCard from "@/components/ui/tilt-card";
import ProjectSignature from "@/components/projects/project-signature";
import { TAG_TONE } from "./project-mark";
import type { ComprehensiveWorkItem } from "@/data/works";

interface Props {
  items: ComprehensiveWorkItem[];
  categoryTitle: string;
}

export default function CategoryShowcaseList({ items, categoryTitle }: Props) {
  const [activeTag, setActiveTag] = useState<string>("ALL");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeTag === "ALL") return items;
    return items.filter((item) => item.tags.some((t) => t === activeTag));
  }, [items, activeTag]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-mono text-[10px] text-faint mr-2">FILTER DISCIPLINE:</span>
          {allTags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`label-mono border px-3 py-1 text-[10px] transition-colors ${
                  active
                    ? "border-signal bg-signal text-white font-bold"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <p className="label-mono text-[10px] text-faint">
          {filtered.length} OF {items.length} {categoryTitle.toUpperCase()}
        </p>
      </div>

      {/* Full-width showcase items */}
      <div className="divide-y divide-line">
        {filtered.map((item, i) => {
          const flip = i % 2 === 1;

          const copy = (
            <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex flex-wrap justify-end gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className={`label-mono border border-line px-2 py-1 text-[10px] ${TAG_TONE[t] ?? "text-muted"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="label-mono mt-6 text-faint">{item.categoryLabel}</p>
              <h3 className="display mt-3 text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-foreground">
                <Link href={`/works/${item.id}`} className="transition-colors hover:text-signal">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {item.thesis}
              </p>

              {item.metrics.length > 0 && (
                <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
                  {item.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dt className="label-mono text-[10px] text-faint">{m.label}</dt>
                      <dd className="num-mono mt-1 text-lg font-semibold text-foreground">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="label-mono flex items-center gap-2 text-foreground">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                  {item.status}
                </span>
                <span className="label-mono text-[10px] text-faint">
                  {item.evidenceLabel}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/works/${item.id}`}
                  className="corner-ticks group inline-flex items-center gap-3 border border-signal bg-signal/15 px-6 py-3.5 label-mono text-xs font-semibold text-signal transition-colors hover:bg-signal hover:text-white"
                >
                  <span>ENTER OVERVIEW &amp; CASE STUDY</span>
                  <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line label-mono text-xs text-muted hover:text-signal"
                  >
                    REPOSITORY →
                  </a>
                )}
              </div>
            </div>
          );

          const visual = (
            <TiltCard className={`min-w-0 ${flip ? "lg:order-2" : ""}`} max={2.5}>
              <Link href={`/works/${item.id}`} aria-hidden="true" tabIndex={-1} className="block">
                <ProjectSignature project={item} />
              </Link>
            </TiltCard>
          );

          return (
            <article key={item.id} className="py-16 md:py-24">
              <Reveal>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                  {flip ? (
                    <>
                      {copy}
                      {visual}
                    </>
                  ) : (
                    <>
                      {visual}
                      {copy}
                    </>
                  )}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </div>
  );
}

