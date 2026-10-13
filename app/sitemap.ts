import type { MetadataRoute } from "next";
import { roles } from "@/content/work";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const caseStudies = roles.map((role) => ({
    url: absoluteUrl(`/work/${role.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...caseStudies];
}
