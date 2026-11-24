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
    { id: "approach", label: "Approach" },
    { id: "testing", label: "Usability testing" },
    { id: "decisions", label: "Key decisions" },
    { id: "final-design", label: "Final design" },
    { id: "reflection", label: "Reflection" },
  ],

  hero: {
    category: "Product Design · 3D Web",
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
      "Online portfolios squeeze every piece of art into the same small rectangle.",
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
        title: "A photo of the work isn't the work",
        whatParticipantsSaid:
          "On a phone, P1's six-foot canvas looks the same size as a ten-inch sketch, without its texture or varnish. P3 loses a sculpture's depth and silhouette in a single JPEG. P4 watches feeds scramble a continuous series.",
        whyItMatters: "",
        designResponse:
          "",
      },
      {
        title: "Nobody wants to learn game controls to see a painting",
        whatParticipantsSaid:
          "P1 expects older collectors to close the tab if they meet game-style controls. P2 wants no virtual building at all, since an art director gives a portfolio about thirty seconds. Even P3, the strongest case for 3D, worries a slow gallery on a midrange phone makes the work look broken.",
        whyItMatters: "",
        designResponse:
          "",
      },
      {
        title: "If publishing is slow, it doesn't happen",
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
          // Told as one paragraph (no strengths/limitations columns).
          strengths: [],
          limitations: [],
          applied:
            "New Art City already puts exhibitions in the browser, and its built-in chat makes a show feel like other people are there. But artists build their spaces by hand, so finding one specific piece can mean a lot of wandering.",
        },
      ],
      opportunity:
        "I wanted making a museum to feel more like uploading a portfolio than designing an exhibition.",
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
      "Show the real scale, surface and depth of the work",
      "Keep a series in order",
      "Publish in a few minutes",
    ],
    personaPlaceholder: false,
    secondaryPersona: {
      name: "Their visitors",
      summary:
        "Want to find the work, take it in, and reach the artist, without learning a game first.",
      needs: [
        "Get around without game controls",
        "See every piece without hunting for it",
        "A private way to reach the artist about a piece",
      ],
    },
    tensionIntro:
      "The interviews pulled in two directions: P3 and P4 wanted more atmosphere, P2 wanted none, and P1 wanted both: a painting's presence without the controls.",
    hmw: "",
  },

  approach: {
    heading: "From interviews to a working prototype",
    paragraphs: [
      "After the interviews, I split the product into two experiences: artists making a museum, and visitors walking through one. They use the same product, but they want different things and aren't equally comfortable with technology. For every part, I asked whether it actually got better in 3D or was better as a familiar 2D screen.",
      "I moved to a working prototype early. Most of my open questions were about movement, how big a piece feels, and how close you need to be to see it, and a static wireframe couldn't answer those. So the prototype became how I explored the design, not just how I built it. I went back and forth between designing and building the whole way through instead of finishing one before starting the other.",
    ],
    tools: [
      { name: "Figma", use: "User flows, layouts and interactions, worked out before I built them." },
      { name: "Next.js", use: "The web app itself: creating, editing and sharing museums." },
      {
        name: "React Three Fiber",
        use: "The 3D galleries, running right in the browser so visitors don't have to download anything.",
      },
      { name: "Blender", use: "3D assets, and figuring out how a physical gallery translates to a digital one." },
      {
        name: "Claude Code",
        use: "A development partner for building interactions and working through technical problems faster. The design decisions stayed mine.",
      },
    ],
  },

  // The three tensions now live in `keyDecisions` below, with their
  // evidence and tradeoffs, instead of as short cards here.
  ideation: {
    whyThisTitle: "Where artists' and visitors' needs pulled apart",
    whyThis: [
      {
        title: "Creative freedom vs. ease of creation",
        painPoint:
          "Full control over the layout would let artists say more, but it would also mean learning spatial design.",
        solution: "MyMuseum lays out the rooms for them, so anyone can publish a museum.",
      },
      {
        title: "Immersion vs. usability",
        painPoint:
          "3D shows a piece's scale and presence, but it comes with a learning curve.",
        solution: "Grid View lets visitors see every piece without learning any controls.",
      },
      {
        title: "Presence vs. comfort",
        painPoint:
          "I wanted visitors to feel other people in the room without having to talk to strangers.",
        solution: "Labeled avatars, no live chat, and Museum Mail as a private, low-pressure note.",
      },
      {
        title: "Realism vs. performance",
        painPoint:
          "It all runs in a browser, so every bit of 3D detail costs load time and narrows which devices can run it.",
        solution: "I weighed added detail against loading and device reach, so the art stays easy to get to.",
      },
    ],
    whyThisPlaceholder: false,

    // Trimmed for length: the creator/visitor flowcharts repeated what the
    // final-product videos already show.
    flows: [],

    flowsPlaceholder: false,
  },

  keyDecisions: {
    heading: "What I changed after testing",
    items: [
      {
        title: "I let the uploads decide the layout",
        body: [
          "Letting artists arrange their own rooms would mean asking them to learn exhibition design. New Art City works that way, and it feels more like a professional tool than a place to share a portfolio. In July, testers liked getting a museum that was already set up for them. The problem was that it only came in one size, so five pieces of art ended up in a huge room.",
          "Now MyMuseum builds the layout for you. You upload your work, pick a gallery style and fill in the details, and it chooses one of three floor plans based on how many pieces you have. Add or remove a piece and the layout rebuilds itself.",
          "The cost is that artists can't hang a piece exactly where they want it. I gave that up so every museum stays easy to walk through.",
        ],
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
        title: "I added a Grid View next to the 3D gallery",
        body: [
          "Walking through the rooms is the fun part, but in testing it was also how people missed work. They'd move through a room and “end up missing some,” and the prototype had no other way to see the collection. P1 and P2 had told me in May that clarity mattered more to them than immersion. I just hadn't designed for it yet.",
          "Every museum now has a Grid View with the same collection and the same artwork viewer. On a phone, Grid View is where you start, and Enter 3D Gallery is one tap away. Nothing is 3D-only. I checked Grid View at 390px wide and went through the artwork viewer using only a keyboard.",
          "I didn't want the phone version to be a shrunken desktop. A computer has a keyboard, a mouse and a big screen. A phone has a small screen and different habits, and the interviews showed game-style movement puts off people who don't play games. In the 3D room, you can drag with a finger to look around, but walking still takes a keyboard (W A S D or the arrow keys); there are no on-screen movement controls yet. So phones open in Grid View, and Enter 3D Gallery carries a note that the 3D room works best with a keyboard.",
          "That means people on phones don't start in 3D, which is the most distinctive part of MyMuseum. Being able to see every piece mattered more to me.",
        ],
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
        title: "I show other visitors, but there are no likes or chat",
        body: [
          "Seeing other people in a gallery makes it feel alive. But I didn't want MyMuseum to turn into another feed, with likes, follower counts and pressure to post. In May, P4 talked about feeds turning a whole series into scroll, double-tap, forget.",
          "So other visitors show up as labeled avatars with a live count in the corner, and that's it. In July, testers asked for a private way to comment on a piece, so I added Museum Mail. It's a note to the artist that works more like email than chat, and artists can turn it off.",
          "You can't talk to someone in the room in real time. I'd rather keep the room quiet so the art stays the focus. Presence works across two live sessions, but I haven't made multiplayer public yet.",
        ],
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
      "Here's what you can do in it now.",

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
          "Testers found the humanoid avatars too basic, so I swapped them for simple shape characters. You pick the shape, color, expression and decoration.",
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
          "Visitors can send the artist a private note about a museum or a specific piece. Artists reply when they want to, and can switch notes off.",
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
        caption: "Humanoid avatars. Both screenshots are from August, the earliest version I saved, which still had the same rooms and avatars as the one I tested.",
      },
    ],

    iterations: [
      {
        title: "Museums were the wrong size",
        feedback:
          "People had trouble making a museum that fit their work: \"a huge room was given for only 5 pieces of art.\" They asked for more room options.",
        finalIteration: "Rooms now come in three sizes, based on how many pieces you upload.",
      },
      {
        title: "Visitors missed artwork",
        feedback:
          "Moving around the room, people had trouble seeing everything and \"would end up missing some.\"",
        finalIteration: "I added a Grid View that shows the whole collection at once.",
      },
      {
        title: "The avatars didn't fit",
        feedback:
          "People thought the avatars looked basic and didn't have a style of their own.",
        finalIteration: "I replaced them with simple shape characters you can customize.",
      },
      {
        title: "No private way to respond",
        feedback: "People wanted a way to comment on a piece privately.",
        finalIteration: "I added Museum Mail, a private note to the artist.",
      },
    ],

    placeholder: false,
  },

  finalThoughts: {
    nextStepsHeading: "What's next",
    pullQuote: "",

    whatILearned:
      "Five people with a rough prototype changed the rooms, the avatars, and how visitors get to the work. Getting 3D running in a browser wasn't the hard part. The hard part was making sure anyone could reach the art on any device, and keeping other visitors from pulling attention away from it.",

    nextSteps:
      "Test the live version with a new group of people to see if the changes fixed what July's testers ran into. Then add artwork zoom, which P2 and P3 asked for, and a way to show a painting's real size, which P1 asked for.",

    proudestOf:
      "Getting it to the point where artists come back to their museums, edit them, and share them, instead of trying a 3D demo once.",

    placeholder: false,
  },

  whatIsComplete: [],
};
