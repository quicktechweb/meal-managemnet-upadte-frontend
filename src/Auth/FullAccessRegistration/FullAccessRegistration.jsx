import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegister } from "../../api/auth/auth.hook";
import toast from "react-hot-toast";

const FullAccessRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutation, isPending } = useRegister();

  const onSubmit = async (data) => {
    const userData = {
      userType: "allAccess",
      ...data,
    };
    try {
      await mutation.mutateAsync(userData);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl flex flex-col max-w-xl w-full overflow-hidden">
        <div className="py-10 px-5 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-2 rounded-lg">
              <Link to={"/"} className="font-semibold flex items-center">
                <img
                  src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
                  alt="Appbeats Logo"
                  className="h-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <div className="flex items-center flex-col">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500 mb-4">
                Please fill in the details to get started
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="w-full">
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Father Name */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Father Name"
                {...register("fatherName", {
                  required: "Father Name is required",
                })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            {/* Mother Name */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Mother Name"
                {...register("motherName", {
                  required: "Mother Name is required",
                })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Occupation"
                {...register("occupation")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-5 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👁
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-700/50"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white font-semibold py-2 text-sm cursor-pointer rounded-2xl transition-all shadow-lg shadow-orange-200"
            >
              {isPending ? "creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <Link
              className="text-purple-700 font-semibold hover:underline"
              to="/#login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullAccessRegistration;
