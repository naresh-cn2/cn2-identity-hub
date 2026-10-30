import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import { labModules } from "@/data/lab";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import RiskSurface from "@/components/lab/risk-surface";
import MarketTimeline from "@/components/lab/market-timeline";

export const metadata: Metadata = {
  title: "Quant Lab",
  description:
    "Interactive quantitative instruments — risk simulator, point-in-time replay lab, strategy visualizer, risk/return surface and experiment explorer.",
  alternates: { canonical: "/lab" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Quant Lab — Bukya Naresh / CN2.dev",
    description:
      "Interactive quantitative instruments: risk, replay, strategy geometry, risk/return surface and experiment governance.",
  },
};

/** Schematic panel art — one instrument diagram per module code. */
const INSTRUMENT_ART: Record<string, React.ReactNode> = {
  "RISK-01": (
    <g>
      <line x1="20" y1="60" x2="160" y2="60" stroke="var(--line-strong)" strokeWidth="1" />
      <line x1="52" y1="42" x2="52" y2="78" stroke="var(--signal)" strokeWidth="1.5" />
      <line x1="96" y1="42" x2="96" y2="78" stroke="var(--chart-axis)" strokeWidth="1.5" />
      <line x1="140" y1="42" x2="140" y2="78" stroke="var(--research)" strokeWidth="1.5" />
      <rect x="52" y="56" width="44" height="8" fill="var(--signal)" opacity="0.25" />
      <rect x="96" y="56" width="44" height="8" fill="var(--research)" opacity="0.25" />
    </g>
  ),
  "REPLAY-01": (
    <g>
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i} opacity={i > 7 ? 0.18 : 1}>
          <line x1={22 + i * 13} x2={22 + i * 13} y1={36 + (i % 3) * 6} y2={84 - (i % 4) * 5} stroke="var(--research)" strokeWidth="1" />
          <rect x={18 + i * 13} y={46 + (i % 3) * 4} width={7} height={20 - (i % 4) * 3} fill="var(--research)" opacity="0.6" />
        </g>
      ))}
      <line x1="126" y1="30" x2="126" y2="90" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="4 4" className="dash-march" />
    </g>
  ),
  "STRAT-01": (
    <g>
      <path d="M30 84 L90 84 L150 40" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <path d="M30 84 L90 40 L150 84 Z" fill="none" stroke="var(--research)" strokeWidth="1.5" />
      <circle cx="90" cy="40" r="4" fill="var(--signal)" />
      <line x1="30" y1="84" x2="30" y2="40" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  ),
  "SURF-01": (
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
  "EXP-01": (
    <g>
      {[
        [34, 80],
        [70, 46],
        [110, 46],
        [146, 80],
      ].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="7" fill={i === 2 ? "var(--signal)" : "var(--research)"} opacity="0.75" />
      ))}
      <path d="M41 76 L63 50 M77 46 L103 46 M117 50 L139 76" stroke="var(--line-strong)" strokeWidth="1" fill="none" />
    </g>
  ),
};

export default function LabPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="signal" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> LAB
              </p>
              <p className="label-mono text-faint">
                {labModules.length} INSTRUMENTS ·{" "}
                {labModules.filter((m) => m.status === "OPERATIONAL").length} OPERATIONAL
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(3rem,10vw,8rem)]">QUANT LAB</KineticText>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Interactive tools and experiments for investigating quantitative finance, market data,
              risk, strategy design and technical systems. Explore the inputs, assumptions,
              calculations and outputs behind each instrument.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12">
              <MarketTimeline />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- module index ---- */}
      <section aria-label="Lab modules" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">INSTRUMENTS</h2>
              <p className="label-mono text-faint">INPUTS DECLARED · OUTPUTS DERIVED</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labModules
              .filter((m) => m.href !== "/lab#surface")
              .map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <Link
                    href={m.href}
                    className="card-depth group flex h-full flex-col border border-line bg-background p-6 md:p-8"
                  >
                    <span className="flex items-baseline justify-between">
                      <span className="label-mono text-faint">LAB / {m.code}</span>
                      <span className="label-mono flex items-center gap-2 text-foreground">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                        {m.status}
                      </span>
                    </span>
                    <span className="display mt-5 block text-2xl md:text-3xl">{m.name}</span>
                    <span className="mt-4 block flex-1 text-base leading-relaxed text-muted">
                      {m.description}
                    </span>
                    <span className="viz-frame mt-6 block p-3">
                      <svg viewBox="0 0 180 120" className="relative z-10 h-auto w-full" aria-hidden="true">
                        {INSTRUMENT_ART[m.code]}
                      </svg>
                    </span>
                    <span className="label-mono mt-5 block text-faint">
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
                Backtest exploration lives in the Apex case study instrument: the equity surface,
                drawdown subplot and trade population are explored in place, against the real
                backtest record rather than a mock dataset.
              </p>
              <Link
                href="/work/apex-quant-engine"
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
              <p className="label-mono text-faint">LAB / SURF-01</p>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              The risk / return surface, explorable in place. Drag to rotate; hover for a
              coordinate readout.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="viz-frame mt-10 p-3 md:p-5">
              <div className="relative z-10">
                <RiskSurface />
              </div>
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
                  href="/work"
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
