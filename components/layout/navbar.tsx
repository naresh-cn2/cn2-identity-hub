"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute, navRoutes, site, workRoute } from "@/data/site";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * Global navigation.
 *
 * Primary destinations own one proof category each; WORK WITH ME is a
 * professional action and is styled apart from navigation rather than being
 * folded into it. The two widest labels only appear at xl so the bar never
 * overflows a 1024px laptop viewport.
 */
const WIDE_ONLY = new Set<string>(["/certifications", "/capabilities"]);

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on navigation (deferred — sync setState in effects is disallowed)
  useEffect(() => {
    const t = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  const primary = navRoutes.filter((r) => r.href !== "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 print:hidden ${
          scrolled
            ? "border-line bg-background/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link href="/" className="group flex shrink-0 items-baseline gap-3" aria-label="Bukya Naresh — home">
            <span className="display text-lg tracking-tight md:text-xl">{site.name}</span>
            <span
              className={`label-mono hidden text-faint transition-opacity duration-500 md:inline ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              {site.identity}
            </span>
            <span
              className={`label-mono hidden text-signal transition-opacity duration-500 xl:inline ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              {site.system}
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
            {primary.map((route) => {
              const active = isActiveRoute(pathname, route.href);
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-line label-mono text-[10px] transition-colors duration-200 ${
                    WIDE_ONLY.has(route.href) ? "hidden xl:inline" : ""
                  } ${active ? "text-signal" : "text-muted hover:text-foreground"}`}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={workRoute.href}
              className={`label-mono hidden border px-3 py-1.5 text-[10px] transition-colors duration-200 lg:inline-flex ${
                isActiveRoute(pathname, workRoute.href)
                  ? "border-signal bg-signal text-background"
                  : "border-line-strong text-foreground hover:border-signal hover:text-signal"
              }`}
            >
              {workRoute.label}
            </Link>
            <button
              onClick={toggle}
              className="label-mono border border-line px-3 py-1.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? "LIGHT" : "DARK"}
            </button>
            <button
              onClick={openPalette}
              className="label-mono hidden border border-line px-3 py-1.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground xl:block"
              aria-label="Open command palette"
            >
              ⌘K
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="label-mono border border-line px-3 py-1.5 text-muted transition-colors hover:border-line-strong hover:text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
        <div
          className={`signal-rule transition-transform duration-700 ${
            scrolled ? "scale-x-100" : "scale-x-0"
          }`}
          aria-hidden="true"
        />
      </header>

      {/* mobile cinematic menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden print:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="grid-field h-24 shrink-0" />
        <nav
          className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-6"
          aria-label="Mobile"
        >
          {[...navRoutes, workRoute].map((route, i) => {
            const active = isActiveRoute(pathname, route.href);
            const isWork = route.href === workRoute.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className="group flex items-baseline gap-4 border-b border-line py-3.5 transition-all duration-500"
                style={{
                  transitionDelay: menuOpen ? `${60 + i * 45}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                }}
              >
                <span className={`num-mono text-xs ${isWork ? "text-signal" : "text-research"}`}>
                  {route.code}
                </span>
                <span
                  className={`display text-2xl md:text-3xl transition-colors ${
                    active ? "text-signal" : "text-foreground group-hover:text-signal"
                  }`}
                >
                  {route.label}
                </span>
              </Link>
            );
          })}
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
            <p className="label-mono text-[10px] text-signal">{site.system}</p>
            <button onClick={openPalette} className="label-mono text-muted" aria-label="Open command palette">
              ⌘K
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
