import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import GradientBackground from "../common/GradientBackground";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-12 h-12 bg-primary-100 text-primary-500 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

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

  return (
    <>
      {/* First section with light purple background */}
      <section id="advantages" className="py-20 bg-purple-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
              Why Choose Us
            </span>
            <h2 className="heading-lg text-gray-900 mt-2 mb-4">
              Our Competitive Advantages
            </h2>
            <p className="text-xl text-gray-600">
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

      {/* Second section with gradient background */}
      <GradientBackground variant="dark" waveEffect={true} className="py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
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
                <Button variant="primary">Start Your Project</Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              {/* Dashboard mockup */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform rotate-1 relative z-10">
                <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-500">
                    Analytics Dashboard
                  </div>
                </div>
                <div className="p-4 bg-gray-50 aspect-video">
                  {/* Dashboard UI mockup */}
                  <div className="w-full h-full bg-white rounded-lg p-4 shadow-sm">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-primary-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">
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
                      <div className="bg-primary-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">
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
                    <div className="h-24 bg-gray-100 rounded-lg mb-4 flex items-end p-2">
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
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Key Metrics</span>
                        <span>Last 30 days</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Page Load Time</span>
                          <span className="text-sm font-medium">0.8s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Bounce Rate</span>
                          <span className="text-sm font-medium">28.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Goal Completions</span>
                          <span className="text-sm font-medium">237</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second mockup for layered effect */}
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-0 transform -rotate-2"></div>
            </div>
          </motion.div>

          {/* A/B Testing Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              {/* A/B Testing Visual */}
              <div className="relative">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform -rotate-1">
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                    <div className="ml-4 text-xs text-gray-500">
                      Conversion Optimization
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 aspect-video">
                    {/* Split test visualization */}
                    <div className="w-full h-full flex flex-col">
                      <div className="text-center mb-4 font-bold text-gray-700">
                        A/B Test Results
                      </div>
                      <div className="flex-1 flex items-end space-x-4 pb-8">
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-400 rounded-t-md"
                            style={{ height: "60%" }}
                          ></div>
                          <div className="mt-2 text-sm text-gray-600">
                            Version A
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-primary-500 rounded-t-md"
                            style={{ height: "85%" }}
                          ></div>
                          <div className="mt-2 text-sm text-gray-600">
                            Version B
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-sm font-bold text-primary-500">
                        +42% Conversion Improvement
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400 opacity-20 rounded-full blur-xl"></div>
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
                <Button variant="primary">Optimize Your Site</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </GradientBackground>
    </>
  );
};

export default Features;
