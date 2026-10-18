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
        <p className="min-h-[7em] px-[7cqw] py-[1.4em] font-sans text-[clamp(0.9375rem,5.5cqw,1.5rem)] leading-snug text-foreground">
          {siteConfig.positioningStatement}
        </p>
      </div>
    </HeroRetroWindow>
  );
}
