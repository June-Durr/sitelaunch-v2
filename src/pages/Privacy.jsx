// The public privacy policy, at /privacy.
//
// WHY THIS IS A ROUTE AND NOT THE FOOTER MODAL IT REPLACES
//
// Google's OAuth verification requires a privacy policy at a real, publicly
// reachable URL it can fetch and a human can link to. The old policy lived
// inside a <button>-triggered modal in the footer: no address, nothing for a
// crawler to follow, and nothing to paste into a verification form. The modal
// copy has been removed rather than left alongside this, because two privacy
// policies that disagree is worse than one that is merely inconvenient.
//
// WHY IT IS PRERENDERED
//
// This site has no SPA fallback: an unknown path returns a real 404 from
// Netlify. Routes exist as files because scripts/prerender.js writes them, so
// /privacy only answers if it is in that script's ROUTES list. It is written
// flat, as privacy.html rather than privacy/index.html, so the address Google
// is given answers 200 directly instead of redirecting to a trailing slash
// first.
//
// EVERY CLAIM BELOW IS ONE THE PRODUCT ACTUALLY HONOURS
//
// The Cockpit requests calendar.events.owned and nothing else; it addresses
// only event ids it derived from its own follow-up tasks; it never lists or
// searches a calendar; it never deletes an event, including on disconnect; and
// the refresh token lives in Supabase Vault behind functions the browser cannot
// reach. Anything this page cannot stand behind is not on it.
import React from "react";
import SEOHead from "../components/common/SEOHead";

const SITE_URL = "https://sitelaunchstudios.com";
const CANONICAL = `${SITE_URL}/privacy`;

export const EFFECTIVE_DATE = "October 11, 2026";

// The real, existing contact details this site already publishes. The phone
// number is the one in the footer; the address is the inbox the site's own
// contact forms deliver to and reply from. Neither is invented for this page.
export const CONTACT_EMAIL = "sitelaunchstudio@gmail.com";
export const CONTACT_PHONE_DISPLAY = "(786) 505-5791";
export const CONTACT_PHONE_HREF = "tel:+17865055791";

const GOOGLE_USER_DATA_POLICY_URL =
  "https://developers.google.com/terms/api-services-user-data-policy";
const GOOGLE_PERMISSIONS_URL = "https://myaccount.google.com/permissions";

/**
 * One section of the policy.
 *
 * `paragraphs` entries are either a string or a function returning JSX, so the
 * handful of sections that need a link can have one without turning the whole
 * document into markup.
 */
