// Post-launch service offers. Every string here is approved client-facing
// copy taken from the two PDFs in public/downloads/ - do not add turnaround,
// cancellation, payment, revision or response-time language, and do not
// describe SiteLaunch Care as unlimited edits. The monthly minute cap is
// stated explicitly in `includes` and must stay there.
//
// `summary` / `highlights` / `teaserLabel` / `homepageLabel` are the short
// homepage form of the offer; everything else is the dedicated
// /services/<slug>/ page. Both read from this one record so the two can't
// drift apart.
//
// `homepageLabel` vs `price`: the homepage deliberately shows no numeric
// pricing, so it renders `homepageLabel` ("Monthly website support"). The
// real figure lives in `price` and appears only on the dedicated page, where
// the Offer schema's numbers match what a visitor can actually see. Do not
// render `price`, `priceNote`, or `offerSchema` anywhere on the homepage.

export const SITE_URL = "https://sitelaunchstudios.com";

export const SERVICES = [
  {
    slug: "sitelaunch-care",
    name: "SiteLaunch Care",
    price: "$199/month",

    // Homepage teaser
    homepageLabel: "Monthly website support",
    summary:
      "Monthly checks, small updates, visibility reporting, and a quarterly website review.",
    highlights: [
      "60 minutes of updates",
      "Monthly website check",
      "Quarterly health review",
    ],
    teaserLabel: "Explore SiteLaunch Care",

    // Dedicated page
    metaTitle: "SiteLaunch Care — Website Support at $199/month",
    metaDescription:
      "SiteLaunch Care is $199/month website support: monthly link and form checks, up to 60 minutes of updates, GA4 reporting, and a quarterly health review.",
    headline: "Peace of mind after launch.",
    description:
      "Monthly support that keeps your website checked, current, and supported instead of waiting until something breaks.",
    serviceType: "Website maintenance and support",
    includes: [
      "Monthly link and form check",
      "Basic uptime, SSL, and domain review",
      "Obvious mobile and display issues flagged",
      "Up to 60 minutes per month of text, image, menu, link, or minor layout changes",
      "Monthly GA4 and Google Search Console snapshot once connected",
      "Priority placement ahead of non-retainer small tasks",
      "Short design, UX, and SEO health review every three months",
    ],
    excludesNote:
      "New pages, major redesigns, ecommerce builds, large integrations, and full content production are quoted separately.",
    excludes: [
      "New pages",
      "Major redesigns",
      "Ecommerce builds",
      "Large integrations",
      "Full content production",
    ],
    priceNote: null,
    pdfHref: "/downloads/SiteLaunch-Care-199-Monthly.pdf",
    pdfLabel: "Download the Care plan",
    ctaHeading: "Ask about SiteLaunch Care.",
    ctaBody:
      "Send your website and mention Care. We reply by email with what the monthly support would cover for your site.",
    analyticsLabel: "sitelaunch_care",

    // Schema
    offerSchema: {
      "@type": "Offer",
      url: `${SITE_URL}/services/sitelaunch-care/`,
      priceCurrency: "USD",
      price: "199",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        price: "199",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
    },
  },

  {
    slug: "digital-brand-polish",
    name: "Digital Brand Polish",
    price: "From $750",

    // Homepage teaser
    homepageLabel: "Scoped brand refinement",
    summary:
      "Organize the brand you already have into a consistent system for your website and social content.",
    highlights: [
      "Color and typography",
      "Logo and imagery rules",
      "Social templates and mini guide",
    ],
    teaserLabel: "Explore Digital Brand Polish",

    // Dedicated page
    metaTitle: "Digital Brand Polish — Brand System from $750",
    metaDescription:
      "Digital Brand Polish, from $750: color and typography, logo-use rules, imagery treatment, social templates, and a mini brand guide for your existing brand.",
    headline:
      "Make your existing brand feel consistent, intentional, and usable online.",
    description:
      "For businesses that already have a logo or recognizable look but need a clearer system across their website and social content.",
    serviceType: "Brand system design",
    includes: [
      "Color and typography system",
      "Logo-use rules based on existing supplied assets",
      "Imagery treatment",
      "A small set of reusable social templates",
      "Mini brand guide",
      "Digital application direction",
    ],
    excludesNote:
      "This is not full brand strategy or a new identity. Research, positioning, naming, verbal identity, new logo systems, broad rollout, and unlimited revisions require separate scope.",
    excludes: [
      "Research",
      "Positioning",
      "Naming",
      "Verbal identity",
      "New logo systems",
      "Broad rollout",
      "Unlimited revisions",
    ],
    priceNote: "Pilot projects are scoped from $750–$1,500.",
    pdfHref: "/downloads/SiteLaunch-Digital-Brand-Polish.pdf",
    pdfLabel: "Download the Brand Polish offer",
    ctaHeading: "Ask about Digital Brand Polish.",
    ctaBody:
      "Send your website and mention Brand Polish. We reply by email with what a brand system would cover for the assets you already have.",
    analyticsLabel: "digital_brand_polish",

    // Schema. Only a minimum price is asserted - "From $750" is the approved
    // claim; the $750-$1,500 range applies to pilot projects specifically and
    // is stated in visible copy rather than as a maxPrice on the whole offer.
    offerSchema: {
      "@type": "Offer",
      url: `${SITE_URL}/services/digital-brand-polish/`,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: "750",
      },
    },
  },
];

export const getServiceBySlug = (slug) =>
  SERVICES.find((service) => service.slug === slug) || null;

export const getOtherService = (slug) =>
  SERVICES.find((service) => service.slug !== slug) || null;

export const servicePath = (slug) => `/services/${slug}/`;
