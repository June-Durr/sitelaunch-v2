import React from "react";
import EnhancedHero from "../components/sections/EnhancedHero";
import ServiceTiers from "../components/sections/ServiceTiers";
import Features from "../components/sections/Features";
import TechStack from "../components/sections/TechStack";
import Testimonials from "../components/sections/Testimonials";
import Button from "../components/common/Button";
import CurvedSectionDivider from "../components/common/CurvedSectionDivider";
import { Helmet } from "react-helmet";
import CallToAction from "../components/sections/CallToAction";

// Process section showcasing mobile-first approach
const MobileFirstApproach = () => {
  const benefits = [
    {
      title: "Faster Mobile Load Times",
      description:
        "Optimized performance on mobile networks with streamlined code and efficient resource loading.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Touch-Friendly Navigation",
      description:
        "Intuitive interfaces designed specifically for touch interactions on smartphones and tablets.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
      ),
    },
    {
      title: "Responsive Design",
      description:
        "Layouts that automatically adapt to any screen size, ensuring a consistent experience across all devices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Optimized Media",
      description:
        "Automatically served images and videos in the right format and resolution for each device and connection.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="mobile-first" className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Our Approach
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            Mobile-First Development
          </h2>
          <p className="text-xl text-gray-600">
            We build your digital presence for today's mobile-dominant world,
            ensuring optimal experiences across all devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    {benefit.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Devices mockup */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="relative">
              {/* Desktop */}
              <div className="absolute -left-24 top-6 z-0 bg-white shadow-xl rounded-lg border border-gray-200 w-64 h-44 transform -rotate-6">
                <div className="h-4 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 h-[calc(100%-16px)]"></div>
              </div>

              {/* Tablet */}
              <div className="absolute -right-8 top-16 z-10 bg-white shadow-xl rounded-xl border border-gray-200 w-44 h-56 transform rotate-6">
                <div className="h-2 w-8 bg-gray-300 mx-auto rounded-b-lg"></div>
                <div className="bg-gray-50 h-[calc(100%-8px)]"></div>
              </div>

              {/* Mobile - front and center */}
              <div className="relative z-20 bg-white shadow-xl rounded-3xl border border-gray-200 w-64 h-[480px]">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-full pt-8 pb-4 px-4">
                  <div className="bg-primary-50 h-full rounded-xl flex flex-col justify-between p-3">
                    <div className="space-y-4">
                      <div className="h-2.5 bg-primary-200 rounded-full w-3/4"></div>
                      <div className="h-2.5 bg-primary-100 rounded-full"></div>
                      <div className="h-2.5 bg-primary-100 rounded-full w-5/6"></div>
                      <div className="h-8 bg-primary-300 rounded-lg w-full mt-6"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-24 bg-primary-200 rounded-lg"></div>
                      <div className="h-24 bg-primary-200 rounded-lg"></div>
                      <div className="h-24 bg-primary-200 rounded-lg"></div>
                      <div className="h-24 bg-primary-200 rounded-lg"></div>
                    </div>
                    <div className="h-12 bg-secondary-500 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Target Market section
const TargetMarkets = () => {
  const markets = [
    {
      title: "Small to Medium Businesses in Miami",
      description:
        "Local businesses looking to establish or improve their online presence with conversion-focused websites.",
      icon: "🏢",
      items: [
        "Service-based businesses needing lead generation",
        "E-commerce startups requiring conversion-optimized sites",
        "Professional services firms updating their digital presence",
      ],
    },
    {
      title: "Tech-Conscious Enterprises",
      description:
        "Forward-thinking companies seeking competitive advantage through modern web technology.",
      icon: "🚀",
      items: [
        "Companies wanting to modernize legacy systems",
        "Businesses seeking AI-enhanced user experiences",
        "Organizations requiring complex web applications",
      ],
    },
    {
      title: "Marketing Agencies",
      description:
        "Agencies looking for a reliable technical partner to implement their creative vision.",
      icon: "🤝",
      items: [
        "White-label partnerships for technical implementation",
        "Complementary services for agencies lacking development expertise",
        "Technical support for client website maintenance",
      ],
    },
  ];

  return (
    <section id="who-we-serve" className="py-20 bg-purple-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Who We Serve
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            Tailored Solutions for Your Industry
          </h2>
          <p className="text-xl text-gray-600">
            We specialize in serving the unique needs of these key market
            segments with customized web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">{market.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {market.title}
              </h3>
              <p className="text-gray-600 mb-6">{market.description}</p>
              <ul className="space-y-2">
                {market.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="fade-in">
      {/* SEO Optimization */}
      <Helmet>
        <title>
          SiteLaunch Studios | Mobile-First Web Development Agency Miami
        </title>
        <meta
          name="description"
          content="Miami's tech-forward web development agency specializing in mobile-first, high-performance websites and applications built with React. Get measurable business results."
        />
        <meta
          name="keywords"
          content="web development, mobile-first, Miami, React, web apps, SEO optimization, high-performance websites"
        />
        <link rel="canonical" href="https://sitelaunchstudios.com" />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="SiteLaunch Studios | Mobile-First Web Development Agency"
        />
        <meta
          property="og:description"
          content="Miami's tech-forward web development agency specializing in mobile-first websites & apps that drive measurable business results."
        />
        <meta property="og:url" content="https://sitelaunchstudios.com" />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "SiteLaunch Studios",
              "description": "A Miami-based web development agency specializing in mobile-first, high-performance websites and applications built with modern technologies.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Miami",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.7617",
                "longitude": "80.1918"
              },
              "url": "https://sitelaunchstudios.com",
              "telephone": "+13055551234",
              "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
              "priceRange": "$",
              "image": "https://sitelaunchstudios.com/images/logo.png",
              "sameAs": [
                "https://www.facebook.com/sitelaunchstudios",
                "https://www.linkedin.com/company/sitelaunchstudios",
                "https://twitter.com/sitelaunchstudio"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "25.7617",
                  "longitude": "80.1918"
                },
                "geoRadius": "50000"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile-First Website Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Web Application Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Optimization"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <EnhancedHero />

      {/* Curved section divider after hero with negative margin to overlap */}
      <div className="relative -mt-32 z-10">
        {/* The curved section divider */}
        <CurvedSectionDivider
          fillColor="#f9f7ff"
          position="top"
          height="180px"
        />

        {/* The content that follows with purple background */}
        <div className="bg-purple-50">
          <div className="pt-8">
            <TargetMarkets />
          </div>
        </div>
      </div>

      {/* Service Tiers */}
      <ServiceTiers />

      {/* Mobile-First Approach */}
      <div className="relative">
        <CurvedSectionDivider
          fillColor="#ffffff"
          position="top"
          height="120px"
        />
        <MobileFirstApproach />
      </div>

      {/* Features showing competitive advantages */}
      <Features />

      {/* Tech Stack */}
      <div className="relative">
        <CurvedSectionDivider
          fillColor="#f9f7ff"
          position="top"
          height="120px"
        />
        <div className="bg-purple-50">
          <TechStack />
          <Testimonials />
        </div>
      </div>

      {/* Call to Action with Form Modal */}
      <CallToAction />
    </div>
  );
};

export default Home;
