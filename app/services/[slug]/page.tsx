import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import { getServiceBundle, serviceSlugs } from "@/data/services";
import { ServiceSchematic } from "@/components/services/service-schematics";
import { getTestimonialsForWork } from "@/data/testimonials";
import WorkEndorsement from "@/components/testimonials/work-endorsement";
import { site } from "@/data/site";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getServiceBundle(slug);
  if (!bundle) return { title: "Service not found" };
  const { service } = bundle;

  return {
    title: `${service.promise.split(".")[0]} — Services`,
    description: service.promise,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      images: ["/opengraph-image"],
      title: `${service.promise.split(".")[0]} — Bukya Naresh / CN2.dev`,
      description: service.promise,
    },
  };
}

function Block({
  label,
  items,
  accent = "signal",
}: {
  label: string;
  items: string[];
  accent?: "signal" | "research" | "muted";
}) {
  const color =
    accent === "signal" ? "text-signal" : accent === "research" ? "text-research" : "text-faint";
  return (
    <div>
      <p className={`label-mono ${color}`}>{label}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getServiceBundle(slug);
  if (!bundle) notFound();
  const { service, capability, category, projects, research } = bundle;

  return (
    <>
      {/* ---- header ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                <Link href="/services" className="transition-colors hover:text-foreground">
                  SERVICES
                </Link>{" "}
                <span className="text-signal">/</span> {capability.domain}
              </p>
              <p className="label-mono text-faint">
                {projects.length > 0 ? "EVIDENCED BY THE ARCHIVE" : "CONCEPTUAL"}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(2.4rem,8vw,6.5rem)]">{capability.name}</KineticText>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {service.promise}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              <span className="label-mono text-signal">WHO THIS IS FOR — </span>
              {service.audience}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="label-mono border border-line-strong bg-surface px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                ENQUIRE ABOUT THIS SERVICE →
              </Link>
              <Link
                href="/opportunities/freelance"
                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                SCOPE &amp; PROCESS →
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- problem / deliverables / scope ---- */}
      <section aria-label="Engagement detail" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            <Reveal>
              <Block label="THE PROBLEM IT ADDRESSES" items={service.problems} />
            </Reveal>
            <Reveal delay={80}>
              <Block
                label="EXPECTED DELIVERABLES"
                items={service.deliverables}
                accent="research"
              />
            </Reveal>
            <Reveal delay={160}>
              <Block label="OUT OF SCOPE" items={service.outOfScope} accent="muted" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- technical approach from the capability ---- */}
      <section aria-label="Technical approach" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">TECHNICAL APPROACH</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">HOW THE WORK IS DONE</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {capability.description}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="viz-frame corner-ticks max-w-[520px] p-6 md:p-8">
                <p className="label-mono text-faint">SCHEMATIC · {category.label}</p>
                <div className="mt-4">
                  <ServiceSchematic schematic={category.schematic} />
                </div>
              </div>
              <div className="corner-ticks border border-line bg-surface p-6 md:p-8">
                <p className="label-mono text-faint">METHODS</p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  {capability.technologies.join(" · ")}
                </p>
                <p className="label-mono mt-6 text-faint">EVIDENCE</p>
                <p className="mt-3 text-base leading-relaxed text-muted">{capability.evidence}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- feedback about this service — only when a published review exists ---- */}
      {getTestimonialsForWork("service", slug).length > 0 && (
        <section aria-label="Feedback about this service" className="border-b border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <WorkEndorsement kind="service" slug={slug} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- related project examples ---- */}
      {projects.length > 0 && (
        <section aria-label="Relevant projects" className="border-b border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <p className="label-mono text-signal">RELEVANT PROJECT EXAMPLES</p>
              <h2 className="display mt-4 text-3xl md:text-5xl">WORK THAT PROVES IT</h2>
            </Reveal>
            <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <Link
                    href={`/work/${p.id}`}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="label-mono text-faint">BUILD</span>
                      <span className="label-mono text-foreground">{p.status}</span>
                    </div>
                    <span className="display mt-4 block text-xl md:text-2xl">{p.title}</span>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.thesis}</p>
                    <span className="label-mono mt-4 text-[10px] text-faint">
                      {p.evidenceLabel}
                    </span>
                    <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN PROJECT →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- related research ---- */}
      {research.length > 0 && (
        <section aria-label="Related research" className="border-b border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <p className="label-mono text-research">RELATED RESEARCH</p>
              <h2 className="display mt-4 text-3xl md:text-5xl">THE WRITTEN RECORD</h2>
            </Reveal>
            <div className="mt-10 space-y-px bg-line">
              {research.map((r, i) => (
                <Reveal key={r.id} delay={i * 60}>
                  <Link
                    href={`/research/${r.id}`}
                    className="group flex flex-col bg-background p-6 transition-colors hover:bg-surface md:flex-row md:items-baseline md:gap-8 md:p-8"
                  >
                    <span className="label-mono shrink-0 text-faint">{r.category}</span>
                    <span className="mt-2 flex-1 text-base leading-relaxed text-foreground md:mt-0">
                      {r.title}
                    </span>
                    <span className="label-mono mt-3 shrink-0 text-research md:mt-0">
                      {r.status} →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- limitations ---- */}
      <section aria-label="Limitations" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">LIMITATIONS</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">SCOPE &amp; LIMITS</h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-8 max-w-3xl space-y-4">
              {service.limitations.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- working process: the real stages of this engagement ---- */}
      <section aria-label="Working process" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-faint">WORKING PROCESS</p>
            <h2 className="display mt-4 text-2xl md:text-4xl">HOW THIS ENGAGEMENT RUNS</h2>
          </Reveal>
          <Reveal delay={80}>
            <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((stage, i) => (
                <li key={stage} className="flex h-full items-start gap-4 bg-background p-5">
                  <span className="num-mono text-xs text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-foreground">{stage}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
              Each stage produces something checkable. The full process, with what every stage
              produces across all work, lives on the process page. Every engagement starts the
              same way: describe the problem, the data, and the evidence that would count as
              success.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/how-i-work"
                className="label-mono border border-line-strong px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                HOW I WORK →
              </Link>
              <Link
                href="/services"
                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                ALL SERVICES →
              </Link>
              <a
                href={site.links.email}
                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                EMAIL DIRECTLY →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
