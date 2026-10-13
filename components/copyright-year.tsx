import { cacheLife } from "next/cache";

/**
 * The current year. Cached so the page can still be prerendered, and
 * refreshed daily so it rolls over on 1 January without a redeploy.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
