import type { NextConfig } from "next";

/**
 * Information architecture — the WORK migration, then the Builds destination.
 *
 * WORK is the project catalogue (/work/<project> = product overview) with the
 * deep proof at /case-studies/<project>; research entries own /research/<entry>.
 *
 * Two generations of URL live side by side and both have to keep working:
 *
 *   /builds/<legacy-project> → /work/<project>
 *       /builds was the project catalogue before it became a three-section
 *       destination (128f514). That commit removed the blanket
 *       `/builds/:project` rule together with the top-level `/builds` one.
 *       Dropping the top-level rule was correct — /builds is a real page now —
 *       but dropping the deep-link rule stranded every old project URL on a
 *       404. The twelve slugs below are listed explicitly rather than as a
 *       `:project` wildcard because redirects are checked before the
 *       filesystem: a wildcard would shadow the live
 *       /builds/products|projects|personal pages.
 *
 *   /certifications → /credentials (canonical since v4; the v3 direction is
 *                     removed to avoid a redirect loop)
 *   /quant[/*], /research/market-data-replay, /research/qrsip → their /work homes
 *   /career, /about/capabilities → /about#capability-map
 *
 * The headquarters lives at /hub.
 */

/** Project slugs that were reachable under /builds/ before the v4 migration. */
const LEGACY_BUILD_SLUGS = [
  "apex-quant-engine",
  "automated-trading-os",
  "billing-data-gateway",
  "bustub-engine",
  "crypto-platform",
  "forex-platform",
  "ifm-costintel",
  "market-data-replay",
  "qrsip",
  "sentiment-stream",
  "strata-engine",
  "systems-kernel",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      ...LEGACY_BUILD_SLUGS.map((slug) => ({
        source: `/builds/${slug}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      { source: "/certifications", destination: "/credentials", permanent: true },
      { source: "/quant", destination: "/work", permanent: true },
      { source: "/quant/apex-quant-engine", destination: "/work/apex-quant-engine", permanent: true },
      { source: "/quant/automated-trading-os", destination: "/work/automated-trading-os", permanent: true },
      { source: "/research/market-data-replay", destination: "/work/market-data-replay", permanent: true },
      { source: "/research/qrsip", destination: "/work/qrsip", permanent: true },
      { source: "/career", destination: "/about#capability-map", permanent: true },
      { source: "/capabilities", destination: "/about#capability-map", permanent: true },
      { source: "/about/capabilities", destination: "/about#capability-map", permanent: true },
    ];
  },
};

export default nextConfig;
