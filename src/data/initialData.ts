import { BrandSettings, PageContent, PortfolioItem, Service } from '../types/index.ts';

export const INITIAL_BRAND_SETTINGS: BrandSettings = {
  studioName: "AEON MEDIA",
  tagline: "Creating the Future of Luxury Hospitality.",
  description: "A hospitality-focused content and brand storytelling studio crafting considered narratives for luxury hotels, resorts, villas, and exceptional destinations.",
  contactEmail: "aeonmediaofficial@gmail.com",
  instagramHandle: "@aeonmedia.co",
  location: "Monaco · London · Kyoto",
  availabilityNotice: "Currently accepting commissions for Autumn / Winter 2026.",
  directInquiryOpen: true,
  seoTitle: "AEON MEDIA — Luxury Hospitality Creative Studio",
  seoDescription: "Considered copywriting, brand voice architecture, and editorial narrative design for independent luxury hotels, private island sanctuaries, and hospitality groups.",
  seoKeywords: "luxury hotel copywriting, hospitality brand storytelling, resort website copy, luxury villa content, boutique hotel branding"
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Luxury Hotel Website Copywriting",
    category: "Digital Presence",
    description: "Complete architectural website prose that translates physical hospitality, spatial restraint, and tactile atmosphere into compelling digital reading experiences.",
    deliverables: [
      "Hero positioning narratives & philosophy manifestos",
      "Interactive page-by-page editorial prose",
      "Navigation taxonomy & room booking pathway copy",
      "Direct-reservation conversion touchpoints"
    ],
    suitableFor: "New property launches, major flagship refurbishments, and independent boutique hotel redesigns.",
    clientOutcome: "Elevated brand equity, increased direct booking conversion, and complete elimination of commoditized booking language.",
    order: 1
  },
  {
    id: "serv-2",
    title: "Rooms, Suites & Villa Narratives",
    category: "Accommodations & Spaces",
    description: "Spatial and sensory descriptions for suites, private residences, signature villas, fine-dining establishments, and restorative wellness sanctuaries.",
    deliverables: [
      "Spatial orientation & material craftsmanship narratives",
      "Sensory suite feature curation (linen, acoustics, light)",
      "Private pool villa & penthouse brochures",
      "Spa menu treatments & culinary philosophy copy"
    ],
    suitableFor: "Resorts with diverse room categories seeking to justify rate premiums on signature suites and private villas.",
    clientOutcome: "Immediate clarity on suite distinctions and tangible emotional justification for upper-tier ADR (Average Daily Rate).",
    order: 2
  },
  {
    id: "serv-3",
    title: "Guest Email Marketing & Pre-Arrival Journeys",
    category: "Guest Communications",
    description: "Thoughtfully paced, beautifully worded guest communication sequences that replace automated transactional templates with warm, dignified hospitality.",
    deliverables: [
      "Curated pre-arrival concierge invitations",
      "Arrival day orientation notes & seasonal anticipation",
      "In-stay dining & experience booking notes",
      "Post-departure appreciation & discreet loyalty correspondence"
    ],
    suitableFor: "Properties with high repeat guest rates and private members' clubs desiring bespoke communication.",
    clientOutcome: "Higher ancillary spend on dining and wellness prior to check-in, coupled with an intimate, unhurried guest relationship.",
    order: 3
  },
  {
    id: "serv-4",
    title: "Luxury Brand Storytelling & Voice Architecture",
    category: "Brand Strategy",
    description: "Foundational brand books, verbal identity systems, and tone-of-voice frameworks that guide every touchpoint of an exceptional hotel group.",
    deliverables: [
      "Comprehensive Verbal Identity & Tone Codex",
      "Brand philosophy manifesto & architectural narrative",
      "Key vocabulary guide (approved lexicon & banned clichés)",
      "Colleague onboarding tone guidelines"
    ],
    suitableFor: "Bespoke hospitality collections, newly founded independent brands, and properties transitioning from chain to independent luxury.",
    clientOutcome: "Cohesive, effortless voice consistency across every team member, agency partner, and published document.",
    order: 4
  },
  {
    id: "serv-5",
    title: "Social Media Editorial Copywriting",
    category: "Editorial Positioning",
    description: "Restrained, poetic micro-essays and architectural captions that treat Instagram and social channels like curated print monographs rather than digital billboards.",
    deliverables: [
      "Monthly architectural caption suites",
      "Visual storytelling narrative prompts",
      "Artist-in-residence and culinary feature copy",
      "Quiet cultural guides to the surrounding terroir"
    ],
    suitableFor: "Properties seeking to attract discerning cultural travelers and high-net-worth guests who reject loud commercial marketing.",
    clientOutcome: "A magnetic, high-taste visual and written feed that builds authentic organic prestige.",
    order: 5
  },
  {
    id: "serv-6",
    title: "Direct-Booking Content Architecture",
    category: "Conversion Strategy",
    description: "Strategic content structuring that disarms price hesitation, highlights private privileges, and gently guides guests to reserve directly with the property.",
    deliverables: [
      "Direct-booking guarantee & privilege copy",
      "Seasonal package & private buy-out narratives",
      "Comparison storytelling versus third-party OTAs",
      "Transparent reservation policy phrasing"
    ],
    suitableFor: "Hotels aiming to reduce third-party commission leakage while protecting luxury brand tone.",
    clientOutcome: "Substantial increase in direct bookings without resorting to tacky discount banners or countdown timers.",
    order: 6
  },
  {
    id: "serv-7",
    title: "Multi-Property Content Systems",
    category: "Hospitality Groups",
    description: "Unified yet regionally distinctive content frameworks for hotel collections, villa management groups, and regional hospitality portfolios.",
    deliverables: [
      "Master portfolio narrative & regional property chapters",
      "Modular suite & amenity description matrices",
      "Cross-property guest discovery booklets",
      "Centralized content governance standards"
    ],
    suitableFor: "Hospitality groups operating 3 to 20 distinctive properties across global regions.",
    clientOutcome: "Seamless content scalability and brand synergy while honoring the individual terroir of each address.",
    order: 7
  },
  {
    id: "serv-8",
    title: "Seasonal Campaigns & Tailored Commissions",
    category: "Bespoke Commissions",
    description: "High-touch copywriting for milestone anniversaries, seasonal openings, private island launches, and architectural monograph releases.",
    deliverables: [
      "Opening campaign manifestos & press dossiers",
      "Limited-edition seasonal guest experiences",
      "Print collateral, menu narratives & hardbound book copy",
      "Executive speechwriting & partner letters"
    ],
    suitableFor: "Properties celebrating momentous milestones or staging exclusive seasonal unveilings.",
    clientOutcome: "Enduring editorial artifacts that resonate with international design press and collectors.",
    order: 8
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "proj-1",
    title: "The Saffron & Saltwater Pavilion",
    slug: "saffron-saltwater-pavilion",
    category: "Cliffside Sanctuary",
    isConceptual: true,
    coverImage: "/src/assets/images/portfolio_aegean_sanctuary_1792846778691.jpg",
    location: "Milos, Cyclades",
    summary: "A conceptual narrative exploration for a twelve-suite cliffside hideaway carved into volcanic pumice, where architecture yields entirely to silence and the horizon.",
    challenge: "Cycladic luxury is often reduced to predictable clichés of whitewashed walls and blue domes. The brief required establishing a quiet, monastic tone that celebrates volcanic geology, raw linen, and solitary contemplation.",
    narrativeVoice: "Monastic, sensory, unhurried. Sentence structures mimic the rhythmic swell of the Aegean against sea-hewn basalt.",
    deliverables: [
      "Brand Philosophy Manifesto",
      "Complete Website Narrative & Suite Descriptions",
      "Pre-Arrival Private Transfer Letters",
      "Sensory Evening Turndown Anthology"
    ],
    excerpts: [
      {
        title: "Suite Narrative: The Sea Cliff Sanctuary",
        text: "There is no glass between the stone floor and the Aegean; only the quiet threshold where hand-troweled lime gives way to the open air. In the morning, shadows move across untreated cedar with the patience of an island that has forgotten the calendar."
      },
      {
        title: "Culinary Manifesto: Fire & Brine",
        text: "We cook with what the wind allows. Wild oregano gathered from the northern ridge, sea salt harvested from sunlit crevices, and red mullet caught before the morning bell. Dining here is not an occasion; it is an honoring of the immediate earth."
      }
    ],
    isPublished: true,
    featured: true,
    order: 1,
    createdAt: "2026-02-10T12:00:00Z"
  },
  {
    id: "proj-2",
    title: "Palais de Vivienne",
    slug: "palais-de-vivienne",
    category: "Historic Grand Residence",
    isConceptual: true,
    coverImage: "/src/assets/images/portfolio_heritage_palace_1792846779319.jpg",
    location: "Innere Stadt, Vienna",
    summary: "Conceptual verbal restoration for an 18th-century noble residence converted into a thirty-room sanctuary, bridging imperial grandeur with contemporary Austrian restraint.",
    challenge: "Historic properties often sound like museum archives or fall into dated aristocratic clichés. The goal was to render 300 years of cultural heritage vibrant, intimate, and deeply hospitable.",
    narrativeVoice: "Cultivated, warm, quietly intellectual. Echoes of literary salons, chamber music, and private library conversations.",
    deliverables: [
      "Verbal Identity & Heritage Codex",
      "Full Website Copy & Grand Suite Monographs",
      "In-Room Private Salon Reading Guides",
      "Guest Concierge Letters"
    ],
    excerpts: [
      {
        title: "Suite Monograph: The Beethoven Salon",
        text: "Beneath soaring plaster moldings restored by master artisans, acoustic stillness reigns. Here, where afternoon light filters through hand-loomed silk, the city's musical history is not displayed behind ropes—it is lived in."
      },
      {
        title: "Philosophy: The Art of Austrian Discretion",
        text: "True hospitality does not announce itself. It is felt in the weight of a brass key placed in your palm, the fire rekindled while you were away at the Musikverein, and coffee served at the precise temperature of contemplation."
      }
    ],
    isPublished: true,
    featured: true,
    order: 2,
    createdAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "proj-3",
    title: "Amun Dune Monolith",
    slug: "amun-dune-monolith",
    category: "High-Desert Retreat",
    isConceptual: true,
    coverImage: "/src/assets/images/portfolio_desert_pavilion_1792846779744.jpg",
    location: "Colorado Plateau, Utah",
    summary: "Conceptual voice architecture for a monolithic rammed-earth sanctuary sheltered beneath red rock canyons, honoring ancient geology and cosmological stillness.",
    challenge: "Communicating the sheer scale of the American desert without sounding like a national park brochure, establishing an elemental, meditative luxury standard.",
    narrativeVoice: "Monumental, geological, intimate. Deep cadence emphasizing silence, mineral textures, and astronomical clarity.",
    deliverables: [
      "Master Brand Story & Territory Guide",
      "Pavilion & Mesa Suite Narratives",
      "Nocturnal Sky Observation Program Copy",
      "Stargazing & Wellness Journey Scripts"
    ],
    excerpts: [
      {
        title: "Pavilion Description: The Canyon Hearth Suite",
        text: "Constructed from the very dust it inhabits, the walls hold the desert sun through the chill of dusk. As embers rise from the sunken outdoor hearth, the mesas dissolve into indigo, and the Milky Way arches across two billion years of silence."
      },
      {
        title: "Arrival Note: Crossing the Threshold",
        text: "You will notice the sound first—or rather, the sudden absence of it. In this valley, silence is not an empty space; it is a palpable substance, restoring what the world took away."
      }
    ],
    isPublished: true,
    featured: true,
    order: 3,
    createdAt: "2026-03-18T12:00:00Z"
  },
  {
    id: "proj-4",
    title: "The Kyoto Cedar Pavilion",
    slug: "kyoto-cedar-pavilion",
    category: "Ryokan & Forest Sanctuary",
    isConceptual: true,
    coverImage: "/src/assets/images/hero_luxury_resort_1792846777846.jpg",
    location: "Higashiyama, Kyoto",
    summary: "Conceptual narrative development for an eight-villa forest retreat grounded in Sukiya-style carpentry, private cedar onsen baths, and seasonal micro-seasons (sekki).",
    challenge: "Expressing Japanese hospitality (Omotenashi) and spatial balance (Ma) in English without generic western tropes or orientalist clichés.",
    narrativeVoice: "Subtle, reverent, grounded in botanical time and the tactile fragrance of hinoki cedar.",
    deliverables: [
      "24-Micro-Season Seasonal Letter Series",
      "Villa Experience & Onsen Etiquette Monographs",
      "Kaiseki Culinary Storybook",
      "Direct-Booking Reservation Narrative"
    ],
    excerpts: [
      {
        title: "Villa Description: The Moss Garden Residence",
        text: "Morning arrives through handmade washi screens, softened into mist. Water murmurs through bamboo into the sunken hinoki bath, carrying the sharp resinous perfume of ancient timber."
      },
      {
        title: "Philosophy: The Measure of Ma",
        text: "Between one step and the next on stone wet with autumn rain, there is space to breathe. Our hospitality is measured not by what we add to your day, but by what we quietly remove."
      }
    ],
    isPublished: true,
    featured: false,
    order: 4,
    createdAt: "2026-04-05T12:00:00Z"
  }
];

