import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { EASE, staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";

const STEPS = [
  {
    number: "01",
    title: "Review",
    short: "What you have, and what it needs to do.",
    detail:
      "Send your current site or your idea. We reply with the three things actually holding it back — free, usually within two business days.",
  },
  {
    number: "02",
    title: "Direction",
    short: "Structure and layout, signed off before we build.",
    detail:
      "You see the layout and the copy direction first. Nothing goes into code until you've said yes.",
  },
  {
    number: "03",
    title: "Build",
    short: "Mobile first, then desktop. One revision round.",
    detail:
      "We build for the screen most visitors actually use, then adapt it up — not the other way around.",
  },
  {
    number: "04",
    title: "Launch",
    short: "Deployment, metadata, and a check on real devices.",
    detail:
      "Live on your domain, tested on actual phones, not just a resized browser window.",
  },
  {
    number: "05",
    title: "Improve",
    short: "Changes based on what visitors actually do.",
    detail:
      "We watch how the page performs after launch and adjust it, instead of guessing twice.",
  },
];

// Replaces the old Process strip and the mobile-only StructureInterlude
// teaser with one section: a single connected timeline at every breakpoint
// (rather than a horizontal column grid on desktop and a different vertical
// one on mobile) so "one continuous thread from review to launch" reads as
// the section's actual point, not just a divider style.
const HowWeWork = () => (
  <section
    id="how-we-work"
    className="scroll-mt-[calc(var(--header-height,68px)+8px)] border-t border-ink/10 bg-ivory py-12 sm:py-24 lg:py-[4.5rem]"
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <Kicker>How We Work</Kicker>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          Nothing built until you say go.
        </h2>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">
          Most single-page builds run about 10 business days, review to launch.
        </p>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <div
          aria-hidden="true"
          className="absolute left-[6px] top-2 bottom-2 w-px bg-ink/10"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[6px] top-2 w-px origin-top bg-violet-600"
          style={{ height: "calc(100% - 16px)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: EASE }}
        />

        <motion.ol
          className="divide-y divide-ink/10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {STEPS.map((step) => (
            <motion.li
              key={step.number}
              className="relative py-6 pl-8 sm:py-8 sm:pl-10"
              variants={staggerItem}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 h-3.5 w-3.5 rounded-full border-2 border-violet-600 bg-ivory sm:top-8"
              />
              <div className="sm:flex sm:items-baseline sm:gap-6">
                <div className="flex items-baseline gap-3 sm:w-36 sm:flex-none">
                  <span className="font-display text-2xl font-bold text-violet-600">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                </div>
                <div className="mt-2 sm:mt-0 sm:max-w-lg">
                  <p className="text-sm font-medium text-ink/80 sm:text-base">
                    {step.short}
                  </p>
                  <p className="mt-1.5 text-sm text-ink/55">{step.detail}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  </section>
);

export default HowWeWork;
