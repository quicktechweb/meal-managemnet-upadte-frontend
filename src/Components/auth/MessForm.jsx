import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const MessForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [totalMembers, setTotalMembers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ totalMembers, members });
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto space-y-3  rounded-lg">
      {/* Basic Info */}
      <FloatingInput label="Username" type="text" />

      <FloatingInput label="Email" type="email" />

      {/* Password */}
      <div className="relative">
        <input
          type={passwordShow ? "text" : "password"}
          placeholder=" "
          className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
        />
        <FloatingLabel text="Password" />
        <div
          onClick={() => setPasswordShow(!passwordShow)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl cursor-pointer"
        >
          {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
      </div>

      <FloatingInput label="Phone Number" type="tel" />

      <FloatingInput label="Address" type="text" />

      {/* Total Members */}
      <div className="relative">
        <input
          type="number"
          min="1"
          value={totalMembers}
          onChange={(e) => setTotalMembers(e.target.value)}
          placeholder=" "
          className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
        />
        <FloatingLabel text="Total  Member" />
      </div>
      <div className="flex flex-col gap-2">
        <select
          className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
                focus:outline-none focus:border-black transition-all"
          defaultValue=""
        >
          <option value="" disabled>
            Select Name of the institute
          </option>

          <option>Institute 1</option>
        </select>
      </div>

      <div className="flex items-center gap-2.5 ">
        <label className="relative inline-block w-[18px] h-[10px]">
          <input type="checkbox" className="peer sr-only" />
          {/* Track */}
          <span
            className="
      absolute inset-0 rounded-full bg-black cursor-pointer
      transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
     peer-checked:bg-[#F26831]
      peer-focus:ring-1 peer-focus:ring-[#ec7c4f]
    "
          ></span>

          {/* Thumb */}
          <span
            className="
      absolute top-0 left-0 h-[10px] w-[10px] bg-white rounded-full
      shadow-md
      transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
      peer-checked:translate-x-[8px]
    "
          ></span>
        </label>
        <label htmlFor="electricity-bill">Electricity Bill</label>
      </div>

      <div className="flex items-center gap-2.5 ">
        <label className="relative inline-block w-[18px] h-[10px]">
          <input type="checkbox" className="peer sr-only" />
          {/* Track */}
          <span
            className="
      absolute inset-0 rounded-full bg-black cursor-pointer
      transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
      peer-checked:bg-[#F26831]
      peer-focus:ring-1 peer-focus:ring-[#ec7c4f]
    "
          ></span>

          {/* Thumb */}
          <span
            className="
      absolute top-0 left-0 h-[10px] w-[10px] bg-white rounded-full
      shadow-md
      transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
      peer-checked:translate-x-[8px]
    "
          ></span>
        </label>
        <label htmlFor="electricity-bill">Staff Bill</label>
      </div>

      {/* <div className="flex items-center gap-2.5 ">
        <input type="checkbox" name="staff-bill" />
        <label htmlFor="staff-bill">Staff Bill</label>
      </div> */}

      {/* SIGN UP */}
      <button
        type="submit"
        className="w-full py-3 cursor-pointer bg-black text-white text-xl rounded-lg"
      >
        Sign Up
      </button>

      <div>
        <div className="mb-1 mb:mb-2 text-sm md:text-[18px] flex items-center gap-2">
          <p>Already have an account?</p>{" "}
          <Link
            className="text-[rgba(50,100,245,0.90)] font-semibold"
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default MessForm;

/* ---------- floating input ---------- */

const FloatingInput = ({ label, type }) => (
  <div className="relative">
    <input
      type={type}
      placeholder=" "
      className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
    />
    <FloatingLabel text={label} />
  </div>
);

const FloatingLabel = ({ text }) => (
  <label
    className="absolute left-3 bg-white px-1 text-gray-500 transition-all
    top-1/2 -translate-y-1/2
    peer-focus:top-1 peer-focus:text-xs
    peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
    pointer-events-none"
  >
    {text}
  </label>
);
