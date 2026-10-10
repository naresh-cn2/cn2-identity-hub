"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";

// Custom SVG icons for GitHub and LinkedIn since lucide-react version may not have them
const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ContactMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
  display: string;
  href: string;
  revealContent: string;
  type: "tel" | "mailto" | "https" | "whatsapp";
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "phone",
    label: "Phone",
    icon: <Phone className="w-5 h-5" />,
    display: "+91 94900 04978",
    href: "tel:+919490004978",
    revealContent: "+91 94900 04978",
    type: "tel",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <MessageSquare className="w-5 h-5" />,
    display: "Message on WhatsApp",
    href: "https://wa.me/919490004978",
    revealContent: "https://wa.me/919490004978",
    type: "whatsapp",
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="w-5 h-5" />,
    display: "bukyanaresh2003@gmail.com",
    href: "mailto:bukyanaresh2003@gmail.com",
    revealContent: "bukyanaresh2003@gmail.com",
    type: "mailto",
  },
  {
    id: "github",
    label: "GitHub",
    icon: <GithubIcon />,
    display: "github.com/naresh-cn2",
    href: "https://github.com/naresh-cn2",
    revealContent: "https://github.com/naresh-cn2",
    type: "https",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    display: "linkedin.com/in/bukya-naresh-cn2",
    href: "https://www.linkedin.com/in/bukya-naresh-cn2",
    revealContent: "https://www.linkedin.com/in/bukya-naresh-cn2",
    type: "https",
  },
];

function ContactCard({ method }: { method: ContactMethod }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsRevealed(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // On touch devices, first click reveals, second click activates
    if (!isRevealed && (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches)) {
      if (wasTouched) {
        // Second tap - allow navigation
        return;
      }
      e.preventDefault();
      setWasTouched(true);
      setIsRevealed(true);
      // Reset touch state after a delay
      setTimeout(() => setWasTouched(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isRevealed) {
        setIsRevealed(true);
      } else {
        // If already revealed, activate the link
        window.location.href = method.href;
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative border border-line bg-background/50 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-all duration-500 hover:border-signal/50 hover:bg-background hover:shadow-[0_0_40px_rgba(230,57,42,0.1)]"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="button"
      aria-label={`${method.label} contact method. ${isRevealed ? `Revealed: ${method.revealContent}` : "Press to reveal contact details."}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center text-signal transition-all duration-300 group-hover:bg-signal/20 group-hover:border-signal/40">
          {method.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="label-mono text-[10px] text-signal tracking-wider">{method.label}</p>
          <div className="mt-3 overflow-hidden relative h-6">
            {/* Hidden state - shows generic label */}
            <div className={`transition-all duration-500 ease-out absolute top-0 left-0 right-0 ${isRevealed || isFocused ? "translate-y-[-100%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
              <p className="text-sm text-muted font-mono">{method.display}</p>
            </div>
            {/* Revealed state - shows actual contact detail */}
            <div className={`absolute top-0 left-0 right-0 transition-all duration-500 ease-out ${isRevealed || isFocused ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0 pointer-events-none"}`}>
              <div className="flex items-center gap-3">
                <a
                  href={method.href}
                  className="text-sm text-foreground font-mono break-all transition-colors hover:text-signal"
                  target={method.type === "https" || method.type === "whatsapp" ? "_blank" : undefined}
                  rel={method.type === "https" || method.type === "whatsapp" ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!isRevealed && (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches)) {
                      e.preventDefault();
                    }
                  }}
                >
                  {method.revealContent}
                </a>
                {(method.type === "tel" || method.type === "whatsapp") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (method.type === "tel") {
                        window.location.href = method.href;
                      } else {
                        window.open(method.href, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="ml-auto px-3 py-1.5 text-xs font-bold rounded-full bg-signal text-black transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(230,57,42,0.4)]"
                  >
                    {method.type === "tel" ? "CALL" : "MESSAGE"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Reveal indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center transition-all duration-300 group-hover:border-signal/50 group-hover:bg-signal/10">
          <svg className={`w-4 h-4 text-muted transition-all duration-500 ${isRevealed || isFocused ? "rotate-180 text-signal" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {/* Bottom glow line on reveal */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function ContactContent() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {CONTACT_METHODS.map((method, i) => (
        <div key={method.id} style={{ animationDelay: `${i * 80}ms` }} className="animate-in fade-in slide-in-from-y-4 duration-500">
          <ContactCard method={method} />
        </div>
      ))}
    </div>
  );
}