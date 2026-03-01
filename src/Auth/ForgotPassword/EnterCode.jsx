import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const EnterCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Entered Code:", data.code);
    if (data) {
      navigate("/auth/new-password");
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-3 py-3 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-[#112C4B]">
            Enter Security Code
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="px-3 py-3">
            <p className="text-sm text-gray-600 mb-1">
              We sent a code to your {formData?.method}
            </p>
            <p className="text-sm font-bold text-[#3170A6] mb-5">
              {formData?.contact}
            </p>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter the code"
              {...register("code", {
                required: "Please enter the code",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be 6 digits",
                },
              })}
              className={`w-full border rounded-md px-2 py-2 tracking-[0.1em] text-xl font-bold text-[#112C4B] focus:outline-none focus:ring-1 transition-all ${
                errors.code
                  ? "border-red-500 focus:ring-red-400"
                  : "border-[#C0C0C0] focus:ring-[#3170A6]"
              }`}
            />

            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
            )}

            <div className="mt-4">
              <button
                type="button"
                className="text-[#3E8E53] text-sm font-semibold hover:underline hover:text-[#112C4B] transition"
              >
                Didn't get a code? Resend
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 py-2 bg-[#F8F9FA] flex justify-end gap-3 rounded-b-lg border-t border-[#C0C0C0]">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-md bg-[#C0C0C0] text-[#112C4B] font-semibold hover:bg-[#A9A9A9] text-sm cursor-pointer transition shadow-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md cursor-pointer bg-[#3170A6] text-white font-semibold text-sm hover:bg-[#112C4B] transition shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterCode;
