import { motion } from "framer-motion";
import { fadeRise, viewportOnce } from "../../utils/motion";

// Thin wrapper around the shared section-entrance variant so individual
// sections don't each re-declare initial/whileInView/viewport boilerplate.
const Reveal = ({ as = "div", className = "", variants = fadeRise, children, ...props }) => {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Reveal;
