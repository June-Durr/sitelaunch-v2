import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "../../utils/motion";

// "THE 7-SECOND CHECK". Full-bleed charcoal on mobile (support lines
// dropped - each question gets its own fuller section right after this
// module); inset panel with support lines on desktop. Semantic <ol> so the
// numerals are announced as real list content, not decoration.
const InsightDiagnostic = ({ section }) => (
  <section className="bg-ivory py-8 sm:py-10 lg:py-14" aria-labelledby="diagnostic-heading">
    <div className="bg-ink px-4 py-8 sm:px-6 sm:py-10 lg:mx-auto lg:max-w-6xl lg:px-14 lg:py-14">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2
          id="diagnostic-heading"
          className="type-heading text-white"
        >
          {section.heading}
        </h2>
        <p className="type-label text-accent-400 sm:text-right">
          {section.eyebrow}
        </p>
      </div>

      <motion.ol
        className="mt-6 list-none border-t border-white/25 lg:mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {section.items.map((item) => (
          <motion.li
            key={item.number}
            variants={staggerItem}
            className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 border-b border-white/25 py-4 lg:grid-cols-[2.375rem_25rem_1fr] lg:gap-x-8 lg:py-6"
          >
            <span className="font-display text-lg font-bold text-accent-400 lg:text-xl">
              {item.number}
            </span>
            <span className="type-subheading text-white">
              {item.question}
            </span>
            <span className="type-prose hidden text-white/60 lg:block">
              {item.support}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);

export default InsightDiagnostic;
