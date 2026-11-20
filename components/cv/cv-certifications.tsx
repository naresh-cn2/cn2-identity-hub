"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { credentials, credentialBadges } from "@/data/credentials";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Chapter 07 — Verified Certifications
 * Genuine certifications and verified credentials only.
 * Each entry individually presented with issuer, date, verification status.
 */

export function CvCertifications() {
  const verified = credentials.filter((c) => c.state === "VERIFIED" || c.state === "COMPLETED");

  return (
    <CvChapterSection
      id="certifications"
      number="07"
      title="Certifications & Credentials"
      subtitle="Every credential is verifiable — issuer link or certificate document"
      accent="signal"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {verified.map((cert) => (
          <Reveal key={cert.id} className="border border-line bg-surface p-5 transition-colors hover:border-signal/50">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="label-mono text-[9px] text-faint">{cert.provider}</span>
              <CvEvidenceBadge level={cert.state} />
            </div>
            <h4 className="font-mono text-sm font-bold text-foreground mb-1">{cert.program}</h4>
            {cert.date && (
              <p className="label-mono text-[9px] text-faint mb-2">
                Issued {new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            )}
            <p className="text-xs text-muted leading-relaxed mb-3">{cert.learned}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {cert.skills.slice(0, 4).map((s) => (
                <span key={s} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 flex-1 text-center"
                >
                  VERIFY →
                </a>
              )}
              {cert.certificateUrl && !cert.verificationUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 flex-1 text-center"
                >
                  CERTIFICATE →
                </a>
              )}
            </div>
            {cert.credentialId && (
              <p className="label-mono mt-2 text-[9px] text-faint">
                Credential ID: {cert.credentialId}
              </p>
            )}
          </Reveal>
        ))}
      </div>

      {/* Digital Badges */}
      {credentialBadges.length > 0 && (
        <Reveal delay={200}>
          <div className="mt-8 border border-line bg-surface p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Digital Badges</h3>
              <span className="label-mono text-[9px] text-faint">Issued as presented</span>
            </div>
            <div className="grid gap-4">
              {credentialBadges.map((badge) => (
                <div key={badge.id} className="border border-line bg-surface p-5 flex items-center gap-4">
                  <div className="w-20 h-20 border border-line bg-surface/50 flex items-center justify-center rounded">
                    <span className="text-[10px] text-faint">🏅</span>
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-foreground">{badge.label}</h4>
                    <p className="label-mono text-[9px] text-faint">{badge.provider}</p>
                    <span className="label-mono text-[9px] border border-line px-2 py-0.5 text-faint">{badge.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </CvChapterSection>
  );
}