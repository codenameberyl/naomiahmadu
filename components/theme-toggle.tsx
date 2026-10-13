"use client";

import { MoonIcon, SunIcon, SystemIcon } from "@/components/icons";
import { THEME_PREFERENCES, type ThemePreference } from "@/lib/theme";
import { useTheme } from "@/lib/use-theme";

const LABELS: Record<ThemePreference, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const ICONS: Record<ThemePreference, typeof SunIcon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
};

/** Single button that cycles light → dark → system. Used in the header. */
export function ThemeCycleButton({ className = "" }: { className?: string }) {
  const { preference, setPreference } = useTheme();
  const current = preference ?? "system";
  const next =
    THEME_PREFERENCES[
      (THEME_PREFERENCES.indexOf(current) + 1) % THEME_PREFERENCES.length
    ];
  const Icon = ICONS[current];

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={`Theme: ${LABELS[current]}. Switch to ${LABELS[next]}`}
      title={`Theme: ${LABELS[current]}`}
      className={`inline-grid size-11 place-items-center rounded-full border border-line-strong/60 text-text transition-colors hover:border-text hover:bg-surface ${className}`}
    >
      <Icon />
    </button>
  );
}

/** Three-way segmented control, full width. Used in the mobile menu. */
export function ThemeSegmented() {
  const { preference, setPreference } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex w-full gap-1 rounded-full border border-line-strong/60 p-1"
    >
      {THEME_PREFERENCES.map((option) => {
        const Icon = ICONS[option];
        const pressed = preference === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={pressed}
            onClick={() => setPreference(option)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-muted transition-colors hover:text-text aria-pressed:bg-surface aria-pressed:text-text"
          >
            <Icon className="size-4" />
            {LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
