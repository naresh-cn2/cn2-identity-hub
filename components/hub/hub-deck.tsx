"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { HubDestination } from "@/data/hub";

/**
 * HubDeck — the headquarters destination panels.
 *
 * Signature interaction: cursor-responsive depth. On a fine pointer, panels
 * near the cursor lift a few pixels and light their edge, while the panel under
 * the cursor settles flat and reads as selected. Motion is driven by a single
 * pointermove handler writing CSS custom properties — no animation loop, no
 * per-frame React render.
 *
 * Degradation is deliberate:
 *  - `prefers-reduced-motion` → depth disabled, static panels remain.
 *  - coarse pointer (touch)  → depth disabled, tap targets unchanged.
 *  - no pointer events       → static panels remain fully usable.
 *
 * Every panel is a real <Link>. Nothing here is decorative.
 */
export default function HubDeck({ destinations }: { destinations: HubDestination[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    const panels = Array.from(grid.querySelectorAll<HTMLElement>("[data-hub-panel]"));
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pointer) return;
      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (pointer.x - cx) / rect.width;
        const dy = (pointer.y - cy) / rect.height;
        const dist = Math.hypot(dx, dy);
        // Influence fades out beyond ~1.1 panel widths.
        const influence = Math.max(0, 1 - dist / 1.1);
        panel.style.setProperty("--lift", `${(influence * -8).toFixed(2)}px`);
        panel.style.setProperty("--edge", influence.toFixed(3));
      }
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      pointer = null;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      for (const panel of panels) {
        panel.style.setProperty("--lift", "0px");
        panel.style.setProperty("--edge", "0");
      }
    };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerleave", onLeave);
    return () => {
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={gridRef} className="mt-12 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
      {destinations.map((d) => (
        <Link
          key={d.href}
          href={d.href}
          data-hub-panel
          className="group relative flex h-full flex-col bg-background p-6 outline-none transition-colors duration-300 hover:bg-surface focus-visible:bg-surface md:p-7"
          style={{
            transform: "translateY(var(--lift, 0px))",
            transition: "transform 380ms cubic-bezier(0.2, 0.7, 0.2, 1), background-color 300ms",
            boxShadow: "inset 0 0 0 1px rgba(255, 42, 31, calc(var(--edge, 0) * 0.55))",
          }}
        >
          <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r border-t border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden="true"
          />
          <div className="flex items-baseline justify-between gap-3">
            <span className="num-mono text-xs text-muted">{d.code}</span>
            <span className="label-mono text-right text-[9px] leading-tight text-research">
              {d.metric.value}
              <span className="mt-1 block text-muted">{d.metric.label}</span>
            </span>
          </div>

          <span className="display mt-6 block text-xl transition-colors duration-300 group-hover:text-signal group-focus-visible:text-signal md:text-2xl">
            {d.label}
          </span>
          <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{d.blurb}</span>

          <span className="label-mono mt-6 inline-flex items-center gap-2 text-signal">
            ENTER
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
