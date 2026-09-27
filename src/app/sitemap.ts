import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: `${siteUrl}/projects/${p.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
