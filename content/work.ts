import type { Role } from "./types";

export const workPage = {
  label: "Selected work",
  heading: "Four roles, one throughline.",
  intro:
    "Client relationships that hold under pressure, from a two-month sales sprint to a multi-year account portfolio.",
};

// Order and dates are as given in the source content. Do not reorder or
// "fix" the overlapping date ranges.
export const roles: Role[] = [
  {
    slug: "tilt-collective",
    number: "01",
    title: "Senior Account Manager",
    company: "Tilt Collective",
    location: "Remote",
    dates: "Nov 2024 – Jan 2026",
    summary:
      "Owned the day-to-day relationship for three global brand accounts at once, each with its own goals, cadence, and stakeholders.",
    bullets: [
      "Primary point of contact for Adidas Africa, Skechers Africa, and Emolyne Cosmetics, from onboarding through renewal.",
      "Led client meetings and calls independently, trusted by leadership to represent the relationship directly.",
      "Built strategic account plans through weekly stand ups and campaign planning, translating client objectives into measurable deliverables.",
      "Identified upsell and cross sell opportunities and proposed tailored solutions aligned to each client's goals.",
    ],
    media: {
      kind: "video",
      src: "/assets/tilt-work.mp4",
      webm: "/assets/tilt-work.webm",
      poster: "/assets/posters/tilt-work.jpg",
      width: 480,
      height: 854,
      label: "Tilt Collective work video",
    },
    chips: [
      "3 global accounts managed concurrently",
      "Client meetings led independently",
    ],
  },
  {
    slug: "dos-clothing",
    number: "02",
    title: "Content Strategist & Account Lead",
    company: "DOS Clothing",
    location: "Remote",
    dates: "Feb 2026 – Jul 2026",
    summary:
      "Sat directly with the founder as the single point of contact, then took the brand out of the country for its first international activation.",
    bullets: [
      "Primary day to day contact for the founder, managing the relationship through weekly stand ups and reporting cadences.",
      "Led an international pop up activation in Abidjan from planning through delivery, including logistics, guest experience, and cross functional teams.",
      "Directed influencer outreach and partnership strategy, growing brand visibility organically without paid spend.",
      "Built and executed content and campaign strategy, upholding a consistent brand voice throughout.",
    ],
    media: {
      kind: "image",
      src: "/assets/dos-shot.jpg",
      width: 900,
      height: 1171,
      alt: "Campaign feature from the DOS Clothing brand relationship",
    },
    chips: [
      "International activation, Abidjan",
      "Organic visibility growth, zero paid spend",
    ],
  },
  {
    slug: "smartmark",
    number: "03",
    title: "Social Media Executive",
    company: "Smartmark Limited",
    location: "Lagos, Nigeria",
    dates: "Aug 2024 – Nov 2024",
    summary:
      "Two months to move the sales needle on an e-commerce funnel that was leaking conversions.",
    bullets: [
      "Drove a 146% increase in online sales within two months through a data driven content strategy and optimized sales funnel.",
      "Delivered a 20% uplift in conversion rates and a 15% reduction in cart abandonment through A/B testing, optimized product pages, and retargeting campaigns.",
      "Grew social media followers by 30% through platform specific content, influencer partnerships, and consistent community engagement.",
      "Coordinated cross functional campaigns with creative, e commerce, and influencer partners.",
    ],
    media: {
      kind: "video",
      src: "/assets/smartmark-work.mp4",
      webm: "/assets/smartmark-work.webm",
      poster: "/assets/posters/smartmark-work.jpg",
      width: 480,
      height: 854,
      label: "Smartmark work video",
    },
    chips: [
      "+146% online sales",
      "+20% conversion rate",
      "−15% cart abandonment",
      "+30% followers",
    ],
  },
  {
    slug: "refaini",
    number: "04",
    title: "Marketing Executive",
    company: "Rèfainì",
    location: "Lagos, Nigeria",
    dates: "Dec 2025 – Present",
    summary:
      "Full ownership of strategy and content for a luxury jewellery brand where every touchpoint has to feel considered.",
    bullets: [
      "Owned campaign strategy and content planning end to end, upholding a consistent brand voice across all channels.",
      "Built and deployed an interactive landing page with email capture and a discount reveal mechanic to drive lead generation.",
    ],
    media: {
      kind: "video",
      src: "/assets/refaini-work.mp4",
      webm: "/assets/refaini-work.webm",
      poster: "/assets/posters/refaini-work.jpg",
      width: 480,
      height: 854,
      label: "Rèfainì work video",
    },
    chips: ["End to end brand ownership", "Landing page built & deployed"],
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((role) => role.slug === slug);
}

export function getAdjacentRoles(slug: string): {
  previous?: Role;
  next?: Role;
} {
  const index = roles.findIndex((role) => role.slug === slug);
  return {
    previous: index > 0 ? roles[index - 1] : undefined,
    next: index >= 0 && index < roles.length - 1 ? roles[index + 1] : undefined,
  };
}
