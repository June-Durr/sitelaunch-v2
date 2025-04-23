import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import AnimatedDemo from "../common/AnimatedDemo";

const EnhancedHero = () => {
  const [email, setEmail] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const browserVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Background decoration elements
  const Decorations = () => (
    <>
      <motion.div
        className="absolute -top-20 right-1/4 w-72 h-72 bg-primary-100 rounded-full opacity-70 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-40 -left-20 w-60 h-60 bg-secondary-500 rounded-full opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900"
    >
      {/* Decorative elements */}
      <Decorations />

      <div className="container-custom relative z-10">
        <motion.div
          className="flex flex-col items-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Content - Centered */}
          <div className="text-center mb-12">
            <motion.h1
              className="heading-xl text-white mb-6"
              variants={titleVariants}
            >
              Powerful Landing Pages That Convert
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={textVariants}
            >
              Launch high-converting landing pages faster, generate qualified
              leads, and optimize your marketing efforts—all with one simple
              solution.
            </motion.p>

            <motion.div variants={formVariants} className="flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full max-w-md"
              >
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-md bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex-grow"
                />
                <Button
                  variant="secondary"
                  type="submit"
                  className="whitespace-nowrap"
                >
                  Start my trial →
                </Button>
              </form>
            </motion.div>

            <motion.p
              className="text-sm text-gray-400 mt-4"
              variants={textVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2 } }}
            >
              No credit card required. 14-day free trial.
            </motion.p>
          </div>

          {/* Hero Demo - Full Width */}
          <motion.div className="w-full max-w-4xl" variants={browserVariants}>
            {/* Browser mockup */}
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              {/* Browser header */}
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto bg-white rounded-full px-4 py-1 text-sm text-gray-500 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  sitelaunchstudios.com
                </div>
              </div>

              {/* Browser content - Using the AnimatedDemo component */}
              <div className="bg-white">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <AnimatedDemo title="Spend Freely. Save Boldly." />
                </div>

                {/* Optional caption below */}
                <div className="p-3 text-center text-gray-500 text-sm border-t border-gray-100">
                  Not Just Another Budgeting App
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Logos */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2, duration: 0.8 },
          }}
        >
          <p className="text-center text-gray-400 text-sm uppercase tracking-wider mb-6">
            Trusted by innovative businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                className="h-8 bg-gray-700 w-24 rounded opacity-50"
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHero;
