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
        url: "/images/portrait-identity.png",
        width: 540,
        height: 887,
        alt: "Signed portrait of Bukya Naresh",
      },
    ],
  },
};

export default function IdentityPage() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <PageAtmosphere variant="motes" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-muted">
              SECTION <span className="text-signal">/</span> 10 — IDENTITY
            </p>
            <p className="label-mono text-research">{site.descriptor}</p>
          </div>
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
              <p className="label-mono mt-6 text-muted">{site.subtitle}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 h-px w-16 bg-line-strong" aria-hidden="true" />
            </Reveal>

            <Reveal delay={270}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
                Quantitative intelligence through research, markets, data, and engineering.
              </p>
            </Reveal>

            <Reveal delay={330}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Building deterministic systems for understanding markets — backtestable research,
                point-in-time-safe data, and the engineering that makes both trustworthy.
              </p>
            </Reveal>

            <Reveal delay={390}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[10px] text-foreground transition-colors hover:text-signal"
                >
                  GITHUB
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[10px] text-foreground transition-colors hover:text-signal"
                >
                  LINKEDIN
                </a>
                <Link
                  href="/contact"
                  className="label-mono text-[10px] text-foreground transition-colors hover:text-signal"
                >
                  CONTACT
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — the signed portrait, shown whole: signature and stars never crop */}
          <Reveal delay={200} className="order-1 lg:order-2">
            <figure className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="relative">
                {/* offset red frame — echo of the stripe inside the picture */}
                <div
                  className="absolute -left-2.5 -top-2.5 h-full w-full border border-signal/50"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden border border-line-strong bg-surface">
                  <Image
                    src="/images/portrait-identity.png"
                    alt="Signed portrait of Bukya Naresh — black and white, red stripe, Naresh signature"
                    width={540}
                    height={887}
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
