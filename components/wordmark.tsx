import Link from "next/link";
import { site } from "@/content/site";

export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onNavigate={onNavigate}
      className="inline-flex min-h-11 items-center font-display-lg text-2xl tracking-[-0.02em] text-text"
      aria-label={`${site.name}, home`}
    >
      {site.wordmark}
      <span className="text-accent">.</span>
    </Link>
  );
}
