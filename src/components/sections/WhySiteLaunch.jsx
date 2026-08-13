import { motion } from "framer-motion";
import Reveal from "../common/Reveal";
import { staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";

// "Built to be found" is the weakest/most repetitive item on a fast mobile
// scan (SEO is implied by the rest of the page), so it's marked mobile-only
// hidden below rather than removed - desktop still shows all five, and the
// content stays here for any future use of this list.
const REASONS = [
  {
    title: "You talk to the person building it",
    description:
      "No account manager between the brief and the build, and no handover halfway through.",
  },
  {
    title: "Mobile decides the design",
    description:
      "The phone layout is drawn first, because that is where most visitors arrive and where most sites fall apart.",
  },
  {
    title: "Focused scope and real dates",
    description:
      "A defined build with a start and an end, so you know when the site goes live.",
  },
  {
    title: "Built to be found",
    description:
      "Page structure, titles and metadata are set up at build time rather than added later.",
    hiddenOnMobile: true,
  },
  {
    title: "English and Spanish",
    description:
      "Consultations in either language, which matters for a lot of businesses working in South Florida.",
  },
];

const WhySiteLaunch = () => (
  <div
    id="why-sitelaunch"
    className="scroll-mt-[calc(var(--header-height,68px)+8px)]"
  >
    <Reveal
      as="h2"
      className="font-display text-3xl font-bold text-ink sm:text-4xl"
    >
      Why work with SiteLaunch
    </Reveal>

    <motion.dl
      className="mt-6 divide-y divide-ink/10 border-t border-ink/10 sm:mt-8"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {REASONS.map((reason) => (
        <motion.div
          key={reason.title}
          className={`py-3.5 sm:py-5 ${reason.hiddenOnMobile ? "hidden sm:block" : ""}`}
          variants={staggerItem}
        >
          <dt className="font-display text-lg font-semibold text-ink">
            {reason.title}
          </dt>
          <dd className="mt-1.5 max-w-md text-sm text-ink/70 sm:mt-2">
            {reason.description}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  </div>
);

export default WhySiteLaunch;
