// "Fix it in this order": restrained hairline rows, purple numeral / label /
// support line - explicitly not cards. Semantic <ol> since order matters.
const InsightFixOrder = ({ section }) => (
  <section className="bg-ivory py-8 sm:py-10 lg:py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-[43.75rem] lg:ml-[8.333%]">
        <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.125rem]">
          {section.heading}
        </h2>

        <ol className="mt-5 list-none divide-y divide-ink/[0.18] border-t border-ink/[0.18] lg:mt-7">
          {section.items.map((item) => (
            <li
              key={item.number}
              className="grid grid-cols-[1.375rem_7.5rem_1fr] items-baseline gap-x-3 py-4 sm:grid-cols-[1.875rem_11.25rem_1fr] sm:gap-x-4"
            >
              <span className="font-display text-base font-bold text-violet-600 sm:text-lg">
                {item.number}
              </span>
              <span className="font-display text-lg font-semibold text-ink sm:text-xl">
                {item.label}
              </span>
              <span className="text-sm text-[#5C5952] sm:text-[1.0625rem]">
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
