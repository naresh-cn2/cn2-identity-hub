import type { Metadata } from "next";
import Link from "next/link";
import UniverseIntro from "@/components/hub/universe-intro";
import AudiencePathways from "@/components/hub/audience-pathways";
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
      <UniverseIntro />

      {/* ---- audience pathways: four ways into the same universe ---- */}
      <AudiencePathways />

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

      {/* ---- secondary index + the way back out ---- */}
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
