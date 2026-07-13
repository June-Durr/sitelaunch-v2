import React, { useEffect } from "react";
import EnhancedHero from "../components/sections/EnhancedHero";
import ServiceTiers from "../components/sections/ServiceTiers";
import Features from "../components/sections/Features";
import TechStack from "../components/sections/TechStack";
import Testimonials from "../components/sections/Testimonials";
import Button from "../components/common/Button";
import CurvedSectionDivider from "../components/common/CurvedSectionDivider";
import SEOHead from "../components/common/SEOHead";
import OptimizedImage from "../components/common/OptimizedImage";
import CallToAction from "../components/sections/CallToAction";
import analytics from "../services/analytics";

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

  const handleLearnMoreClick = () => {
    analytics.trackButtonClick(
      "learn_more_mobile_first",
      "mobile_first_section"
    );
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="mobile-first" className="py-20 bg-purple-50">
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
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className="relative perspective-[1000px] transform-style-preserve-3d scale-75 md:scale-90 lg:scale-100 mx-auto"
              style={{ maxWidth: "95%" }}
              suppressHydrationWarning
            >
              {/* Mobile - front and center */}
              <div className="relative z-30 bg-white shadow-xl rounded-3xl border border-gray-200 w-72 h-[560px] transform rotate-1">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-full pt-8 pb-4 px-4">
                  <div className="bg-primary-50 h-full rounded-xl flex flex-col justify-between p-3">
                    {/* Mobile header with time and icons */}
                    <div className="flex justify-between items-center mb-3 px-1">
                      <div className="text-[10px] font-medium text-gray-700">
                        9:41
                      </div>
                      <div className="flex space-x-1">
                        <div className="text-[8px] text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2.5 w-2.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <div className="text-[8px] text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2.5 w-2.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="text-[8px] text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2.5 w-2.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-.1a5 5 0 119.9 0v.1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v1h2V8a1 1 0 00-1-1zm-7 1a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-8 bg-primary-500 rounded-lg w-36 flex items-center justify-center mx-auto">
                        <span className="text-[11px] text-white font-medium">
                          SiteLaunch
                        </span>
                      </div>
                      <div className="h-3 bg-primary-200 rounded-full w-3/4"></div>
                      <div className="h-3 bg-primary-100 rounded-full"></div>
                      <div className="h-3 bg-primary-100 rounded-full w-5/6"></div>
                      <div className="h-10 bg-secondary-500 rounded-lg w-full mt-6 flex items-center justify-center">
                        <span className="text-[12px] text-white font-medium">
                          Learn More
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 ml-1 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Content grid with small icons */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-28 bg-primary-200 rounded-lg flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-primary-700 font-medium">
                          Home
                        </span>
                      </div>
                      <div className="h-28 bg-primary-200 rounded-lg flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-primary-700 font-medium">
                          Services
                        </span>
                      </div>
                      <div className="h-28 bg-primary-200 rounded-lg flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[10px] text-primary-700 font-medium">
                          About
                        </span>
                      </div>
                      <div className="h-28 bg-primary-200 rounded-lg flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[10px] text-primary-700 font-medium">
                          Contact
                        </span>
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="h-12 bg-secondary-500 rounded-lg w-full flex items-center justify-center">
                      <span className="text-[11px] text-white font-medium">
                        Get Free Consultation
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Add performance indicator badge */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold rounded-full h-10 w-10 flex items-center justify-center border-2 border-white shadow-lg z-40">
                  98%
                </div>
              </div>

              {/* Tablet - behind left */}
              <div className="absolute -left-28 top-16 z-20 bg-white shadow-xl rounded-2xl border border-gray-200 w-60 h-[380px] transform -rotate-12">
                <div className="h-4 w-10 bg-gray-300 mx-auto rounded-b-lg"></div>
                <div className="bg-gray-50 h-[calc(100%-16px)] p-3">
                  {/* Tablet website mockup content */}
                  <div className="h-6 bg-primary-500 rounded-md mb-3 w-28 flex items-center justify-center">
                    <div className="text-[8px] text-white font-medium">
                      SiteLaunch
                    </div>
                  </div>
                  <div className="h-28 bg-gradient-to-br from-purple-500 to-primary-700 rounded-md mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-center p-3">
                      <div className="h-2 bg-white/80 rounded-full w-20 mb-1"></div>
                      <div className="h-1.5 bg-white/60 rounded-full w-16 mb-2"></div>
                      <div className="h-5 w-16 bg-secondary-500 rounded-sm text-[6px] text-white font-bold flex items-center justify-center">
                        GET STARTED
                      </div>
                    </div>
                    <div className="absolute right-2 bottom-2 h-12 w-12 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                      <div className="h-10 w-10 bg-white/20 rounded-md transform rotate-6 flex items-center justify-center">
                        <span className="text-[6px] text-white font-bold">
                          APP
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    <div className="h-2 bg-gray-300 rounded-full w-full"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-5/6"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-4/6"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-12 bg-primary-100 rounded-md p-1 flex flex-col items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-full mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      </div>
                      <span className="text-[6px] text-primary-700">
                        Feature
                      </span>
                    </div>
                    <div className="h-12 bg-primary-100 rounded-md p-1 flex flex-col items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-full mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      </div>
                      <span className="text-[6px] text-primary-700">
                        Feature
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop - behind right */}
              <div className="absolute -right-36 top-16 z-10 bg-white shadow-xl rounded-lg border border-gray-200 w-96 h-[320px] transform rotate-12">
                <div className="h-6 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-2 text-[8px] text-gray-400">
                    sitelaunch.com
                  </div>
                </div>
                <div className="p-3 bg-gray-50 h-[calc(100%-24px)]">
                  {/* Desktop website mockup content */}
                  <div className="flex h-full">
                    <div className="w-2/3 pr-2">
                      <div className="h-6 bg-primary-500 rounded-md w-36 flex items-center justify-center mb-3">
                        <span className="text-[9px] text-white font-medium">
                          SiteLaunch
                        </span>
                      </div>
                      <div className="h-32 bg-gradient-to-br from-purple-600 to-primary-700 rounded-md mb-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary-400/30 rounded-full blur-md transform translate-x-5 -translate-y-5"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-400/30 rounded-full blur-md transform -translate-x-5 translate-y-5"></div>
                        <div className="absolute inset-0 flex flex-col justify-center p-4">
                          <div className="h-2 bg-white/80 rounded-full w-36 mb-1"></div>
                          <div className="h-1.5 bg-white/60 rounded-full w-28 mb-3"></div>
                          <div className="flex space-x-2">
                            <div className="h-6 w-24 bg-secondary-500 rounded-md text-[8px] text-white font-bold flex items-center justify-center">
                              GET STARTED
                            </div>
                            <div className="h-6 w-6 bg-white/10 rounded-md flex items-center justify-center">
                              <span className="text-[10px] text-white">→</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute right-3 bottom-3 h-16 w-16 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                          <div className="h-14 w-14 bg-white/20 rounded-md transform rotate-6 flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">
                              APP
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-5/6"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-4/6"></div>
                      </div>
                      <div className="h-8 bg-secondary-500 rounded-md w-36 flex items-center justify-center">
                        <span className="text-[9px] text-white font-medium">
                          Learn More
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 ml-1 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="w-1/3 pl-2">
                      <div className="bg-white rounded-md shadow-sm p-2 mb-3">
                        <div className="text-[7px] font-medium text-gray-700 mb-1">
                          Fast Performance
                        </div>
                        <div className="flex items-center">
                          <div className="text-[12px] font-bold text-primary-500">
                            98%
                          </div>
                          <div className="ml-1 text-[6px] text-green-500 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-2 w-2 mr-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            +23%
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-md shadow-sm p-2 mb-3">
                        <div className="text-[7px] font-medium text-gray-700 mb-1">
                          Mobile Score
                        </div>
                        <div className="flex items-center">
                          <div className="text-[12px] font-bold text-primary-500">
                            100%
                          </div>
                          <div className="ml-1 text-[6px] text-green-500 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-2 w-2 mr-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            +15%
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-md shadow-sm p-2">
                        <div className="text-[7px] font-medium text-gray-700 mb-1">
                          Conversion Rate
                        </div>
                        <div className="flex items-center">
                          <div className="text-[12px] font-bold text-secondary-500">
                            +42%
                          </div>
                          <div className="ml-1 text-[6px] text-green-500 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-2 w-2 mr-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Industry Leading
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add floating labels */}
              <div className="absolute -bottom-6 left-20 bg-white shadow-sm rounded px-3 py-1.5 text-xs text-primary-600 font-medium border border-primary-100 z-30">
                Mobile-First Design
              </div>
              <div className="absolute right-20 top-10 bg-white shadow-sm rounded px-3 py-1.5 text-xs text-secondary-500 font-medium border border-secondary-100 z-30">
                Responsive Layout
              </div>
              <div className="absolute left-6 top-28 bg-white shadow-sm rounded px-3 py-1.5 text-xs text-purple-500 font-medium border border-purple-100 z-30">
                Touch Optimized
              </div>

              {/* 3D shadow effect */}
              <div className="absolute top-6 left-1/2 -z-10 w-[70%] h-[80%] blur-xl opacity-20 bg-gradient-to-b from-primary-600 to-purple-700 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" onClick={handleLearnMoreClick}>
            Learn More About Our Process
          </Button>
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

  const handleMarketClick = (marketTitle) => {
    analytics.trackEvent("market_segment_interest", {
      category: "engagement",
      label: marketTitle,
      market_type: marketTitle.toLowerCase().replace(/\s+/g, "_"),
    });
  };

  return (
    <section id="who-we-serve" className="py-20 bg-purple-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            WHO WE SERVE
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
              className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => handleMarketClick(market.title)}
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
  // Track page view on component mount - with proper singleton check
  useEffect(() => {
    let scrollTimeout;
    let hasTrackedPageView = false;

    const initializePageTracking = async () => {
      // Only track page view once
      if (!hasTrackedPageView) {
        analytics.trackPageView("/", "Home - SiteLaunch Studios");
        hasTrackedPageView = true;
      }
    };

    initializePageTracking();

    // Track scroll depth with throttling
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100
        );

        // Track at specific milestones
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          analytics.trackScroll(scrollPercent);
        }
      }, 500); // Throttle to every 500ms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []); // Empty dependency array

  // Structured data for the homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SiteLaunch Studios",
    description:
      "A Miami-based web development agency specializing in mobile-first, high-performance websites and applications built with modern technologies.",
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
    priceRange: "$$",
    image: "https://sitelaunchstudios.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/sitelaunchstudios",
      "https://www.linkedin.com/in/sitelaunch-studios/",
      "https://www.instagram.com/sitelaunchstudios/",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "25.7617",
        longitude: "-80.1918",
      },
      geoRadius: "50000",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile-First Website Development",
          description:
            "Custom responsive websites optimized for mobile devices",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Application Development",
          description: "React-based web applications with modern functionality",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Optimization",
          description: "Search engine optimization for increased visibility",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Optimization",
          description: "Website speed and performance improvements",
        },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5",
    },
  };

  return (
    <div className="fade-in">
      {/* SEO Optimization */}
      <SEOHead
        title="SiteLaunch Studios | Mobile-First Web Development Agency Miami"
        description="Miami's tech-forward web development agency specializing in mobile-first, high-performance websites and applications built with React. Get measurable business results with AI-enhanced solutions."
        keywords="web development Miami, mobile-first websites, React development, SEO optimization Miami, web design Miami, AI integration, high-performance websites, Miami web agency"
        url="https://sitelaunchstudios.com"
        image="https://sitelaunchstudios.com/images/og-image.png"
        structuredData={homepageStructuredData}
      />

      <EnhancedHero />

      {/* Curved section divider after hero with negative margin to overlap */}
      <div className="relative -mt-60 z-10">
        {/* The curved section divider */}
        <CurvedSectionDivider
          fillColor="#f9f7ff"
          position="top"
          height="80px"
          backgroundColor="#17093d"
        />

        {/* The content that follows with purple background */}
        <div className="bg-purple-50">
          <div className="pt-2">
            <TargetMarkets />
          </div>
        </div>
      </div>

      {/* Service Tiers with purple background */}
      <section className="bg-purple-50">
        <ServiceTiers />
      </section>

      {/* Mobile-First Approach section with proper background */}
      <section className="bg-purple-50">
        <MobileFirstApproach />
      </section>

      {/* Features showing competitive advantages */}
      <Features />

      {/* Tech Stack */}
      <div className="relative">
        <CurvedSectionDivider
          fillColor="#f9f7ff"
          position="top"
          height="80px"
          backgroundColor="#ffffff"
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
