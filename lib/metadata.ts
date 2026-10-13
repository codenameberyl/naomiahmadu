import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  /** Page title. Omit to use the site title (home page). */
  title?: string;
  description: string;
  path: string;
};

/**
 * Per-page metadata with canonical, Open Graph and Twitter fields filled in.
 * Setting `openGraph` on a page replaces the root's, so the generated
 * image from app/opengraph-image.tsx is referenced explicitly here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : site.title;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: site.title,
  };

  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
