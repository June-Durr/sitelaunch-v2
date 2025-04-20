import React from "react";
import Button from "../components/common/Button";

const TemplateCard = ({ title, image, category, tags }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={image || "/images/template-placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white text-gray-700 text-xs font-medium py-1 px-2 rounded">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            Preview
          </Button>
          <Button variant="primary" size="sm">
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
};

const Templates = () => {
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
    {
      title: "Product Launch",
      category: "Marketing",
      image: "/images/template-4.jpg",
      tags: ["Product", "Launch", "Promotion"],
    },
    {
      title: "Newsletter Signup",
      category: "Lead Generation",
      image: "/images/template-5.jpg",
      tags: ["Email", "Newsletter", "Minimal"],
    },
    {
      title: "E-Book Download",
      category: "Content",
      image: "/images/template-6.jpg",
      tags: ["Download", "E-Book", "Content Marketing"],
    },
  ];

  const categories = [
    "All Templates",
    "Sales Pages",
    "Lead Generation",
    "Webinar",
    "Product Launch",
    "Coming Soon",
    "Thank You Page",
  ];

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container-custom">
          <h1 className="heading-lg text-center mb-6">
            Choose from 100+ Professional Templates
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Get started quickly with beautifully designed, high-converting
            landing page templates.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  index === 0
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <TemplateCard
                key={index}
                title={template.title}
                category={template.category}
                image={template.image}
                tags={template.tags}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Templates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
