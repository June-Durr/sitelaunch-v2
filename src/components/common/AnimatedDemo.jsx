import React from "react";
import { motion } from "framer-motion";

const AnimatedDemo = ({ title = "Demo Content" }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Header Content */}
      <div className="flex p-6">
        <div className="w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3 + i * 0.1, duration: 0.5 },
                }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
            className="mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.7, duration: 0.5 },
            }}
          >
            <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
            <div className="h-2 bg-gray-200 rounded-full w-3/5"></div>
            <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
          </motion.div>

          <motion.button
            className="mt-6 bg-primary-500 text-white px-4 py-2 rounded-md font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.9, duration: 0.5 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>

        {/* Right side visual elements */}
        <div className="w-1/2 relative">
          {/* Phone or device mockup */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-xl p-1 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.8, duration: 0.5 },
            }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-gray-100 w-32 h-56 rounded-lg overflow-hidden">
              <div className="h-6 bg-gray-200 rounded-t-lg w-full flex items-center justify-center">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <div className="p-2">
                <div className="h-3 bg-primary-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>

                <div className="mt-4 bg-white rounded-lg p-1 shadow-sm">
                  <div className="h-2 bg-primary-100 rounded w-full mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating element */}
          <motion.div
            className="absolute left-4 top-1/3 transform -translate-y-1/2 bg-white shadow-md rounded-lg p-2 z-10"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: [0, -10, 0],
              transition: {
                opacity: { delay: 1.2, duration: 0.5 },
                scale: { delay: 1.2, duration: 0.5 },
                rotate: { delay: 1.2, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
              },
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,100 L0,60 C50,80 100,20 150,40 C200,60 250,120 300,100 C350,80 400,0 450,20 L500,40 L500,150 L0,150 Z"
            fill="url(#waveGradient)"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 1 },
            }}
          />

          <motion.path
            d="M0,100 C50,80 100,20 150,40 C200,60 250,120 300,100 C350,80 400,0 450,20 L500,40"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              transition: { delay: 0.8, duration: 1.5, ease: "easeOut" },
            }}
          />
        </svg>

        {/* Stats Label */}
        <motion.div
          className="absolute right-8 top-0 bg-white shadow-md rounded-md px-3 py-1 flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 1.5, duration: 0.5 },
          }}
        >
          <div className="mr-2 text-xs font-medium text-gray-500">
            Conversion
          </div>
          <div className="text-xl font-bold text-green-500">+45%</div>
        </motion.div>
      </div>

      {/* Data Points */}
      <motion.div
        className="absolute bottom-2 left-8 flex space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1.7, duration: 0.5 },
        }}
      >
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Leads</div>
          <div className="text-sm font-bold text-primary-600">1,248</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">CTR</div>
          <div className="text-sm font-bold text-primary-600">8.7%</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">ROI</div>
          <div className="text-sm font-bold text-primary-600">217%</div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedDemo;
