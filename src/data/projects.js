// Real client projects. Keep this list to work that is approved for public
// display — see docs/rebrand for the source design and approval notes.
export const projects = [
  {
    id: "on-the-brew",
    name: "On The Brew",
    category: "Café website",
    serviceLabel: "Café website",
    // Internal case-study route. When set, the Work section links here
    // instead of out to the client's site.
    caseStudyPath: "/work/on-the-brew",
    url: null,
    poster: "/images/projects/on-the-brew/mobile-homepage-600.webp",
    images: [
      {
        src: "/images/projects/on-the-brew/mobile-homepage-600.webp",
        alt: "On The Brew homepage on a phone with branded drinks, the Guatemalan coffee headline and a Find Us button",
        width: 600,
        height: 1301,
      },
      {
        src: "/images/projects/on-the-brew/mobile-hours-directions-600.webp",
        alt: "On The Brew Come Find Us section on a phone with the Level 3 Green South address, opening hours and a Get Directions button",
        width: 600,
        height: 1301,
      },
    ],
    video: { desktop: null, mobile: null },
    summary:
      "A café website built around the next visit: the drinks first, then the hours and the way to the shop inside Stamford Town Center.",
    ask: "Help people looking for coffee near Stamford Town Center understand what the café offers, check its hours, and find the shop inside the mall.",
    whatWeDid:
      "Redesigned the homepage around the café's actual drinks and its Guatemalan coffee story, with Menu, Our Story and Visit Us as the navigation.",
    keyDecision:
      "Make Find Us the one button in the opening, so the hours, the Level 3 Green South address and directions are a tap away from the first screen.",
  },
  {
    id: "moth-to-flame",
    name: "Moth to Flame",
    category: "Band site",
    serviceLabel: "Band and booking site",
    caseStudyPath: "/work/moth-to-flame",
    url: "https://mothtoflameband.com",
    poster: "/images/projects/moth-to-flame/hero.webp",
    images: [
      {
        src: "/images/projects/moth-to-flame/hero.webp",
        alt: "Moth to Flame homepage with band photo and Upcoming Shows and Book Us buttons",
        width: 720,
        height: 1558,
      },
      {
        src: "/images/projects/moth-to-flame/shows.webp",
        alt: "Moth to Flame Upcoming Shows page listing tour dates and venues",
        width: 720,
        height: 1558,
      },
    ],
    video: { desktop: null, mobile: null },
    // Short homepage teaser copy. The fields below (ask/whatWeDid/keyDecision)
    // stay in the data layer for a future dedicated case-study route - the
    // homepage only shows `summary` on mobile.
    summary:
      "A band and booking site built around the photography, with upcoming shows and booking as the two first-screen actions.",
    ask: "A site that presents the band and makes booking straightforward for venues and event organisers.",
    whatWeDid:
      "Designed and built the site around the band photography, with upcoming shows and booking as the two actions in the first screen.",
    keyDecision:
      "A dark ground so the photography carries the page, with the two buttons set side by side rather than stacked in a menu.",
  },
  {
    id: "sweet-stax",
    name: "Sweet Stax",
    category: "Website refinement / Webflow",
    serviceLabel: "Website refinement / Webflow",
    caseStudyPath: "/work/sweet-stax",
    url: "https://sweetstax.webflow.io",
    poster: "/images/projects/sweet-stax/hero.webp",
    images: [
      {
        src: "/images/projects/sweet-stax/hero.webp",
        alt: "Sweet Stax Staxuerse homepage with brand mascots and Shop button",
        width: 720,
        height: 1558,
      },
      {
        src: "/images/projects/sweet-stax/product.webp",
        alt: "Sweet Stax product page showing a fruit gummy candy package",
        width: 720,
        height: 1558,
      },
    ],
    video: { desktop: null, mobile: null },
    summary:
      "SiteLaunch refined an existing Webflow site, correcting layout and usability issues while preserving the brand and the parts that already worked.",
    ask: "Improve an existing website that had design, formatting, and usability issues left from the original build.",
    whatWeDid:
      "Worked directly inside the existing Webflow project to identify issues, correct layout and formatting consistency, and refine the experience without forcing the client into a complete rebuild.",
    keyDecision:
      "Preserve the existing brand and the working parts of the site, and focus the effort on the areas that were creating visual and usability problems.",
  },
];
