import { Hero } from "@/components/sections/home/Hero";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";

/**
 * Hero, then Selected Work. The sketchbook lives on its own /playground
 * route (reached from the nav and the hero's Paint window), and the
 * site's real Footer (see layout.tsx) follows Selected Work directly.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
    </>
  );
}
