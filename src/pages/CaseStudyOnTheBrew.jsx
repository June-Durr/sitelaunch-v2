import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import Kicker from "../components/common/Kicker";
import Reveal from "../components/common/Reveal";
import InsightCTA from "../components/insights/InsightCTA";
import analytics from "../services/analytics";

const SITE_URL = "https://sitelaunchstudios.com";
const ON_THE_BREW_PATH = "/work/on-the-brew";
const CANONICAL = `${SITE_URL}${ON_THE_BREW_PATH}/`;
const IMG = "/images/projects/on-the-brew";

// Every screenshot ships at two widths. The larger file is the original
// capture resolution, so "Open full size" always shows the whole screen.
const SHOTS = {
  desktop: {
    small: `${IMG}/desktop-homepage-1400.webp`,
    large: `${IMG}/desktop-homepage-2400.webp`,
    smallWidth: 1400,
    largeWidth: 2400,
    width: 2400,
    height: 1543,
    alt: "On The Brew homepage at desktop width: four branded iced and hot drinks beside the headline Guatemalan Coffee, Roasted With Heart, a Find Us button, and Menu, Our Story and Visit Us in the header.",
  },
  previous: {
    small: `${IMG}/previous-homepage-425.webp`,
    large: `${IMG}/previous-homepage-850.webp`,
    smallWidth: 425,
    largeWidth: 850,
    width: 850,
    height: 3108,
    alt: "The previous On The Brew homepage at phone width: a lake and mountain landscape behind the company name, a photo of staff at the counter, a Brewmobile catering offer with a Request a Quote button, an email signup and payment logos.",
  },
  mobileHome: {
    small: `${IMG}/mobile-homepage-600.webp`,
    large: `${IMG}/mobile-homepage-1179.webp`,
    smallWidth: 600,
    largeWidth: 1179,
    width: 1179,
    height: 2556,
    alt: "On The Brew homepage on a phone: branded drinks fill the top of the screen, followed by the headline, a line about family farms and opening until 8 PM most days, and a Find Us button.",
  },
  mobileVisit: {
    small: `${IMG}/mobile-hours-directions-600.webp`,
    large: `${IMG}/mobile-hours-directions-1179.webp`,
    smallWidth: 600,
    largeWidth: 1179,
    width: 1179,
    height: 2556,
    alt: "On The Brew Come Find Us section on a phone: the address 100 Greyrock Place, Level 3 Green South, Stamford, CT, opening hours for each day of the week, a Get Directions button and a map of the mall.",
  },
};

const OBJECTIVES = [
  "Understand what the café offers",
  "Check the opening hours",
  "Find the shop inside the mall",
];

const DECISIONS = [
  {
    title: "Drinks and origin lead the opening",
    body: "The first screen pairs the café's actual drinks with the headline Guatemalan Coffee, Roasted With Heart and a line about small-batch beans from Cecilia and Jonathan's family farms. The previous homepage opened with a landscape photo and the company name. The redesign moves the drinks and the family story to the front.",
  },
  {
    title: "Navigation names the reasons to visit",
    body: "Menu, Our Story and Visit Us are the header links on desktop, so the drinks, the origin story and the visiting details are each one click from anywhere on the page.",
  },
  {
    title: "Find Us is the one button up front",
    body: "The only button in the opening is Find Us. It takes the visitor straight to the visiting information: the address, the opening hours and directions.",
  },
];

const COMPARISON = [
  {
    shot: SHOTS.previous,
    label: "Previous homepage, July 2026",
    linkLabel: "the previous homepage",
    tone: "text-ink/65",
  },
  {
    shot: SHOTS.mobileHome,
    label: "Redesigned homepage",
    linkLabel: "the redesigned homepage",
    tone: "text-accent-600",
  },
];

const VISIT = {
  shot: SHOTS.mobileVisit,
  title: "Hours, floor and directions",
  body: "Come Find Us gives the street address with Level 3 Green South, so a visitor knows which floor of the mall to head for. The week's hours follow, then a Get Directions button and a map.",
};

const CTA = {
  eyebrow: "Free Website Review",
  heading: "Get a Free Website Review",
  body: "Not sure what a visitor sees first? Send me the site. I will show you three things I would fix first.",
  label: "Get a Free Website Review",
  href: "/#review",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#case-studies` },
    { "@type": "ListItem", position: 3, name: "On The Brew", item: CANONICAL },
  ],
};

