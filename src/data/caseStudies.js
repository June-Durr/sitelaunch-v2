// Copy for the dedicated case-study pages rendered by pages/CaseStudyPage.jsx.
// On The Brew has its own page component; these two share one layout.
//
// Everything here restates the approved project copy in data/projects.js, what
// is visible in the project screenshots, or a verbatim Google review. Do not
// add results, numbers or quotes that are not on record.
import { projects } from "./projects.js";
import { carlosReview, tysonReview } from "./reviews.js";

const byId = (id) => projects.find((project) => project.id === id);

const CTA = {
  eyebrow: "Free Website Review",
  heading: "Get a Free Website Review",
  body: "Not sure what a visitor sees first? Send me the site. I will show you three things I would fix first.",
  label: "Get a Free Website Review",
  href: "/#review",
};

export const caseStudies = [
  {
    id: "moth-to-flame",
    path: "/work/moth-to-flame",
    name: "Moth to Flame",
    kicker: "Case study / Band and booking site",
    lead: "A band site built around the photography, with shows and booking up front.",
    seoTitle: "Moth to Flame Case Study",
    seoDescription:
      "A band and booking site for Moth to Flame, designed so a venue or event organiser sees the band, the upcoming shows and a way to book from the first screen.",
    keywords:
      "band website design, musician website, booking website, Moth to Flame, website case study",
    facts: [
      { label: "Client", value: "Moth to Flame" },
      { label: "Based", value: "Tri-state area" },
    ],
    liveUrl: byId("moth-to-flame").url,
    liveLabel: "See mothtoflameband.com",
    // First screen of the live homepage at desktop width, in two sizes.
    desktop: {
      small: "/images/projects/moth-to-flame/desktop-homepage-1400.webp",
      large: "/images/projects/moth-to-flame/desktop-homepage-2400.webp",
      smallWidth: 1400,
      largeWidth: 2400,
      width: 2400,
      height: 1500,
      alt: "Moth to Flame homepage at desktop width: the four band members against a dark, fiery backdrop, the band name set at the right above the line Genre-Defying, Tri-State, Since 2009, and Upcoming Shows and Book Us buttons side by side.",
      caption: "The homepage at desktop width.",
    },
    shots: [
      {
        src: "/images/projects/moth-to-flame/hero.webp",
        width: 720,
        height: 1558,
        alt: "Moth to Flame homepage on a phone: the four band members photographed against a dark, fiery backdrop, the band name set over the photo, and Upcoming Shows and Book Us buttons side by side beneath it.",
        caption: "The opening screen",
      },
      {
        src: "/images/projects/moth-to-flame/shows.webp",
        width: 720,
        height: 1558,
        alt: "Moth to Flame Upcoming Shows section on a phone: each show listed with its date, venue and city, an All Dates button, and Facebook and Instagram links under the line Follow us where the fire spreads.",
        caption: "Upcoming Shows",
      },
    ],
    brief: {
      body: "Moth to Flame needed a site that presents the band and makes booking straightforward for venues and event organisers.",
      objectives: [
        "Present the band",
        "Show where they are playing next",
        "Make booking straightforward",
      ],
    },
    decisions: {
      title: "The design decisions",
      intro:
        "The site was designed and built around the band photography, with two actions in the first screen.",
      items: [
        {
          title: "The photography carries the page",
          body: "The site sits on a dark ground so the band photo does the work in the opening. The band name is set directly over the photo.",
        },
        {
          title: "Two actions, side by side",
          body: "Upcoming Shows and Book Us sit next to each other in the first screen. Neither one is stacked inside a menu.",
        },
        {
          title: "The band in one sentence",
          body: "Directly below the opening, The Band section says what they play and where: a blend of rock, latin, funk, progressive styles and fusion, performed throughout the tri-state area since 2009.",
        },
      ],
    },
    screens: {
      title: "Shows and booking on a phone",
      body: "On a phone the order stays the same: the band, then the two actions. Upcoming Shows lists each date with its venue and city, with an All Dates button for the full list. Below it are the links to follow the band on Facebook and Instagram.",
    },
    outcome:
      "A venue or event organiser landing on the site sees the band, where they are playing next and a way to book them, all from the first screen.",
    review: { ...tysonReview },
    cta: CTA,
    ctaLocation: "case_study_moth_to_flame",
  },
  {
    id: "sweet-stax",
    path: "/work/sweet-stax",
    name: "Sweet Stax",
    kicker: "Case study / Website refinement",
    lead: "An existing Webflow site refined, not rebuilt.",
    seoTitle: "Sweet Stax Case Study",
    seoDescription:
      "A website refinement for Sweet Stax: layout, formatting and usability issues corrected inside the existing Webflow project, with the brand and the working parts of the site left in place.",
    keywords:
      "Webflow website refinement, website fixes, Webflow help, Sweet Stax, website case study",
    facts: [
      { label: "Client", value: "Sweet Stax" },
      { label: "Platform", value: "Webflow" },
    ],
    liveUrl: byId("sweet-stax").url,
    liveLabel: "See sweetstax.webflow.io",
    shots: [
      {
        src: "/images/projects/sweet-stax/hero.webp",
        width: 720,
        height: 1558,
        alt: "Sweet Stax homepage on a phone: the Sweet Stax logo, a welcome headline over a blue paint splash on a yellow and orange background, and a Shop button between two cartoon candy mascots.",
        caption: "The homepage",
      },
      {
        src: "/images/projects/sweet-stax/product.webp",
        width: 720,
        height: 1558,
        alt: "Sweet Stax product section on a phone: a Buy Here button, a short brand description, a resealable bag of Sweet Stax fruit gummy candy, and a Unique Texture feature card.",
        caption: "The product section",
      },
    ],
    brief: {
      body: "Sweet Stax had a working Webflow site with design, formatting and usability issues left from the original build. The job was to improve the site the client already had.",
      objectives: [
        "Find the design and formatting issues",
        "Correct the layout and make the formatting consistent",
        "Keep the brand and the parts that already worked",
      ],
    },
    decisions: {
      title: "The approach",
      intro:
        "The work happened inside the existing Webflow project. Nothing was moved to a new platform and nothing was rebuilt from scratch.",
      items: [
        {
          title: "Work inside the existing project",
          body: "SiteLaunch worked directly in the client's Webflow project to identify the issues and correct them where they lived, so the client was not forced into a complete rebuild.",
        },
        {
          title: "Keep the brand",
          body: "The mascots, the bright palette and the playful voice were already working. They stayed exactly as the client had them.",
        },
        {
          title: "Fix what was getting in the way",
          body: "The effort went to the areas creating visual and usability problems: layout, and formatting that was not consistent from one section to the next.",
        },
      ],
    },
    screens: {
      title: "The site on a phone",
      body: "The homepage opens with the brand headline and a Shop button set between two of the mascots. Further down, the product section pairs a Buy Here button and a short brand description with the fruit gummy candy bag.",
    },
    outcome:
      "The client kept the site and the brand they already had, with the layout and formatting issues corrected inside the same Webflow project.",
    review: { ...carlosReview },
    cta: CTA,
    ctaLocation: "case_study_sweet_stax",
  },
];

export const caseStudyById = (id) =>
  caseStudies.find((study) => study.id === id);
