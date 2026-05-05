import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";

const RideHero = () => {
  return (
    <section className="relative lg:min-h-[60vh] flex items-center px-6 pt-5  bg-white">
      <div className=" mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center relative z-10">
        {/* Left Content - Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 lg:space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            NOW LIVE IN DHAKA
          </div>

          <h1 className="text-4xl xl:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Move <span className="text-blue-600">Faster</span>,<br />
            Ride Smarter.
          </h1>

          <p className="text-sm xl:text-xl text-slate-600 max-w-lg leading-relaxed">
            City-r traffic-ke pichone fele safely gontobbe pouchao. Affordable
            fare ebong premium service-er bhorsha ekhon apnar hater muthoy.
          </p>

          {/* Search/Booking Card */}
          <div className="p-2 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] rounded-[32px] border border-slate-100 max-w-md">
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                <MapPin
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Where are you now?"
                  className="w-full bg-transparent outline-none font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="h-[1px] bg-slate-100 mx-4"></div>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                <Navigation
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full bg-transparent outline-none font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
            <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 lg:py-5 rounded-[24px] transition-all flex items-center justify-center gap-2 group text-sm lg:text-base">
              Find My Ride
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
          </div>
        </motion.div>

        {/* Right Content - Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Main Hero Image */}
          <div className="relative z-10 w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop](https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
              alt="Ride Sharing Service"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Data Card 1 */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-16 z-20 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4"
          >
            <div className="bg-green-100 p-3 rounded-2xl text-green-600">
              <Navigation size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">ETA</p>
              <p className="text-lg font-black text-slate-800">03 Mins</p>
            </div>
          </motion.div>

          {/* Floating Data Card 2 */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 -right-5 z-20 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 font-bold text-xl">
              ৳
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">FARE ESTIMATE</p>
              <p className="text-lg font-black text-slate-800">৳120 - ৳150</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RideHero;
