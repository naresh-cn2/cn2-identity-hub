"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * PremiumLayer — additive polish, never a redesign.
 *
 * Keeps every existing component and layout intact. Adds a quiet 3D
 * wireframe object, a pointer-following halo and a fine grain veil behind
 * content. Document routes (/cv, /resume) and the portrait-only /identity
 * route keep their own treatments. Reduced-motion gets a single still frame.
 */
export default function PremiumLayer() {
  const pathname = usePathname() ?? "/";
  const excluded =
    pathname.startsWith("/cv") ||
    pathname.startsWith("/resume") ||
    pathname.startsWith("/identity");

  useEffect(() => {
    if (excluded) return;
    const root = document.documentElement;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("cn2-premium-on");
    if (!fine || reduced) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const paint = () => {
      raf = 0;
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      root.style.setProperty("--premium-x", x.toFixed(3));
      root.style.setProperty("--premium-y", y.toFixed(3));
      if (Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002) {
        raf = requestAnimationFrame(paint);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("cn2-premium-on");
      root.style.removeProperty("--premium-x");
      root.style.removeProperty("--premium-y");
    };
  }, [excluded]);

  if (excluded) return null;

  return (
    <div className="premium-layer" aria-hidden="true">
      <span className="premium-halo" />
      <span className="premium-grain" />
      <div className="premium-object">
        <span className="premium-orbit orbit-a" />
        <span className="premium-orbit orbit-b" />
        <span className="premium-orbit orbit-c" />
        <div className="premium-cube">
          <span className="premium-face face-1" />
          <span className="premium-face face-2" />
          <span className="premium-face face-3" />
          <span className="premium-face face-4" />
          <span className="premium-face face-5" />
          <span className="premium-face face-6" />
        </div>
        <span className="premium-core" />
      </div>
    </div>
  );
}
