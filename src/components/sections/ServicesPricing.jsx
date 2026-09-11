import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import { staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";
import analytics from "../../services/analytics";

// `label` describes the engagement type, not a figure. The homepage shows no
// numeric pricing - every project is quoted before it begins, and the real
// numbers are confirmed in the review. "Free" is the one label kept visually
// prominent (`emphasis`), because the Website Review is the primary
// lead-generation offer and the word is the offer.
const PACKAGES = [
  {
    name: "Starter Launch Page",
    label: "Fixed-scope website",
    timing: "About 10 business days",
    description:
      "One custom scrolling page, mobile and desktop, your logo and colors, one conversion action, basic SEO and deployment, one revision round.",
  },
  {
    name: "Conversion Landing Page",
    label: "Project-based",
    description:
      "Built around a single offer, with the copy, the layout and the form designed together.",
  },
  {
    name: "Business Website",
    label: "Custom scope",
    description:
      "Multiple pages covering services, portfolio and contact, structured so search engines and visitors read it the same way.",
  },
  {
    name: "Website Review",
    label: "Free",
    emphasis: true,
    timing: "Two business days",
    description:
      "Three specific things to fix on the site you already have, sent by email.",
  },
];

// Every row is fully visible at every breakpoint. There used to be a mobile
// "Details" accordion, but the only thing behind it was the timeframe - a
// tap to reveal three words, and for two packages the words just restated
// the label. `timing` now sits inline, and is set only where a real duration
// exists; "scoped per project" is already what "Project-based" and "Custom
// scope" say, so those rows carry no timing line at all.
const ServiceRow = ({ pkg }) => (
  <motion.div className="py-3.5 sm:py-5" variants={staggerItem}>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <dt className="font-display text-lg font-semibold text-ink">
        {pkg.name}
      </dt>
      <dd
        className={
          pkg.emphasis
            ? "whitespace-nowrap font-display text-lg font-semibold text-violet-600"
            : "text-xs font-semibold uppercase tracking-[0.1em] text-ink/45"
        }
      >
        {pkg.label}
      </dd>
    </div>

    {pkg.timing ? (
      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink/40">
        {pkg.timing}
      </p>
    ) : null}
    <p className="mt-1.5 max-w-md text-sm text-ink/70 sm:mt-2">
      {pkg.description}
    </p>
  </motion.div>
);

const ServicesPricing = () => {
  const sectionRef = useRef(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          analytics.trackEvent("pricing_view", { category: "engagement" });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <Kicker>Services</Kicker>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
        Four ways to start.
      </h2>

      <motion.dl
        className="mt-6 divide-y divide-ink/10 border-t border-ink/10 sm:mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {PACKAGES.map((pkg) => (
          <ServiceRow key={pkg.name} pkg={pkg} />
        ))}
      </motion.dl>

      <Reveal
        as="p"
        className="mt-5 max-w-md text-xs text-ink/50 sm:mt-6 sm:text-sm"
      >
        Every project is quoted before it begins. Logo design and full
        branding are not part of the starter page. Pricing is confirmed in the
        review.
      </Reveal>
    </div>
  );
};

export default ServicesPricing;
