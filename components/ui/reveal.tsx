"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  id?: string;
}

/**
 * Scroll-driven reveal. Attaches an IntersectionObserver and adds
 * `is-visible` once — CSS in globals.css owns the transition.
 */
export default function Reveal({ children, className = "", delay = 0, clip = false, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`${clip ? "reveal-clip" : "reveal"} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
