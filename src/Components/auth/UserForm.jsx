import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const UserForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <form className="mt-4 space-y-3 md:space-y-6">
      <div className="relative">
        <input
          type="text"
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
          Full Name
        </label>
      </div>

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
          type="tel"
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
          Phone Number
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
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
          Branch Name
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
          className="absolute top-1/2 text-2xl -translate-y-1/2 text-gray-500   right-4"
        >
          {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer py-1.5 md:py-3 bg-black text-white  text-sm md:text-xl rounded-lg shadow-lg transition-all transform active:scale-95"
      >
        Sign Up
      </button>

      <div>
        <div className="mb-1 md:mb-2 text-sm md:text-[18px] flex items-center gap-2">
          <p>Already have an account?</p>{" "}
          <Link
            className="text-[rgba(50,100,245,0.90)] font-semibold"
            to={"/auth/login"}
          >
            Login
          </Link>
        </div>

        <div className="flex gap-2 items-center justify-center mt-2 md:mt-4">
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
  );
};

export default UserForm;
