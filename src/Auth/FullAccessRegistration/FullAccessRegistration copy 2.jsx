import React from "react";

import { Link, NavLink, Outlet } from "react-router-dom";

const FullAccessRegistration = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-slate-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col max-w-2xl w-full overflow-hidden border border-white">
        <div className="py-5 px-4 md:px-8 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-block rounded-2xl  hover:scale-110 transition-transform duration-300">
              <Link to="/">
                <img
                  src="https://i.ibb.co.com/jj22tMj/Whats-App-Image-2026-01-14-at.png"
                  alt="Logo"
                  className="h-28  w-[120px]  "
                />
              </Link>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Join our community today
            </p>
          </div>

          <div className="flex w-full bg-slate-100 rounded-2xl p-1.5 mb-5 border border-slate-200">
            <NavLink
              to="/auth/all-access-register/normal-user"
              className={({ isActive }) =>
                `w-1/2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-orange-200" : "text-slate-500 hover:bg-slate-200/50"}`
              }
            >
              As User
            </NavLink>

            <NavLink
              to="/auth/all-access-register/institute"
              className={({ isActive }) =>
                `w-1/2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-orange-200" : "text-slate-500 hover:bg-slate-200/50"}`
              }
            >
              As Institute
            </NavLink>
          </div>

          {/* Form */}
          <Outlet />

          <p className="text-center mt-4 text-gray-600 font-medium">
            Already have an account?{" "}
            <Link
              className="text-purple-600 hover:text-purple-700 font-bold underline decoration-2 underline-offset-4"
              to="/#login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullAccessRegistration;
