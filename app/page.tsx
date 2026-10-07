import type { Metadata } from "next";
import IdentityHero from "@/components/home/identity-hero";
import CapabilityField from "@/components/home/capability-field";
import QuantSystems from "@/components/home/quant-systems";
import ResearchTeaser from "@/components/home/research-teaser";
import LabTeaser from "@/components/home/lab-teaser";
import EngineeringDepth from "@/components/home/engineering-depth";
import IntelligenceTeaser from "@/components/home/intelligence-teaser";
import CareerTeaser from "@/components/home/career-teaser";
import ContactFinale from "@/components/home/contact-finale";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.identity}`,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <IdentityHero />
      <CapabilityField />
      <QuantSystems />
      <ResearchTeaser />
      <LabTeaser />
      <EngineeringDepth />
      <IntelligenceTeaser />
      <CareerTeaser />
      <ContactFinale />
    </>
  );
}
