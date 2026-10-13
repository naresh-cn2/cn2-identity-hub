"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * CursorLight — a soft studio glow that trails the pointer across the page.
 *
 * The light is fixed to the viewport at the lowest layer (above the page
 * background, behind every surface), so it reads as ambience being carried
 * through the room rather than a cursor replacement. Mouse pointers only;
 * reduced motion and the cinematic entry page opt out entirely. The chase
 * is a CSS transition on transform — no per-frame scripting.
 */
export default function CursorLight() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);

  // Routes that carry their own full treatments stay untouched — same
  // exclusion list SiteAmbience uses (baked hero, portal, cosmos, portrait).
  const untouched = pathname === "/" || pathname === "/hub" || pathname === "/about" || pathname === "/identity";

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [pathname]);

  if (untouched) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <div ref={dotRef} className="cursor-light-dot" />
    </div>
  );
}
