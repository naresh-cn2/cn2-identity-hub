import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import BuildsVisual from "@/components/hub/visuals/work-visual";
import CategoryShowcaseList from "@/components/work/category-showcase-list";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Products & Platforms — Works",
  description:
    "What I build for users, businesses, and the market — commercial quantitative platforms, high-throughput financial data engines, and enterprise cost intelligence software.",
  alternates: { canonical: "/works/products" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Products & Platforms — Works — Bukya Naresh / CN2.dev",
    description: "What I build for users, businesses, and the market.",
  },
};

export default function ProductsPage() {
  const category = WORK_CATEGORIES.products;
  const items = getWorksByCategory("products");

  return (
    <>
      {/* ---- IMMERSIVE DESTINATION HERO ---- */}
      <header className="relative min-h-[90svh] flex items-center overflow-hidden border-b border-line bg-surface/30">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />

        <div className="relative w-full mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Copy Column */}
            <div className="relative z-10">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/works" className="label-mono text-faint transition-colors hover:text-foreground">
                    WORKS
                  </Link>
                  <span className="label-mono text-line-strong" aria-hidden="true">/</span>
                  <p className="label-mono text-signal font-bold">
                    DESTINATION / TIER {category.number}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95] text-foreground">
                  {category.title}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg font-mono font-semibold text-foreground/90 md:text-xl">
                  {category.tagline}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {category.description}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#catalogue"
                    className="corner-ticks group inline-flex items-center gap-4 border border-signal bg-signal/15 px-8 py-4 label-mono text-xs font-bold text-signal transition-colors hover:bg-signal hover:text-white"
                  >
                    <span>EXPLORE PRODUCTS CATALOGUE</span>
                    <span aria-hidden="true" className="arr-down transition-transform duration-300 group-hover:translate-y-1">
                      ↓
                    </span>
                  </a>
                  <Link
                    href="/works"
                    className="label-mono border border-line-strong px-6 py-4 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                  >
                    ← RETURN TO WORKS
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Immersive Architecture Visual Column */}
            <div className="relative flex items-center justify-center">
              <Reveal delay={120}>
                <div className="w-full max-w-[560px]">
                  <BuildsVisual />
                  <p className="label-mono mt-3 text-center text-[10px] text-faint">
                    ILLUSTRATIVE — DISTRIBUTED PLATFORM TOPOLOGY
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ---- DEDICATED PRODUCTS CATALOGUE ---- */}
      <section id="catalogue" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="label-mono text-signal">SYSTEMS DIRECTORY</p>
                <h2 className="display mt-2 text-3xl md:text-5xl text-foreground">
                  COMMERCIAL PRODUCTS &amp; PLATFORMS
                </h2>
              </div>
              <p className="label-mono text-faint">
                {items.length} PRODUCTION &amp; PLATFORM ENGINES
              </p>
            </div>
          </Reveal>
        </div>

        <CategoryShowcaseList items={items} categoryTitle="Products & Platforms" />
      </section>
    </>
  );
}
