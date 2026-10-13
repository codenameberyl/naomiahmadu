"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
};

/**
 * Counts from 0 to `value` the first time it enters the viewport.
 * The final value is server-rendered (and always exposed to assistive tech);
 * an invisible copy reserves its width so the count never shifts layout.
 */
export function CountUp({
  value,
  suffix = "",
  className,
  suffixClassName,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // Arm the animation after hydration so no-JS and reduced-motion users
  // only ever see the final number.
  useEffect(() => {
    if (reduceMotion) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time switch to the animated state after hydration
    setArmed(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [armed, inView, value]);

  const shown = armed && !inView ? 0 : display;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="inline-grid">
        <span className="invisible col-start-1 row-start-1">
          {value}
          <span className={suffixClassName}>{suffix}</span>
        </span>
        <span className="col-start-1 row-start-1 tabular-nums">
          {shown}
          <span className={suffixClassName}>{suffix}</span>
        </span>
      </span>
    </span>
  );
}
