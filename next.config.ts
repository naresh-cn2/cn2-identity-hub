import type { NextConfig } from "next";

/**
 * Information architecture v3.
 * Flagship work lives under /builds/<project> (product overview) with the deep
 * proof at /case-studies/<project>; research entries own /research/<entry>.
 * /intelligence is now a real route, so its legacy redirect is removed. The
 * previous /quant and /career destinations stay redirected so no inbound link
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
    ];
  },
};

export default nextConfig;
