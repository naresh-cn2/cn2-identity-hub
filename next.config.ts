import type { NextConfig } from "next";

/**
 * Information architecture v4 — the WORK migration.
 * WORK is the project catalogue (/work/<project> = product overview) with the
 * deep proof at /case-studies/<project>; research entries own /research/<entry>.
 * Every previous URL stays redirected so no inbound link or indexed URL breaks:
 *   /builds[/*]     → /work[/*]
 *   /certifications → /credentials (canonical since v4; the v3 direction is
 *                     removed to avoid a redirect loop)
 *   /quant[/*], /research/market-data-replay, /research/qrsip → their /work homes
 *   /career, /about/capabilities → /capabilities
 * The headquarters lives at /hub.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/builds", destination: "/work", permanent: true },
      { source: "/builds/:project", destination: "/work/:project", permanent: true },
      { source: "/certifications", destination: "/credentials", permanent: true },
      { source: "/quant", destination: "/work", permanent: true },
      { source: "/quant/apex-quant-engine", destination: "/work/apex-quant-engine", permanent: true },
      { source: "/quant/automated-trading-os", destination: "/work/automated-trading-os", permanent: true },
      { source: "/research/market-data-replay", destination: "/work/market-data-replay", permanent: true },
      { source: "/research/qrsip", destination: "/work/qrsip", permanent: true },
      { source: "/career", destination: "/capabilities", permanent: true },
      { source: "/about/capabilities", destination: "/capabilities", permanent: true },
    ];
  },
};

export default nextConfig;
