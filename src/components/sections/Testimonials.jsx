// src/components/sections/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "SiteLaunch Studios created an outstanding mobile-first landing page for my marketing company. Their design perfectly balances aesthetics with functionality, featuring seamless form integration that makes it easy for potential customers to connect with us. The responsive design works flawlessly across all devices, and since implementation, we've seen a notable increase in conversions. Highly recommend their professional web design services!",
    author: "Bohdan Mykytey",
    position: "Local Guide",
    company: "",
    initials: "BM",
    color: "bg-primary-500",
    rating: 5,
  },
  {
    quote:
      "We partnered with SiteLaunch Studios to build the ReCircle Society website and couldn't be happier with the results. Alberto and his team delivered a clean, mobile-responsive website that clearly communicates our mission and drives visitor engagement. The site loads fast, looks professional across all devices, and has helped us grow our community presence online. If you're a nonprofit or small business in Miami looking for a web developer who actually listens and delivers, SiteLaunch Studios is the right choice. Highly recommend.",
    author: "ReCircle Society",
    position: "Miami-based Nonprofit",
    company: "",
    initials: "RS",
    color: "bg-green-600",
    rating: 5,
  },
  {
    quote:
      "They build high-performance websites using modern technologies like React and Tailwind, offering wide range of landing pages and web services.",
    author: "Laura Rinaldi",
    position: "Google Reviewer",
    company: "",
    initials: "LR",
    color: "bg-red-500",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex space-x-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const GoogleBadge = () => (
  <div className="flex items-center space-x-1.5 mb-4">
    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
    <span className="text-xs text-gray-400 font-medium">via Google</span>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  // Tracks whether this is still the very first render, so the initial
  // testimonial (already visible in the prerendered/hydrated HTML) doesn't
  // replay its enter transition, while later carousel rotations still animate.
  const hasMountedRef = useRef(false);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 7000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase">
            Client Reviews
          </span>
          <h2 className="heading-lg text-gray-900 mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Real results from businesses that trusted us with their online presence.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-100 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative px-8 py-12 md:px-16 md:py-16 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={hasMountedRef.current ? { opacity: 0, x: 60 } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                suppressHydrationWarning
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-start gap-8 md:gap-12"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${current.color} flex items-center justify-center text-white font-bold text-lg border-4 border-primary-100`}>
                    {current.initials}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <StarRating count={current.rating} />
                  <GoogleBadge />
                  <svg className="text-primary-200 w-10 h-10 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  {/* A single template-literal expression, not adjacent
                      text+expression+text children: React needs comment
                      marker nodes to preserve boundaries between multiple
                      adjacent text nodes for hydration, and that boundary
                      tracking mismatches when this round-trips through the
                      prerender capture. One expression avoids the issue. */}
                  <p className="text-gray-700 text-lg italic mb-5">{`"${current.quote}"`}</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{current.author}</h4>
                    <p className="text-gray-500 text-sm">
                      {`${current.position}, ${current.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-500 hover:text-primary-500 transition-colors z-20"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-500 hover:text-primary-500 transition-colors z-20"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 pb-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-primary-500" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
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
