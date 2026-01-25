import { NavLink, Outlet, useLocation } from "react-router-dom";

const Registration = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 flex items-center justify-center w-full mt-14 md:mt-12 font-sans">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div
        className={`relative flex flex-row-reverse bg-white/80 backdrop-blur-sm border border-white/20 
        ${location?.pathname === "/register/user" ? "md:h-[850px] h-auto" : "h-auto md:h-[700px] lg:h-[800px]"} 
        justify-center items-stretch shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden max-w-6xl w-full transition-all duration-500`}
      >
        {/* Right Side: */}
        <div className="relative w-full lg:w-1/2 bg-[#0F172A] overflow-hidden hidden md:flex flex-col items-center justify-center p-12 text-white">
          {/* Floating Image Decoration */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border-[12px] border-white/10 overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-700">
            <img
              src="https://i.ibb.co.com/mrn7r0S2/pexels-julieaagaard-2097090-removebg-preview.png"
              alt="Fresh Food"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          <div className="z-10 space-y-8 max-w-sm">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight">
                Join the largest food network in Bangladesh.
              </h2>

              <div className="space-y-4">
                {[
                  "Delivering Across All Major Cities",
                  "Thousands of Meal Options",
                  "Trusted by Lakhs of Happy Customers",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      ✓
                    </span>
                    <p className="text-gray-300 text-sm font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Section Modernized */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-5">
              <div className="p-2 bg-white rounded-xl shadow-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sellular-app"
                  alt="QR Code"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Mobile App
                </p>
                <p className="text-lg font-semibold leading-tight">
                  Scan to download
                  <br />
                  Sellar App
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col pb-5">
          <div className="px-7 py-3">
            <div className="mb-8 ">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Create Account
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                Join our community and start your journey with us today.
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex w-full bg-slate-100 rounded-2xl px-1.5 ">
              <NavLink
                to="/register/user"
                className={({ isActive }) =>
                  `w-1/2 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`
                }
              >
                As User
              </NavLink>

              <NavLink
                to="/register/mess"
                className={({ isActive }) =>
                  `w-1/2 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`
                }
              >
                As Institute
              </NavLink>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-grow px-7 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
