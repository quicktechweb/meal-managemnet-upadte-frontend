import React from "react";
import { motion } from "framer-motion";

const RideFeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative p-5 lg:p-10 bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden group transition-all duration-500"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Icon Container */}
        <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-4 lg:mb-8 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
          <Icon
            size={36}
            className="text-blue-600 group-hover:text-white transition-colors duration-500"
          />
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold  lg:mb-4 text-slate-900 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed text-sm lg:text-base group-hover:text-blue-50 transition-colors duration-500">
          {description}
        </p>

        {/* Decorative Element */}
        <div className="mt-4 lg:mt-8 flex items-center gap-2 text-blue-600 group-hover:text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          Learn more
          <span className="text-xl">→</span>
        </div>
      </div>

      {/* Abstract Background Shape */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors duration-500"></div>
    </motion.div>
  );
};

export default RideFeatureCard;
