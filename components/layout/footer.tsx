"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { indexRoutes, site, utilityLinks } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();

  /* The cinematic entry gateway (/ ) is a single-viewport experience: the
     reference shows no footer beneath the hero. Hiding it here keeps that
     page non-scrolling; every other route keeps the full index. */
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-line bg-surface print:hidden">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="display text-3xl tracking-tight">{site.name}</p>
            <p className="label-mono mt-2 text-xs text-signal">{site.identity}</p>
            <p className="label-mono mt-1 text-xs text-research">
              {site.system} / {site.descriptor}
            </p>
            <p className="label-mono mt-4 max-w-xs text-xs leading-relaxed text-muted">
              {site.subtitle}
            </p>
            <p className="label-mono mt-6 max-w-xs text-[10px] leading-relaxed text-faint">
              {site.status}
            </p>
          </div>

          <nav aria-label="Footer index">
            <p className="label-mono mb-4 text-[10px] tracking-[0.2em] text-faint">INDEX</p>
            <ul className="space-y-2">
              {indexRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="label-mono text-xs text-muted transition-colors hover:text-signal"
                  >
                    {route.code} — {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono mb-4 text-[10px] tracking-[0.2em] text-faint">SIGNALS</p>
            <ul className="space-y-2">
              {utilityLinks.map((l) =>
                l.external ? (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="label-mono text-xs text-muted transition-colors hover:text-signal"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="label-mono text-xs text-muted transition-colors hover:text-signal"
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="num-mono text-[10px] text-faint">
            c 2026 {site.name} — all systems self-engineered
          </p>
          <p className="num-mono text-[10px] text-faint">
            status / research · domain / CN2.dev · mode / building
          </p>
        </div>
      </div>
    </footer>
  );
}
