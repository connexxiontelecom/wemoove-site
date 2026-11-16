"use client";

import { useEffect, useState } from "react";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";

export type RideMode = "solo" | "shared";

const ROUTES = home.hero.showcaseRoutes;
/** How long each sample trip stays on the map. */
const ROUTE_MS = 6500;

/**
 * Cycles the ride maps through sample Abuja trips so they feel alive without showing prices.
 * Stays on the first trip for reduced motion and pauses while the tab is hidden or `paused` is true.
 */
export function useShowcaseRoute(paused = false): { pickup: Area; destination: Area } {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % ROUTES.length);
    }, ROUTE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const [pickup, destination] = ROUTES[index];
  return { pickup, destination };
}
