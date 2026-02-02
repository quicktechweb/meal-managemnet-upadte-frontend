import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const InputField = ({ label, name, control, type = "text", rules = {} }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <div className="relative">
        <input
          {...field}
          type={type}
          placeholder=" "
          className={`peer w-full border rounded-md px-3 h-[50px] text-lg focus:outline-none focus:border-black transition-all ${
            fieldState.error ? "border-red-500" : "border-gray-200"
          }`}
        />
        <label
          className="absolute left-3 bg-white px-1 text-gray-500 transition-all
          top-1/2 -translate-y-1/2 text-sm md:text-lg
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
          peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
          pointer-events-none"
        >
          {label}
        </label>
        {fieldState.error && (
          <span className="text-red-500 text-sm mt-1 absolute left-0 -bottom-5">
            {fieldState.error.message}
          </span>
        )}
      </div>
    )}
  />
);

const UserForm = () => {
  const { handleSubmit, control, watch, setValue } = useForm();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);

  const occupation = watch("occupation");

  const onSubmit = (data) => {
    if (data) {
      navigate("/dashboard/mealmanagement");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-6"
      >
        <InputField
          label="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          }}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <div className="relative">
              <input
                {...field}
                type={passwordShow ? "text" : "password"}
                placeholder=" "
                className={`peer w-full border rounded-md px-3 h-[50px] text-lg focus:outline-none focus:border-black transition-all ${
                  fieldState.error ? "border-red-500" : "border-gray-200"
                }`}
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
              {fieldState.error && (
                <span className="text-red-500 text-sm mt-1 absolute left-0 -bottom-5">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <InputField
          label="Username"
          name="username"
          control={control}
          rules={{ required: "Username required" }}
        />
        <InputField label="Father Name" name="fatherName" control={control} />
        <InputField label="Mother Name" name="motherName" control={control} />
        <InputField
          label="Guardian Name"
          name="guardianName"
          control={control}
        />
        <InputField
          label="Date of Birth"
          name="dob"
          control={control}
          type="date"
        />
        <InputField label="Nationality" name="nationality" control={control} />
        <InputField label="Religion" name="religion" control={control} />
        <InputField label="Gender" name="gender" control={control} />
        <InputField
          label="Present Address"
          name="presentAddress"
          control={control}
        />
        <InputField
          label="Permanent Address"
          name="permanentAddress"
          control={control}
        />
        <InputField label="Phone Number" name="phone" control={control} />

        {/* Occupation */}
        <div className="flex flex-col gap-1">
          <h4>Occupation</h4>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue("occupation", "job_holder")}
              className={`px-4 py-1.5 flex-1 rounded-2xl flex items-center justify-center gap-1.5 border ${
                occupation === "job_holder" ? "border-black" : "border-gray-300"
              }`}
            >
              {occupation === "job_holder" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Job Holder
            </button>
            <button
              type="button"
              onClick={() => setValue("occupation", "student")}
              className={`px-4 py-1.5 flex-1 rounded-2xl flex items-center justify-center gap-1.5 border ${
                occupation === "student" ? "border-black" : "border-gray-300"
              }`}
            >
              {occupation === "student" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Student
            </button>
          </div>

          {occupation === "job_holder" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField label="Post Name" name="postName" control={control} />
              <InputField
                label="Company Name"
                name="companyName"
                control={control}
              />
            </div>
          )}
          {occupation === "student" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField
                label="Department Name"
                name="departmentName"
                control={control}
              />
              <InputField label="Year" name="year" control={control} />
            </div>
          )}
        </div>

        {/* Hostel */}
        <Controller
          name="hostel"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg"
            >
              <option value="" disabled>
                Name Of the Hall / Hostel
              </option>
              <option value="Hall 1">Hall 1</option>
              <option value="Hall 2">Hall 2</option>
              <option value="Hall 3">Hall 3</option>
            </select>
          )}
        />

        <button
          type="submit"
          className="w-full cursor-pointer py-3 bg-black text-white rounded-lg"
        >
          Sign Up
        </button>

        <div className="flex items-center gap-2 text-sm md:text-[18px]">
          <p>Already have an account?</p>
          <Link
            className="text-[rgba(50,100,245,0.90)] font-semibold"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
      </form>

      {/* {showHostelModal && (
        <AddHostelModal
          onClose={() => setShowHostelModal(false)}
          onAdd={(name) => console.log("Add Hostel:", name)}
        />
      )} */}
    </>
  );
};

// const AddHostelModal = ({ onClose, onAdd }) => {
//   const [hostelName, setHostelName] = useState("");

//   const handleAdd = () => {
//     if (!hostelName.trim()) return;
//     onAdd(hostelName);
//     setHostelName("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6 relative space-y-4">
//         <button
//           onClick={onClose}
//           className="absolute cursor-pointer right-4 top-4 p-1 border rounded-full"
//         >
//           <X size={18} />
//         </button>
//         <h2 className="text-xl font-semibold">Add Hostel Branch</h2>
//         <input
//           value={hostelName}
//           onChange={(e) => setHostelName(e.target.value)}
//           placeholder="Enter hostel name"
//           className="w-full border rounded-md px-3 h-[45px]"
//         />
//         <button
//           onClick={handleAdd}
//           className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md"
//         >
//           Add Hostel
//         </button>
//       </div>
//     </div>
//   );
// };

export default UserForm;
