import React from "react";
import EnhancedHero from "../components/sections/EnhancedHero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import Button from "../components/common/Button";

// Additional sections for a complete landing page
const TemplateShowcase = () => {
  const templates = [
    {
      title: "Modern Sales Page",
      category: "Sales",
      image: "/images/template-1.jpg",
      tags: ["High Conversion", "Business", "Services"],
    },
    {
      title: "Startup Landing Page",
      category: "Lead Generation",
      image: "/images/template-2.jpg",
      tags: ["Startup", "SaaS", "Modern"],
    },
    {
      title: "Webinar Registration",
      category: "Event",
      image: "/images/template-3.jpg",
      tags: ["Webinar", "Registration", "Lead Capture"],
    },
  ];

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg text-gray-900 mb-4">
            Beautiful, high-converting templates
          </h2>
          <p className="text-xl text-gray-600">
            Start with one of our professionally designed templates and
            customize it to fit your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={template.image || "/images/template-placeholder.jpg"}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-white text-gray-700 text-xs font-medium py-1 px-2 rounded">
                    {template.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {template.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary-500 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-lg mb-6">Ready to grow your business?</h2>
          <p className="text-xl mb-8">
            Start creating high-converting landing pages in minutes with our
            easy-to-use platform.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="px-8 py-3 text-lg bg-white text-primary-500 hover:bg-gray-100"
          >
            Start Your Free Trial
          </Button>
          <p className="mt-4 text-sm text-primary-100">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

const IntegrationSection = () => {
  const integrations = [
    "mailchimp.svg",
    "salesforce.svg",
    "hubspot.svg",
    "zapier.svg",
    "stripe.svg",
    "wordpress.svg",
  ];

  return (
    <section id="integrations" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-gray-900 mb-4">
            Integrate with your favorite tools
          </h2>
          <p className="text-xl text-gray-600">
            Connect with over 40+ tools and platforms to automate your marketing
            workflow.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="w-24 h-16 flex items-center justify-center"
            >
              <div className="bg-gray-200 rounded w-full h-12"></div>
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
      <EnhancedHero />
      <Features />
      <TemplateShowcase />
      <Testimonials />
      <IntegrationSection />
      <Pricing />
      <CallToAction />
    </div>
  );
};

export default Home;
