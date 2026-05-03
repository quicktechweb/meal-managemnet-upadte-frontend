import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase } from "lucide-react";

const VehicleOptions = () => {
  const fleet = [
    {
      type: "Moto",
      title: "Quick Bike",
      desc: "Traffic-ke pichone fele druto gontobbe pouchate best option.",
      capacity: "1 Rider",
      price: "৳",
      image:
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop",
    },
    {
      type: "Economy",
      title: "Standard Car",
      desc: "Protidin-er jatra ba office commute-er jonno affordable ebong comfortable.",
      capacity: "4 Seats",
      price: "৳৳",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      type: "Premium",
      title: "Luxury SUV",
      desc: "Business meeting ba special event-er jonno premium ebong spacious ride.",
      capacity: "6 Seats",
      price: "৳৳৳",
      image:
        "https://images.unsplash.com/photo-1503376712344-903901b63dd1?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Choose Your Ride
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Je kono proyojone, apnar budget ebong comfort onujayi best gari-ti
            beche nin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleet.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative bg-slate-100">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 z-10">
                  {item.type}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-blue-600 font-black">{item.price}</span>
                </div>
                <p className="text-slate-600 mb-6 min-h-[60px]">{item.desc}</p>

                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-blue-500" />
                    {item.capacity}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-500" />
                    AC Available
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleOptions;
