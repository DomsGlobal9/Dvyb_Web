// src/pages/PrivacyPolicy.jsx
import React from "react";
import DVYBLogo from "./DVYBLogo";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-xl p-6 md:p-10">
        {/* Header Logo */}
         <DVYBLogo  />

        {/* Privacy Policy Content */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              Privacy Policy
            </h2>
            <p>
              DVYB Bulk Ordering values your trust and is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              store, and protect your personal information when you use our mobile
              application and services related to bulk clothing purchases.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              Information We Collect
            </h3>
            <p>
              When you use our App, we may collect the following types of
              information:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, billing/shipping address.
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials,
                preferences, order history.
              </li>
              <li>
                <strong>Payment Information:</strong> Credit/debit card details,
                UPI, or other payment method (processed securely by third-party
                providers; we do not store sensitive payment details).
              </li>
              <li>
                <strong>Device Information:</strong> Device type, operating
                system, unique device identifiers, IP address.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages viewed, time spent on the App,
                clicks, and interactions for improving user experience.
              </li>
            </ul>
          </section>

          {/* How We Use */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              How We Use Your Information
            </h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Process and deliver bulk clothing orders.</li>
              <li>Provide discounts, offers, and personalized deals.</li>
              <li>Send order updates, confirmations, and support messages.</li>
              <li>Improve our services, user interface, and experience.</li>
              <li>Prevent fraud, unauthorized transactions, and maintain security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* Sharing Info */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              Sharing of Information
            </h3>
            <p>
              We do not sell or rent your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Service Providers:</strong> Payment gateways, delivery
                partners, cloud storage providers.
              </li>
              <li>
                <strong>Business Partners:</strong> To provide offers, promotions,
                or additional services.
              </li>
              <li>
                <strong>Legal Authorities:</strong> If required by law or to
                protect rights, safety, and property.
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Data Security</h3>
            <p>
              We use encryption, secure servers, and limited access protocols to
              protect your data. However, no online platform can guarantee 100%
              security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Your Rights</h3>
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing emails or notifications.</li>
              <li>
                Withdraw consent to data processing (may limit app functionality).
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Cookies & Tracking</h3>
            <p>
              Our App may use cookies or similar technologies to personalize
              content, remember preferences, and analyze usage trends.
            </p>
          </section>

          {/* Children */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              Children’s Privacy
            </h3>
            <p>
              Our App is not intended for children under 13 (or relevant local
              age). We do not knowingly collect their data.
            </p>
          </section>

          {/* Third-Party */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              Third-Party Links
            </h3>
            <p>
              Our App may contain links to third-party websites/services. We are
              not responsible for their privacy practices.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">
              Changes to this Policy
            </h3>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted within the App with a revised “Effective Date.”
            </p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2">
              📧 <span className="font-medium">Email:</span>{" "}
              support@yourapp.com <br />
              📞 <span className="font-medium">Phone:</span> Your Support Number
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
