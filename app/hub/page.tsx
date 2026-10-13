import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import IntelligenceCore from "@/components/hub/intelligence-core";
import JourneySection from "@/components/hub/journey-section";
import JourneyVisual from "@/components/hub/journey-visuals";
import { hubDestinations, hubIndex } from "@/data/hub";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Intelligence Nexus",
  description:
    "The CN2.DEV Intelligence Nexus — a cinematic journey through eight destinations: builds, credentials, services, laboratory, research, opportunities, about and connect.",
  alternates: { canonical: "/hub" },
  openGraph: {
    title: "Intelligence Nexus — Bukya Naresh / CN2.DEV",
    description:
      "One destination at a time: eight full-screen sections introduce builds, credentials, services, laboratory, research, opportunities, about and connect.",
  },
};

/**
 * One ambient light source per stop — soft enough to read against, distinct
 * enough that every section has its own atmosphere.
 */
const AMBIENTS: Record<string, string> = {
  "01": "grid-field opacity-60",
  "02": "amb-glow-r",
  "03": "scanlines",
  "04": "amb-halo",
  "05": "grid-field-fine opacity-40",
  "06": "amb-glow-s",
  "07": "amb-vignette",
  "08": "amb-glow-r",
};

export default function HubPage() {
  return (
    <>
      {/* ---- intelligence nexus — the journey's entrance ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="network" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 00 — INTELLIGENCE NEXUS
              </p>
              <Link
                href="/"
                className="label-mono text-muted transition-colors hover:text-signal"
              >
                ← RETURN TO ENTRANCE
              </Link>
            </div>
          </Reveal>

          <div className="mt-8">
            <Reveal delay={80}>
              <h1 className="display text-[clamp(2.6rem,8.5vw,6.5rem)]">
                INTELLIGENCE
                <br />
                <span className="text-signal">NEXUS</span>
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
                Everything inside CN2.DEV, one destination at a time. Scroll through eight
                full-screen sections — each introduces a single destination and opens its
                complete page, with the figure below it updated from the data behind that
                destination.
              </p>
            </Reveal>
          </div>

          {/* ---- intelligence core — the nexus centerpiece ---- */}
          <Reveal delay={120}>
            <div className="corner-ticks mt-14 border border-line bg-surface md:mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
                <p className="label-mono text-muted">
                  INTELLIGENCE CORE <span className="text-signal">/</span> CONNECTED DISCIPLINES
                </p>
                <p className="label-mono hidden text-faint md:block">
                  ILLUSTRATIVE DIAGRAM · HOVER A NODE TO LIGHT ITS PATH
                </p>
              </div>
              <div className="aspect-[1200/620] w-full">
                <IntelligenceCore />
              </div>
              <div className="border-t border-line px-4 py-3 md:px-6">
                <p className="label-mono text-faint">
                  DATA · RESEARCH · MODELS · SYSTEMS · AUTOMATION · MARKETS
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-10 label-mono text-faint">
              SCROLL TO BEGIN <span className="text-signal">↓</span> — EIGHT DESTINATIONS, ONE
              AT A TIME
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- the journey — one destination per full-screen section ---- */}
      <main aria-label="Destination journey">
        {hubDestinations.map((destination, i) => (
          <JourneySection
            key={destination.code}
            destination={destination}
            total={hubDestinations.length}
            contentSide={i % 2 === 0 ? "left" : "right"}
            ambient={AMBIENTS[destination.code] ?? "grid-field"}
            visual={<JourneyVisual code={destination.code} />}
          />
        ))}
      </main>

      {/* ---- secondary index — the destinations outside the journey ---- */}
      <section aria-label="Secondary index">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="label-mono text-muted">SECONDARY INDEX</p>
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
        </div>
      </section>
    </>
  );
}
