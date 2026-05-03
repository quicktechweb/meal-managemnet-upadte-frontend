import React from "react";

const RideStats = () => {
  const stats = [
    { label: "Active Riders", value: "500K+" },
    { label: "Cities Covered", value: "50+" },
    { label: "Professional Drivers", value: "20K+" },
    { label: "Average Rating", value: "4.9/5" },
  ];

  return (
    <div className="bg-white py-12 mt-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-blue-600">
                {s.value}
              </div>
              <div className="text-slate-500 font-medium uppercase text-xs tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RideStats;
