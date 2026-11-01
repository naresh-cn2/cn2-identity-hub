"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * MotionEngine — the scroll coordinator of the CN2 Motion Design System.
 *
 * Publishes two CSS custom properties on <html> once per frame while the
 * page is in motion; the rest of the system consumes them declaratively,
 * so no component ever writes styles into another component's DOM:
 *
 *   --cn2-shift  background-parallax offset in px. Elements tagged
 *                [data-cn2-depth] translate by `shift * their own
 *                --cn2-depth-k factor`, so the ambient layers drift slowly
 *                against the scrolling content — the distant-background
 *                depth cue from the about page, applied site-wide.
 *
 *   --cn2-v      smoothed scroll velocity, 0..1. [data-cn2-diffuse]
 *                layers blur by `v * 3.5px`: the background pulls out of
 *                focus while the page moves and settles sharp when it
 *                rests — the focus-blur transition, applied to background
 *                layers only so text and controls always stay crisp.
 *
 * Rules honoured here:
 *  - Native scrolling is never touched: no preventDefault, no scroll
 *    capture, no wheel listeners — passive scroll + one rAF loop that
 *    sleeps the moment everything has settled and wakes on the next tick.
 *  - prefers-reduced-motion and small screens: both properties are pinned
 *    neutral and the loop never starts; a live toggle of the preference
 *    re-neuters the properties immediately.
 *  - Fast attack / slow release on the velocity signal: the defocus snaps
 *    on while scrolling and eases off when the page comes to rest.
 *
 * Contract for [data-cn2-depth] (enforced by review, not runtime):
 * decorative background layers only. The transform makes the element the
 * containing block for position:fixed descendants — never tag a wrapper
 * that holds overlays, dialogs or interactive chrome. Fixed overlays live
 * portaled on <body> (see CertificateViewer), so they stay unaffected.
 */
export default function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const neutral = () => {
      root.style.setProperty("--cn2-shift", "0px");
      root.style.setProperty("--cn2-v", "0");
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.innerWidth < 768;

    if (reduced.matches || small) {
      neutral();
      return;
    }

    let raf = 0;
    let idle = 0;
    let vel = 0; // smoothed |velocity| in px/s
    let shift = 0; // current parallax offset in px
    let lastY = window.scrollY;
    // Start already seated at the correct offset so a restored scroll
    // position never slides the background into place on load.
    let target = -Math.min(window.scrollY * 0.045, 46);
    shift = target;
    let lastT = performance.now();

    const paint = (v: number) => {
      root.style.setProperty("--cn2-shift", `${shift.toFixed(2)}px`);
      root.style.setProperty("--cn2-v", v.toFixed(3));
    };

    const tick = (now: number) => {
      raf = 0;
      const y = window.scrollY;
      const dt = Math.min(0.25, Math.max(0.001, (now - lastT) / 1000));
      lastT = now;
      const raw = Math.abs(y - lastY) / dt;
      lastY = y;

      // fast attack (0.4), slow release (0.09) — defocus snaps on, eases off
      vel += (raw - vel) * (raw > vel ? 0.4 : 0.09);
      if (vel < 6) vel = 0;

      // the background drifts at most 46px behind the first ~1000px of scroll
      target = -Math.min(y * 0.045, 46);
      shift += (target - shift) * 0.14;

      if (vel === 0 && Math.abs(target - shift) < 0.1) {
        shift = target;
        paint(0);
        // settle, then sleep — a later passive scroll event wakes the loop
        if (++idle > 8) return;
      } else {
        idle = 0;
        paint(Math.min(1, vel / 2400));
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        idle = 0;
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onPrefChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        neutral();
      } else {
        wake();
      }
    };

    paint(0);
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    reduced.addEventListener("change", onPrefChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      reduced.removeEventListener("change", onPrefChange);
      neutral();
    };
  }, [pathname]);

  return null;
}
