import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61566593097004",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/sitelaunchstudio",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 00-.555 2.066A4.107 4.107 0 004.09 13.859a4.07 4.07 0 01-1.858-.513v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/sitelaunch-studios",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/sitelaunchstudios",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const legalContent = {
    contact: {
      title: "Contact Us",
      content: `
        <div class="space-y-4">
          <p>Have questions about our services or want to discuss your project? We'd love to hear from you!</p>
          
          <h3 class="font-semibold text-lg">Get in Touch</h3>
          <p>Email: <a href="mailto:sitelaunchstudio@gmail.com" class="text-primary-600 hover:underline">sitelaunchstudio@gmail.com</a></p>
          <p>Locations: Miami, Florida & Stamford, CT</p>
          <p>Hours: 24/7 Support Available</p>
          
          <h3 class="font-semibold text-lg">Send Us a Message</h3>
          <p>Fill out our contact form on the <a href="/contact" class="text-primary-600 hover:underline">Contact Page</a> and we'll get back to you within 24 hours.</p>
          
          <h3 class="font-semibold text-lg">Schedule a Consultation</h3>
          <p>Ready to start your project? <a href="/consultation" class="text-primary-600 hover:underline">Book a free consultation</a> with our team to discuss your requirements and how we can help.</p>
        </div>
      `,
    },
    terms: {
      title: "Terms of Service",
      content: `
        <div class="space-y-4">
          <p class="font-semibold">Last Updated: May 1, 2025</p>
          
          <h3 class="font-semibold text-lg">1. Acceptance of Terms</h3>
          <p>By accessing and using the services provided by SiteLaunch Studios ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service.</p>
          
          <h3 class="font-semibold text-lg">2. Description of Services</h3>
          <p>SiteLaunch Studios provides web development, design, and digital marketing services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
          
          <h3 class="font-semibold text-lg">3. Client Responsibilities</h3>
          <p>Clients are responsible for providing timely feedback, necessary content, and approvals as outlined in the project agreement. Delays caused by the client may affect project timelines and deliverables.</p>
          
          <h3 class="font-semibold text-lg">4. Intellectual Property</h3>
          <p>Upon full payment, clients will own the rights to the final deliverables created specifically for their project. SiteLaunch Studios retains the right to display the work in our portfolio unless otherwise agreed upon.</p>
          
          <h3 class="font-semibold text-lg">5. Payment Terms</h3>
          <p>Payment schedules and terms will be outlined in the project proposal or contract. Late payments may incur additional fees and affect project timelines.</p>
          
          <h3 class="font-semibold text-lg">6. Limitation of Liability</h3>
          <p>SiteLaunch Studios shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          
          <h3 class="font-semibold text-lg">7. Governing Law</h3>
          <p>These terms shall be governed by and construed in accordance with the laws of the State of Florida, without giving effect to any principles of conflicts of law.</p>
          
          <p>For questions about these Terms of Service, please contact us at <a href="mailto:sitelaunchstudio@gmail.com" class="text-primary-600 hover:underline">sitelaunchstudio@gmail.com</a>.</p>
        </div>
      `,
    },
    privacy: {
      title: "Privacy Policy",
      content: `
        <div class="space-y-4">
          <p class="font-semibold">Last Updated: May 1, 2025</p>
          
          <h3 class="font-semibold text-lg">1. Information We Collect</h3>
          <p>We collect information you provide when you contact us through forms, email, or other means, including your name, email address, phone number, and any other information you choose to provide.</p>
          
          <h3 class="font-semibold text-lg">2. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Respond to your inquiries and provide our services</li>
            <li>Improve our website and services</li>
            <li>Send you updates and marketing communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h3 class="font-semibold text-lg">3. Cookies and Tracking</h3>
          <p>Our website uses cookies and similar technologies to enhance your browsing experience and collect information about how you use our site. You can manage cookie preferences through your browser settings.</p>
          
          <h3 class="font-semibold text-lg">4. Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h3 class="font-semibold text-lg">5. Third-Party Services</h3>
          <p>We may use third-party services that collect, monitor, and analyze data. These third parties have their own privacy policies addressing how they use such information.</p>
          
          <h3 class="font-semibold text-lg">6. Your Rights</h3>
          <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data.</p>
          
          <h3 class="font-semibold text-lg">7. Changes to This Privacy Policy</h3>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          
          <p>For questions about our Privacy Policy, please contact us at <a href="mailto:sitelaunchstudio@gmail.com" class="text-primary-600 hover:underline">sitelaunchstudio@gmail.com</a>.</p>
        </div>
      `,
    },
  };

  const openModal = (type) => {
    setModalContent({
      title: legalContent[type].title,
      content: legalContent[type].content,
    });
    setIsModalOpen(true);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* In Footer.jsx, restructure the main grid layout section */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo and About */}
          <div className="md:col-span-2 flex flex-col md:flex-row">
            <div className="flex-1">
              <Link to="/" className="inline-block mb-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                    <img
                      src="/images/footer.webp"
                      alt="Logo"
                      className="h-9 w-auto"
                      width="36"
                      height="36"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    SiteLaunch Studios
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                SiteLaunch Studios is a Miami-based web development agency
                specializing in mobile-first, high-performance websites and
                applications. We leverage AI and the latest technologies to
                create SEO-optimized digital experiences that drive measurable
                business results.
              </p>
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links - now in right column on mobile */}
            <div className="flex-shrink-0 md:text-right">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => openModal("contact")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("terms")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("privacy")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Privacy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>

                  <a
                    href="mailto:sitelaunchstudio@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    sitelaunchstudio@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-white font-medium mb-1">Locations</h4>
                  <p className="text-gray-400">Miami, Florida & Stamford, CT</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-white font-medium mb-1">Service Hours</h4>
                  <p className="text-gray-400">24/7 Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Legal Content */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
      >
        <div
          className="prose prose-sm max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: modalContent.content }}
        />
      </Modal>
    </footer>
  );
};

export default Footer;
