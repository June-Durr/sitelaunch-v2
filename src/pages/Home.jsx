import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";

const Home = () => {
  return (
    <div className="fade-in">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </div>
  );
};

export default Home;
