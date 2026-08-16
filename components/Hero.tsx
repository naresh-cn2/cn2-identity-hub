"use client";

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const graphicsRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Staggered entrance animation
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setMounted(true), 100);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      if (bgRef.current) bgRef.current.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
      if (graphicsRef.current) graphicsRef.current.style.transform = `translate(${x * -6}px, ${y * -6}px)`;
      if (portraitRef.current) portraitRef.current.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      if (textRef.current) textRef.current.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-black overflow-hidden flex items-center justify-center group"
    >
      
      {/* Architectural Background Grid */}
      <div 
        ref={bgRef}
        className={`absolute inset-0 pointer-events-none transition-all duration-[1200ms] ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          width: '110%',
          height: '110%',
          left: '-5%',
          top: '-5%'
        }}
      >
        <div className="absolute top-[30%] left-[15%] w-64 h-64 border border-gray-100 rounded-full opacity-40 hidden md:block"></div>
        <div className="absolute top-[20%] right-[10%] w-32 h-32 border border-gray-100 rounded-full opacity-40 hidden md:block"></div>
      </div>

      {/* System Graphics Frame */}
      <div 
        ref={graphicsRef}
        className={`absolute inset-0 pointer-events-none transition-all duration-[1200ms] delay-300 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-[20%] right-[30%] w-16 h-16 border-t border-r border-gray-200 hidden md:block"></div>
        <div className="absolute bottom-[30%] left-[10%] w-16 h-16 border-b border-l border-gray-200 hidden md:block"></div>
        <div className="absolute top-[25%] right-[29%] w-2 h-2 bg-[#cc0000] opacity-50 hidden md:block"></div>
        <div className="absolute bottom-[28%] left-[11%] w-1 h-1 bg-[#cc0000] opacity-50 hidden md:block"></div>
      </div>

      {/* Editorial Grid Container */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 h-[80vh] relative z-10 mt-16">
        
        {/* LEFT: Vertical 'PORTFOLIO' Label */}
        <div className={`hidden md:flex col-span-1 items-center justify-center h-full transition-all duration-1000 delay-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div 
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="font-mono text-xs tracking-[0.4em] uppercase text-gray-300 flex items-center gap-4"
          >
            PORTFOLIO <span className="w-[1px] h-12 bg-gray-200"></span>
          </div>
        </div>

        {/* CENTER-LEFT: Spacer to preserve image container position */}
        <div className="hidden md:flex col-span-3"></div>

        {/* RIGHT: Main Composition & Identity Block */}
        <div className="col-span-1 md:col-span-8 relative flex flex-col md:block items-center justify-end h-full w-full">
          
          {/* Portrait Composite Image (LOCKED) */}
          <div 
            ref={portraitRef}
            className={`relative z-20 h-full w-full flex justify-end pointer-events-none flex-shrink-0 transition-all duration-[1200ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            {/* Subtle drop shadow / ambient light behind portrait */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#cc0000]/[0.02] to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <img 
              src="/portrait.png" 
              alt="Bukya Naresh - AI-Native Systems Architect" 
              className="object-contain object-center md:object-right w-full h-full transform scale-[1.3] sm:scale-[1.4] md:scale-[1.8] lg:scale-[2.1] xl:scale-[2.3] origin-center md:origin-right drop-shadow-sm"
            />
          </div>

          {/* PUBLIC IDENTITY EDITORIAL BLOCK */}
          <div 
            ref={textRef}
            className="relative md:absolute right-0 top-0 bottom-0 z-30 w-full md:w-[75%] lg:w-[65%] xl:w-[60%] flex flex-col justify-center pointer-events-auto mt-8 md:mt-0 px-2 md:px-0"
          >
            
            <div className="flex flex-col gap-6 md:gap-8 justify-center overflow-y-auto md:overflow-visible pt-4 md:pt-0">
              
              {/* Header Hierarchy */}
              <div className={`flex flex-col gap-2 transition-all duration-[1000ms] delay-[400ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg md:text-xl font-bold tracking-widest text-[#cc0000] uppercase">
                    // ABOUT ME;
                  </span>
                  <div className="h-[1px] w-8 bg-gray-200"></div>
                </div>
                <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-black uppercase mt-2">
                  BUKYA NARESH
                </h1>
                <h2 className="font-mono text-sm md:text-base font-semibold tracking-widest text-zinc-800 uppercase mt-2">
                  AI-Native Systems Architect
                </h2>
              </div>

              {/* Identity Manifesto */}
              <div className={`flex flex-col gap-4 text-[13px] md:text-sm text-gray-800 leading-relaxed font-medium max-w-[480px] mt-2 transition-all duration-[1000ms] delay-[600ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="absolute -left-4 top-1/2 bottom-0 w-[1px] bg-gray-100 hidden md:block"></div>
                <p>
                  I architect and build products, systems, platforms, and foundational software across systems engineering, enterprise data, AI, automation, quantitative intelligence, performance, and reliability.
                </p>
                <p>
                  I combine deep engineering with AI-native execution to expand the speed, depth, and scale at which complex systems can be designed, engineered, tested, and deployed.
                </p>
                <p>
                  My focus is building capabilities that operate across global industries—where infrastructure, intelligence, and deterministic execution become critical to how modern enterprises operate.
                </p>
              </div>

              {/* Master Axiom */}
              <div className={`border-l-2 border-[#cc0000] pl-4 py-1 max-w-[480px] mt-6 pb-12 md:pb-0 relative transition-all duration-[1000ms] delay-[800ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="absolute -left-12 top-2 font-mono text-[8px] tracking-widest text-gray-300 uppercase hidden md:block">
                  AXIOM
                </div>
                <p className="font-serif text-[15px] md:text-[17px] italic font-medium text-zinc-900 leading-relaxed tracking-wide">
                  "Stability is architected.<br className="hidden md:block" />
                  Mastery is earned through consistency."
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}