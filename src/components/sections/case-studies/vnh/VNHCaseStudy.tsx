import { getProjectBySlug } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { CaseStudyHero } from "@/components/sections/case-studies/CaseStudyHero";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { CaseStudyData, CaseStudyImageSpec } from "@/types/case-study";
import {
  CaseStudyContentImage,
  CaseStudyFullImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import {
  CaseStudySectionMobileNav,
  type CaseStudyNavSection,
} from "@/components/sections/case-studies/CaseStudySectionNav";

/**
 * Vietnamese Noodle House's own editorial case study — a bespoke layout
 * (not the generic CaseStudyPage template), same pattern as
 * CoursePilotCaseStudy.tsx. This project's real shape is audit → rebuild
 * → one interaction-design centerpiece, not a from-scratch product's
 * research/define/ideation stages — so it doesn't reuse the generic
 * template.
 *
 * Screenshots are hardcoded here rather than routed through the shared
 * CaseStudyData image fields, since the real per-section pairings (a hero
 * pair, a before pair, a locations quad, etc.) don't match that shape.
 * Narrative copy still comes from vietnamese-noodle-house.ts.
 *
 * Desktop/mobile pairs are only used where both screenshots are similarly
 * tall; a short desktop strip next to a very tall phone capture leaves a
 * large empty gap, so those sections show the desktop view alone.
 */

const NAV_SECTIONS: CaseStudyNavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Audit" },
  { id: "locations", label: "Ordering flow" },
  { id: "menu", label: "Menu" },
  { id: "home", label: "Visual identity" },
  { id: "reflection", label: "Reflection" },
];

