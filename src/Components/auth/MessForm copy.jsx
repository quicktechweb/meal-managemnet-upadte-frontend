



import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const MessForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [totalMembers, setTotalMembers] = useState("");
  const [members, setMembers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const handleAddMembers = () => {
    if (!totalMembers || totalMembers < 1) return;

    setMembers(
      Array.from({ length: Number(totalMembers) }, () => ({
        fullName: "",
        phone: "",
        image: null,
      })),
    );

    setVisibleCount(1);
  };

  const handleMemberChange = (index, field, value) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index][field] = value;

      if (
        field === "fullName" &&
        value.trim() !== "" &&
        index + 1 < prev.length &&
        visibleCount === index + 1
      ) {
        setVisibleCount((c) => c + 1);
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ totalMembers, members });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto mt-6 space-y-3 h-[600px] overflow-y-auto  rounded-lg"
    >
      {/* Basic Info */}
      <FloatingInput label="Full Name" type="text" />
      <FloatingInput label="Email Address" type="email" />
      <FloatingInput label="Phone Number" type="tel" />

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
        <FloatingLabel text="Total Mess Member" />
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddMembers}
        className="w-full py-2 border border-black rounded-xl font-semibold hover:bg-black hover:text-white cursor-pointer "
      >
        + Add Mess Member Information
      </button>

      {/* Members */}
      {members.slice(0, visibleCount).map((member, index) => (
        <div key={index} className="p-2 rounded-lg space-y-4">
          <h3 className="font-semibold">Member {index + 1}</h3>

          <div className="relative">
            <input
              type="text"
              value={member.fullName}
              onChange={(e) =>
                handleMemberChange(index, "fullName", e.target.value)
              }
              placeholder=" "
              className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
            />
            <FloatingLabel text="Full Name" />
          </div>

          <div className="relative">
            <input
              type="tel"
              value={member.phone}
              onChange={(e) =>
                handleMemberChange(index, "phone", e.target.value)
              }
              placeholder=" "
              className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
    focus:outline-none focus:border-black transition-all"
            />
            <FloatingLabel text="Phone Number" />
          </div>

          <input
            type="file"
            onChange={(e) =>
              handleMemberChange(index, "image", e.target.files[0])
            }
            className="w-full border rounded-md px-3 py-3"
          />
        </div>
      ))}

      {/* SIGN UP */}
      <button
        type="submit"
        className="w-full py-3 cursor-pointer bg-black text-white text-xl rounded-lg"
      >
        Sign Up
      </button>
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
