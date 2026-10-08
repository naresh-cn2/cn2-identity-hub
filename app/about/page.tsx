import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import Reveal from "@/components/ui/reveal";
import { DataField } from "@/components/viz/quant-primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bukya Naresh — Quant.Dev. Quantitative intelligence through research, markets, data and engineering.",
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
              {site.name}
              <br />
              <span className="text-signal">{site.identity}</span>
              <br />
              <span className="display-condensed text-muted">{site.system} / {site.descriptor}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 h-64 w-full max-w-4xl">
              <DataField seed={55} gridSize={20} amplitude={0.4} showSignalTrace />
            </div>
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

          {/* Portrait */}
          <Reveal delay={180}>
            <div className="mt-16 flex items-center justify-center md:justify-start">
              <div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full border border-line-strong bg-background/50 backdrop-blur-sm overflow-hidden">
                <Image
                  src="/portrait.png"
                  alt="Bukya Naresh — Quant.Dev"
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 256px"
                  className="object-cover grayscale contrast-125 brightness-90"
                />
              </div>
              <div className="ml-8 md:ml-12">
                <p className="label-mono text-signal tracking-widest">{site.name}</p>
                <p className="label-mono text-faint text-sm">{site.identity}</p>
                <p className="label-mono text-signal text-sm">{site.system}</p>
              </div>
            </div>
          </Reveal>

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
