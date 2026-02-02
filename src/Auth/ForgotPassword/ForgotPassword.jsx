import React, { useState } from "react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [password, setPassword] = useState("");

  console.log(generatedOtp);

  const handleSendOtp = (e) => {
    e.preventDefault();

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(newOtp);
    console.log("OTP sent to email:", email, "OTP:", newOtp);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp.toString()) {
      setStep(3);
    } else {
      alert("Invalid OTP, try again.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("Password reset for:", email, "New password:", password);
    alert("Password has been reset successfully!");
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white  flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="border border-gray-300 sm:mx-auto sm:w-full sm:max-w-md text-center py-8 rounded-2xl ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center ">
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <KeyRound className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            {step === 1
              ? "Forgot password?"
              : step === 2
                ? "Enter OTP"
                : "Reset Password"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {step === 1
              ? "Enter your email to receive an OTP."
              : step === 2
                ? `We've sent an OTP to ${email}.`
                : "Set your new password."}
          </p>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white pt-2 px-4 border border-slate-100 sm:rounded-2xl sm:px-10">
            {step === 1 && (
              <form className="space-y-3" onSubmit={handleSendOtp}>
                <div>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                >
                  Send OTP
                </button>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-3" onSubmit={handleVerifyOtp}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-slate-700"
                  >
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-2 w-full text-sm cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Resend OTP
                </button>
              </form>
            )}

            {step === 3 && (
              <form className="space-y-3" onSubmit={handleResetPassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                >
                  Reset Password
                </button>
              </form>
            )}

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
