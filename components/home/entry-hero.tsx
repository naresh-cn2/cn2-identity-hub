"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * EntryHero — the cinematic gateway experience.
 *
 * Uses the provided hero image as the full-bleed background. The image
 * already contains the CN2.DEV wordmark, BUKYA NARESH, divider, and
 * tagline, so no coded hero typography is rendered.
 *
 * The ENTER CN2.DEV button is preserved and navigates to /about.
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

  // CTA click handler — navigate to /about (professional portfolio)
  const handleEnter = () => {
    router.push("/about");
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
      {/* ---- Background image: the provided hero with baked-in typography ---- */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/cn2-hero-final.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ---- ENTER CN2.DEV button — preserved, positioned bottom-left ---- */}
      <main
        className="relative h-screen w-full flex items-end justify-start px-6 lg:px-12 pb-16"
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