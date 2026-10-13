import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import type { HubDestination } from "@/data/hub";

/**
 * DestinationSection — one full-screen stop in the CN2.DEV universe.
 *
 * One destination, one immersive introduction, one clear action: the ENTER
 * button sits right beside the introduction and opens the destination's
 * complete page. No counters, no statistics — a short invitation and a
 * single prominent action, with the destination's own scene filling the
 * rest of the composition. Copy and visual alternate sides down the
 * journey; each stop carries its own ambient light and a subtle scroll
 * cue. min-h is a floor, not a fixed height, so short viewports and mobile
 * simply grow taller.
 */

interface Props {
  destination: HubDestination;
  /** Which column the copy sits on — the visual takes the other side. */
  contentSide: "left" | "right";
  /** Ambient background layer classes for this stop. */
  ambient: string;
  /** The destination's scene (canvas + SVG, already labelled). */
  visual: ReactNode;
}

export default function DestinationSection({ destination, contentSide, ambient, visual }: Props) {
  const contentFirst = contentSide === "left";

  return (
    <section
      aria-labelledby={`dest-${destination.code}`}
      className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-line"
    >
      <div className={`absolute inset-0 ${ambient}`} aria-hidden="true" />

      <div className="relative w-full mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* ---- copy column: the destination and its one action ---- */}
          <div className={`relative ${contentFirst ? "" : "lg:order-2"}`}>
            <div className="relative z-10">
              <Reveal>
                <p className="label-mono text-muted">
                  <span className="text-signal">DESTINATION</span> {destination.href}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h2
                  id={`dest-${destination.code}`}
                  className="display mt-5 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.95]"
                >
                  {destination.label}
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {destination.blurb}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <Link
                  href={destination.href}
                  className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/70 bg-signal/10 px-8 py-4 label-mono text-signal transition-colors hover:bg-signal hover:text-background"
                >
                  {destination.action}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* ---- the destination's own scene ---- */}
          <div className={`relative ${contentFirst ? "lg:order-2" : "lg:order-1"}`}>
            <Reveal delay={140}>
              <div className="dest-recede">{visual}</div>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 label-mono text-faint md:text-right">
                {destination.interactive ? (
                  <>
                    REAL CHANNELS <span className="text-signal">—</span> SELECT A NODE TO OPEN
                  </>
                ) : (
                  <>
                    ILLUSTRATIVE <span className="text-signal">—</span> {destination.caption}
                  </>
                )}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---- scroll cue: the journey continues below ---- */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
          <span className="dest-cue" />
        </div>
      </div>
    </section>
  );
}
