import { Hero } from "@/components/sections/home/Hero";
import { FeaturedWork, FeaturedWorkTaskbar } from "@/components/sections/home/FeaturedWork";

/**
 * Hero, then Selected Work. The sketchbook lives on its own /playground
 * route (reached from the nav and the hero's Paint window), and the
 * site's real Footer (see layout.tsx) follows Selected Work directly.
 */
export default function Home() {
  return (
    <>
      {/* The hero is sticky inside this wrapper, which ends at the
          taskbar's bottom edge: scrolling first brings the taskbar up over
          the held hero, and once it's fully visible the wrapper runs out,
          so everything scrolls on normally. */}
      <div>
        <Hero />
        <FeaturedWorkTaskbar />
      </div>
      <FeaturedWork />
    </>
  );
}
