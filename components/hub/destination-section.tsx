import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import type { HubChild, HubDestination } from "@/data/hub";

/**
 * DestinationSection — one full-screen stop in the CN2.DEV universe.
 *
 * One destination, one immersive introduction, one clear action: the ENTER
 * button sits right beside the introduction and opens the destination's
 * complete page. Under the composition, the destination's own sub-destinations
 * are listed as cards, so a visitor knows what is inside before they walk
 * in. No counters, no statistics — a short invitation, a single prominent
 * action, and the real routes behind it, with the destination's own scene
 * filling the rest of the composition. Copy and visual alternate sides down
 * the journey; each stop carries its own ambient light and a subtle scroll
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

/** True when the child link leaves the site (GitHub, LinkedIn, mail). */
function isExternalHref(href: string) {
  return href.startsWith("http");
}

function ChildCard({ child }: { child: HubChild }) {
  const body = (
    <>
      <span className="label-mono text-[10px] text-foreground transition-colors group-hover:text-signal">
        {child.label}
      </span>
      <span
        aria-hidden="true"
        className="label-mono text-[10px] text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal"
      >
        →
      </span>
    </>
  );

  return (
    <li className="bg-background">
      {isExternalHref(child.href) ? (
        <a
          href={child.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 border border-line bg-background px-4 py-3 transition-colors hover:border-signal/60 hover:bg-surface"
        >
          {body}
        </a>
      ) : (
        <Link
          href={child.href}
          className="group flex items-center justify-between gap-3 border border-line bg-background px-4 py-3 transition-colors hover:border-signal/60 hover:bg-surface"
        >
          {body}
        </Link>
      )}
      <p className="px-1 pb-3 pt-2 text-xs leading-relaxed text-faint">{child.note}</p>
    </li>
  );
}

export default function DestinationSection({ destination, contentSide, ambient, visual }: Props) {
  const contentFirst = contentSide === "left";
  const hasChildren = destination.children.length > 0;
  /* Dense destinations (services) read better in three columns. */
  const childColumns = destination.children.length >= 6 ? "sm:grid-cols-3" : "sm:grid-cols-2";

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
                <p className="label-mono text-signal">
                  {destination.caption}
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
                  className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/80 bg-signal/15 px-8 py-4 label-mono font-semibold text-signal transition-all duration-200 hover:bg-signal hover:text-white"
                >
                  <span>{destination.action}</span>
                  <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={280}>
                <p className="label-mono mt-5 text-[10px] text-faint">
                  FOR {destination.audience}
                </p>
              </Reveal>
            </div>
          </div>

          {/* ---- the destination's own scene ---- */}
          <div className={`relative ${contentFirst ? "lg:order-2" : "lg:order-1"}`}>
            <Reveal delay={140}>
              <div className="dest-recede">{visual}</div>
            </Reveal>
            {destination.interactive && (
              <Reveal delay={220}>
                <p className="mt-4 label-mono text-faint md:text-right">
                  REAL CHANNELS <span className="text-signal">—</span> SELECT A NODE TO OPEN
                </p>
              </Reveal>
            )}
          </div>
        </div>

        {/* ---- what is inside this destination ---- */}
        {hasChildren && (
          <Reveal delay={120}>
            <div className="mt-12 border-t border-line pt-8 md:mt-16">
              <p className="label-mono text-faint">INSIDE — {destination.label}</p>
              <ul className={`mt-5 grid gap-px bg-line ${childColumns}`}>
                {destination.children.map((child) => (
                  <ChildCard key={child.href} child={child} />
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* ---- scroll cue: the journey continues below ---- */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
          <span className="dest-cue" />
        </div>
      </div>
    </section>
  );
}
