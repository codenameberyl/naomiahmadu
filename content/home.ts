import type { ImageMedia, Metric } from "./types";

export const home = {
  eyebrow: "Lagos, Nigeria — Remote / Hybrid",
  // The H1 is split so "translated" can be set in italics.
  headline: {
    before: "Client trust, ",
    emphasis: "translated",
    after: " into growth.",
  },
  intro:
    "Naomi Ahmadu is a creative marketer and account manager who has run global brand relationships end to end, from first call to renewal, and backed every one of them with numbers.",
  ctas: {
    primary: { label: "View the work", href: "/work" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
  metrics: [
    {
      value: 146,
      suffix: "%",
      label: "Increase in online sales within two months, Smartmark",
    },
    {
      value: 30,
      suffix: "%",
      label: "Organic follower growth through community engagement",
    },
    {
      value: 20,
      suffix: "%",
      label: "Uplift in conversion rate through A/B tested funnels",
    },
    {
      value: 15,
      suffix: "%",
      label: "Reduction in cart abandonment via retargeting",
    },
  ] satisfies Metric[],
  trusted: {
    label: "Trusted with accounts including",
    // Plain text names only. Do not replace with brand logos.
    names: ["Adidas Africa", "Skechers Africa", "Emolyne Cosmetics", "Rèfainì"],
  },
  howIWork: {
    label: "How I work",
    heading:
      "Every relationship gets the same shape: listen first, plan second, prove it with a number third.",
    points: [
      {
        title: "Client-facing by instinct",
        body: "At Tilt Collective, leadership regularly handed client meetings and calls to me directly, trusting the relationship to a communication style built on straight talk and follow-through.",
      },
      {
        title: "Creative and data-driven",
        body: "Every campaign gets a strategy and a scoreboard. From content calendars to A/B tested funnels, the work is judged on what it moves, not just what it looks like.",
      },
    ],
    image: {
      kind: "image",
      src: "/assets/home-feature.jpg",
      width: 1400,
      height: 1750,
      alt: "Campaign work in the field",
    } satisfies ImageMedia,
  },
};
