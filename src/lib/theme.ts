"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

/**
 * Site-wide light/dark theme. The theme lives on `<html data-theme>`, so
 * every page's CSS tokens (see the dark block in globals.css) follow it.
 * The choice is saved to localStorage and re-applied before the first
 * paint by the inline script in app/layout.tsx (see theme-script.ts), so a dark
 * visitor never sees a light flash on load or on any other page.
 *
 * The homepage hero's pendant lamp is the toggle. Light is the default.
 */
export type Theme = "light" | "dark";

const THEME_EVENT = "theme-change";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the theme still applies for this visit.
  }
}

function subscribe(onChange: () => void) {
  // Keep other open tabs in sync with a change made in this one.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) applyTheme(event.newValue === "dark" ? "dark" : "light");
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** The current theme. Renders "light" on the server and during hydration,
 * then the real value; colors come from CSS, so only small bits of UI
 * (like the pendant's lit state) depend on this. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}
