import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import Kicker from "../components/common/Kicker";
import Reveal from "../components/common/Reveal";
import NotFound from "./NotFound";
import {
  SITE_URL,
  getServiceBySlug,
  getOtherService,
  servicePath,
} from "../data/services";
import analytics from "../services/analytics";

const PHONE_DISPLAY = "(786) 505-5791";
const PHONE_HREF = "tel:+17865055791";

const provider = {
  "@type": "ProfessionalService",
  name: "SiteLaunch Studios",
  url: SITE_URL,
  telephone: "+1-786-505-5791",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

// One component behind both /services/<slug>/ routes, driven entirely by the
// record in src/data/services.js, so the two pages can't drift apart in
// structure, heading order, or schema shape. Routes are declared explicitly
// in App.jsx rather than as a :slug param, so an unknown /services/* path
// falls through to the 404 route instead of rendering an empty shell.
const ServiceDetail = ({ slug }) => {
  const service = getServiceBySlug(slug);
  const other = getOtherService(slug);

  useEffect(() => {
    if (!service) return;
    analytics.trackPageView(
      servicePath(service.slug),
      `${service.name} - SiteLaunch Studios`
    );
  }, [service]);

  if (!service) return <NotFound />;

  const canonicalUrl = `${SITE_URL}${servicePath(service.slug)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: canonicalUrl,
    provider,
    areaServed: "Miami, Florida",
    availableLanguage: ["English", "Spanish"],
    offers: service.offerSchema,
  };

  return (
    <div className="bg-ivory">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        url={canonicalUrl}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />

      <header className="border-b border-ink/10 pb-10 pt-10 sm:pb-12 sm:pt-14 lg:pb-16 lg:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Kicker>After launch</Kicker>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1 className="font-display text-3xl font-bold text-ink sm:text-5xl">
              {service.name}
            </h1>
            <p className="whitespace-nowrap font-display text-xl font-semibold text-violet-600 sm:text-2xl">
              {service.price}
            </p>
          </div>

          <p className="mt-5 max-w-2xl font-display text-xl font-medium text-ink/90 sm:text-2xl">
            {service.headline}
          </p>
          <p className="mt-3 max-w-2xl text-base text-ink/70">
            {service.description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal as="section" aria-labelledby="included-heading">
            <h2
              id="included-heading"
              className="font-display text-2xl font-bold text-ink sm:text-3xl"
            >
              What is included
            </h2>
            <ul className="mt-5 divide-y divide-ink/10 border-t border-ink/10">
              {service.includes.map((item) => (
                <li key={item} className="py-3 text-base text-ink/75">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="excluded-heading">
            <h2
              id="excluded-heading"
              className="font-display text-2xl font-bold text-ink sm:text-3xl"
            >
              What is not included
            </h2>
            <p className="mt-4 max-w-md text-base text-ink/70">
              {service.excludesNote}
            </p>
            <ul className="mt-5 divide-y divide-ink/10 border-t border-ink/10">
              {service.excludes.map((item) => (
                <li key={item} className="py-3 text-base text-ink/60">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <section
          aria-labelledby="pricing-heading"
          className="mt-14 border-t border-ink/10 pt-10 sm:mt-20 sm:pt-12"
        >
          <h2
            id="pricing-heading"
            className="font-display text-2xl font-bold text-ink sm:text-3xl"
          >
            Pricing
          </h2>
          <p className="mt-4 font-display text-3xl font-bold text-violet-600 sm:text-4xl">
            {service.price}
          </p>
          {service.priceNote ? (
            <p className="mt-2 max-w-md text-base text-ink/60">
              {service.priceNote}
            </p>
          ) : null}

          <a
            href={service.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              analytics.trackEvent("service_pdf_click", {
                category: "engagement",
                label: service.analyticsLabel,
              })
            }
            className="mt-6 inline-flex min-h-[44px] items-center text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            {service.pdfLabel}
            <span aria-hidden="true" className="ml-1">
              ↗
            </span>
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </section>
      </div>

      <section aria-labelledby="cta-heading" className="bg-ink py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <Kicker tone="inverted">Get in touch</Kicker>
              <h2
                id="cta-heading"
                className="mt-3 font-display text-3xl font-bold text-ivory sm:text-4xl"
              >
                {service.ctaHeading}
              </h2>
              <p className="mt-3 text-base text-ivory/70">{service.ctaBody}</p>
              <a
                href={PHONE_HREF}
                onClick={() =>
                  analytics.trackEvent("click_phone", {
                    category: "contact",
                    label: service.analyticsLabel,
                  })
                }
                className="mt-5 inline-flex min-h-[44px] items-center text-base font-semibold text-white hover:text-violet-400"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <Link
              to="/#review"
              onClick={() =>
                analytics.trackEvent("review_cta_click", {
                  category: "engagement",
                  label: service.analyticsLabel,
                  location: "service_detail",
                })
              }
              className="mt-7 flex min-h-[52px] w-full items-center justify-center bg-violet-600 px-8 text-base font-semibold text-white transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 lg:mt-0 lg:w-auto lg:flex-none lg:px-9 lg:py-5"
            >
              Contact SiteLaunch
            </Link>
          </div>
        </div>
      </section>

      {other ? (
        <section
          aria-labelledby="related-heading"
          className="border-t border-ink/10 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="related-heading"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40"
            >
              Also after launch
            </h2>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {other.name}
              </p>
              <p className="whitespace-nowrap font-display text-lg font-semibold text-violet-600">
                {other.price}
              </p>
            </div>
            <p className="mt-3 max-w-xl text-base text-ink/70">
              {other.summary}
            </p>
            <Link
              to={servicePath(other.slug)}
              className="mt-4 inline-flex min-h-[44px] items-center text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              {other.teaserLabel}
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ServiceDetail;
