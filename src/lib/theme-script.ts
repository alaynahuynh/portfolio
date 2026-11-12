/** localStorage key for the saved site theme ("light" | "dark"). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline <head> script for app/layout.tsx: applies a saved "dark" choice to
 * <html data-theme> before the first paint, so dark visitors never see a
 * light flash. Kept free of React so the (server) root layout can import it;
 * the client hook lives in theme.ts.
 */
export const THEME_SCRIPT = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`;
