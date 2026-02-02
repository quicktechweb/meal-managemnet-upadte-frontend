import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className=" bg-gray-50 flex flex-col max-w-[500px] p-4">
      {/* Card Container */}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Change Password
      </h2>

      {/* Old Password */}
      <div className="mb-4 relative">
        <label className="block text-gray-600 mb-2">Old Password</label>
        <input
          type={showOld ? "text" : "password"}
          placeholder="Enter old password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div
          className="absolute right-3 top-1/2 translate-y-1/2  cursor-pointer text-gray-500"
          onClick={() => setShowOld(!showOld)}
        >
          {showOld ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <label className="block text-gray-600 mb-2">New Password</label>
        <input
          type={showNew ? "text" : "password"}
          placeholder="Enter new password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div
          className="absolute right-3 top-1/2 translate-y-1/2  cursor-pointer text-gray-500"
          onClick={() => setShowNew(!showNew)}
        >
          {showNew ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-6 relative">
        <label className="block text-gray-600 mb-2">Confirm Password</label>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm new password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div
          className="absolute right-3 top-1/2 translate-y-1/2  cursor-pointer text-gray-500"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
      </div>

      <button className="w-full bg-black cursor-pointer text-white font-semibold py-2 rounded-xl transition">
        Update Password
      </button>
    </div>
  );
};

export default ChangePassword;
