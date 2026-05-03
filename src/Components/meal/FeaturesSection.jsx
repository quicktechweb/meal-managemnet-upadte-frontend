import React from "react";
import {
  Calendar,
  Star,
  TrendingUp,
  Smartphone,
  Clock,
  ShieldCheck,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, iconColor, iconBg }) => (
  <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow duration-300">
    <div className={`p-3 rounded-lg ${iconBg} mb-3 lg:mb-6`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-1.5 lg:mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Daily & Weekly Menus",
      description:
        "Check today's breakfast, lunch, snacks & dinner. Plan your week ahead with the full weekly menu view.",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
    },
    {
      icon: Star,
      title: "Rate Every Meal",
      description:
        "Give 1-5 star ratings with comments. Your honest feedback helps the mess improve quality.",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      icon: TrendingUp,
      title: "Track Your History",
      description:
        "See all your past ratings and attendance. Know which meals you loved and which need improvement.",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      description:
        "Access from phone, tablet or computer. The app adapts perfectly to any screen size.",
      iconColor: "text-pink-500",
      iconBg: "bg-pink-50",
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description:
        "Track attendance instantly with fingerprint scanning and get real-time balance updates without any delay.",
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description:
        "Your data is safe with us. Only you and institute admins can see your ratings and feedback.",
      iconColor: "text-cyan-500",
      iconBg: "bg-cyan-50",
    },
  ];

  return (
    <section id="features" className="bg-slate-50 py-10 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 lg:mb-16">
          <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-500 text-base lg:text-lg">
            Simple tools to make your mess experience better
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
