"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";

interface CursorPosition {
  x: number;
  y: number;
  intensity: number;
}

interface TextElement {
  id: string;
  rect: DOMRect | null;
  color: "white" | "red" | "blue" | "dark" | "other";
}

interface CursorContextValue {
  cursor: CursorPosition;
  registerTextElement: (id: string, color: TextElement["color"]) => { updateRect: (rect: DOMRect) => void; unregister: () => void };
  getTextElementRect: (id: string) => DOMRect | null;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0.5, y: 0.5, intensity: 0 });
  const textElementsRef = useRef<Map<string, TextElement>>(new Map());
  const reducedMotionRef = useRef(false);

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track cursor position
  useEffect(() => {
    if (reducedMotionRef.current) return;

    const handleMove = (e: MouseEvent) => {
      setCursor({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        intensity: 1,
      });
    };

    const handleLeave = () => {
      setCursor(prev => ({ ...prev, intensity: 0 }));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Register text element - returns updater and unregister function
  const registerTextElement = useCallback((id: string, color: TextElement["color"]) => {
    textElementsRef.current.set(id, { id, rect: null, color });
    
    const updateRect = (rect: DOMRect) => {
      const existing = textElementsRef.current.get(id);
      if (existing) {
        existing.rect = rect;
      }
    };
    
    const unregister = () => {
      textElementsRef.current.delete(id);
    };
    
    return { updateRect, unregister };
  }, []);

  const getTextElementRect = useCallback((id: string) => {
    return textElementsRef.current.get(id)?.rect || null;
  }, []);

  return (
    <CursorContext.Provider value={{ cursor, registerTextElement, getTextElementRect }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

export function useTextReactive(id: string, color: TextElement["color"] = "other") {
  const { cursor, registerTextElement, getTextElementRect } = useCursor();
  const elementRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const registrationRef = useRef<{ updateRect: (rect: DOMRect) => void; unregister: () => void } | null>(null);

  // Register on mount
  useEffect(() => {
    registrationRef.current = registerTextElement(id, color);
    return () => {
      registrationRef.current?.unregister();
    };
  }, [id, color, registerTextElement]);

  // Update rect on layout changes
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !registrationRef.current) return;

    const updateRect = () => {
      if (elementRef.current) {
        registrationRef.current?.updateRect(elementRef.current.getBoundingClientRect());
      }
    };

    updateRect();
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [id]);

  // Set mounted after registration - using lazy initialization to avoid setState in effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Get rect from context (avoids ref during render)
  const elementRect = getTextElementRect(id);

  // Calculate influence based on cursor proximity
  const centerX = elementRect ? (elementRect.left + elementRect.right) / 2 / window.innerWidth : 0.5;
  const centerY = elementRect ? (elementRect.top + elementRect.bottom) / 2 / window.innerHeight : 0.5;
  
  const dx = cursor.x - centerX;
  const dy = cursor.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Influence falls off with distance
  const maxInfluenceDistance = 0.3; // 30% of viewport
  const influence = Math.max(0, 1 - distance / maxInfluenceDistance) * cursor.intensity;

  // Determine ripple color based on text color
  const getRippleColor = useMemo(() => {
    switch (color) {
      case "white": return "rgba(230, 57, 42, 0.4)"; // red for white text
      case "red": return "rgba(255, 255, 255, 0.5)"; // white for red text
      case "blue": return "rgba(255, 200, 100, 0.5)"; // warm for blue text
      case "dark": return "rgba(255, 255, 255, 0.3)"; // light for dark text
      default: return "rgba(230, 57, 42, 0.3)"; // default red
    }
  }, [color]);

  return {
    ref: elementRef,
    influence: mounted ? influence : 0,
    rippleColor: mounted ? getRippleColor : "",
    cursorX: cursor.x - 0.5, // -0.5 to 0.5
    cursorY: cursor.y - 0.5, // -0.5 to 0.5
  };
}