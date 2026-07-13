import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import GradientBackground from "../common/GradientBackground";

const Features = () => {
  // Competitive advantages based on business model
  const features = [
    {
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
      title: "Mobile-First Development",
      description:
        "We prioritize the mobile experience in a mobile-dominant world, ensuring your site works flawlessly across all devices with optimized performance.",
    },
    {
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
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      title: "AI-Enhanced Solutions",
      description:
        "Leverage AI for content optimization, automated personalization based on user behavior, and predictive analytics for smarter business decisions.",
    },
    {
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "SEO Expertise",
      description:
        "We implement server-side rendering, pre-rendering solutions, and structured data to ensure your React applications achieve maximum visibility in search engines.",
    },
    {
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Measurable Results Focus",
      description:
        "We establish clear KPIs before project start, provide regular reporting on performance metrics, and calculate ROI for your investment.",
    },
    {
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
      title: "Fast Loading Speed",
      description:
        "Optimized for speed with streamlined code, efficient resource loading, and performance optimization techniques for excellent Core Web Vitals scores.",
    },
    {
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: "Modern Tech Stack",
      description:
        "We leverage React, Vite, Tailwind CSS, and AWS for faster builds, better development experience, and scalable, maintainable applications.",
    },
  ];

  const FeatureCard = ({ icon, title, description }) => {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "opacity, transform" }}
        suppressHydrationWarning
        className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-lg p-6 border border-purple-800 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
      >
        {/* Content with z-index to appear above the background */}
        <div className="relative z-10">
          <div className="w-12 h-12 bg-primary-900 text-primary-300 rounded-lg flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* First section with light purple background */}
      <GradientBackground variant="navy">
        <section id="advantages" className="py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              suppressHydrationWarning
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary-300 font-semibold tracking-wider text-sm uppercase">
                Why Choose Us
              </span>
              <h2 className="heading-lg text-white mt-2 mb-4">
                Our Competitive Advantages
              </h2>
              <p className="text-xl text-gray-300">
                SiteLaunch Studios combines technical expertise with business
                insight to deliver web solutions that drive measurable results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Add spacing between sections */}
        <div className="mt-20"></div>
        {/* Second section with gradient background */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            suppressHydrationWarning
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-white mb-4">
                Miami's Tech-Forward Web Agency
              </h3>
              <p className="text-gray-300 mb-6">
                SiteLaunch Studios combines cutting-edge technologies with
                proven business strategies to create websites and applications
                that don't just look great—they deliver measurable business
                results.
              </p>
              <ul className="space-y-3">
                {[
                  "React + Vite for faster loading and better performance",
                  "AWS architecture for scalability and reliability",
                  "AI-powered personalization to enhance user experience",
                  "SEO optimization techniques proven to increase visibility",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="primary" onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}>Start Your Project</Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 max-w-full overflow-hidden">
              <div className="transform scale-90 origin-center">
                {/* Dashboard mockup */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transform rotate-1 relative z-10">
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-xs font-medium text-gray-500">
                      SiteLaunch Analytics Dashboard
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 aspect-video">
                    {/* Dashboard UI mockup */}
                    <div className="w-full h-full bg-white rounded-lg p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg p-3 border border-primary-100">
                          <div className="text-xs text-gray-600 mb-1">
                            Conversion Rate
                          </div>
                          <div className="text-xl font-bold text-primary-600">
                            4.2%
                          </div>
                          <div className="flex items-center text-xs text-green-500">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            <span>+0.8%</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg p-3 border border-primary-100">
                          <div className="text-xs text-gray-600 mb-1">
                            Avg. Session
                          </div>
                          <div className="text-xl font-bold text-primary-600">
                            2:45
                          </div>
                          <div className="flex items-center text-xs text-green-500">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            <span>+0:32</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-28 bg-gray-100 rounded-lg mb-4 flex items-end p-2 overflow-hidden">
                        <div className="w-1/12 h-[10%] bg-primary-300 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[30%] bg-primary-300 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[20%] bg-primary-300 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[40%] bg-primary-300 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[35%] bg-primary-300 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[60%] bg-primary-400 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[75%] bg-primary-500 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[90%] bg-primary-600 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[65%] bg-primary-500 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[80%] bg-primary-500 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[70%] bg-primary-400 mx-px rounded-t"></div>
                        <div className="w-1/12 h-[50%] bg-primary-400 mx-px rounded-t"></div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex justify-between text-xs font-medium text-gray-600 mb-2">
                          <span>Key Metrics</span>
                          <span>Last 30 days</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Page Load Time</span>
                            <span className="text-sm font-medium text-green-600">
                              0.8s
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Bounce Rate</span>
                            <span className="text-sm font-medium text-green-600">
                              28.3%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Goal Completions</span>
                            <span className="text-sm font-medium text-primary-600">
                              237
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second mockup for layered effect */}
                <div className="absolute -bottom-6 -left-6 w-full h-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 z-0 transform -rotate-3"></div>

                {/* Third mockup for deeper layered effect */}
                <div className="absolute -bottom-10 -left-10 w-full h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 z-[-1] transform -rotate-6 opacity-70"></div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-purple-400 opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-primary-400 opacity-30 blur-xl"></div>
              </div>
            </div>
          </motion.div>

          {/* A/B Testing Feature Highlight */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            suppressHydrationWarning
            className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* A/B Testing Visual */}
            <div className="relative max-w-full overflow-hidden">
              <div className="relative transform scale-90 origin-center">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transform -rotate-1 relative z-10">
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                    <div className="flex space-x-2 mr-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                      SiteLaunch A/B Testing Dashboard
                    </div>
                  </div>
                  <div className="p-5 bg-gray-50">
                    {/* Split test visualization */}
                    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-sm p-4">
                      <div className="text-center mb-3 font-bold text-gray-800 text-lg">
                        Landing Page Conversion Rate Comparison
                      </div>

                      {/* Test description */}
                      {/* Each text run is an explicit single-line {" "}
                          expression, not multi-line JSX text: Babel's
                          whitespace-collapsing for multi-line JSX text can
                          split/merge text nodes differently than the browser
                          does when re-parsing the prerendered static HTML,
                          causing a hydration text-node-count mismatch even
                          though the visible content is identical. */}
                      <div className="mb-4 text-xs text-gray-600 px-2 text-center bg-gray-50 py-2 rounded-md border border-gray-100">
                        <span className="font-medium">Test duration:</span>
                        {" 30 days | "}
                        <span className="font-medium">Traffic:</span>
                        {" 10,500 visitors | "}
                        <span className="font-medium">Goal:</span>
                        {" Lead form submissions"}
                      </div>

                      <div className="flex-1 flex space-x-6 pb-2">
                        <div className="flex-1 flex flex-col">
                          {/* Version A content */}
                          <div className="bg-gray-100 p-3 rounded-md mb-3 border border-gray-200">
                            <div className="font-semibold text-gray-800 text-sm flex justify-between items-center">
                              <span>Standard Design</span>
                              <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                                Version A
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-gray-600">
                                <div className="flex items-center mb-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1 text-blue-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>Traditional layout</span>
                                </div>
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1 text-blue-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>Standard CTA</span>
                                </div>
                              </div>
                              <div className="bg-white rounded-md p-2 shadow-sm border border-gray-200">
                                <div className="text-xs text-gray-700 font-medium text-center mb-1">
                                  Engagement
                                </div>
                                {/* Mini chart for Version A */}
                                <div className="flex h-8 items-end space-x-0.5">
                                  <div className="w-1.5 h-[20%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[30%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[25%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[40%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[35%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[45%] bg-blue-300 rounded-t"></div>
                                  <div className="w-1.5 h-[55%] bg-blue-400 rounded-t"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Metrics for Version A */}
                          <div className="flex space-x-3 mb-4">
                            <div className="flex-1 bg-white rounded p-2 shadow-sm text-center border border-gray-100">
                              <div className="text-xs text-gray-500">
                                Avg. Time
                              </div>
                              <div className="text-sm font-bold text-blue-500">
                                1:45
                              </div>
                            </div>
                            <div className="flex-1 bg-white rounded p-2 shadow-sm text-center border border-gray-100">
                              <div className="text-xs text-gray-500">
                                Bounce
                              </div>
                              <div className="text-sm font-bold text-blue-500">
                                42%
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 flex items-end">
                            <div className="w-full">
                              <div className="w-full bg-blue-400 rounded-t-md h-[60%] shadow-inner"></div>
                              <div className="mt-3 text-center">
                                <div className="text-xs text-gray-700 mb-1">
                                  Conversion Rate
                                </div>
                                <div className="font-medium text-blue-500 text-lg">
                                  11.9%
                                </div>
                                <div className="text-xs text-gray-500">
                                  1,250 conversions
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-r border-gray-200"></div>

                        <div className="flex-1 flex flex-col">
                          {/* Version B content */}
                          <div className="bg-primary-50 p-3 rounded-md mb-3 border border-primary-100">
                            <div className="font-semibold text-primary-700 text-sm flex justify-between items-center">
                              <span>Mobile-First Design</span>
                              <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full border border-primary-100">
                                Version B
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-primary-700">
                                <div className="flex items-center mb-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1 text-primary-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>Responsive layout</span>
                                </div>
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1 text-primary-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>AI-enhanced UX</span>
                                </div>
                              </div>
                              <div className="bg-white rounded-md p-2 shadow-sm border border-primary-100">
                                <div className="text-xs text-gray-700 font-medium text-center mb-1">
                                  Engagement
                                </div>
                                {/* Mini chart for Version B */}
                                <div className="flex h-8 items-end space-x-0.5">
                                  <div className="w-1.5 h-[40%] bg-primary-300 rounded-t"></div>
                                  <div className="w-1.5 h-[50%] bg-primary-300 rounded-t"></div>
                                  <div className="w-1.5 h-[60%] bg-primary-400 rounded-t"></div>
                                  <div className="w-1.5 h-[70%] bg-primary-400 rounded-t"></div>
                                  <div className="w-1.5 h-[65%] bg-primary-400 rounded-t"></div>
                                  <div className="w-1.5 h-[80%] bg-primary-500 rounded-t"></div>
                                  <div className="w-1.5 h-[90%] bg-primary-500 rounded-t"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Metrics for Version B */}
                          <div className="flex space-x-3 mb-4">
                            <div className="flex-1 bg-white rounded p-2 shadow-sm text-center border border-primary-50">
                              <div className="text-xs text-gray-500">
                                Avg. Time
                              </div>
                              <div className="text-sm font-bold text-primary-500">
                                2:37
                              </div>
                            </div>
                            <div className="flex-1 bg-white rounded p-2 shadow-sm text-center border border-primary-50">
                              <div className="text-xs text-gray-500">
                                Bounce
                              </div>
                              <div className="text-sm font-bold text-primary-500">
                                28%
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 flex items-end">
                            <div className="w-full">
                              <div className="w-full bg-primary-500 rounded-t-md h-[85%] shadow-inner"></div>
                              <div className="mt-3 text-center">
                                <div className="text-xs text-gray-700 mb-1">
                                  Conversion Rate
                                </div>
                                <div className="font-medium text-primary-500 text-lg">
                                  17.0%
                                </div>
                                <div className="text-xs text-gray-500">
                                  1,785 conversions
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Results summary with improvement indicator */}
                      <div className="bg-gradient-to-r from-green-50 to-primary-50 rounded-lg p-3 flex justify-between items-center mt-1 border border-green-100">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Results:</span>
                          {" SiteLaunch's mobile-first approach delivered measurable ROI"}
                        </div>
                        <div className="flex items-center bg-white px-3 py-1.5 rounded-md border border-green-200 shadow-sm">
                          <svg
                            className="w-4 h-4 text-green-500 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                          <span className="text-sm font-bold text-green-600">
                            +42% Conversion Improvement
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-400 opacity-20 rounded-full blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-400 opacity-20 rounded-full blur-xl"></div>

                {/* Second mockup for depth */}
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 z-[-1] transform rotate-3 opacity-70"></div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Data-Driven Optimization
              </h3>
              <p className="text-gray-300 mb-6">
                We don't just build websites and walk away. Our approach
                involves continuous testing, measuring, and optimizing to ensure
                your digital presence delivers maximum ROI.
              </p>
              <ul className="space-y-3">
                {[
                  "Comprehensive analytics setup to track key metrics",
                  "A/B testing to determine the most effective designs",
                  "Conversion rate optimization backed by user data",
                  "Regular performance reports with actionable insights",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="primary" onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}>Optimize Your Site</Button>
              </div>
            </div>
            <div className="mt-20"></div>
            <div className="mt-20"></div>
          </motion.div>
        </div>
      </GradientBackground>
    </>
  );
};

export default Features;
