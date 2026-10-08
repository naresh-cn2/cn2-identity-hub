import type { Metadata } from "next";
import Link from "next/link";
import { labModules } from "@/data/lab";
import Reveal from "@/components/ui/reveal";
import RiskSurface from "@/components/lab/risk-surface";

export const metadata: Metadata = {
  title: "Quant Lab",
  description:
    "Interactive quantitative instruments — risk simulator, point-in-time replay lab, strategy visualizer, risk/return surface and experiment explorer.",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "Quant Lab — Bukya Naresh / CN2.dev",
    description:
      "Interactive quantitative instruments: risk, replay, strategy geometry, risk/return surface and experiment governance.",
  },
};

/** Instrument matrix — the visual language of the lab, one panel per instrument. */
function InstrumentMatrix() {
  const panels = [
    {
      code: "RISK-01",
      art: (
        <g>
          <line x1="20" y1="60" x2="160" y2="60" stroke="var(--line-strong)" strokeWidth="1" />
          <line x1="52" y1="42" x2="52" y2="78" stroke="var(--signal)" strokeWidth="1.5" />
          <line x1="96" y1="42" x2="96" y2="78" stroke="var(--chart-axis)" strokeWidth="1.5" />
          <line x1="140" y1="42" x2="140" y2="78" stroke="var(--research)" strokeWidth="1.5" />
          <rect x="52" y="56" width="44" height="8" fill="var(--signal)" opacity="0.25" />
          <rect x="96" y="56" width="44" height="8" fill="var(--research)" opacity="0.25" />
        </g>
      ),
    },
    {
      code: "REPLAY-01",
      art: (
        <g>
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i} opacity={i > 7 ? 0.18 : 1}>
              <line x1={22 + i * 13} x2={22 + i * 13} y1={36 + (i % 3) * 6} y2={84 - (i % 4) * 5} stroke="var(--research)" strokeWidth="1" />
              <rect x={18 + i * 13} y={46 + (i % 3) * 4} width="7" height={20 - (i % 4) * 3} fill="var(--research)" opacity="0.6" />
            </g>
          ))}
          <line x1="126" y1="30" x2="126" y2="90" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
      ),
    },
    {
      code: "STRAT-01",
      art: (
        <g>
          <path d="M30 84 L90 84 L150 40" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <path d="M30 84 L90 40 L150 84 Z" fill="none" stroke="var(--research)" strokeWidth="1.5" />
          <circle cx="90" cy="40" r="4" fill="var(--signal)" />
          <line x1="30" y1="84" x2="30" y2="40" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ),
    },
    {
      code: "SURF-01",
      art: (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`r${i}`}
              x1={26 + i * 6}
              y1={38 + i * 8}
              x2={148 - i * 6}
              y2={38 + i * 8}
              stroke="var(--research)"
              strokeWidth="1"
              opacity={0.25 + i * 0.12}
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`c${i}`}
              x1={32 + i * 21}
              y1={38 + i * 3}
              x2={32 + i * 21}
              y2={82 - i * 3}
              stroke="var(--chart-axis)"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
        </g>
      ),
    },
    {
      code: "EXP-01",
      art: (
        <g>
          {[
            [34, 80],
            [70, 46],
            [110, 46],
            [146, 80],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" fill={i === 2 ? "var(--signal)" : "var(--research)"} opacity="0.75" />
          ))}
          <path d="M41 76 L63 50 M77 46 L103 46 M117 50 L139 76" stroke="var(--line-strong)" strokeWidth="1" fill="none" />
        </g>
      ),
    },
  ];

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
      {panels.map((p) => (
        <div key={p.code} className="bg-surface p-4">
          <p className="label-mono text-[9px] text-faint">{p.code}</p>
          <svg viewBox="0 0 180 120" className="mt-3 h-auto w-full" aria-hidden="true">
            {p.art}
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function LabPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 03 — LAB
              </p>
              <p className="label-mono text-faint">ALL INSTRUMENTS OPERATIONAL</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">QUANT LAB</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Instruments, not demos. Every module computes what it claims, labels its inputs and
              outputs, and derives from the same rules as the systems it illustrates.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12">
              <InstrumentMatrix />
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="label-mono mt-4 text-[10px] text-faint">
              INSTRUMENT PANELS ABOVE ARE SCHEMATIC REPRESENTATIONS OF EACH MODULE — NOT READINGS.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- module index ---- */}
      <section aria-label="Lab modules" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">INSTRUMENTS</h2>
              <p className="label-mono text-faint">INPUTS DECLARED · OUTPUTS DERIVED · NO DEMO VALUES</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {labModules
              .filter((m) => m.href !== "/lab#surface")
              .map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <Link
                    href={m.href}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="label-mono text-faint">LAB / {m.code}</span>
                      <span className="label-mono flex items-center gap-2 text-foreground">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                        {m.status}
                      </span>
                    </div>
                    <span className="display mt-6 block text-2xl md:text-4xl">{m.name}</span>
                    <span className="mt-4 block flex-1 text-base leading-relaxed text-muted">
                      {m.description}
                    </span>
                    <span className="label-mono mt-6 block text-faint">
                      IN — {m.inputs.join(" · ")}
                    </span>
                    <span className="label-mono mt-1 block text-research">
                      OUT — {m.outputs.join(" · ")}
                    </span>
                    <span className="label-mono mt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN INSTRUMENT →
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 border border-line bg-surface p-6">
              <p className="label-mono text-faint">BACKTEST EXPLORER</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                Backtest exploration is not a separate module — it is what the Apex case study
                instrument does. The equity surface, drawdown subplot and trade population are
                explored in place, against the real backtest record rather than a mock dataset.
              </p>
              <Link
                href="/builds/apex-quant-engine"
                className="label-mono mt-5 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                OPEN BACKTEST EXPLORER →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- central surface ---- */}
      <section id="surface" aria-label="Risk and return surface" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">RISK / RETURN SURFACE</h2>
              <p className="label-mono text-faint">LAB / SURF-01 — PROJECTED 3D, 2D FALLBACK BUILT-IN</p>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              A projected 3D wireframe rendered in pure SVG — no WebGL required, so the instrument
              degrades to itself. Drag to rotate; hover for a coordinate readout.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <RiskSurface />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- continue ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">THE SYSTEMS THESE INSTRUMENTS COME FROM</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <Link
                  href="/research"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                >
                  RESEARCH →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
