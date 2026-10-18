// Article FAQ. Every question and every answer is rendered plainly and
// visibly, with no collapse behaviour, because InsightArticle emits FAQPage
// schema from this same data: the structured answers have to be the answers a
// visitor can actually read. If this is ever made collapsible, the answer text
// must still be present in the HTML.
const InsightFaq = ({ section }) => {
  const { heading = "Common questions", items = [] } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14" aria-labelledby="article-faq-heading">
      <div className="container-page">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          <h2
            id="article-faq-heading"
            className="type-heading text-ink"
          >
            {heading}
          </h2>

          <dl className="mt-6 divide-y divide-ink/20 border-t border-ink/20 lg:mt-8">
            {items.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="type-card text-ink ">
                  {item.question}
                </dt>
                <dd className="mt-2 type-prose text-ink/80">
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
