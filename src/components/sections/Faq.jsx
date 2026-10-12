import Kicker from "../common/Kicker";
import Reveal from "../common/Reveal";
import { HOMEPAGE_FAQS } from "../../data/faqs";

const Faq = () => (
  <section
    id="faq"
    aria-labelledby="faq-heading"
    className="border-t border-ink/10 bg-white py-12 sm:py-20"
  >
    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20 lg:px-8">
      <Reveal>
        <Kicker>Before you start</Kicker>
        <h2
          id="faq-heading"
          className="mt-3 max-w-sm font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
        >
          Straight answers to the questions that slow a website project down.
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-ink/65 sm:text-base">
          Short answers first. Open only what you need.
        </p>
      </Reveal>

      <div className="border-t border-ink/15">
        {HOMEPAGE_FAQS.map((item) => (
          <details
            key={item.question}
            className="group border-b border-ink/15 open:bg-ivory/60"
          >
            <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-5 px-1 py-4 text-left marker:content-none sm:min-h-[76px] sm:px-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-semibold leading-6 text-ink sm:text-lg">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="relative h-5 w-5 shrink-0 text-violet-600"
              >
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
              </span>
            </summary>
            <div className="px-1 pb-5 pr-10 sm:px-4 sm:pb-6 sm:pr-16">
              <p className="max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
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
