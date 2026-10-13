import { PersonJsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { Reveal } from "@/components/reveal";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Naomi Ahmadu graduated with honours from Pan-Atlantic University, Lagos, started in social media execution and moved into account management.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />

      <div className="container-site grid gap-10 pt-14 pb-20 sm:pt-20 md:grid-cols-12 md:gap-12 md:pt-28 md:pb-28">
        <header className="md:col-span-12">
          <p className="label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="h-px w-7 bg-accent" />
            {about.label}
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display-lg text-display font-normal">
            {about.heading}
          </h1>
        </header>

        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <MediaFrame
              media={about.portrait}
              preload
              quality={60}
              sizes="(min-width: 72rem) 27rem, (min-width: 48rem) 40vw, min(28rem, calc(100vw - 2rem))"
              className="mx-auto w-full max-w-md md:max-w-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12 md:col-span-7 md:pl-4">
          <p className="max-w-prose text-lead">{about.paragraph1}</p>

          <Reveal>
            <figure className="border-l-2 border-accent pl-6 sm:pl-8">
              <blockquote>
                <p className="font-display-lg text-h2 font-light italic">
                  &ldquo;{about.pullQuote.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5 max-w-prose text-muted">
                {about.pullQuote.context}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <p className="max-w-prose text-lead">{about.paragraph2}</p>
          </Reveal>

          <dl className="grid gap-x-8 sm:grid-cols-2">
            {about.strengths.map((strength, index) => (
              <Reveal
                key={strength.title}
                delay={(index % 2) * 0.08}
                className="border-t border-line py-6"
              >
                <dt className="font-display text-xl leading-snug">
                  {strength.title}
                </dt>
                <dd className="mt-2 text-muted">{strength.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
