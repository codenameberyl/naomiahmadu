export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_PREFERENCES: ThemePreference[] = ["light", "dark", "system"];

/**
 * Runs in <head> before first paint so the page never flashes the wrong
 * theme. Sets data-theme (resolved) and data-theme-preference on <html>.
 * Without JavaScript, CSS falls back to prefers-color-scheme.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,p=localStorage.getItem("${THEME_STORAGE_KEY}");if(p!=="light"&&p!=="dark")p="system";var r=p==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p;d.dataset.theme=r;d.dataset.themePreference=p;d.style.colorScheme=r}catch(e){}})()`;
