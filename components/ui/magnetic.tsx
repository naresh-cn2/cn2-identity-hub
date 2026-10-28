"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";

interface MagneticProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
}

/**
 * Enhanced Magnetic — Subtle, premium magnetic pull for key controls.
 *
 * Requirements fulfilled:
 * - Subtle, restrained displacement (default 5px, never aggressive).
 * - Smooth cubic-bezier spring decay on pointer release.
 * - Disabled on touch pointers and respects prefers-reduced-motion.
 * - Accessible keyboard navigation and visible focus rings unaffected.
 */
export default function Magnetic({
  children,
  href,
  external,
  onClick,
  className = "",
  strength = 5,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(hover: none)").matches) return;

      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `translate3d(${(dx / rect.width) * strength}px, ${(dy / rect.height) * strength}px, 0)`;
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  const shared = {
    className: `inline-block will-change-transform ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...shared}
        >
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" onClick={onClick} {...shared}>
      {children}
    </button>
  );
}
