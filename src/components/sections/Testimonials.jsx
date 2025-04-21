import React from "react";

const TestimonialCard = ({ quote, author, position, company, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-start mb-4">
        <svg
          className="text-primary-300 w-10 h-10 mr-2 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700 text-lg italic">"{quote}"</p>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image || "/images/avatar-placeholder.jpg"}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{author}</h4>
          <p className="text-gray-600 text-sm">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Leadpages has transformed our marketing efforts. We've seen a 40% increase in leads since we started using their landing pages.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechStart Inc.",
      image: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "The templates are beautiful and so easy to customize. I was able to launch my campaign in just a few hours.",
      author: "Michael Chen",
      position: "Entrepreneur",
      company: "Fitness Academy",
      image: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "Their support team is exceptional. Any time I have a question, they're quick to respond with helpful solutions.",
      author: "Jessica Taylor",
      position: "Digital Strategist",
      company: "CreativeWorks",
      image: "/images/testimonial-3.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-gray-900 mb-4">
            Trusted by thousands of businesses
          </h2>
          <p className="text-xl text-gray-600">
            See why businesses of all sizes choose Leadpages to grow their
            online presence and convert more customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
