// Article FAQ. Every question and every answer is rendered plainly and
// visibly, with no collapse behaviour, because InsightArticle emits FAQPage
// schema from this same data: the structured answers have to be the answers a
// visitor can actually read. If this is ever made collapsible, the answer text
// must still be present in the HTML.
const InsightFaq = ({ section }) => {
  const { heading = "Common questions", items = [] } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14" aria-labelledby="article-faq-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          <h2
            id="article-faq-heading"
            className="font-display text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.125rem]"
          >
            {heading}
          </h2>

          <dl className="mt-5 divide-y divide-ink/[0.18] border-t border-ink/[0.18] lg:mt-7">
            {items.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  {item.question}
                </dt>
                <dd className="mt-2 text-[1.0625rem] leading-[1.7] text-[#2A2926] lg:text-[1.1875rem]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default InsightFaq;
