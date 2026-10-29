"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon, Search } from "lucide-react";

/**
 * Helper for conditional class names
 */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Global navigation — deliberately minimal.
 *
 * Entry page (/): brand lockup + search inside the rounded glass panel
 * (home is dark-only, so no theme toggle there).
 * Inner routes: brand lockup · search · light/dark toggle. Nothing else —
 * every destination stays reachable through the command palette (⌘K), the
 * footer route index, /links, and the hub page.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isEntryPage = pathname === "/";
  const isIdentityPage = pathname === "/identity";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  return (
    <>
      {isEntryPage ? (
        /* ============ ENTRY PAGE: reference rounded glass panel ============ */
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 print:hidden sm:px-6 sm:pt-5 lg:px-10">
          <div className="mx-auto flex max-w-[1420px] items-center gap-3">
            {/* long rounded panel: thin border, translucent dark, wide padding */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[26px] border border-line dark:border-white/15 bg-surface/80 dark:bg-black/45 px-4 py-2.5 backdrop-blur-xl sm:gap-6 sm:px-7 sm:py-3 transition-colors duration-400">
              {/* LEFT: brand lockup → signed identity portrait */}
              <Link
                href="/identity"
                className="group flex min-w-0 shrink-0 cursor-pointer flex-col items-start leading-none"
              >
                <span className="display text-[0.95rem] font-bold tracking-tight text-foreground dark:text-white transition-opacity duration-200 group-hover:opacity-80 md:text-base">
                  {site.name}
                </span>
                <span className="label-mono mt-1 text-[9px] tracking-[0.2em] text-[#ff2a1f] md:text-[10px]">
                  {site.identity}
                </span>
              </Link>

              {/* CENTER: HOME (active, red + underline) and ABOUT (muted) */}
              <nav
                className="hidden items-center gap-7 lg:flex"
                aria-label="Entry"
              >
                <Link
                  href="/"
                  aria-current="page"
                  className="label-mono relative text-[10px] tracking-[0.18em] text-[#ff2a1f] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-[#ff2a1f] after:content-['']"
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="label-mono text-[10px] tracking-[0.18em] text-muted dark:text-white/55 transition-colors duration-200 hover:text-foreground dark:hover:text-white/90"
                >
                  ABOUT
                </Link>
              </nav>

              {/* RIGHT inside panel: CONTACT pill with circular arrow */}
              <Link
                href="/contact"
                className="group hidden shrink-0 items-center gap-3 rounded-full border border-line dark:border-white/20 bg-foreground/[0.05] dark:bg-white/[0.06] py-1.5 pl-5 pr-1.5 transition-colors duration-200 hover:border-line-strong dark:hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
                aria-label="Contact — open the contact page"
              >
                <span className="label-mono text-[10px] tracking-[0.18em] text-foreground dark:text-white/85">
                  CONTACT
                </span>
                <span
                  className="grid h-7 w-7 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0a0a0c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Search & Theme Toggle */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={openPalette}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-line dark:border-white/15 bg-surface/80 dark:bg-black/45 backdrop-blur-xl transition-all duration-300 hover:border-[#ff2a1f]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Open search"
              >
                <Search className="h-4 w-4 text-foreground/75 dark:text-white/75 transition-colors hover:text-foreground dark:hover:text-white" />
              </button>
              <button
                onClick={toggle}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-line dark:border-white/15 bg-surface/80 dark:bg-black/45 backdrop-blur-xl transition-all duration-300 hover:border-[#ff2a1f]/60 text-foreground dark:text-white/75 hover:text-foreground dark:hover:text-white"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark" ? "false" : "true"}
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* ============ INNER PAGES: minimal bar — brand · search · theme ============ */
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 print:hidden",
            scrolled ? "border-line bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8",
              scrolled ? "py-3" : "py-5"
            )}
          >
            {/* ---- brand lockup: CN2.DEV above BUKYA NARESH — opens /identity ----
                 The identity portrait page drops brand for a photo-only bar */}
            {!isIdentityPage && (
              <Link
                href="/identity"
                className="group flex shrink-0 flex-col items-start leading-none text-foreground cursor-pointer"
              >
                <span className="display text-[0.95rem] font-bold tracking-tight md:text-base group-hover:text-signal transition-colors">
                  {site.name}
                </span>
                <span className="label-mono mt-1 text-[9px] text-signal transition-colors group-hover:text-foreground md:text-[10px]">
                  {site.identity}
                </span>
              </Link>
            )}

            {/* ---- actions: search · theme; the bottom-left BACK control
                 returns to wherever the visitor came from ---- */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                onClick={openPalette}
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={toggle}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark" ? "false" : "true"}
              >
                {theme === "dark" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
          <div
            className={cn(
              "signal-rule transition-transform duration-700",
              scrolled ? "scale-x-100" : "scale-x-0"
            )}
            aria-hidden="true"
          />
        </header>
      )}
    </>
  );
}
