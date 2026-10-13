import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  size?: "md" | "sm";
  className?: string;
  onNavigate?: () => void;
};

const VARIANTS = {
  primary:
    "bg-accent text-on-accent hover:bg-[color-mix(in_srgb,var(--accent)_88%,var(--text))]",
  ghost:
    "border border-line-strong/70 text-text hover:border-text hover:bg-surface",
};

const SIZES = {
  md: "min-h-12 px-6 text-base",
  sm: "min-h-11 px-4 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  size = "md",
  className = "",
  onNavigate,
}: ButtonLinkProps) {
  const isInternal = href.startsWith("/");
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRightIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (!isInternal) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onNavigate={onNavigate}>
      {content}
    </Link>
  );
}
