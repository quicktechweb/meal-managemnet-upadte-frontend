import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handleCancel = () => {
    reset({
      password: "",
      confirmPassword: "",
    });
    clearErrors();
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-[#C0C0C0]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-[#112C4B]">
            Create a New Password
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6">
            <p className="text-sm text-gray-600 mb-5 font-medium">
              Your new password must be at least 6 characters long.
            </p>

            {/* New Password */}
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full border rounded-md px-4 py-2.5 pr-11 focus:outline-none focus:ring-2 transition-all
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-[#C0C0C0] focus:ring-[#3170A6]"
                }`}
              />

              <div
                className="absolute right-3 top-3 cursor-pointer text-[#112C4B] hover:text-[#3170A6] transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className={`w-full border rounded-md px-4 py-2.5 pr-11 focus:outline-none focus:ring-2 transition-all
                ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-400"
                    : "border-[#C0C0C0] focus:ring-[#3170A6]"
                }`}
              />

              <div
                className="absolute right-3 top-3 cursor-pointer text-[#112C4B] hover:text-[#3170A6] transition"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#F8F9FA] flex justify-end gap-3 rounded-b-lg border-t border-[#C0C0C0]">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-md bg-[#C0C0C0] text-[#112C4B] font-bold hover:bg-[#A9A9A9] transition shadow-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md bg-[#3170A6] text-white font-bold hover:bg-[#112C4B] transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Updating..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
