"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Cinematic page transition (spec §16).
 *
 * Deliberately light-touch so navigation always feels fast: incoming content
 * cross-fades via `page-enter`, and a red signal bar travels the viewport once
 * per route change. The overlay is pointer-events-none, the animation is short
 * (~0.6s), and reduced-motion neutralises both globally. The content wrapper
 * settles to `transform: none` so it never creates a containing block that could
 * disturb fixed/sticky descendants.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setSweep((n) => n + 1);
  }, [pathname]);

  return (
    <>
      <div key={pathname} className="page-enter">
        {children}
      </div>
      {sweep > 0 && <div key={sweep} className="curtain-signal" aria-hidden="true" />}
    </>
  );
}
