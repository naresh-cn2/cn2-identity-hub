"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isActiveNavItem,
  isActiveRoute,
  primaryNav,
  site,
  type NavItem,
} from "@/data/site";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon, Search } from "lucide-react";

/**
 * Helper for conditional class names
 */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Global navigation — single source of truth for all navigation.
 *
 * Entry page (/): Brand (clickable → /identity) | HOME ABOUT | CONTACT + theme + search
 * Portfolio routes: Full primary navigation with grouped mega-menus.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isEntryPage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setMenuOpen(false);
      setOpenGroup(null);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  const enterGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 160);
  };

  return (
    <>
      {isEntryPage ? (
        /* ============ ENTRY PAGE: reference rounded glass panel ============ */
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 print:hidden sm:px-6 sm:pt-5 lg:px-10">
          <div className="mx-auto flex max-w-[1420px] items-center gap-3">
            {/* long rounded panel: thin border, translucent dark, wide padding */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[26px] border border-white/15 bg-black/45 px-4 py-2.5 backdrop-blur-xl sm:gap-6 sm:px-7 sm:py-3">
              {/* LEFT: brand lockup */}
              <Link
                href="/identity"
                className="group flex min-w-0 shrink-0 cursor-pointer flex-col items-start leading-none"
                aria-label={`${site.identity} — ${site.name} — identity page`}
              >
                <span className="display text-[0.95rem] font-bold tracking-tight text-white transition-opacity duration-200 group-hover:opacity-80 md:text-base">
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
                  className="label-mono text-[10px] tracking-[0.18em] text-white/55 transition-colors duration-200 hover:text-white/90"
                >
                  ABOUT
                </Link>
              </nav>

              {/* RIGHT inside panel: CONTACT pill with circular arrow */}
              <Link
                href="/contact"
                className="group hidden shrink-0 items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-1.5 pl-5 pr-1.5 transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black md:inline-flex"
                aria-label="Contact — open the contact page"
              >
                <span className="label-mono text-[10px] tracking-[0.18em] text-white/85">
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

              {/* compact menu trigger inside the panel */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="label-mono shrink-0 border border-white/20 px-3 py-1.5 text-white/70 transition-colors hover:border-white/40 hover:text-white lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? "CLOSE" : "MENU"}
              </button>
            </div>

            {/* OVERRIDE 1: positions swapped — search now occupies the theme
                toggle's old slot, theme toggle occupies search's old slot.
                Both keep their existing circular shape, icon and behaviour. */}
            <div className="flex shrink-0 items-center gap-2.5">
              <button
                onClick={openPalette}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 backdrop-blur-xl transition-all duration-300 hover:border-[#ff2a1f]/60 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Open search"
              >
                <Search className="h-4 w-4 text-white/75 transition-colors hover:text-white" />
              </button>

              <button
                onClick={toggle}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark" ? "false" : "true"}
              >
                {theme === "dark" ? (
                  <Moon className="h-[18px] w-[18px] text-white/85" />
                ) : (
                  <Sun className="h-[18px] w-[18px] text-white/85" />
                )}
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* ============ INNER PAGES: existing full-width bar (unchanged) ============ */
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
            {/* ---- brand lockup: CN2.DEV above BUKYA NARESH — clickable to /identity ---- */}
            <Link
              href="/identity"
              className="group flex shrink-0 flex-col items-start leading-none text-foreground cursor-pointer"
              aria-label={`${site.identity} — ${site.name} — identity page`}
            >
              <span className="display text-[0.95rem] font-bold tracking-tight md:text-base group-hover:text-signal transition-colors">
                {site.name}
              </span>
              <span className="label-mono mt-1 text-[9px] text-signal transition-colors group-hover:text-foreground md:text-[10px]">
                {site.identity}
              </span>
            </Link>

            {/* ---- desktop navigation ---- */}
            <nav className="hidden w-auto items-center gap-1 lg:flex" aria-label="Primary">
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "link-line label-mono px-3 py-2 text-[10px] transition-colors duration-200",
                  pathname === "/" ? "text-signal" : "text-muted hover:text-foreground"
                )}
              >
                HOME
              </Link>
              {primaryNav.map((item) => {
                const active = isActiveNavItem(pathname, item);
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openGroup === item.label;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "link-line label-mono px-3 py-2 text-[10px] transition-colors duration-200",
                        active ? "text-signal" : "text-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => enterGroup(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      onClick={() => (isOpen ? setOpenGroup(null) : enterGroup(item.label))}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={cn(
                        "label-mono flex items-center gap-1.5 px-3 py-2 text-[10px] transition-colors duration-200",
                        active ? "text-signal" : "text-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn("text-[8px] transition-transform duration-200", isOpen ? "rotate-180" : "")}
                      >
                        ▾
                      </span>
                    </button>

                    <div
                      className={cn(
                        "absolute left-0 top-full pt-2 transition-all duration-200",
                        isOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      )}
                    >
                      <div className="min-w-[15rem] border border-line bg-background/95 p-2 shadow-2xl backdrop-blur-md">
                        {item.children!.map((child) => {
                          const childActive = isActiveRoute(pathname, child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onMouseEnter={() => enterGroup(item.label)}
                              className={cn(
                                "flex items-baseline justify-between gap-4 px-3 py-2.5 transition-colors duration-150",
                                childActive
                                  ? "bg-signal-soft text-signal"
                                  : "text-muted hover:bg-surface-2 hover:text-foreground"
                              )}
                            >
                              <span className="label-mono text-[11px]">{child.label}</span>
                              <span className="num-mono text-[9px] text-faint">{child.code}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* ---- actions ---- */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={toggle}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark" ? "false" : "true"}
              >
                {theme === "dark" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
              </button>
              <button
                onClick={openPalette}
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="label-mono border border-line px-3 py-1.5 text-muted transition-colors hover:border-line-strong hover:text-foreground lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? "CLOSE" : "MENU"}
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

      {/* ---- mobile cinematic menu ---- */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden print:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="grid-field h-24 shrink-0" />
        <nav
          className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-6"
          aria-label="Mobile"
        >
          <MobileNavEntry
            item={{ label: "HOME", href: "/", code: "00" }}
            index={0}
            open={menuOpen}
            pathname={pathname}
          />
          {primaryNav.map((item, i) => (
            <MobileNavEntry key={item.label} item={item} index={i + 1} open={menuOpen} pathname={pathname} />
          ))}
        </nav>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-[10px] text-muted transition-colors hover:text-signal"
            >
              GITHUB
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-[10px] text-muted transition-colors hover:text-signal"
            >
              LINKEDIN
            </a>
            <Link href="/cv" className="label-mono text-[10px] text-muted transition-colors hover:text-signal">
              CV
            </Link>
            <Link href="/links" className="label-mono text-[10px] text-muted transition-colors hover:text-signal">
              LINKS
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <p className="label-mono text-[10px] text-signal">{site.identity}</p>
            <button onClick={openPalette} className="label-mono text-muted" aria-label="Open command palette">
              ⌘K
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileNavEntry({
  item,
  index,
  open,
  pathname,
  accent = false,
}: {
  item: NavItem;
  index: number;
  open: boolean;
  pathname: string;
  accent?: boolean;
}) {
  const active = isActiveNavItem(pathname, item);
  const style = {
    transitionDelay: open ? `${60 + index * 45}ms` : "0ms",
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(18px)",
  } as const;

  return (
    <div className="border-b border-line transition-all duration-500" style={style}>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="group flex items-baseline gap-4 py-3.5 transition-all duration-500"
      >
        <span className={cn("num-mono text-xs", accent ? "text-signal" : "text-research")}>
          {item.code}
        </span>
        <span
          className={cn(
            "display text-2xl transition-colors md:text-3xl",
            accent ? "text-signal" : active ? "text-signal" : "text-foreground group-hover:text-signal"
          )}
        >
          {item.label}
        </span>
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 pb-4 pl-8">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "label-mono text-[10px] transition-colors",
                isActiveRoute(pathname, child.href) ? "text-signal" : "text-muted hover:text-foreground"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}