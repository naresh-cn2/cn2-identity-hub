import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import UniverseIntro from "@/components/hub/universe-intro";
import DestinationIndex from "@/components/hub/destination-index";
import GroupDivider from "@/components/hub/group-divider";
import DestinationSection from "@/components/hub/destination-section";
import DestinationVisual from "@/components/hub/destination-visual";
import { hubDestinations, hubGroups, hubIndex } from "@/data/hub";

export const metadata: Metadata = {
  title: "Explore the Universe",
  description:
    "The CN2.DEV universe — eight destinations in three groups. Builds, Laboratory, Research & Journal, Services, Education & Credentials, Careers & Collaboration, About and Contact: quantitative research, software engineering, intelligent automation, and the ideas connecting them.",
  alternates: { canonical: "/hub" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Explore the CN2.DEV Universe — Bukya Naresh / CN2.DEV",
    description:
      "One identity. Multiple disciplines. A world of things to build. Eight destinations in three groups, one immersive introduction at a time.",
  },
};

/**
 * One ambient light source per stop — soft enough to read against,
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
        {/* ---- the map: all eight destinations, grouped, before the journey ---- */}
        <DestinationIndex />

        {hubDestinations.map((destination, i) => {
          const previous = hubDestinations[i - 1];
          const startsGroup = !previous || previous.group !== destination.group;
          const groupIndex = hubGroups.findIndex((g) => g.id === destination.group);
          const group = hubGroups[groupIndex];

          return (
            <Fragment key={destination.code}>
              {startsGroup && group && (
                <GroupDivider group={group} index={groupIndex + 1} />
              )}
              <DestinationSection
                destination={destination}
                contentSide={i % 2 === 0 ? "left" : "right"}
                ambient={AMBIENTS[destination.code] ?? "grid-field"}
                visual={<DestinationVisual code={destination.code} />}
              />
            </Fragment>
          );
        })}
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
