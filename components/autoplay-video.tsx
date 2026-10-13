"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";

type AutoplayVideoProps = {
  src: string;
  webm?: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className?: string;
};

/**
 * Muted, looping, silent video that loads only when near the viewport,
 * plays only while visible, and never autoplays under reduced motion.
 * A visible control lets anyone pause or play it (WCAG 2.2.2).
 */
export function AutoplayVideo({
  src,
  webm,
  poster,
  width,
  height,
  label,
  className = "",
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [nearViewport, setNearViewport] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [userPlayed, setUserPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Load the source once the video is within ~one screen of the viewport.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          loader.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    const watcher = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    loader.observe(video);
    watcher.observe(video);
    return () => {
      loader.disconnect();
      watcher.disconnect();
    };
  }, []);

  // <source> children don't load on their own once added; load() picks one.
  useEffect(() => {
    if (nearViewport) videoRef.current?.load();
  }, [nearViewport]);

  const shouldPlay =
    nearViewport && visible && !userPaused && (!reduceMotion || userPlayed);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => {
        // Autoplay can be refused (e.g. data saver); the poster stays.
      });
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  function toggle() {
    if (playing) {
      setUserPaused(true);
      setUserPlayed(false);
    } else {
      setUserPaused(false);
      setUserPlayed(true);
    }
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-full w-full object-cover"
      >
        {nearViewport ? (
          <>
            <source src={src} type="video/mp4" />
            {webm ? <source src={webm} type="video/webm" /> : null}
          </>
        ) : null}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        className="absolute right-4 bottom-4 z-20 inline-grid size-11 place-items-center rounded-full bg-[#161210]/70 text-[#f3ece4] backdrop-blur-sm transition-colors hover:bg-[#161210]/90"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
