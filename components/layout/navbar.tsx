"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navRoutes, site } from "@/data/site";
import { useTheme } from "@/components/providers/theme-provider";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-line bg-background/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-all duration-500 sm:px-8 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link href="/" className="group flex items-baseline gap-3" aria-label="Naresh — home">
            <span className="display text-lg tracking-tight md:text-xl">{site.name}</span>
            <span
              className={`label-mono hidden text-faint transition-opacity duration-500 sm:inline ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              {site.identity}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {navRoutes.map((route) => {
              const active = pathname.startsWith(route.href);
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`link-line label-mono transition-colors duration-200 ${
                    active ? "text-signal" : "text-muted hover:text-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="label-mono border border-line px-3 py-1.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? "LIGHT" : "DARK"}
            </button>
            <button
              onClick={openPalette}
              className="label-mono hidden border border-line px-3 py-1.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground sm:block"
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
        className={`fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="grid-field flex-1" />
        <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile">
          {navRoutes.map((route, i) => (
            <Link
              key={route.href}
              href={route.href}
              className="group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              }}
            >
              <span className="num-mono text-xs text-signal">{route.code}</span>
              <span
                className={`display text-3xl transition-colors ${
                  pathname.startsWith(route.href) ? "text-signal" : "text-foreground group-hover:text-signal"
                }`}
              >
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-line px-6 py-5">
          <p className="label-mono text-faint">{site.identity}</p>
          <button onClick={openPalette} className="label-mono text-muted" aria-label="Open command palette">
            ⌘K
          </button>
        </div>
      </div>
    </>
  );
}
