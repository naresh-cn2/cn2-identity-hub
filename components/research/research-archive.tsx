"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { ResearchArtifact } from "./research-visual-artifacts";
import { MethodChainStrip } from "./method-chain";
import { researchCategories, type ResearchCategory, type ResearchEntry } from "@/data/research";
import { capabilities } from "@/data/capabilities";
import { getArchiveProject } from "@/data/archive";

type Filter = ResearchCategory | "ALL";

const STATUS_STYLE: Record<ResearchEntry["status"], string> = {
  VERIFIED: "border-line-strong text-foreground",
  DOCUMENTED: "border-line text-muted",
  ONGOING: "border-signal text-signal",
};

/** Capabilities that name this research entry — a link that already exists in the record. */
function relatedCapabilities(entryId: string) {
  return capabilities.filter((c) => c.research.includes(entryId));
}

export default function ResearchArchive({ entries }: { entries: ResearchEntry[] }) {
  const [active, setActive] = useState<Filter>("ALL");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["ALL", entries.length]]);
    for (const c of researchCategories) {
      map.set(c, entries.filter((e) => e.category === c).length);
    }
    return map;
  }, [entries]);

  const filtered = useMemo(
    () => (active === "ALL" ? entries : entries.filter((e) => e.category === active)),
    [entries, active]
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      {/* ---- topic index ---- */}
      <Reveal>
        <div className="border-t border-line pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display text-xl md:text-2xl">TOPIC INDEX</h3>
            <p className="label-mono text-faint" aria-live="polite">
              {filtered.length} OF {entries.length} ENTRIES{active !== "ALL" ? ` — ${active}` : ""}
            </p>
          </div>
          <div
            className="mt-6 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter research by topic"
          >
            {(["ALL", ...researchCategories] as Filter[]).map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={isActive}
                  className={`label-mono border px-3 py-1.5 text-[10px] transition-colors duration-200 ${
                    isActive
                      ? "border-research bg-research text-background"
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
        </div>
      </Reveal>

      {filtered.length === 0 && (
        <Reveal delay={120}>
          <div className="corner-ticks mt-10 border border-line bg-surface p-8 md:p-12">
            <p className="label-mono text-research">NO ENTRIES IN {active}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              No entries published in this category yet — it is one of the research areas I track,
              and work will land here as it is written up.
            </p>
            <button
              type="button"
              onClick={() => setActive("ALL")}
              className="label-mono mt-6 border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-research hover:text-research"
            >
              ← SHOW ALL RESEARCH
            </button>
          </div>
        </Reveal>
      )}

      {/* ---- entries ---- */}
      <div className="mt-10 space-y-px bg-line">
        {filtered.map((entry, i) => {
          const build = entry.relatedProject ? getArchiveProject(entry.relatedProject) : undefined;
          const caps = relatedCapabilities(entry.id);
          return (
            <Reveal key={entry.id} delay={Math.min(i, 3) * 60}>
              <details className="group bg-background">
                <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-6 gap-y-2 p-5 transition-colors hover:bg-surface md:p-7 [&::-webkit-details-marker]:hidden">
                  <span className="display min-w-0 flex-1 text-lg md:text-2xl">{entry.title}</span>
                  <span className="label-mono text-research">{entry.category}</span>
                  <span className={`label-mono border px-2 py-1 ${STATUS_STYLE[entry.status]}`}>
                    {entry.status}
                  </span>
                </summary>

                <div className="border-t border-line p-5 md:p-7">
                  {/* method chain — the entry's own spine, terminal node by status */}
                  <div className="border border-line bg-surface/50 p-4 md:p-5">
                    <MethodChainStrip entry={entry} />
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {(
                      [
                        ["QUESTION", entry.question],
                        ["HYPOTHESIS", entry.hypothesis],
                        ["METHOD", entry.method],
                        ["EVIDENCE", entry.evidence],
                        ["RESULT", entry.result],
                        ["LIMITATION", entry.limitation],
                      ] as const
                    ).map(([label, body]) => (
                      <div key={label}>
                        <p className="label-mono text-research">{label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                      </div>
                    ))}
                    <div className="md:col-span-2 lg:col-span-3">
                      <p className="label-mono text-foreground">CONCLUSION</p>
                      <p className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-foreground">
                        {entry.conclusion}
                      </p>
                    </div>

                    {/* per-entry visual artifact */}
                    <div className="md:col-span-2">
                      <div className="h-48 w-full border border-line bg-background/50">
                        <ResearchArtifact category={entry.category} seed={i + 100} />
                      </div>
                      <p className="label-mono mt-2 text-[10px] text-faint">
                        GENERATIVE DIAGRAM FOR {entry.category}.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {build && (
                        <p className="label-mono text-faint">
                          EVIDENCE SOURCE —{" "}
                          <Link href={`/work/${build.id}`} className="link-line text-research">
                            {build.shortTitle}
                          </Link>
                        </p>
                      )}
                      {caps.length > 0 && (
                        <p className="label-mono text-faint">
                          COVERED IN CAPABILITIES —{" "}
                          {caps.map((cap, ci) => (
                            <span key={cap.id}>
                              {ci > 0 && <span className="text-faint"> · </span>}
                              <Link href="/capabilities" className="link-line text-research">
                                {cap.name}
                              </Link>
                            </span>
                          ))}
                        </p>
                      )}
                      <Link
                        href={`/research/${entry.id}`}
                        className="label-mono w-fit border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-research hover:text-research"
                      >
                        OPEN FULL ENTRY →
                      </Link>
                    </div>
                  </div>
                </div>
              </details>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
