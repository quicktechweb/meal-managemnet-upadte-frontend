import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const institutions = ["Institute A", "Institute B", "Institute C"];

const InputField = ({ label, type = "text", children }) => (
  <div className="relative">
    {children || (
      <input
        type={type}
        placeholder=" "
        className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
        focus:outline-none focus:border-black transition-all"
      />
    )}
    <label
      className="absolute left-3 bg-white px-1 text-gray-500 transition-all
      top-1/2 -translate-y-1/2 text-sm md:text-lg
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
      peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
      pointer-events-none"
    >
      {label}
    </label>
  </div>
);

const UserForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const [showHostelModal, setShowHostelModal] = useState(false);

  const [occupation, setOccupation] = useState("");

  return (
    <>
      <form className="space-y-3 md:space-y-6">
        <InputField label="Name" />
        <InputField label="Email" type="email" />

        {/* Password */}
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
            className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl text-gray-500 cursor-pointer"
          >
            {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
          </div>
        </div>

        <InputField label="Username" />
        <InputField label={"Father Name"} />
        <InputField label={"Mother Name"} />
        <InputField label={"Gurdian Name"} />
        <InputField label={"Date of Birth"} />
        <InputField label={"Nationality"} />
        <InputField label={"Religion"} />
        <InputField label={"Gender"} />
        <InputField label={"Present Address"} />
        <InputField label={"Permanent Address"} />
        <InputField label="Phone Number" />

        <div className="ccupation-container flex flex-col gap-1">
          <h4 className="">Occupation</h4>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOccupation("job_holder")}
              className="px-4 py-1.5 cursor-pointer bg-white border border-gray-300 flex-1 text-black rounded-2xl flex items-center justify-center gap-1.5"
            >
              {occupation === "job_holder" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Job Holder
            </button>
            <button
              type="button"
              onClick={() => setOccupation("student")}
              className="px-4 py-1.5 cursor-pointer bg-white border border-gray-300 flex-1 text-black rounded-2xl flex items-center justify-center gap-1.5"
            >
              {occupation === "student" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Student
            </button>
          </div>

          {occupation === "job_holder" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField label="Post Name" />
              <InputField label="Company Name" />
            </div>
          )}

          {occupation === "student" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField label="Deptartment Name" />
              <InputField label="Year" />
            </div>
          )}
        </div>

        <select className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg">
          <option disabled selected>
            Name Of the Hall / Hostel
          </option>

          <option value={"Hall 1"}>Hall 1</option>
          <option value={"Hall 2"}>Hall 2</option>
          <option value={"Hall 3"}>Hall 3</option>
        </select>

        {/* Institution */}
        {/* <select className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg">
          <option disabled selected>
            Name Of the Institution
          </option>
          {institutions.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select> */}

        <button className="w-full py-3 bg-black text-white rounded-lg">
          Sign Up
        </button>

        <div>
          <div className="mb-1 mb:mb-2 text-sm md:text-[18px] flex items-center gap-2">
            <p>Already have an account?</p>{" "}
            <Link
              className="text-[rgba(50,100,245,0.90)] font-semibold"
              to={"/auth/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </form>

      {showHostelModal && (
        <AddHostelModal
          onClose={() => setShowHostelModal(false)}
          onAdd={(name) => setHostelBranches((prev) => [...prev, name])}
        />
      )}
    </>
  );
};

const AddHostelModal = ({ onClose, onAdd }) => {
  const [hostelName, setHostelName] = useState("");

  const handleAdd = () => {
    if (!hostelName.trim()) return;
    onAdd(hostelName);
    setHostelName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 p-1 border rounded-full"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold">Add Hostel Branch</h2>

        <input
          value={hostelName}
          onChange={(e) => setHostelName(e.target.value)}
          placeholder="Enter hostel name"
          className="w-full border rounded-md px-3 h-[45px]"
        />

        <button
          onClick={handleAdd}
          className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md"
        >
          Add Hostel
        </button>
      </div>
    </div>
  );
};

export default UserForm;
