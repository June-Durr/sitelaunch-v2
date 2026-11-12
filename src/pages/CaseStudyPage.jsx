import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import Kicker from "../components/common/Kicker";
import Reveal from "../components/common/Reveal";
import InsightCTA from "../components/insights/InsightCTA";
import analytics from "../services/analytics";

const SITE_URL = "https://sitelaunchstudios.com";

/** A phone screenshot at its natural ratio. Never cropped. */
const Shot = ({ shot, eager = false }) => (
  <img
    src={shot.src}
    alt={shot.alt}
    width={shot.width}
    height={shot.height}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    {...(eager ? { fetchpriority: "high" } : {})}
    className="block h-auto w-full max-w-xs shadow-media"
  />
);

const SectionHead = ({ number, title, id }) => (
  <Reveal>
    <Kicker>{number}</Kicker>
    <h2 id={id} className="type-heading mt-3 text-ink">
      {title}
    </h2>
  </Reveal>
);

/**
 * Shared layout for the data-driven case studies in data/caseStudies.js.
 * Follows the section order and type scale of CaseStudyOnTheBrew.
 */
const CaseStudyPage = ({ study }) => {
  const canonical = `${SITE_URL}${study.path}/`;
  const [openingShot, secondShot] = study.shots;
  // With a desktop capture, it opens the page and both phone screens move
  // down to section 03. Without one, the first phone screen opens the page.
  const phoneShots = study.desktop ? study.shots : [secondShot];
  const shareImage = study.desktop ? study.desktop.small : openingShot.src;

  useEffect(() => {
    analytics.trackPageView(
      `${study.path}/`,
      `${study.name} Case Study - SiteLaunch Studios`
    );
  }, [study.path, study.name]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#case-studies` },
      { "@type": "ListItem", position: 3, name: study.name, item: canonical },
    ],
  };

  const reviewer = study.review.attribution
    ? `${study.review.author}, ${study.review.attribution}`
    : study.review.author;

  return (
    <article>
      <SEOHead
        title={study.seoTitle}
        description={study.seoDescription}
        keywords={study.keywords}
        url={canonical}
        canonicalUrl={canonical}
        image={`${SITE_URL}${shareImage}`}
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
              <Kicker>{study.kicker}</Kicker>
              <h1 className="type-title mt-3 text-ink">{study.name}</h1>
              <p className="type-lead mt-4 max-w-xl text-ink/80 sm:mt-5">
                {study.lead}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-y-4 border-t border-ink/20 pt-4 sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:mt-0 lg:grid-cols-1">
              {study.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="type-label text-ink/65">{fact.label}</dt>
                  <dd className="type-body mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <figure className="mt-10 bg-paper py-6 sm:mt-12 sm:py-10 lg:mt-16 lg:py-16">
          <div className="container-page">
            {study.desktop ? (
              <>
                <img
                  src={study.desktop.small}
                  srcSet={`${study.desktop.small} ${study.desktop.smallWidth}w, ${study.desktop.large} ${study.desktop.largeWidth}w`}
                  sizes="(min-width: 1152px) 1088px, calc(100vw - 32px)"
                  alt={study.desktop.alt}
                  width={study.desktop.width}
                  height={study.desktop.height}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="block h-auto w-full shadow-media"
                />
                <figcaption className="type-small mt-4 text-ink/65">
                  {study.desktop.caption}
                </figcaption>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <Shot shot={openingShot} eager />
                </div>
                <figcaption className="type-small mt-4 text-center text-ink/65">
                  {`${openingShot.caption}, at phone width.`}
                </figcaption>
              </>
            )}
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
            <p className="type-prose max-w-2xl text-ink/80">{study.brief.body}</p>
            <p className="type-label mt-8 text-ink/65">The objective</p>
            <ol className="mt-3 max-w-2xl divide-y divide-ink/10 border-y border-ink/20">
              {study.brief.objectives.map((item, i) => (
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

      {/* 3. The decisions */}
      <section
        aria-labelledby="decisions-heading"
        className="section-y border-t border-ink/10 bg-ivory"
      >
        <div className="container-page lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHead number="02" title={study.decisions.title} id="decisions-heading" />
          </div>
          <Reveal className="mt-6 sm:mt-8 lg:col-span-8 lg:mt-0">
            <p className="type-prose max-w-2xl text-ink/80">
              {study.decisions.intro}
            </p>
            <ol className="mt-8 max-w-2xl divide-y divide-ink/10 border-y border-ink/20">
              {study.decisions.items.map((decision, i) => (
                <li
                  key={decision.title}
                  className="grid grid-cols-[auto_1fr] gap-x-4 py-5 sm:gap-x-6 sm:py-6"
                >
                  <span className="type-card text-accent-600" aria-hidden="true">
                    {`0${i + 1}`}
                  </span>
                  <div>
                    <h3 className="type-card text-ink">{decision.title}</h3>
                    <p className="type-body mt-2 text-ink/80">{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 4. The second screen */}
      <section
        aria-labelledby="screens-heading"
        className="section-y border-t border-ink/10 bg-ivory"
      >
        <div className="container-page">
          <div className="lg:col-span-4">
            <SectionHead number="03" title={study.screens.title} id="screens-heading" />
          </div>

          <figure className="mt-8 sm:mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="flex items-start justify-center gap-4 bg-paper p-4 sm:gap-8 sm:p-10 lg:col-span-7">
              {phoneShots.map((shot) => (
                <div key={shot.src} className="min-w-0 max-w-xs flex-1">
                  <Shot shot={shot} />
                </div>
              ))}
            </div>
            <figcaption className="mt-5 lg:col-span-5 lg:mt-0">
              <h3 className="type-card text-ink">{secondShot.caption}</h3>
              <p className="type-body mt-2 max-w-md text-ink/80">
                {study.screens.body}
              </p>
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
            <p className="type-prose max-w-2xl text-ink/80">{study.outcome}</p>
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link type-small mt-4 inline-flex min-h-[44px] items-center"
              >
                {study.liveLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}

            <figure className="mt-8 max-w-2xl bg-ink p-6 sm:p-8">
              <Kicker tone="inverted">Verified Google Review / The Client</Kicker>
              <blockquote className="type-body mt-3 text-white/80">
                {`"${study.review.quote}"`}
              </blockquote>
              <figcaption className="type-small mt-4 text-white/60">
                {reviewer}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <InsightCTA cta={study.cta} location={study.ctaLocation} />
    </article>
  );
};

export default CaseStudyPage;
