"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { capabilities } from "@/data/capabilities";
import { flagshipProjects } from "@/data/projects";

export default function CapabilityField() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];

  return (
    <section aria-label="What I build">
      <SectionHeader
        act="ACT II"
        code="SIGNAL"
        title="WHAT I BUILD"
        subtitle="Eight capabilities, one discipline: systems where evidence is produced before conclusions are drawn."
        meta="SELECT A NODE TO INSPECT"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-[1.25fr_1fr]">
          {/* node field */}
          <div className="grid-field-fine grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const isActive = cap.id === activeId;
              return (
                <Reveal key={cap.id} delay={i * 60}>
                  <button
                    onClick={() => setActiveId(cap.id)}
                    aria-pressed={isActive}
                    className={`group flex h-full w-full flex-col justify-between gap-6 border-0 p-6 text-left transition-colors duration-300 ${
                      isActive
                        ? "bg-signal-soft"
                        : "bg-background hover:bg-surface-2"
                    }`}
                  >
                    <span className="flex items-baseline justify-between">
                      <span
                        className={`label-mono transition-colors ${
                          isActive ? "text-signal" : "text-muted group-hover:text-foreground"
                        }`}
                      >
                        {cap.name}
                      </span>
                      <span
                        className={`num-mono text-[10px] ${
                          isActive ? "text-signal" : "text-faint"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span
                      className={`signal-rule transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* inspector panel */}
          <Reveal className="bg-background">
            <div className="flex h-full flex-col p-8 md:p-10">
              <p className="label-mono text-faint">
                NODE / <span className="text-signal">{active.id.replace(/-/g, "_").toUpperCase()}</span>
              </p>
              <h3 className="display mt-4 text-3xl md:text-4xl">{active.name}</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted">{active.description}</p>

              <div className="mt-8">
                <p className="label-mono text-[10px] tracking-[0.2em] text-faint">EVIDENCE — PROJECTS</p>
                <ul className="mt-3 space-y-2">
                  {active.projects.map((pid) => {
                    const project = flagshipProjects.find((p) => p.id === pid);
                    return (
                      <li key={pid}>
                        {project ? (
                          <Link
                            href={project.route}
                            className="link-line label-mono text-xs text-foreground transition-colors hover:text-signal"
                          >
                            {project.index} / {project.shortTitle} — {project.category}
                          </Link>
                        ) : (
                          <span className="label-mono text-xs text-muted">{pid}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <p className="label-mono text-[10px] tracking-[0.2em] text-faint">INSTRUMENTATION</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="num-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {active.research.length > 0 && (
                <div className="mt-auto pt-8">
                  <Link
                    href="/research"
                    className="link-line label-mono text-xs text-muted transition-colors hover:text-signal"
                  >
                    RELATED RESEARCH → {active.research.length} ENTR
                    {active.research.length === 1 ? "Y" : "IES"}
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
