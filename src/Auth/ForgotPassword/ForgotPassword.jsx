import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { resetPasswordFn, apiError } from "../../api/auth/forgotPassword.api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await resetPasswordFn({
        identifier: data.identifier.trim(),
        new_password: data.password,
      });
      toast.success(res.message);
      navigate("/auth/login", { replace: true });
    } catch (e) {
      toast.error(apiError(e, "Could not change password"));
    }
  };

  const inputClass = (err) =>
    `w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3170A6] transition-all ${
      err ? "border-red-500" : "border-[#C0C0C0]"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F0F2F5]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-[#C0C0C0]">
        <div className="px-6 py-5 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-[#112C4B]">Reset Password</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-6 pb-2 space-y-5">
            <p className="text-sm text-gray-600">
              Enter your registered email address or mobile number and set a new password.
            </p>

            {/* Email / Phone */}
            <div>
              <input
                type="text"
                placeholder="Email address or mobile number"
                {...register("identifier", {
                  required: "Email or mobile number is required",
                  pattern: {
                    value: /^(\+?\d{10,15}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/,
                    message: "Enter a valid email or mobile number",
                  },
                })}
                className={inputClass(errors.identifier)}
              />
              {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
            </div>

            {/* New password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className={`${inputClass(errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === passwordValue || "Passwords do not match",
                  })}
                  className={`${inputClass(errors.confirmPassword)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="px-6 py-4 mt-4 bg-[#F8F9FA] flex justify-end gap-3 rounded-b-lg">
            <Link
              to="/auth/login"
              className="px-5 py-2 rounded-md bg-[#C0C0C0] text-[#112C4B] font-medium hover:bg-[#A9A9A9] transition shadow-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-md bg-[#3170A6] text-white font-semibold hover:bg-[#112C4B] transition shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
