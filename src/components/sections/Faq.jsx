import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import { HOMEPAGE_FAQS } from "../../data/faqs";

const Faq = () => (
  <section
    id="faq"
    aria-labelledby="faq-heading"
    className="section-y border-t border-ink/10 bg-white"
  >
    <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <Reveal>
        <Kicker>Before you start</Kicker>
        <h2
          id="faq-heading"
          className="type-heading mt-3 text-ink"
        >
          Straight answers to the questions that slow a website project down.
        </h2>
        <p className="type-body mt-4 max-w-sm text-ink/65">
          Short answers first. Open only what you need.
        </p>
      </Reveal>

      <div className="border-t border-ink/20">
        {HOMEPAGE_FAQS.map((item) => (
          <details
            key={item.question}
            className="group border-b border-ink/20 open:bg-ivory/60"
          >
            <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-5 px-1 py-4 text-left marker:content-none sm:min-h-[76px] sm:px-4 [&::-webkit-details-marker]:hidden">
              <h3 className="type-card text-ink">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="relative h-5 w-5 shrink-0 text-accent-600"
              >
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
              </span>
            </summary>
            <div className="px-1 pb-5 pr-10 sm:px-4 sm:pb-6 sm:pr-16">
              <p className="type-body max-w-2xl text-ink/80">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
