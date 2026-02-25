import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const FullAccessRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const options = [
    {
      label: "As User",
      path: "/auth/all-access-register/normal-user",
    },
    {
      label: "As Institute",
      path: "/auth/all-access-register/institute",
    },
  ];

  const activeOption =
    options.find((opt) => location.pathname.includes(opt.path)) || options[0];

  const handleSelect = (option) => {
    navigate(option.path);
    setOpen(false);
  };
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

          <div className="relative flex items-center justify-center  mb-4">
            {/* Selected */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-200 transition w-[200px]"
            >
              <span className="font-semibold text-slate-700">
                {activeOption.label}
              </span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
                size={18}
              />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute w-[200px]  bg-white border border-slate-200 top-0 rounded-xl shadow-lg overflow-hidden z-50">
                {options.map((option) => (
                  <div
                    key={option.path}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-3 cursor-pointer text-sm font-medium transition 
              ${
                location.pathname === option.path
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <Outlet />

          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-center mt-4 text-gray-600 font-medium">
              Already have an account?{" "}
            </p>
            <Link
              className=" w-[150px] inline-block text-center bg-[#3170A6] px-4 text-white py-1 rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
              to="/#login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullAccessRegistration;
