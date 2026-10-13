import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { MediaFrame } from "@/components/media-frame";
import { OutcomeChips } from "@/components/outcome";
import { Reveal } from "@/components/reveal";
import type { Role } from "@/content/types";

type RoleCardProps = {
  role: Role;
  /** Preload the media (first card only, as it is the likely LCP element). */
  preload?: boolean;
  /** Puts the media on the right on wide screens. */
  flip?: boolean;
};

export function RoleCard({
  role,
  flip = false,
  preload = false,
}: RoleCardProps) {
  const headingId = `role-${role.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-12 md:pt-14"
    >
      <Reveal
        disabled={preload}
        className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}
      >
        <MediaFrame
          media={role.media}
          preload={preload}
          sizes="(min-width: 48rem) 22rem, 20rem"
          className="mx-auto w-full max-w-[20rem] md:max-w-[22rem]"
        />
      </Reveal>

      <Reveal
        disabled={preload}
        className={`flex flex-col gap-5 md:col-span-7 ${flip ? "md:order-1 md:col-start-1" : ""}`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted">
          <p className="font-display-italic text-lg text-accent italic">
            Role {role.number}
          </p>
          <p>{role.dates}</p>
        </div>

        <div>
          <h2 id={headingId} className="font-display-lg text-h3 font-normal">
            {role.title}
          </h2>
          <p className="mt-2 font-semibold">
            {role.company} · {role.location}
          </p>
        </div>

        <p className="text-lead text-muted">{role.summary}</p>

        <ul className="flex flex-col gap-3">
          {role.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-px w-4 shrink-0 bg-accent"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <OutcomeChips chips={role.chips} />

        <Link
          href={`/work/${role.slug}`}
          className="group mt-1 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-accent"
        >
          Read the case study
          <span className="sr-only">
            : {role.title}, {role.company}
          </span>
          <ArrowRightIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  );
}
