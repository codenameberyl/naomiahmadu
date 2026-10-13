import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { MediaFrame } from "@/components/media-frame";
import { splitOutcome } from "@/components/outcome";
import { Reveal } from "@/components/reveal";
import type { Role } from "@/content/types";
import { getAdjacentRoles, getRole, roles } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  return pageMetadata({
    title: `${role.title}, ${role.company}`,
    description: `${role.title} at ${role.company} (${role.dates}). ${role.summary}`,
    path: `/work/${role.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();
  const { previous, next } = getAdjacentRoles(role.slug);

  return (
    <article>
      <header className="container-site pt-8 pb-12 md:pt-12 md:pb-16">
        <Link
          href="/work"
          className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-text"
        >
          <ArrowLeftIcon className="transition-transform duration-300 ease-out-soft group-hover:-translate-x-1" />
          All work
        </Link>

        <p className="label mt-10 flex items-center gap-3 text-accent md:mt-14">
          <span aria-hidden="true" className="h-px w-7 bg-accent" />
          Role {role.number}
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display-lg text-display font-normal">
          {role.title}
        </h1>
        <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="label text-muted">Company</dt>
            <dd className="mt-1.5 font-semibold">{role.company}</dd>
          </div>
          <div>
            <dt className="label text-muted">Location</dt>
            <dd className="mt-1.5 font-semibold">{role.location}</dd>
          </div>
          <div>
            <dt className="label text-muted">Dates</dt>
            <dd className="mt-1.5 font-semibold">{role.dates}</dd>
          </div>
        </dl>
        <p className="mt-10 max-w-prose font-display text-[clamp(1.35rem,1.15rem+0.9vw,1.9rem)] leading-snug">
          {role.summary}
        </p>
      </header>

      <section aria-labelledby="outcomes" className="container-site">
        <h2 id="outcomes" className="sr-only">
          Outcomes
        </h2>
        <ul
          className={`grid border-y border-line ${
            role.chips.length > 2
              ? "grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2"
          }`}
        >
          {role.chips.map((chip, index) => {
            const { figure, text } = splitOutcome(chip);
            return (
              <li
                key={chip}
                className={`flex flex-col justify-end gap-2 py-7 pr-4 ${outcomeCellBorders(index, role.chips.length)}`}
              >
                {figure ? (
                  <span className="font-display-lg text-metric font-light text-accent">
                    {figure}
                  </span>
                ) : null}
                <span
                  className={
                    figure
                      ? "text-muted"
                      : "font-display text-xl leading-snug sm:text-2xl"
                  }
                >
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="md:col-span-5">
          <Reveal className="md:sticky md:top-24">
            <MediaFrame
              media={role.media}
              preload
              sizes="(min-width: 48rem) 24rem, 22rem"
              className="mx-auto w-full max-w-[22rem] md:max-w-[24rem]"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-14 md:col-span-7">
          <OptionalProse heading="Challenge" paragraphs={role.challenge} />
          <OptionalProse heading="Approach" paragraphs={role.approach} />

          <section aria-labelledby="the-work">
            <h2 id="the-work" className="label text-accent">
              The work
            </h2>
            <ol className="mt-6 flex flex-col">
              {role.bullets.map((bullet, index) => (
                <Reveal
                  as="li"
                  key={bullet}
                  className="grid grid-cols-[3rem_1fr] gap-2 border-t border-line py-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display-italic text-lg text-accent italic"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lead">{bullet}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          <OptionalProse heading="Results" paragraphs={role.results} />
        </div>
      </div>

      {role.gallery && role.gallery.length > 0 ? (
        <section aria-labelledby="gallery" className="container-site pb-16">
          <h2 id="gallery" className="label text-accent">
            Gallery
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {role.gallery.map((item) => (
              <MediaFrame
                key={item.src}
                media={item}
                sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      ) : null}

      <CaseStudyNav previous={previous} next={next} />
    </article>
  );
}

/** Rules between outcome cells: 2×2 → 1×4 for four chips, 1 → 2 columns for two. */
function outcomeCellBorders(index: number, count: number) {
  if (count > 2) {
    return [
      index % 2 === 1 ? "border-l border-line pl-4 lg:pl-6" : "",
      index === 2 ? "lg:border-l lg:border-line lg:pl-6" : "",
      index < 2 ? "border-b border-line lg:border-b-0" : "",
    ].join(" ");
  }
  return index > 0
    ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-6"
    : "";
}

function OptionalProse({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs?: string[];
}) {
  if (!paragraphs || paragraphs.length === 0) return null;
  const id = heading.toLowerCase();
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="label text-accent">
        {heading}
      </h2>
      <div className="mt-6 flex max-w-prose flex-col gap-4 text-lead">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function CaseStudyNav({ previous, next }: { previous?: Role; next?: Role }) {
  return (
    <nav aria-label="Case studies" className="border-t border-line">
      <ul className="container-site grid gap-px sm:grid-cols-2">
        <li className="py-8 sm:py-12">
          {previous ? (
            <AdjacentLink role={previous} direction="previous" />
          ) : null}
        </li>
        <li className="border-t border-line py-8 sm:border-t-0 sm:border-l sm:py-12 sm:pl-8 sm:text-right">
          {next ? (
            <AdjacentLink role={next} direction="next" />
          ) : (
            <Link
              href="/work"
              className="group inline-flex min-h-11 flex-col gap-2 sm:items-end"
            >
              <span className="label text-muted">Back to</span>
              <span className="font-display-lg text-h3 group-hover:text-accent">
                All work
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function AdjacentLink({
  role,
  direction,
}: {
  role: Role;
  direction: "previous" | "next";
}) {
  const Arrow = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon;
  return (
    <Link
      href={`/work/${role.slug}`}
      rel={direction === "previous" ? "prev" : "next"}
      className={`group flex min-h-11 flex-col gap-2 ${
        direction === "next" ? "sm:items-end" : ""
      }`}
    >
      <span className="label flex items-center gap-2 text-muted">
        {direction === "previous" ? <Arrow /> : null}
        {direction === "previous" ? "Previous" : "Next"} · Role {role.number}
        {direction === "next" ? <Arrow /> : null}
      </span>
      <span className="font-display-lg text-h3 transition-colors group-hover:text-accent">
        {role.title}
      </span>
      <span className="text-sm text-muted">{role.company}</span>
    </Link>
  );
}
