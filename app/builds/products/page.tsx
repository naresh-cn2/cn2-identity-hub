import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";

export const metadata: Metadata = {
  title: "PRODUCTS & PLATFORMS — BUILDS — Bukya Naresh / CN2.dev",
  description:
    "Commercial products and platforms — verified systems with documented architecture, capabilities and evidence.",
  alternates: { canonical: "/builds/products" },
  openGraph: {
    images: ["opengraph-image"],
    title: "Products & Platforms — BUILDS — Bukya Naresh / CN2.dev",
    description:
      "Verified commercial products and platforms with documented architecture and evidence.",
  },
};

function ProductEntry({
  name,
  tagline,
  description,
  tech,
  status,
  evidenceLabel,
  repoUrl,
  caseStudyUrl,
  liveUrl,
  category = "PRODUCT",
}: {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  evidenceLabel: string;
  repoUrl: string;
  caseStudyUrl?: string;
  liveUrl?: string;
  category?: string;
}) {
  return (
    <article className="relative group border border-line bg-surface/30 rounded-xl p-6 md:p-8 transition-colors hover:border-signal/50 hover:bg-surface/50">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="label-mono text-xs text-signal">{category}</span>
          <h3 className="mt-1 display-condensed text-2xl md:text-3xl text-foreground">{name}</h3>
          <p className="mt-2 text-lg text-muted">{tagline}</p>
        </div>
        <span className="label-mono text-xs text-faint whitespace-nowrap">{status}</span>
      </header>
      <p className="text-base leading-relaxed text-muted mb-6">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span key={t} className="px-3 py-1 text-xs label-mono border border-line bg-background rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
        <span className="label-mono text-xs text-faint">{evidenceLabel}</span>
        <div className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="corner-ticks group inline-flex items-center gap-2 text-sm label-mono text-muted transition-colors hover:text-signal"
            >
              <span>LIVE SITE</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
          {caseStudyUrl && (
            <a
              href={caseStudyUrl}
              className="corner-ticks group inline-flex items-center gap-2 text-sm label-mono text-muted transition-colors hover:text-signal"
            >
              <span>CASE STUDY</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corner-ticks group inline-flex items-center gap-2 text-sm label-mono text-signal transition-colors hover:text-white"
          >
            <span>VIEW REPOSITORY</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <MarketDepth />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">BUILDS / PRODUCTS & PLATFORMS</p>
              <p className="label-mono text-faint">COMMERCIAL PRODUCTS · VERIFIED DELIVERY</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(3rem,10vw,8rem)]" ariaLabel="PRODUCTS">
              PRODUCTS
            </KineticText>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Commercial products and platforms built for production use — each documented from the
              original problem through architecture, implementation, testing, and verifiable evidence.
              These are systems delivered to clients or deployed in live environments.
            </p>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <section aria-labelledby="products-heading" className="space-y-8">
          <header>
            <h2 id="products-heading" className="display-condensed text-3xl md:text-4xl">
              PRODUCTS & PLATFORMS
            </h2>
            <p className="mt-2 label-mono text-xs text-faint">
              10 PRODUCTS · VERIFIED ARCHITECTURES
            </p>
          </header>

          <ProductEntry
            name="STRATA-ENGINE"
            tagline="Autonomous multi-market quantitative trading engine"
            description="Institutional-grade algorithmic strategy engine and real-time risk platform with deterministic execution routing, pre-trade margin governors, and high-frequency order book tracking across multiple asset classes. Private repository — source not published."
            tech={["Rust", "C++20", "Python 3.12", "WebSocket", "ZeroMQ", "Docker", "POSIX Shared Memory"]}
            status="UNPUBLISHED · NO BENCHMARK RELEASED"
            evidenceLabel="NO PUBLISHED BENCHMARK · WORKSAMPLE"
            repoUrl="https://strata-engine.duckdns.org"
            liveUrl="https://strata-engine.duckdns.org"
            caseStudyUrl="/works/strata-engine"
            category="PRODUCT"
          />
          <ProductEntry
            name="BILLING DATA GATEWAY"
            tagline="High-throughput C11 billing ingestion & validation engine"
            description="Zero-dependency C11 gateway processing 487,421 records/second with full validation pipeline. Designed for telecom and utility billing systems requiring deterministic throughput and audit-grade traceability."
            tech={["C11", "Zero Dependencies", "Custom Memory Pool", "Lock-Free Queues"]}
            status="RELEASED v1.0.0"
            evidenceLabel="SELF-BENCHMARK · RELEASED"
            repoUrl="https://github.com/naresh-cn2/billing-data-gateway"
            category="PRODUCT"
          />
          <ProductEntry
            name="AXIOM JSON"
            tagline="Zero-dependency JSON processing library"
            description="High-performance JSON parser and serializer with zero external dependencies. Designed for embedded and systems contexts where binary size and deterministic parsing matter."
            tech={["C", "Zero Dependencies", "Streaming Parser", "SIMD Optimized"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="IN DEVELOPMENT · NO PUBLISHED BENCHMARK"
            repoUrl="https://github.com/naresh-cn2/Axiom-JSON"
            category="PRODUCT"
          />
          <ProductEntry
            name="OMNI-LEDGER"
            tagline="Financial ledger processing engine"
            description="Double-entry financial ledger engine with immutable audit trail, multi-currency support, and regulatory compliance features. Built for fintech and institutional use cases."
            tech={["Python", "PostgreSQL", "Event Sourcing", "Immutable Log"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="IN DEVELOPMENT · NO PUBLISHED BENCHMARK"
            repoUrl="https://github.com/naresh-cn2/omniledger-engine"
            category="PRODUCT"
          />
          <ProductEntry
            name="CLOUD COST ENGINE"
            tagline="C11 FinOps engine for cloud cost attribution"
            description="Zero-dependency C11 engine for real-time cloud cost allocation and attribution across multi-cloud environments. Processes billing data at line rate with sub-millisecond latency."
            tech={["C11", "Zero Dependencies", "Stream Processing", "Multi-Cloud"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="IN DEVELOPMENT · NO PUBLISHED BENCHMARK"
            repoUrl="https://github.com/naresh-cn2/cloud-cost-engine"
            category="PRODUCT"
          />
          <ProductEntry
            name="SETTLE-IQ"
            tagline="Financial Settlement Discrepancy Investigation Engine"
            description="Financial settlement discrepancy investigation engine that reconciles expected vs. actual settlements, identifies variances, and generates evidence-backed investigation reports."
            tech={["Python", "Financial reconciliation", "Investigation reporting"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="ACTIVE DEVELOPMENT"
            repoUrl="https://github.com/naresh-cn2/settleiq"
            caseStudyUrl="/works/settleiq"
            category="PRODUCT"
          />
          <ProductEntry
            name="B2B LEAD PROSPECTOR"
            tagline="B2B Lead Scraping & Contact Enrichment Platform"
            description="Production B2B lead scraper and contact enrichment platform for Apify."
            tech={["Python", "Apify", "Web scraping", "Contact enrichment"]}
            status="PRODUCTION"
            evidenceLabel="PRODUCTION"
            repoUrl="https://github.com/naresh-cn2/b2b-lead-prospector"
            caseStudyUrl="/works/b2b-lead-prospector"
            category="PRODUCT"
          />
          <ProductEntry
            name="FORGE-STREAM"
            tagline="High-Performance Data Ingestion & CSV Processing"
            description="High-performance data ingestion and CSV processing infrastructure."
            tech={["C", "Systems programming", "CSV parsing", "Data ingestion"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="ACTIVE DEVELOPMENT"
            repoUrl="https://github.com/naresh-cn2/forge-stream"
            caseStudyUrl="/works/forge-stream"
            category="PRODUCT"
          />
          <ProductEntry
            name="ZERO-LATENCY-ENGINE"
            tagline="High-Performance C Engine for CSV Processing"
            description="High-performance C engine achieving 15x speedup over Python/Pandas using mmap and custom parsing for 20M+ row CSV files."
            tech={["C11", "mmap", "Custom parsing", "CSV processing"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="ACTIVE DEVELOPMENT"
            repoUrl="https://github.com/naresh-cn2/Zero-Latency-Engine"
            caseStudyUrl="/works/zero-latency-engine"
            category="PRODUCT"
          />
          <ProductEntry
            name="FORGE-CORE"
            tagline="Lock-Free User-Space IPC Transport"
            description="Lock-free user-space IPC transport fabric written in C11 utilizing POSIX shared memory (/dev/shm) and asymmetric core-pinning isolation maps."
            tech={["C11", "POSIX shared memory", "IPC", "Core pinning"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="ACTIVE DEVELOPMENT"
            repoUrl="https://github.com/naresh-cn2/forge-core"
            caseStudyUrl="/works/forge-core"
            category="PRODUCT"
          />
        </section>
      </main>
    </>
  );
}