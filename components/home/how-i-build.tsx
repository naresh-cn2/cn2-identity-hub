"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * ACT — HOW I BUILD.
 *
 * Nine stages, one instrument. Selecting a stage swaps the diagram and the
 * evidence link. No auto-play and no timed animation: the reader drives it,
 * and every stage links to the system or entry where that stage actually ran.
 */

interface Stage {
  id: string;
  label: string;
  claim: string;
  detail: string;
  output: string;
  href: string;
  hrefLabel: string;
}

const STAGES: Stage[] = [
  {
    id: "question",
    label: "QUESTION",
    claim: "Start from something falsifiable.",
    detail:
      "A question that cannot be answered wrongly is not research. Every entry in the archive begins as a market question with a defined prior and a measurable outcome.",
    output: "FALSIFIABLE QUESTION",
    href: "/research/lookahead-bias",
    hrefLabel: "EXAMPLE — LOOKAHEAD BIAS",
  },
  {
    id: "research",
    label: "RESEARCH",
    claim: "Read before building.",
    detail:
      "Establish what is already known and where the boundary of it sits. Most of the value here is in finding out that the honest answer is narrower than the confident one.",
    output: "PRIOR + BOUNDARY",
    href: "/research",
    hrefLabel: "THE ARCHIVE",
  },
  {
    id: "specification",
    label: "SPECIFICATION",
    claim: "Write down what will count as evidence.",
    detail:
      "Before any code, the question gets a pass condition: what output, at what threshold, produced how, would settle it. Deciding this after seeing results is how fitting happens.",
    output: "PASS CONDITION",
    href: "/capabilities",
    hrefLabel: "WHAT I CAN CONTRIBUTE",
  },
  {
    id: "architecture",
    label: "ARCHITECTURE",
    claim: "Put correctness where it cannot be forgotten.",
    detail:
      "Information-flow guarantees, risk gates and validation belong in the structure. If a rule depends on someone remembering it at the right moment, it is not a control.",
    output: "STRUCTURAL GUARANTEE",
    href: "/builds/automated-trading-os",
    hrefLabel: "EXAMPLE — TRADING OS",
  },
  {
    id: "build",
    label: "BUILD",
    claim: "Implement the smallest thing that can answer it.",
    detail:
      "The build exists to answer the question, not to be impressive. Scope is kept to what the pass condition actually requires.",
    output: "WORKING SYSTEM",
    href: "/builds/apex-quant-engine",
    hrefLabel: "EXAMPLE — APEX ENGINE",
  },
  {
    id: "test",
    label: "TEST",
    claim: "Try to break it, not to confirm it.",
    detail:
      "Confirmatory tests prove nothing about whether the wrong behaviour is reachable. The useful tests are adversarial: actively attempt the failure you are claiming is impossible.",
    output: "TEST RESULT",
    href: "/builds/qrsip",
    hrefLabel: "EXAMPLE — QRSIP · 352 TESTS",
  },
  {
    id: "experiment",
    label: "EXPERIMENT",
    claim: "Run it deterministically, and run it again.",
    detail:
      "Fixed seeds, explicit tie-breaking, reproducible artifacts. A result that cannot be regenerated is not a result yet — it is a draw.",
    output: "REPRODUCIBLE ARTIFACT",
    href: "/lab/experiments",
    hrefLabel: "RUN THE INSTRUMENT",
  },
  {
    id: "validate",
    label: "VALIDATE",
    claim: "Check the claim against the evidence, then write the limitation.",
    detail:
      "Validation is where the result is separated from what the result does not show. The limitation is not a disclaimer — it is the part that makes the rest believable.",
    output: "RESULT + LIMITATION",
    href: "/lab",
    hrefLabel: "INSTRUMENTS",
  },
  {
    id: "proof",
    label: "PROOF",
    claim: "Publish the artifact and its provenance.",
    detail:
      "Backtest, simulation, self-benchmark, test suite — the label travels with the number. Anything illustrative is marked illustrative, and unfinished work stays visible.",
    output: "INSPECTABLE EVIDENCE",
    href: "/builds",
    hrefLabel: "THE BUILD ARCHIVE",
  },
];

