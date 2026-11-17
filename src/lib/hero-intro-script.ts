/** sessionStorage key: set once the hero's power-on intro has played. */
export const HERO_INTRO_KEY = "hero-intro-seen";

/**
 * Inline <head> script for app/layout.tsx: on the first homepage load of a
 * browser session, sets <html data-hero-intro> before the first paint so
 * the hero starts "off" (dark screen, LED off, windows hidden) and the CSS
 * in globals.css ("Hero power-on intro") turns it on. The attribute is
 * removed when the last intro animation ends (or after 6 s as a fallback),
 * leaving the hero exactly as it normally renders.
 *
 * Skipped for other pages, later homepage visits in the same session
 * (client-side navigations never re-run it), reduced-motion visitors, and
 * anywhere sessionStorage throws. Kept free of React like THEME_SCRIPT.
 */
export const HERO_INTRO_SCRIPT = `(function(){try{
if(location.pathname!=="/")return;
if(sessionStorage.getItem("${HERO_INTRO_KEY}"))return;
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
sessionStorage.setItem("${HERO_INTRO_KEY}","1");
var d=document.documentElement;d.setAttribute("data-hero-intro","");
var done=function(){d.removeAttribute("data-hero-intro");document.removeEventListener("animationend",onEnd)};
var onEnd=function(e){if(e.animationName==="hero-intro-hint")done()};
document.addEventListener("animationend",onEnd);setTimeout(done,6000);
}catch(e){}})()`;
