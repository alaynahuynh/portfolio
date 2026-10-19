import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import {
  HeroRetroWindow,
  RETRO_WELL,
} from "@/components/sections/home/HeroRetroWindow";

/** The hero's About object: a Notepad-style window (mauve, see
 * hero-destinations.ts) holding the intro line. */
export function HeroNotepad({ className }: { className?: string }) {
  return (
    <HeroRetroWindow
      title="About Me"
      menu={["My Story", "Interests", "Values"]}
      destination="about"
      className={className}
    >
      <div className={cn("m-[2px] bg-surface", RETRO_WELL)}>
        <p className="px-[6cqw] py-[0.8em] font-sans text-[clamp(0.75rem,6.2cqw,1.5rem)] leading-snug text-foreground sm:min-h-[7em] sm:px-[7cqw] sm:py-[1.4em] sm:text-[clamp(0.9375rem,5.5cqw,1.5rem)]">
          {siteConfig.positioningStatement}
        </p>
      </div>
    </HeroRetroWindow>
  );
}
