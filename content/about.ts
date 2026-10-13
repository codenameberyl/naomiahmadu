import type { ImageMedia } from "./types";

export const about = {
  label: "About",
  heading: "The person behind the accounts.",
  portrait: {
    kind: "image",
    src: "/assets/naomi-portrait.jpg",
    width: 900,
    height: 1200,
    alt: "Naomi Ahmadu",
  } satisfies ImageMedia,
  paragraph1:
    "Naomi graduated with honours from Pan-Atlantic University, Lagos, with a 4.0 GPA in Information Science and Media Studies. She started in social media execution, moved into account management, and has spent the years since proving the same thing in every role: a client relationship that's well run doesn't need constant checking in on, because the trust was built early and kept.",
  // Attribution must stay as "her manager at Tilt Collective". Do not name a person.
  pullQuote: {
    quote: "There was just a way she'd put it.",
    context:
      "That's how her manager at Tilt Collective explained why client meetings kept ending up on Naomi's calendar instead of her own.",
  },
  paragraph2:
    "That's the throughline. Whether it's a two-month sales sprint, a founder relationship run solo, or a portfolio of global brand accounts, Naomi's approach is the same: listen closely enough to know what the client actually needs, plan for it properly, and prove the result with a number rather than a feeling.",
  strengths: [
    {
      title: "Client relationships",
      body: "Full lifecycle ownership, from onboarding through renewal, without losing the personal thread.",
    },
    {
      title: "Creative direction",
      body: "Brand voice and content strategy built with the same care as the numbers behind it.",
    },
    {
      title: "Cross functional coordination",
      body: "Comfortable being the connective tissue between creative, media, and client teams.",
    },
    {
      title: "Certifications",
      body: "HubSpot Sales Software & HubSpot Inbound Sales (HubSpot Academy).",
    },
  ],
};
