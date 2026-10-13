export type ImageMedia = {
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type VideoMedia = {
  kind: "video";
  /** H.264 MP4. */
  src: string;
  /** Optional VP9 WebM fallback for browsers without H.264 support. */
  webm?: string;
  poster: string;
  width: number;
  height: number;
  /**
   * Accessible name for the video's play/pause control. The videos have no
   * description in the source content, so the video itself is treated as
   * decorative. Replace with a real description when one is available.
   */
  label: string;
};

export type Media = ImageMedia | VideoMedia;

export type Role = {
  slug: string;
  number: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  summary: string;
  bullets: string[];
  media: Media;
  chips: string[];

  // Optional case-study fields. Rendered on /work/[slug] only when present.
  /** The situation or problem going in. One or more paragraphs. */
  challenge?: string[];
  /** How the work was approached. One or more paragraphs. */
  approach?: string[];
  /** Results in prose, in addition to the outcome chips. */
  results?: string[];
  /** Extra images or videos shown at the end of the case study. */
  gallery?: Media[];
};

export type Metric = {
  value: number;
  suffix: string;
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
};
