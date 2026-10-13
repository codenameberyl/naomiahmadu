import { site } from "./site";

export type ContactLink = {
  label: string;
  display: string;
  href: string;
  external: boolean;
  /** Value placed on the clipboard by the copy button, if any. */
  copyValue?: string;
};

export const contact = {
  label: "Contact",
  heading: "Let's talk about the role.",
  intro:
    "Currently open to remote and hybrid roles in account management, client services, and brand marketing. The fastest way to reach me is email.",
  links: [
    {
      label: "Email",
      display: site.email,
      href: `mailto:${site.email}`,
      external: false,
      copyValue: site.email,
    },
    {
      label: "Phone",
      display: site.phoneDisplay,
      href: site.phoneHref,
      external: false,
      copyValue: site.phoneDisplay,
    },
    {
      label: "LinkedIn",
      display: site.linkedInDisplay,
      href: site.linkedInUrl,
      external: true,
    },
    {
      label: "Portfolio deck",
      display: site.portfolioDeckDisplay,
      href: site.portfolioDeckUrl,
      external: true,
    },
  ] satisfies ContactLink[],
};
