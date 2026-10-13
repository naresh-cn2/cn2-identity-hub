import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import HubDeck from "@/components/hub/hub-deck";
import StatusReadout from "@/components/hub/status-readout";
import SystemMap from "@/components/hub/system-map";
import { hubDestinations, hubIndex, hubStatus } from "@/data/hub";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Headquarters",
  description:
    "The CN2.DEV digital headquarters — one indexed gateway to builds, credentials, services, laboratory, research, opportunities and contact.",
  alternates: { canonical: "/hub" },
  openGraph: {
    title: "Headquarters — Bukya Naresh / CN2.DEV",
    description:
      "One indexed gateway to everything inside CN2.DEV: builds, credentials, services, laboratory, research, opportunities and contact.",
  },
};

export default function HubPage() {
  const recentResearch = researchEntries.slice(0, 3);

  return (
    <>
      {/* ---- headquarters deck ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="network" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 00 — HEADQUARTERS
              </p>
              <Link
                href="/"
                className="label-mono text-muted transition-colors hover:text-signal"
              >
                ← RETURN TO ENTRANCE
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal delay={80}>
                <h1 className="display text-[clamp(2.6rem,8.5vw,6.5rem)]">
                  DIGITAL
                  <br />
                  <span className="text-signal">HEADQUARTERS</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 label-mono text-foreground">
                  {site.name} <span className="text-signal">·</span> {site.identity}
                </p>
                <p className="mt-2 label-mono text-muted">{site.descriptor}</p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  Everything inside CN2.DEV, indexed. Pick a destination below to explore the systems,
                  research and services behind my work — the figures on this page are updated from the
                  project archive.
                </p>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <StatusReadout />
            </Reveal>
          </div>
        </div>

        {/* ---- system map — the visual bridge into the destinations ---- */}
        <div className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 md:pb-16">
          <Reveal delay={120}>
            <div className="viz-frame p-4 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 md:pb-5">
                <p className="label-mono text-muted">
                  SYSTEM MAP <span className="text-signal">/</span> {hubDestinations.length} LIVE
                  DESTINATIONS
                </p>
                <p className="label-mono hidden text-faint sm:block">
                  SELECT A NODE TO OPEN ITS SECTION
                </p>
              </div>
              <SystemMap destinations={hubDestinations} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- destination deck ---- */}
      <section aria-label="Destinations" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">EXPLORE CN2.DEV</h2>
              <p className="label-mono text-muted">DISCOVER MY PROJECTS, RESEARCH, CAPABILITIES, LEARNING, AND PROFESSIONAL INTERESTS</p>
            </div>
          </Reveal>
          <HubDeck destinations={hubDestinations} />

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <p className="label-mono text-muted">INDEX</p>
              {hubIndex.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="label-mono text-[10px] text-muted transition-colors hover:text-signal"
                >
                  {item.label} <span className="text-muted">{item.code}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- current focus ---- */}
      <section aria-label="Current focus" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="label-mono text-signal">CURRENT FOCUS</p>
              <h2 className="display mt-4 text-3xl md:text-5xl">WHAT IS BEING WORKED ON NOW</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                {site.status}. My current focus is deterministic backtesting, point-in-time
                market-data correctness and structural risk controls — each one backed by a working
                system in the project archive.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  INSPECT THE BUILDS →
                </Link>
                <Link
                  href="/capabilities"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  CAPABILITY MAP →
                </Link>
              </div>
            </Reveal>

            <div>
              <Reveal delay={80}>
                <p className="label-mono text-muted">SELECTED SYSTEMS</p>
              </Reveal>
              <ol className="mt-5 space-y-px bg-line">
                {hubStatus.flagship.map((p, i) => (
                  <li key={p.id}>
                    <Reveal delay={Math.min(i, 3) * 70}>
                      <Link
                        href={`/builds/${p.id}`}
                        className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 bg-background p-5 transition-colors hover:bg-surface md:p-6"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="num-mono text-xs text-muted">{p.index}</span>
                          <span className="display text-lg transition-colors group-hover:text-signal md:text-xl">
                            {p.shortTitle}
                          </span>
                        </span>
                        <span className="flex items-baseline gap-4">
                          <span className="label-mono text-[9px] text-research">{p.evidenceLabel}</span>
                          <span className="label-mono text-[10px] text-muted">{p.status}</span>
                          <span
                            className="label-mono text-signal transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---- recent research ---- */}
      <section aria-label="Recent research" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">RECENT RESEARCH</h2>
              <Link href="/research" className="label-mono text-muted transition-colors hover:text-signal">
                ALL {hubStatus.research} ENTRIES →
              </Link>
            </div>
          </Reveal>
          <ol className="mt-10 space-y-px bg-line">
            {recentResearch.map((r, i) => (
              <li key={r.id}>
                <Reveal delay={i * 70}>
                  <Link
                    href={`/research/${r.id}`}
                    className="group grid gap-3 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[1fr_2fr] md:gap-10 md:p-8"
                  >
                    <span className="flex flex-wrap items-baseline gap-3">
                      <span className="label-mono text-[9px] text-muted">{r.category}</span>
                      <span className="label-mono border border-research px-2 py-0.5 text-[9px] text-research">
                        {r.status}
                      </span>
                    </span>
                    <span>
                      <span className="block text-base leading-snug text-foreground transition-colors group-hover:text-signal md:text-lg">
                        {r.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted">
                        {r.question}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- signal ---- */}
      <section aria-label="Contact" className="border-t border-line">
        <div className="scanlines mx-auto max-w-[1440px] px-5 py-16 text-center sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-muted">OPEN TO SELECTED WORK · RESEARCH · COLLABORATION</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display mt-6 text-[clamp(2rem,6vw,4.5rem)]">
              KNOW WHERE TO GO <span className="text-signal">NEXT?</span>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/opportunities"
                className="corner-ticks label-mono border border-line-strong bg-surface px-8 py-5 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                OPPORTUNITIES →
              </Link>
              <Link
                href="/contact"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                CONTACT →
              </Link>
              <a
                href={site.links.email}
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                EMAIL →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
