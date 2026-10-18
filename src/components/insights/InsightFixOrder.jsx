// "Fix it in this order": restrained hairline rows, purple numeral / label /
// support line - explicitly not cards. Semantic <ol> since order matters.
const InsightFixOrder = ({ section }) => (
  <section className="bg-ivory py-8 sm:py-10 lg:py-14">
    <div className="container-page">
      <div className="max-w-[43.75rem] lg:ml-[8.333%]">
        <h2 className="type-heading text-ink">
          {section.heading}
        </h2>

        <ol className="mt-6 list-none divide-y divide-ink/20 border-t border-ink/20 lg:mt-8">
          {section.items.map((item) => (
            <li
              key={item.number}
              className="grid grid-cols-[1.375rem_7.5rem_1fr] items-baseline gap-x-3 py-4 sm:grid-cols-[1.875rem_11.25rem_1fr] sm:gap-x-4"
            >
              <span className="font-display text-base font-bold text-accent-600 sm:text-lg">
                {item.number}
              </span>
              <span className="type-card text-ink ">
                {item.label}
              </span>
              <span className="type-body text-ink/65">
                {item.support}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default InsightFixOrder;
