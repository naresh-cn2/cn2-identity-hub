import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageAtmosphere from "@/components/ui/page-atmosphere";

export const metadata: Metadata = {
  title: "About",
  description:
    "A cosmic figure holding light — the about page of Bukya Naresh / CN2.dev.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Bukya Naresh / CN2.dev",
    description: "A cosmic figure holding light.",
    images: [
      {
        url: "/images/about-cosmos.png",
        width: 1085,
        height: 1450,
        alt: "A figure formed of starlight, holding a burning red ember",
      },
    ],
  },
};

/* The about page is a single held frame: the cosmic photograph fills the
   viewport edge to edge and never moves — not on scroll, not on cursor.
   Everything else in the sky lives in the canvas above it: three parallax
   star layers that lean with the pointer, occasional shooting stars and
   red embers lifting off the cupped hand. About-ourself writing returns
   here later; the record it used to carry now lives on /builds. */
export default function AboutPage() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-[#030408]">
      <Image
        src="/images/about-cosmos.png"
        alt="A figure formed of starlight, holding a burning red ember against a field of stars"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      {/* keeps the fixed navbar legible over the starfield in every theme */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent"
        aria-hidden="true"
      />
      <PageAtmosphere variant="cosmos" className="cn2-atmosphere-plain" />

      <Link
        href="/"
        className="group absolute bottom-8 left-6 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white sm:left-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="label-mono text-[10px]">BACK TO HOME</span>
      </Link>
    </section>
  );
}
