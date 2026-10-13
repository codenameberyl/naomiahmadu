import { CountUp } from "@/components/count-up";
import type { Metric } from "@/content/types";

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <li
          key={metric.label}
          className={`flex flex-col gap-3 py-7 sm:py-9 lg:px-6 lg:first:pl-0 ${
            index % 2 === 0 ? "pr-4" : "border-l border-line pl-4"
          } ${index < 2 ? "border-b border-line lg:border-b-0" : ""} ${
            index === 2 ? "lg:border-l lg:border-line" : ""
          }`}
        >
          <CountUp
            value={metric.value}
            suffix={metric.suffix}
            className="font-display-lg text-metric font-light text-text"
            suffixClassName="ml-0.5 align-[0.55em] text-[0.5em] tracking-normal text-accent"
          />
          <span className="max-w-[26ch] text-sm leading-snug text-muted sm:text-[0.95rem]">
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