export const INITIAL_PAGES: Record<string, PageContent> = {
  home: {
    slug: "home",
    title: "Home",
    subtitle: "Creating the Future of Luxury Hospitality",
    heroHeading: "Creating the Future of Luxury Hospitality.",
    heroSubtext: "We craft considered content and compelling brand narratives for luxury hotels, resorts, and exceptional destinations.",
    ctaPrimaryText: "Explore Our Expertise",
    ctaSecondaryText: "Discuss a Project",
    sections: {
      philosophy: {
        heading: "Beyond Words. Into Experience.",
        leadText: "In the realm of true luxury, architecture and service are only half the journey. The other half is how a property lives in the imagination of the guest before they arrive—and in their memory long after they depart.",
        bodyText: "Thoughtful writing does not simply describe amenities; it captures the weight of morning light on limestone, the fragrance of cedar at dusk, and the unspoken discretion of extraordinary hospitality. We give visionary destinations the voice they deserve."
      },
      approach: {
        heading: "Our Considered Methodology",
        subheading: "A rigorous, collaborative process designed for hospitality leaders.",
        steps: [
          { number: "01", title: "Discovery & Research", description: "Deep immersion in your property's architecture, history, terroir, competitive positioning, and guest expectations." },
          { number: "02", title: "Brand Voice Alignment", description: "Definition of a distinctive verbal identity, establishing the precise cadence, tone, and vocabulary unique to your address." },
          { number: "03", title: "Content Development", description: "Crafting considered narratives across all touchpoints—from digital flagship copy to private suite monographs and guest communications." },
          { number: "04", title: "Review & Refinement", description: "Collaborative iteration alongside leadership, marketing, and operational stakeholders to polish every nuance." },
          { number: "05", title: "Final Delivery & Governance", description: "Seamless handoff of production-ready copy with clear implementation guidelines for marketing teams and digital agencies." }
        ]
      },
      closingCta: {
        heading: "Every Exceptional Property Has a Story.",
        subheading: "Let's give yours the words it deserves.",
        ctaText: "Begin a Conversation"
      }
    },
    isPublished: true,
    lastEdited: "2026-04-20T10:00:00Z"
  },
  expertise: {
    slug: "expertise",
    title: "Expertise",
    subtitle: "Specialized Hospitality Copywriting & Brand Architecture",
    heroHeading: "The Art of Considered Hospitality Communication.",
    heroSubtext: "Every service we offer is tailored exclusively to luxury hotels, boutique resorts, private villas, and hospitality groups.",
    ctaPrimaryText: "Request Capabilities Deck",
    sections: {
      intro: {
        heading: "Crafted for Discerning Hoteliers",
        text: "Generalist advertising agencies write about hotels as if they were consumer gadgets. At AEON MEDIA, we understand Average Daily Rates, guest lifetime value, spatial flow, culinary nuance, and the psychology of ultra-high-net-worth travelers."
      }
    },
    isPublished: true,
    lastEdited: "2026-04-20T10:00:00Z"
  },
  portfolio: {
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Selected Conceptual Studies & Narrative Monographs",
    heroHeading: "Considered Words for Visionary Sanctuaries.",
    heroSubtext: "Explore our conceptual portfolio monographs. Each case study represents an exercise in verbal identity, spatial storytelling, and luxury guest resonance.",
    ctaPrimaryText: "Discuss Your Property",
    sections: {
      notice: {
        text: "Notice: The case studies showcased below are conceptual design exercises developed by AEON MEDIA to demonstrate brand voice architecture and narrative range. In adherence to client confidentiality and editorial integrity, we never fabricate client logos or publish proprietary commission details without explicit authorization."
      }
    },
    isPublished: true,
    lastEdited: "2026-04-20T10:00:00Z"
  },
  about: {
    slug: "about",
    title: "About",
    subtitle: "A Focused Hospitality Content Studio",
    heroHeading: "Words as Enduring as the Architecture.",
    heroSubtext: "AEON MEDIA was founded on a singular conviction: that extraordinary hotels deserve writing as refined as their design.",
    ctaPrimaryText: "Work With Us",
    sections: {
      manifesto: {
        heading: "Our Studio Philosophy",
        p1: "In luxury hospitality, words are often treated as an afterthought—entrusted to generic marketing copywriters who lean on tired superlatives like 'breathtaking,' 'unparalleled,' and 'nestled.'",
        p2: "We believe in restraint. The most memorable hospitality narratives are quiet, tactile, and deeply grounded in place. They speak to the guest not as a consumer to be persuaded, but as a discerning traveler capable of appreciating subtle beauty.",
        p3: "We work directly with hotel owners, general managers, creative directors, and hospitality marketing executives to build lasting verbal heritage."
      },
      standards: [
        { title: "No Commoditized Superlatives", description: "We ban overused marketing jargon in favor of sensory, architectural precision." },
        { title: "Grounded in Terroir", description: "Every word reflects the regional ecology, botanical heritage, and cultural history of the property." },
        { title: "Commercial Purpose", description: "Our editorial elegance serves real business metrics: direct bookings, suite rate justification, and guest loyalty." },
        { title: "Total Confidentiality", description: "We treat unpublished developments and high-profile ownership partnerships with uncompromising discretion." }
      ]
    },
    isPublished: true,
    lastEdited: "2026-04-20T10:00:00Z"
  },
  contact: {
    slug: "contact",
    title: "Contact",
    subtitle: "Initiate a Project Discussion",
    heroHeading: "Let's Give Your Property the Voice It Deserves.",
    heroSubtext: "We collaborate with a limited number of exceptional properties each season to ensure uncompromising quality.",
    ctaPrimaryText: "Submit Project Brief",
    sections: {
      directContact: {
        email: "aeonmediaofficial@gmail.com",
        instagram: "@aeonmedia.co",
        responseCommitment: "All qualified inquiries receive a thoughtful response within 48 business hours."
      }
    },
    isPublished: true,
    lastEdited: "2026-04-20T10:00:00Z"
  }
};
