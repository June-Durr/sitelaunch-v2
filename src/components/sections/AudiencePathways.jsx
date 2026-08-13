import Reveal from "../common/Reveal";
import Kicker from "../common/Kicker";
import { scrollToSection } from "../../utils/scroll";

const AudiencePathways = () => (
  <section className="border-t border-ink/10 bg-ivory py-12 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Kicker as="h2">Who We Build For</Kicker>

      <Reveal className="mt-6 grid grid-cols-1 divide-y divide-ink/10 sm:mt-8 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="pb-8 md:pb-0 md:pr-10">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
            For Businesses
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            A site that makes the enquiry easy to send.
          </h3>
          <p className="mt-3 max-w-md text-base text-ink/70 sm:mt-4">
            New websites, landing pages, redesigns, and website refinement,
            with a clearer path from visit to enquiry.
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("services")}
            className="mt-4 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700 sm:mt-5"
          >
            What we build
          </button>
        </div>

        <div
          id="contractors"
          className="scroll-mt-[calc(var(--header-height,68px)+8px)] pt-6 md:pl-10 md:pt-0"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
            For Contractors
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            A site that gets the call from a phone.
          </h3>
          <p className="mt-3 max-w-md text-base text-ink/70 sm:mt-4">
            Trades and home services, where the service, the area covered and
            the way to request an estimate have to be clear in seconds, and
            the work has to be shown properly.
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("services")}
            className="mt-4 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700 sm:mt-5"
          >
            For contractors
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default AudiencePathways;
