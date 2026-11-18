import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Prerendered at build time, which the static export (cPanel) requires.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
