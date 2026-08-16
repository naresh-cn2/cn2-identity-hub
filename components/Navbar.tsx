"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsContactOpen(false);
      }
    }

    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isContactOpen]);

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <Link href="/" className="font-sans text-sm font-black text-black tracking-widest uppercase">
          BUKYA NARESH
        </Link>
        <div className="flex items-center space-x-6 md:space-x-10 font-sans text-xs font-bold text-black tracking-widest uppercase">
          <a 
            href="https://mrcn2naresh.blogspot.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#cc0000] transition-colors"
          >
            BLOGS
          </a>
          
          <div className="relative" ref={contactRef}>
            <button 
              onClick={() => setIsContactOpen(!isContactOpen)}
              aria-expanded={isContactOpen}
              className="hover:text-[#cc0000] transition-colors focus:outline-none uppercase tracking-widest"
            >
              CONTACT
            </button>

            {isContactOpen && (
              <div className="absolute right-0 mt-6 w-64 bg-white border border-gray-200 shadow-sm p-6 z-50 flex flex-col gap-6 text-left">
                
                <div className="border-b border-gray-100 pb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#cc0000] font-bold">CONTACT</span>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-widest text-gray-500">EMAIL</span>
                  <a 
                    href="mailto:bukyanaresh2003@gmail.com" 
                    className="text-xs font-medium text-black hover:text-[#cc0000] transition-colors truncate"
                    onClick={() => setIsContactOpen(false)}
                  >
                    bukyanaresh2003@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-widest text-gray-500">PHONE</span>
                  <a 
                    href="tel:+919490004978" 
                    className="text-xs font-medium text-black hover:text-[#cc0000] transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    +91 9490004978
                  </a>
                </div>

                {/* Professional */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-gray-500">PROFESSIONAL</span>
                  <div className="flex flex-col gap-1">
                    <a 
                      href="https://www.linkedin.com/in/bukya-naresh-cn2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-black hover:text-[#cc0000] transition-colors inline-flex items-center justify-between"
                      onClick={() => setIsContactOpen(false)}
                    >
                      LinkedIn <span className="text-gray-400 font-sans text-[10px]">↗</span>
                    </a>
                    <a 
                      href="https://contra.com/naresh_cn2?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=naresh_cn2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-black hover:text-[#cc0000] transition-colors inline-flex items-center justify-between"
                      onClick={() => setIsContactOpen(false)}
                    >
                      Contra <span className="text-gray-400 font-sans text-[10px]">↗</span>
                    </a>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}