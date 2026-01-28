import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { TiTick } from "react-icons/ti";
import { useLogin } from "../../../api/auth/auth.hook";
import { useForm } from "react-hook-form";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data) => {
    await mutateAsync(data);
    reset();
  };
  return (
    <div className="min-h-screen mt-10 bg-white p-4 md:p-10 flex items-center justify-center w-full ">
      <div className="flex flex-row-reverse h-auto  justify-center items-center shadow-2xl rounded-2xl ">
        <div className="relative w-full lg:w-1/2 bg-white overflow-hidden hidden md:flex flex-col items-center justify-center p-4 text-black">
          {/* Accent Glow */}
          {/* <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none"></div> */}

          <div className="z-10 space-y-8 max-w-sm text-center lg:text-left">
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

        {/*  Login Form */}
        <div className="relative w-full max-w-full md:max-w-[450px] h-full bg-white overflow-hidden p-4 lg:p-8 flex flex-col rounded-tl-2xl rounded-bl-2xl">
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 md:mt-8 space-y-3 md:space-y-6"
          >
            <div className="relative">
              <input
                type="email"
                {...register("email")}
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
                {...register("password")}
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
              {isPending ? "loading...." : "Login"}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
