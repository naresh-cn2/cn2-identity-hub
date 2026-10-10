"use client";

import { useTextReactive } from "@/components/providers/cursor-provider";
import { useRef, useEffect, useState } from "react";

export function TextReactive({
  children,
  className = "",
  color = "other",
  as: Component = "span",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  color?: "white" | "red" | "blue" | "dark" | "other";
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a" | "button" | "div";
  id?: string;
  style?: React.CSSProperties;
}) {
  const { influence, rippleColor, cursorX, cursorY } = useTextReactive(id || "", color);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    const Tag = Component;
    return <Tag className="">{children}</Tag>;
  }

  const Tag = Component;

  return (
    <Tag
      className="relative inline-block"
      style={{
        position: "relative",
        display: "inline-block",
        transform: `translate(${cursorX * influence * 8}px, ${cursorY * influence * 8}px)`,
        transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
        clipPath: `circle(${80 + influence * 120}px at ${(cursorX + 1) / 2 * 100}% ${(cursorY + 1) / 2 * 100}%)`,
        WebkitClipPath: `circle(${80 + influence * 120}px at ${(cursorX + 1) / 2 * 100}% ${(cursorY + 1) / 2 * 100}%)`,
      } as React.CSSProperties}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${(cursorX + 1) / 2 * 100}% ${(cursorY + 1) / 2 * 100}%, ${rippleColor} 0%, transparent 70%)`,
          opacity: 0.3 * Math.max(0, influence),
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}