function Label({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.14em] uppercase",
        accent ? "text-(--project-accent)" : "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): CaseStudyImageSpec => ({ src: `/images/projects/vnh/${src}`, alt, width, height, caption });

// ---------------------------------------------------------------- IMAGES

const HERO_DESKTOP = img(
  "home/desktop-hero.png",
  "The redesigned Vietnamese Noodle House homepage hero on desktop: a full-bleed food photograph with a legible heading, a filled Order Online button, and a secondary View Menu button.",
  1440,
  900,
);
const HERO_MOBILE = img(
  "home/mobile-hero.png",
  "The redesigned homepage hero on mobile: the same food photography, a scrim behind the heading for legibility, and Order Online as the primary filled button.",
  780,
  1688,
);

const BEFORE_MOBILE = img(
  "before/old-site-mobile.png",
  "The old website on mobile: a broken logo image, a gray placeholder where the hero image should be, and the two ordering buttons stacked with no address or hours.",
  1226,
  2340,
);

const OLD_ORDERING_DESKTOP = img(
  "before/old-ordering-desktop.png",
  "The old homepage's ordering section on desktop: a gray placeholder hero, then Camillus Online Ordering and N Syracuse Online Ordering buttons, identical dark pills except for a green or orange border, each marked Pick-up Only.",
  2940,
  1590,
);
const OLD_ORDERING_MOBILE = img(
  "before/old-ordering-mobile.png",
  "The same ordering buttons on the old mobile site, stacked, with no address, hours, or map for either location.",
  964,
  1412,
);
const OLD_MENU_DESKTOP = img(
  "before/old-menu-pdf-desktop.png",
  "The old site's menu on desktop: View Menu opened Menu_online_fallwinter-23-24.pdf, an 11-page PDF, in the browser's PDF viewer.",
  2940,
  1460,
);
const OLD_MENU_MOBILE = img(
  "before/old-menu-pdf-mobile.png",
  "The same PDF menu on a phone: page 3 of 11, with item descriptions running off the right edge of the screen.",
  968,
  1348,
);

const HOME_DESKTOP_FAVORITES = img(
  "home/desktop-favorites.png",
  "The 'Customer Favorites' section of the redesigned homepage on desktop, with real photography for each dish.",
  2880,
  1536,
);
const MENU_DESKTOP_TOP = img(
  "menu/desktop-top.png",
  "The top of the redesigned menu page on desktop: dietary legend, the category nav, and the Appetizers category with a real photo for Fried Eggrolls.",
  1440,
  950,
);
const MENU_MOBILE_STICKY = img(
  "menu/mobile-sticky-nav.png",
  "The menu page on mobile mid-scroll, with the sticky category nav pinned at the top and the current category auto-highlighted by scroll-spy.",
  780,
  1688,
);

const LOCATIONS_DESKTOP_CARDS = img(
  "locations/desktop-cards.png",
  "Step 1 on desktop: two location cards, North Syracuse and Camillus, side by side, each with its address, a map, hours, and an order button.",
  1440,
  1061,
);
const LOCATIONS_DESKTOP_CONFIRM = img(
  "locations/desktop-confirmation.png",
  "Step 2 on desktop: the selected Camillus card is highlighted and a 'You're ordering from Camillus' panel with its address appears below the grid, with Continue to online ordering and Choose a different location.",
  1440,
  1313,
);
const LOCATIONS_MOBILE_CARDS = img(
  "locations/mobile-cards.png",
  "Step 1 on mobile: the North Syracuse location card, the first of two stacked cards.",
  780,
  1360,
);
const LOCATIONS_MOBILE_SHEET = img(
  "locations/mobile-bottom-sheet.png",
  "Step 2 on mobile: a bottom sheet over the list reading 'You're ordering from Camillus' with the address, Continue to order, and Change location.",
  780,
  1688,
);

/** The site's palette, each color shown beside the part of the dining room
 * it was taken from. Hex values are the live site's real CSS tokens; the
 * crops are from the restaurant's own interior photos. */
const ROOM_PALETTE = [
  {
    name: "Teal",
    hex: "#197E8C",
    from: "The teal dining-room walls",
    image: img("identity/teal-wall.jpg", "The restaurant's teal dining-room wall with the Vietnamese Noodle House logo painted on it.", 800, 600),
  },
  {
    name: "Terracotta",
    hex: "#AE5A42",
    from: "The red-brown walls in the back dining room",
    image: img("identity/red-wall.jpg", "The red-brown back wall of the restaurant with a wooden welcome sign.", 800, 600),
  },
  {
    name: "Honey",
    hex: "#8A6142",
    from: "The wood chair backs and bar",
    image: img("identity/wood-chairs.jpg", "Close-up of the restaurant's wooden chair backs with curved cutouts.", 800, 600),
  },
  {
    name: "Charcoal",
    hex: "#1E1B18",
    from: "The black chair frames and seats",
    image: img("identity/table.jpg", "A dining table with black-framed chairs and dark seats on a wood-look floor.", 800, 600),
  },
];

// --------------------------------------------------------------- HELPERS

/** Wide desktop + tall mobile side by side, sized by their real aspect
 * ratios so a portrait phone screenshot never gets stretched. Only used
 * where the two captures are similarly tall (see the file comment). */
function DesktopMobilePair({
  desktop,
  mobile,
  desktopLabel = "Desktop",
  mobileLabel = "Mobile",
}: {
  desktop: CaseStudyImageSpec;
  mobile: CaseStudyImageSpec;
  desktopLabel?: string;
  mobileLabel?: string;
}) {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <Label>{desktopLabel}</Label>
        <CaseStudyContentImage image={desktop} className="mt-3 max-w-none" />
      </div>
      <div className="sm:col-span-1">
        <Label>{mobileLabel}</Label>
        <CaseStudyContentImage image={mobile} className="mt-3 max-w-xs" />
      </div>
    </div>
  );
}

/** An old-site "before" row: desktop and mobile captures sized by their
 * aspect ratios so both render at the same height, with a short caption. */
