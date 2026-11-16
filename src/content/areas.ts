/** Abuja areas drawn on the ride maps (see src/lib/abujaMap.ts for their positions). */
export const AREAS = [
  "Wuse",
  "Maitama",
  "Garki",
  "CBD",
  "Gwarinpa",
  "Lugbe",
  "Jabi",
  "Kubwa",
  "Asokoro",
] as const;

export type Area = (typeof AREAS)[number];
