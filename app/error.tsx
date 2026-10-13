"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/button-link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-site py-24 md:py-36">
      <p className="label flex items-center gap-3 text-accent">
        <span aria-hidden="true" className="h-px w-7 bg-accent" />
        Error
      </p>
      <h1 className="mt-5 font-display-lg text-display font-normal">
        Something went <em className="font-light text-accent">wrong</em>.
      </h1>
      <p className="mt-7 max-w-prose text-lead text-muted">
        This page didn&apos;t load properly. Try again, or head back home.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-semibold text-on-accent transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_88%,var(--text))]"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="ghost">
          Go home
        </ButtonLink>
      </div>
    </section>
  );
}
