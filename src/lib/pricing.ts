import type { Area } from "@/content/areas";

/* ==========================================================================
   Fare estimate used by the home page hero.
   EVERY VALUE IN THIS BLOCK IS A PLACEHOLDER. Replace with real pricing.
   ========================================================================== */

/** PLACEHOLDER [BASE_FARE]: flat amount added to every Solo trip, in naira. */
export const BASE_FARE = 500;

/** PLACEHOLDER [PER_KM]: Solo price per kilometre, in naira. */
export const PER_KM = 150;

/** Shared fare as a share of the Solo fare (45%). */
export const SHARED_RATIO = 0.45;

/** Shared fares are rounded to the nearest ₦50. */
export const ROUND_TO = 50;

/**
 * PLACEHOLDER [DISTANCES_KM]: approximate road distance in km between areas.
 * Each pair is listed once; order doesn't matter.
 */
const DISTANCES_KM: Record<string, number> = {
  "Wuse|Maitama": 4, "Wuse|Garki": 5, "Wuse|CBD": 3, "Wuse|Gwarinpa": 14,
  "Wuse|Lugbe": 20, "Wuse|Jabi": 6, "Wuse|Kubwa": 22, "Wuse|Asokoro": 8,
  "Maitama|Garki": 8, "Maitama|CBD": 5, "Maitama|Gwarinpa": 15, "Maitama|Lugbe": 23,
  "Maitama|Jabi": 8, "Maitama|Kubwa": 23, "Maitama|Asokoro": 8,
  "Garki|CBD": 4, "Garki|Gwarinpa": 18, "Garki|Lugbe": 17, "Garki|Jabi": 9,
  "Garki|Kubwa": 26, "Garki|Asokoro": 5,
  "CBD|Gwarinpa": 16, "CBD|Lugbe": 19, "CBD|Jabi": 7, "CBD|Kubwa": 24, "CBD|Asokoro": 5,
  "Gwarinpa|Lugbe": 27, "Gwarinpa|Jabi": 10, "Gwarinpa|Kubwa": 10, "Gwarinpa|Asokoro": 21,
  "Lugbe|Jabi": 22, "Lugbe|Kubwa": 33, "Lugbe|Asokoro": 20,
  "Jabi|Kubwa": 18, "Jabi|Asokoro": 12,
  "Kubwa|Asokoro": 29,
};

/* ========================================================================== */

export type RideMode = "solo" | "shared";

export type Quote = {
  km: number;
  solo: number;
  shared: number;
  savings: number;
};

export function distanceKm(a: Area, b: Area): number | null {
  if (a === b) return null;
  return DISTANCES_KM[`${a}|${b}`] ?? DISTANCES_KM[`${b}|${a}`] ?? null;
}

/** Returns Solo and Shared fares between two areas, or null when they are the same area. */
export function getQuote(pickup: Area, destination: Area): Quote | null {
  const km = distanceKm(pickup, destination);
  if (km === null) return null;
  const solo = Math.round(BASE_FARE + PER_KM * km);
  const shared = Math.round((solo * SHARED_RATIO) / ROUND_TO) * ROUND_TO;
  return { km, solo, shared, savings: solo - shared };
}

/** ₦2,500 style formatting. Done by hand so server and browser output always match. */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
