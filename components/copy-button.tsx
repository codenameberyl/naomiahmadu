"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type CopyButtonProps = {
  value: string;
  /** What is being copied, e.g. "email address". */
  what: string;
};

export function CopyButton({ value, what }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong/70 px-4 text-sm font-semibold text-text transition-colors hover:border-text hover:bg-surface"
      >
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        <span>
          {status === "copied" ? "Copied" : "Copy"}
          <span className="sr-only"> {what}</span>
        </span>
      </button>
      <span role="status" className="sr-only">
        {status === "copied"
          ? `Copied ${what} to clipboard`
          : status === "failed"
            ? `Could not copy ${what}`
            : ""}
      </span>
    </>
  );
}
