import React from "react";
import { Star } from "lucide-react";

const RideTestimonials = () => {
  const reviews = [
    {
      name: "Anika Rahman",
      role: "Daily Commuter",
      text: "Service ta khub e bhalo, driver-der behavior o khub professional.",
    },
    {
      name: "Rahat Kabir",
      role: "Business Traveler",
      text: "Airport-e jaoar jonno amar sob somoy prothom pochondo QuickRide.",
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">What our riders say</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-10 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-blue-200 transition-all"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-xl italic text-slate-700 mb-6">"{r.text}"</p>
              <div>
                <h4 className="font-bold text-slate-900">{r.name}</h4>
                <p className="text-sm text-slate-500">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RideTestimonials;
