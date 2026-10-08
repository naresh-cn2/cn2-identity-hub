import type { Metadata } from "next";
import Link from "next/link";
import AnonymousFigure from "@/components/viz/anonymous-figure";
import { site, utilityLinks } from "@/data/site";
import { studyTracks } from "@/data/certifications";
import { capabilities } from "@/data/capabilities";
import Reveal from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bukya Naresh — CN2.dev. Quantitative intelligence through research, markets, data and engineering. Current direction, active study and research philosophy.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Bukya Naresh / CN2.dev",
    description:
      "Quantitative intelligence through research, markets, data and engineering.",
  },
};

const COMPOUND = ["MARKETS", "MATHEMATICS", "DATA", "COMPUTATION", "RESEARCH"];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bukya Naresh",
  alternateName: "CN2.dev",
  description: site.description,
  url: site.url,
  email: site.email,
  knowsAbout: [
    "Quantitative research",
    "Systematic trading",
    "Market data infrastructure",
    "Backtesting and simulation",
    "Risk engineering",
    "Systems performance",
  ],
  sameAs: [site.links.github, site.links.linkedin],
};

export default function AboutPage() {
  const domains = [...new Set(capabilities.map((c) => c.domain))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ---- header: the person is the brand, so the name leads ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 07 — ABOUT
              </p>
              <p className="label-mono text-research">{site.descriptor}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              {site.name}
              <br />
              <span className="text-signal">{site.identity}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="label-mono mt-6 text-muted">
              {site.system} / {site.descriptor} — {site.subtitle}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- FIGURE MOMENT — anonymous brand symbol, editorial spread, not an avatar ---- */}
      <section aria-label="Identity figure" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <figure className="relative mx-auto w-full max-w-[30rem] lg:mx-0">
                <div className="corner-ticks relative aspect-[3/4] w-full overflow-hidden border border-line-strong bg-surface">
                  <AnonymousFigure
                    className="absolute inset-0 h-full w-full"
                    plate="001"
                    system={site.system}
                  />
                </div>
                <figcaption className="mt-4 grid gap-2 sm:grid-cols-2">
                  <p className="label-mono text-[10px] leading-relaxed text-faint">
                    {site.system} / {site.descriptor}
                  </p>
                  <p className="label-mono text-[10px] leading-relaxed text-faint sm:text-right">
                    RESEARCH · MARKETS · DATA · ENGINEERING
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="min-w-0">
              <Reveal>
                <p className="label-mono text-muted">
                  THE PRACTICE <span className="text-signal">/</span> 01
                </p>
                <h2 className="display mt-5 text-2xl md:text-4xl">
                  I BUILD RESEARCH INSTRUMENTS, NOT DECORATIVE CHARTS
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                  A backtest is a claim. Infrastructure is what makes the claim checkable — which is
                  why most of the work on this site is not the strategy, it is the machinery that
                  decides whether the strategy&apos;s result is allowed to count.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                  The operating rule is claim integrity. Simulated results are labelled simulated,
                  limitations are written down next to the result rather than buried, and every
                  figure carries its provenance. Nothing is asserted here that cannot be opened.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {domains.map((d) => (
                    <span
                      key={d}
                      className="label-mono border border-line px-3 py-1.5 text-[10px] text-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- the compound ---- */}
      <section aria-label="The compound" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-faint">THE COMPOUND</p>
          </Reveal>
          <ol className="mt-10 max-w-3xl space-y-5">
            {COMPOUND.map((word, i) => (
              <Reveal key={word} delay={i * 90}>
                <li className="flex items-baseline gap-6 border-b border-line pb-5">
                  <span className="num-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-2xl md:text-4xl">{word}</span>
                  {i < COMPOUND.length - 1 && (
                    <span className="num-mono ml-auto text-xl text-signal" aria-hidden="true">
                      +
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- direction / study / philosophy ---- */}
      <section aria-label="Direction, study and philosophy" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-px bg-line lg:grid-cols-3">
            <Reveal>
              <div className="h-full bg-background p-6 md:p-8">
                <p className="label-mono text-signal">CURRENT DIRECTION</p>
                <h2 className="display mt-5 text-xl md:text-2xl">QUANTITATIVE INTELLIGENCE</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                  Building deterministic systems for markets: research engines that can be trusted to
                  reproduce, point-in-time data platforms, and structural risk controls that hold
                  without supervision.
                </p>
                <Link
                  href="/builds"
                  className="label-mono mt-8 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  THE BUILDS →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full bg-background p-6 md:p-8">
                <p className="label-mono text-research">CURRENTLY LEARNING</p>
                <h2 className="display mt-5 text-xl md:text-2xl">SELF-DIRECTED, EVIDENCED</h2>
                <ul className="mt-5 space-y-4">
                  {studyTracks.slice(0, 4).map((t) => (
                    <li key={t.id} className="border-t border-line pt-4">
                      <p className="label-mono text-[10px] text-research">{t.state}</p>
                      <p className="mt-1 text-sm leading-snug text-foreground">{t.title}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/certifications"
                  className="label-mono mt-8 inline-block border border-line px-5 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  FULL STUDY RECORD →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="h-full bg-background p-6 md:p-8">
                <p className="label-mono text-foreground">RESEARCH PHILOSOPHY</p>
                <h2 className="display mt-5 text-xl md:text-2xl">QUESTIONS BEFORE CONCLUSIONS</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                  An unfinished question stays visible. A negative result stays in the record. A
                  limitation is part of the finding, not a disclaimer appended to it.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {site.status}.
                </p>
                <Link
                  href="/research"
                  className="label-mono mt-8 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                >
                  THE RESEARCH →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section aria-label="Contact" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-faint">DIRECT</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {utilityLinks.map((l) => (
                  <li key={l.label} className="bg-background p-5">
                    <p className="label-mono text-[10px] text-faint">{l.label}</p>
                    {l.href.startsWith("http") || l.href.startsWith("mailto:") ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="link-line mt-3 block break-all text-sm text-foreground transition-colors hover:text-signal"
                      >
                        {l.href.replace("mailto:", "").replace("https://", "")}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="link-line mt-3 block text-sm text-foreground transition-colors hover:text-signal"
                      >
                        {l.label === "CV" ? "PRINT-READY CV" : l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- continue ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">INSPECT THE WORK, NOT THE BIOGRAPHY</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/capabilities"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CAPABILITIES →
                </Link>
                <Link
                  href="/work-with-me"
                  className="label-mono bg-signal px-6 py-3 text-background transition-colors hover:bg-foreground hover:text-background"
                >
                  WORK WITH ME →
                </Link>
                <Link
                  href="/links"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  LINKS →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
