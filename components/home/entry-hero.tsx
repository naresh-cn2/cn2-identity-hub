"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * EntryHero — the cinematic gateway experience matching the reference image.
 * 
 * Full-screen dark environment with the provided image as background.
 * HTML overlays for brand, slogan, and CTA aligned to the LEFT,
 * preserving the character and portal on the RIGHT side of the image.
 * Navigation is handled by the global Navbar component (single source).
 * Cinematic effects: portal glow, red ring, animated smoke, reflective floor, network lines.
 */
export default function EntryHero() {
  const router = useRouter();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pointerDistortion, setPointerDistortion] = useState<{ x: number; y: number; intensity: number }>({ x: 0.5, y: 0.5, intensity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const smokeParticlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number; opacity: number; phase: number }>>([]);
  const networkLinesRef = useRef<Array<{ x1: number; y1: number; x2: number; y2: number; pulse: number; phase: number }>>([]);
  const floorReflectionsRef = useRef<Array<{ x: number; y: number; size: number; opacity: number; color: string; phase: number }>>([]);
  const portalPulseRef = useRef(0);
  const redRingRotationRef = useRef(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);
    setMounted(true);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track pointer for parallax and distortion effects
  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setPointer({ x, y });
      setPointerDistortion({ x, y, intensity: 1 });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  // Initialize cinematic particles and effects
  useEffect(() => {
    if (reducedMotion) return;
    
    // Initialize smoke particles
    const smokeParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.5,
      size: 60 + Math.random() * 120,
      speed: 0.005 + Math.random() * 0.015,
      opacity: 0.02 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
    }));
    smokeParticlesRef.current = smokeParticles;

    // Initialize network lines
    const networkLines = Array.from({ length: 25 }, () => ({
      x1: Math.random() * window.innerWidth,
      y1: Math.random() * window.innerHeight,
      x2: Math.random() * window.innerWidth,
      y2: Math.random() * window.innerHeight,
      pulse: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));
    networkLinesRef.current = networkLines;

    // Initialize floor reflections
    const floorReflections = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.6 + Math.random() * window.innerHeight * 0.4,
      size: 80 + Math.random() * 150,
      opacity: 0.01 + Math.random() * 0.03,
      color: Math.random() > 0.5 ? "rgba(29, 78, 216, 1)" : "rgba(230, 57, 42, 1)",
      phase: Math.random() * Math.PI * 2,
    }));
    floorReflectionsRef.current = floorReflections;
  }, [reducedMotion]);

  // Canvas drawing function
  const drawCanvasEffects = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    // Draw network lines
    ctx.save();
    networkLinesRef.current.forEach((line) => {
      const pulse = line.pulse;
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.strokeStyle = `rgba(29, 78, 216, ${0.03 + pulse * 0.05})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      if (pulse > 0.7) {
        ctx.beginPath();
        ctx.arc(line.x2, line.y2, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 42, ${pulse * 0.5})`;
        ctx.fill();
      }
    });
    ctx.restore();

    // Draw smoke particles
    ctx.save();
    smokeParticlesRef.current.forEach((particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, `rgba(30, 60, 110, ${particle.opacity})`);
      gradient.addColorStop(0.5, `rgba(20, 40, 80, ${particle.opacity * 0.5})`);
      gradient.addColorStop(1, "rgba(10, 20, 40, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Draw portal glow (right side)
    const portalX = w * 0.78;
    const portalY = h * 0.42;
    const portalR = Math.min(w, h) * 0.18;
    
    const portalGlow = ctx.createRadialGradient(
      portalX, portalY, portalR * 0.3,
      portalX, portalY, portalR * 1.5
    );
    const pulse = Math.sin(portalPulseRef.current) * 0.15 + 0.85;
    portalGlow.addColorStop(0, `rgba(200, 240, 255, ${0.3 * pulse})`);
    portalGlow.addColorStop(0.3, `rgba(100, 200, 255, ${0.15 * pulse})`);
    portalGlow.addColorStop(0.6, `rgba(50, 150, 255, ${0.08 * pulse})`);
    portalGlow.addColorStop(1, "rgba(0, 100, 255, 0)");
    
    ctx.save();
    ctx.fillStyle = portalGlow;
    ctx.beginPath();
    ctx.arc(portalX, portalY, portalR * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw red energy ring
    ctx.save();
    ctx.translate(portalX, portalY);
    ctx.rotate(redRingRotationRef.current);
    const ringGradient = ctx.createRadialGradient(0, 0, portalR * 0.95, 0, 0, portalR * 1.05);
    ringGradient.addColorStop(0, "rgba(230, 57, 42, 0)");
    ringGradient.addColorStop(0.5, "rgba(230, 57, 42, 0.6)");
    ringGradient.addColorStop(1, "rgba(230, 57, 42, 0)");
    ctx.strokeStyle = ringGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, portalR, -Math.PI / 2, Math.PI * 1.5);
    ctx.stroke();
    
    const highlightAngle = redRingRotationRef.current + Math.PI / 4;
    const hx = Math.cos(highlightAngle) * portalR;
    const hy = Math.sin(highlightAngle) * portalR;
    ctx.beginPath();
    ctx.arc(hx, hy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 100, 80, 0.8)";
    ctx.fill();
    ctx.restore();

    // Draw floor reflections
    ctx.save();
    floorReflectionsRef.current.forEach((reflection) => {
      const gradient = ctx.createRadialGradient(
        reflection.x, reflection.y, 0,
        reflection.x, reflection.y, reflection.size
      );
      gradient.addColorStop(0, reflection.color.replace("1)", `${reflection.opacity})`));
      gradient.addColorStop(1, reflection.color.replace("1)", "0)"));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(reflection.x, reflection.y, reflection.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Draw pointer distortion field
    if (pointerDistortion.intensity > 0.1) {
      ctx.save();
      const distortR = 120;
      const distortGradient = ctx.createRadialGradient(
        pointerDistortion.x * w, pointerDistortion.y * h, 0,
        pointerDistortion.x * w, pointerDistortion.y * h, distortR
      );
      distortGradient.addColorStop(0, "rgba(200, 240, 255, 0.04)");
      distortGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.02)");
      distortGradient.addColorStop(1, "rgba(0, 100, 255, 0)");
      ctx.fillStyle = distortGradient;
      ctx.beginPath();
      ctx.arc(pointerDistortion.x * w, pointerDistortion.y * h, distortR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [pointerDistortion]);

  // Animation loop for cinematic effects
  useEffect(() => {
    if (reducedMotion) return;

    const animate = () => {
      timeRef.current += 1/60;
      portalPulseRef.current = (timeRef.current * 0.5) % (Math.PI * 2);
      redRingRotationRef.current = (timeRef.current * 0.15) % (Math.PI * 2);
      
      smokeParticlesRef.current.forEach((particle) => {
        particle.y -= particle.speed;
        particle.phase += 0.003;
        if (particle.y < window.innerHeight * 0.2) {
          particle.y = window.innerHeight * 0.8;
          particle.x = Math.random() * window.innerWidth;
        }
      });

      networkLinesRef.current.forEach((line) => {
        line.pulse = (Math.sin(timeRef.current * 2 + line.phase) + 1) / 2;
      });

      floorReflectionsRef.current.forEach((reflection) => {
        reflection.phase += 0.005;
        reflection.opacity = 0.01 + Math.sin(reflection.phase) * 0.02;
      });

      if (canvasRef.current) {
        drawCanvasEffects();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [drawCanvasEffects, reducedMotion]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CTA click handler — navigate to /about (professional portfolio)
  const handleEnter = () => {
    router.push("/about");
  };

  // Keyboard accessibility for CTA
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  };

  if (!mounted) {
    return (
      <div
        className="relative min-h-screen w-full overflow-hidden bg-black"
        style={{ minHeight: "100dvh" }}
        role="img"
        aria-label="CN2.DEV cinematic entry gateway"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/cn2-entry-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ minHeight: "100dvh", maxHeight: "100dvh" }}
      role="main"
      onMouseMove={(e) => {
        if (!reducedMotion) {
          setPointerDistortion({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
            intensity: 1
          });
        }
      }}
      onMouseLeave={() => {
        setPointerDistortion(prev => ({ ...prev, intensity: 0 }));
      }}
    >
      {/* ---- Canvas for cinematic effects ---- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: -10 }}
      />

      {/* ---- Background image layer ---- */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/cn2-entry-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: reducedMotion
            ? "none"
            : `translate(${(pointer.x - 0.5) * 40}px, ${(pointer.y - 0.5) * 30}px) scale(1.03)`,
          transition: reducedMotion ? "none" : "transform 0.5s ease-out",
        }}
      />

      {/* ---- Light mode treatment ---- */}
      {!dark && (
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: "linear-gradient(180deg, rgba(238,242,249,0.85) 0%, rgba(228,234,245,0.7) 50%, rgba(238,242,249,0.85) 100%)",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* ---- Dark mode: minimal vignette ---- */}
      {dark && (
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 20% 20%, rgba(29,78,216,0.12) 0%, transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}

      {/* ---- Left readability scrim: preserves the reference's dark negative
           space behind the typography in BOTH themes, so the pinned white/red
           brand lockup (OVERRIDE 2) always holds contrast. ---- */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,6,12,0.92) 0%, rgba(4,6,12,0.72) 28%, rgba(4,6,12,0.34) 48%, rgba(4,6,12,0) 66%)",
        }}
      />

      {/* ---- Main content: LEFT-ALIGNED ---- */}
      <main
        className="relative h-screen w-full flex items-center justify-start px-6 lg:px-12 pt-20"
        style={{ maxHeight: "100dvh" }}
      >
        <div className="w-full max-w-[620px] pointer-events-auto">
          {/* Brand lockup - LEFT aligned, split-cut wordmark */}
          <div className="mb-7 lg:mb-9">
            <h1
              className="cn2-split cn2-wordmark cn2-brand-word text-[clamp(3.2rem,9.2vw,6.5rem)]"
              aria-label="CN2.DEV"
            >
              <span className="cn2-split__top" aria-hidden="true">
                CN2<i className="cn2-wordmark__dot" />DEV
              </span>
              <span className="cn2-split__bottom" aria-hidden="true">
                CN2<i className="cn2-wordmark__dot" />DEV
              </span>
            </h1>
            <p className="cn2-brand-name cn2-mono mt-4 text-[clamp(1.05rem,2.7vw,1.9rem)] tracking-[0.34em] leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
              BUKYA NARESH
            </p>
          </div>

          {/* White divider */}
          <div className="w-14 h-[2px] bg-white mb-7 opacity-90" />

          {/* Tagline - LEFT aligned */}
          <div className="mb-10 lg:mb-12 max-w-[560px]">
            <p className="cn2-mono text-[clamp(0.95rem,2.9vw,1.4rem)] text-white/95 tracking-[0.22em] leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              WHERE IMAGINATION BECOMES REALITY
            </p>
          </div>

          {/* Primary CTA: ENTER CN2.DEV — outlined pill, dark interior */}
          <div className="pointer-events-auto">
            <button
              onClick={handleEnter}
              onKeyDown={handleKeyDown}
              className="enter-cta group inline-flex items-center gap-5 rounded-full border border-[#ff2a1f] bg-transparent pl-7 pr-2 py-2 text-white transition-all duration-300 hover:shadow-[0_0_38px_rgba(255,42,31,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Enter CN2.DEV professional portfolio"
            >
              <span className="cn2-mono text-[clamp(0.8rem,2.1vw,1rem)] tracking-[0.2em] whitespace-nowrap">
                ENTER CN2.DEV
              </span>
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ff2a1f] transition-all duration-300 group-hover:bg-[#ff2a1f] group-hover:border-[#ff2a1f]"
                aria-hidden="true"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff2a1f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:stroke-black"
                >
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}