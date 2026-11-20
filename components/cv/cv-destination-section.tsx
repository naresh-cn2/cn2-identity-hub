"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";

/**
 * DestinationSection — Full-screen CV destination modeled on /hub BUILDS pattern.
 * Approximately 80-100vh on desktop with large typography and prominent action.
 */

export function DestinationSection({
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
                className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/80 bg-signal/15 px-8 py-4 label-mono font-semibold text-signal transition-all duration-200 hover:bg-signal hover:text-white"
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
                    <linearGradient id="dossier-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--surface)" />
                      <stop offset="100%" stopColor="var(--surface-2)" />
                    </linearGradient>
                  </defs>
                  <rect x="60" y="40" width="440" height="320" fill="url(#dossier-gradient)" stroke="var(--line)" strokeWidth="1" opacity="0.9" />
                  <rect x="75" y="25" width="440" height="320" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.5" />
                  <rect x="90" y="10" width="440" height="320" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.3" />
                  <rect x="60" y="40" width="440" height="34" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.8" />
                  <rect x="60" y="40" width="14" height="34" fill="var(--signal)" opacity="0.9" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <rect key={i} x="80" y={100 + i * 22} width="300" height="8" fill="var(--muted)" opacity="0.4" />
                  ))}
                  <rect x="80" y={200} width="180" height="8" fill="var(--signal)" opacity="0.6" />
                  <rect x="80" y={230} width="220" height="8" fill="var(--muted)" opacity="0.4" />
                  <rect x="80" y={260} width="260" height="8" fill="var(--muted)" opacity="0.4" />
                  <rect x="80" y={290} width="200" height="8" fill="var(--muted)" opacity="0.4" />
                  <rect x="50" y="30" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" />
                  <rect x="494" y="30" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(180 502 38)" />
                  <rect x="50" y="374" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(90 58 382)" />
                  <rect x="494" y="374" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(270 502 382)" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}