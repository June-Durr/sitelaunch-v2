import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import { staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";
import { SERVICES, servicePath } from "../../data/services";
import analytics from "../../services/analytics";

// Homepage teaser only. The full inclusion lists, exclusions, pricing detail
// and PDFs live on /services/<slug>/ - this section deliberately carries just
// the name, price, one sentence and three highlights so the mobile scroll
// stays short. Copy comes from src/data/services.js; don't inline it here.
const CELL_SPACING = [
  "pb-8 lg:pb-0 lg:pr-10 xl:pr-14",
  "pt-8 lg:pl-10 lg:pt-0 xl:pl-14",
];

const Offer = ({ service, className }) => (
  <motion.div className={className} variants={staggerItem}>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="font-display text-2xl font-bold text-ink">
        {service.name}
      </h3>
      {/* Engagement type, not a figure - the homepage shows no numeric
          pricing. Kept small and muted on purpose so the service name and
          the link carry the hierarchy rather than a price-shaped label. */}
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/45">
        {service.homepageLabel}
      </p>
    </div>

    <p className="mt-2 max-w-md text-sm text-ink/70 sm:text-base">
      {service.summary}
    </p>

    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
      {service.highlights.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-sm text-ink/60"
        >
          <span
            aria-hidden="true"
            className="h-1 w-1 flex-none bg-violet-600"
          />
          {item}
        </li>
      ))}
    </ul>

    <Link
      to={servicePath(service.slug)}
      onClick={() =>
        analytics.trackEvent("after_launch_service_click", {
          category: "engagement",
          label: service.analyticsLabel,
        })
      }
      className="mt-3 inline-flex min-h-[44px] items-center text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    >
      {service.teaserLabel}
    </Link>
  </motion.div>
);

const AfterLaunch = () => (
  <section
    id="after-launch"
    className="relative scroll-mt-[calc(var(--header-height,68px)+8px)] border-t border-ink/10 bg-ivory py-12 sm:py-24 lg:py-[4.5rem]"
  >
    {/* Matches the stacked-layout break above "Why work with SiteLaunch":
        the section's existing hairline plus a short violet lead-in, so the
        handoff into After launch reads as a real section start on a narrow
        scroll. Absolutely positioned, so it adds no page height, and hidden
        at lg where the desktop rhythm already reads. */}
    <span
      aria-hidden="true"
      className="absolute -top-px left-4 h-0.5 w-10 bg-violet-600 sm:left-6 lg:hidden"
    />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <Kicker>After launch</Kicker>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          Keep the website current. Make the brand consistent.
        </h2>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">
          Two focused services for businesses that need continued website
          support or a clearer digital brand system after the initial build.
        </p>
      </Reveal>

      <motion.div
        className="mt-8 grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 pt-8 sm:mt-10 sm:pt-10 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {SERVICES.map((service, index) => (
          <Offer
            key={service.slug}
            service={service}
            className={CELL_SPACING[index]}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default AfterLaunch;
