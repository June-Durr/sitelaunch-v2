import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

const EnhancedHero = () => {
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Set loaded state after a small delay to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
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

                <button
                  type="submit"
                  className="group bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm py-3 px-6 rounded-md font-medium inline-flex items-center transition-all duration-200"
                >
                  Get Free Consultation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
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
              <div className="relative z-30 bg-white shadow-xl rounded-3xl border border-gray-200 w-64 h-[400px]">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-full pt-8 pb-4 px-4">
                  <div className="bg-gray-50 h-full rounded-xl flex flex-col justify-between p-3">
                    {/* Mobile website mockup content */}
                    <div className="space-y-3">
                      <div className="h-8 bg-primary-500 rounded-lg w-full flex items-center justify-center text-white text-xs font-medium">
                        SiteLaunch
                      </div>
                      <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-3/4"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-5/6"></div>
                      <div className="h-8 bg-secondary-500 rounded-lg w-full mt-3"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet - behind left */}
              <div className="absolute left-16 top-6 z-20 bg-white shadow-xl rounded-2xl border border-gray-200 w-48 h-[350px] transform -rotate-6">
                <div className="h-4 w-12 bg-gray-300 mx-auto rounded-b-lg"></div>
                <div className="bg-gray-50 h-[calc(100%-16px)] p-3">
                  {/* Tablet website mockup content */}
                  <div className="space-y-2">
                    <div className="h-6 bg-primary-500 rounded-md w-full flex items-center justify-center text-white text-xs font-medium">
                      SiteLaunch
                    </div>
                    <div className="h-24 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded-full"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-5/6"></div>
                    <div className="h-6 bg-secondary-500 rounded-md w-full mt-2"></div>
                    <div className="h-20 bg-gray-200 rounded-md w-full mt-3"></div>
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
                </div>
                <div className="p-3 bg-gray-50 h-[calc(100%-24px)]">
                  {/* Desktop website mockup content */}
                  <div className="flex h-full">
                    <div className="w-2/3 pr-2">
                      <div className="h-5 bg-primary-500 rounded-md w-32 flex items-center justify-center text-white text-xs font-medium mb-2">
                        SiteLaunch
                      </div>
                      <div className="h-24 bg-gray-200 rounded-md w-full mb-2"></div>
                      <div className="h-2 bg-gray-300 rounded-full w-3/4 mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded-full mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded-full w-5/6 mb-2"></div>
                      <div className="h-6 bg-secondary-500 rounded-md w-32"></div>
                    </div>
                    <div className="w-1/3 pl-2 space-y-2">
                      <div className="h-16 bg-gray-200 rounded-md"></div>
                      <div className="h-16 bg-gray-200 rounded-md"></div>
                      <div className="h-16 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance indicators */}
              <div className="absolute right-0 top-0 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-green-100">
                <span className="text-xs font-medium text-gray-600 mr-1">
                  Page Speed:
                </span>
                <span className="text-xs font-bold text-green-500">98/100</span>
              </div>

              <div className="absolute left-24 bottom-4 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-primary-100">
                <span className="text-xs font-medium text-gray-600 mr-1">
                  Mobile-First:
                </span>
                <span className="text-xs font-bold text-primary-500">✓</span>
              </div>

              <div className="absolute right-24 bottom-16 z-40 bg-white rounded-lg shadow-md py-1 px-2 flex items-center border border-secondary-100">
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
