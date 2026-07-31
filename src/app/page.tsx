import { Hero } from "@/components/sections/home/Hero";
import { WorksCallout } from "@/components/sections/home/WorksCallout";
import { CreativeTransition } from "@/components/sections/home/CreativeTransition";
import { CreativeDesk } from "@/components/sections/home/CreativeDesk";
import { StickyNoteBio } from "@/components/sections/home/StickyNoteBio";
import { AboutLetter } from "@/components/sections/home/AboutLetter";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <WorksCallout />
      </Reveal>
      <Reveal>
        <CreativeTransition />
      </Reveal>
      <Reveal>
        <CreativeDesk />
      </Reveal>
      <Reveal>
        <StickyNoteBio />
      </Reveal>
      <Reveal>
        <AboutLetter />
      </Reveal>
    </>
  );
}
