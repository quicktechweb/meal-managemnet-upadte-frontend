import React from "react";
import { CheckCircle2 } from "lucide-react";

const RideAppPreview = () => {
  return (
    <section id="app" className=" bg-slate-50 overflow-hidden">
      <div className="py-8 mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Book your ride in <span className="text-blue-600">seconds</span>
          </h2>
          <p className="text-lg text-slate-600">
            Amader smart algorithm apnar kacher sobcheye bhalo driver-ke khuje
            ber kore jate apnar somoy bache.
          </p>

          <ul className="space-y-4">
            {[
              "Real-time tracking",
              "Multiple payment methods",
              "Emergency SOS button",
              "Ride scheduling",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-semibold text-slate-700"
              >
                <CheckCircle2 className="text-green-500" size={24} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 relative">
          {/* Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/20 blur-3xl rounded-full"></div>

          {/* Mockup Placeholder */}
          <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
              alt="App UI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RideAppPreview;
