import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build for cPanel's Node.js app hosting (see README).
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/webp"],
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
  async redirects() {
    return [
      // Safety is split into /safety/passengers and /safety/drivers. Temporary (307), so /safety
      // can become an overview page later without browsers having cached the redirect.
      { source: "/safety", destination: "/safety/passengers", permanent: false },
    ];
  },
};

export default nextConfig;
