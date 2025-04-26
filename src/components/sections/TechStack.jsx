import React from "react";
import { motion } from "framer-motion";

const TechStack = () => {
  const techs = [
    {
      category: "Frontend",
      items: [
        {
          name: "React",
          description: "Modern JavaScript library for building user interfaces",
          icon: "react.svg",
          color: "bg-blue-100 text-blue-500",
        },
        {
          name: "Vite",
          description: "Next-generation frontend build tool with faster builds",
          icon: "vite.svg",
          color: "bg-purple-100 text-purple-500",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid UI development",
          icon: "tailwind.svg",
          color: "bg-cyan-100 text-cyan-500",
        },
        {
          name: "Framer Motion",
          description: "Production-ready motion library for React",
          icon: "framer.svg",
          color: "bg-pink-100 text-pink-500",
        },
      ],
    },
    {
      category: "Backend & Infrastructure",
      items: [
        {
          name: "AWS Amplify",
          description: "Deployment and hosting with continuous integration",
          icon: "aws.svg",
          color: "bg-orange-100 text-orange-500",
        },
        {
          name: "AWS Lambda",
          description: "Serverless function execution for form handling",
          icon: "lambda.svg",
          color: "bg-orange-100 text-orange-500",
        },
        {
          name: "AWS SES",
          description: "Reliable email handling for contact forms",
          icon: "ses.svg",
          color: "bg-orange-100 text-orange-500",
        },
        {
          name: "Vercel",
          description: "Alternative deployment platform for specific use cases",
          icon: "vercel.svg",
          color: "bg-gray-100 text-gray-800",
        },
      ],
    },
    {
      category: "Content & Analytics",
      items: [
        {
          name: "Contentful / Sanity",
          description: "Headless CMS for easy content management",
          icon: "cms.svg",
          color: "bg-green-100 text-green-500",
        },
        {
          name: "Google Analytics 4",
          description: "Advanced analytics with custom event tracking",
          icon: "analytics.svg",
          color: "bg-yellow-100 text-yellow-600",
        },
        {
          name: "Structured Data",
          description: "Schema markup for enhanced search results",
          icon: "schema.svg",
          color: "bg-blue-100 text-blue-600",
        },
        {
          name: "AI Integrations",
          description: "Custom AI solutions for personalization",
          icon: "ai.svg",
          color: "bg-indigo-100 text-indigo-500",
        },
      ],
    },
  ];

  return (
    <section id="tech" className="py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Our Technology
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            Modern Tech Stack & Architecture
          </h2>
          <p className="text-xl text-gray-600">
            We leverage cutting-edge technologies and proven architecture
            patterns to create high-performance, scalable web solutions.
          </p>
        </div>

        <div className="space-y-16">
          {techs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: techIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 ${tech.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      {/* Placeholder for tech icon */}
                      <div className="text-xl font-bold">
                        {tech.name.charAt(0)}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {tech.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Architecture Diagram */}
        <div className="mt-24 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Solution Architecture
          </h3>
          <div className="relative h-[400px] mx-auto max-w-4xl">
            {/* Architecture diagram visualization */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-36 h-20 bg-primary-100 rounded-lg border border-primary-200 flex items-center justify-center text-primary-700 font-medium">
              React Frontend
            </div>

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="50%"
                y1="20"
                x2="50%"
                y2="80"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="50%"
                y1="80"
                x2="25%"
                y2="150"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="50%"
                y1="80"
                x2="75%"
                y2="150"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="25%"
                y1="150"
                x2="25%"
                y2="220"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="75%"
                y1="150"
                x2="75%"
                y2="220"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="25%"
                y1="220"
                x2="12.5%"
                y2="290"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="25%"
                y1="220"
                x2="37.5%"
                y2="290"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="75%"
                y1="220"
                x2="62.5%"
                y2="290"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="75%"
                y1="220"
                x2="87.5%"
                y2="290"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Deployment layer */}
            <div className="absolute left-1/2 top-[80px] transform -translate-x-1/2 w-52 h-16 bg-green-100 rounded-lg border border-green-200 flex items-center justify-center text-green-700 font-medium">
              CI/CD Pipeline
            </div>

            {/* Service layer */}
            <div className="absolute left-1/4 top-[150px] transform -translate-x-1/2 w-40 h-16 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center text-blue-700 font-medium">
              AWS Amplify / Vercel
            </div>

            <div className="absolute left-3/4 top-[150px] transform -translate-x-1/2 w-40 h-16 bg-orange-100 rounded-lg border border-orange-200 flex items-center justify-center text-orange-700 font-medium">
              Headless CMS
            </div>

            {/* Function layer */}
            <div className="absolute left-1/4 top-[220px] transform -translate-x-1/2 w-36 h-16 bg-purple-100 rounded-lg border border-purple-200 flex items-center justify-center text-purple-700 font-medium">
              AWS Lambda
            </div>

            <div className="absolute left-3/4 top-[220px] transform -translate-x-1/2 w-36 h-16 bg-yellow-100 rounded-lg border border-yellow-200 flex items-center justify-center text-yellow-700 font-medium">
              Analytics
            </div>

            {/* Bottom layer */}
            <div className="absolute left-[12.5%] top-[290px] transform -translate-x-1/2 w-24 h-16 bg-indigo-100 rounded-lg border border-indigo-200 flex items-center justify-center text-indigo-700 font-medium text-sm">
              Forms
            </div>

            <div className="absolute left-[37.5%] top-[290px] transform -translate-x-1/2 w-24 h-16 bg-red-100 rounded-lg border border-red-200 flex items-center justify-center text-red-700 font-medium text-sm">
              SES Email
            </div>

            <div className="absolute left-[62.5%] top-[290px] transform -translate-x-1/2 w-24 h-16 bg-green-100 rounded-lg border border-green-200 flex items-center justify-center text-green-700 font-medium text-sm">
              SEO
            </div>

            <div className="absolute left-[87.5%] top-[290px] transform -translate-x-1/2 w-24 h-16 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center text-blue-700 font-medium text-sm">
              Tracking
            </div>
          </div>
        </div>

        {/* Why Our Tech Matters */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Our Tech Stack Matters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                Speed
              </div>
              <p className="text-gray-700">
                Our tech stack is optimized for performance with faster builds,
                efficient code delivery, and optimized assets for quicker load
                times.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                Scalability
              </div>
              <p className="text-gray-700">
                AWS infrastructure ensures your website can handle traffic
                spikes and grow alongside your business without performance
                issues.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                Security
              </div>
              <p className="text-gray-700">
                Modern security practices and AWS's enterprise-grade
                infrastructure protect your site and customer data.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                Flexibility
              </div>
              <p className="text-gray-700">
                Component-based architecture allows for rapid updates and easy
                maintenance as your business requirements evolve.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                SEO
              </div>
              <p className="text-gray-700">
                Server-side rendering and static generation options ensure
                excellent search engine visibility despite React's dynamic
                nature.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-2xl text-primary-500 font-bold mb-3">
                ROI
              </div>
              <p className="text-gray-700">
                Advanced analytics and testing capabilities allow for continuous
                optimization and maximum return on your investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
