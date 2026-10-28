"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Enhanced PageTransition — Cinematic, lightweight route transition.
 *
 * Requirements fulfilled:
 * - Ultra-fast, responsive navigation feel (~0.5s).
 * - Dual-accent signal telemetry: signature crimson leading edge with subtle cyan refraction.
 * - Automatic safety timer guarantees the transition overlay unmounts even if
 *   animation events are throttled by the browser in background tabs.
 * - Reduced-motion completely neutralizes the sweep for instantaneous transitions.
 * - Content settles to `transform: none` to ensure fixed/sticky descendants remain stable.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  const [sweep, setSweep] = useState(0);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    // Skip visual sweep if user requested reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let safetyTimer: NodeJS.Timeout | null = null;
    const raf = requestAnimationFrame(() => {
      setSweep((n) => n + 1);
      setSweeping(true);
      // Hard safety timeout: guaranteed dismissal after 650ms regardless of browser throttling
      safetyTimer = setTimeout(() => {
        setSweeping(false);
      }, 650);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <>
      <div key={pathname} className="page-enter">
        {children}
      </div>

      {sweeping && (
        <>
          {/* Subtle perimeter vignette veil — preserves existing curtain-veil test expectation */}
          <div key={`veil-${sweep}`} className="curtain-veil" aria-hidden="true" />

          {/* Primary crimson signal sweep — preserves existing curtain-signal test expectation */}
          <div
            key={`sig-${sweep}`}
            className="curtain-signal"
            aria-hidden="true"
            onAnimationEnd={() => setSweeping(false)}
          />

          {/* Accompanying subtle cyan refraction line along top viewport border */}
          <div
            key={`sig-cyan-${sweep}`}
            className="pointer-events-none fixed top-0 left-0 h-[1.5px] w-[22vw] max-w-[320px] z-[71] animate-[signal-sweep_0.52s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.75) 50%, rgba(56, 189, 248, 0.9) 85%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
