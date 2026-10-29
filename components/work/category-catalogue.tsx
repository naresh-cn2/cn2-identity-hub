"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import TiltCard from "@/components/ui/tilt-card";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { type CategoryMeta, type ComprehensiveWorkItem } from "@/data/works";

interface Props {
  category: CategoryMeta;
  items: ComprehensiveWorkItem[];
}

export default function CategoryCatalogue({ category, items }: Props) {
  const [activeTag, setActiveTag] = useState<string>("ALL");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeTag === "ALL") return items;
    return items.filter((item) => item.tags.some((t) => t === activeTag));
  }, [items, activeTag]);

  const accentColor =
    category.accent === "signal"
      ? "text-signal"
      : category.accent === "research"
      ? "text-research"
      : "text-cyan-500 dark:text-cyan-400";

  const accentBorder =
    category.accent === "signal"
      ? "border-signal text-signal"
      : category.accent === "research"
      ? "border-research text-research"
      : "border-cyan-500 text-cyan-500";

  return (
    <>
      {/* Category Hero */}
      <header className="relative overflow-hidden border-b border-line bg-surface/30">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/works" className="label-mono text-faint transition-colors hover:text-foreground">
                WORKS
              </Link>
              <span className="label-mono text-faint" aria-hidden="true">/</span>
              <p className={`label-mono font-bold ${accentColor}`}>
                TIER {category.number} — {category.title}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5.5rem)] text-foreground">
              {category.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 font-mono text-lg font-bold text-foreground/90 md:text-xl">
              {category.tagline}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {category.description}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="label-mono border border-line bg-surface px-3 py-1.5 text-xs text-foreground">
                {items.length} {items.length === 1 ? "SYSTEM" : "SYSTEMS"} DOCUMENTED
              </span>
              <Link
                href="/works"
                className="label-mono border border-line-strong px-4 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                ← ALL WORKS TIERS
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Filter Toolbar */}
      <section aria-label="Tag filters" className="sticky top-14 z-20 border-b border-line bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono text-[10px] text-faint mr-2">FILTER:</span>
            {allTags.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`label-mono border px-3 py-1 text-[10px] transition-all ${
                    active
                      ? `${accentBorder} bg-surface font-bold`
                      : "border-line bg-transparent text-muted hover:border-line-strong hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <span className="label-mono text-[10px] text-faint">
            SHOWING {filteredItems.length} OF {items.length}
          </span>
        </div>
      </section>

      {/* Items Catalogue Grid / Stack */}
      <section aria-label={`${category.title} catalogue`} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid gap-10">
            {filteredItems.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 90, 360)}>
                <TiltCard>
                  <article className="border border-line bg-surface p-6 transition-all duration-300 hover:border-line-strong hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
                      <div>
                        {/* Meta and Index */}
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                          <span className="num-mono text-2xl font-bold text-faint">
                            {item.index}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="label-mono border border-line bg-background px-2 py-0.5 text-[10px] text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Title and Category */}
                        <p className="label-mono mt-4 text-[10px] text-faint">{item.categoryLabel}</p>
                        <h2 className="display mt-2 text-3xl md:text-4xl text-foreground">
                          <Link href={`/works/${item.id}`} className="transition-colors hover:text-signal">
                            {item.title}
                          </Link>
                        </h2>

                        {/* Thesis */}
                        <p className="mt-4 font-mono text-sm font-semibold text-foreground/90">
                          {item.thesis}
                        </p>

                        {/* Summary */}
                        <p className="mt-3 text-base leading-relaxed text-muted">
                          {item.summary}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-xs border border-line/70 bg-surface-2 px-2.5 py-1 text-foreground/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Status & Metrics & CTA */}
                      <div className="flex flex-col justify-between border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="pulse-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                            <span className="label-mono text-xs font-bold text-foreground">
                              {item.status}
                            </span>
                          </div>
                          {item.statusNote && (
                            <p className="mt-2 text-xs leading-relaxed text-faint">
                              {item.statusNote}
                            </p>
                          )}

                          {/* Metrics */}
                          {item.metrics.length > 0 && (
                            <div className="mt-6 space-y-4 border-t border-line/60 pt-4">
                              {item.metrics.slice(0, 3).map((m) => (
                                <div key={m.label}>
                                  <span className="num-mono text-xl font-bold text-foreground">
                                    {m.value}
                                  </span>
                                  <p className="label-mono mt-0.5 text-[9px] text-faint">
                                    {m.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 space-y-3 pt-6 border-t border-line/60">
                          <Link
                            href={`/works/${item.id}`}
                            className="label-mono group inline-flex w-full items-center justify-center gap-2 border border-signal bg-signal/5 px-6 py-3.5 text-xs font-bold text-signal transition-all hover:bg-signal hover:text-white"
                          >
                            <span>EXPLORE CASE STUDY &amp; OVERVIEW</span>
                            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                          </Link>
                          {item.github && (
                            <a
                              href={item.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="label-mono block text-center text-[10px] text-faint hover:text-foreground"
                            >
                              GITHUB REPOSITORY ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
