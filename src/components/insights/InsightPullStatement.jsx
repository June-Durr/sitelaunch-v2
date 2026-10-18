import { motion } from "framer-motion";
import { viewportOnce } from "../../utils/motion";

// Authored editorial statement, not a quotation - a <p> with heavy rules,
// not a <blockquote>, and no quote marks or attribution (per handoff a11y
// notes). Fade-only motion (no rise), distinct from the diagnostic rows.
const InsightPullStatement = ({ text }) => (
  <section className="bg-ivory py-8 sm:py-10 lg:py-14">
    <div className="container-page">
      <motion.p
        className="type-heading max-w-[62.5rem] border-y-[3px] border-ink py-8 text-ink sm:py-10"
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
