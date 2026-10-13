// TODO: set NEXT_PUBLIC_SITE_URL in Vercel to the final production domain.
// Falls back to Vercel's production URL, then to a placeholder subdomain.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "https://naomiahmadu.vercel.app";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
