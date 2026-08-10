import Kicker from "../common/Kicker";
import { projects } from "../../data/projects";
import { carlosReview } from "../../data/reviews";
import analytics from "../../services/analytics";

const DETAILS = [
  { label: "The Ask", key: "ask" },
  { label: "What We Did", key: "whatWeDid" },
  { label: "Key Decision", key: "keyDecision" },
];

const CaseStudyBlock = ({ project }) => {
  const handleLinkClick = () => {
    analytics.trackEvent("portfolio_open", {
      category: "engagement",
      label: project.id,
      project: project.id,
      source: "case_studies",
    });
  };

  return (
    <article className="grid grid-cols-1 gap-8 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <div className="lg:col-span-7">
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
      </div>

      <div className="lg:col-span-5">
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
          onClick={handleLinkClick}
          className="mt-6 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
        >
          See the project
        </a>

        {project.id === "sweet-stax" && (
          <div className="mt-8 bg-ink p-6 sm:p-8">
            <Kicker tone="inverted">Verified Google Review / The Client</Kicker>
            <blockquote className="mt-3 text-base leading-relaxed text-white/90">
              {`“${carlosReview.quote}”`}
            </blockquote>
            <p className="mt-4 text-sm text-white/50">
              {`${carlosReview.author}, ${carlosReview.attribution}`}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

const CaseStudies = () => (
  <section id="case-studies" className="bg-ivory py-16 sm:py-24">
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
