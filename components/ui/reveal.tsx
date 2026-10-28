"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  id?: string;
}

/**
 * Enhanced Reveal — High-performance scroll-driven reveal.
 *
 * Safeguards:
 * - Content is NEVER permanently invisible:
 *   1. Elements already inside the viewport upon mount reveal immediately.
 *   2. Hard safety fallback timer guarantees visibility even if IO is interrupted.
 *   3. prefers-reduced-motion bypasses transitions and reveals content instantly.
 * - Zero scroll-hijacking or forced scrolling: natural browser physics are 100% preserved.
 * - Preserves existing CSS `.reveal`, `.reveal-clip`, and `.is-visible` class contracts.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  clip = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: reveal immediately with no delay
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-visible");
      return;
    }

    // Fallback if IntersectionObserver is unsupported in runtime
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    // Check if element is already in the viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );

    io.observe(el);

    // Hard fallback: guarantees content reveals within 1.2s regardless of layout or observer state
    const fallbackTimer = setTimeout(() => {
      if (el && !el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
    }, 1200 + delay);

    return () => {
      io.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [delay]);

  return (
    <div
      id={id}
      ref={ref}
      className={`${clip ? "reveal-clip" : "reveal"} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
