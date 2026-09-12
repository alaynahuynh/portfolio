import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BookPageProps {
  front: ReactNode;
  /** Omit when `staticPage` — the bottom-most page never flips. */
  back?: ReactNode;
  zIndex: number;
  staticPage?: boolean;

  /** Removes the parchment background from the front face. */
  transparentFront?: boolean;

  /** Kraft-brown (`.page-cover-inside`) instead of cream `.page-parchment`
   * for the back face — for the front cover leaf specifically, so the
   * moment it first opens reveals the reverse of the same physical
   * cover material rather than an inner page. */
  coverBack?: boolean;

  /** Turns the page forward on click, in addition to scrolling — but
   * only when the click actually lands on blank page area. A page's own
   * content can contain real links/buttons (e.g. "Explore 2D Works →");
   * clicking those should do what they say, not *also* flip the page
   * out from under them. Only ever wired up (see CreativePracticeBook)
   * on the one leaf that's currently interactive, so there's no risk of
   * a hidden/inactive leaf underneath swallowing the click instead. */
  onFrontClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function isInteractiveTarget(event: React.MouseEvent<HTMLDivElement>) {
  return (event.target as HTMLElement).closest("a, button") !== null;
}

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  function BookPage(
    {
      front,
      back,
      zIndex,
      staticPage = false,
      transparentFront = false,
      coverBack = false,
      onFrontClick,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="absolute inset-0 overflow-visible"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "0% 50%",
          zIndex,
        }}
      >
        <div
          onClick={
            onFrontClick && ((event) => !isInteractiveTarget(event) && onFrontClick(event))
          }
          className={cn(
            transparentFront
              ? "absolute inset-0 overflow-visible"
              : "page-parchment page-edge-stack absolute inset-0 overflow-y-auto rounded-lg",
            // Without this, a click that lands on/near text (rather than
            // truly blank page area) drags into a native text selection
            // instead of just registering as a page-turn.
            onFrontClick && "cursor-pointer select-none",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
          {/* Shadow the page catches near its own fold mid-turn — see
              --flip-shade (set per-leaf in CreativePracticeBook's apply())
              and .page-flip-shade in globals.css. */}
          <div aria-hidden="true" className="page-flip-shade pointer-events-none absolute inset-0 rounded-lg" />
        </div>

        {!staticPage && (
          <div
            className={cn(
              "absolute inset-0 overflow-y-auto rounded-lg",
              coverBack ? "page-cover-inside" : "page-parchment",
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {back}
            <div aria-hidden="true" className="page-flip-shade pointer-events-none absolute inset-0 rounded-lg" />
          </div>
        )}
      </div>
    );
  },
);