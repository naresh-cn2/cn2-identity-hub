"use client";

import { useEffect } from "react";

/**
 * CharacterInteractionTracker (formerly CursorPhoton) — Precise Character-Level Hover Interaction.
 *
 * User Requirement:
 * - When the pointer moves over text (e.g. CREDENTIALS, QUANTITATIVE DEVELOPER, navigation labels, card titles):
 *   ONLY the individual character under the pointer receives the visual effect (cyan/electric blue pixel glow).
 *   The other characters in the sentence/word remain unaffected.
 * - When the pointer moves to the next letter, the effect transfers to that character only.
 * - Completely zero mouse-following white/cyan trailing halo.
 * - Full accessibility, text selection, and click functionality preserved.
 */
export default function CursorPhoton() {
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    // Tags and selectors whose characters should react individually
    const eligibleSelectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      ".display",
      ".display-condensed",
      ".label-mono",
      ".num-mono",
      ".kt-inner",
      "nav a",
      "header a",
      ".hub-dest-title",
      "[data-char-split]",
    ];

    const splitTextNodeIntoChars = (textNode: Text) => {
      const text = textNode.textContent;
      if (!text || text.trim() === "") return;

      const frag = document.createDocumentFragment();
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " ") {
          frag.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.className = "char-cell";
          span.textContent = char;
          frag.appendChild(span);
        }
      }
      textNode.parentNode?.replaceChild(frag, textNode);
    };

    const processElement = (el: HTMLElement) => {
      if (el.hasAttribute("data-chars-processed")) return;
      el.setAttribute("data-chars-processed", "true");

      // Don't split inside inputs, scripts, or svgs
      const tag = el.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || tag === "svg" || tag === "script" || tag === "style") {
        return;
      }

      // Collect only direct text node children
      const childNodes = Array.from(el.childNodes);
      for (const node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          splitTextNodeIntoChars(node as Text);
        }
      }
    };

    // Process initial headings and interactive elements
    const initialProcess = () => {
      try {
        const selector = eligibleSelectors.join(", ");
        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach(processElement);
      } catch {}
    };

    initialProcess();

    // On pointerover, if the target is inside an eligible heading or interactive element that isn't split yet, split it on the fly
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If it's already a char-cell, native CSS hover handles it
      if (target.classList.contains("char-cell")) return;

      // Check if target or an ancestor matches eligible selectors
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        for (const sel of eligibleSelectors) {
          if (el.matches && el.matches(sel)) {
            processElement(el);
            return;
          }
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });

    // Re-check periodically when route changes
    const timer = setInterval(initialProcess, 1500);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      clearInterval(timer);
    };
  }, []);

  return null;
}
