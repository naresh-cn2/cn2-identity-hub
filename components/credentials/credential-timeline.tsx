"use client";

import { useState } from "react";
import Link from "next/link";
import type { CredentialRecord, StudyTrack } from "@/data/certifications";
import { getArchiveProject } from "@/data/archive";
import { researchEntries } from "@/data/research";

/**
 * CredentialTimeline — the professional-development sequence.
 *
 * Issued certificates first (in the order they are recorded, each printed
 * date shown exactly as the certificate prints it), followed by the
 * self-directed study tracks, which carry no dates and are therefore
 * sequenced without year labels. Every record expands through an accessible
 * accordion; no credential fact is added, truncated or reworded here.
 */

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Print a date exactly as the certificate does — string parsing, no timezone math. */
function formatDate(iso?: string) {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** Rail label — month and year only, used where a printed date exists. */
function shortDate(iso?: string) {
  if (!iso) return undefined;
  const [, m, y] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

interface Row {
  id: string;
  tag: string;
  kind: "credential" | "track";
  state: string;
  date?: string;
  title: string;
  credential?: CredentialRecord;
  track?: StudyTrack;
}

export default function CredentialTimeline({
  credentials,
  tracks,
}: {
  credentials: CredentialRecord[];
  tracks: StudyTrack[];
}) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const rows: Row[] = [
    ...credentials.map((c, i) => ({
      id: c.id,
      tag: `C${i + 1}`,
      kind: "credential" as const,
      state: c.state,
      date: c.date,
      title: c.program,
      credential: c,
    })),
    ...tracks.map((t, i) => ({
      id: t.id,
      tag: `S${i + 1}`,
      kind: "track" as const,
      state: t.state,
      title: t.title,
      track: t,
    })),
  ];

  const splitPct = (credentials.length / rows.length) * 100;

  return (
    <div>
      {/* ---- sequence rail: the whole record, dated ticks where dates exist ---- */}
      <div className="relative mx-auto hidden h-24 max-w-5xl lg:block" aria-hidden="true">
        <span className="dash-rule-h absolute left-0 right-0 top-[25px]" />
        {rows.map((row, i) => {
          const prev = rows[i - 1];
          const label = shortDate(row.date);
          const prevLabel = prev ? shortDate(prev.date) : undefined;
          const showLabel = label && label !== prevLabel;
          return (
            <div
              key={row.id}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ left: `${((i + 0.5) / rows.length) * 100}%` }}
            >
              <span className="num-mono h-3.5 text-[9px] tracking-wide text-faint">{showLabel ? label : ""}</span>
              <span
                className={`h-2 w-2 rounded-full ${row.kind === "credential" ? "bg-signal" : "bg-research"}`}
              />
              <span className="num-mono text-[9px] text-faint">{row.tag}</span>
            </div>
          );
        })}
        <div className="absolute top-0 h-24" style={{ left: `${splitPct}%` }}>
          <span className="dash-rule-v absolute left-0 top-[18px] h-9" />
          <span className="label-mono absolute left-1 top-[56px] whitespace-nowrap text-[9px] text-research">
            SELF-DIRECTED →
          </span>
        </div>
      </div>

      {/* ---- the timeline itself ---- */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="dash-rule-v absolute bottom-3 left-3 top-3 -translate-x-1/2 md:left-4"
        />
        <ol className="mt-6 space-y-6 lg:mt-10">
        {rows.map((row, i) => {
          const open = openIds.has(row.id);
          const c = row.credential;
          const t = row.track;
          const build = t?.evidenceProject ? getArchiveProject(t.evidenceProject) : undefined;
          const research = t?.evidenceResearch
            ? researchEntries.find((r) => r.id === t.evidenceResearch)
            : undefined;
          const relBuild = c?.relatedProject ? getArchiveProject(c.relatedProject) : undefined;
          const relResearch = c?.relatedResearch
            ? researchEntries.find((r) => r.id === c.relatedResearch)
            : undefined;
          const dateLabel = formatDate(row.date);

          return (
            <li key={row.id} className="relative pl-10 md:pl-14">
              {/* spine node + connector */}
              <span
                aria-hidden="true"
                className={`absolute left-[6px] top-[22px] h-3 w-3 rounded-full border bg-background md:left-[10px] ${
                  row.kind === "credential" ? "border-signal" : "border-research"
                }`}
              />
              <span
                aria-hidden="true"
                className="dash-rule-h absolute left-[18px] top-[27px] w-[22px] md:left-[22px] md:w-8"
              />

              <div
                className={`card-depth border bg-background ${
                  open ? "border-line-strong" : "border-line"
                }`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`timeline-control-${row.id}`}
                    aria-expanded={open}
                    aria-controls={`timeline-panel-${row.id}`}
                    onClick={() => toggle(row.id)}
                    className="group flex w-full items-start gap-4 p-5 text-left transition-colors duration-200 hover:bg-surface md:p-7"
                  >
                    <span className="num-mono mt-1 text-xs text-faint">{row.tag}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-3">
                        <span
                          className={`label-mono border px-2 py-1 text-[10px] ${
                            row.kind === "track"
                              ? "border-research text-research"
                              : row.state === "VERIFIED"
                                ? "border-research text-research"
                                : "border-line-strong text-foreground"
                          }`}
                        >
                          {row.state}
                        </span>
                        {row.kind === "track" && (
                          <span className="label-mono text-[10px] text-faint">SELF-DIRECTED</span>
                        )}
                        {dateLabel && (
                          <span className="num-mono text-[10px] tracking-wide text-faint">{dateLabel}</span>
                        )}
                      </span>
                      <span className="display mt-3 block text-lg md:text-2xl">{row.title}</span>
                      {c && (
                        <span className="label-mono mt-3 block text-[10px] leading-relaxed text-muted">
                          {c.provider}
                          {c.credentialId && (
                            <span className="num-mono ml-3 text-faint normal-case">{c.credentialId}</span>
                          )}
                        </span>
                      )}
                    </span>
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className={`mt-1 h-3 w-3 shrink-0 self-start text-faint transition-transform duration-300 group-hover:text-signal ${
                        open ? "rotate-90 text-signal" : ""
                      }`}
                    >
                      <path d="M4 2 L8 6 L4 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={`timeline-panel-${row.id}`}
                  role="region"
                  aria-labelledby={`timeline-control-${row.id}`}
                  className={`grid transition-[grid-template-rows,visibility] duration-400 ease-out ${
                    open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-line p-5 md:p-7">
                      {c && (
                        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                          <div>
                            <p className="label-mono text-faint">TOPICS</p>
                            <ul className="mt-4 space-y-3">
                              {c.topics.map((topic) => (
                                <li key={topic} className="flex gap-3 text-sm leading-relaxed text-muted">
                                  <span
                                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal"
                                    aria-hidden="true"
                                  />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-6">
                              <p className="label-mono text-faint">SKILLS</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {c.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="label-mono text-faint">LEARNED</p>
                            <p className="mt-3 text-sm leading-relaxed text-muted">{c.learned}</p>
                            <p className="label-mono mt-6 text-faint">ASSESSMENT</p>
                            <p className="mt-3 text-sm leading-relaxed text-muted">{c.assessment}</p>
                          </div>

                          {(c.verificationUrl || c.certificateUrl || (c.notes?.length ?? 0) > 0 || relBuild || relResearch) && (
                            <div className="space-y-3 border-t border-line pt-5 md:col-span-2">
                              {c.verificationUrl && (
                                <a
                                  href={c.verificationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/link inline-block"
                                >
                                  <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                                    VERIFY AT THE ISSUER →
                                  </span>
                                </a>
                              )}
                              {c.certificateUrl && (
                                <a
                                  href={c.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/link inline-block"
                                >
                                  <span className="label-mono text-foreground transition-transform duration-300 group-hover/link:translate-x-1">
                                    VIEW CERTIFICATE →
                                  </span>
                                </a>
                              )}
                              {c.notes?.map((note) => (
                                <p key={note} className="text-xs leading-relaxed text-faint">
                                  {note}
                                </p>
                              ))}
                              {(relBuild || relResearch) && (
                                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                                  {relBuild && (
                                    <Link href={`/builds/${relBuild.id}`} className="group/link">
                                      <span className="label-mono block text-[10px] text-faint">APPLIED IN</span>
                                      <span className="label-mono text-foreground transition-transform duration-300 group-hover/link:translate-x-1">
                                        {relBuild.shortTitle} →
                                      </span>
                                    </Link>
                                  )}
                                  {relResearch && (
                                    <Link href={`/research/${relResearch.id}`} className="group/link">
                                      <span className="label-mono block text-[10px] text-faint">WRITTEN UP AS</span>
                                      <span className="label-mono text-foreground transition-transform duration-300 group-hover/link:translate-x-1">
                                        {relResearch.title} →
                                      </span>
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {t && (
                        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                          <div>
                            <p className="label-mono text-faint">FOCUS</p>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{t.focus}</p>
                          </div>
                          <div>
                            <p className="label-mono text-faint">METHOD</p>
                            <ul className="mt-4 space-y-3">
                              {t.method.map((m) => (
                                <li key={m} className="flex gap-3 text-sm leading-relaxed text-muted">
                                  <span
                                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-research"
                                    aria-hidden="true"
                                  />
                                  {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {(build || research) && (
                            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 md:col-span-2">
                              {build && (
                                <Link href={`/builds/${build.id}`} className="group/link">
                                  <span className="label-mono block text-[10px] text-faint">APPLIED IN</span>
                                  <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                                    {build.shortTitle} →
                                  </span>
                                </Link>
                              )}
                              {research && (
                                <Link href={`/research/${research.id}`} className="group/link max-w-sm">
                                  <span className="label-mono block text-[10px] text-faint">WRITTEN UP AS</span>
                                  <span className="mt-1 block text-sm leading-snug text-muted transition-colors group-hover/link:text-foreground">
                                    {research.title}
                                  </span>
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* boundary between the issued record and self-directed study */}
              {i === credentials.length - 1 && (
                <div className="relative mt-6 pl-10 md:pl-14" aria-hidden="true">
                  <span className="dash-rule-h absolute left-0 right-0 top-2" />
                  <span className="label-mono relative -ml-10 inline-block bg-background pr-3 text-[10px] text-research md:-ml-14">
                    SELF-DIRECTED STUDY — ONGOING
                  </span>
                </div>
              )}
            </li>
          );
        })}
        </ol>
      </div>
    </div>
  );
}
