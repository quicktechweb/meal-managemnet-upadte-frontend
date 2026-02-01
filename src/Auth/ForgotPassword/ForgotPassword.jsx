import React, { useState } from "react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className="bg-indigo-100 p-3 rounded-full">
            <KeyRound className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-2xl sm:px-10">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
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

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <p className="text-sm font-medium text-green-800">
                  Check your email! We've sent a recovery link to <b>{email}</b>
                  .
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Didn't receive the email? Click to retry
              </button>
            </div>
          )}

          <div className="mt-6">
            <a
              href="/login"
              className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
