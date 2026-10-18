// One supporting image from the article's source slides, with a real caption.
// Lazy by default: these all sit well below the fold, and the hero cover is
// the only image on an article page that needs to be eager.
const InsightFigure = ({ section }) => {
  const { src, alt, caption, width = 1080, height = 1350 } = section;

  return (
    <section className="bg-ivory py-6 sm:py-8 lg:py-10">
      <div className="container-page">
        <figure className="max-w-[43.75rem] lg:ml-[8.333%]">
          <div className="flex items-center justify-center bg-paper p-4 sm:p-6">
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-[26rem] object-contain"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 type-small text-ink/65">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
};

export default InsightFigure;