/** Stage diagrams — schematic, deterministic, no data. */
function StageVisual({ id }: { id: string }) {
  const stroke = "var(--research)";
  const signal = "var(--signal)";
  const line = "var(--line-strong)";

  const shapes: Record<string, React.ReactNode> = {
    question: (
      <g>
        <circle cx="150" cy="130" r="46" fill="none" stroke={stroke} strokeWidth="1.5" />
        <text x="150" y="146" textAnchor="middle" fontSize="40" fill={stroke} style={{ fontFamily: "var(--font-mono)" }}>
          ?
        </text>
        {[
          [232, 62],
          [300, 130],
          [232, 198],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1="196" y1="130" x2={x} y2={y} stroke={line} strokeWidth="1" strokeDasharray="4 4" />
            <circle cx={x} cy={y} r="7" fill="none" stroke={signal} strokeWidth="1.5" />
          </g>
        ))}
      </g>
    ),
    research: (
      <g>
        {Array.from({ length: 42 }, (_, i) => {
          const x = 60 + ((i * 47) % 340);
          const y = 40 + ((i * 71) % 180);
          return <circle key={i} cx={x} cy={y} r="2.6" fill={stroke} opacity={i % 7 === 0 ? 0.85 : 0.35} />;
        })}
        <rect x="60" y="40" width="340" height="180" fill="none" stroke={line} strokeWidth="1" />
        <line x1="60" y1="130" x2="400" y2="130" stroke={line} strokeWidth="1" strokeDasharray="3 5" />
      </g>
    ),
    specification: (
      <g>
        <rect x="70" y="40" width="340" height="180" fill="none" stroke={line} strokeWidth="1" />
        {[40, 74, 108, 142, 176, 210].map((y, i) => (
          <g key={y}>
            <line x1="70" y1={y} x2="410" y2={y} stroke={line} strokeWidth="1" opacity="0.5" />
            <rect x="86" y={y - 18} width={i === 2 ? 190 : 120} height="6" fill={i === 2 ? signal : stroke} opacity="0.55" />
          </g>
        ))}
        <rect x="330" y="160" width="60" height="42" fill="none" stroke={signal} strokeWidth="1.5" />
        <path d="M340 181 l8 9 14 -18" fill="none" stroke={signal} strokeWidth="2" />
      </g>
    ),
    architecture: (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={70 + i * 12} y={38 + i * 34} width={300 - i * 24} height="24" fill="none" stroke={i === 4 ? signal : stroke} strokeWidth="1.5" />
            {i < 4 && <line x1="240" y1={62 + i * 34} x2="240" y2={72 + i * 34} stroke={line} strokeWidth="1" />}
          </g>
        ))}
      </g>
    ),
    build: (
      <g>
        <rect x="70" y="40" width="340" height="180" fill="none" stroke={line} strokeWidth="1" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect
            key={i}
            x={90 + (i % 4) * 78}
            y={62 + Math.floor(i / 4) * 48}
            width={i % 5 === 0 ? 66 : 54}
            height="26"
            fill={i % 5 === 0 ? signal : stroke}
            opacity={i % 5 === 0 ? 0.8 : 0.3}
          />
        ))}
      </g>
    ),
    test: (
      <g>
        {Array.from({ length: 18 }, (_, i) => {
          const ok = i % 7 !== 3;
          const x = 84 + (i % 6) * 54;
          const y = 56 + Math.floor(i / 6) * 54;
          return (
            <g key={i}>
              <rect x={x} y={y} width="40" height="34" fill="none" stroke={ok ? stroke : signal} strokeWidth="1.2" />
              {ok ? (
                <path d={`M${x + 12} ${y + 17} l6 7 11 -14`} fill="none" stroke={stroke} strokeWidth="1.6" />
              ) : (
                <g stroke={signal} strokeWidth="1.6">
                  <line x1={x + 13} y1={y + 11} x2={x + 27} y2={y + 24} />
                  <line x1={x + 27} y1={y + 11} x2={x + 13} y2={y + 24} />
                </g>
              )}
            </g>
          );
        })}
      </g>
    ),
    experiment: (
      <g>
        {[0, 1, 2, 3, 4, 5].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={92 + c * 48}
              y={48 + r * 28}
              width="40"
              height="20"
              fill={(r * 6 + c) % 4 === 0 ? signal : stroke}
              opacity={(r * 6 + c) % 4 === 0 ? 0.75 : 0.16 + ((r + c) % 4) * 0.1}
            />
          ))
        )}
      </g>
    ),
    validate: (
      <g>
        <rect x="96" y="52" width="288" height="156" fill="none" stroke={line} strokeWidth="1" />
        <line x1="96" y1="100" x2="384" y2="100" stroke={line} strokeWidth="1" />
        <line x1="240" y1="52" x2="240" y2="208" stroke={line} strokeWidth="1" />
        <g stroke={stroke} strokeWidth="2">
          <line x1="126" y1="76" x2="196" y2="76" />
          <line x1="270" y1="76" x2="340" y2="76" />
        </g>
        <g stroke={signal} strokeWidth="2">
          <circle cx="150" cy="152" r="18" fill="none" />
          <path d="M142 152 l7 8 12 -16" fill="none" />
        </g>
        <g stroke={line} strokeWidth="2">
          <line x1="290" y1="144" x2="330" y2="144" />
          <line x1="290" y1="160" x2="330" y2="160" />
        </g>
      </g>
    ),
    proof: (
      <g>
        <rect x="120" y="44" width="240" height="164" fill="none" stroke={stroke} strokeWidth="1.5" />
        <rect x="132" y="56" width="216" height="140" fill="none" stroke={line} strokeWidth="1" />
        {[84, 104, 124, 144, 164].map((y) => (
          <line key={y} x1="146" y1={y} x2="334" y2={y} stroke={line} strokeWidth="1" />
        ))}
        <circle cx="240" cy="182" r="12" fill="none" stroke={signal} strokeWidth="1.5" />
        <text x="240" y="186" textAnchor="middle" fontSize="11" fill={signal} style={{ fontFamily: "var(--font-mono)" }}>
          ✓
        </text>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label={`Schematic of the ${id} stage`}>
      <rect x="0" y="0" width="480" height="260" fill="none" />
      {shapes[id] ?? shapes.question}
    </svg>
  );
}

