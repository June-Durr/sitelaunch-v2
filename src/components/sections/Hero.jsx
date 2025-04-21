import React from "react";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 bg-gradient-to-br from-white to-blue-50"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="heading-xl text-gray-900 mb-6">
              Create high-converting landing pages in minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Streamline marketing launches and maximize your results with our
              complete suite of conversion tools and collaborative technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                See Templates
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required. 14-day free trial.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full opacity-70 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-500 rounded-full opacity-30 blur-2xl"></div>

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
                  example-landing-page.com
                </div>
              </div>

              {/* Browser content */}
              <div className="p-4">
                <img
                  src="/images/landing-page-example.webp"
                  alt="Landing page example"
                  className="rounded shadow-sm w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-6">
            Trusted by thousands of businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-8 bg-gray-200 w-24 rounded opacity-50"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
