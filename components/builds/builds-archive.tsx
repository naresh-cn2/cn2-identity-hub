"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ProjectSignature from "@/components/projects/project-signature";
import { TAG_TONE } from "./project-mark";
import { archiveCategories, type ArchiveCategory, type ArchiveProject } from "@/data/archive";

/**
 * Level 1 of the CN2.DEV architecture — the project showcase stack.
 *
 * Not a grid of identical cards: each build gets a full-width showcase with
 * its own visual signature on one side and its introduction on the other,
 * and one clear action — ENTER PROJECT WORLD. The title and the visual lead
 * to the same world as the button. The category filter stays real: it
 * filters the stack in place.
 */

type Filter = ArchiveCategory | "ALL";

function Showcase({ project, flip }: { project: ArchiveProject; flip: boolean }) {
  const copy = (
    <div className={flip ? "lg:order-1" : ""}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="num-mono text-3xl font-semibold text-line-strong md:text-4xl">
          {project.index}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className={`label-mono border border-line px-2 py-1 text-[10px] ${TAG_TONE[t]}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="label-mono mt-6 text-faint">{project.categoryLabel}</p>
      <h2 className="display mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-tight">
        <Link href={`/builds/${project.id}`} className="transition-colors hover:text-signal">
          {project.title}
        </Link>
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{project.thesis}</p>

      {project.metrics.length > 0 && (
        <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {project.metrics.slice(0, 3).map((m) => (
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
            className={`h-1.5 w-1.5 rounded-full ${project.tier === 1 ? "bg-signal pulse-dot" : "bg-research"}`}
            aria-hidden="true"
          />
          {project.status}
        </span>
        <span className="label-mono text-faint">{project.evidenceLabel}</span>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={`/builds/${project.id}`}
          className="corner-ticks group inline-flex items-center gap-3 border border-signal/70 bg-signal/10 px-7 py-3.5 label-mono text-signal transition-colors hover:bg-signal hover:text-background"
        >
          ENTER PROJECT WORLD
          <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line label-mono text-xs text-muted hover:text-signal"
          >
            {project.githubVerified ? "REPOSITORY →" : "PROFILE →"}
          </a>
        )}
      </div>
    </div>
  );

  const visual = (
    <div className={flip ? "lg:order-2" : ""}>
      <Link href={`/builds/${project.id}`} aria-hidden="true" tabIndex={-1} className="block">
        <ProjectSignature project={project} />
      </Link>
    </div>
  );

  return (
    <article className="border-t border-line py-14 md:py-20">
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
    </article>
  );
}

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
        <p className="label-mono mt-4 text-faint" aria-live="polite">
          {filtered.length} OF {projects.length} BUILDS — {active === "ALL" ? "ALL PROJECTS" : `${active} ONLY`}
        </p>
      </Reveal>

      {filtered.length === 0 && (
        <Reveal delay={120}>
          <div className="corner-ticks mt-10 border border-line bg-surface p-8 md:p-12">
            <p className="label-mono text-signal">NO BUILDS TAGGED {active}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              No build carries this tag yet.
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

      {/* ---- showcase stack — remounts on filter change so rows re-reveal ---- */}
      <div key={active}>
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 2) * 90}>
            <Showcase project={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
