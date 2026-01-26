import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { X } from "lucide-react";

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
  const [hostelBranches, setHostelBranches] = useState([
    "Hostel 1",
    "Hostel 2",
    "Hostel 3",
  ]);
  const [showHostelModal, setShowHostelModal] = useState(false);

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
        <InputField label="Phone Number" />

        {/* Institution */}
        <select className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg">
          <option disabled selected>
            Name Of the Institution
          </option>
          {institutions.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>

        {/* Hostel Branch */}
        <div className="flex items-center gap-2">
          <select className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg">
            <option disabled selected>
              Hostel Branch
            </option>
            {hostelBranches.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowHostelModal(true)}
            className="h-[50px] px-4 bg-orange-500 text-white rounded-md text-2xl flex items-center justify-center cursor-pointer"
          >
            <FiPlusCircle />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <select
            className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
                focus:outline-none focus:border-black transition-all"
            defaultValue=""
          >
            <option value="" disabled>
              Select Provide Meal
            </option>

            <option>Hostel </option>
            <option>Outsite</option>
          </select>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-lg">
          Sign Up
        </button>
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
