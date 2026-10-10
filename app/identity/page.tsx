import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Identity — CN2.DEV",
  description: "The person behind CN2.DEV — Bukya Naresh. Identity, portrait, and professional introduction.",
  alternates: { canonical: "/identity" },
  openGraph: {
    title: "Identity — CN2.DEV",
    description: "The person behind CN2.DEV",
  },
};

export default function IdentityPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line bg-white">
        {/* Red vertical accent */}
        <div className="absolute right-0 top-0 h-full w-1 bg-signal" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 py-16 md:py-24">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="label-mono text-[10px] tracking-wider">BACK</span>
            </Link>
          </Reveal>
          
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:items-center">
            {/* Left: Identity content */}
            <div>
              <Reveal>
                <p className="label-mono text-sm text-muted mb-6 tracking-wider">PERSONAL IDENTITY</p>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[0.9] mb-2">
                  CN2.DEV
                </h1>
              </Reveal>
              
              <Reveal delay={150}>
                <p className="text-xl md:text-2xl font-medium tracking-[0.2em] text-signal mb-8">
                  BUKYA NARESH
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="w-16 h-px bg-gray-300 mb-8" />
              </Reveal>
              
              <Reveal delay={250}>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mb-6">
                  Quantitative intelligence through research, markets, data, and engineering.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <p className="text-base text-gray-600 leading-relaxed max-w-lg mb-8">
                  Building deterministic systems for understanding markets — backtestable research, 
                  point-in-time-safe data, and the engineering that makes both trustworthy.
                </p>
              </Reveal>
              
              <Reveal delay={350}>
                <div className="flex items-center gap-8">
                  <a
                    href="https://github.com/naresh-cn2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[10px] tracking-wider text-gray-900 hover:text-signal transition-colors"
                  >
                    GITHUB
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bukya-naresh-cn2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[10px] tracking-wider text-gray-900 hover:text-signal transition-colors"
                  >
                    LINKEDIN
                  </a>
                  <Link
                    href="/contact"
                    className="label-mono text-[10px] tracking-wider text-gray-900 hover:text-signal transition-colors"
                  >
                    CONTACT
                  </Link>
                </div>
              </Reveal>
            </div>
            
            {/* Right: Portrait */}
            <Reveal delay={200}>
              <figure className="relative mx-auto w-full max-w-[400px]">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src="/images/portrait-identity.png"
                    alt="Portrait of Bukya Naresh"
                    fill
                    className="object-cover object-top"
                    priority
                    quality={90}
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="label-mono text-[10px] text-gray-500 tracking-wider">CN2 / PORTRAIT</span>
                  <span className="label-mono text-[10px] text-gray-400 tracking-wider">2026</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </header>
    </>
  );
}