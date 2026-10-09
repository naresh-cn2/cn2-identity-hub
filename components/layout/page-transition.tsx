"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Cinematic page transition (spec §16).
 *
 * Deliberately light-touch so navigation always feels fast: incoming content
 * cross-fades via `page-enter`, and a thin red signal bar sweeps the top edge
 * of the viewport once per route change. The overlay is pointer-events-none,
 * the animation is short (~0.6s), reduced-motion neutralises it globally, and
 * the bar unmounts as soon as its animation ends so it can never linger,
 * duplicate, or leak across routes. The content wrapper settles to
 * `transform: none` so it never creates a containing block that could disturb
 * fixed/sticky descendants.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  const [sweep, setSweep] = useState(0);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setSweep((n) => n + 1);
    setSweeping(true);
    // Cleanup on re-run: reset sweeping so the old curtain-signal unmounts
    return () => setSweeping(false);
  }, [pathname]);

  return (
    <>
      <div key={pathname} className="page-enter">
        {children}
      </div>
      {sweeping && (
        <div
          key={sweep}
          className="curtain-signal"
          aria-hidden="true"
          onAnimationEnd={() => setSweeping(false)}
        />
      )}
    </>
  );
}
