const KEY = "cp-book-scroll";

/**
 * Called just before leaving the homepage's book for a 2D/3D work's own
 * page (see the "Explore 2D/3D Works" links) — records where in the book
 * the reader was. The book has no per-chapter URL; which page is open is
 * purely a function of scroll position (see CreativePracticeBook), so a
 * plain link back to `/#creative-practice` always lands at the very top.
 * Remembering the scroll position here lets the homepage put the reader
 * back where they left off instead.
 */
export function rememberBookScrollPosition() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, String(window.scrollY));
  } catch {
    // sessionStorage can throw in some private-browsing contexts — losing
    // the remembered position just means the reader lands at the top of
    // the book instead, which is an acceptable degrade.
  }
}

/**
 * Reads and clears the remembered scroll position (one-shot, so a later
 * fresh visit to the homepage doesn't replay a stale restore).
 */
export function consumeBookScrollPosition(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(KEY);
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}
