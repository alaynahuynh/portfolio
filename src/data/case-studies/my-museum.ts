import type { CaseStudyData } from "@/types/case-study";

export const myMuseum: CaseStudyData = {
  slug: "mymuseum",

  // MyMuseum's case-study accent — the accessible deep-blue variant
  // (not the brighter `--color-sky` used as the homepage spread's
  // full-bleed background) since this is used as small text/border
  // color throughout the hero and major sections, which sky itself
  // doesn't have enough contrast for on cream (see CaseStudyPage's
  // `--project-accent` wiring).
  accentColor: "var(--color-lake-blue-deep)",

  navOverride: [
    { id: "discovery", label: "Problem" },
    { id: "research", label: "Interviews" },
    { id: "testing", label: "Usability testing" },
    { id: "decisions", label: "Key decisions" },
    { id: "final-design", label: "Final design" },
    { id: "reflection", label: "Reflection" },
  ],

  hero: {
    category:
      "Product Design · Interaction Design · 3D Web · Frontend Development",
    title: "MyMuseum",
    tagline:
      "Turning online art portfolios into galleries you can walk through.",
    description:
      "I designed and built a web platform that turns an artist's uploads into a walkable 3D museum, with a Grid View so every visitor can reach the work. Shared multiplayer presence works, but isn't public yet.",
    statusLabel: "Live",
    ctaLabel: "Build Your Own Museum",
    ctaHref: "https://mymuseum-eta.vercel.app/",
    platform: "Web",
    tools: ["Figma", "Next.js", "React Three Fiber", "Claude Code", "Blender"],
    video: {
      src: "/videos/projects/mymuseum/walkthrough.mp4",
      poster: "/images/projects/mymuseum/posters/walkthrough.jpg",
      alt: "Walkthrough of MyMuseum's live 3D gallery experience.",
      width: 1920,
      height: 1036,
    },
  },

  overview: {
    year: "2026",
    duration: "May–Oct 2026",
    role: "Solo Product Designer + Developer",
    // Dropped: a features grid here restated the hero; Museum Mail and
    // the rest are shown in context in the final product stories.
    features: [],
  },

  background: {
    heading:
      "Online portfolios flatten art into grids and feeds, losing the scale, depth, and sequence the work depends on.",
    narrative:
      "I wanted to know whether an artist's work could be walked through like a gallery instead. I started by interviewing five artists about how they show their work, built a first prototype around what they needed, put it in front of five people in usability sessions, and reworked it from there.",
    challenge: "",
    placeholder: false,
  },

  research: {
    heading: "Starting with artists",
    intro:
      "In May 2026, before building anything, I interviewed five artists for 30–45 minutes each. Three were professionals I reached through Instagram and Cara (P1, oil painter; P2, concept artist; P3, 3D sculptor), and two were U-M Stamps students (P4, narrative illustrator; P5, ceramicist). We covered how they show their work today, then concept wireframes of 3D vs. grid navigation and automatic room setup.",
    participants: "",

    keyFindings: [
      {
        title: "Flat images lose what makes the work matter",
        whatParticipantsSaid:
          "On a phone, P1's six-foot canvas looks the same size as a ten-inch sketch, without its texture or varnish. P3 loses a sculpture's depth and silhouette in a single JPEG. P4 watches feeds scramble a continuous series.",
        whyItMatters: "",
        designResponse:
          "",
      },
      {
        title: "Immersion can't cost access",
        whatParticipantsSaid:
          "P1 expects older collectors to close the tab if they meet game-style controls. P2 wants no virtual building at all, since an art director gives a portfolio about thirty seconds. Even P3, the strongest case for 3D, worries a slow gallery on a midrange phone makes the work look broken.",
        whyItMatters: "",
        designResponse:
          "",
      },
      {
        title: "Publishing has to take minutes, not an afternoon",
        whatParticipantsSaid:
          "P2 hadn't updated their site in about nine months. If publishing takes more than a couple of minutes, it doesn't happen. P5 cancelled a paid site builder; the monthly fee made no sense for occasional pottery sales.",
        whyItMatters: "",
        designResponse:
          "",
      },
    ],

    competitiveDiscovery: {
      competitor: "New Art City",
      narrative:
        "I also reviewed New Art City, an existing virtual-gallery platform.",
      competitors: [
        {
          name: "New Art City",
          image: {
            src: "/images/projects/mymuseum/research/new-art-city-comparison.png",
            alt: "Annotated teardown of New Art City's homepage and 3D exhibition view: callouts note that the platform centers on creating and exploring exhibitions, that Recent Exhibitions and Events & Openings give two paths to discovery, that creators get significant creative freedom to design immersive spaces, that open-ended navigation can make specific artwork harder to locate, and that built-in chat supports social presence.",
            width: 3848,
            height: 2712,
          },
          strengths: [
            "Built-in chat gives exhibitions a sense of social presence.",
          ],
          limitations: [
            "Open-ended building tools trade visitor navigation for creator freedom, so finding a specific piece can take a lot of wandering.",
          ],
          applied:
            "Social, browser-based exhibitions work, but visitors still need to be able to find the work.",
        },
      ],
      opportunity:
        "Make creating a virtual gallery feel less like designing an exhibition and more like uploading a portfolio.",
      // The creator flow is shown with Decision 01 instead (see keyDecisions).
      flowSteps: [],
      placeholder: false,
    },

    // Unused while competitiveDiscovery is set above — kept only to satisfy
    // the shared CaseStudyData shape other projects (e.g. CoursePilot) rely
    // on for real SWOT/participant findings.
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    swotPlaceholder: true,
    findings: [],
    findingsPlaceholder: true,
  },

  keyInsights: [],

  define: {
    sectionHeading: "Designing for both sides of the museum",
    personaName: "Artists (P1–P5)",
    personaSummary:
      "Want people to experience their work as it really is, without building a website to get there.",
    personaNeeds: [
      "Show scale, surface, and depth (P1, P3)",
      "Keep a series in sequence (P4)",
      "Publish in minutes (P2)",
    ],
    personaPlaceholder: false,
    secondaryPersona: {
      name: "Their visitors",
      summary:
        "Want to find the work, take it in, and reach the artist, without learning a game first.",
      needs: [
        "Get around without game-style controls (P1)",
        "See every piece without hunting for it (July testing)",
        "A private way to reach the artist about a piece (P2, July testing)",
      ],
    },
    tensionIntro:
      "The interviews pulled in two directions: P3 and P4 wanted more atmosphere, P2 wanted none, and P1 wanted both: a painting's presence without the controls.",
    hmw: "",
  },

  // The three tensions now live in `keyDecisions` below, with their
  // evidence and tradeoffs, instead of as short cards here.
  ideation: {
    whyThisTitle: "",
    whyThis: [],
    whyThisPlaceholder: false,

    // Trimmed for length: the creator/visitor flowcharts repeated what the
    // final-product videos already show.
    flows: [],

    flowsPlaceholder: false,
  },

  keyDecisions: {
    heading: "Three decisions that shaped MyMuseum",
    intro:
      "How I reworked the prototype. Each decision answers what the May interviews and July testing showed, and each gave something up.",
    items: [
      {
        title: "Generate the museum from the uploads",
        tension: "Freedom vs. structure",
        problem:
          "Letting artists arrange rooms freely means they'd have to learn exhibition design, and visitors could get lost.",
        evidence: [
          {
            source: "Competitive analysis",
            text: "New Art City's open-ended building tools cost visitors navigation and felt like a professional workspace.",
          },
          {
            source: "Usability testing · July",
            text: "Participants liked having the museum auto-curated instead of building their own environment, but one room size didn't fit every collection (finding 01).",
          },
        ],
        decision:
          "Generate the layout automatically, sized to the collection. Creators control their artwork, gallery style, and museum details. Adding or removing a piece re-runs the layout instead of asking them to place it.",
        tradeoff:
          "Artists can't hand-place work. I gave up some expressiveness so every museum stays easy to navigate.",
        outcome:
          "Built: creators never place anything by hand, and one of three floor plans is picked from the size of the collection (below).",
        videos: [
          {
            src: "/videos/projects/mymuseum/room-small.mp4",
            poster: "/images/projects/mymuseum/posters/room-small.jpg",
            alt: "Walking through a small museum: one compact room with artwork on every wall around a central sculpture.",
            width: 1024,
            height: 554,
            caption: "Small (1–4 pieces): one compact room.",
          },
          {
            src: "/videos/projects/mymuseum/room-middle.mp4",
            poster: "/images/projects/mymuseum/posters/room-middle.jpg",
            alt: "Walking through a medium museum: two connected rooms, with framed paintings along the walls.",
            width: 1024,
            height: 554,
            caption: "Medium (5–9 pieces): two connected rooms.",
          },
          {
            src: "/videos/projects/mymuseum/room-large.mp4",
            poster: "/images/projects/mymuseum/posters/room-large.jpg",
            alt: "Walking through a large museum: moving between several connected rooms of a five-room floor plan.",
            width: 1024,
            height: 554,
            caption: "Large (10 pieces, the current upload cap): a five-room floor plan.",
          },
        ],
      },
      {
        title: "Put a Grid View beside the 3D gallery",
        tension: "Immersion vs. accessibility",
        problem:
          "Walking a 3D room is the hook, but in testing it was also how visitors missed work.",
        evidence: [
          {
            source: "Usability testing · July",
            text: "Participants missed artwork moving through the rooms (finding 02), and the prototype had no other way to view the collection.",
          },
          {
            source: "Artist interviews · May",
            text: "P1 and P2 had already put clarity ahead of immersion, but the first prototype didn't reflect that yet.",
          },
        ],
        decision:
          "Pair the 3D gallery with a Grid View of the same collection and the same artwork viewer. On touch devices, Grid View is the starting point and Enter 3D Gallery stays one tap away.",
        tradeoff:
          "Mobile visitors don't start in 3D, the part that makes MyMuseum distinctive. Reaching every piece mattered more.",
        outcome:
          "Built: no artwork is 3D-only. Grid View was checked at 390px wide, and the artwork viewer with keyboard only.",
        images: [
          {
            src: "/images/projects/mymuseum/final/grid-view.png",
            alt: "Accessible grid view of a museum's full collection as cards with thumbnails, titles, and View artwork links, with an Enter 3D Gallery button.",
            width: 2940,
            height: 1592,
            caption: "Grid View on desktop.",
          },
          {
            src: "/images/projects/mymuseum/final/mobile-grid.jpg",
            alt: "Grid View on a phone: the museum title, an Enter 3D Gallery button, and a single column of artwork cards with View artwork links.",
            width: 1206,
            height: 2136,
            caption: "On a phone, where it's the starting point.",
          },
        ],
      },
      {
        title: "Show other visitors, but skip likes and chat",
        tension: "Social presence vs. social pressure",
        problem:
          "Other visitors make a gallery feel occupied, but likes, follower counts, and chat would turn it into another social feed.",
        evidence: [
          {
            source: "Design intent",
            text: "I wanted artists to share work without likes, follower counts, or pressure to post. In the May interviews, P4 described feeds reducing a series to scroll, double-tap, and forget.",
          },
          {
            source: "Usability testing · July",
            text: "Participants asked for a way to comment on an artwork privately (finding 04).",
          },
        ],
        decision:
          "Show other visitors as labeled avatars and a live count, with no chat, likes, or follower counts. For anything more personal, visitors can leave the artist an async note through Museum Mail, which artists can switch off.",
        tradeoff:
          "Visitors can't chat in real time. I traded that for a calmer room where the artwork stays the focus.",
        outcome:
          "Built: realtime presence, verified across two live sessions, and Museum Mail. Public multiplayer deployment is still to come.",
        images: [
          {
            src: "/images/projects/mymuseum/final/multiplayer-a.png",
            alt: "Two visitor avatars, one labeled Visitor 965, standing together in a gallery doorway with a live visitor count in the corner.",
            width: 1024,
            height: 660,
            caption: "Two live sessions in one room: Visitor 965 sees a second visitor arrive, with the live count in the corner.",
          },
        ],
      },
    ],
  },

  // Dropped: the need → requirement table restated the decisions above.
  productRequirements: [],

  // Dropped: these restated the three key decisions above.
  designPrinciples: [],

  design: {
    heading: "The final product",
    processNarrative:
      "Organized around what each screen lets someone do, with mobile versions where the flow carries over.",

    wireframeScreens: [],
    highFidelityScreens: [],

    placeholder: false,
  },

  finalProduct: {
    intro: "",
    stories: [
      {
        title: "Walk through the gallery",
        description:
          "Third-person navigation between rooms, with a prompt the moment artwork is close enough to view.",
        videos: [
          {
            src: "/videos/projects/mymuseum/final-walk.mp4",
            poster: "/images/projects/mymuseum/posters/final-walk.jpg",
            alt: "A yellow block avatar walks through dark-blue gallery rooms past framed artwork, plants, and white columns, with a 'Press E to view' prompt appearing whenever a piece is close.",
            width: 1920,
            height: 1036,
          },
        ],
      },
      {
        title: "Inspect a piece up close",
        description:
          "Stepping up to a piece opens a focused viewer with its full details, and Previous/Next carries that same viewer through the rest of the collection.",
        videos: [
          {
            src: "/videos/projects/mymuseum/final-inspect.mp4",
            poster: "/images/projects/mymuseum/posters/final-inspect.jpg",
            alt: "The artwork viewer pages from 'Porch' to 'Ah Ma' with Previous/Next, then the visitor switches to Grid View, opens 'Misty Falls' from the grid, and returns to the 3D museum.",
            width: 1920,
            height: 1036,
            caption: "Paging through pieces in the viewer, then opening one from Grid View.",
          },
        ],
      },
      {
        title: "Publish a museum in minutes",
        description:
          "Name the museum, pick a gallery theme, and add up to 10 pieces with their details. One click generates a museum sized to the collection, ready to enter or share by link.",
        videos: [
          {
            src: "/videos/projects/mymuseum/final-create.mp4",
            poster: "/images/projects/mymuseum/posters/final-create.jpg",
            alt: "Creating 'Some of my favorites': the creator fills in the museum name, description, and their name, picks the Muted Sage theme, titles three uploaded pieces, and clicks Create My Museum. On the 'museum is ready' screen they click Copy museum link, which confirms 'Link copied', then walk into the new museum and open pieces in the viewer.",
            width: 1920,
            height: 1036,
            caption: "From an empty form to walking through the finished museum. Sped up; file picking cut.",
          },
        ],
      },
      {
        title: "Share it, or keep it private",
        description:
          "Every museum gets a permanent link the moment it's published. Switching it to Private takes it off Explore and makes the link work only for its creator.",
        videos: [
          {
            src: "/videos/projects/mymuseum/final-private-toggle.mp4",
            poster: "/images/projects/mymuseum/posters/final-private-toggle.jpg",
            alt: "From My Museums, the creator opens Edit on 'Some of my favorites' and flips the Visibility switch from 'Published — anyone with the link can visit' to 'Private — only you can see this museum.'",
            width: 1920,
            height: 1000,
            caption: "Switching a museum to Private from its edit page.",
          },
        ],
      },
      {
        title: "Give every visitor an identity",
        description:
          "Shape characters replaced the humanoid avatars from testing (finding 03), with options for shape, color, expression, and decoration.",
        images: [
          {
            src: "/images/projects/mymuseum/final/avatar-editor-desktop.png",
            alt: "Customize your avatar: a mustard rounded-cube character with round glasses and a smile, beside options for character shape, body color, expression, head decoration, and decoration color.",
            width: 2940,
            height: 1586,
          },
        ],
      },
      {
        title: "Write to the artist",
        description:
          "Visitors can send the artist a private note about a museum or a specific piece. It works like email, not chat: artists reply on their own time and can switch notes off.",
        videos: [
          {
            src: "/videos/projects/mymuseum/mail.mp4",
            poster: "/images/projects/mymuseum/posters/mail.jpg",
            alt: "A visitor opens Museum Mail from the artwork viewer for \"Still Life\" and writes a private note to the artist of My Little World.",
            width: 1920,
            height: 1040,
            caption: "Writing to the artist about a specific piece, from the artwork viewer.",
          },
        ],
      },
    ],
    placeholder: false,
  },

  testing: {
    heading: "Five people, one early prototype",
    placement: "before-decisions",
    intro:
      "In July 2026 I tested the prototype with five people: two general users, a U-M art student, a U-M design student, and a user around 40. They liked getting an auto-curated museum instead of building their own, and ran into four problems.",

    tasks: [],

    images: [
      {
        src: "/images/projects/mymuseum/history/aug-one-room.jpg",
        alt: "Early version: a visitor's humanoid avatar alone in a large, mostly empty dark room.",
        width: 2940,
        height: 1520,
        caption: "One room size for every museum.",
      },
      {
        src: "/images/projects/mymuseum/history/aug-humanoid-avatar.jpg",
        alt: "Early avatar editor: a humanoid character with options for skin tone, hairstyle, hair color, top, bottom, and shoes.",
        width: 2940,
        height: 1520,
        caption: "Humanoid avatars. Both images are the earliest saved version (August). I didn't save the tested prototype itself, but these still have the same rooms and avatars.",
      },
    ],

    changedLabel: "What it led to",
    iterations: [
      {
        title: "Museums were the wrong size",
        feedback:
          "Participants struggled to create a museum that fit their artwork: \"a huge room was given for only 5 pieces of art.\" They asked for more room options.",
        finalIteration: "Rooms sized to the collection (Decision 01).",
      },
      {
        title: "Visitors missed artwork",
        feedback:
          "Navigating inside the room, participants struggled to see all the artworks and \"would end up missing some.\"",
        finalIteration: "Grid View (Decision 02).",
      },
      {
        title: "The avatars didn't fit",
        feedback:
          "Participants felt the avatars looked basic and didn't have a theme of their own.",
        finalIteration: "Simple geometric shape avatars (see Final product).",
      },
      {
        title: "No private way to respond",
        feedback: "Participants wanted a way to comment on an artwork privately.",
        finalIteration: "Museum Mail (Decision 03).",
      },
    ],

    placeholder: false,
  },

  finalThoughts: {
    nextStepsHeading: "Opportunities & next steps",
    pullQuote: "",

    whatILearned:
      "Putting a rough prototype in front of five people reshaped the product: the rooms, the avatars, and how visitors reach the work all changed because of those sessions. Making a 3D museum work was the easy part; the harder questions were how visitors reach it on any device, and how presence supports the artwork instead of distracting from it.",

    nextSteps:
      "Test the live product with a second round of users to confirm the redesign fixed what July's participants ran into, then add artwork zoom (P2, P3) and a way to show a painting's real-world scale (P1).",

    proudestOf:
      "Getting it to the point where artists come back to their museums, edit them, and share them, instead of trying a 3D demo once.",

    placeholder: false,
  },

  whatIsComplete: [],
};
