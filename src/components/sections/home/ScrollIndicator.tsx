/**
 * A hand-drawn paint-drip in place of a generic scroll chevron — a wobbly
 * line trailing down to a droplet that gently bobs in a loop. Pure CSS
 * animation, frozen under prefers-reduced-motion by the global rule.
 */
export function ScrollIndicator() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-2">
      <svg
        width="20"
        height="56"
        viewBox="0 0 20 56"
        fill="none"
        className="animate-[drip_2.4s_ease-in-out_infinite] motion-reduce:animate-none"
      >
        <path
          d="M10 2C8 14 12 20 10 32C8 40 11 44 10 50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-muted-foreground"
        />
        <circle cx="10" cy="50" r="3.5" fill="currentColor" className="text-accent-hover" />
      </svg>
      <span className="font-alayna-handwriting text-lg text-muted-foreground">explore</span>
    </div>
  );
}
