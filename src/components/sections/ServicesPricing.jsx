import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../../utils/motion";

const SERVICES = [
  {
    number: "01",
    name: "Launch a new website",
    description:
      "A clear, mobile-first home for your services, proof, service area, and next step.",
  },
  {
    number: "02",
    name: "Build one focused landing page",
    description:
      "One offer, one audience, and one conversion path for a campaign, launch, or new service.",
  },
  {
    number: "03",
    name: "Improve the site you already have",
    description:
      "Find the message, mobile, form, speed, or search problem before deciding what needs rebuilding.",
  },
];

const ServicesPricing = () => (
    <div>
      <Kicker>Services</Kicker>
      <h2 className="type-heading mt-3 text-ink">
        Three useful places to start.
      </h2>

      <motion.ol
        className="mt-6 divide-y divide-ink/10 border-y border-ink/10 sm:mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {SERVICES.map((service) => (
          <motion.li
            key={service.number}
            className="grid grid-cols-[2.25rem_1fr] gap-3 py-5"
            variants={staggerItem}
          >
            <span className="type-label pt-1 text-accent-600">
              {service.number}
            </span>
            <div>
              <h3 className="type-card text-ink">
                {service.name}
              </h3>
              <p className="type-body mt-2 max-w-md text-ink/65">
                {service.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <Reveal
        as="p"
        className="type-body mt-5 max-w-md text-ink/65"
      >
        Every project starts with a free review. You receive a written scope,
        schedule, and price before work begins.
      </Reveal>
    </div>
  );

export default ServicesPricing;
