import { TiTick } from "react-icons/ti";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Registration = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-4 md:p-10 flex items-center justify-center w-full mt-14 md:mt-20 font-sans">
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      {/* <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse transition-delay-1000"></div> */}

      <div
        className={`relative flex flex-row-reverse bg-white border border-orange-100
        ${location?.pathname === "/register/user" ? "h-[850px]" : "h-[850px]"} 
        justify-center items-stretch shadow-[0_30px_60px_-15px_rgba(120,50,0,0.15)] rounded-[1rem] overflow-hidden max-w-6xl w-full transition-all duration-500`}
      >
        <div className="relative w-full lg:w-1/2 bg-white overflow-hidden hidden md:flex flex-col items-center justify-center px-4 text-black">
          {/* Accent Glow */}
          {/* <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none"></div> */}

          {/* Floating Image */}
          <div className="relative z-10 w-80 h-80 rounded-full border-[10px] border-white/5 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-700">
            <img
              src="https://i.ibb.co.com/mrn7r0S2/pexels-julieaagaard-2097090-removebg-preview.png"
              alt="Fresh Tomatoes"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="z-10 mt-5 space-y-4 max-w-sm text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold leading-tight">
                Fresh meals, <br />
                <span className="text-orange-400">delivered to your door.</span>
              </h2>

              <div className="space-y-3 pt-4">
                {[
                  "Delivering Across All Major Cities",
                  "Thousands of Healthy Options",
                  "Trusted by Lakhs of Happy Eaters",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 justify-center lg:justify-start"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[14px] text-white">
                      <TiTick />
                    </span>
                    <p className="text-black text-sm font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Section */}
            <div className="pt-8 mt-4 border-t border-white/10 flex items-center justify-center lg:justify-start gap-5">
              <div className="p-2 bg-white rounded-2xl">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sellular-app"
                  alt="QR Code"
                  className="w-14 h-14"
                />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-orange-400 font-black">
                  Get the App
                </p>
                <p className="text-sm font-medium text-black">
                  Scan to enjoy exclusive <br />
                  food discounts!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          <div className="px-5 pt-8">
            <div className="mb-5 ">
              <span className="text-orange-600 font-bold text-sm tracking-widest uppercase">
                Start for free
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-2">
                Register
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Join the community that celebrates good food and great
                connections.
              </p>
            </div>

            {/* Food-Themed Toggle Switch */}
            <div className="flex w-full bg-slate-100 rounded-2xl p-1.5 mb-5 border border-slate-200">
              <NavLink
                to="/register/user"
                className={({ isActive }) =>
                  `w-1/2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-slate-500 hover:bg-slate-200/50"}`
                }
              >
                As User
              </NavLink>

              <NavLink
                to="/register/mess"
                className={({ isActive }) =>
                  `w-1/2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 text-center
                ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-slate-500 hover:bg-slate-200/50"}`
                }
              >
                As Institute
              </NavLink>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow px-5 pb-8 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
