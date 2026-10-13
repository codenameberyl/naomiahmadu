"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "./theme";

const CHANGE_EVENT = "themechange";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return "system";
}

function resolve(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function apply(preference: ThemePreference) {
  const root = document.documentElement;
  const resolved = resolve(preference);
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  // The preference string may not change (still "system", or set in another
  // tab), so re-apply here rather than relying on a state change.
  const onExternalChange = () => {
    apply(readPreference());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onExternalChange);
  media.addEventListener("change", onExternalChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onExternalChange);
    media.removeEventListener("change", onExternalChange);
  };
}

/** Theme preference shared by every toggle on the page. */
export function useTheme() {
  const preference = useSyncExternalStore<ThemePreference | null>(
    subscribe,
    readPreference,
    () => null,
  );

  const setPreference = useCallback((next: ThemePreference) => {
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore: the theme still applies for this page view.
    }
    apply(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { preference, setPreference };
}
