import React from "react";
import { MapPin, Search, CheckCircle } from "lucide-react";

const RideHowItWorks = () => {
  const steps = [
    {
      icon: MapPin,
      title: "Set Destination",
      desc: "App open kore apnar pickup location ebong gontobbo set korun.",
    },
    {
      icon: Search,
      title: "Find a Driver",
      desc: "Amader system auto-matically apnar kacher best driver-ke khuje ber korbe.",
    },
    {
      icon: CheckCircle,
      title: "Enjoy the Ride",
      desc: "Relax korun ebong safely gontobbe pouchale payment complete korun.",
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white lg:mb-4">
            How QuickRide Works
          </h2>
          <p className="text-lg text-slate-400">
            Matro 3-ti simple step-e apnar ride confirm korun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Glassmorphism Icon Box */}
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl relative group hover:bg-white/20 transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                <step.icon
                  size={40}
                  className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RideHowItWorks;
