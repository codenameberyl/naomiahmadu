import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-site py-24 md:py-36">
      <p className="label flex items-center gap-3 text-accent">
        <span aria-hidden="true" className="h-px w-7 bg-accent" />
        404
      </p>
      <h1 className="mt-5 font-display-lg text-display font-normal">
        Page not <em className="font-light text-accent">found</em>.
      </h1>
      <p className="mt-7 max-w-prose text-lead text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Go home
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          View the work
        </ButtonLink>
      </div>
    </section>
  );
}
