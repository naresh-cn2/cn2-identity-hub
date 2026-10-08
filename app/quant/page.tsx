import type { Metadata } from "next";
import Link from "next/link";
import { getProject } from "@/data/projects";
import Reveal from "@/components/ui/reveal";
import EquityCurve from "@/components/viz/equity-curve";

export const metadata: Metadata = {
  title: "Quant",
  description:
    "Selected quantitative systems: multi-strategy trading engines and execution architectures with deterministic backtests, explicit cost models and structural risk controls.",
  alternates: { canonical: "/quant" },
};

const quantProjectIds = ["apex-quant-engine", "automated-trading-os"] as const;

export default function QuantPage() {
  const projects = quantProjectIds.map((id) => getProject(id)!);

  return (
    <>
      {/* ---- hero ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 01 — QUANT
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">
              SELECTED
              <br />
              QUANTITATIVE
              <br />
              SYSTEMS
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Trading engines and execution architectures where every number ships with its
              context — deterministic backtests, explicit costs, structural risk. Fully labeled as
              what they are: simulations.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 border border-line bg-surface p-4 md:p-6">
              <EquityCurve
                seed={42}
                endValuePct={570.18}
                summary="Seeded illustrative equity trace of the Apex master-fund backtest shape, ending at plus 570.18 percent net simulated ROI."
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- gateways ---- */}
      <section aria-label="Flagship quantitative systems" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="space-y-px bg-line">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <Link
                  href={p.route}
                  className="group grid gap-6 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-12 md:p-10"
                >
                  <span className="num-mono text-5xl font-semibold text-line-strong transition-colors group-hover:text-signal md:text-7xl">
                    {p.index}
                  </span>
                  <span>
                    <span className="label-mono text-faint">{p.category}</span>
                    <span className="display mt-3 block text-3xl md:text-5xl">{p.title}</span>
                    <span className="mt-4 block max-w-2xl text-base leading-relaxed text-muted">
                      {p.thesis}
                    </span>
                  </span>
                  <span className="flex flex-col items-start gap-3 md:items-end">
                    <span className="label-mono border border-line px-3 py-1.5 text-foreground">
                      {p.status}
                    </span>
                    <span className="label-mono text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN CASE STUDY →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-faint">
              Also in the quantitative stack — the data and governance layers these systems depend
              on:{" "}
              <Link href="/research/market-data-replay" className="link-line text-muted underline-offset-4">
                QUANT MARKET DATA REPLAY
              </Link>{" "}
              and{" "}
              <Link href="/research/qrsip" className="link-line text-muted underline-offset-4">
                QRSIP
              </Link>
              , documented under RESEARCH.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
