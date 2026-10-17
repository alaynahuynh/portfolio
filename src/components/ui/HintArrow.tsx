/** Tiny hand-drawn arrow curving up-left, used beside the handwritten
 * hints (hero, About). Flip it with -scale-y-100 to point down-left.
 * Stroked in currentColor so it matches the hint text. */
export function HintArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M28 20C20 20 10 16 6 5" />
      <path d="M4.7 9.8 6 5l4.1 2.9" />
    </svg>
  );
}
