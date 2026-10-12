"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CinematicLayers from "@/components/home/cinematic-layers";

/**
 * EntryHero — the cinematic gateway experience.
 *
 * Uses the provided hero image as the full-bleed background. The image
 * already contains the CN2.DEV wordmark, BUKYA NARESH, divider, and
 * tagline, so no coded hero typography is rendered.
 *
 * CinematicLayers adds theme-aware ambient lighting and restrained motion
 * (portal glow, drifting particles, network pulses, floor sweep, cursor
 * parallax + ripple) on top of the image without redrawing its content.
 * All effect layers are pointer-events:none, so the ENTER CN2.DEV button
 * and the global navbar stay fully interactive.
 *
 * The ENTER CN2.DEV button is preserved and navigates to /hub — the digital
 * headquarters. The entrance is the gateway, not the website: /hub is the
 * indexed wayfinding layer that routes visitors to every destination.
 * Navigation is handled by the global Navbar component.
 */
export default function EntryHero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

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

  if (!mounted) {
    return (
      <div
        className="relative min-h-screen w-full overflow-hidden bg-black"
        style={{ minHeight: "100dvh" }}
        role="img"
        aria-label="CN2.DEV cinematic entry gateway"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/cn2-hero-final.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ minHeight: "100dvh", maxHeight: "100dvh" }}
      role="main"
    >
      {/* ---- Background image: the provided hero with baked-in typography ----
           The zoom wrapper carries the slow breathing scale, the stage carries
           perspective, and .cn2-hero-img carries the pointer parallax + micro
           3D tilt. Layers are separated so no transform ever fights another. */}
      <div className="cn2-hero-stage absolute inset-0" aria-hidden="true">
        <div className="cn2-hero-zoom absolute inset-0">
          <div
            className="cn2-hero-img absolute inset-0"
            style={{
              backgroundImage: "url('/images/cn2-hero-final.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      {/* ---- Theme-aware ambient lighting + restrained cinematic motion ---- */}
      <CinematicLayers />

      {/* ---- ENTER CN2.DEV button — preserved, positioned bottom-left ---- */}
      <main
        className="relative z-10 h-screen w-full flex items-end justify-start px-6 lg:px-12 pb-16"
        style={{ maxHeight: "100dvh" }}
      >
        <div className="pointer-events-auto">
          <button
            onClick={handleEnter}
            onKeyDown={handleKeyDown}
            className="enter-cta group inline-flex items-center gap-5 rounded-full border border-[#ff2a1f] bg-transparent pl-7 pr-2 py-2 text-white transition-all duration-300 hover:shadow-[0_0_38px_rgba(255,42,31,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
      </main>
    </div>
  );
}
