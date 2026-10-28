"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import QuantitativeUniverse from "@/components/home/quantitative-universe";

/**
 * EntryHero — Cinematic Quantitative Gateway.
 *
 * 100% Code-Generated Experience:
 * - Completely eliminates photographic raster backgrounds (no astronaut/portal images).
 * - Implements a live 3D parametric mathematical universe:
 *   Implied Volatility surface, receding coordinate depth grid, Brownian motion particles.
 * - Identity is rendered as pure, responsive HTML/CSS typography:
 *   CN2.DEV, BUKYA NARESH (crimson), QUANTITATIVE DEVELOPER, and pillar descriptors.
 * - Retains existing navigation and the ENTER CN2.DEV button leading to /hub.
 */
export default function EntryHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // CTA click handler — enter the platform at the headquarters (/hub)
  const handleEnter = () => {
    router.push("/hub");
  };

  // Keyboard accessibility for CTA
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-white"
      style={{ minHeight: "100dvh", maxHeight: "100dvh" }}
      role="region"
      aria-label="CN2.DEV quantitative developer gateway"
    >
      {/* ---- 1. Live 3D Mathematical Quantitative Universe (Canvas/WebGL) ---- */}
      <QuantitativeUniverse />

      {/* ---- 2. Subtle Vignette & Gradient Illumination Gradients ---- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-0 bg-gradient-to-t from-[#030712] to-transparent"
        aria-hidden="true"
      />

      {/* ---- 3. Foreground Identity Hierarchy (100% Coded HTML/CSS) ---- */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100dvh-80px)] w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-20 pb-16 pointer-events-none">
        <div className="max-w-3xl">
          {/* Brand Wordmark: CN2.DEV */}
          <div className="relative inline-block">
            <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.8rem] font-black tracking-tight text-white select-none drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
              CN2<span className="text-[#00f0ff]">.</span>DEV
            </h1>
          </div>

          {/* Signature Crimson Name: BUKYA NARESH */}
          <div className="mt-2 sm:mt-3 text-[#ff2a1f] font-mono font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.38em] uppercase select-none drop-shadow-[0_0_16px_rgba(255,42,31,0.5)]">
            BUKYA NARESH
          </div>

          {/* Core Title: QUANTITATIVE DEVELOPER */}
          <h2 className="mt-5 sm:mt-7 text-white font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            QUANTITATIVE DEVELOPER
          </h2>

          {/* Subtitle / Focus Areas */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-slate-300/65 flex flex-wrap items-center gap-2 select-none">
            <span>Research</span>
            <span className="text-[#ff2a1f] font-bold">·</span>
            <span>Markets</span>
            <span className="text-cyan-400 font-bold">·</span>
            <span>Data</span>
            <span className="text-[#ff2a1f] font-bold">·</span>
            <span>Engineering</span>
          </p>

          {/* Preserved Primary CTA: ENTER CN2.DEV → */}
          <div className="mt-9 sm:mt-12 pointer-events-auto">
            <button
              onClick={handleEnter}
              onKeyDown={handleKeyDown}
              className="enter-cta group inline-flex items-center gap-5 rounded-full border border-[#ff2a1f] bg-black/45 backdrop-blur-md pl-7 pr-2 py-2 text-white transition-all duration-300 hover:shadow-[0_0_38px_rgba(255,42,31,0.4)] hover:bg-[#ff2a1f]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                  className="transition-colors duration-300 group-hover:stroke-black"
                >
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---- 4. Right Vertical Telemetry Rail (matching original design aesthetic) ---- */}
      <aside
        className="hidden md:flex fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 pointer-events-none select-none text-[10px] font-mono text-white/40"
        aria-hidden="true"
      >
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a1f] shadow-[0_0_12px_#ff2a1f] animate-pulse" />
          <span className="absolute w-5 h-5 rounded-full border border-[#ff2a1f]/40 animate-ping opacity-75" />
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-[#ff2a1f] via-white/20 to-transparent" />

        <div className="[writing-mode:vertical-rl] tracking-[0.25em] text-[9px] uppercase text-cyan-400/70">
          SYSTEMS / 3D VOL-SURFACE
        </div>

        <div className="w-px h-12 bg-white/10" />

        <div className="flex flex-col gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        </div>
      </aside>

      {/* ---- 5. Bottom Quantitative Data / Status Telemetry Bar ---- */}
      <div
        className="absolute bottom-4 inset-x-0 z-20 hidden lg:flex items-center justify-between px-10 pointer-events-none select-none text-[10px] font-mono text-white/35"
        aria-hidden="true"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">KERNEL: DETERMINISTIC</span>
          </span>
          <span>|</span>
          <span className="text-cyan-400/70">dS = μS dt + σS dW</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LATENCY: 4.2μs</span>
          <span>GRID: 3D PARAMETRIC</span>
          <span className="text-[#ff2a1f]/80">STOCHASTIC FLOW: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
