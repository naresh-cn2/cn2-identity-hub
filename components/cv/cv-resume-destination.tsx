"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";

/**
 * ResumeDestinationSection — Full-screen résumé destination modeled on /hub BUILDS pattern.
 * Approximately 80-100vh on desktop with large typography and prominent action.
 */

export function ResumeDestinationSection({
  caption,
  label,
  fullForm,
  description,
  audience,
  accent,
  href,
}: {
  caption: string;
  label: string;
  fullForm: string;
  description: string;
  audience: string;
  accent: "signal" | "research" | "electric";
  href: string;
}) {
  const accentCls =
    accent === "signal"
      ? "border-signal text-signal"
      : accent === "research"
        ? "border-research text-research"
        : "border-electric text-electric";

  return (
    <section
      id={label.toLowerCase()}
      className="relative min-h-[90svh] w-full overflow-hidden border-t border-line/60"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Copy column */}
          <div className="relative z-10">
            <Reveal>
              <p className={`label-mono text-[10px] ${accentCls}`}>{caption}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-5 text-[clamp(3rem,9vw,6rem)] leading-[0.92] text-foreground">
                {label}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="label-mono text-[10px] text-faint mb-2">{fullForm}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {description}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <Link
                href={href}
                className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/80 bg-signal/15 px-8 py-4 label-mono font-semibold text-research transition-all duration-200 hover:bg-research hover:text-white"
              >
                <span>{`EXPLORE ${label}`}</span>
                <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>

            <Reveal delay={280}>
              <p className="label-mono mt-5 text-[10px] text-faint">
                FOR {audience}
              </p>
            </Reveal>
          </div>

          {/* Visual column */}
          <div className="relative">
            <Reveal delay={140}>
              <div className="relative aspect-[560/420] w-full max-w-[560px] mx-auto">
                <svg
                  viewBox="0 0 560 420"
                  focusable="false"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full"
                >
                  <defs>
                    <linearGradient id="resume-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--surface)" />
                      <stop offset="100%" stopColor="var(--surface-2)" />
                    </linearGradient>
                  </defs>
                  <rect x="60" y="40" width="440" height="340" fill="url(#resume-gradient)" stroke="var(--line)" strokeWidth="1" opacity="0.9" />
                  <path d="M 60 200 L 300 200 L 300 100 L 500 100 L 500 300" fill="none" stroke="var(--research)" strokeWidth="2" strokeDasharray="8 8" opacity="0.7" />
                  <circle cx="60" cy="200" r="6" fill="var(--research)" />
                  <circle cx="300" cy="200" r="6" fill="var(--research)" />
                  <circle cx="300" cy="100" r="6" fill="var(--research)" />
                  <circle cx="500" cy="100" r="6" fill="var(--research)" />
                  <circle cx="500" cy="300" r="6" fill="var(--research)" />
                  <text x="60" y="190" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">START</text>
                  <text x="300" y="90" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">SYSTEMS</text>
                  <text x="500" y="90" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">QUANT</text>
                  <text x="500" y="310" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">AI</text>
                  <rect x="100" y="240" width="160" height="120" fill="none" stroke="var(--line)" strokeWidth="1" opacity="0.6" />
                  <rect x="115" y="225" width="160" height="120" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.4" />
                  <rect x="130" y="210" width="160" height="120" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.2" />
                  <text x="190" y="285" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">CV</text>
                  <text x="190" y="297" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">RÉSUMÉ</text>
                  <rect x="50" y="30" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" />
                  <rect x="494" y="30" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(180 502 38)" />
                  <rect x="50" y="374" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(90 58 382)" />
                  <rect x="494" y="374" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(270 502 382)" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}