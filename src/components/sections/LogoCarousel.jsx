import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const LogoCarousel = () => {
  // Company logos array - replace these with your actual logo images
  const logos = [
    {
      id: 1,
      name: "Harvard Business Review",
      src: "/images/logo-placeholder.svg",
    },
    { id: 2, name: "Chomps", src: "/images/logo-placeholder.svg" },
    { id: 3, name: "eBay", src: "/images/logo-placeholder.svg" },
    { id: 4, name: "Vimeo", src: "/images/logo-placeholder.svg" },
    { id: 5, name: "Zapier", src: "/images/logo-placeholder.svg" },
    { id: 6, name: "Shopify", src: "/images/logo-placeholder.svg" },
    { id: 7, name: "SoundCloud", src: "/images/logo-placeholder.svg" },
    {
      id: 8,
      name: "Harvard Business Review",
      src: "/images/logo-placeholder.svg",
    },
    { id: 9, name: "Chomps", src: "/images/logo-placeholder.svg" },
  ];

  // Doubled array for seamless looping
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-purple-50 overflow-hidden">
      <div className="container-custom">
        <div className="relative">
          {/* Curved background with gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-0 right-0 h-48 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          {/* Proof is in the performance section */}
          <div className="relative z-10 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Proof is in the{" "}
                  <span className="text-purple-500">performance</span>
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl">
                  Leadpages empowers you to drive more leads, backed by
                  actionable conversion data and proven results. With millions
                  of clicks per day, we help businesses like yours succeed.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-6">
                <div className="text-right">
                  <div className="text-4xl text-purple-600 font-bold">
                    466k<span className="text-xl">+</span>
                  </div>
                  <p className="text-gray-600">businesses served worldwide</p>
                </div>

                <div className="text-right">
                  <div className="text-4xl text-purple-600 font-bold">
                    9.1m<span className="text-xl">+</span>
                  </div>
                  <p className="text-gray-600">leads collected per month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo carousel with continuous animation */}
      <div className="relative overflow-hidden py-6">
        {/* Gradient fades on the sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-purple-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-purple-50 to-transparent z-10"></div>

        {/* First carousel track (for double animation) */}
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex space-x-12 items-center">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full"
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="flex space-x-12 items-center">
            {logos.map((logo) => (
              <div
                key={`duplicate-${logo.id}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats cards with rounded corners */}
      <div className="container-custom mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="text-3xl font-bold text-primary-500 mb-2">12x</div>
            <p className="text-gray-600">ROI on average</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="text-3xl font-bold text-primary-500 mb-2">5M+</div>
            <p className="text-gray-600">Pages created</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="text-3xl font-bold text-primary-500 mb-2">450%</div>
            <p className="text-gray-600">Average conversion increase</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
