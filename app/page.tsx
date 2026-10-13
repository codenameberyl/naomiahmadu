import { ButtonLink } from "@/components/button-link";
import { PersonJsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { MetricStrip } from "@/components/metric-strip";
import { Reveal } from "@/components/reveal";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const { headline, howIWork } = home;

  return (
    <>
      <PersonJsonLd />

      <section className="container-site pt-14 pb-14 sm:pt-20 md:pt-28 md:pb-20">
        <p className="label flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="h-px w-7 bg-accent" />
          {home.eyebrow}
        </p>
        <h1 className="mt-5 max-w-[14ch] font-display-lg text-display font-normal">
          {headline.before}
          <em className="font-light text-accent">{headline.emphasis}</em>
          {headline.after}
        </h1>
        <p className="mt-7 max-w-prose text-lead text-muted">{home.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={home.ctas.primary.href} arrow>
            {home.ctas.primary.label}
          </ButtonLink>
          <ButtonLink href={home.ctas.secondary.href} variant="ghost">
            {home.ctas.secondary.label}
          </ButtonLink>
        </div>
      </section>

      <section aria-label="Results" className="container-site">
        <MetricStrip metrics={home.metrics} />

        <div className="flex flex-col gap-3 py-9 md:flex-row md:items-baseline md:gap-6">
          <h2 className="label shrink-0 text-muted">{home.trusted.label}</h2>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {home.trusted.names.map((name, index) => (
              <li key={name} className="font-display text-xl sm:text-[1.4rem]">
                {name}
                {index < home.trusted.names.length - 1 ? (
                  <span aria-hidden="true" className="ml-3 text-accent">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="how-i-work"
        className="container-site grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-28"
      >
        <Reveal className="md:col-span-5">
          <MediaFrame
            media={howIWork.image}
            sizes="(min-width: 72rem) 27rem, (min-width: 48rem) 40vw, 100vw"
          />
        </Reveal>

        <div className="md:col-span-7 md:pl-4">
          <Reveal>
            <p className="label text-accent">{howIWork.label}</p>
            <h2
              id="how-i-work"
              className="mt-4 font-display-lg text-h2 font-normal"
            >
              {howIWork.heading}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-8 lg:grid-cols-2">
            {howIWork.points.map((point, index) => (
              <Reveal
                as="li"
                key={point.title}
                delay={index * 0.08}
                className="border-t border-line pt-6"
              >
                <h3 className="font-display text-xl leading-snug sm:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-3 text-muted">{point.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
