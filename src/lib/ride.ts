"use client";

import { useEffect, useState } from "react";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import { useReducedMotion } from "@/lib/motion";

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

/** How long each ride type stays selected while the chooser plays on its own (Tag along plays one drive in the hero; use 15500 for the full walkthrough). */
export const AUTO_MODE_MS: Record<RideMode, number> = { solo: 4500, shared: 15500 };

/**
 * Ride type that flips between Shared and Solo on its own so visitors see both.
 * Pauses while hovered or focused (spread `pauseProps` on a wrapper) or while the tab is hidden,
 * stops for good once the visitor picks one, and never runs for reduced motion.
 */
export function useAutoMode(initial: RideMode = "shared") {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<RideMode>(initial);
  const [userChose, setUserChose] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoplaying = !userChose && !paused && !reduced;

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setTimeout(() => {
      setMode((m) => (document.hidden ? m : m === "shared" ? "solo" : "shared"));
    }, AUTO_MODE_MS[mode]);
    return () => window.clearTimeout(id);
  }, [autoplaying, mode]);

  const choose = (next: RideMode) => {
    setUserChose(true);
    setMode(next);
  };

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  return { mode, choose, autoplaying, pauseProps };
}
