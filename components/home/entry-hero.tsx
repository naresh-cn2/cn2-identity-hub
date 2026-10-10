"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * EntryHero — the cinematic gateway experience using the reference image.
 * 
 * Full-screen dark environment with the provided image as background.
 * HTML overlays for brand, slogan, and CTA.
 * Navigation is handled by the global Navbar component.
 * 
 * Dark theme: uses the image as-is (dark cinematic environment)
 * Light theme: applies a treatment to maintain legibility while preserving composition
 */
export default function EntryHero() {
  const router = useRouter();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // Initialize state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);
    setMounted(true);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track pointer for subtle parallax
  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      setPointer({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

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
    // SSR fallback — prevent hydration mismatch
    return (
      <div
        className="min-h-screen relative overflow-hidden bg-black"
        style={{ minHeight: "100dvh" }}
        role="img"
        aria-label="CN2.DEV cinematic entry gateway"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/cn2-entry-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ minHeight: "100dvh" }}
      role="main"
    >
      {/* ---- Background image layer ---- */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/cn2-entry-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Subtle parallax on desktop
          transform: reducedMotion
            ? "none"
            : `translate(${(pointer.x - 0.5) * 30}px, ${(pointer.y - 0.5) * 20}px) scale(1.02)`,
          transition: reducedMotion ? "none" : "transform 0.3s ease-out",
        }}
      />

      {/* ---- Light mode treatment: subtle overlay to maintain contrast ---- */}
      {!dark && (
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: "linear-gradient(180deg, rgba(238,242,249,0.85) 0%, rgba(228,234,245,0.7) 50%, rgba(238,242,249,0.85) 100%)",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* ---- Dark mode: subtle vignette for depth ---- */}
      {dark && (
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(29,78,216,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(230,57,42,0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      )}

      {/* ---- Main content: brand, slogan, CTA ---- */}
      <main
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 text-center"
        style={{ minHeight: "100dvh" }}
      >
        {/* Brand lockup */}
        <div className="mb-10 lg:mb-16 pointer-events-auto">
          <h1 className="display text-[clamp(3rem,12vw,7rem)] font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            CN2.DEV
          </h1>
          <p className="mt-3 label-mono text-[clamp(0.9rem,3vw,1.3rem)] text-signal tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            BUKYA NARESH
          </p>
        </div>

        {/* Slogan */}
        <div className="mb-12 lg:mb-16 pointer-events-auto max-w-[900px] px-4">
          <p className="label-mono text-[clamp(0.9rem,3.5vw,1.4rem)] text-white/90 tracking-wider leading-normal drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
            WHERE IMAGINATION BECOMES REALITY
          </p>
        </div>

        {/* Primary CTA: ENTER CN2.DEV */}
        <div className="mb-8 lg:mb-12 pointer-events-auto">
          <button
            onClick={handleEnter}
            onKeyDown={handleKeyDown}
            className="enter-cta inline-flex items-center justify-center gap-3 bg-signal text-black px-10 py-4 rounded-full font-bold text-[clamp(1rem,3vw,1.25rem)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(230,57,42,0.4)] hover:shadow-signal/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Enter CN2.DEV professional portfolio"
            style={{
              boxShadow: "0 0 30px rgba(230,57,42,0.25), 0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            ENTER CN2.DEV
            <span aria-hidden="true" className="transition-transform duration-300">→</span>
          </button>
        </div>

        {/* Subtle scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce"
          style={{ animationDuration: reducedMotion ? "0.01ms" : "2.5s" }}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </main>

      <style jsx>{`
        .enter-cta:hover span {
          transform: translateX(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}