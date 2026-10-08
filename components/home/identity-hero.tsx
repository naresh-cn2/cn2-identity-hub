import Image from "next/image";
import Link from "next/link";
import HeroField from "@/components/viz/hero-field";
import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { site, utilityLinks } from "@/data/site";

/**
 * ACT I — IDENTITY.
 *
 * The portrait is the primary editorial moment, not an avatar: a tall framed
 * plate with technical metadata, set against the computational field. All
 * identity text is real HTML, so the hero still reads completely if the canvas
 * never paints.
 */
export default function IdentityHero() {
  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden border-b border-line"
      aria-label="Identity"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <HeroField />
      </div>
      <div className="grid-field pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-end gap-12 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-20 lg:pb-20 lg:pt-28">
        {/* ---- identity ---- */}
        <div className="min-w-0">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="label-mono text-muted">
                <span className="text-signal">CN2 /</span> QUANT.DEV
              </p>
              <p className="label-mono text-research">{site.descriptor}</p>
            </div>
          </Reveal>

          <Reveal clip delay={120}>
            <h1 className="mt-8">
              <span className="display block text-[clamp(2.6rem,8.4vw,7rem)]">{site.name}</span>
              <span className="display block text-[clamp(2.2rem,7.2vw,6rem)] text-signal">
                {site.identity}
              </span>
              <span className="display-condensed mt-3 block text-[clamp(1rem,2.6vw,1.9rem)] text-muted">
                {site.subtitle}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
              Building deterministic systems for understanding markets — backtestable research,
              point-in-time-safe data, and the engineering that makes both trustworthy.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
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

          <Reveal delay={440}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
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

          <Reveal delay={520}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
              <p className="label-mono flex items-center gap-2 text-foreground">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                {site.status}
              </p>
              <p className="num-mono text-[10px] text-faint">
                01 — IDENTITY · {site.name} / {site.identity} / {site.system}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---- portrait plate ---- */}
        <Reveal delay={220}>
          <figure className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:ml-auto lg:max-w-[24rem]">
            <div className="corner-ticks film-grain relative aspect-[3/4] w-full overflow-hidden border border-line-strong bg-surface">
              <Image
                src="/images/identity/portrait.webp"
                alt="Editorial monochrome portrait of Bukya Naresh"
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 384px"
                className="object-cover object-[50%_22%] grayscale contrast-125 brightness-90"
              />
              {/* technical overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
                <span className="label-mono text-[9px] text-white/70">PORTRAIT / 001</span>
                <span className="label-mono text-[9px] text-signal">{site.system}</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-4">
                <p className="label-mono text-[10px] text-white/90">{site.name}</p>
                <p className="label-mono text-[10px] text-white/60">{site.identity}</p>
              </div>
              {/* coordinate ruler */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-3" aria-hidden="true">
                <div className="grid-field-fine h-full w-full opacity-40" />
              </div>
            </div>

            <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <p className="label-mono text-[10px] text-foreground">BUKYA NARESH</p>
                <p className="label-mono text-[10px] text-signal">{site.identity}</p>
              </div>
              <div className="text-right">
                <p className="label-mono text-[10px] text-faint">INDIA / RESEARCH · MARKETS · DATA</p>
                <p className="label-mono text-[10px] text-faint">
                  {site.system} / QUANTITATIVE INTELLIGENCE
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8">
        <div className="flex items-center justify-between border-t border-line pt-4">
          <Link href="/builds" className="num-mono text-[10px] text-faint transition-colors hover:text-signal">
            SCROLL — ACT II / SIGNAL
          </Link>
          <p className="num-mono text-[10px] text-faint">RESEARCH · MARKETS · DATA · ENGINEERING</p>
        </div>
      </div>
    </section>
  );
}
