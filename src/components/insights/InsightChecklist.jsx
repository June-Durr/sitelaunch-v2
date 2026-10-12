// A checklist the reader can run against their own site. Plain <ul> with a
// decorative violet marker; the marker is aria-hidden because the meaning is
// entirely in the text next to it.
const InsightChecklist = ({ section }) => {
  const { heading, intro, items = [], note } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.125rem]">
            {heading}
          </h2>

          {intro && (
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#2A2926] lg:text-[1.1875rem]">
              {intro}
            </p>
          )}

          <ul className="mt-5 list-none divide-y divide-ink/[0.18] border-t border-ink/[0.18] lg:mt-6">
            {items.map((item) => (
              <li
                key={item.slice(0, 32)}
                className="flex items-start gap-3 py-4 text-[1.0625rem] leading-[1.5] text-[#2A2926] lg:text-[1.1875rem]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.4em] h-2.5 w-2.5 flex-none border-2 border-violet-600"
                />
                {item}
              </li>
            ))}
          </ul>

          {note && (
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#2A2926] lg:text-[1.1875rem]">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightChecklist;
