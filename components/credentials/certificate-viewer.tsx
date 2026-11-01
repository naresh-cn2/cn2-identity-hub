"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * CertificateViewer — internal lightbox for viewing certificate images.
 *
 * Opens without leaving /credentials. Displays the complete certificate at
 * its original aspect ratio (object-contain, original bytes), and closes
 * via the close button, Escape, or a backdrop click. Works on desktop and
 * mobile; an optional action opens the raw image in a new tab for zooming.
 *
 * Rendered through a portal on document.body: any wrapper with a transform
 * or will-change (Reveal sections, page transitions, VFX layers) would
 * otherwise become the containing block for this fixed overlay and anchor
 * it to the section instead of the viewport.
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="View certificate"
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Certificate — full frame, original proportions preserved */}
      <div
        className="relative z-10 flex h-[86vh] w-[92vw] max-w-[1400px] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt="Certificate of completion"
          fill
          unoptimized
          sizes="92vw"
          className="object-contain drop-shadow-2xl"
          priority
        />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 right-0 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
          aria-label="Close certificate viewer"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

        {/* Optional full-size view */}
        <a
          href={imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/70 transition-colors hover:text-white"
        >
          OPEN FULL SIZE ↗
        </a>
      </div>
    </div>,
    document.body
  );
}
