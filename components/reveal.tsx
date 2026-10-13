"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds, for light staggering. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  /** Render statically, e.g. for above-the-fold content that may be the LCP. */
  disabled?: boolean;
};

/**
 * Fades and slides content up once as it scrolls into view. Under
 * prefers-reduced-motion the content appears instantly with no movement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  disabled = false,
}: RevealProps) {
  const Component = m[as];
  const reduceMotion = useReducedMotion();

  if (disabled) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Component>
  );
}
