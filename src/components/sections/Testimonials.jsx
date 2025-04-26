import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  // These would ideally be replaced with real testimonials once you have clients
  const testimonials = [
    {
      quote:
        "SiteLaunch Studios transformed our online presence with a mobile-first website that loads lightning-fast and converts visitors into customers. Their technical expertise and focus on measurable results exceeded our expectations.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "Miami Wellness Collective",
      image: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "Working with SiteLaunch Studios was a game-changer for our e-commerce business. Their mobile-first approach and AI-enhanced features increased our conversion rate by 42% in just two months.",
      author: "Michael Chen",
      position: "Entrepreneur",
      company: "Coastal Designs",
      image: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "As a marketing agency, we needed a technical partner who could implement our creative vision flawlessly. SiteLaunch Studios delivers exceptional websites with clean code, optimized for both users and search engines.",
      author: "Jessica Taylor",
      position: "Creative Director",
      company: "Bright Spark Media",
      image: "/images/testimonial-3.jpg",
    },
    {
      quote:
        "The team at SiteLaunch Studios understood our business needs from day one. Their custom dashboard gives us real-time insights into our site's performance, helping us make data-driven decisions that improve ROI.",
      author: "David Wilson",
      position: "CEO",
      company: "Miami Tech Solutions",
      image: "/images/testimonial-4.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to set a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Set up the automatic rotation
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 7000); // Change slide every 7 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Pause rotation on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Success Stories
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear from businesses who have transformed their digital presence
            with our mobile-first approach.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-100 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

          {/* Testimonial slider */}
          <div className="relative px-8 py-12 md:px-16 md:py-16 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Testimonial image */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-100 flex-shrink-0">
                  <img
                    src={
                      testimonials[currentIndex].image ||
                      "/images/avatar-placeholder.jpg"
                    }
                    alt={testimonials[currentIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Testimonial content */}
                <div>
                  <svg
                    className="text-primary-200 w-12 h-12 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-lg md:text-xl italic mb-6">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].position},{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-primary-500 transition-colors z-20"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-primary-500 transition-colors z-20"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 pb-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary-500" : "bg-gray-300"
                } transition-colors duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Results metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">40%+</div>
            <p className="text-gray-600">Average conversion increase</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              <span className="text-3xl">0.8</span>
              <span className="text-xl">s</span>
            </div>
            <p className="text-gray-600">Average mobile page load time</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              <span className="text-3xl">12</span>
              <span className="text-xl">x</span>
            </div>
            <p className="text-gray-600">Average ROI on client investment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
