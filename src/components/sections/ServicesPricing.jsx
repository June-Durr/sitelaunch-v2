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
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
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
            <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-violet-600">
              {service.number}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {service.name}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-6 text-ink/65">
                {service.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <Reveal
        as="p"
        className="mt-5 max-w-md text-sm leading-6 text-ink/55"
      >
        Every project starts with a free review. You receive a written scope,
        schedule, and price before work begins.
      </Reveal>
    </div>
  );

export default ServicesPricing;
