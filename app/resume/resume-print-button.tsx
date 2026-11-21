"use client";

export default function ResumePrintButton() {
  return (
    <button
      type="button"
      className="resume-print-button"
      onClick={() => window.print()}
      aria-label="Download résumé as PDF"
    >
      DOWNLOAD RÉSUMÉ ↗
    </button>
  );
}
