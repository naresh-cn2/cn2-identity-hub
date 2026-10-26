import type { Metadata } from "next";
import Link from "next/link";
import UniverseIntro from "@/components/hub/universe-intro";
import DestinationSection from "@/components/hub/destination-section";
import DestinationVisual from "@/components/hub/destination-visual";
import { hubDestinations, hubIndex } from "@/data/hub";

export const metadata: Metadata = {
  title: "Explore the Universe",
  description:
    "Explore the CN2.DEV universe — a digital environment for quantitative research, software engineering, intelligent automation, and the ideas connecting them. One identity. Multiple disciplines.",
  alternates: { canonical: "/hub" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Explore the CN2.DEV Universe — Bukya Naresh / CN2.DEV",
    description:
      "One identity. Multiple disciplines. A world of things to build. Eight destinations, one immersive introduction at a time.",
  },
};

/**
 * One ambient light source per stop — soft enough to read against,
 * distinct enough that every destination owns its own atmosphere.
 */
const AMBIENTS: Record<string, string> = {
  "01": "grid-field opacity-60", // WORK
  "02": "grid-field-fine opacity-40", // RESEARCH
  "03": "amb-halo", // LABORATORY
  "04": "scanlines", // SERVICES
  "05": "amb-glow-r", // CREDENTIALS
  "06": "amb-glow-s", // OPPORTUNITIES
  "07": "amb-vignette", // ABOUT ME
  "08": "amb-glow-r", // LET'S CONNECT
};

export default function HubPage() {
  return (
    <>
      <UniverseIntro />

      {/* ---- the universe: one destination per full-screen section ---- */}
      <main id="destinations" aria-label="The CN2.DEV universe">
        {hubDestinations.map((destination, i) => (
          <DestinationSection
            key={destination.code}
            destination={destination}
            contentSide={i % 2 === 0 ? "left" : "right"}
            ambient={AMBIENTS[destination.code] ?? "grid-field"}
            visual={<DestinationVisual code={destination.code} />}
          />
        ))}
      </main>

      {/* ---- secondary index ---- */}
      <section aria-label="Secondary index">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="label-mono text-muted">ALSO INSIDE</p>
            {hubIndex.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-mono text-[10px] text-muted transition-colors hover:text-signal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
