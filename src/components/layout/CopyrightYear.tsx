import { cacheLife } from "next/cache";

/** The current year, cached for a day so the page can still be prerendered. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
