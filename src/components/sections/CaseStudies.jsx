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

const CarlosReviewBlock = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-8 bg-ink p-6 sm:p-8">
      <Kicker tone="inverted">Verified Google Review / The Client</Kicker>
      <blockquote
        className={`mt-3 text-base leading-relaxed text-white/90 ${
          expanded ? "" : "line-clamp-3"
        } lg:line-clamp-none`}
      >
        {`"${carlosReview.quote}"`}
      </blockquote>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="mt-3 text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300 lg:hidden"
      >
        {expanded ? "Show less" : "Read full review"}
      </button>
      <p className="mt-4 text-sm text-white/50">
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
        <p className="text-sm text-ink/50">{project.serviceLabel}</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink">
          {project.name}
        </h3>
        <p className="mt-2 max-w-md text-base text-ink/80">{project.summary}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLinkClick("case_studies")}
          className="mt-4 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
        >
          View case study
        </a>
      </div>

      <motion.div
        className="order-2 lg:order-none lg:col-span-7"
        variants={mediaReveal}
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-ink sm:rounded-none">
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
        <p className="text-sm text-ink/50">{project.serviceLabel}</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          {project.name}
        </h3>

        <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {DETAILS.map((detail) => (
            <div key={detail.key} className="py-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                {detail.label}
              </dt>
              <dd className="mt-1.5 text-base text-ink/80">
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
          className="mt-6 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
        >
          See the project
        </a>

        {project.id === "sweet-stax" && <CarlosReviewBlock />}
      </div>
    </motion.article>
  );
};

const CaseStudies = () => (
  <section id="case-studies" className="scroll-mt-[calc(var(--header-height,68px)+8px)] bg-ivory py-12 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Kicker>Case Studies</Kicker>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
        Two recent projects.
      </h2>

      <div>
        {projects.map((project) => (
          <CaseStudyBlock key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
