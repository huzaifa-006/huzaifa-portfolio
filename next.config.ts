import type { NextConfig } from "next";

/**
 * The site is exported as plain static files (the `out/` folder), so it can be
 * hosted for free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.
 *
 * NEXT_PUBLIC_BASE_PATH is only needed for GitHub Pages project sites
 * (e.g. "/huzaifa-portfolio"). Leave it empty on Vercel.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
