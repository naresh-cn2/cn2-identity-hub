"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // When pathname changes (arriving at new page)
  useEffect(() => {
    setIsExiting(false);
    setIsEntering(true);
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsEntering(false);
      return;
    }

    const raf = requestAnimationFrame(() => {
      setTimeout(() => {
        setIsEntering(false);
      }, 50);
    });
    
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Handle click interception for exit animations
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
      if (target.getAttribute('target') === '_blank') return;
      if (href === pathname) return;
      
      // Prevent default and start exit animation
      e.preventDefault();
      setIsExiting(true);
      
      // Wait for sheet to cover, then navigate
      setTimeout(() => {
        router.push(href);
      }, 500); 
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router, pathname]);

  // Combine states
  // If exiting: sheet covers from left
  // If entering: sheet uncovers to right
  const isSheetActive = isExiting || isEntering;
  const sheetOrigin = isExiting ? 'origin-left' : 'origin-right';
  const sheetScale = isExiting ? 'scale-x-100' : (isEntering ? 'scale-x-100' : 'scale-x-0');
  // At the moment of entrance, the sheet is scale-x-100, then it goes to scale-x-0.

  return (
    <>
      {/* The Architectural Sheet */}
      <div 
        className={`fixed inset-0 z-[9999] pointer-events-none bg-white transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${sheetOrigin} ${isEntering ? (isExiting ? 'scale-x-100' : 'scale-x-0') : (isExiting ? 'scale-x-100' : 'scale-x-0')}`}
      >
        <div className={`absolute top-0 bottom-0 w-[2px] bg-[#cc0000] ${isExiting ? 'right-0' : 'left-0'}`}></div>
      </div>
      
      {/* Page Content with flattening effect */}
      <div 
        className={`transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] origin-center w-full min-h-screen ${
          isExiting ? 'scale-[0.98] opacity-40 blur-[2px]' : 'scale-100 opacity-100 blur-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
