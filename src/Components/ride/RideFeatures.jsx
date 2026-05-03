import React from "react";
import RideFeatureCard from "./RideFeatureCard";
import { ShieldCheck, Clock, Smartphone } from "lucide-react";

const RideFeatures = () => {
  return (
    <section id="features" className="py-10 lg:py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 lg:mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-4">
            Redefining the way you travel
          </h2>
          <p className="text-slate-500 text-sm lg:text-lg">
            Safe, sustainable, and reliable transportation for everyone,
            everywhere.
          </p>
        </div>
        <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">
          View all services
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
        <RideFeatureCard
          icon={ShieldCheck}
          title="Safety Protocol"
          description="Strict health and safety measures for a worry-free ride."
        />
        <RideFeatureCard
          icon={Clock}
          title="Rapid Response"
          description="Average pickup time of 3.5 minutes in downtown areas."
        />
        <RideFeatureCard
          icon={Smartphone}
          title="Smart UI"
          description="Intuitive interface designed for speed and accessibility."
        />
      </div>
    </section>
  );
};

export default RideFeatures;