/** A screenshot at its natural ratio. Never cropped. */
const Shot = ({ shot, sizes, eager = false, className = "" }) => (
  <img
    src={shot.small}
    srcSet={`${shot.small} ${shot.smallWidth}w, ${shot.large} ${shot.largeWidth}w`}
    sizes={sizes}
    alt={shot.alt}
    width={shot.width}
    height={shot.height}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    {...(eager ? { fetchpriority: "high" } : {})}
    className={`block h-auto w-full ${className}`}
  />
);

const FullSizeLink = ({ shot, label }) => (
  <a
    href={shot.large}
    target="_blank"
    rel="noopener noreferrer"
    className="link type-small mt-3 inline-flex min-h-[44px] items-center"
  >
    {`Open ${label} full size`}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const SectionHead = ({ number, title, id }) => (
  <Reveal>
    <Kicker>{number}</Kicker>
    <h2 id={id} className="type-heading mt-3 text-ink">
      {title}
    </h2>
  </Reveal>
);

const CaseStudyOnTheBrew = () => {
  useEffect(() => {
    analytics.trackPageView(
      `${ON_THE_BREW_PATH}/`,
      "On The Brew Case Study - SiteLaunch Studios"
    );
  }, []);

  return (
    <article>
      <SEOHead
        title="On The Brew Case Study"
        description="A café website for On The Brew at Stamford Town Center, designed so a visitor from Google can see the drinks, check the hours and find the shop inside the mall."
        keywords="cafe website design, coffee shop website, On The Brew, Stamford Town Center, website case study"
        url={CANONICAL}
        canonicalUrl={CANONICAL}
        image={`${SITE_URL}${SHOTS.desktop.small}`}
        type="article"
        structuredData={structuredData}
      />

      {/* 1. Opening */}
      <header className="bg-ivory pt-8 sm:pt-10 lg:pt-20">
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <Link
              to="/#case-studies"
              className="type-label inline-flex min-h-[44px] items-center text-ink/65 underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline"
            >
              <span aria-hidden="true" className="mr-2">&larr;</span>
              All work
            </Link>
          </nav>

          <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <Kicker>Case study / Café website</Kicker>
              <h1 className="type-title mt-3 text-ink">On The Brew</h1>
              <p className="type-lead mt-4 max-w-xl text-ink/80 sm:mt-5">
                A café website designed around the next visit.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-y-4 border-t border-ink/20 pt-4 sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:mt-0 lg:grid-cols-1">
              <div>
                <dt className="type-label text-ink/65">Client</dt>
                <dd className="type-body mt-1 text-ink">On The Brew Coffee Company</dd>
              </div>
              <div>
                <dt className="type-label text-ink/65">Location</dt>
                <dd className="type-body mt-1 text-ink">Stamford Town Center, CT</dd>
              </div>
            </dl>
          </div>
        </div>

        <figure className="mt-10 bg-paper py-6 sm:mt-12 sm:py-10 lg:mt-16 lg:py-16">
          <div className="container-page">
            <Shot
              shot={SHOTS.desktop}
              sizes="(min-width: 1152px) 1088px, calc(100vw - 32px)"
              eager
              className="shadow-media"
            />
            <figcaption className="type-small mt-4 text-ink/65">
              The redesigned homepage at desktop width.
            </figcaption>
            <FullSizeLink shot={SHOTS.desktop} label="the desktop homepage" />
          </div>
        </figure>
      </header>

      {/* 2. The brief */}
      <section aria-labelledby="brief-heading" className="section-y bg-ivory">
        <div className="container-page lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHead number="01" title="The brief" id="brief-heading" />
          </div>
          <Reveal className="mt-6 sm:mt-8 lg:col-span-8 lg:mt-0">
            <p className="type-prose max-w-2xl text-ink/80">
              On The Brew wanted to reach people looking for coffee near
              Stamford Town Center. The website's job was to help someone
              arriving from Google quickly understand what the café offers,
              check its hours, and find the shop inside the mall.
            </p>
            <p className="type-label mt-8 text-ink/65">The objective</p>
            <ol className="mt-3 max-w-2xl divide-y divide-ink/10 border-y border-ink/20">
              {OBJECTIVES.map((item, i) => (
                <li key={item} className="flex gap-4 py-4 sm:py-5">
                  <span className="type-card text-accent-600" aria-hidden="true">
                    {`0${i + 1}`}
                  </span>
                  <span className="type-card text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 3. The design decisions */}
      <section
        aria-labelledby="decisions-heading"
        className="section-y border-t border-ink/10 bg-ivory"
      >
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <SectionHead number="02" title="The design decisions" id="decisions-heading" />
            </div>
            <Reveal className="mt-6 sm:mt-8 lg:col-span-8 lg:mt-0">
              <p className="type-prose max-w-2xl text-ink/80">
                The redesign changed what the homepage puts first: the drinks,
                where the coffee comes from, and how to get to the shop.
              </p>
            </Reveal>
          </div>

          {/* Same displayed width, natural heights, top aligned. The two captures
              cover different lengths of page, which the note below says. */}
          <div className="mt-10 grid grid-cols-1 gap-12 sm:mt-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 sm:gap-6">
              {COMPARISON.map(({ shot, label, linkLabel, tone }) => (
                <figure key={shot.small}>
                  <figcaption className={`type-label ${tone}`}>{label}</figcaption>
                  <div className="mt-3 flex justify-center bg-paper p-4 sm:p-6">
                    <Shot
                      shot={shot}
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 320px"
                      className="max-w-xs shadow-media"
                    />
                  </div>
                  <FullSizeLink shot={shot} label={linkLabel} />
                </figure>
              ))}
              </div>
              <p className="type-small mt-6 max-w-2xl text-ink/65">
                Both captures are shown at the same width. The previous capture
                runs the full page; the redesigned capture shows the first
                screen only.
              </p>
            </div>

            <div className="lg:col-span-4">
              <ol className="divide-y divide-ink/10 border-y border-ink/20">
                {DECISIONS.map((decision, i) => (
                  <li key={decision.title} className="grid grid-cols-[auto_1fr] gap-x-4 py-5 sm:gap-x-6 sm:py-6">
                    <span className="type-card text-accent-600" aria-hidden="true">
                      {`0${i + 1}`}
                    </span>
                    <div>
                      <h3 className="type-card text-ink">{decision.title}</h3>
                      <p className="type-body mt-2 max-w-2xl text-ink/80">
                        {decision.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Finding the café on mobile */}
      <section
        aria-labelledby="mobile-heading"
        className="section-y border-t border-ink/10 bg-ivory"
      >
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <SectionHead number="03" title="Finding the café on mobile" id="mobile-heading" />
            </div>
            <Reveal className="mt-6 sm:mt-8 lg:col-span-8 lg:mt-0">
              <p className="type-prose max-w-2xl text-ink/80">
                On a phone, the same order holds. Further down the homepage, a
                menu preview names drinks such as the Guatemalan single-origin
                drip coffee and the Guatemalan cacao, with a link to the full
                menu. Then come the details a visit depends on: the hours, the
                floor, and a way to get there.
              </p>
            </Reveal>
          </div>

          <figure className="mt-8 sm:mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="flex justify-center bg-paper p-4 sm:p-10 lg:col-span-7">
              <Shot
                shot={VISIT.shot}
                sizes="(min-width: 640px) 384px, calc(100vw - 64px)"
                className="max-w-sm shadow-media"
              />
            </div>
            <figcaption className="mt-5 lg:col-span-5 lg:mt-0">
              <h3 className="type-card text-ink">{VISIT.title}</h3>
              <p className="type-body mt-2 max-w-md text-ink/80">{VISIT.body}</p>
              <FullSizeLink shot={VISIT.shot} label="this screen" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 5. The outcome */}
      <section
        aria-labelledby="outcome-heading"
        className="section-y border-t border-ink/10 bg-ivory"
      >
        <div className="container-page lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHead number="04" title="The outcome" id="outcome-heading" />
          </div>
          <Reveal className="mt-6 sm:mt-8 lg:col-span-8 lg:mt-0">
            <p className="type-prose max-w-2xl text-ink/80">
              A visitor can explore the drinks, check opening hours, and find
              the café's location inside Stamford Town Center from their phone.
              The menu, Level 3 Green South address, and directions button
              support the next step: finding the shop and stopping in for
              coffee.
            </p>
          </Reveal>
        </div>
      </section>

      <InsightCTA cta={CTA} location="case_study_on_the_brew" />
    </article>
  );
};

export default CaseStudyOnTheBrew;
