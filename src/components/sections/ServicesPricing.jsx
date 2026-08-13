import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import { accordionVariants, staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";
import analytics from "../../services/analytics";

const PACKAGES = [
  {
    name: "Starter Launch Page",
    price: "$199",
    timeframe: "About 10 business days",
    description:
      "One custom scrolling page, mobile and desktop, your logo and colors, one conversion action, basic SEO and deployment, one revision round.",
  },
  {
    name: "Conversion Landing Page",
    price: "From $699",
    timeframe: "Scoped per project",
    description:
      "Built around a single offer, with the copy, the layout and the form designed together.",
  },
  {
    name: "Business Website",
    price: "From $1,200",
    timeframe: "Scoped per project",
    description:
      "Multiple pages covering services, portfolio and contact, structured so search engines and visitors read it the same way.",
  },
  {
    name: "Website Review",
    price: "Free",
    timeframe: "Two business days",
    description:
      "Three specific things to fix on the site you already have, sent by email.",
  },
];

// Mobile shows name + price + one sentence, with the timeframe tucked behind
// a "Details" accordion so the list scans fast. Desktop keeps the original
// always-expanded layout (timeframe visible inline) untouched.
const ServiceRow = ({ pkg }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="py-3.5 sm:py-5" variants={staggerItem}>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="font-display text-lg font-semibold text-ink">
          {pkg.name}
        </dt>
        <dd className="whitespace-nowrap font-display text-lg font-semibold text-violet-600">
          {pkg.price}
        </dd>
      </div>

      <p className="hidden mt-1 text-xs uppercase tracking-[0.1em] text-ink/40 sm:block">
        {pkg.timeframe}
      </p>
      <p className="mt-1.5 max-w-md text-sm text-ink/70 sm:mt-2">
        {pkg.description}
      </p>

      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-violet-600"
        >
          {expanded ? "Hide details" : "Details"}
        </button>
        <motion.div
          initial="collapsed"
          animate={expanded ? "expanded" : "collapsed"}
          variants={accordionVariants}
          className="overflow-hidden"
        >
          <p className="pt-2 text-xs uppercase tracking-[0.1em] text-ink/40">
            {pkg.timeframe}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

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
        branding are not part of the starter page. Prices shown are starting
        points and are confirmed in the review.
      </Reveal>
    </div>
  );
};

export default ServicesPricing;
