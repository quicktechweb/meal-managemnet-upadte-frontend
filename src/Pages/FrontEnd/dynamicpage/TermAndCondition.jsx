import React from "react";

const TermAndCondition = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: February 2, 2026
        </p>

        {/* Section */}
        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to our platform. By accessing or using our services, you
              agree to be bound by these Terms and Conditions. Please read them
              carefully before using our website or application.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. User Responsibilities
            </h2>
            <p>
              You agree to use the platform only for lawful purposes and in a
              way that does not infringe the rights of others or restrict their
              use of the service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Account & Security
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Payments & Services
            </h2>
            <p>
              All payments are non-refundable unless otherwise stated. We
              reserve the right to modify or discontinue services at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We shall not be liable for any indirect, incidental, or
              consequential damages arising from the use or inability to use our
              services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              platform if you violate these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions from time to time.
              Continued use of the service after changes indicates acceptance of
              the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact our support team.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermAndCondition;
