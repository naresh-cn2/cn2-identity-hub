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
 * Subtle magnetic hover — element drifts toward the cursor within a small
 * radius and settles back. Disabled for touch pointers and reduced motion.
 */
export default function Magnetic({
  children,
  href,
  external,
  onClick,
  className = "",
  strength = 6,
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
      el.style.transform = `translate(${(dx / rect.width) * strength}px, ${(dy / rect.height) * strength}px)`;
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }, []);

  const shared = {
    className: `inline-block transition-transform duration-300 ease-out will-change-transform ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    if (external) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" {...shared}>
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
