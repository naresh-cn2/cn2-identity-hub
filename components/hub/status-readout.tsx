"use client";

import { useEffect, useRef } from "react";
import { hubStatus } from "@/data/hub";
import { site } from "@/data/site";

/**
 * StatusReadout — the headquarters live figures panel.
 *
 * Every row is computed from the archive data files, rendered at its final
 * value (so no-JS and screen readers get the truth immediately), then — on a
 * fine-enough viewport and only when motion is allowed — the numeric runs
 * count up once as the panel enters view. Reduced motion keeps the final
 * values and skips the loop entirely.
 */

interface Run {
  type: "text" | "num";
  value: string;
  pad?: number;
}

/** Split a display string into literal text and numeric runs (keeping padding). */
function splitRuns(value: string): Run[] {
  const runs: Run[] = [];
  const re = /\d+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (m.index > last) runs.push({ type: "text", value: value.slice(last, m.index) });
    runs.push({ type: "num", value: m[0], pad: m[0].length });
    last = m.index + m[0].length;
  }
  if (last < value.length) runs.push({ type: "text", value: value.slice(last) });
  return runs;
}

const ROWS = [
  { k: "STATUS", v: site.status, accent: true },
  { k: "FLAGSHIP SYSTEMS", v: `${hubStatus.flagship.length} — FULL EVIDENCE CASE STUDY` },
  { k: "CASE STUDIES", v: String(hubStatus.caseStudies).padStart(2, "0") },
  { k: "RESEARCH ENTRIES", v: `${hubStatus.research} · ${hubStatus.ongoingResearch} ONGOING` },
  { k: "ARTICLES", v: String(hubStatus.articles).padStart(2, "0") },
  { k: "LAB MODULES", v: `${hubStatus.lab} OPERATIONAL` },
  { k: "SERVICES", v: String(hubStatus.services).padStart(2, "0") },
  { k: "SELF-DIRECTED TRACKS", v: `${hubStatus.studyTracks} ACTIVE` },
];

const DURATION = 850;
const ROW_STAGGER = 90;

export default function StatusReadout() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(
      panel.querySelectorAll<HTMLElement>("[data-count-to]")
    );
    if (spans.length === 0 || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let started = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      let done = true;
      for (const span of spans) {
        const target = Number(span.dataset.countTo ?? "0");
        const pad = Number(span.dataset.countPad ?? "0");
        const delay = Number(span.dataset.countDelay ?? "0");
        const t = Math.min(1, Math.max(0, (now - started - delay) / DURATION));
        if (t < 1) done = false;
        const value = Math.round(target * ease(t));
        span.textContent = String(value).padStart(pad, "0");
      }
      if (!done) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.disconnect();
            started = performance.now();
            frame = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(panel);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="corner-ticks border border-line bg-surface/60 p-5 backdrop-blur-sm md:p-6"
    >
      <div className="flex items-center gap-2.5 border-b border-line pb-3">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
        <p className="label-mono text-foreground">SYSTEM READOUT</p>
      </div>
      <dl className="mt-4 space-y-2.5">
        {ROWS.map((r, rowIndex) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4">
            <dt className="label-mono text-[9px] text-muted">{r.k}</dt>
            <dd
              className={`num-mono text-right text-[10px] ${r.accent ? "text-signal" : "text-muted"}`}
            >
              {splitRuns(r.v).map((run, i) =>
                run.type === "text" ? (
                  <span key={i}>{run.value}</span>
                ) : (
                  <span
                    key={i}
                    data-count-to={run.value}
                    data-count-pad={run.pad}
                    data-count-delay={rowIndex * ROW_STAGGER}
                  >
                    {run.value}
                  </span>
                )
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
