"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div
        key={pathname}
        className={`page-enter ${entering ? "is-entering" : ""}`}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal transition-transform duration-500 ${
          entering ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </>
  );
}
