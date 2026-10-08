import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import Reveal from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Naresh — Quantitative Intelligence. Markets, mathematics, data, computation and research, engineered into deterministic systems.",
  alternates: { canonical: "/about" },
};

const COMPOUND = ["MARKETS", "MATHEMATICS", "DATA", "COMPUTATION", "RESEARCH"];

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-44">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 08 — ABOUT
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">
              NARESH
              <br />
              <span className="text-signal">QUANTITATIVE</span>
              <br />
              INTELLIGENCE
            </h1>
          </Reveal>
        </div>
      </header>

      <section aria-label="The compound" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <ol className="max-w-3xl space-y-6">
              {COMPOUND.map((word, i) => (
                <Reveal key={word} delay={i * 120}>
                  <li className="flex items-baseline gap-6">
                    <span className="num-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-3xl md:text-5xl">{word}</span>
                    {i < COMPOUND.length - 1 && (
                      <span className="num-mono text-2xl text-signal" aria-hidden="true">
                        +
                      </span>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section aria-label="The practice" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                I build quantitative systems as research instruments. A backtest is a claim;
                infrastructure is what makes the claim checkable. The work on this site — trading
                engines, market-data platforms, governance tooling — exists to make market
                questions answerable with evidence rather than narrative.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                The operating rule is claim integrity: simulated results are labeled simulated,
                limitations are written down, and every metric carries its context. What you see
                here is what exists. Nothing more is asserted than can be shown.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-16 flex flex-wrap items-center gap-6">
              <Link
                href="/quant"
                className="corner-ticks label-mono border border-line-strong bg-surface px-8 py-5 transition-colors hover:border-signal hover:text-signal"
              >
                EXPLORE QUANT →
              </Link>
              <Link
                href="/work-with-me"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:text-foreground"
              >
                WORK WITH ME →
              </Link>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-line text-muted"
              >
                GITHUB
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-line text-muted"
              >
                LINKEDIN
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
