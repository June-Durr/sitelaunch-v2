import { HOMEPAGE_FAQS } from "./faqs";

export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://sitelaunchstudios.com/#business",
      name: "SiteLaunch Studios",
      description:
        "SiteLaunch Studios designs and builds websites for businesses and contractors. Miami-based, working with clients anywhere.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "25.7617",
        longitude: "-80.1918",
      },
      url: "https://sitelaunchstudios.com",
      image: "https://sitelaunchstudios.com/images/logo.png",
      telephone: "+1-786-505-5791",
      sameAs: ["https://instagram.com/sitelaunchstudios"],
      areaServed: "Miami, Florida",
      availableLanguage: ["English", "Spanish"],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Small-business website design",
            description:
              "A clear, mobile-first website for services, proof, service area, and contact.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Conversion landing page design",
            description:
              "One focused page for one offer, audience, and conversion path.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website review and improvement",
            description:
              "A focused review of message, mobile layout, forms, speed, and search visibility.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sitelaunchstudios.com/#website",
      name: "SiteLaunch Studios",
      url: "https://sitelaunchstudios.com",
      publisher: { "@id": "https://sitelaunchstudios.com/#business" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://sitelaunchstudios.com/#faq",
      mainEntity: HOMEPAGE_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