function BeforePair({
  desktop,
  mobile,
  caption,
}: {
  desktop: CaseStudyImageSpec;
  mobile: CaseStudyImageSpec;
  caption: React.ReactNode;
}) {
  return (
    <div>
      <Label>Before — old site</Label>
      <div
        className="mt-3 grid items-start gap-4 sm:gap-6"
        style={{
          gridTemplateColumns: `minmax(0, ${desktop.width / desktop.height}fr) minmax(0, ${mobile.width / mobile.height}fr)`,
        }}
      >
        <CaseStudyFullImage image={desktop} />
        <CaseStudyFullImage image={mobile} />
      </div>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

export function VNHCaseStudy({ data }: { data: CaseStudyData }) {
  const { overview, background, research, ideation, finalThoughts } = data;
  const keyFindings = research.keyFindings ?? [];
  const orderingFlow = ideation.flows[0];

  return (
    <div className="case-study bg-background" style={{ "--project-accent": data.accentColor ?? "var(--color-sage-deep)", "--project-mat": getProjectBySlug(data.slug)?.matTint ?? "var(--color-muted)" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- HERO */}
      <CaseStudyHero data={data}>
        <DesktopMobilePair desktop={HERO_DESKTOP} mobile={HERO_MOBILE} />
      </CaseStudyHero>

      <CaseStudySectionMobileNav sections={NAV_SECTIONS} />

      {/* ------------------------------------------------------- OVERVIEW */}
      <Section id="overview" className="scroll-mt-28">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            {overview.featuresIntro}
          </Heading>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            One thing I couldn&rsquo;t change: online ordering runs through the restaurant&rsquo;s existing platforms
            (MenuDrive and Lavu), with a separate link for each location. So a big part of the site&rsquo;s job is
            getting people to the right link.
          </p>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- PROBLEM */}
      <Section id="problem" className="scroll-mt-28 cs-band">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            {background.heading}
          </Heading>
        </Reveal>
        {/* Only the broken mobile view here — the old desktop ordering
            buttons get their own close-up in the ordering-flow section. */}
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <Reveal delay={40}>
            <p className="max-w-[45rem] text-lg text-muted-foreground">{background.narrative}</p>
          </Reveal>
          <Reveal delay={80}>
            <Label>Old site — Mobile</Label>
            <CaseStudyFullImage image={BEFORE_MOBILE} className="mt-3" />
            <p className="mt-3 text-xs text-muted-foreground">
              A broken logo, a gray box where the hero photo should be, and unstyled buttons.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- PROCESS */}
      <Section id="process" className="scroll-mt-28">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            {research.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{research.intro}</p>
        </Reveal>

        <div className="mt-14">
          {keyFindings.map((finding, i) => (
            <Reveal key={finding.title} delay={i * 30}>
              <div className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
                <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{finding.title}</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    {finding.whatParticipantsSaid} {finding.whyItMatters}
                  </p>
                  <p className="text-foreground">{finding.designResponse}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ LOCATIONS */}
      <Section id="locations" className="scroll-mt-28 cs-band">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-4xl sm:text-6xl">
            Making sure every order reaches the right kitchen
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The audit&rsquo;s costliest problem: customers ordering from the wrong location, because nothing but a
            town name told the two ordering links apart. I designed a{" "}
            <span className="font-medium text-foreground">select, then confirm</span> flow: each location card shows
            the address, a map, and hours, and choosing one repeats the address back before handing off to ordering.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-14">
            <BeforePair
              desktop={OLD_ORDERING_DESKTOP}
              mobile={OLD_ORDERING_MOBILE}
              caption="The old homepage's two ordering buttons, on desktop and mobile."
            />
          </div>
        </Reveal>

        <div className="mt-16 border-t border-border pt-14">
          <Reveal delay={80}>
            <Label accent>After — Desktop</Label>
          </Reveal>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <Reveal delay={100}>
              <p className="mb-3 text-sm font-medium text-foreground">Step 1 — Select a location</p>
              <CaseStudyFullImage image={LOCATIONS_DESKTOP_CARDS} />
            </Reveal>
            <Reveal delay={140}>
              <p className="mb-3 text-sm font-medium text-(--project-accent)">Step 2 — Confirm</p>
              <CaseStudyFullImage image={LOCATIONS_DESKTOP_CONFIRM} />
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Desktop has room to show the confirmation inline, right below the card grid, in the
              same view.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-border pt-14">
          <Reveal delay={80}>
            <Label accent>After — Mobile</Label>
          </Reveal>
          <div className="mt-4 grid items-start gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-10">
            <Reveal delay={100}>
              <p className="mb-3 text-sm font-medium text-foreground">Step 1 — Select a location</p>
              <CaseStudyContentImage image={LOCATIONS_MOBILE_CARDS} className="max-w-xs" />
            </Reveal>
            <Reveal delay={140}>
              <p className="mb-3 text-sm font-medium text-(--project-accent)">Step 2 — Confirm</p>
              <CaseStudyContentImage image={LOCATIONS_MOBILE_SHEET} className="max-w-xs" />
            </Reveal>
            <Reveal delay={160}>
              <p className="text-muted-foreground sm:pt-9">
                On mobile, a second full card stacked underneath read as duplicated information rather than a next
                step. So I redesigned this step as a bottom sheet that covers the list instead of extending it. It&rsquo;s the
                same information, in an order that&rsquo;s clear on a small screen.
              </p>
              {orderingFlow?.takeaway && (
                <p className="mt-4 text-sm text-muted-foreground italic">{orderingFlow.takeaway}</p>
              )}
            </Reveal>
          </div>
        </div>

        <Reveal delay={180}>
          <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-2 sm:gap-12">
            <p className="text-muted-foreground">
              This adds a tap before ordering, which is the one thing the restaurant most wants people to do. I
              was fine with that. A wrong-location order costs the customer and the restaurant a lot more than a
              tap.
            </p>
            <div>
              <p className="font-heading text-3xl text-foreground">About 8 → about 1</p>
              <p className="mt-1 text-sm text-muted-foreground">
                mistaken orders a month since the July launch. That&rsquo;s the owners&rsquo; own count, not
                analytics, and other pages changed at the same time.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <figure className="mt-14 max-w-3xl border-l-2 border-(--project-accent) pl-6">
            <blockquote className="font-heading text-2xl text-foreground sm:text-3xl">
              &ldquo;We used to have customers accidentally order from the wrong location. Since the redesign,
              we&rsquo;ve noticed less confusion, and customers seem to have an easier time finding the right place
              to order.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">Owner, Vietnamese Noodle House</figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- MENU */}
      <Section id="menu" className="scroll-mt-28">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            From an 11-page PDF to a menu you can scroll
          </Heading>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-14">
            <BeforePair
              desktop={OLD_MENU_DESKTOP}
              mobile={OLD_MENU_MOBILE}
              caption="On a phone, the PDF's item descriptions run off the right edge of the screen."
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-16 max-w-[45rem] border-t border-border pt-14 text-lg text-muted-foreground">
            I rebuilt it as a real page: seven categories and ~50 items, with photos and dietary tags. Rather than
            paginate it, I added a sticky category nav with scroll-spy auto-highlighting, so the current section is
            always visible no matter how far down a customer has scrolled.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-6">
          <Reveal>
            <Label accent>After — Desktop</Label>
            <CaseStudyFullImage image={MENU_DESKTOP_TOP} className="mt-3" />
          </Reveal>
          <Reveal delay={80}>
            <Label accent>After — Mobile, sticky nav mid-scroll</Label>
            <CaseStudyContentImage image={MENU_MOBILE_STICKY} className="mt-3 max-w-xs" />
            <p className="mt-3 text-xs text-muted-foreground">
              As the page scrolls, the nav pins to the top and the active category updates on its own.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------- HOME */}
      <Section id="home" className="scroll-mt-28 cs-band">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            A palette taken from the dining rooms
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            I wanted the website to feel the way it does inside the restaurant, so I took the palette from the
            dining rooms themselves.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {ROOM_PALETTE.map((color) => (
              <figure key={color.name}>
                <CaseStudyContentImage image={color.image} className="max-w-none" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <div className="mt-3 h-10 rounded-sm ring-1 ring-black/5" style={{ backgroundColor: color.hex }} />
                <figcaption className="mt-3">
                  <p className="flex items-baseline justify-between gap-2 text-sm font-medium text-foreground">
                    {color.name}
                    <span className="font-mono text-xs text-muted-foreground">{color.hex}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{color.from}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 max-w-[45rem] text-sm text-muted-foreground">
            Underneath it all is a warm cream (#F6F1E7) instead of white, so the food photography leads.
          </p>
        </Reveal>

        <Reveal delay={40}>
          <p className="mt-16 max-w-[45rem] border-t border-border pt-12 text-lg text-muted-foreground">
            The rest follows from that. Headings are a serif and everything else is a simple sans-serif. Photos of
            the actual food and dining rooms do most of the work. And I designed every page for phones and desktop
            at the same time, instead of shrinking the desktop version down.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <CaseStudyFullImage image={HOME_DESKTOP_FAVORITES} />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ REFLECTION */}
      <Section id="reflection" className="scroll-mt-28 cs-band">
        <Reveal>
          <Heading level={2} className="max-w-3xl text-3xl sm:text-5xl">
            {finalThoughts.pullQuote}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <div className="mt-6 max-w-[45rem] space-y-4 text-lg text-muted-foreground">
            {finalThoughts.whatILearned.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Reveal delay={80}>
            <Label accent>What I&rsquo;m most proud of</Label>
            <p className="mt-3 text-muted-foreground">{finalThoughts.proudestOf}</p>
          </Reveal>
          <Reveal delay={100}>
            <Label>{finalThoughts.nextStepsHeading ?? "Next steps"}</Label>
            <p className="mt-3 text-muted-foreground">{finalThoughts.nextSteps}</p>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
