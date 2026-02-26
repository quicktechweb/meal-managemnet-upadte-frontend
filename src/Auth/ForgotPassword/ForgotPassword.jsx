import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      navigate("/auth/select-recovery");
    }

    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F0F2F5]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-[#C0C0C0]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-[#112C4B]">
            Find Your Account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="px-6 pt-6 pb-2">
            <p className="text-sm text-gray-600 mb-4">
              Please enter your email address or mobile number to search for
              your account.
            </p>

            <input
              type="text"
              placeholder="Email address or mobile number"
              {...register("identifier", {
                required: "Email or mobile number is required",
                pattern: {
                  value:
                    /^(\+?\d{10,15}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/,
                  message: "Enter a valid email or mobile number",
                },
              })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3170A6] transition-all
                ${errors.identifier ? "border-red-500" : "border-[#C0C0C0]"}`}
            />

            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#F8F9FA] flex justify-end gap-3 rounded-b-lg">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2 rounded-md bg-[#C0C0C0] text-[#112C4B] font-medium hover:bg-[#A9A9A9] transition shadow-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-md bg-[#3170A6] text-white font-semibold hover:bg-[#112C4B] transition shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
