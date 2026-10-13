import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/** schema.org Person for Naomi. Rendered on the home and about pages. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    url: siteUrl,
    image: absoluteUrl("/assets/naomi-portrait.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressCountry: site.countryCode,
    },
    sameAs: [site.linkedInUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
