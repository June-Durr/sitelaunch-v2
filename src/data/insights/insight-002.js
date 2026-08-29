// Companion long-form piece to the "Claims don't convert. Proof does." social
// carousel. Slide 01 (the title card) is reused as coverImage rather than
// repeated inside the gallery, and slide 06 (a static CTA card) is dropped
// in favor of the real, clickable InsightCTA the page already ends with —
// showing a flat "Get a Free Website Review" image right next to a working
// one would read as a duplicated, broken CTA.
export const insight002 = {
  slug: "claims-dont-convert-proof-does",
  number: "002",
  category: "Website Trust",
  title: "Claims don't convert. Proof does.",
  deck: "“Trusted.” “High quality.” “Experienced.” Anyone in your trade can write those words. The site that wins the call is the one that backs them up.",
  keywords:
    "website trust signals, social proof website, contractor website reviews, proof vs claims website copy",
  readTime: "3 min read",
  published: "August 2026",
  featured: false,
  coverImage: "/images/insights/insight-002/01-claims-dont-convert.png",
  coverAlt:
    "“Claims don't convert. Proof does.” A pixel-art dinosaur facing a large, detailed dinosaur stepping through a glowing purple portal.",
  homepageExcerpt:
    "Four claims every competitor already makes, and what actually replaces them.",
  sections: [
    {
      type: "prose",
      id: "opening",
      paragraphs: [
        "A website can look expensive and still not be trusted. Trust is not a design choice, it is a claim, and most sites make the same four: trusted, high quality, experienced, customer first.",
        "None of those sentences survive a follow-up question. Trusted, by whom? High quality, show the work. Experienced, at what, since when? Customer first, in whose words?",
        "Anyone in your trade could write the same four lines. The site that wins the call is not the one with the boldest claim, it is the one that backs it up.",
      ],
    },
    {
      type: "gallery",
      id: "carousel",
      images: [
        {
          src: "/images/insights/insight-002/02-the-problem.png",
          alt: "The problem: 'These sound impressive. They prove nothing.' Four claims struck through in purple, each with the question it doesn't answer: Trusted (by whom), High quality (show the work), Experienced (at what, since when), Customer first (in whose words). Below: anyone in your trade can write the claim, nobody has to back it up.",
        },
        {
          src: "/images/insights/insight-002/03-real-site-proof-audit.png",
          alt: "Real site, anonymized: a screenshot of a generic software homepage with client logos including eBay, Expedia, and DocuSign, marked up with four findings — anyone could write this (a claim with nothing behind it), no work shown (no photographs of finished jobs), unnamed and undated (praise with no customer and no job), and no next step (nothing obvious to do or verify).",
        },
        {
          src: "/images/insights/insight-002/04-what-proof-looks-like.png",
          alt: "Seven things that turn claims into proof: real work (photos of finished jobs, labelled by service and suburb), verified reviews (full text, the customer's name, the job they booked), specific services (in the words your clients use), service area (the suburbs you actually cover, listed by name), named process (what happens after they enquire, step by step), real people (names, licences, who turns up on the day), and a clear next step (one obvious action, visible without scrolling).",
        },
        {
          src: "/images/insights/insight-002/05-claim-versus-proof.png",
          alt: "Claim versus proof, three rewrites: 'We do quality work' becomes project photography with what was actually done underneath it. 'Customers trust us' becomes a verified review from a real customer, shown in full. 'We make it easy' becomes the visitor can see what happens next, straight away.",
        },
      ],
    },
    {
      type: "pullStatement",
      text: "The strongest thing on your website is usually the thing your competitor cannot copy.",
    },
    {
      type: "prose",
      id: "after-pull",
      paragraphs: [
        "A competitor can rewrite your homepage copy in an afternoon. They cannot rewrite your finished jobs, your customers' names, or the suburbs you have actually worked in. That is why proof holds up and claims don't — proof is specific to you.",
        "Most businesses already have the raw material sitting in a phone's camera roll and a stack of old text threads. It rarely needs to be created. It needs to be shown.",
      ],
    },
    {
      type: "fixOrder",
      heading: "Where to start",
      items: [
        {
          number: "01",
          label: "Real work",
          support: "Photos of finished jobs, labelled by service and suburb.",
        },
        {
          number: "02",
          label: "Verified reviews",
          support: "Full text, the customer's name, the job they booked.",
        },
        {
          number: "03",
          label: "One clear next step",
          support: "A single obvious action, visible without scrolling.",
        },
      ],
    },
  ],
  cta: {
    eyebrow: "Making claims instead of proof?",
    heading: "Get a Free Website Review",
    body: "Send me the site. I will show you the first three places I would add clarity, trust, or proof.",
    label: "Get a Free Website Review",
    href: "/#review",
  },
};
