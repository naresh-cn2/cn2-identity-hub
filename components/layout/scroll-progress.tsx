"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollProgress — a hairline film-reel indicator across the top edge.
 *
 * A signal-to-research gradient scales with document progress. It sits
 * above the navbar, updates on rAF-throttled scroll only, is hidden on the
 * cinematic entry page (nothing to scroll there) and in print.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 8 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
      bar.style.opacity = p > 0.001 ? "1" : "0";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] print:hidden">
      <div ref={barRef} className="scroll-progress-bar h-[2px] origin-left" />
    </div>
  );
}
