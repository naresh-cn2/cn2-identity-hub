"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { useSpring, useMotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CinematicHumanFigure from "@/components/viz/cinematic-human-figure";

/**
 * EntryHero — the cinematic gateway experience.
 * 
 * A single-screen 3D environment with a glowing portal and anonymous human figure.
 * Fits the viewport with no required scrolling. The "ENTER CN2.DEV" CTA navigates
 * to the professional portfolio experience.
 * 
 * Dark theme: black/navy portal, white typography, electric blue lighting, restrained red accent.
 * Light theme: ice-blue surfaces, adapted portal visuals, proper contrast.
 */
export default function EntryHero() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  // Scene state
  const ref = useRef<THREE.Group>(null);
  const rotate = useRef(0);
  const portalPulse = useRef(0);

  // Color palettes
  const portalColorDark = "#0a0e17";
  const portalColorLight = "#e2e8f0";
  const accentColorDark = "#e6392a"; // red accent
  const accentColorLight = "#e6392a";
  const blueLightDark = "#1d4ed8";
  const blueLightLight = "#3b82f6";

  // Pulse animation for portal
  useEffect(() => {
    portalPulse.current = 0;
    const animate = () => {
      portalPulse.current += 0.016;
      animate();
    };
    animate();
  }, []);

  // Rotate the portal group
  useEffect(() => {
    const raf = requestAnimationFrame(function loop() {
      rotate.current += 0.008;
      if (ref.current) {
        ref.current.rotation.y = Math.sin(rotate.current) * 0.3;
      }
      requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // CTA click handler
  const handleEnter = () => {
    // Brief cinematic transition before navigating
    setTimeout(() => {
      router.push("/about");
    }, 300);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden bg-black dark:bg-gray-900"
      style={{ minHeight: window.innerHeight + 'px' }}
    >
      {/* Portal scene */}
      <div
        ref={ref}
        className="relative w-full h-full"
        style={{
          background: dark ? portalColorDark : portalColorLight,
        }}
      >
        {/* Portal ring */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "50% 50% 30% 30%",
            background: radialGradient(dark ? "rgba(29,78,216,0.4)" : "rgba(59,130,246,0.3)"),
            animation: "portalPulse 3s ease-in-out infinite",
          }}
        />
        
        {/* Grid network lines in background */}
        <div
          className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden"
          style={{
            pointerEvents: "none",
          }}
        >
          {renderGridLines(dark)}
        </div>

        {/* Human figure integrated into the field */}
        <CinematicHumanFigure theme={theme} className="absolute bottom-0 left-1/2 -translate-x-1/2" />

        {/* Glowing portal core */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0.6 + Math.sin(portalPulse.current) * 0.2,
            background: radialGradient(
              dark 
                ? "rgba(230,57,42,0.15) 0%, transparent 70%" 
                : "rgba(59,130,246,0.1) 0%, transparent 70%"
            ),
          }}
        >
          <div
            className="w-20 h-20 rounded-full border-2 border-signal/50 blur-[20px]"
            style={{
              width: "20vw",
              height: "20vw",
              borderColor: dark ? "#e6392a" : "#e6392a",
            }}
          />
        </div>
      </div>

      {/* Legibility scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: linearGradient(
            "to top",
            "rgba(0,0,0,0.8) 0%",
            "rgba(0,0,0,0.4) 38%",
            "transparent 64%"
          ),
          linearGradient(
            "to right",
            "rgba(0,0,0,0.5) 0%",
            "transparent 46%"
          ),
        }}
      />

      {/* Content overlay */}
      <div
        className="relative z-10 min-h-full w-full flex flex-col items-center justify-center px-4 py-12 text-center"
      >
        {/* Brand lockup */}
        <div className="mb-12 pointer-events-auto">
          <h1 className="display text-[clamp(2.8rem,10vw,5rem)] font-bold tracking-tight md:text-4xl lg:text-5xl text-white dark:text-gray-50">
            CN2.DEV
          </h1>
          <p className="mt-2 text-[clamp(0.8rem,3vw,1.2rem)] text-gray-300 dark:text-gray-400">
            BUKYA NARESH
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-8 pointer-events-auto">
          <button
            onClick={handleEnter}
            className="enter-cta bg-signal text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-signal/30"
            aria-label="Enter CN2.DEV portfolio"
          >
            ENTER CN2.DEV →
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pointer-events-none lg:hidden transition-opacity duration-300"
        aria-hidden="true"
      >
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}

/* ---- Animated radial gradient utility ---- */
function radialGradient(colors: string) {
  return `radial-gradient(ellipse at 30% 20%, ${colors})`;
}

/* ---- Grid network lines ---- */
function renderGridLines(dark: boolean) {
  const color = dark ? "rgba(24,44,92,0.1)" : "rgba(100,115,135,0.08)";
  const lines = [];
  const size = 100;
  
  // Horizontal lines
  for (let i = 0; i < window.innerHeight; i += size) {
    lines.push(
      <div
        key={i}
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--grid-line)]"
        style={{ bottom: i + 'px' }}
      />
    );
  }
  
  // Vertical lines
  for (let i = 0; i < window.innerWidth; i += size) {
    lines.push(
      <div
        key={i}
        className="absolute top-0 bottom-0 left-0 w-px bg-[var(--grid-line)]"
        style={{ left: i + 'px' }}
      />
    );
  }
  
  return lines;
}

/* ---- Keyframes ---- */
const linearGradient = (direction: string, colors: string[]) => {
  return `linear-gradient(${direction}, ${colors.join(", ")})`;
};