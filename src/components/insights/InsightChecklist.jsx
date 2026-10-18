// A checklist the reader can run against their own site. Plain <ul> with a
// decorative violet marker; the marker is aria-hidden because the meaning is
// entirely in the text next to it.
const InsightChecklist = ({ section }) => {
  const { heading, intro, items = [], note } = section;

  return (
    <section className="bg-ivory py-8 sm:py-10 lg:py-14">
      <div className="container-page">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          <h2 className="type-heading text-ink">
            {heading}
          </h2>

          {intro && (
            <p className="mt-5 type-prose text-ink/80">
              {intro}
            </p>
          )}

          <ul className="mt-6 list-none divide-y divide-ink/20 border-t border-ink/20 lg:mt-8">
            {items.map((item) => (
              <li
                key={item.slice(0, 32)}
                className="flex items-start gap-3 py-4 type-prose text-ink/80"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.4em] h-2.5 w-2.5 flex-none border-2 border-accent-600"
                />
                {item}
              </li>
            ))}
          </ul>

          {note && (
            <p className="mt-5 type-prose text-ink/80">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightChecklist;