const SECTIONS = [
  {
    id: "who-we-are",
    heading: "01 Who operates this service",
    paragraphs: [
      "SiteLaunch Studios operates the SiteLaunch Marketing Cockpit and the website at sitelaunchstudios.com. In this policy, \"we\" and \"us\" mean SiteLaunch Studios, and \"the Cockpit\" means the SiteLaunch Marketing Cockpit application.",
      "This policy covers both the Cockpit and this website. It explains what we collect, what we do with it, who else sees it, and how you get rid of it.",
    ],
  },
  {
    id: "information-you-provide",
    heading: "02 Information you provide",
    paragraphs: [
      "When you create a Cockpit account we hold the email address you sign in with. Authentication is handled by Supabase, and we do not store your password.",
      "Everything else in this category is information you put into the Cockpit yourself. That includes the people and businesses you track as leads: names, organisations, email addresses, phone numbers and how you prefer to reach them. It includes the notes you write, the history of contact you record, the tasks and follow-ups you create, and the activity log those produce.",
      "If you contact us through a form on this website, we receive what you typed into it, so that we can reply.",
    ],
  },
  {
    id: "information-received-automatically",
    heading: "03 Information we receive automatically",
    paragraphs: [
      "Running and securing a service produces some information whether anybody intends it or not: the network address a request came from, basic browser and device details, the time a request was made, and records of errors and of whether a scheduled sync succeeded or failed. We use it to keep the service working, to investigate faults, and to notice abuse.",
      "This website uses Google Analytics to measure how visitors find and move through it.",
    ],
  },
  {
    id: "google-user-data",
    heading: "04 Google data the Cockpit accesses",
    paragraphs: [
      "Connecting Google Calendar is optional. The Cockpit works without it, and nothing below happens unless you connect an account yourself.",
      "When you do, the Cockpit asks Google for one permission and no others: https://www.googleapis.com/auth/calendar.events.owned. That permits creating and updating events on calendars you own. It does not permit reading anybody else's calendar, changing your calendar settings, or sharing a calendar.",
      "Two things are accessed under it. The first is the email address of the Google account you connected, so the Cockpit can show you which account is in use. The second is the follow-up events the Cockpit itself created on your primary calendar, so it can keep them up to date when a follow-up date moves.",
      "What the Cockpit does not do is as specific as what it does. It never lists, searches or reads through your calendar. Every request it makes names a single event whose identifier it worked out from one of your own follow-up tasks, so an appointment it did not create is not something it can see. It never deletes a calendar event, for any reason, including when you disconnect. And it never treats an appointment on your calendar as evidence that you contacted somebody: an entry in a diary is not a record of a conversation, and counting it as one would invent history that did not happen.",
    ],
  },
  {
    id: "how-we-use-google-data",
    heading: "05 How we use Google data",
    paragraphs: [
      "Only to do the thing you connected the account for: putting your open follow-ups on your calendar as all-day entries, keeping those entries current, and telling you which Google account is connected.",
      "We do not sell Google user data. We do not use it for advertising, and we do not pass it to advertising networks or data brokers. We do not use it to build a profile of you, and we do not use it to train machine learning models.",
    ],
  },
  {
    id: "limited-use",
    heading: "06 Google API Services User Data Policy",
    paragraphs: [
      () => (
      // One explicit string per text run, never JSX text plus {" "}. Two
      // adjacent text nodes cannot survive the prerender: outerHTML
      // concatenates them and the parser returns one, so hydration finds a
      // single node where React expects two. See the note above SECTIONS.
        <>
          {"SiteLaunch Studios\u2019 use and transfer of information received from Google APIs to any other app will adhere to the "}
          <a
            href={GOOGLE_USER_DATA_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 underline underline-offset-2 hover:text-accent-700"
          >
            {"Google API Services User Data Policy"}
          </a>
          {", including the Limited Use requirements."}
        </>
      ),
    ],
  },
  {
    id: "sharing",
    heading: "07 Who else sees your information",
    paragraphs: [
      "We share information with the companies whose infrastructure the service runs on, and only as far as running it requires. There are three.",
      "Supabase stores the database and handles authentication, so your account and everything you enter into the Cockpit lives there. Netlify hosts this website and the Cockpit's frontend, and therefore serves the pages your browser requests. Google holds the calendar you connect, and also provides the Analytics and Search Console figures the Cockpit reads for our own properties.",
      "That is the whole list. We do not sell your information, we do not rent it, and we do not share it with anyone for their own marketing.",
    ],
  },
  {
    id: "security",
    heading: "08 How your Google authorization is stored",
    paragraphs: [
      "The token that lets the Cockpit write to your calendar is kept server-side, in Supabase Vault, reachable only by server-side functions. It is never sent to your browser, never included in the Cockpit's JavaScript, and never written into logs or error messages. The browser is told that a connection exists and which account it belongs to, and nothing more than that.",
      "Traffic to the site and to the Cockpit is served over HTTPS, and access to your records is scoped to your own account at the database level rather than only in the application.",
      "We take these measures because they are worth taking, not because they make anything certain. No service can promise that information sent over the internet or held on a computer is perfectly secure, and we are not going to tell you otherwise.",
    ],
  },
  {
    id: "retention",
    heading: "09 How long we keep things",
    paragraphs: [
      "Information you put into the Cockpit is kept while your account exists, because the point of the Cockpit is that last year's contact history is still there this year.",
      "Your Google authorization is kept until you disconnect it or until you ask us to delete your account, whichever comes first. Operational records such as error and sync logs are kept only as long as they are useful for running and securing the service.",
    ],
  },
  {
    id: "disconnecting",
    heading: "10 Disconnecting Google Calendar",
    paragraphs: [
      "In the Cockpit, open Data & Import, find the Follow-up calendar panel, and press Disconnect. That removes the stored authorization from our side immediately and asks Google to revoke it as well. Once it is gone the Cockpit cannot write to your calendar again unless you connect it a second time.",
      () => (
        <>
          {"You can also revoke access from your Google account directly, at "}
          <a
            href={GOOGLE_PERMISSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 underline underline-offset-2 hover:text-accent-700"
          >
            {"myaccount.google.com/permissions"}
          </a>
          {". Either route stops any further access."}
        </>
      ),
      "Follow-up events the Cockpit already created stay on your calendar after you disconnect. That is deliberate: you may have planned a week around them, and removing entries from somebody's diary because a connection ended is not a decision this software should make for you. They are ordinary events on your own calendar, and you can delete them yourself at any time.",
    ],
  },
  {
    id: "deleting-your-data",
    heading: "11 Deleting your Cockpit data",
    paragraphs: [
      () => (
        <>
          {"Write to "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-600 underline underline-offset-2 hover:text-accent-700">
            {CONTACT_EMAIL}
          </a>
          {" from the address on your account and ask us to delete it. We will remove your account, the leads, notes, tasks and activity stored against it, and any Google authorization still held, and we will confirm when it is done."}
        </>
      ),
      "Deleting your Cockpit data does not remove events already on your Google Calendar, for the reason given in the previous section. Those are yours to keep or delete.",
    ],
  },
  {
    id: "children",
    heading: "12 Children's privacy",
    paragraphs: [
      "The Cockpit is a tool for running a business and is not directed to children. We do not knowingly collect information from anyone under 13. If you believe a child has provided us with information, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    heading: "13 Changes to this policy",
    paragraphs: [
      "If this policy changes, the effective date at the top of the page changes with it, and the new version replaces this one here. Where a change materially affects what we do with information you have already given us, we will say so rather than rely on you noticing a date.",
    ],
  },
  {
    id: "contact",
    heading: "14 Contact",
    paragraphs: [
      () => (
        <>
          {"Questions about this policy, or about anything described in it, go to "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-600 underline underline-offset-2 hover:text-accent-700">
            {CONTACT_EMAIL}
          </a>
          {" or "}
          <a href={CONTACT_PHONE_HREF} className="text-accent-600 underline underline-offset-2 hover:text-accent-700">
            {CONTACT_PHONE_DISPLAY}
          </a>
          {". We answer in English and Spanish."}
        </>
      ),
    ],
  },
];

const NUMBERED_HEADING = /^(\d+)\s+(.+)$/;

const SectionHeading = ({ heading }) => {
  // The same leading-numeral treatment the insight articles use, so a legal
  // page still reads as part of this site rather than as a pasted-in document.
  const match = heading.match(NUMBERED_HEADING);
  return (
    <h2 className="type-heading text-ink">
      {match ? (
        <>
          <span className="text-accent-600">{match[1]}</span>
          {` ${match[2]}`}
        </>
      ) : (
        heading
      )}
    </h2>
  );
};

const Privacy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "How SiteLaunch Studios handles information in the SiteLaunch Marketing Cockpit, including Google Calendar data.",
    url: CANONICAL,
    publisher: {
      "@type": "Organization",
      name: "SiteLaunch Studios",
    },
  };

  return (
    <div className="bg-ivory">
      <SEOHead
        title="Privacy Policy | SiteLaunch Studios"
        description="How SiteLaunch Studios collects, uses and protects information in the SiteLaunch Marketing Cockpit, including the Google Calendar data it accesses and how to revoke it."
        keywords="SiteLaunch Studios privacy policy, Marketing Cockpit privacy, Google Calendar data"
        url={CANONICAL}
        canonicalUrl={CANONICAL}
        type="article"
        structuredData={structuredData}
      />

      <header className="pb-8 pt-8 sm:pb-12 sm:pt-10 lg:pb-16 lg:pt-20">
        <div className="container-page">
          <div className="max-w-[43.75rem] lg:ml-[8.333%]">
            <span className="type-label text-accent-600">
              Legal
            </span>

            <h1 className="type-title mt-3 text-ink">
              Privacy Policy
            </h1>

            <p className="type-lead mt-4 text-ink/80 sm:mt-5">
              How SiteLaunch Studios handles information in the SiteLaunch
              Marketing Cockpit and on this website, including the Google
              Calendar data the Cockpit uses and how to take it back.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/20 pt-3 type-label text-ink/65 sm:mt-6 sm:pt-4">
              <span>SiteLaunch Studios</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 flex-none bg-accent-600"
              />
              <span>{`Effective ${EFFECTIVE_DATE}`}</span>
            </div>
          </div>
        </div>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="py-4 sm:py-5 lg:py-6"
        >
          <div className="container-page">
            <div className="max-w-[43.75rem] lg:ml-[8.333%]">
              <SectionHeading heading={section.heading} />

              <div className="mt-5 space-y-4 lg:mt-7 lg:space-y-5">
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={`${section.id}-${i}`}
                    className="type-prose text-ink/80"
                  >
                    {typeof paragraph === "function" ? paragraph() : paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="pb-16 pt-6 sm:pb-20 lg:pb-24">
        <div className="container-page">
          <div className="max-w-[43.75rem] lg:ml-[8.333%]">
            <div className="h-px w-full bg-accent-600/60" />
            <p className="type-small mt-4 text-ink/65">
              {`SiteLaunch Studios \u00b7 Miami, clients anywhere \u00b7 Effective ${EFFECTIVE_DATE}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
