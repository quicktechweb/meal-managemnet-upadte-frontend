import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: "🏪",
      title: "Browse Restaurants",
      desc: "Explore a wide variety of top-rated restaurants directly on our platform.",
    },
    {
      id: "02",
      icon: "🍔",
      title: "Choose Your Meal",
      desc: "Check out the menus, pick your favorite dishes, and add them to your cart.",
    },
    {
      id: "03",
      icon: "🚀",
      title: "Order & Delivery",
      desc: "Checkout securely and track your hot, fresh food right to your doorstep.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="pt-8 pb-8 px-6 lg:px-10 bg-white relative"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-blue-500 font-bold tracking-wider uppercase mb-2">
          Process
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          How It Works
        </h3>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Getting your favorite food is easier than ever. Just browse, choose,
          and order!
        </p>
      </div>

      {/* Process Steps */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group"
          >
            {/* Step Number Badge */}
            <div className="absolute -top-5 -right-5 w-12 h-12 bg-gray-900 text-white font-bold rounded-full flex items-center justify-center text-lg border-4 border-white shadow-md group-hover:bg-blue-500 transition-colors">
              {step.id}
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>

            {/* Content */}
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              {step.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
