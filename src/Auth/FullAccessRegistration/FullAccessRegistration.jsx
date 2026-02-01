import React, { useState } from "react";
import { Link } from "react-router-dom";

const FullAccessRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-[40px] shadow-2xl flex flex-col max-w-3xl w-full overflow-hidden">
        <div className=" py-10 px-5 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 ">
            <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-2 rounded-lg">
              <Link to={"/"} className="font-semibold flex items-center">
                <img
                  src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
                  alt="Appbeats Logo"
                  className="h-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <div className="flex items-center flex-col">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500 mb-4">
                Please fill in the details to get started
              </p>
            </div>
          </div>

          <form className="space-y-4 w-full">
            {/* Full Name */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              {" "}
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <div className="w-full">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <div className="w-full">
              {" "}
              <input
                type="text"
                placeholder="Father Name"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Mother Name"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Occupation"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👁
              </button>
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white font-semibold py-2 text-sm cursor-pointer rounded-2xl transition-all shadow-lg shadow-orange-200">
              Create Account
            </button>
          </form>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <a
              className="text-purple-700 font-semibold hover:underline"
              href="#"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullAccessRegistration;
