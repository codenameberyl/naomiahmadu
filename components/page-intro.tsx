type PageIntroProps = {
  label: string;
  heading: string;
  intro?: string;
};

export function PageIntro({ label, heading, intro }: PageIntroProps) {
  return (
    <header className="container-site pt-14 pb-12 sm:pt-20 md:pt-28 md:pb-16">
      <p className="label flex items-center gap-3 text-accent">
        <span aria-hidden="true" className="h-px w-7 bg-accent" />
        {label}
      </p>
      <h1 className="mt-5 max-w-[18ch] font-display-lg text-display font-normal">
        {heading}
      </h1>
      {intro ? (
        <p className="mt-7 max-w-prose text-lead text-muted">{intro}</p>
      ) : null}
    </header>
  );
}
