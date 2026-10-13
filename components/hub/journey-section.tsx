import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import type { HubDestination } from "@/data/hub";

/**
 * JourneySection — one full-screen destination stop on the /hub journey.
 *
 * One destination, one immersive introduction, one clear action: the ENTER
 * button opens the destination's complete page. Content and visual alternate
 * sides down the journey (contentSide), each stop carries its own ambient
 * layer and a giant ghost index behind the copy. Copy and the live metric
 * come from the hub registry — the section never restates the destination's
 * content. min-h is a floor, not a fixed height, so short viewports and
 * mobile just grow taller.
 */

interface Props {
  destination: HubDestination;
  /** Number of destinations in the journey (for the NN total). */
  total: number;
  /** Which column the copy sits on — the visual takes the other side. */
  contentSide: "left" | "right";
  /** Ambient background layer classes for this stop. */
  ambient: string;
  /** The destination's illustration (already aria-hidden). */
  visual: ReactNode;
}

export default function JourneySection({ destination, total, contentSide, ambient, visual }: Props) {
  const contentFirst = contentSide === "left";
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section
      aria-labelledby={`dest-${destination.code}`}
      className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-line"
    >
      <div className={`absolute inset-0 ${ambient}`} aria-hidden="true" />

      <div className="relative w-full mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* ---- copy column ---- */}
          <div className={`relative ${contentFirst ? "" : "lg:order-2"}`}>
            <span
              aria-hidden="true"
              className={`display pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[clamp(7rem,18vw,15rem)] leading-none opacity-[0.05] ${
                contentFirst ? "-left-4" : "-right-4"
              }`}
            >
              {destination.code}
            </span>

            <div className="relative z-10">
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="label-mono text-muted">
                    DESTINATION <span className="text-signal">/</span> {destination.code}{" "}
                    <span className="text-faint">OF {totalLabel}</span>
                  </p>
                  <p className="label-mono text-faint">{destination.href}</p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h2 id={`dest-${destination.code}`} className="display mt-5 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.95]">
                  {destination.label}
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{destination.blurb}</p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex items-baseline gap-4 border-l-2 border-signal pl-5">
                  <span className="num-mono text-3xl text-foreground md:text-4xl">{destination.metric.value}</span>
                  <span className="label-mono text-muted">{destination.metric.label}</span>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <Link
                  href={destination.href}
                  className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/70 bg-signal/10 px-8 py-4 label-mono text-signal transition-colors hover:bg-signal hover:text-background"
                >
                  ENTER {destination.label}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* ---- visual column ---- */}
          <div className={`relative ${contentFirst ? "lg:order-2" : "lg:order-1"}`}>
            <Reveal delay={140}>{visual}</Reveal>
            <Reveal delay={220}>
              <p className="mt-4 label-mono text-faint md:text-right">
                ILLUSTRATIVE <span className="text-signal">—</span> {destination.label} VISUAL
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
