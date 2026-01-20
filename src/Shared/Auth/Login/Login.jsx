import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div className="min-h-screen mt-10 bg-white p-4 md:p-10 flex items-center justify-center w-full ">
      <div className="flex flex-row-reverse h-auto md:h-[650px] justify-center items-center shadow-2xl rounded-2xl ">
        <div className="relative w-full max-w-xl h-full bg-white   overflow-hidden md:flex flex-col items-center justify-between py-12 rounded-tr-2xl rounded-br-2xl hidden ">
          <div className="hidden md:block  absolute -bottom-10 -right-20 w-96 h-96 rounded-full overflow-hidden border-4 border-white">
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

        {/*  Login Form */}
        <div className="relative w-full max-w-full md:max-w-[500px] h-full bg-white overflow-hidden p-4 lg:p-8 flex flex-col rounded-tl-2xl rounded-bl-2xl">
          <div className="mt-4">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-black ">
              Login
            </h2>
          </div>

          <div className="mt-1.5 lg:mt-3">
            <h3 className="text-sm lg:text-base  text-[#818181]">
              Please enter your login details to sign in.
            </h3>
          </div>

          <form className="mt-4 md:mt-8 space-y-3 md:space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
              />

              <label
                className="absolute left-3 bg-white px-1 text-gray-500 transition-all
    top-1/2 -translate-y-1/2 text-sm md:text-lg
    peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
    peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
    pointer-events-none"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type={passwordShow ? "text" : "password"}
                placeholder=" "
                className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
               focus:outline-none focus:border-black transition-all"
              />

              <label
                className="absolute left-3 bg-white px-1 text-gray-500 transition-all
    top-1/2 -translate-y-1/2 text-sm md:text-lg
    peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
    peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
    pointer-events-none"
              >
                Password
              </label>

              <div
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute top-1/2 text-sm md:text-2xl -translate-y-1/2 text-gray-500   right-4"
              >
                {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm md:text-base">
              <label className="flex items-center text-[#818181]">
                <input type="checkbox" className="mr-2 accent-black" />
                Keep me logged in
              </label>
              <Link
                to={"#"}
                type="button"
                className="text-[#818181] hover:underline"
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-1.5 md:py-3 bg-black text-white text-sm md:text-xl rounded-lg shadow-lg transition-all transform active:scale-95"
            >
              Login
            </button>

            <div>
              <div className="mb-1 mb:mb-2 text-sm md:text-[18px] flex items-center gap-2">
                <p>Don’t have an account?</p>{" "}
                <Link
                  className="text-[rgba(50,100,245,0.90)] font-semibold"
                  to={"/register/user"}
                >
                  Sign up
                </Link>
              </div>

              <div className="flex gap-2 items-center mt-2 md:mt-4">
                <div className="border-t-2 border-gray-300 w-[60px] sm:w-[100px] md:w-[150px] "></div>
                <h3 className="text-[14px] text-nowrap">or continue with</h3>
                <div className="border-t-2 border-gray-300 w-[60px] sm:w-[100px] md:w-[150px] "></div>
              </div>

              {/* social link */}

              <div className="flex flex-wrap gap-3.5 items-center mt-2 md:mt-4 justify-center">
                <Link className="p-2 md:p-[15px] border border-[#d1d1d1] rounded-2xl flex items-center justify-center text-xl md:text-4xl text-blue-500 hover:bg-gray-100/40">
                  <FaFacebook />
                </Link>
                <Link className="p-2 md:p-[15px] border border-[#d1d1d1] rounded-2xl flex items-center justify-center ttext-xl md:text-4xl  text-blue-500 hover:bg-gray-100/40">
                  <FcGoogle />
                </Link>
                <Link className="p-2 md:p-[15px] border border-[#d1d1d1] rounded-2xl flex items-center justify-center text-xl md:text-4xl hover:bg-gray-100/40">
                  <FaApple />
                </Link>
                <Link className="p-2 md:p-[15px] border border-[#d1d1d1] rounded-2xl flex items-center justify-center text-xl md:text-4xl  text-blue-400 hover:bg-gray-100/40">
                  <FaTwitter />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
