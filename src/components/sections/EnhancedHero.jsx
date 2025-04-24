import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedDemo from "../common/AnimatedDemo";

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

  // Network background animation
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

                {/* Updated orange button with arrow */}
                <button
                  type="submit"
                  className="group bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm py-3 px-6 rounded-md font-medium inline-flex items-center transition-all duration-200"
                >
                  Start my trial
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
              No credit card required. 14-day free trial.
            </motion.p>
          </div>

          {/* Hero Demo - Full Width with 3D effect */}
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
