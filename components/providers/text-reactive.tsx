"use client";

import { useEffect, useRef, useState } from "react";

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

let globalPointer: PointerState = { x: 0, y: 0, active: false };
let isTracking = false;

export function applyTextRipple(element: HTMLElement | null) {
  if (!element) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const isNear = 
      x >= -80 && x <= rect.width + 80 &&
      y >= -80 && y <= rect.height + 80;
    
    if (isNear) {
      element.style.setProperty("--ripple-x", `${x}px`);
      element.style.setProperty("--ripple-y", `${y}px`);
      element.classList.add("water-ripple-active");
    } else {
      element.classList.remove("water-ripple-active");
    }
  };

  element.addEventListener("mousemove", handleMouseMove, { passive: true });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("water-ripple-active");
  });
}

export function initGlobalCursorTracker() {
  if (isTracking) return;
  isTracking = true;

  const handleMove = (e: MouseEvent) => {
    globalPointer = { x: e.clientX, y: e.clientY, active: true };
    document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
  };

  const handleLeave = () => {
    globalPointer = { ...globalPointer, active: false };
  };

  window.addEventListener("mousemove", handleMove, { passive: true });
  window.addEventListener("mouseleave", handleLeave);
}

export function useTextRipple() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const isNear = 
        x >= -80 && x <= rect.width + 80 &&
        y >= -80 && y <= rect.height + 80;
      
      if (isNear) {
        setPosition({ x, y });
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", () => setIsActive(false));

    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { ref: elementRef, isActive, position };
}

export function getGlobalPointer(): PointerState {
  return globalPointer;
}