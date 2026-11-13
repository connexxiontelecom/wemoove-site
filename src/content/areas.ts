/** Abuja areas offered in the fare estimator. Add or remove areas here (and in src/lib/pricing.ts). */
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
