import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMobileMenuOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-sm border-b border-gray-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="SiteLaunch Studios"
              className="h-7 md:h-8"
            />
            <span
              className={`ml-2 font-semibold text-lg ${
                isScrolled ? "text-primary-600" : "text-white"
              }`}
            >
              SiteLaunch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-primary-600 text-sm font-medium cursor-pointer transition-colors`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("mobile-first")}
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-primary-600 text-sm font-medium cursor-pointer transition-colors`}
            >
              Mobile-First
            </button>
            <button
              onClick={() => scrollToSection("advantages")}
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-primary-600 text-sm font-medium cursor-pointer transition-colors`}
            >
              Advantages
            </button>
            <button
              onClick={() => scrollToSection("tech")}
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-primary-600 text-sm font-medium cursor-pointer transition-colors`}
            >
              Tech Stack
            </button>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/contact">
              <button
                className={`text-sm font-medium px-2 py-1 transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-primary-600"
                    : "text-white hover:text-primary-200"
                }`}
              >
                Contact
              </button>
            </Link>
            <Link to="/consultation">
              <Button
                variant="primary"
                size="sm"
                className="py-1.5 px-4 bg-secondary-500 hover:bg-secondary-600"
              >
                Free Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden focus:outline-none ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("mobile-first")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Mobile-First
              </button>
              <button
                onClick={() => scrollToSection("advantages")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Advantages
              </button>
              <button
                onClick={() => scrollToSection("tech")}
                className="text-gray-700 hover:text-primary-500 font-medium cursor-pointer"
              >
                Tech Stack
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>
                    Contact
                  </Button>
                </Link>
                <Link
                  to="/consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="bg-secondary-500 hover:bg-secondary-600"
                  >
                    Free Consultation
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
