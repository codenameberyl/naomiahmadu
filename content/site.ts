import type { NavItem } from "./types";

export const site = {
  name: "Naomi Ahmadu",
  wordmark: "Naomi",
  jobTitle: "Creative Marketer & Account Manager",
  title: "Naomi Ahmadu — Creative Marketer & Account Manager",
  description:
    "Naomi Ahmadu is a Lagos-based creative marketer and account manager who has run global brand relationships end to end and backed every one with numbers.",
  locality: "Lagos",
  country: "Nigeria",
  countryCode: "NG",
  email: "naomiahmadu.s@gmail.com",
  phoneDisplay: "+234 907 783 9984",
  phoneHref: "tel:+2349077839984",
  linkedInDisplay: "linkedin.com/in/naomi-ahmadu",
  linkedInUrl: "https://www.linkedin.com/in/naomi-ahmadu-022920234/",
  portfolioDeckDisplay: "Canva portfolio",
  portfolioDeckUrl: "https://canva.link/naomiahmadu",
} as const;

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footer = {
  line: "Naomi Ahmadu — Creative Marketer & Account Manager",
  email: site.email,
  // Rendered as "© <current year> Naomi Ahmadu".
  copyrightHolder: site.name,
};
