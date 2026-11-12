import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";
import CategoryDoors from "@/components/work/category-doors";

export const metadata: Metadata = {
  title: "BUILDS — Bukya Naresh / CN2.dev",
  description:
    "Products, engineering projects and independent builds — every system documented from problem through architecture to verifiable evidence.",
  alternates: { canonical: "/builds" },
  openGraph: {
    images: ["opengraph-image"],
    title: "Builds — Bukya Naresh / CN2.dev",
    description:
      "Products, projects, and independent builds — verified systems and engineering evidence.",
  },
};

export default function BuildsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <MarketDepth />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">BUILDS DIRECTORY</p>
              <p className="label-mono text-faint">3 CORE DISCIPLINES · VERIFIED SYSTEMS & PLATFORMS</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(3rem,10vw,8rem)]" ariaLabel="BUILDS">
              BUILDS
            </KineticText>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-4 flex flex-col gap-1">
              <p className="display-condensed text-2xl text-foreground md:text-3xl">
                PRODUCTS. PROJECTS. INDEPENDENT BUILDS.
              </p>
              <p className="label-mono text-xs text-faint">
                THREE CATEGORIES · ONE VERIFIED RECORD
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Explore the products, software systems, and technical work I'm developing —
              structured across commercial products, engineering projects, and independent builds.
              Every system is documented from the original problem to the architecture, implementation,
              experiments, and evidence.
            </p>
          </Reveal>
        </div>
      </header>

      <CategoryDoors />
    </>
  );
}