"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/reveal";
import CertificateViewer from "@/components/credentials/certificate-viewer";
import {
  credentialBadges,
  credentials,
} from "@/data/credentials";

export default function CredentialBadgeList() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState("");

  return (
    <>
      <div
        className={`mt-10 grid gap-px ${
          credentialBadges.length > 1
            ? "bg-line sm:grid-cols-2 lg:grid-cols-3"
            : "max-w-md sm:max-w-lg"
        }`}
      >
        {credentialBadges.map((b, i) => {
          const record = credentials.find((c) => c.id === b.credentialId);
          return (
            <Reveal key={b.id} delay={i * 70}>
              <div className="flex h-full flex-col items-center bg-background p-8 text-center">
                <Image
                  src={b.image}
                  alt={b.imageAlt}
                  width={168}
                  height={168}
                  className="h-40 w-40"
                />
                <p className="label-mono mt-7 text-faint">{b.provider}</p>
                <p className="display mt-3 text-xl">{b.label}</p>
                <p className="label-mono mt-3 text-signal">{b.status}</p>
                {record && (
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="label-mono text-[10px] text-faint">EARNED WITH</p>
                    <p className="mt-2 text-sm leading-snug text-muted">{record.program}</p>
                    {record?.certificateImage && (
                      <button
                        onClick={() => {
                          setViewerImage(record.certificateImage!);
                          setViewerOpen(true);
                        }}
                        className="group/link mt-4 inline-block"
                      >
                        <span className="label-mono text-foreground transition-transform duration-300 group-hover/link:translate-x-1">
                          VIEW CERTIFICATE →
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Certificate viewer lightbox */}
      {viewerOpen && (
        <CertificateViewer
          isOpen={viewerOpen}
          imageSrc={viewerImage}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
}