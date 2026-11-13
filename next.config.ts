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
  // Every URL from the Express site is kept as-is, so no redirects are needed yet.
  // If a URL ever changes, add a permanent redirect here, for example:
  // { source: "/old-path", destination: "/new-path", permanent: true }
  async redirects() {
    return [];
  },
};

export default nextConfig;
