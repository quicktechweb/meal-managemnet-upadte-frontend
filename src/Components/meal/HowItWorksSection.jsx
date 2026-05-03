import React from "react";
import {
  UserPlus,
  Shield,
  LayoutDashboard,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const Step = ({ number, icon: Icon, title, description, isLast }) => (
  <div className="relative flex flex-col items-center text-center group w-full">
    {/* Icon Container */}
    <div className="relative z-10 bg-blue-600 p-4 rounded-xl mb-3 lg:mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-white" />
    </div>

    {/* Content */}
    <h3 className="text-lg font-bold text-slate-900  lg:mb-3">{title}</h3>
    <p className="text-gray-500 text-sm lg:leading-relaxed px-2">
      {description}
    </p>

    {/* Connecting Arrow (Visible only on desktop and if not last item) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-12 -right-4 translate-x-1/2 text-blue-200">
        <ArrowRight className="w-5 h-5" />
      </div>
    )}
  </div>
);

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Account",
      description:
        "Sign up with your college email in just 30 seconds. Fill in your details and submit!",
    },
    {
      number: "02",
      icon: Shield,
      title: "Institute Admin Approval",
      description:
        "Wait for Institute admin confirmation (usually within 24 hours). You'll get access once approved.",
    },
    {
      number: "03",
      icon: LayoutDashboard,
      title: "Access Dashboard",
      description:
        "Once approved, login to see today's menu, weekly plans, and start rating meals.",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Meal Control",
      description:
        "Easily turn your meal on or off before the institute's set time—no more unwanted meals or missed orders.",
    },
    {
      number: "05",
      icon: Star,
      title: "Rate & Improve",
      description:
        "Rate meals from 1-5 stars with comments. Your feedback helps improve food quality!",
    },
  ];

  return (
    <section className="bg-white py-10 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Badge & Header */}
        <div className="text-center mb-5 lg:mb-20">
          <span className="bg-blue-50 text-blue-600 px-2 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium border border-blue-100">
            Simple Process
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 mt-3 lg:mt-6 mb-2 lg:mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-sm lg:text-lg">
            Get started in under a minute
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {steps.map((step, index) => (
            <Step key={index} {...step} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
