"use client";

import { useCallback, useRef } from "react";

/**
 * TiltCard — restrained 3D depth for standalone cards.
 *
 * The card leans toward the pointer (a few degrees per axis) and a soft
 * specular glare tracks the contact point, then everything settles flat on
 * leave. Mouse pointers only — touch and coarse-pointer devices keep the
 * untouched card — and reduced motion short-circuits to the static state.
 * Pure transforms: the GPU carries it, layout never moves.
 */
export default function TiltCard({
  children,
  className = "",
  max = 4.5,
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
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
