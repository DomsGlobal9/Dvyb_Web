import React from "react";
import DVYBLogo from "./DVYBLogo";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
          <DVYBLogo />

        {/* Title */}
        <h2 className="text-lg font-semibold my-4">Terms & Conditions</h2>
        <p className="mb-6 text-sm">
          Welcome to DVYB Bulk Ordering! These Terms & Conditions govern your use
          of our mobile application and services related to bulk clothing
          purchases. By accessing or using our App, you agree to be bound by
          these Terms. If you do not agree, please do not use the App.
        </p>

        {/* Sections */}
        <Section title="Eligibility">
          You must be at least 18 years old (or the legal age in your country) to
          use the App. By registering, you confirm that the information you
          provide is accurate and complete.
        </Section>

        <Section title="Account Registration">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>To place bulk orders, you may need to create an account.</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              login details.
            </li>
            <li>
              We are not responsible for unauthorized use of your account caused
              by your negligence.
            </li>
          </ul>
        </Section>

        <Section title="Orders & Payments">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>All orders are subject to acceptance and availability.</li>
            <li>
              Bulk discounts and offers are displayed in the App and may change
              without prior notice.
            </li>
            <li>
              Payments must be completed through our secure payment gateways.
            </li>
            <li>
              Once confirmed, orders cannot be canceled or changed unless allowed
              under our return/refund policy.
            </li>
          </ul>
        </Section>

        <Section title="Pricing & Offers">
          Prices displayed in the App are in [currency] and may include or
          exclude taxes as per local laws. Discounts are applicable only to bulk
          orders as defined in the App. We reserve the right to modify or
          withdraw offers at any time.
        </Section>

        <Section title="Shipping & Delivery">
          Delivery times will be provided during checkout but may vary due to
          logistics or unforeseen events. We are not liable for delays caused by
          courier partners or incorrect delivery details provided by users.
        </Section>

        <Section title="Returns & Refunds">
          Returns and refunds (if applicable) are subject to our Return & Refund
          Policy, available in the App. Bulk order discounts may affect
          eligibility for returns or refunds.
        </Section>

        <Section title="Data Security">
          <p className="mb-2">
            We use encryption, secure servers, and limited access protocols to
            protect your data. However, no online platform can guarantee 100%
            security.
          </p>
          <h4 className="font-medium mb-1">Your Rights</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Access, update, or delete your personal data.</li>
            <li>Opt out of marketing emails or notifications.</li>
            <li>
              Withdraw consent to data processing (may limit app functionality).
            </li>
          </ul>
        </Section>

        <Section title="Cookies & Tracking">
          Our App may use cookies or similar technologies to personalize content,
          remember preferences, and analyze usage trends.
        </Section>

        <Section title="Children’s Privacy">
          Our App is not intended for children under 13 (or relevant local age).
          We do not knowingly collect their data.
        </Section>

        <Section title="Third-Party Links">
          Our App may contain links to third-party websites/services. We are not
          responsible for their privacy practices.
        </Section>

        <Section title="Changes to this Policy">
          We may update this Privacy Policy from time to time. Any changes will
          be posted within the App with a revised “Effective Date.”
        </Section>

        <Section title="Contact Us">
          <p className="text-sm mb-2">
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
          </p>
          <p className="text-sm">📧 Email: support@yourapp.com</p>
          <p className="text-sm">📞 Phone: Your Support Number</p>
        </Section>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <section className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="text-sm">{children}</div>
  </section>
);

export default TermsAndConditions;
