import React, { useState } from "react";
import faqImage from "../../assets/B2cAssets/LandingPageImges/faqImage.png"; // Update path to your image

const faqs = [
  {
    question: "What is DVYB?",
    answer:
      "DVYB is a platform for bulk ordering of clothing, offering advanced features like 3D try-ons and collection onboarding.",
  },
  {
    question: "Can I see how clothes look in different settings?",
    answer:
      "Yes! Our platform allows you to preview clothes in multiple settings, lighting, and angles.",
  },
  {
    question: "Do 3D try-ons match real-life fit?",
    answer:
      "We use cutting-edge tech to provide realistic try-on experiences that closely match real-life fit.",
  },
  {
    question: "How long does it take to onboard my collection?",
    answer:
      "Onboarding your collection typically takes 3-5 business days, depending on the size of your inventory.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={faqImage}
            alt="FAQ Illustration"
            className="w-64 sm:w-80 md:w-96"
          />
        </div>

        {/* FAQ List */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-3 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium flex justify-between items-center">
                  {faq.question}
                  <span className="ml-2 text-gray-500">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </h3>
                {openIndex === index && (
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
