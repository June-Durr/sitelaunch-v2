// Approved copy — see docs/insights/insight-001/ for the source handoff and
// content object this was adapted from. Wording is preserved verbatim; only
// the data shape was adapted (e.g. "Reading the answers" splits its closing
// two lines into `list` so InsightProse can render them as a real <ul>,
// per the handoff's accessibility requirements).
export const insight001 = {
  slug: "seven-second-contractor-website-test",
  number: "001",
  category: "Contractors",
  title: "Can a homeowner understand your website in seven seconds?",
  deck: "It is the first thing I do in a website review, and it takes less time than reading this sentence. Open the site on a phone and answer three questions.",
  keywords:
    "contractor website review, mobile website usability, contractor website design, service area website",
  readTime: "4 min read",
  published: "August 2026",
  featured: true,
  coverImage: "/images/insights/insight-001/cover.jpeg",
  coverAlt:
    "Outlined phone with a purple button, hand entering from the lower right",
  homepageExcerpt: "Three questions to answer on your own first mobile screen.",
  sections: [
    {
      type: "prose",
      id: "opening",
      paragraphs: [
        "A contractor website does not have to look bad to lose the call. It can look polished and still be unclear on the first screen.",
        "You already know how your website works, which makes you the worst possible person to judge it. A homeowner arrives with no context, no patience, and a phone in one hand.",
        "So do not judge it. Test it. Look at the first screen without scrolling, then look away and answer from memory. Whatever you cannot recall is what a stranger never received.",
      ],
    },
    {
      type: "diagnostic",
      id: "the-7-second-check",
      heading: "The 7-second check",
      eyebrow: "Phone. First screen. No scrolling.",
      items: [
        {
          number: "01",
          question: "What do you do?",
          support: "A service stated in words, not implied by a photograph.",
        },
        {
          number: "02",
          question: "Where do you work?",
          support: "The service area, visible without scrolling.",
        },
        {
          number: "03",
          question: "What should I do next?",
          support: "One obvious action: call, or request an estimate.",
        },
      ],
    },
    {
      type: "prose",
      id: "question-01",
      heading: "01 What do you do?",
      paragraphs: [
        "A homeowner should not have to deduce the trade from a photograph of a truck and a line about quality workmanship. The service belongs in the headline, in the words a customer would use out loud.",
        "Pass: the service is legible in the headline itself.",
      ],
    },
    {
      type: "prose",
      id: "question-02",
      heading: "02 Where do you work?",
      paragraphs: [
        "Service area is a qualifying question and it gets asked early. If a visitor cannot confirm that the business covers their street, they may return to the search results and try the next name on the list.",
        "Pass: the area is visible without scrolling.",
      ],
    },
    {
      type: "prose",
      id: "question-03",
      heading: "03 What should I do next?",
      paragraphs: [
        "There should be one action, and it should be calling or requesting an estimate. When that action competes with a menu, a social row and three secondary links, nothing reads as primary and the visitor is left to choose for themselves.",
        "Pass: the next step is the loudest thing on the screen.",
      ],
    },
    {
      type: "prose",
      id: "reading-the-answers",
      heading: "Reading the answers",
      paragraphs: [
        "There is no score to calculate. Either a visitor can answer, or they cannot.",
      ],
      // Rendered as a real <ul>, each row led by a decorative pass/fail
      // marker square (aria-hidden - the meaning is carried by the text).
      outcomes: [
        { pass: true, text: "All three obvious. The first screen is doing its job." },
        { pass: false, text: "One or more unclear. That is where a website review begins." },
      ],
    },
    {
      type: "pullStatement",
      text: "Paid traffic cannot fix a confusing website.",
    },
    {
      type: "prose",
      id: "after-pull",
      paragraphs: [
        "More clicks do not change the first screen. Every extra step between arriving and calling is another opportunity to leave, and a larger budget simply buys more of those opportunities. Fix the answers before raising the spend.",
      ],
    },
    {
      type: "fixOrder",
      heading: "Fix it in this order",
      items: [
        {
          number: "01",
          label: "Clear service",
          support: "In the words a homeowner would use.",
        },
        {
          number: "02",
          label: "Clear location",
          support: "Confirm the business covers their area.",
        },
        {
          number: "03",
          label: "Clear action",
          support: "The single loudest thing on the screen.",
        },
      ],
    },
  ],
  cta: {
    eyebrow: "Failed one of the three?",
    heading: "Get a Free Website Review",
    body: "Not sure what a visitor sees first? Send me the site. I will show you three things I would fix first.",
    label: "Get a Free Website Review",
    href: "/#review",
  },
};
