import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { site } from "@/data/site";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Identity",
  description:
    "The person behind CN2.DEV — Bukya Naresh. Signed portrait, identity, and professional introduction.",
  alternates: { canonical: "/identity" },
  openGraph: {
    title: "Identity — Bukya Naresh / CN2.DEV",
    description: "The person behind CN2.DEV — Bukya Naresh.",
    images: [
      {
        url: "/images/portrait-identity-2026.png",
        width: 1211,
        height: 1299,
        alt: "Signed portrait of Bukya Naresh",
      },
    ],
  },
};

export default function IdentityPage() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <PageAtmosphere variant="solids" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
        <Reveal>
          <p className="label-mono text-muted">
            SECTION <span className="text-signal">/</span> 10 — IDENTITY
          </p>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          {/* LEFT — the name leads */}
          <div className="order-2 lg:order-1">
            <Reveal delay={80}>
              <h1 className="display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95]">
                {site.name}
                <br />
                <span className="text-signal">{site.identity}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="label-mono mt-6 text-foreground">QUANTITATIVE SYSTEMS DEVELOPER</p>
            </Reveal>

            <Reveal delay={220}>
              <p className="label-mono mt-4 text-muted">
                AUTOMATION <span className="text-signal">·</span> DATA
                <span className="text-signal"> ·</span> FINANCE
                <span className="text-signal"> ·</span> TRADING SYSTEMS
              </p>
            </Reveal>
          </div>

          {/* RIGHT — the signed portrait, shown whole: signature never crops */}
          <Reveal delay={200} className="order-1 lg:order-2">
            <figure className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="relative">
                {/* offset accent frame — echo of the crimson in the hoodie */}
                <div
                  className="absolute -left-2.5 -top-2.5 h-full w-full border border-signal/50"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden border border-line-strong bg-surface">
                  <Image
                    src="/images/portrait-identity-2026.png"
                    alt="Signed portrait of Bukya Naresh — golden-hour light, white cap, maroon hoodie, Chintu signature"
                    width={1211}
                    height={1299}
                    priority
                    quality={92}
                    sizes="(max-width: 1024px) min(90vw, 440px), 440px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="label-mono text-[10px] text-muted">CN2 / PORTRAIT — SIGNED</span>
                <span className="label-mono text-[10px] text-faint">2026</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={450}>
          <Link
            href="/"
            className="group mt-14 inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="label-mono text-[10px]">BACK TO HOME</span>
          </Link>
        </Reveal>
      </div>
    </header>
  );
}
