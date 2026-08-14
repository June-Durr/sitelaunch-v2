import { motion } from "framer-motion";
import { viewportOnce } from "../../utils/motion";

// Authored editorial statement, not a quotation - a <p> with heavy rules,
// not a <blockquote>, and no quote marks or attribution (per handoff a11y
// notes). Fade-only motion (no rise), distinct from the diagnostic rows.
const InsightPullStatement = ({ text }) => (
  <section className="bg-ivory py-8 sm:py-10 lg:py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="max-w-[62.5rem] border-y-[3px] border-ink py-8 font-display text-[1.875rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:py-10 lg:text-[3.625rem] lg:leading-[1.04] lg:tracking-[-0.035em]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.24 }}
      >
        {text}
      </motion.p>
    </div>
  </section>
);

export default InsightPullStatement;
