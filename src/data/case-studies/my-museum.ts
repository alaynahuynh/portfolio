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
    { id: "user-flows", label: "Flows" },
    { id: "final-design", label: "Final design" },
    { id: "iterations", label: "Iterations" },
    { id: "reflection", label: "Reflection" },
  ],

  hero: {
    category:
      "Product Design · Interaction Design · 3D Web · Frontend Development",
    title: "MyMuseum",
    tagline:
      "Turning online art portfolios into spaces people can actually walk through.",
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
    challenge: "What if an art portfolio felt like entering someone's world?",
    placeholder: false,
  },

  research: {
    heading: "Starting with artists",
    intro:
      "In May 2026, before building anything, I interviewed five artists (30–45 minutes each): P1, oil painter; P2, concept artist; P3, 3D sculptor — professionals reached through Instagram and Cara — and two U-M Stamps students, P4, narrative illustrator, and P5, ceramicist. We covered how they show their work today, then concept wireframes of 3D vs. grid navigation and automatic room setup.",
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
          "P1 expects older collectors to close the tab if they meet game-style controls. P2 wants no virtual building at all — an art director gives a portfolio about thirty seconds. Even P3, the strongest case for 3D, worries a slow gallery on a midrange phone makes the work look broken.",
        whyItMatters: "",
        designResponse:
          "",
      },
      {
        title: "Publishing has to take minutes, not an afternoon",
        whatParticipantsSaid:
          "P2 hadn't updated their site in about nine months — if publishing takes more than a couple of minutes, it doesn't happen. P5 cancelled a paid site builder; the monthly fee made no sense for occasional pottery sales.",
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
            "Recent Exhibitions and Events & Openings give visitors two ways to discover artists.",
            "Built-in chat gives exhibitions a sense of social presence.",
          ],
          limitations: [
            "Open-ended building tools trade visitor navigation for creator freedom — finding a specific piece can take real exploration.",
            "Feels more like a professional creative workspace than a place to just upload work.",
          ],
          applied:
            "Social, browser-based exhibitions work — but creator freedom shouldn't cost visitors the ability to find the work.",
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
      "Free to run, managed from a phone (P5)",
    ],
    personaPlaceholder: false,
    secondaryPersona: {
      name: "Their visitors",
      summary:
        "Want to find the work, take it in, and reach the artist, without learning a game first. Collectors and art directors as the artists described them, plus the five people who visited museums in July testing.",
      needs: [
        "Get around without game-style controls (P1)",
        "Judge the work in about thirty seconds (P2)",
        "Crisp detail that loads fast, even on a midrange phone (P2, P3)",
        "See every piece without hunting for it (July testing)",
        "A private way to reach the artist about a piece (P2, July testing)",
      ],
    },
    tensionIntro:
      "The interviews pulled in two directions: P3 and P4 wanted more atmosphere, P2 wanted none, and P1 wanted both — a painting's presence without the controls.",
    hmw:
      "How might I give artists enough freedom to make a museum feel like their own without sacrificing navigation and accessibility for visitors?",
  },

  // The three tensions now live in `keyDecisions` below, with their
  // evidence and tradeoffs, instead of as short cards here.
  ideation: {
    whyThisTitle: "",
    whyThis: [],
    whyThisPlaceholder: false,

    flowsSectionTitle: "The redesigned flows",
    flowsPlacement: "after-decisions",
    flowsIntro:
      "After testing, the two journeys that had to work together — creating a museum and exploring one — looked like this.",

    flows: [
      {
        name: "Creator flow",
        steps: [
          "Discover MyMuseum",
          "Create account",
          "Add museum details",
          "Upload artwork",
          "Add artwork information",
          "Choose gallery style",
          "Generate museum",
          "Preview",
          "Publish",
          "Copy link",
          "Share",
        ],
        image: {
          src: "/images/projects/mymuseum/flow-creator.png",
          alt: "Flowchart of the MyMuseum creator flow: landing page into sign up, museum details, artwork upload, gallery style selection, generating and previewing the museum, then editing or publishing with a visibility choice and share link.",
          width: 2040,
          height: 3208,
        },
        takeaway:
          "Goal: as little distance as possible between uploading artwork and having something worth sharing.",
      },
      {
        name: "Visitor flow",
        steps: [
          "Open a shared link or discover a museum",
          "Enter museum",
          "Choose 3D Gallery or Grid View",
          "Explore artwork",
          "Open artwork details",
          "Explore alongside other visitors",
        ],
        image: {
          src: "/images/projects/mymuseum/flow-visitor.png",
          alt: "Flowchart of the MyMuseum visitor flow: a shared link or Explore page into museum entry, choosing 3D Game View or Grid View, browsing and selecting artwork, viewing artwork details, then continuing to explore.",
          width: 1688,
          height: 1992,
        },
        takeaway:
          "Goal: keep spatial discovery without making 3D navigation a requirement.",
      },
    ],

    flowsPlaceholder: false,
  },

  keyDecisions: {
    heading: "Three decisions that shaped MyMuseum",
    intro:
      "How I reworked the prototype. Each decision answers what the May interviews and July testing showed, and each gave something up.",
    items: [
      {
        title: "Make creating a museum feel like uploading a portfolio",
        tension: "Freedom vs. structure",
        problem:
          "Full spatial freedom means learning exhibition design, and risks layouts visitors can't navigate.",
        evidence: [
          {
            source: "Competitive analysis",
            text: "New Art City's open-ended building tools cost visitors navigation and felt like a professional workspace.",
          },
          {
            source: "Usability testing · July",
            text: "Participants liked having the museum auto-curated instead of building their own environment — but one room size didn't fit every collection (finding 01).",
          },
          {
            source: "Artist interviews · May",
            text: "Publishing speed was the clearest shared need (P2, P5) — the work automatic layout is designed to remove.",
          },
        ],
        decision:
          "Generate the layout automatically, sized to the collection. Creators control their artwork, gallery style, and museum details — and adding or removing a piece re-runs the layout instead of asking them to place it.",
        tradeoff:
          "Artists can't hand-place work or design their own rooms. I gave up some expressiveness so every museum stays navigable and no one has to learn exhibition design.",
        outcome:
          "Built: creators never place anything by hand, and one of three floor plans is picked from the size of the collection (below).",
        videos: [
          {
            src: "/videos/projects/mymuseum/room-small.mp4",
            poster: "/images/projects/mymuseum/posters/room-small.jpg",
            alt: "Walking through a small museum: one compact room with artwork on every wall around a central sculpture.",
            width: 1024,
            height: 554,
            caption: "Small · 1–4 pieces — one compact room.",
          },
          {
            src: "/videos/projects/mymuseum/room-middle.mp4",
            poster: "/images/projects/mymuseum/posters/room-middle.jpg",
            alt: "Walking through a medium museum: two connected rooms, with framed paintings along the walls.",
            width: 1024,
            height: 554,
            caption: "Medium · 5–9 pieces — two connected rooms.",
          },
          {
            src: "/videos/projects/mymuseum/room-large.mp4",
            poster: "/images/projects/mymuseum/posters/room-large.jpg",
            alt: "Walking through a large museum: moving between several connected rooms of a five-room floor plan.",
            width: 1024,
            height: 554,
            caption: "Large · 10 pieces (the current upload cap) — a five-room floor plan.",
          },
        ],
      },
      {
        title: "Make 3D an option, not a requirement",
        tension: "Immersion vs. accessibility",
        problem:
          "3D exploration is MyMuseum's hook, but it shouldn't be the only way to see someone's work.",
        evidence: [
          {
            source: "Usability testing · July",
            text: "Participants missed artwork moving through the rooms (finding 02) — the prototype had no other way to view the collection.",
          },
          {
            source: "Self-testing",
            text: "The interface could be responsive while keyboard-based 3D movement still had no natural touch equivalent.",
          },
          {
            source: "Artist interviews · May",
            text: "P1 and P2 had already put clarity ahead of immersion — the first prototype didn't act on it yet.",
          },
        ],
        decision:
          "Pair the 3D gallery with a Grid View of the same collection and the same artwork viewer. On touch devices, Grid View is the starting point and Enter 3D Gallery stays one tap away.",
        tradeoff:
          "Mobile visitors don't start in the immersive experience that makes MyMuseum distinctive. I chose reliable access to every artwork over a first impression that might not work on their device.",
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
        title: "Design for presence, not engagement",
        tension: "Social presence vs. social pressure",
        problem:
          "Multiplayer could make galleries feel alive — or, with likes, follower counts, and chat, turn them into another social feed.",
        evidence: [
          {
            source: "Competitive analysis",
            text: "New Art City's built-in chat showed that social presence was worth keeping.",
          },
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
          "Show other visitors as labeled avatars and a live count — no chat, likes, or follower counts. For anything more personal, visitors can leave the artist an async note through Museum Mail, which artists can switch off.",
        tradeoff:
          "Visitors can't talk to each other in real time the way they can in a chat-first space. I traded spontaneous conversation for a calmer room where the artwork stays the focus.",
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
          "A museum is shareable the moment it's published: the success screen hands over a permanent link to copy. Creators who aren't ready can switch a museum to Private, which takes it off Explore and makes the link work only for them.",
        images: [
          {
            src: "/images/projects/mymuseum/final/museum-ready-share.png",
            alt: "'Your museum is ready' screen for 'Some of my favorites': it's live at a shareable link, with Enter Museum and Copy museum link buttons.",
            width: 1440,
            height: 860,
            caption: "Right after publishing: enter the museum, or copy its link to send.",
          },
        ],
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
        title: "Find museums and artists",
        description:
          "Explore lists every published museum and the artists behind them, so visitors who don't arrive by a shared link still have a way in. Private museums never show up here.",
        images: [
          {
            src: "/images/projects/mymuseum/final/explore-museums.png",
            alt: "Explore museums page, Museums tab: cards for 'My favorite works!' by Aahuynh, 'footsies' by jeanz, and 'The Monet Collection' by Monet, each with a cover image, date, description, and Enter museum link.",
            width: 1920,
            height: 1036,
            caption: "Published museums, most recently opened first.",
          },
          {
            src: "/images/projects/mymuseum/final/explore-artists.png",
            alt: "Explore artists page, Artists tab: cards for four creators, each showing their shape avatar, display name, handle, and museum count.",
            width: 1920,
            height: 1036,
            caption: "Artists, shown by the avatars they made.",
          },
        ],
      },
      {
        title: "Browse an artist's collection",
        description:
          "A public profile lists every museum an artist has published, each opening straight into that museum, with a Message button for reaching the artist directly.",
        images: [
          {
            src: "/images/projects/mymuseum/final/artist-profile-desktop.png",
            alt: "Public profile for the artist Monet: a teal cone avatar with glasses, the handle @claudemonet with one published museum, a Message button, and a card for The Monet Collection with an Enter museum link.",
            width: 2940,
            height: 1586,
          },
          {
            src: "/images/projects/mymuseum/final/artist-profile-mobile.jpg",
            alt: "The same profile on mobile: avatar, name, and a full-width Message button stacked above The Monet Collection card.",
            width: 1206,
            height: 2151,
          },
        ],
      },
      {
        title: "Give every visitor an identity",
        description:
          "The shape characters that replaced the humanoid avatars from testing (finding 03): shape, body color, expression, and decoration, designed to fit MyMuseum's look. Drag to rotate; works on desktop and mobile.",
        images: [
          {
            src: "/images/projects/mymuseum/final/avatar-editor-desktop.png",
            alt: "Customize your avatar: a mustard rounded-cube character with round glasses and a smile, beside options for character shape, body color, expression, head decoration, and decoration color.",
            width: 2940,
            height: 1586,
          },
          {
            src: "/images/projects/mymuseum/final/avatar-editor-mobile.jpg",
            alt: "The avatar editor on mobile: the same rounded-cube character in a large preview above Save avatar and Reset changes, with the customization options below.",
            width: 1206,
            height: 2235,
          },
        ],
      },
      {
        title: "Write to the artist",
        description:
          "A private note to the artist about a museum or a specific piece — from the artwork viewer, the museum menu, or their profile. It works like email, not chat: artists reply from an inbox on their own time, can switch new notes off, and can block or report a sender.",
        images: [
          {
            src: "/images/projects/mymuseum/final/mail-composer-dialog.png",
            alt: "Museum Mail composer, titled 'Leave a note for the artist': 'About My Little World. This goes straight to them, privately.', a note field with a 0/2000 character count, and Cancel and Send note buttons.",
            width: 720,
            height: 570,
            caption: "Leaving a note from inside the museum.",
          },
        ],
        videos: [
          {
            src: "/videos/projects/mymuseum/mail.mp4",
            poster: "/images/projects/mymuseum/posters/mail.jpg",
            alt: "A visitor opens Museum Mail from the artwork viewer for \"Still Life\" and writes a private note to the artist of My Little World.",
            width: 1920,
            height: 1040,
            caption: "Or about a specific piece, from the artwork viewer.",
          },
        ],
        followUpLabel: "On the artist's side, a dot on their avatar signals new mail, and each note in the inbox shows which museum and piece it's about.",
        followUpImages: [
          {
            src: "/images/projects/mymuseum/final/mail-notification-menu.png",
            alt: "Account menu opened from the artist's avatar, which has an unread dot; the Museum Mail item also shows a dot, alongside Customize Avatar, Public Profile, Settings, and Log out.",
            width: 508,
            height: 666,
            caption: "A dot flags new mail.",
          },
          {
            src: "/images/projects/mymuseum/final/mail-inbox.png",
            alt: "\"Your mail\" inbox listing three unread notes from Monet, each labeled with its museum and piece — My Little World · Still Life, Innocence, and Scenes — and a date.",
            width: 1484,
            height: 846,
            caption: "Each note names the museum and piece it's about. (Test notes I sent from a second account.)",
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
      "July 15–21, 2026. The prototype had humanoid avatars, one room size for every museum, and an earlier homepage. Participants: two general users (one who plays games often, one who rarely does), a University of Michigan art student, a University of Michigan design student, and a user around 40. They liked the idea — especially getting an auto-curated museum instead of building their own. Here's where they struggled.",

    tasks: [
      "Navigate the website.",
      "Visit other people's museums.",
      "Create your own museum.",
      "Edit your avatar and profile.",
    ],

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
        caption: "Humanoid avatars. Both images are the earliest saved version (August) — the tested prototype itself wasn't saved, but these still have the same rooms and avatars.",
      },
    ],

    changedLabel: "What it led to",
    iterations: [
      {
        title: "Museums were the wrong size",
        feedback:
          "Participants struggled to create a museum that fit their artwork: \"a huge room was given for only 5 pieces of art.\" They asked for more room options.",
        finalIteration: "Rooms sized to the collection — Decision 01.",
      },
      {
        title: "Visitors missed artwork",
        feedback:
          "Navigating inside the room, participants struggled to see all the artworks and \"would end up missing some.\"",
        finalIteration: "Grid View — Decision 02.",
      },
      {
        title: "The avatars didn't fit",
        feedback:
          "Participants felt the avatars looked basic and didn't have a theme of their own.",
        finalIteration: "Simple geometric shape avatars — see Final product.",
      },
      {
        title: "No private way to respond",
        feedback: "Participants wanted a way to comment on an artwork privately.",
        finalIteration: "Museum Mail — Decision 03.",
      },
      {
        title: "Sharing was hard to find",
        later: true,
        feedback: "Permanent museum URLs existed, but creators had no obvious way to find and reuse them.",
        finalIteration: "Added View Museum and Copy Link actions to the dashboard and editing flow.",
      },
      {
        title: "No way back in after publishing",
        later: true,
        feedback: "Once a museum was generated, creators had no way back in to fix a typo, swap a piece, or change its visibility.",
        finalIteration: "Added museum editing: details, artwork, visibility, and identity, all changeable after publishing.",
      },
      {
        title: "Editing got long as collections grew",
        later: true,
        feedback: "Showing every artwork's full metadata form made editing long and hard to scan.",
        finalIteration: "Redesigned artwork management as compact summary rows with expandable editing.",
      },
    ],

    laterHeading: "Hardening the product",
    laterIntro:
      "Turning the redesign into a real product, I ran every creator and visitor workflow myself with real accounts and multiple users — self-testing, not usability testing. The new homepage and the Explore / My Museums / Create navigation came from this period too.",

    placeholder: false,
  },

  finalThoughts: {
    nextStepsHeading: "Opportunities & next steps",
    pullQuote:
      "Building an exciting interaction and building a usable product are different problems.",

    whatILearned:
      "Putting a rough prototype in front of five people reshaped the product — the rooms, the avatars, and how visitors reach the work all came out of those sessions. The original challenge was making a 3D museum work; the harder questions came after: how creators manage museums, how visitors reach them on any device, and how presence supports the artwork instead of distracting from it.",

    nextSteps:
      "First, a second round of usability sessions on the redesigned, live product — to check that room sizing, Grid View, the new avatars, and Museum Mail actually resolve what the July participants ran into. Then the two gaps the interviews made clearest: artwork zoom with measured load times (P2, P3), and showing a painting's real-world scale (P1).",

    proudestOf:
      "Turning an unusual interaction concept into something creators can actually return to, manage, and share — not just a visually impressive prototype.",

    placeholder: false,
  },

  whatIsComplete: [],
};
