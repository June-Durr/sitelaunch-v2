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
  published: "August 2026",
  publishedDate: "2026-08-12",
  modifiedDate: "2026-08-12",
  featured: true,
  coverImage: "/images/insights/insight-001/cover.jpeg",
  // The cover's real pixel size. The homepage browser and the article hero
  // both used to hard-code 1344x1800 for every article, which made the two
  // squarer covers lay out at the wrong aspect and moved the card height.
  coverWidth: 1344,
  coverHeight: 1800,
  coverAlt:
    "Outlined phone with a purple button, hand entering from the lower right",
  homepageExcerpt: "Three questions to answer on your own first mobile screen.",
  // Previously hard-coded in InsightArticle.jsx, which meant every article
  // inherited this article's title and keywords. Moved here unchanged so 001
  // keeps exactly the metadata it already had.
  seoTitle:
    "Can a Homeowner Understand Your Contractor Website in Seven Seconds?",
  keywords:
    "contractor website review, mobile website usability, contractor website design, service area website",
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
    {
      type: "faq",
      id: "faq",
      heading: "Common questions",
      items: [
        {
          question: "What should a contractor website show on the first mobile screen?",
          answer:
            "A contractor website should answer three things on the first mobile screen, with no scrolling: the service, written in the words a homeowner would use rather than implied by a photograph; the area the business covers; and one obvious next step, which is usually calling or requesting an estimate. If a visitor cannot recall all three after looking away, the first screen has not done its job.",
        },
        {
          question: "How can I test whether my service and service area are clear?",
          answer:
            "Open the site on a phone, look at the first screen without scrolling, then look away and answer from memory: what does this business do, and where does it work? Whatever you cannot recall is what a stranger never received. Answering from memory matters because you already know how your own website works, which makes you the worst person to judge it by reading it.",
        },
        {
          question: "Should calling or requesting an estimate be the main action?",
          answer:
            "Yes. One action should be clearly primary on a contractor website, and calling or requesting an estimate is the one that leads to work. The usual problem is not that the action is missing, it is that it competes with a menu, a social row and several secondary links, so nothing reads as the main thing to do. The next step should be the loudest element on the screen.",
        },
        {
          question: "Can more advertising compensate for a confusing website?",
          answer:
            "No. More clicks do not change what the first screen says. Every extra step between arriving and calling is another chance for a visitor to leave, and a larger advertising budget buys more of those chances rather than fewer. Making the service, the area and the next step clear comes before raising the spend.",
        },
        {
          question: "What should I fix first when the first screen fails the test?",
          answer:
            "Fix the service first, in the words a homeowner would use. Then the location, so a visitor can confirm the business covers their street. Then the action, made the single loudest thing on the screen. Each one answers a question a visitor asks before the next one matters, so fixing them out of order leaves the earlier question unanswered.",
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
