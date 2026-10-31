"use client";

import Image from "next/image";
import { useEffect } from "react";

/**
 * CertificateViewer — internal lightbox for viewing certificate images.
 *
 * Opens without leaving /credentials. Displays the full certificate image,
 * preserves aspect ratio, supports closing via close button, Escape key,
 * or clicking the backdrop. Works on desktop and mobile.
 */
export default function CertificateViewer({
  isOpen,
  imageSrc,
  onClose,
}: {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="View certificate"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Content wrapper */}
      <div
        className="relative z-10 flex items-center justify-center p-4 max-w-[95vw] max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt="Certificate of completion"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-white dark:bg-surface"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 60vw"
          style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
          aria-label="Close certificate viewer"
        >
          <span className="text-white text-xl font-semibold leading-none">×</span>
        </button>

        {/* Full-size hint */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] text-white/60 tracking-wider uppercase">
          Click backdrop to close · Esc to exit
        </p>
      </div>
    </div>
  );
}