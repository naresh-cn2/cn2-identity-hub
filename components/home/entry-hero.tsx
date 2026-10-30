"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import QuantitativeUniverse from "@/components/home/quantitative-universe";

/**
 * EntryHero — Cinematic Quantitative Gateway.
 *
 * Requirements Fulfilled:
 * 1. Brand Wordmark Sliced Treatment:
 *    - Reinstated the signature horizontal laser/stencil cut across CN2 and DEV.
 *    - Uncut, glowing red square dot between CN2 and DEV.
 * 2. Original Left-Center Hero Composition:
 *    - Positioned on the left side, slightly below the vertical center (matching original astronaut reference).
 *    - BUKYA NARESH in signature crimson with wide tracking.
 *    - Horizontal red/white accent rule directly below the signature.
 *    - QUANTITATIVE DEVELOPER and RESEARCH · MARKETS · DATA · ENGINEERING below.
 *    - ENTER CN2.DEV → pill button positioned lower-left with generous breathing room.
 * 3. 100% Theme-Aware:
 *    - Seamlessly transitions between dark mode and light mode when the theme toggle is clicked.
 * 4. Preserves 3D Quantitative Universe:
 *    - Live mathematical implied-volatility manifold and depth grid extending across the right and behind.
 */
export default function EntryHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    router.push("/hub");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-500"
      style={{ minHeight: "100dvh", maxHeight: "100dvh" }}
      role="region"
      aria-label="CN2.DEV quantitative developer gateway"
    >
      {/* ---- 1. Live 3D Mathematical Quantitative Universe (Canvas/WebGL) ---- */}
      <QuantitativeUniverse />

      {/* ---- 2. Subtle Vignette & Scrims (Theme-Aware) ---- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/90 via-background/45 to-transparent transition-colors duration-500"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 z-0 bg-gradient-to-t from-background to-transparent transition-colors duration-500"
        aria-hidden="true"
      />

      {/* ---- 3. Foreground Identity Hierarchy (Grounded Left-Center Layout) ---- */}
      <div className="relative z-10 flex flex-col justify-center min-h-[100dvh] w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20 pb-12 pointer-events-none">
        <div className="max-w-3xl mt-auto mb-6 sm:mb-10">
          {/* Brand Wordmark: CN2.DEV with authentic stencil-slice cut & glowing red square dot */}
          <div className="relative inline-block">
            <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.8rem] 2xl:text-[7.6rem] font-black tracking-tight text-foreground select-none drop-shadow-[0_0_35px_rgba(255,48,48,0.22)]">
              <span className="cn2-sliced-wordmark">CN2</span>
              <span
                className="inline-block w-[0.15em] h-[0.15em] bg-[#ff2a1f] mx-[0.06em] align-baseline mb-[0.05em] shadow-[0_0_16px_#ff2a1f]"
                aria-hidden="true"
              />
              <span className="cn2-sliced-wordmark">DEV</span>
            </h1>
          </div>

          {/* Signature Crimson Name: BUKYA NARESH */}
          <div className="mt-2 sm:mt-3 text-[#ff2a1f] font-mono font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.48em] sm:tracking-[0.52em] uppercase select-none drop-shadow-[0_0_16px_rgba(255,42,31,0.55)]">
            BUKYA NARESH
          </div>

          {/* Thin Horizontal Red-and-White Accent Rule */}
          <div className="mt-3.5 mb-5 sm:mb-6 flex items-center gap-2" aria-hidden="true">
            <div className="h-[2px] w-14 sm:w-20 bg-[#ff2a1f] shadow-[0_0_8px_#ff2a1f]" />
            <div className="h-[1px] w-24 sm:w-36 bg-gradient-to-r from-foreground/35 to-transparent" />
          </div>

          {/* Core Title: QUANTITATIVE DEVELOPER */}
          <h2 className="text-foreground font-sans font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0.12em] uppercase select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            QUANTITATIVE DEVELOPER
          </h2>

          {/* Subtitle / Focus Areas */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-muted flex flex-wrap items-center gap-2 select-none">
            <span>Research</span>
            <span className="text-[#ff2a1f] font-bold">·</span>
            <span>Markets</span>
            <span className="text-cyan-500 dark:text-cyan-400 font-bold">·</span>
            <span>Data</span>
            <span className="text-[#ff2a1f] font-bold">·</span>
            <span>Engineering</span>
          </p>
        </div>

        {/* Preserved Primary CTA: ENTER CN2.DEV → (positioned lower-left with generous breathing room) */}
        <div className="mb-4 sm:mb-8 pointer-events-auto">
          <button
            onClick={handleEnter}
            onKeyDown={handleKeyDown}
            className="enter-cta group inline-flex items-center gap-5 rounded-full border border-[#ff2a1f] bg-surface/75 dark:bg-black/45 backdrop-blur-md pl-7 pr-2 py-2 text-foreground transition-all duration-300 hover:shadow-[0_0_38px_rgba(255,42,31,0.4)] hover:bg-[#ff2a1f]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Enter CN2.DEV professional portfolio"
          >
            <span className="cn2-mono text-[clamp(0.8rem,2.1vw,1rem)] tracking-[0.2em] whitespace-nowrap">
              ENTER CN2.DEV
            </span>
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ff2a1f] transition-all duration-300 group-hover:bg-[#ff2a1f] group-hover:border-[#ff2a1f]"
              aria-hidden="true"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff2a1f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300 group-hover:stroke-black dark:group-hover:stroke-white"
              >
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ---- 4. Right Vertical Telemetry Rail ---- */}
      <aside
        className="hidden md:flex fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 pointer-events-none select-none text-[10px] font-mono text-muted"
        aria-hidden="true"
      >
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a1f] shadow-[0_0_12px_#ff2a1f] animate-pulse" />
          <span className="absolute w-5 h-5 rounded-full border border-[#ff2a1f]/40 animate-ping opacity-75" />
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-[#ff2a1f] via-foreground/20 to-transparent" />

        <div className="[writing-mode:vertical-rl] tracking-[0.25em] text-[9px] uppercase text-cyan-600 dark:text-cyan-400">
          SYSTEMS / VOL-SURFACE
        </div>

        <div className="w-px h-12 bg-line" />

        <div className="flex flex-col gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
        </div>
      </aside>

      {/* ---- 5. Bottom Quantitative Data / Status Telemetry Bar ---- */}
      <div
        className="absolute bottom-4 inset-x-0 z-20 hidden lg:flex items-center justify-between px-10 pointer-events-none select-none text-[10px] font-mono text-muted/70"
        aria-hidden="true"
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-foreground/80 font-bold">KERNEL: DETERMINISTIC</span>
          </span>
          <span className="text-line">|</span>
          <span className="text-cyan-600 dark:text-cyan-400">dS = μS dt + σS dW</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LATENCY: 4.2μs</span>
          <span className="text-line">|</span>
          <span>GRID: PARAMETRIC</span>
          <span className="text-line">|</span>
          <span className="text-[#ff2a1f]">STOCHASTIC FLOW: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
