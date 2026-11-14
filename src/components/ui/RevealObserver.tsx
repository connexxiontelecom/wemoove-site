"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const ITEMS = "[data-reveal], [data-reveal-stagger] > *";
/** Only the first page load shows on-screen content instantly; after client navigation it animates in. */
let firstLoad = true;

/**
 * Scroll reveals for every page. Mark elements with `data-reveal` (optionally "zoom", "left", "right"),
 * or a list with `data-reveal-stagger` to reveal its children one after another (stagger set in CSS).
 * Only classes are toggled, never inline styles, so hydration stays clean.
 *
 * Progressive enhancement: content is fully visible without JavaScript. On the first load, anything
 * already on screen is marked revealed straight away (no flash, no effect on LCP), and only content
 * below the fold is hidden and then eased in once as it scrolls into view. After client navigation the
 * new page's content animates in as well. Off for prefers-reduced-motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Reduced motion (or very old browsers): nothing is ever hidden, so there's nothing to do.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | undefined;
    const setup = () => {
      const fold = window.innerHeight;
      const pending: HTMLElement[] = [];
      for (const el of document.querySelectorAll<HTMLElement>(ITEMS)) {
        if (el.classList.contains("is-revealed")) continue;
        // First load: content already visible (or above the fold) is shown as-is.
        if (firstLoad && el.getBoundingClientRect().top < fold * 0.92) el.classList.add("is-revealed", "reveal-done");
        else pending.push(el);
      }
      firstLoad = false;
      document.documentElement.classList.add("reveal-ready");

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            observer?.unobserve(el);
            // Hand transitions back to the element (e.g. hover lifts) once its entrance has finished.
            const delay = Number(getComputedStyle(el).getPropertyValue("--reveal-i") || 0) * 90;
            window.setTimeout(() => el.classList.add("reveal-done"), 1000 + delay);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      pending.forEach((el) => observer?.observe(el));
    };

    if (!firstLoad) {
      // Client navigation: the new page rendered on the client (no hydration), so start right away.
      setup();
      return () => observer?.disconnect();
    }

    // First load: wait until the page has loaded and React has finished hydrating, so classes are
    // never added to server HTML React hasn't claimed yet. Until then nothing is hidden.
    let idle = 0;
    const schedule = () => {
      idle = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(setup, { timeout: 1500 }) : window.setTimeout(setup, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
