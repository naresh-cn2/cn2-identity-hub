"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StudyTrack } from "@/data/credentials";
import { getArchiveProject } from "@/data/archive";
import { researchEntries } from "@/data/research";

/**
 * LearningMap — where the self-directed study shows up.
 *
 * A bipartite map: the study tracks on the left, the builds and research
 * entries they produced on the right. Every edge exists in the record —
 * tracks carry their evidence project and evidence research explicitly — and
 * every destination is a real route. Hovering, focusing or tapping a node
 * lights its pathway; the destinations themselves are links.
 */

interface Target {
  id: string;
  kind: "BUILD" | "RESEARCH";
  label: string;
  title: string;
  href: string;
}

interface Edge {
  trackIndex: number;
  targetId: string;
}

export default function LearningMap({ tracks }: { tracks: StudyTrack[] }) {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  const targets = useMemo<Target[]>(() => {
    const builds: Target[] = [];
    const research: Target[] = [];
    for (const t of tracks) {
      if (t.evidenceProject && !builds.some((b) => b.id === t.evidenceProject)) {
        const p = getArchiveProject(t.evidenceProject);
        if (p) {
          builds.push({
            id: p.id,
            kind: "BUILD",
            label: p.shortTitle,
            title: p.title,
            href: `/work/${p.id}`,
          });
        }
      }
      if (t.evidenceResearch && !research.some((r) => r.id === t.evidenceResearch)) {
        const r = researchEntries.find((x) => x.id === t.evidenceResearch);
        if (r) {
          research.push({
            id: r.id,
            kind: "RESEARCH",
            label: r.id.toUpperCase(),
            title: r.title,
            href: `/research/${r.id}`,
          });
        }
      }
    }
    return [...builds, ...research];
  }, [tracks]);

  const edges = useMemo<Edge[]>(() => {
    const targetIds = new Set(targets.map((t) => t.id));
    return tracks.flatMap((t, i) =>
      [t.evidenceProject, t.evidenceResearch]
        .filter((id): id is string => Boolean(id) && targetIds.has(id as string))
        .map((targetId) => ({ trackIndex: i, targetId }))
    );
  }, [tracks, targets]);

  const lit = (e: Edge) =>
    (activeTrack !== null && e.trackIndex === activeTrack) ||
    (activeTarget !== null && e.targetId === activeTarget);

  const trackY = (i: number) => ((i + 0.5) / tracks.length) * 100;
  const targetY = (i: number) => ((i + 0.5) / targets.length) * 100;

  const activeTrackRow = activeTrack !== null ? tracks[activeTrack] : undefined;
  const activeTrackTag = activeTrack !== null ? `S${activeTrack + 1}` : "";
  const activeTargetRow = activeTarget ? targets.find((t) => t.id === activeTarget) : undefined;
  const litCount = edges.filter(lit).length;

  return (
    <div>
      <div className="viz-frame relative hidden p-6 lg:block" style={{ height: 600 }}>
        {/* ---- pathways layer ---- */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {edges.map((e) => (
            <g key={`${e.trackIndex}-${e.targetId}`}>
              <line
                x1={30}
                y1={trackY(e.trackIndex)}
                x2={70}
                y2={targetY(targets.findIndex((t) => t.id === e.targetId))}
                stroke={lit(e) ? "var(--signal)" : "var(--line-strong)"}
                strokeWidth={lit(e) ? 1.5 : 1}
                strokeDasharray={lit(e) ? "none" : "3 6"}
                opacity={lit(e) ? 0.95 : activeTrack !== null || activeTarget !== null ? 0.2 : 0.55}
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke 260ms ease, opacity 260ms ease" }}
              />
              {lit(e) && (
                <line
                  x1={30}
                  y1={trackY(e.trackIndex)}
                  x2={70}
                  y2={targetY(targets.findIndex((t) => t.id === e.targetId))}
                  className="travel-pulse"
                  pathLength={100}
                  stroke="var(--signal)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="0.1 100"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.9"
                />
              )}
            </g>
          ))}
        </svg>

        {/* ---- nodes layer ---- */}
        <div className="absolute inset-0">
          {tracks.map((t, i) => {
            const on = activeTrack === i;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setActiveTrack(i)}
                onMouseLeave={() => setActiveTrack((prev) => (prev === i ? null : prev))}
                onFocus={() => setActiveTrack(i)}
                onBlur={() => setActiveTrack((prev) => (prev === i ? null : prev))}
                onClick={() => setActiveTrack((prev) => (prev === i ? null : i))}
                className={`absolute left-0 w-[28%] -translate-y-1/2 border p-3 text-left transition-colors duration-200 ${
                  on
                    ? "border-research bg-research-soft text-foreground"
                    : "border-line bg-background/85 text-muted hover:border-line-strong"
                }`}
                style={{ top: `${trackY(i)}%` }}
              >
                <span className="num-mono block text-[10px] text-research">S{i + 1}</span>
                <span className="label-mono mt-1 block text-[10px] leading-relaxed">{t.title}</span>
              </button>
            );
          })}

          {targets.map((t, i) => {
            const on = activeTarget === t.id;
            const count = edges.filter((e) => e.targetId === t.id).length;
            return (
              <Link
                key={t.id}
                href={t.href}
                title={t.title}
                aria-label={`${t.title} — ${t.kind.toLowerCase()}`}
                onMouseEnter={() => setActiveTarget(t.id)}
                onMouseLeave={() => setActiveTarget((prev) => (prev === t.id ? null : prev))}
                onFocus={() => setActiveTarget(t.id)}
                onBlur={() => setActiveTarget((prev) => (prev === t.id ? null : prev))}
                className={`group absolute right-0 flex w-[28%] -translate-y-1/2 items-center gap-3 border p-3 transition-colors duration-200 ${
                  on
                    ? "border-signal bg-signal-soft text-foreground"
                    : "border-line bg-background/85 text-muted hover:border-line-strong hover:text-foreground"
                }`}
                style={{ top: `${targetY(i)}%` }}
              >
                <span
                  className={`label-mono shrink-0 border px-1.5 py-0.5 text-[9px] ${
                    t.kind === "BUILD" ? "border-line-strong text-foreground" : "border-research text-research"
                  }`}
                >
                  {t.kind}
                </span>
                <span className="label-mono min-w-0 flex-1 truncate text-[10px]" aria-hidden="true">
                  {t.label}
                </span>
                <span className="num-mono shrink-0 text-[10px] text-faint">×{count}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ---- compact stacked map for small screens ---- */}
      <ul className="space-y-px bg-line lg:hidden">
        {tracks.map((t, i) => (
          <li key={t.id} className="bg-background p-5">
            <p className="num-mono text-xs text-research">S{i + 1}</p>
            <h4 className="display mt-2 text-base">{t.title}</h4>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {edges
                .filter((e) => e.trackIndex === i)
                .map((e) => {
                  const target = targets.find((tg) => tg.id === e.targetId);
                  if (!target) return null;
                  return (
                    <Link key={e.targetId} href={target.href} className="group">
                      <span className="label-mono block text-[9px] text-faint">{target.kind}</span>
                      <span className="label-mono text-foreground transition-transform duration-300 group-hover:translate-x-1">
                        {target.label} →
                      </span>
                    </Link>
                  );
                })}
            </div>
          </li>
        ))}
      </ul>

      <p className="label-mono mt-4 min-h-[2.5em] text-[10px] leading-relaxed text-faint" aria-live="polite">
        {activeTrackRow ? (
          <span className="text-foreground">
            {activeTrackTag} — {activeTrackRow.title} → {litCount} {litCount === 1 ? "DESTINATION" : "DESTINATIONS"}
          </span>
        ) : activeTargetRow ? (
          <span className="text-foreground">
            {activeTargetRow.label} — FED BY {litCount} {litCount === 1 ? "TRACK" : "TRACKS"}
          </span>
        ) : (
          <>SELECT A TRACK TO TRACE WHERE IT SHOWS UP</>
        )}
      </p>
    </div>
  );
}
