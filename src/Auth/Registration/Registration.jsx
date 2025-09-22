import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {  FaFacebookF } from "react-icons/fa";

export default function Registration() {
  const [tab, setTab] = useState("signup");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      alert("Enter a valid phone number");
      return;
    }
    setOtpSent(true);
    // here you can call API to send OTP
    console.log("OTP sent to:", phone);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      // demo: correct OTP
      setOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify OTP before signing up.");
      return;
    }
    alert("Registration Successful!");
  };



  return (
    <div className="mt-7  flex items-center justify-center bg-gray-50">
      <div className="bg-white  w-full max-w-4xl shadow-[0_2px_18px_rgba(0,0,0,0.15)] rounded-md flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-sm font-bold mb-4">WELCOME TO Lucky Shop</h2>

          {/* Tabs */}
          <div className="flex mb-4">
            <button
              onClick={() => setTab("login")}
              className={`w-1/2 py-2 text-sm font-semibold  ${
                tab === "login" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`w-1/2 py-2 text-sm font-semibold border ${
                tab === "signup" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
       <form className="space-y-4" onSubmit={handleRegister}>
      {/* Email */}
      <input
        type="email"
        placeholder="Email Address *"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
        required
      />

      {/* Phone Number */}
      <div className="flex gap-2">
        <input
          type="tel"
          placeholder="Phone Number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          required
        />
        {!otpSent && (
          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-black text-white px-4 rounded-md text-sm font-semibold"
          >
            Send OTP
          </button>
        )}
      </div>

      {/* OTP Field */}
      {otpSent && !otpVerified && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 rounded-md text-sm font-semibold"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* Passwords */}
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-black text-white px-3 text-xs font-bold rounded-md"
        >
          Password
        </button>
        <input
          type="password"
          placeholder="Password *"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          required
        />
      </div>

      <input
        type="password"
        placeholder="Confirm Password *"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
        required
      />

      {/* Mailing List */}
      <label className="flex items-start gap-2 text-xs">
        <input type="checkbox" className="mt-1" />
        <span>
          Join <span className="font-semibold">Our Mailing List</span> - Get updates on
          Rollbacks, special pricing, hot new items, gift ideas and more.
        </span>
      </label>

      {/* Register Button */}
      <button
        type="submit"
        disabled={!otpVerified}
        className={`w-full font-semibold py-2 rounded-md transition ${
          otpVerified
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Register
      </button>
    </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Register Buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center border-1  border-gray-300 rounded-md py-2 text-sm gap-2">
              <FcGoogle size={18} /> Register with Google
            </button>
           
            <button className="w-full flex items-center justify-center border-1  border-gray-300 rounded-md py-2 text-sm gap-2">
              <FaFacebookF size={18} className="text-blue-600" /> Register with Facebook
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-col justify-between w-1/2  bg-white border-1  border-gray-200 p-8 text-sm">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-green-600">
              ✅ Delivering in 10000+ Cities
            </p>
            <p className="flex items-center gap-2 text-green-600">
              ✅ Presence in 6 Continents
            </p>
            <p className="flex items-center gap-2 text-green-600">
              ✅ 100 Million Products
            </p>
            <p className="flex items-center gap-2 text-green-600">
              ✅ 10 Million Happy Customers & Counting
            </p>

             {/* QR Section */}
          <div className="flex mt-10   items-start ">
            <div>
              <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sellular-app"
              alt="QR Code"
              className="w-20 h-20"
            />
            </div>
           <div className="ms-5">
             <p className="mt-2 font-bold">DON’T HAVE SELLAR APP?</p>
            <p>Download it here!</p>
            <p>Scan the QR code</p>
           </div>
          </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
