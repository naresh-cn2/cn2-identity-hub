"use client";

import { usePathname, useRouter } from "next/navigation";

/**
 * Bottom-left return control, present on every inner page. It takes the
 * visitor back to wherever they came from — a section they were reading, a
 * filtered list, the page they arrived at through search — instead of
 * dumping them on a fixed destination. Hidden on the entry page (nothing
 * to return to) and the photo-only identity page (it carries its own back).
 */
export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/identity") return null;

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/hub");
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back to the previous page"
      className="label-mono menu-hit fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 border border-line bg-background/80 px-4 py-2.5 text-[10px] text-muted backdrop-blur-md transition-colors duration-200 hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal print:hidden"
    >
      <span aria-hidden="true">←</span> BACK
    </button>
  );
}
