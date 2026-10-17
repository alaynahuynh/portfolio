/**
 * The book's back cover — the closing beat once the visitor has flipped
 * all the way through. `transparentFront` (like BookCover) means
 * BookPage doesn't supply the parchment texture here, so this paints
 * its own kraft surface — reusing `.page-cover-inside` (the same
 * fiber-grain kraft texture as the front cover's reverse side, see
 * globals.css) rather than a flat fill, so it reads as the same
 * physical cover material, not a plain color block.
 *
 * No copyright line here anymore — the book lives on the homepage, where
 * Footer.tsx already renders the site's real copyright at the true
 * bottom of the page; duplicating it here would just repeat the same
 * line twice on one page.
 */
export function BackCoverPage() {
  return (
    <div className="page-cover-inside relative flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg">
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 20 20"
        className="absolute top-6 right-6 opacity-70 sm:top-8 sm:right-8"
      >
        <path
          d="M10 1 L12 7.5 L19 7.5 L13.3 11.6 L15.3 18.5 L10 14.2 L4.7 18.5 L6.7 11.6 L1 7.5 L8 7.5 Z"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>

      <p className="font-alayna-handwriting text-2xl text-[#5c4a30] sm:text-3xl">
        Thanks for flipping through ◡̈
      </p>
    </div>
  );
}
