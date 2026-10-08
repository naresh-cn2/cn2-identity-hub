import type { NextConfig } from "next";

/**
 * Information architecture v2.
 * Flagship work now lives under /builds/<project>; research entries own
 * /research/<entry>. The previous /quant, /career and /intelligence
 * destinations are preserved as permanent redirects so no inbound link
 * or indexed URL breaks.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/quant", destination: "/builds", permanent: true },
      { source: "/quant/apex-quant-engine", destination: "/builds/apex-quant-engine", permanent: true },
      { source: "/quant/automated-trading-os", destination: "/builds/automated-trading-os", permanent: true },
      { source: "/research/market-data-replay", destination: "/builds/market-data-replay", permanent: true },
      { source: "/research/qrsip", destination: "/builds/qrsip", permanent: true },
      { source: "/career", destination: "/capabilities", permanent: true },
      { source: "/intelligence", destination: "/research", permanent: true },
    ];
  },
};

export default nextConfig;
