"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ProjectMark, { TAG_TONE } from "./project-mark";
import { archiveCategories, type ArchiveCategory, type ArchiveProject } from "@/data/archive";

type Filter = ArchiveCategory | "ALL";

export default function BuildsArchive({ projects }: { projects: ArchiveProject[] }) {
  const [active, setActive] = useState<Filter>("ALL");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["ALL", projects.length]]);
    for (const c of archiveCategories) {
      map.set(c, projects.filter((p) => p.tags.includes(c)).length);
    }
    return map;
  }, [projects]);

  const filtered = useMemo(
    () => (active === "ALL" ? projects : projects.filter((p) => p.tags.includes(active))),
    [projects, active]
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      {/* ---- filters ---- */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-6" role="group" aria-label="Filter builds by category">
          {(["ALL", ...archiveCategories] as Filter[]).map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={`label-mono border px-3 py-1.5 text-[10px] transition-colors duration-200 ${
                  isActive
                    ? "border-signal bg-signal text-background"
                    : "border-line text-muted hover:border-line-strong hover:text-foreground"
                }`}
              >
                {c}
                <span className={`ml-2 num-mono ${isActive ? "text-background/70" : "text-faint"}`}>
                  {String(counts.get(c) ?? 0).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="label-mono mt-4 text-faint">
          {filtered.length} OF {projects.length} BUILDS — {active === "ALL" ? "COMPLETE ARCHIVE" : `${active} ONLY`}
        </p>
      </Reveal>

      {filtered.length === 0 && (
        <Reveal delay={120}>
          <div className="corner-ticks mt-10 border border-line bg-surface p-8 md:p-12">
            <p className="label-mono text-signal">NO BUILDS TAGGED {active}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Nothing in the archive carries this tag yet. This filter is left in place rather than
              hidden — an empty category is a truthful state, and it will populate when the work
              behind it exists.
            </p>
            <button
              type="button"
              onClick={() => setActive("ALL")}
              className="label-mono mt-6 border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              ← SHOW ALL BUILDS
            </button>
          </div>
        </Reveal>
      )}

      {/* ---- archive grid ---- */}
      <div className="mt-10 grid gap-px bg-line lg:grid-cols-2">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 3) * 90}>
            <article className="flex h-full flex-col bg-background p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="num-mono text-4xl font-semibold text-line-strong md:text-5xl">
                  {p.index}
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className={`label-mono border border-line px-2 py-1 text-[10px] ${TAG_TONE[t]}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 h-36 w-full border border-line bg-surface md:h-40">
                <ProjectMark id={p.id} />
              </div>

              <p className="label-mono mt-6 text-faint">{p.categoryLabel}</p>
              <h2 className="display mt-3 text-2xl md:text-3xl">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.thesis}</p>

              {p.metrics.length > 0 && (
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                  {p.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dt className="label-mono text-[10px] text-faint">{m.label}</dt>
                      <dd className="num-mono mt-1 text-lg font-semibold text-foreground">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="label-mono flex items-center gap-2 text-foreground">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${p.tier === 1 ? "bg-signal pulse-dot" : "bg-research"}`}
                    aria-hidden="true"
                  />
                  {p.status}
                </span>
                <span className="label-mono text-faint">{p.evidenceLabel}</span>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                <Link
                  href={`/builds/${p.id}`}
                  className="label-mono border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  {p.tier === 1 ? "OPEN CASE STUDY →" : "OPEN BUILD RECORD →"}
                </Link>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line label-mono text-xs text-muted hover:text-signal"
                  >
                    {p.githubVerified ? "REPOSITORY →" : "PROFILE →"}
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
