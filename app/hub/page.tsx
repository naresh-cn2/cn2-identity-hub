import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import UniverseIntro from "@/components/hub/universe-intro";
import DestinationVisual from "@/components/hub/destination-visual";
import { hubDestinations } from "@/data/hub";

export const metadata: Metadata = {
  title: "Explore the Universe",
  description:
    "The CN2.DEV universe - eight destinations. Builds, Laboratory, Research & Journal, Services, Education & Credentials, Careers & Collaboration, About and Contact.",
  alternates: { canonical: "/hub" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Explore the CN2.DEV Universe - Bukya Naresh / CN2.DEV",
    description:
      "One identity. Multiple disciplines. A world of things to build. Eight destinations in one immersive introduction.",
  },
};

/** One ambient light source per stop - soft enough to read against,
 * distinct enough that every destination owns its own atmosphere.
 * Codes are positional and follow the IA v5 journey order.
 */
const AMBIENTS: Record<string, string> = {
  "01": "grid-field opacity-60", // BUILDS
  "02": "amb-halo", // LABORATORY
  "03": "grid-field-fine opacity-40", // RESEARCH & JOURNAL
  "04": "scanlines", // SERVICES
  "05": "amb-glow-r", // EDUCATION & CREDENTIALS
  "06": "amb-glow-s", // CAREERS & COLLABORATION
  "07": "amb-vignette", // ABOUT
  "08": "amb-glow-r", // CONTACT
};

export default function HubPage() {
  return (
    <>
      <UniverseIntro />

      {/* ---- the universe: one destination per full-screen section ---- */}
      <main id="destinations" aria-label="The CN2.DEV universe">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 md:pb-24">
          {hubDestinations.map((destination, i) => {
            const visual = <DestinationVisual code={destination.code} />;
            return (
              <section
                key={destination.code}
                id={`dest-${destination.code}`}
                aria-labelledby={`dest-${destination.code}`}
                className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-line"
              >
                <div
                  className={`absolute inset-0 ${AMBIENTS[destination.code] ?? "grid-field"}`}
                  aria-hidden="true"
                />

                <div className="relative w-full mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24">
                  <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                    {/* ---- copy column: the destination and its one action ---- */}
                    <div className="relative z-10">
                      <Reveal>
                        <p className="label-mono text-signal">{destination.caption}</p>
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
                            &rarr;
                          </span>
                        </Link>
                      </Reveal>

                      <Reveal delay={280}>
                        <p className="label-mono mt-5 text-[10px] text-faint">
                          FOR {destination.audience}
                        </p>
                      </Reveal>
                    </div>

                    {/* ---- the destination's own scene ---- */}
                    <div className="relative">
                      <Reveal delay={140}>
                        <div className="dest-recede">{visual}</div>
                      </Reveal>
                    </div>
                  </div>
                </div>

                {/* ---- scroll cue: the journey continues below ---- */}
                <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
                  <span className="dest-cue" />
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
