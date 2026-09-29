import type { NextConfig } from "next";

/**
 * Deployed on Vercel as a regular Next.js app. Pages are still pre-rendered
 * as static HTML at build time; the only server code is the contact-form
 * API route (src/app/api/contact/route.ts), which sends email server-side.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