export default function HowIBuild() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section aria-label="How I build" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            PROCESS <span className="text-signal">/</span> METHOD
          </p>
          <p className="label-mono text-faint">09 STAGES — SELECT ANY</p>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">HOW I BUILD</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          The same nine stages every time, because the failure mode in quantitative work is never a
          missing stage — it is a stage that got quietly skipped.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* stage list */}
          <div>
            <ol className="border-t border-line" role="group" aria-label="Method stages">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`flex w-full items-baseline gap-4 border-b border-line px-2 py-3.5 text-left transition-colors duration-200 ${
                        isActive ? "bg-surface" : "hover:bg-surface"
                      }`}
                    >
                      <span className={`num-mono text-xs ${isActive ? "text-signal" : "text-faint"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`label-mono flex-1 ${
                          isActive ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-signal" : "bg-line-strong"}`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* active stage panel */}
          <div className="min-w-0">
            <div className="border border-line bg-surface p-5 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="label-mono text-research">
                  STAGE {String(active + 1).padStart(2, "0")} / {STAGES.length} — {stage.label}
                </p>
                <p className="label-mono text-faint">OUTPUT — {stage.output}</p>
              </div>

              <div className="mt-6 border border-line bg-background/50">
                <StageVisual id={stage.id} />
              </div>

              <h3 className="display mt-8 text-xl md:text-3xl">{stage.claim}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{stage.detail}</p>

              <Link
                href={stage.href}
                className="label-mono mt-8 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-research hover:text-research"
              >
                {stage.hrefLabel} →
              </Link>
            </div>

            <p className="label-mono mt-4 text-[10px] leading-relaxed text-faint">
              DIAGRAMS ARE SCHEMATIC — THEY DEPICT THE SHAPE OF EACH STAGE AND CARRY NO DATA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
