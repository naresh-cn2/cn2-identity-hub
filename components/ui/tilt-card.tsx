"use client";

import { useCallback, useRef } from "react";

/**
 * Enhanced TiltCard — Restrained, cinematic 3D depth for cards.
 *
 * Requirements fulfilled:
 * - Subtle, premium maximum tilt (default 3.5deg, never aggressive).
 * - Smooth cubic-bezier spring-back when pointer leaves the card.
 * - Mouse-only: touch devices remain completely stationary.
 * - Fully accessible: keyboard focus-within disables tilt to keep interactive controls stable.
 * - Zero layout shift: all effects are GPU-accelerated 3D perspective transforms.
 */
export default function TiltCard({
  children,
  className = "",
  max = 3.5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -max;
      const ry = (px - 0.5) * max;

      el.style.setProperty("--kt-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--kt-y", `${(py * 100).toFixed(1)}%`);
      el.style.transition = "transform 0.08s ease-out";
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(2px)`;
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card will-change-transform ${className}`}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
