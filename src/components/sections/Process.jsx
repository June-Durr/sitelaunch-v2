import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { EASE, staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";

const STEPS = [
  {
    number: "01",
    title: "Review",
    description: "What you have, and what it needs to do.",
  },
  {
    number: "02",
    title: "Direction",
    description: "Structure and layout, signed off before we build.",
  },
  {
    number: "03",
    title: "Build",
    description: "Mobile first, then desktop. One revision round.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, metadata, and a check on real devices.",
  },
  {
    number: "05",
    title: "Improve",
    description: "Changes based on what visitors actually do.",
  },
];

const Process = () => (
  <section className="border-t border-ink/10 bg-ivory py-12 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Kicker as="h2">Process</Kicker>

      <div className="relative mt-6 sm:mt-8">
        {/* Mobile-only vertical timeline: a static track plus a purple fill
            that draws downward as the section enters, echoing the five-step
            sequence instead of a plain divider. */}
        <div
          aria-hidden="true"
          className="absolute left-[6px] top-2 bottom-2 w-px bg-ink/10 sm:hidden"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[6px] top-2 w-px origin-top bg-violet-600 sm:hidden"
          style={{ height: "calc(100% - 16px)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-5 sm:divide-x sm:divide-ink/10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              className="relative py-3 pl-6 sm:px-5 sm:py-0 sm:pl-5 first:sm:pl-0"
              variants={staggerItem}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[7px] h-3.5 w-3.5 rounded-full border-2 border-violet-600 bg-ivory sm:hidden"
              />
              <span className="font-display text-2xl font-bold text-violet-600">
                {step.number}
              </span>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-ink sm:mt-2">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink/70 sm:mt-1.5">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Process;
