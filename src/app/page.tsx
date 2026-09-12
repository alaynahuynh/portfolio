import { Hero } from "@/components/sections/home/Hero";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { CreativePracticeBook } from "@/components/sections/home/CreativePracticeBook";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <FeaturedWork />
      </Reveal>
      {/* No Reveal wrapper: this section is 500vh+ tall and drives its own
          scroll-linked book — the narrative intro (text flying away over
          the already-visible book/meadow) through the cover, About,
          Contact, and the back cover all live as one continuous
          scroll-driven scene inside it now, so gating the whole thing
          behind Reveal's 15%-visible threshold just means a blank gap
          while the (already-visible) meadow waits to fade in. */}
      <CreativePracticeBook />
    </>
  );
}
