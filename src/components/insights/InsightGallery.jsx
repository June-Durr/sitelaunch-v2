import { motion } from "framer-motion";
import { mediaReveal, viewportOnce } from "../../utils/motion";

// Sequential image set, read top to bottom in order (not a grid — order is
// the point, same reasoning as InsightFixOrder's <ol>). Same content-column
// alignment as InsightProse/InsightFixOrder so images sit on the same left
// edge as the surrounding prose rather than reading as a separate module.
const InsightGallery = ({ section }) => {
  const { images = [] } = section;

  return (
    <div className="bg-ivory py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] space-y-6 lg:ml-[8.333%] lg:space-y-8">
          {images.map((image) => (
            <motion.figure
              key={image.src}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={mediaReveal}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full"
                width={1080}
                height={1350}
                loading="lazy"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightGallery;
