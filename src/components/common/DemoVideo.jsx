import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const DemoVideo = ({
  poster = "/images/demo-poster.jpg",
  videoSrc = "/videos/demo.mp4",
  title = "Demo Video",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative rounded-md overflow-hidden">
      {/* Video loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play button overlay */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-opacity duration-300`}
        whileHover={{ opacity: isPlaying ? 0 : 0.5 }}
      >
        <motion.button
          className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-primary-500 hover:bg-opacity-100 transition-colors cursor-pointer"
          onClick={handlePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full rounded-md"
        poster={poster}
        preload="metadata"
        onClick={handlePlay}
        onLoadedData={handleLoad}
        onEnded={() => setIsPlaying(false)}
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls - only shown when video is playing */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <button className="text-white" onClick={handlePlay}>
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
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <span className="text-white text-sm">{title}</span>
          </div>
        </div>
      )}

      {/* Stats overlay - can be customized */}
      <div className="absolute top-2 right-2 bg-white rounded px-2 py-1 text-xs font-bold text-primary-500">
        +45%
      </div>
    </div>
  );
};

export default DemoVideo;
