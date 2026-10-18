import { useState } from "react";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { projects } from "../../data/projects";
import { carlosReview } from "../../data/reviews";
import { fadeRise, mediaReveal, viewportOnce } from "../../utils/motion";
import analytics from "../../services/analytics";

const DETAILS = [
  { label: "The Ask", key: "ask" },
  { label: "What We Did", key: "whatWeDid" },
  { label: "Key Decision", key: "keyDecision" },
];

// `wide` is the desktop-only full-span testimonial moment (see CaseStudies
// below) - the image+story row pairs image with text at matched height, so
// the review moved to its own row instead of stretching that row taller
// than the imagery, which used to leave a large empty column beside it.
// Mobile/narrow keeps the original compact stacked treatment untouched.
const CarlosReviewBlock = ({ wide = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (wide) {
    return (
      <div className="hidden bg-ink p-10 lg:order-last lg:col-span-12 lg:block lg:p-12">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <div>
            <Kicker tone="inverted">Verified Google Review</Kicker>
            <p className="type-small mt-2 text-white/60">The Client</p>
          </div>
          <div>
            <blockquote className="type-lead text-white/80">
              {`"${carlosReview.quote}"`}
            </blockquote>
            <p className="type-small mt-5 text-white/60">
              {`${carlosReview.author}, ${carlosReview.attribution}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-ink p-6 sm:p-8">
      <Kicker tone="inverted">Verified Google Review / The Client</Kicker>
      <blockquote
        className={`type-body mt-3 text-white/80 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {`"${carlosReview.quote}"`}
      </blockquote>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="link-on-dark mt-3 text-sm"
      >
        {expanded ? "Show less" : "Read full review"}
      </button>
      <p className="type-small mt-4 text-white/60">
        {`${carlosReview.author}, ${carlosReview.attribution}`}
      </p>
    </div>
  );
};

const CaseStudyBlock = ({ project }) => {
  const handleLinkClick = (source) => {
    analytics.trackEvent("portfolio_open", {
      category: "engagement",
      label: project.id,
      project: project.id,
      source,
    });
  };

  return (
    <motion.article
      className="grid grid-cols-1 gap-6 border-t border-ink/10 py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10 lg:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeRise}
    >
      {/* Mobile-only compact header: name, summary, CTA - text before image. */}
      <div className="order-1 lg:hidden">
        <p className="type-small text-ink/65">{project.serviceLabel}</p>
        <h3 className="type-subheading mt-1 text-ink">
          {project.name}
        </h3>
        <p className="type-body mt-2 max-w-md text-ink/80">{project.summary}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLinkClick("case_studies")}
          className="link mt-4 inline-block text-base"
        >
          View case study
        </a>
      </div>

      <motion.div
        className="order-2 lg:order-none lg:col-span-7"
        variants={mediaReveal}
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden bg-ink">
          {project.images.map((image) => (
            <div key={image.src} className="aspect-[3/4]">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
        {project.id === "sweet-stax" && (
          <div className="lg:hidden">
            <CarlosReviewBlock />
          </div>
        )}
      </motion.div>

      {/* Desktop-only full detail column - unchanged from the approved design. */}
      <div className="order-3 hidden lg:col-span-5 lg:block">
        <p className="type-small text-ink/65">{project.serviceLabel}</p>
        <h3 className="type-subheading mt-1 text-ink">
          {project.name}
        </h3>

        <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {DETAILS.map((detail) => (
            <div key={detail.key} className="py-4">
              <dt className="type-label text-ink/65">
                {detail.label}
              </dt>
              <dd className="type-body mt-2 text-ink/80">
                {project[detail.key]}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLinkClick("case_studies")}
          className="link mt-6 inline-block text-base"
        >
          See the project
        </a>
      </div>

      {/* Testimonial moment: full-width row beneath the image+story
          composition, not squeezed into the narrower text column. */}
      {project.id === "sweet-stax" && <CarlosReviewBlock wide />}
    </motion.article>
  );
};

const CaseStudies = () => (
  <section id="case-studies" className="scroll-mt-[calc(var(--header-height,68px)+8px)] section-y bg-ivory">
    <div className="container-page">
      <Kicker>Case Studies</Kicker>
      <h2 className="type-heading mt-3 text-ink">
        Two recent projects.
      </h2>

      <div className="mt-8 sm:mt-10">
        {projects.map((project) => (
          <CaseStudyBlock key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
