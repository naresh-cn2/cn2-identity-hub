"use client";

import { useEffect, useRef } from "react";

/**
 * CursorPhoton — Subtle, hardware-accelerated ambient cursor illumination for desktop.
 *
 * Implements a restrained, quantitative lighting halo:
 * - Low-intensity cyan radiance (rgba(0, 240, 255, 0.04)) with smooth physics interpolation.
 * - Idles automatically when the pointer is stationary, consuming 0% idle CPU.
 * - Strictly pointer-events-none with zero impact on text selection, clicks, or forms.
 * - Completely inactive on touch/coarse devices and respects prefers-reduced-motion.
 * - Updates CSS transform / custom properties directly, avoiding React state re-renders.
 */
export default function CursorPhoton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount on desktop fine-pointer devices with motion enabled
    const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isMoving = false;
    let isVisible = false;
    let animId: number | null = null;
    let idleTimeout: NodeJS.Timeout | null = null;

    const render = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Smooth lerp interpolation
      currentX += dx * 0.14;
      currentY += dy * 0.14;

      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      // If close enough to target, halt render loop to save battery
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animId = requestAnimationFrame(render);
      } else {
        isMoving = false;
        animId = null;
      }
    };

    const startLoop = () => {
      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        glow.style.opacity = "1";
        // Immediate jump on first entry to avoid gliding from off-screen
        if (currentX === -500) {
          currentX = targetX;
          currentY = targetY;
        }
      }

      startLoop();

      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        // Softly dim after 3 seconds of stillness
        if (glow) glow.style.opacity = "0.45";
      }, 3000);
    };

    const handlePointerLeave = () => {
      isVisible = false;
      if (glow) glow.style.opacity = "0";
      if (idleTimeout) clearTimeout(idleTimeout);
    };

    const handlePointerEnter = () => {
      isVisible = true;
      if (glow) glow.style.opacity = "1";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      if (animId) cancelAnimationFrame(animId);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cursor-photon-layer pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 240, 255, 0.045) 0%, rgba(14, 116, 244, 0.02) 42%, transparent 72%)",
        }}
      />
    </div>
  );
}

