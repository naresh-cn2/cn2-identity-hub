"use client";

import { usePathname } from "next/navigation";
import PageAtmosphere, { type Variant } from "@/components/ui/page-atmosphere";

/**
 * SiteAmbience — the always-on ambient layer that keeps the whole page
 * alive, not just the header.
 *
 * PageAtmosphere mounts per-header and stops drawing once you scroll past
 * it, so long reads (case studies, research, articles) went quiet below
 * the fold. This mounts ONE quiet instance at the root, fixed to the
 * viewport behind all content, so the atmosphere follows the reader from
 * hero to footer on every route.
 *
 * Art direction stays per-page: the variant is picked from the route, and
 * it is the same variant the route's own header uses — the fixed layer
 * reads as the header's atmosphere continuing down the page, not as one
 * background repeated site-wide. It runs at ~0.7 intensity so it never
 * competes with content.
 *
 * Excluded routes carry their own full treatments and stay untouched:
 *   /        — the baked hero composition (dark-only, no overlay)
 *   /hub     — the portal + eight destination scenes
 *   /about   — the full-bleed cosmos
 *   /identity — the solids portrait field
 *
 * Reduced-motion, theme switching and canvas lifecycle are handled by
 * PageAtmosphere itself.
 */

function variantFor(path: string): Variant | null {
    if (path === "/") return null;
    if (path.startsWith("/hub")) return null;
    if (path.startsWith("/about")) return null;
    if (path.startsWith("/identity")) return null;
    if (path.startsWith("/work")) return "schematic";
    if (path.startsWith("/case-studies")) return "field";
    if (path.startsWith("/research")) return "lattice";
    if (path.startsWith("/articles")) return "motes";
    if (path.startsWith("/services")) return "flow";
    if (path.startsWith("/lab")) return "signal";
    if (path.startsWith("/opportunities")) return "pathways";
    if (path.startsWith("/contact") || path.startsWith("/links")) return "orbit";
    if (path.startsWith("/capabilities") || path.startsWith("/intelligence")) return "network";
    if (path.startsWith("/how-i-work") || path.startsWith("/proof")) return "field";
    if (path.startsWith("/work-with-me")) return "signal";
    return "motes"; // certifications, cv, testimonials and the remaining routes
}

export default function SiteAmbience() {
    const pathname = usePathname();
    const variant = variantFor(pathname ?? "/");
    if (!variant) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
            <PageAtmosphere variant={variant} intensity={1} className="cn2-atmosphere-plain" />
        </div>
    );
}
