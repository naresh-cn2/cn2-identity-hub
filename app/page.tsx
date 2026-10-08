import type { Metadata } from "next";
import IdentityHero from "@/components/home/identity-hero";
import HowIBuild from "@/components/home/how-i-build";
import {
  ContactFinale,
  CredentialsTeaser,
  LabTeaser,
  ResearchTeaser,
  SelectedBuilds,
  SignalAct,
  WhatIDo,
  WorkTeaser,
} from "@/components/home/home-sections";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.identity}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.identity}`,
    description: site.description,
    type: "website",
  },
};

/**
 * The homepage is the narrative entrance, not the archive.
 *
 * Each act introduces one thing and hands off to the destination that owns it:
 * builds, research, lab, certifications, capabilities. Nothing is duplicated in
 * full here — that separation is the point.
 */
export default function HomePage() {
  return (
    <>
      {/* ACT I — IDENTITY */}
      <IdentityHero />
      {/* ACT II — SIGNAL */}
      <SignalAct />
      {/* ACT III — SELECTED WORK */}
      <SelectedBuilds />
      {/* SCOPE — WHAT I DO */}
      <WhatIDo />
      {/* METHOD — HOW I BUILD */}
      <HowIBuild />
      {/* ACT IV — RESEARCH */}
      <ResearchTeaser />
      {/* ACT V — LAB */}
      <LabTeaser />
      {/* PROOF — CREDENTIALS */}
      <CredentialsTeaser />
      {/* OPPORTUNITY — WORK WITH ME */}
      <WorkTeaser />
      {/* ACT IX — CONTACT */}
      <ContactFinale />
    </>
  );
}
