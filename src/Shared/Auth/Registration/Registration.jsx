import { NavLink, Outlet, useLocation } from "react-router-dom";

const Registration = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 flex items-center justify-center w-full mt-14 md:mt-0 ">
      <div
        className={`flex flex-row-reverse ${location?.pathname === "/register/user" ? "md:h-[900px] h-auto" : "h-[620px] md:h-[700px] xl:h-[800px] 2xl:h-[900px] "}  justify-center items-center shadow-2xl rounded-2xl `}
      >
        <div className="relative w-full max-w-xl h-full bg-white   overflow-hidden md:flex flex-col items-center justify-between py-12 rounded-tr-2xl rounded-br-2xl hidden">
          <div className="absolute -bottom-10 -right-20 w-96 h-96 rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://i.ibb.co.com/mrn7r0S2/pexels-julieaagaard-2097090-removebg-preview.png"
              alt="Tomatoes"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="hidden md:flex flex-col justify-between items-center bg-white p-8 max-w-[350px] text-sm">
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-black">
                  ✅ Delivering Across All Major Cities in Bangladesh
                </p>
                <p className="flex items-center gap-2 text-black">
                  ✅ Thousands of Meal Options
                </p>
                <p className="flex items-center gap-2 text-black">
                  ✅ Trusted by Lakhs of Happy Customers
                </p>

                {/* QR Section */}
                <div className="flex mt-10   items-start ">
                  <div>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sellular-app"
                      alt="QR Code"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="ms-5">
                    <p className="mt-2 font-bold">DON’T HAVE SELLAR APP?</p>
                    <p>Download it here!</p>
                    <p>Scan the QR code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  registration Form */}
        <div className="relative w-full max-w-[500px] h-full bg-white overflow-hidden p-4 lg:p-8  flex flex-col rounded-tl-2xl rounded-bl-2xl">
          <div className="mt-4">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-black ">
              Register
            </h2>
          </div>

          <div className="mt-1.5 lg:mt-3">
            <h3 className="text-base  text-[#818181]">
              Register to get full access and connect with us
            </h3>
          </div>

          <div className="flex w-full max-w-sm bg-gray-100 rounded-lg p-1 mt-4">
            <NavLink
              to="/register/user"
              className={({ isActive }) =>
                `w-1/2 py-2 rounded-md text-sm font-medium transition-all text-center
      ${isActive ? "bg-white text-gray-900 shadow" : "text-gray-500"}`
              }
            >
              As User
            </NavLink>

            <NavLink
              to="/register/mess"
              className={({ isActive }) =>
                `w-1/2 py-2 rounded-md text-sm font-medium transition-all text-center
      ${isActive ? "bg-white text-gray-900 shadow" : "text-gray-500"}`
              }
            >
              As Mess
            </NavLink>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Registration;
