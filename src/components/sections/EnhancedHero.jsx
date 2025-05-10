import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ContactForm from "../common/ContactForm";
// import apiService from "../../services/apiService";

const EnhancedHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Set loaded state after a small delay to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      // Add source information
      const enhancedFormData = {
        ...formData,
        source: "Hero Section",
      };

      // Submit to API service
      await apiService.submitContactForm(enhancedFormData);

      console.log("Hero form submitted successfully:", enhancedFormData);
    } catch (error) {
      console.error("Error submitting hero form:", error);
    }
  };

  // Network background animation - represents connectivity and technology
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let connections = [];

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize particles
    function initParticles() {
      particles = [];
      connections = [];

      // Create particles
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          color: `rgba(${Math.random() * 100 + 100}, ${
            Math.random() * 50 + 50
          }, ${Math.random() * 200 + 55}, ${Math.random() * 0.5 + 0.5})`,
          glow: Math.random() > 0.8, // Only some particles will glow
        });
      }

      // Create connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          if (Math.random() > 0.97) {
            connections.push({
              from: i,
              to: j,
            });
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      ctx.lineWidth = 0.3;
      connections.forEach((connection) => {
        const p1 = particles[connection.from];
        const p2 = particles[connection.to];

        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        const maxDistance = 200;

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Calculate opacity based on distance
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(120, 70, 200, ${opacity * 0.4})`;
          ctx.stroke();
        }
      });

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Add glow effect for some particles
        if (particle.glow) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            particle.radius * 0.5,
            particle.x,
            particle.y,
            particle.radius * 3
          );
          gradient.addColorStop(0, "rgba(255, 150, 50, 0.8)");
          gradient.addColorStop(1, "rgba(255, 150, 50, 0)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Network background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #0a0328, #17093d)" }}
      />

      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/40 to-gray-900/60 transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Large purple glow */}
        <motion.div
          className="absolute w-[150%] h-[150%] bg-purple-600 rounded-full opacity-15 blur-3xl"
          initial={{ x: "-50%", y: "-90%" }}
          animate={
            isLoaded
              ? {
                  x: "-50%",
                  y: "-50%",
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Blue-teal glow */}
        <motion.div
          className="absolute w-[100%] h-[100%] bg-primary-600 rounded-full opacity-10 blur-3xl"
          initial={{ right: "-20%", bottom: "-40%" }}
          animate={
            isLoaded
              ? {
                  right: "-30%",
                  bottom: "-30%",
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }
              : {}
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              Mobile-First Web Development for Miami Businesses
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={textVariants}
            >
              We build high-performance, SEO-optimized websites and applications
              that load fast, look great on any device, and drive measurable
              business results.
            </motion.p>

            <motion.div variants={formVariants} className="flex justify-center">
              {/* Progressive Contact Form */}
              <ContactForm
                inline={true}
                buttonText="Get Free Consultation"
                className="w-full max-w-md"
                onSubmit={handleFormSubmit}
              />
            </motion.div>

            <motion.p
              className="text-sm text-gray-400 mt-4"
              variants={textVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2 } }}
            >
              Miami's leading tech-forward web development agency
            </motion.p>
          </div>

          {/* Hero Demo - Multi-device display showing mobile-first approach */}
          <motion.div
            className="w-full max-w-4xl"
            initial={{
              opacity: 0,
              scale: 0.9,
              rotateX: 45,
              y: 100,
              z: -100,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    y: 0,
                    z: 0,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: [0.215, 0.61, 0.355, 1], // Ease out cubic
            }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Multi-device mockup */}
            <div className="relative flex justify-center items-center h-[420px]">
              {/* Mobile - front and center */}
              <div className="relative z-30 bg-white shadow-xl rounded-3xl border border-gray-200 w-60 h-[400px]">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-full pt-8 pb-4 px-4">
                  <div className="bg-gray-50 h-full rounded-xl flex flex-col justify-between p-3">
                    {/* Mobile status bar */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[9px] font-medium text-gray-700">
                        9:41
                      </div>
                      <div className="flex space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-2 w-2 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Mobile website mockup content - Edgier Design */}
                    <div className="space-y-3">
                      {/* Header with logo */}
                      <div className="h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg w-full flex items-center justify-between px-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-white rounded-md flex items-center justify-center mr-1">
                            <div className="w-2 h-2 bg-primary-500 rounded-sm"></div>
                          </div>
                          <span className="text-white text-xs font-medium">
                            SiteLaunch
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                          <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Main hero section */}
                      <div className="h-32 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 rounded-lg w-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/20 rounded-full blur-md transform translate-x-5 -translate-y-5"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/20 rounded-full blur-md transform -translate-x-5 translate-y-5"></div>

                        <div className="absolute inset-0 flex flex-col justify-center p-3">
                          <div className="h-2 bg-white/80 rounded-full w-20 mb-1.5"></div>
                          <div className="h-1.5 bg-white/60 rounded-full w-16 mb-3"></div>

                          <div className="flex space-x-1 mb-2">
                            <div className="h-5 w-14 bg-secondary-500 rounded-md flex items-center justify-center">
                              <span className="text-[6px] text-white font-bold">
                                GET STARTED
                              </span>
                            </div>
                            <div className="h-5 w-5 bg-white/10 rounded-md flex items-center justify-center">
                              <span className="text-[8px] text-white">→</span>
                            </div>
                          </div>

                          <div className="absolute bottom-2 right-2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-500 rounded-lg transform -rotate-6 flex items-center justify-center">
                              <span className="text-[7px] text-white font-bold">
                                APP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="h-2.5 bg-gray-700 rounded-full w-3/4"></div>
                      <div className="h-2.5 bg-gray-700 rounded-full w-full"></div>
                      <div className="h-2.5 bg-gray-700 rounded-full w-5/6"></div>

                      {/* CTA Button */}
                      <div className="h-8 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg w-full flex items-center justify-center shadow-lg">
                        <span className="text-[9px] text-white font-bold mr-1">
                          SIGN UP FREE
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-2 w-2 text-white"
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
                      </div>
                    </div>

                    {/* Navigation icons - More app-like */}
                    <div className="flex space-x-2">
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        </div>
                        <span className="text-[6px] text-gray-500">Home</span>
                      </div>
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <span className="text-[6px] text-gray-500">Stats</span>
                      </div>
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[6px] text-gray-500">
                          Profile
                        </span>
                      </div>
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[6px] text-gray-500">
                          Settings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet - behind left (with the perfect spacing) */}
              <div className="absolute left-[7rem] top-6 z-20 bg-white shadow-xl rounded-2xl border border-gray-200 w-52 h-[350px] transform -rotate-6">
                <div className="h-4 w-12 bg-gray-300 mx-auto rounded-b-lg"></div>
                <div className="bg-gray-50 h-[calc(100%-16px)] p-3">
                  {/* Tablet website mockup content - Edgier Design */}
                  <div className="space-y-2">
                    {/* Header with logo */}
                    <div className="h-6 bg-gradient-to-r from-primary-600 to-purple-600 rounded-md w-full flex items-center justify-between px-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-md flex items-center justify-center mr-1">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-sm"></div>
                        </div>
                        <span className="text-white text-[8px] font-medium">
                          SiteLaunch
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                      </div>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="h-24 relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 rounded-md w-full overflow-hidden">
                      <div className="absolute inset-0 p-2">
                        <div className="h-1.5 bg-white/80 rounded-full w-16 mb-1"></div>
                        <div className="flex space-x-1 mt-2">
                          <div className="h-12 flex-1 bg-white/10 rounded-md p-1 backdrop-blur-sm">
                            {/* Mini chart */}
                            <div className="h-8 flex items-end justify-between px-0.5">
                              <div className="w-1 h-[30%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[60%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[40%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[70%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[50%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[80%] bg-primary-400 rounded-t-sm"></div>
                              <div className="w-1 h-[90%] bg-secondary-500 rounded-t-sm"></div>
                            </div>
                            <div className="text-[4px] text-center text-white">
                              Conversions
                            </div>
                          </div>
                          <div className="w-8 h-12 bg-white/10 rounded-md flex flex-col items-center justify-center backdrop-blur-sm">
                            <span className="text-[8px] text-white font-bold">
                              42%
                            </span>
                            <span className="text-[4px] text-primary-300">
                              Growth
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="h-2 bg-gray-700 rounded-full w-3/4"></div>
                    <div className="h-2 bg-gray-700 rounded-full"></div>
                    <div className="h-2 bg-gray-700 rounded-full w-5/6"></div>

                    {/* CTA Button */}
                    <div className="h-6 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-md w-full flex items-center justify-center shadow-md">
                      <span className="text-[7px] text-white font-bold mr-1">
                        SIGN UP NOW
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-1.5 w-1.5 text-white"
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
                    </div>

                    {/* Feature grid */}
                    <div className="h-20 w-full mt-3 grid grid-cols-2 gap-1 p-1">
                      <div className="bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1">
                        <div className="w-4 h-4 rounded-full bg-purple-100 mb-1 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 text-purple-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[5px] text-gray-700">Growth</span>
                      </div>
                      <div className="bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1">
                        <div className="w-4 h-4 rounded-full bg-blue-100 mb-1 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                          </svg>
                        </div>
                        <span className="text-[5px] text-gray-700">Charts</span>
                      </div>
                      <div className="bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1">
                        <div className="w-4 h-4 rounded-full bg-green-100 mb-1 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[5px] text-gray-700">
                          Security
                        </span>
                      </div>
                      <div className="bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1">
                        <div className="w-4 h-4 rounded-full bg-red-100 mb-1 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-[5px] text-gray-700">
                          Support
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop - behind right */}
              <div className="absolute right-16 top-12 z-10 bg-white shadow-xl rounded-lg border border-gray-200 w-80 h-[300px] transform rotate-6">
                <div className="h-6 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-2 text-[7px] text-gray-400">
                    sitelaunch.com
                  </div>
                </div>
                <div className="p-3 bg-gray-50 h-[calc(100%-24px)]">
                  {/* Desktop website mockup content - Edgier Design */}
                  <div className="flex h-full">
                    <div className="w-2/3 pr-2">
                      {/* Header with logo */}
                      <div className="h-5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-md w-32 flex items-center justify-between px-2 mb-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-white rounded-sm flex items-center justify-center mr-1">
                            <div className="w-1 h-1 bg-primary-500 rounded-[1px]"></div>
                          </div>
                          <span className="text-white text-[6px] font-medium">
                            SiteLaunch
                          </span>
                        </div>
                        <div className="flex space-x-0.5">
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Main content area */}
                      <div className="h-24 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 rounded-md w-full mb-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-10 h-10 bg-primary-500/20 rounded-full blur-md transform translate-x-3 -translate-y-3"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 bg-purple-500/20 rounded-full blur-md transform -translate-x-3 translate-y-3"></div>

                        <div className="absolute inset-0 flex flex-col justify-center p-3">
                          <div className="h-1.5 bg-white/80 rounded-full w-20 mb-1"></div>
                          <div className="h-1 bg-white/60 rounded-full w-16 mb-2"></div>

                          <div className="flex space-x-1 mb-1">
                            <div className="h-4 w-12 bg-secondary-500 rounded text-[4px] text-white font-bold flex items-center justify-center">
                              GET STARTED
                            </div>
                            <div className="h-4 w-4 bg-white/10 rounded flex items-center justify-center">
                              <span className="text-[5px] text-white">→</span>
                            </div>
                          </div>

                          <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-purple-500 rounded transform -rotate-6 flex items-center justify-center">
                              <span className="text-[5px] text-white font-bold">
                                APP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content text */}
                      <div className="h-2 bg-gray-700 rounded-full w-3/4 mb-1"></div>
                      <div className="h-2 bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-2 bg-gray-700 rounded-full w-5/6 mb-2"></div>

                      {/* CTA Button */}
                      <div className="h-6 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-md w-32 flex items-center justify-center shadow-md">
                        <span className="text-[6px] text-white font-bold mr-0.5">
                          SIGN UP FREE
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-1 w-1 text-white"
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
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-1/3 pl-2 space-y-2">
                      <div className="h-16 bg-white rounded-md shadow-sm p-1">
                        <div className="text-[5px] font-medium text-gray-700 mb-1">
                          Conversion Rate
                        </div>
                        <div className="h-8 flex items-end justify-between px-0.5 mb-1">
                          <div className="w-1 h-[30%] bg-gray-200 rounded-t-sm"></div>
                          <div className="w-1 h-[40%] bg-gray-200 rounded-t-sm"></div>
                          <div className="w-1 h-[25%] bg-gray-200 rounded-t-sm"></div>
                          <div className="w-1 h-[50%] bg-gray-200 rounded-t-sm"></div>
                          <div className="w-1 h-[35%] bg-gray-200 rounded-t-sm"></div>
                          <div className="w-1 h-[60%] bg-primary-300 rounded-t-sm"></div>
                          <div className="w-1 h-[75%] bg-primary-400 rounded-t-sm"></div>
                          <div className="w-1 h-[90%] bg-secondary-500 rounded-t-sm"></div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[4px] text-gray-500">Apr</span>
                          <span className="text-[4px] text-gray-500">May</span>
                        </div>
                      </div>
                      <div className="h-16 bg-white rounded-md shadow-sm p-1">
                        <div className="text-[5px] font-medium text-gray-700 mb-1">
                          Monthly Users
                        </div>
                        <div className="flex items-center justify-center h-6">
                          <div className="text-[7px] font-bold text-primary-600">
                            12,845
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="text-[4px] text-green-500 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-1 w-1 mr-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            23% from last month
                          </div>
                        </div>
                      </div>
                      <div className="h-16 bg-white rounded-md shadow-sm p-1">
                        <div className="text-[5px] font-medium text-gray-700 mb-1">
                          Goals Completed
                        </div>
                        <div className="flex justify-center py-1">
                          <div className="relative h-8 w-8">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                stroke="#eee"
                                strokeWidth="3"
                                fill="none"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                stroke="#8B5CF6"
                                strokeWidth="3"
                                strokeDasharray="75, 100"
                                fill="none"
                              />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[6px] font-bold">
                              75%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance indicators - adjusted for the new tablet position */}
              <div className="absolute right-12 top-0 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-green-100">
                <span className="text-xs font-medium text-gray-600 mr-1">
                  Page Speed:
                </span>
                <span className="text-xs font-bold text-green-500">98/100</span>
              </div>

              <div className="absolute left-32  bottom-6 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-primary-100">
                <span className="text-xs font-medium text-gray-600 mr-1">
                  Mobile-First:
                </span>
                <span className="text-xs font-bold text-primary-500">✓</span>
              </div>

              <div className="absolute right-24 bottom-10 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-secondary-100">
                <span className="text-xs font-medium text-gray-600 mr-1">
                  Conversion:
                </span>
                <span className="text-xs font-bold text-secondary-500">
                  +42%
                </span>
              </div>
            </div>

            {/* 3D shadow effect */}
            <div
              className="absolute inset-0 -z-10 blur opacity-30 bg-black rounded-lg transform translate-y-6 scale-95"
              style={{
                transformOrigin: "bottom",
                background:
                  "linear-gradient(to bottom, rgba(30,10,60,0.8), rgba(10,5,35,0.3))",
              }}
            ></div>
          </motion.div>
        </motion.div>

        {/* Client Logos */}
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
            Trusted by businesses throughout Miami
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Placeholder for Miami business client logos */}
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
