import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const fields = [
  "Name",
  "Email",
  "Username",
  "Father's Name",
  "Mother's Name",
  "Guardian's Name",
  "Date of Birth",
  "Nationality / Country",
  "Religion",
  "Education",
  "Married / Unmarried",
  "Phone Number",
  "City",
  "Present Address",
  "Permanent Address",
  "Name Of the Institution",
  "Hostel Branch",
];

const institutions = ["Institute A", "Institute B", "Institute C"];
const hostelBranches = ["Hostel 1", "Hostel 2", "Hostel 3"];

const UserForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <form className="mt-4 space-y-3 md:space-y-6">
      {fields.map((field, index) => {
        // Determine input type
        let type = "text";
        if (field === "Date of Birth") type = "date";
        if (field === "Email Address") type = "email";
        if (field === "Password") type = passwordShow ? "text" : "password";

        if (field === "Name Of the Institution" || field === "Hostel Branch") {
          const options =
            field === "Name Of the Institution" ? institutions : hostelBranches;

          return (
            <div className="flex flex-col gap-2" key={index}>
              <label
                className=" bg-white px-1 text-gray-500 transition-all
                 text-sm md:text-lg
                  peer-focus:text-black
                pointer-events-none"
              >
                {field}
              </label>
              <select
                className="peer w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg
                focus:outline-none focus:border-black transition-all"
                defaultValue=""
              >
                <option value="" disabled>
                  Select {field}
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div className="relative" key={index}>
            <input
              type={type}
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
              {field}
            </label>

            {/* Password toggle */}
            {field === "Password" && (
              <div
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute top-1/2 text-2xl -translate-y-1/2 text-gray-500 right-4"
              >
                {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full cursor-pointer py-1.5 md:py-3 bg-black text-white text-sm md:text-xl rounded-lg shadow-lg transition-all transform active:scale-95"
      >
        Sign Up
      </button>
    </form>
  );
};

export default UserForm;
