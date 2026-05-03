import React from "react";
import { Link } from "react-router-dom";

export default function BannerSection() {
  return (
    <div className="relative overflow-hidden bg-[#FAFBFF] flex items-center">
      {/* ── BACKGROUND GRADIENT BLOBS ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple blob bottom left (Replaced Yellow) */}
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/50 blur-[100px]" />
        {/* Indigo blob top right */}
        <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-200/60 blur-[100px]" />
        {/* Blue blob behind phone */}
        <div className="absolute top-1/2 right-[10%] h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-200/50 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl z-10 mx-auto w-full px-6 py-4 lg:px-8 xl:px-12 flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* ── LEFT COLUMN: TEXT CONTENT ── */}
        <div className="flex-1 w-full max-w-2xl text-left">
          {/* Trust Badge */}
          <div className=" lg:mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold text-indigo-700">
              Trusted by 500+ Students
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-3 lg:mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[64px] leading-[1.1]">
            Know What's <br />
            Cooking{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Before
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              You Go!
            </span>
          </h1>

          {/* Paragraph */}
          <p className="mb-4 lg:mb-8 text-sm lg:text-lg text-slate-500 leading-relaxed">
            Stop walking to mess blindly! Check daily menus, rate your meals,
            and help make hostel food better for everyone. It's free and takes
            30 seconds to start.
          </p>

          {/* Buttons */}
          <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row items-start gap-4">
            <Link
              to={"/register/user"}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 px-3  lg:px-6 py-2 lg:py-3.5  font-bold text-white transition-all shadow-lg shadow-indigo-200 text-sm lg:text-base"
            >
              Get Started — It's Free
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/100?img=1",
                "https://i.pravatar.cc/100?img=2",
                "https://i.pravatar.cc/100?img=3",
                "https://i.pravatar.cc/100?img=4",
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="User"
                  className="w-8 h-8 lg:h-10 lg:w-10 rounded-full border-2 border-white bg-slate-100 object-cover"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500">
              Join 500+ students already using Al-abadan
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN: PHONE MOCKUP ── */}
        <div className="flex-1 w-full relative flex justify-center  lg:mt-0">
          <div className="relative w-[350px] h-[600px]">
            {/* Phone Hardware */}
            <div className="absolute inset-0 bg-[#1A1C23] rounded-[3rem] shadow-2xl p-3 border-4 border-[#2A2C35]">
              {/* Phone Screen */}
              <div className="bg-white w-full h-full rounded-[2.25rem] overflow-hidden flex flex-col relative pb-4">
                {/* Status Bar Dummy */}
                <div className="h-6 w-full flex justify-center pt-2">
                  <div className="w-16 h-4 bg-[#1A1C23] rounded-full"></div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between px-4 mt-6 mb-4">
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Breakfast
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Lunch
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Snacks
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Dinner
                  </span>
                </div>

                {/* Title & Rating */}
                <div className="px-5 mb-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold text-slate-900">
                    Breakfast
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <span>⭐</span> 4.2
                  </div>
                </div>

                {/* Menu List */}
                <div className="px-4 flex-1 flex flex-col gap-3">
                  {[
                    { icon: "🥛", name: "Milk" },
                    { icon: "🍞", name: "Bread" },
                    { icon: "🧈", name: "Butter" },
                    { icon: "🥚", name: "Omelette" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-slate-50/80 rounded-xl p-3 border border-slate-100"
                    >
                      <div className="text-lg">{item.icon}</div>
                      <span className="text-sm font-medium text-slate-700">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rate Button */}
                <div className="px-4 mt-auto">
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-purple-200 hover:opacity-90 transition-opacity">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    Rate This Meal
                  </button>
                </div>
              </div>
            </div>

            {/* ── FLOATING CARDS ── */}
            {/* Top Right Floating Card */}
            <div
              className="absolute -right-12 top-24 bg-white px-4 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center gap-2 z-20 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <div className="text-purple-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                +25 ratings today
              </span>
            </div>

            {/* Bottom Left Floating Card */}
            <div
              className="absolute -left-16 bottom-32 bg-white px-4 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center gap-2 z-20 animate-bounce"
              style={{ animationDuration: "4s" }}
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Menu updated!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
