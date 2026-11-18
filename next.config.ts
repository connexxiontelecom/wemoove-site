import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds plain HTML/CSS/JS into out/ for hosts without a new enough Node.js
 * (cPanel here has Node 16; Next 16 needs 20.9+). Apache serves the files; public/.htaccess
 * handles the redirect and clean URLs. Without it: the normal server build (Vercel, or Node 20+).
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  // Static export writes /about as about/index.html, which Apache serves without any rewrite rules.
  ...(staticExport ? { trailingSlash: true } : {}),
  // No cacheComponents: every page is fully static, and it can't be combined with the static export
  // (robots.ts and sitemap.ts need `dynamic = "force-static"` there, which Cache Components rejects).
  images: {
    formats: ["image/webp"],
    // Static files can't use on-the-fly image resizing.
    unoptimized: staticExport,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Every other URL from the Express site is kept as-is. Add a permanent redirect here if one changes.
  // Not available in a static export: public/.htaccess does the same redirect there.
  ...(staticExport ? {} : { redirects }),
};

async function redirects() {
  return [
    // Safety is split into /safety/passengers and /safety/drivers. Temporary (307), so /safety
    // can become an overview page later without browsers having cached the redirect.
    { source: "/safety", destination: "/safety/passengers", permanent: false },
  ];
}

export default nextConfig;
