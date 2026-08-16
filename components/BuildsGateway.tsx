"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function BuildsGateway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for scroll reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
      if (artworkRef.current) {
        artworkRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px) scale(1.02)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
      }
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
      className="relative w-full min-h-screen bg-white text-black flex items-center justify-center py-24 px-6 md:px-12 border-t border-gray-100 overflow-hidden group"
    >
      {/* Architectural Background Grid */}
      <div 
        ref={bgRef}
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
        {/* Subtle geometric intersections */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-gray-100 rounded-full opacity-50 hidden md:block"></div>
        <div className="absolute bottom-[30%] right-[20%] w-64 h-64 border border-gray-100 rounded-full opacity-50 hidden md:block"></div>
        <div className="absolute top-[40%] right-[40%] w-4 h-4 border-l border-t border-[#cc0000] opacity-30"></div>
        <div className="absolute bottom-[20%] left-[30%] w-4 h-4 border-r border-b border-[#cc0000] opacity-30"></div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8 relative z-10">
        
        {/* Left: Typography & Interaction */}
        <div className="flex flex-col justify-center items-start z-20">
          
          {/* Micro Metadata */}
          <div 
            className={`mb-6 flex items-center gap-4 transition-all duration-1000 delay-[400ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">SYSTEM / BUILD</span>
            <span className="w-4 border-b border-gray-200"></span>
            <span className="font-mono text-[9px] tracking-widest text-[#cc0000] uppercase">02</span>
          </div>

          <Link href="/builds" className="block outline-none relative cursor-pointer group/link">
            <div className={`transition-all duration-1000 delay-[100ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 
                ref={titleRef}
                className="font-sans font-black text-8xl sm:text-9xl md:text-[10rem] lg:text-[13rem] xl:text-[16rem] leading-[0.8] tracking-tighter text-black uppercase transition-all duration-500 ease-out group-hover/link:tracking-tight group-hover/link:text-zinc-900 group-hover/link:scale-[1.01]"
              >
                BUILDS
              </h2>
            </div>
            {/* Subtle hover accent */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#cc0000] transition-all duration-500 group-hover/link:h-1/2 opacity-0 group-hover/link:opacity-100"></div>
          </Link>
          
          <div className={`mt-8 md:mt-12 max-w-[420px] transition-all duration-1000 delay-[250ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="font-sans font-medium text-[15px] md:text-base text-gray-900 leading-relaxed">
              Foundational software, platforms, products,<br className="hidden md:block" /> and systems engineered to operate at scale.
            </p>
            <div className="w-12 border-b-2 border-black mt-6"></div>
          </div>
        </div>

        {/* Right: Artwork */}
        <div className={`flex justify-center md:justify-end items-center relative z-10 w-full h-full min-h-[400px] transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#cc0000]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          {/* Technical Alignment Guides */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-gray-200 hidden lg:block"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-gray-200 hidden lg:block"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-[1px] bg-gray-200 hidden lg:block"></div>
          
          <div className="absolute top-[10%] right-[10%] flex flex-col items-end gap-1 opacity-50 hidden lg:flex">
            <span className="font-mono text-[8px] text-gray-400">ARCHITECTURAL</span>
            <span className="font-mono text-[8px] text-gray-400">INDEX // 2026</span>
          </div>

          <img 
            ref={artworkRef}
            src="/builds-artwork.png" 
            alt="Builds Architecture" 
            className="w-full max-w-[500px] lg:max-w-[700px] object-contain object-center scale-[1.02] mix-blend-multiply transition-transform duration-700 ease-out drop-shadow-2xl"
          />

          {/* Overlay Grid on Artwork (very faint) */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '8px 8px'
          }}></div>
        </div>

      </div>
    </section>
  );
}
