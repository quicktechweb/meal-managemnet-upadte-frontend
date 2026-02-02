import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: February 2, 2026
        </p>

        {/* Content */}
        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Introduction
            </h2>
            <p>
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your personal information when you
              use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, phone number, and account details when you register or
              use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and maintain our services</li>
              <li>To improve user experience</li>
              <li>To communicate important updates</li>
              <li>To ensure security and prevent fraud</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Data Protection
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal data from unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Cookies
            </h2>
            <p>
              We may use cookies and similar technologies to enhance your
              browsing experience and analyze usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Third-Party Services
            </h2>
            <p>
              We may share your information with trusted third-party services
              only when necessary to provide our services and comply with legal
              obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal
              information. You may also request information about how your data
              is used.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact our support team.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
