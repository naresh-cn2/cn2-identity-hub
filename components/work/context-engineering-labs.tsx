"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/reveal";
import {
  CE_LABS,
  type CeLab,
  type CeLabLayer,
  repoFile,
  repoTree,
} from "@/data/context-engineering-labs";

/**
 * ContextEngineeringLabs — the six-unit explorer.
 *
 * The labs are six implementations inside one repository, so the record
 * has to be readable as a set rather than as six unrelated cards. The
 * unit is the card; the repository is the project.
 *
 * Interaction is deliberately restrained and structural:
 *   - Filter by layer, because the units are a stack and the stack is
 *     the argument.
 *   - Expand a unit for its capabilities, stack, concepts, verification
 *     and — the part that matters — where it stops matching its own
 *     documentation.
 *
 * Expansion is a real button with aria-expanded and aria-controls, so
 * the panel is reachable and announceable without JavaScript layout
 * tricks. All motion is CSS and respects the global reduced-motion
 * block.
 */

const LAYER_FILTERS: { id: "ALL" | CeLabLayer; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "KNOWLEDGE", label: "KNOWLEDGE" },
  { id: "PROTOCOL", label: "PROTOCOL" },
  { id: "PACKAGING", label: "PACKAGING" },
  { id: "ORCHESTRATION", label: "ORCHESTRATION" },
  { id: "OBSERVABILITY", label: "OBSERVABILITY" },
  { id: "EXECUTION", label: "EXECUTION" },
];

function UnitCard({ lab, index }: { lab: CeLab; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `ce-lab-panel-${lab.code}`;
  const buttonId = `ce-lab-toggle-${lab.code}`;

  return (
    <Reveal delay={(index % 3) * 60}>
      <article
        id={`ce-lab-${lab.code}`}
        className="card-depth flex h-full flex-col border border-line bg-surface/40"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="num-mono text-[10px] text-signal">UNIT {lab.code}</span>
            <span className="label-mono border border-line px-2 py-0.5 text-[9px] text-muted">
              {lab.layer}
            </span>
          </div>
          <span className="label-mono text-[9px] text-faint">
            {lab.testCount} TEST CASES · {lab.evidenceClass}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 py-6 md:px-6">
          <h3 className="display-condensed text-xl text-foreground md:text-2xl">
            {lab.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{lab.subtitle}</p>

          <div className="mt-5 border-l-2 border-line pl-4">
            <p className="label-mono text-[9px] text-faint">THE PROBLEM</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{lab.problem}</p>
          </div>

          <button
            id={buttonId}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group mt-6 inline-flex items-center gap-3 self-start label-mono text-[10px] font-bold text-research transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-research"
          >
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            <span>{open ? "CLOSE THE RECORD" : "OPEN THE RECORD"}</span>
            <span className="text-faint group-hover:text-muted">
              {open ? "−" : "+"}
            </span>
          </button>
        </div>

        {/* ---- expanded detail ---- */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!open}
          className="border-t border-line bg-background/40 px-5 py-6 md:px-6"
        >
          <div className="space-y-6">
            <section>
              <p className="label-mono text-[9px] text-signal">WHAT THE CODE DOES</p>
              <ul className="mt-3 space-y-3">
                {lab.capabilities.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-0.5 text-research">
                      ▸
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <p className="label-mono text-[9px] text-faint">TECHNOLOGY STACK</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lab.stack.map((s) => (
                    <span
                      key={s}
                      className="label-mono border border-line bg-surface px-2 py-1 text-[9px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="label-mono text-[9px] text-faint">ENGINEERING CONCEPTS</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lab.concepts.map((c) => (
                    <span
                      key={c}
                      className="label-mono border border-line bg-surface px-2 py-1 text-[9px] text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <section>
              <p className="label-mono text-[9px] text-faint">HOW IT WAS VERIFIED</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{lab.verification}</p>
            </section>

            <section className="border border-line bg-surface/60 p-4 md:p-5">
              <p className="label-mono text-[9px] text-signal">
                WHERE IT STOPS MATCHING ITS OWN DOCUMENTATION
              </p>
              <ul className="mt-3 space-y-3">
                {lab.limitations.map((l, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-0.5 text-signal">
                      !
                    </span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="label-mono text-[9px] text-faint">OPEN THE SOURCE</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={repoTree(lab.sourcePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line label-mono text-[10px] font-bold text-signal hover:text-foreground"
                >
                  SOURCE DIRECTORY →
                </a>
                <a
                  href={repoFile(`${lab.sourcePath}/README.md`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line label-mono text-[10px] text-muted hover:text-foreground"
                >
                  README →
                </a>
                <a
                  href={repoFile(`${lab.sourcePath}/ARCHITECTURE.md`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line label-mono text-[10px] text-muted hover:text-foreground"
                >
                  ARCHITECTURE →
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ContextEngineeringLabs() {
  const [filter, setFilter] = useState<"ALL" | CeLabLayer>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? CE_LABS : CE_LABS.filter((l) => l.layer === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      {/* ---- filter toolbar ---- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-mono mr-2 text-[10px] text-faint">FILTER LAYER:</span>
          {LAYER_FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`label-mono border px-3 py-1 text-[10px] transition-colors ${
                  active
                    ? "border-signal bg-signal font-bold text-white"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <p className="label-mono text-[10px] text-faint" aria-live="polite">
          {filtered.length} OF {CE_LABS.length} UNITS · ONE REPOSITORY
        </p>
      </div>

      {/* ---- unit grid ---- */}
      <div className="mt-8 grid gap-px bg-line lg:grid-cols-2">
        {filtered.map((lab, i) => (
          <UnitCard key={lab.code} lab={lab} index={i} />
        ))}
      </div>
    </div>
  );
}
