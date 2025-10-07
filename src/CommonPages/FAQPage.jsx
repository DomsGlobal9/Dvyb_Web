import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';
import imgBanner from "../assets/CommonAssets/faqImg.png"
import logo from "../assets/logo/NavLogo.png"
import bluesaree from '../assets/CommonAssets/faqSaee.png'

const faqs = [
  {
    question: 'How to track my order?',
    answer: (
      <div className="space-y-2">
        <p>1) Go to “My Orders”</p>
        <ul className="list-disc ml-6">
          <li>Tap on the Profile tab at the bottom.</li>
          <li>Select “My Orders” from the menu.</li>
        </ul>
        <p>2) Select Your Order</p>
        <p>Tap on the order you want to track.</p>
        <p>3) View Tracking Details</p>
        <p>See current status: Order Placed → Packed → Shipped → Out for Delivery → Delivered.</p>
      </div>
    )
  },
  {
    question: 'How to return or replace order?',
    answer: <p>You can initiate a return or replacement request from your “My Orders” page.</p>
  },
  {
    question: 'How to cancel my order?',
    answer: <p>Go to “My Orders”, select the order, and tap “Cancel”.</p>
  },
  {
    question: 'How to apply coupon?',
    answer: <p>Enter the coupon code at checkout to apply discounts.</p>
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState('English');

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Help & Support</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
        </select>
      </div>

      {/* Intro Section */}
      <section className="flex flex-col md:flex-row items-center gap-6 p-6">
        <img
          src={imgBanner}
          alt="Help banner"
          className="rounded-lg w-1/2 md:w-1/2 object-cover h-120 center"
        />
        <div className="md:w-1/2 space-y-3">
          <img src={logo} alt=""  className='h-12 w-30 center ml-50'/>
          <p>
            At DVYB, we’re here to assist you with shopping that’s both simple and budget-friendly, all while ensuring you don’t sacrifice style, quality, or variety. Whether you’re preparing for weddings or family gatherings, our carefully selected collections for men, women, and kids are tailored to create cohesive looks at incredible prices.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-4">
        <h2 className="text-xl font-bold mb-4">Popular FAQ'S Topics</h2>
       <div className=' flex '>
           <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 w-full">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left font-medium"
              >
                {faq.question}
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && <div className="mt-3 text-sm text-gray-700">{faq.answer}</div>}
            </div>
          ))}
        </div>
        <div>
          <img src={bluesaree} alt="" className='h-100 w-100' />
        </div>
       </div>
      </section>

      {/* Contact Section */}
      <section className="p-6 border-t space-y-4">
        <h3 className="text-lg font-semibold">Need Personal Help?</h3>
        <p>Our expert team is here to help you succeed. Get personalized support in your preferred language.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 w-full md:w-auto">
            <Phone /> Call Us
          </button>
          <button className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 w-full md:w-auto">
            <MessageCircle /> Chat with Us
          </button>
        </div>
      </section>
    </div>
  );
}
