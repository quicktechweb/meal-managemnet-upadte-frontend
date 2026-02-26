import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SelectRecovery = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      method: "email",
      username: "Naymur Rahman",
      contact: "n***@gmail.com",
    },
  });

  const selectedMethod = watch("method");

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    if (data) {
      navigate("/auth/new-password")
    }
  };

  const handleMethodChange = (value) => {
    setValue("method", value);

    if (value === "email") {
      setValue("contact", "n***@gmail.com");
    } else {
      setValue("contact", "+8801******34");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-[#C0C0C0]">
        <div className="px-6 py-5 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-[#112C4B]">
            Reset Your Password
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6">
            <p className="text-sm text-gray-600 mb-5 font-medium">
              How do you want to receive the code?
            </p>

            {/* Hidden Fields */}
            <input type="hidden" {...register("username")} />
            <input type="hidden" {...register("contact")} />

            {/* Profile Info */}
            <div className="flex items-center gap-4 p-4 border border-[#6AB2E2] rounded-lg mb-6 bg-[#F0F7FF]">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-14 h-14 rounded-full border-2 border-[#3170A6]"
              />
              <div>
                <p className="font-bold text-[#112C4B]">{watch("username")}</p>
                <p className="text-xs text-[#3170A6] font-semibold uppercase tracking-wider">
                  Abadan User
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {/* Email */}
              <label
                className={`flex items-center gap-3 border-2 rounded-lg p-4 cursor-pointer transition-all 
                ${
                  selectedMethod === "email"
                    ? "border-[#3E8E53] bg-[#F0FAF2]"
                    : "border-[#C0C0C0] hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  value="email"
                  {...register("method", {
                    required: "Select a recovery method",
                  })}
                  checked={selectedMethod === "email"}
                  onChange={() => handleMethodChange("email")}
                  className="w-4 h-4 accent-[#3E8E53]"
                />
                <div>
                  <p className="text-sm font-bold">Send code via Email</p>
                  <p className="text-xs text-gray-500">n***@gmail.com</p>
                </div>
              </label>

              {/* SMS */}
              <label
                className={`flex items-center gap-3 border-2 rounded-lg p-4 cursor-pointer transition-all 
                ${
                  selectedMethod === "sms"
                    ? "border-[#3E8E53] bg-[#F0FAF2]"
                    : "border-[#C0C0C0] hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  value="sms"
                  {...register("method", {
                    required: "Select a recovery method",
                  })}
                  checked={selectedMethod === "sms"}
                  onChange={() => handleMethodChange("sms")}
                  className="w-4 h-4 accent-[#3E8E53]"
                />
                <div>
                  <p className="text-sm font-bold">Send code via SMS</p>
                  <p className="text-xs text-gray-500">+8801******34</p>
                </div>
              </label>
            </div>

            {errors.method && (
              <p className="text-red-500 text-sm mt-3">
                {errors.method.message}
              </p>
            )}
          </div>

          <div className="px-6 py-4 bg-[#F8F9FA] flex justify-end gap-3 rounded-b-lg border-t border-[#C0C0C0]">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-[#C0C0C0] text-[#112C4B] font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#3170A6] text-white font-bold hover:bg-[#112C4B] transition shadow-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectRecovery;
