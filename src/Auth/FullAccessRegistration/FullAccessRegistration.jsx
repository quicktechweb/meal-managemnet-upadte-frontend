import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegister } from "../../api/auth/auth.hook";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Briefcase,
  Heart,
} from "lucide-react";

import { FaRegIdCard } from "react-icons/fa";
import { BiSolidInstitution } from "react-icons/bi";

import toast from "react-hot-toast";

const FullAccessRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutation, isPending } = useRegister();

  const selectedUserType = watch("userType");

  const onSubmit = async (data) => {
    const userData = { websiteAccesstype: "allAccess", ...data };
    try {
      await mutation.mutateAsync(userData);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const password = watch("password");

  const FormInput = ({ icon: Icon, type, placeholder, name, validation }) => (
    <div className="space-y-1">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
          <Icon size={18} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full pl-12 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs ml-1">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-slate-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col max-w-2xl w-full overflow-hidden border border-white">
        <div className="py-5 px-4 md:px-8 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg hover:scale-110 transition-transform duration-300">
              <Link to="/">
                <img
                  src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
                  alt="Logo"
                  className="w-[150px] "
                />
              </Link>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Join our community today
            </p>
          </div>

          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              icon={User}
              type="text"
              placeholder="Full Name"
              name="fullName"
              validation={{ required: "Required" }}
            />
            <FormInput
              icon={User}
              type="text"
              placeholder="Username"
              name="username"
              validation={{ required: "Required" }}
            />

            <div className="md:col-span-2">
              <FormInput
                icon={Mail}
                type="email"
                placeholder="Email Address"
                name="email"
                validation={{
                  required: "Required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                }}
              />
            </div>

            <FormInput
              icon={Phone}
              type="tel"
              placeholder="Phone Number"
              name="phone"
              validation={{ required: "Required" }}
            />
            <FormInput
              icon={Briefcase}
              type="text"
              placeholder="Occupation"
              name="occupation"
            />

            <FormInput
              icon={Heart}
              type="text"
              placeholder="Father's Name"
              name="fatherName"
              validation={{ required: "Required" }}
            />
            <FormInput
              icon={Heart}
              type="text"
              placeholder="Mother's Name"
              name="motherName"
              validation={{ required: "Required" }}
            />

            <div className="md:col-span-2">
              <FormInput
                icon={Home}
                type="text"
                placeholder="Residential Address"
                name="address"
                validation={{ required: "Required" }}
              />
            </div>

            <div className="user-type flex flex-col  md:col-span-2 gap-6">
              <h3>Select User Type</h3>

              {/* for normal user */}

              <div className="flex items-center gap-2.5">
                {/* Normal User */}
                <div className="flex items-center gap-2">
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="radio"
                      value="user"
                      {...register("userType", {
                        required: "Select User Type",
                      })}
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">Normal User</p>
                </div>

                {/* Institute User */}
                <div className="flex items-center gap-2">
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="radio"
                      value="institute"
                      {...register("userType", {
                        required: "Select User Type",
                      })}
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">Institute User</p>
                </div>
              </div>

              {selectedUserType === "user" && (
                <div className="flex flex-col gap-2">
                  <FormInput
                    icon={FaRegIdCard}
                    type="number"
                    placeholder="NID Number"
                    name="nid"
                    validation={{ required: "NID is Required" }}
                  />
                  <div className="w-full max-w-xl">
                    <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
                      Upload Your NID
                    </label>

                    <div className="relative flex items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-purple-600  transition">
                      <input
                        type="file"
                        id="image"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      <span className="text-gray-400 text-sm truncate">
                        Choose an image…
                      </span>

                      <span className="shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm px-4 py-1.5 rounded-lg  transition">
                        Browse
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              )}

              {selectedUserType === "institute" && (
                <div className="flex flex-col gap-2.5">
                  <FormInput
                    icon={BiSolidInstitution}
                    type="text"
                    placeholder="Institute Name"
                    name="institute"
                    validation={{ required: "Institute is Required" }}
                  />

                  <div className="w-full max-w-xl">
                    <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
                      Upload Your Institute Document
                    </label>

                    <div className="relative flex items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-purple-600  transition">
                      <input
                        type="file"
                        id="image"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      <span className="text-gray-400 text-sm truncate">
                        Choose an image…
                      </span>

                      <span className="shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm px-4 py-1.5 rounded-lg  transition">
                        Browse
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                className="w-full pl-12 pr-12 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (v) => v === password || "Match failed",
                })}
                className="w-full pl-12 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="md:col-span-2 mt-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600 font-medium">
            Already have an account?{" "}
            <Link
              className="text-purple-600 hover:text-purple-700 font-bold underline decoration-2 underline-offset-4"
              to="/#login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullAccessRegistration;
