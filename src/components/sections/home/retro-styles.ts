/** Windows 98 bevel styles shared by the hero windows and taskbar. Kept
 * in a plain module so server components can import them too. */

/** Raised bevel in Windows gray, warmed a few degrees toward the
 * monitor's cream so the windows and the photo feel lit by the same
 * light (face, light highlights, mid and dark shadows). */
export const RETRO_BEVEL =
  "bg-[#c3c0b8] shadow-[inset_-1px_-1px_#413f3a,inset_1px_1px_#e2dfd7,inset_-2px_-2px_#84817a,inset_2px_2px_#fffdf8]";

/** Sunken well (canvas, text area) — the bevel's inverse. */
export const RETRO_WELL =
  "shadow-[inset_1px_1px_#84817a,inset_-1px_-1px_#fffdf8]";

/** Pressed state for a bevelled button: the bevel inverts, as on a real
 * Windows 98 button. */
export const RETRO_BEVEL_PRESSED =
  "active:shadow-[inset_-1px_-1px_#fffdf8,inset_1px_1px_#413f3a,inset_-2px_-2px_#e2dfd7,inset_2px_2px_#84817a]";
