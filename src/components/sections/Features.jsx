import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import GradientBackground from "../common/GradientBackground"; // Import the component

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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      title: "Drag & Drop Builder",
      description:
        "Create professional landing pages without any coding knowledge using our intuitive drag and drop builder.",
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "A/B Testing",
      description:
        "Test different versions of your pages to see what converts best and continuously improve your results.",
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
      title: "Analytics & Tracking",
      description:
        "Monitor your landing page performance with built-in analytics and conversion tracking.",
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Integration",
      description:
        "Connect with your favorite email marketing platforms to automatically collect and nurture leads.",
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
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Mobile Responsive",
      description:
        "All landing pages are fully responsive and look great on any device, from desktop to mobile.",
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
      title: "Fast Loading",
      description:
        "Optimized for speed to ensure visitors stay engaged and don't bounce due to slow load times.",
    },
  ];

  return (
    <>
      {/* First section with light purple background */}
      <section id="features" className="py-20 bg-purple-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="heading-lg text-gray-900 mb-4">
              Everything you need to create high-converting landing pages
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides all the tools you need to build, optimize,
              and convert visitors into loyal customers.
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
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-white mb-4">
                Intuitive Drag & Drop Builder
              </h3>
              <p className="text-gray-300 mb-6">
                Create high-converting landing pages without writing a single
                line of code. Our drag-and-drop builder makes it easy to
                customize templates or build pages from scratch.
              </p>
              <ul className="space-y-3">
                {[
                  "No coding or design skills required",
                  "100+ pre-designed section templates",
                  "Full customization for fonts, colors, and layouts",
                  "Mobile-responsive by default",
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
                <Button variant="primary">Start Building Now</Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              {/* Builder Screenshot with enhanced visuals */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform rotate-1 relative z-10">
                <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-500">Page Builder</div>
                </div>
                <div className="p-4 bg-gray-50 aspect-video flex items-center justify-center">
                  {/* Replace with actual builder screenshot */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Drag & Drop Builder Preview</p>
                  </div>
                </div>
              </div>
              {/* Second screenshot for layered effect */}
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
                      A/B Test Results
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 aspect-video">
                    {/* Fake chart */}
                    <div className="w-full h-full flex flex-col">
                      <div className="text-center mb-4 font-bold text-gray-700">
                        Conversion Rate
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
                        +45% Improvement
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
                Optimize with A/B Testing
              </h3>
              <p className="text-gray-300 mb-6">
                Create multiple landing page variations to better understand
                what drives action with your audience. Experiment with different
                headlines, images, CTAs, and more to continuously optimize your
                page.
              </p>
              <ul className="space-y-3">
                {[
                  "Test different page versions side by side",
                  "Get detailed performance analytics",
                  "Automatically direct traffic to the winner",
                  "Continuously improve your conversion rates",
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
                <Button variant="primary">Optimize Performance</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </GradientBackground>
    </>
  );
};

export default Features;
