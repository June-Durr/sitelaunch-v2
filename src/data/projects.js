// Real client projects. Keep this list to work that is approved for public
// display — see docs/rebrand for the source design and approval notes.
export const projects = [
  {
    id: "moth-to-flame",
    name: "Moth to Flame",
    category: "Band site",
    serviceLabel: "Band and booking site",
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
