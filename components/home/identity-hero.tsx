import Link from "next/link";
import HeroScene from "@/components/three/hero-scene";
import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { site, utilityLinks } from "@/data/site";

/**
 * ACT I — THE HUMAN.
 *
 * A cinematic hero: the anonymous figure stands inside the CN2 quant field, and
 * the camera flies from the human toward the field as the visitor scrolls into
 * ACT II. All identity text is real, server-rendered HTML layered above the
 * scene, so the hero reads completely even when the WebGL layer never mounts
 * (reduced motion, no WebGL, slow network, compact viewport).
 */
export default function IdentityHero() {
  return (
    <section id="act-1" data-act="THE HUMAN" aria-label="Identity" className="relative border-b border-line">
      <HeroScene>
        <div className="mx-auto flex min-h-svh w-full max-w-[1440px] flex-col justify-end px-5 pb-14 pt-32 sm:px-8 lg:pb-20 lg:pt-28">
          <div data-hero-title className="max-w-2xl will-change-transform">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="label-mono text-muted">
                  <span className="text-signal">{site.identity}</span> — DIGITAL HEADQUARTERS
                </p>
                <p className="label-mono text-research">{site.descriptor}</p>
              </div>
            </Reveal>

            <Reveal clip delay={120}>
              <h1 className="mt-7">
                <span className="display block text-[clamp(2.7rem,8.6vw,7.2rem)] leading-[0.88]">
                  {site.name}
                </span>
                <span className="display block text-[clamp(2.2rem,7vw,6rem)] leading-[0.9] text-signal">
                  {site.identity}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="display-condensed mt-4 text-[clamp(1rem,2.4vw,1.6rem)] text-muted">
                {site.subtitle}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Building deterministic systems for understanding markets — backtestable research,
                point-in-time-safe data, and the engineering that makes both trustworthy.
              </p>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic
                  href="/builds"
                  strength={5}
                  className="label-mono bg-signal px-7 py-4 text-background transition-colors hover:bg-foreground hover:text-background"
                  ariaLabel="Explore builds"
                >
                  EXPLORE BUILDS →
                </Magnetic>
                <Magnetic
                  href="/research"
                  strength={5}
                  className="label-mono border border-line-strong px-7 py-4 text-foreground transition-colors hover:border-research hover:text-research"
                  ariaLabel="Enter research"
                >
                  ENTER RESEARCH →
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={460}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                {utilityLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="link-line label-mono text-[10px] text-muted transition-colors hover:text-signal"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-line label-mono text-[10px] text-muted transition-colors hover:text-signal"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={520}>
            <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5">
              <p className="label-mono flex items-center gap-2 text-foreground">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                {site.status}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="num-mono text-[10px] text-faint">
                  ACT I — THE HUMAN · {site.system}
                </span>
                <Link
                  href="/builds"
                  className="num-mono text-[10px] text-faint transition-colors hover:text-signal"
                >
                  SCROLL — ACT II / THE FIELD ↓
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </HeroScene>
    </section>
  );
}
