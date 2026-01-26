import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomeLogin = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-[#fffcf5] mt-5 md:mt-10 lg:mt-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-[#fffcf5] to-red-50/40 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
      <div className="lg:max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 2xl:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className=" space-y-2 md:space-y-4 xl:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-orange-200/50 text-orange-600 font-semibold text-sm backdrop-blur-sm">
            <ChefHat className="w-4 h-4" />
            Join the Culinary Revolution
          </div>

          <h1 className="text-3xl md:text-5xl 2xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Digital <br />
            <span className="text-orange-500">Dining</span> Room.
          </h1>

          <p className="text-slate-500 text-sm xl:text-xl max-w-md leading-relaxed">
            Experience the future of food delivery with our premium chef-to-door
            service.
          </p>

          <div className="flex">
            <Link
              to={"/register/user"}
              className="group bg-orange-500 text-white px-6 py-2 rounded-2xl font-bold transition-all hover:bg-orange-600 flex items-center gap-3 shadow-xl shadow-orange-200 cursor-pointer"
            >
              Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute top-0 -right-10 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-[60px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 -left-10 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-[60px] opacity-30 animate-pulse delay-700"></div>

          {/* MAIN GLASS CONTAINER */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-xl group-hover:blur-2xl transition-all duration-500"></div>

            <div className="relative bg-white/40 backdrop-blur-2xl p-5 md:p-10 xl:p-14 rounded-[3rem] border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Glass Glint Effect (The "Shine") */}
              <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent rotate-45 pointer-events-none"></div>

              <div className="mb-5 md:mb-10">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                  Sign In
                </h2>
                <p className="text-slate-600 mt-2">
                  Enter your credentials to access your table.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 md:space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="chef@kitchen.com"
                    className="w-full px-6 py-2 rounded-2xl bg-white/40 border border-white/50 focus:border-orange-400 focus:bg-white/80 transition-all outline-none text-slate-800 placeholder:text-slate-400 backdrop-blur-md"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-sm font-bold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-bold text-orange-600"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-6 py-2 rounded-2xl bg-white/40 border border-white/50 focus:border-orange-400 focus:bg-white/80 transition-all outline-none text-slate-800 placeholder:text-slate-400 backdrop-blur-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-2 rounded-2xl font-bold transition-all hover:bg-black shadow-2xl active:scale-[0.98]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute hidden lg:block -bottom-8 -right-4 bg-white/90 backdrop-blur-md p-2 2xl:p-4 rounded-2xl shadow-xl border border-white rotate-6 hover:rotate-0 transition-transform cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-orange-500" />
              </div>
              <div className="leading-tight uppercase">
                <p className="text-sm font-black text-slate-800">Al Abadan</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeLogin;
