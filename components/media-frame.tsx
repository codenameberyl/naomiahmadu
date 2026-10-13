import Image, { getImageProps } from "next/image";
import { preload as preloadResource } from "react-dom";
import { AutoplayVideo } from "@/components/autoplay-video";
import { PhoneFrame } from "@/components/phone-frame";
import type { Media } from "@/content/types";

type MediaFrameProps = {
  media: Media;
  /** `sizes` hint for responsive images and the video poster. */
  sizes: string;
  /** Load early at high priority. Use for the page's LCP media only. */
  preload?: boolean;
  /** Image quality; must be listed in `images.qualities` in next.config. */
  quality?: 60 | 75;
  className?: string;
};

/** Renders an image or a video at its native aspect ratio. */
export function MediaFrame({
  media,
  sizes,
  preload = false,
  quality = 75,
  className = "",
}: MediaFrameProps) {
  const frame = `relative overflow-hidden rounded-sm bg-surface ${className}`;
  const aspectRatio = `${media.width} / ${media.height}`;

  if (media.kind === "image") {
    if (preload) {
      // React's preload() is sent as an early Link header, so the browser
      // starts on the image alongside the fonts instead of after the HTML.
      const { props } = getImageProps({
        src: media.src,
        alt: "",
        fill: true,
        sizes,
        quality,
      });
      preloadResource(props.src, {
        as: "image",
        imageSrcSet: props.srcSet,
        imageSizes: sizes,
        fetchPriority: "high",
      });
    }

    return (
      <div className={frame} style={{ aspectRatio }}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          quality={quality}
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  // Serve the poster through the image optimiser, sized for its ~22rem slot
  // at 2x, since <video poster> takes a single URL.
  const { props: poster } = getImageProps({
    src: media.poster,
    alt: "",
    width: 360,
    height: Math.round((360 * media.height) / media.width),
    quality: 60,
  });
  if (preload) {
    preloadResource(poster.src, { as: "image", fetchPriority: "high" });
  }

  // Videos are vertical phone recordings, so they sit in a phone mockup.
  return (
    <PhoneFrame aspectRatio={aspectRatio} className={className}>
      <AutoplayVideo
        src={media.src}
        webm={media.webm}
        poster={poster.src}
        width={media.width}
        height={media.height}
        label={media.label}
        className="h-full w-full"
      />
    </PhoneFrame>
  );
}
