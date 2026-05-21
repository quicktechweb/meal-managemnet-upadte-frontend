import React, { useState } from "react";
import {
  Star,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquareMore,
} from "lucide-react";

const App = () => {
  const [rating, setRating] = useState(5);

  return (
    <div className="min-h-screen bg-[#f6f8fc] relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-blue-100 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-cyan-100 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm mb-4">
              <Sparkles size={13} />
              Customer Feedback
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-gray-900 mb-4">
              Your feedback
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}matters.
              </span>
            </h1>

            <p className="text-[15px] text-gray-500 leading-relaxed max-w-xl">
              Help us improve your experience by sharing your thoughts and suggestions.
            </p>

          </div>

          {/* Rating Card */}
          <div className="bg-white rounded-[28px] border border-gray-200 shadow-sm p-6">

            <div className="flex items-start justify-between gap-5 mb-5">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
                  Experience Rating
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  How was it?
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <MessageSquareMore size={20} />
              </div>

            </div>

            <div className="flex items-center gap-2 mb-3">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="hover:scale-110 transition-all"
                >
                  <Star
                    size={30}
                    className={`${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-all`}
                  />
                </button>
              ))}

            </div>

            <p className="text-sm text-gray-500">
              {rating === 5 && "Excellent experience"}
              {rating === 4 && "Very good"}
              {rating === 3 && "Good experience"}
              {rating === 2 && "Needs improvement"}
              {rating === 1 && "Poor experience"}
            </p>

          </div>

        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">

          {/* Sidebar */}
          <div className="space-y-4">

            <div className="bg-white rounded-[28px] border border-gray-200 p-5 shadow-sm">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <MessageSquareMore size={20} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Honest Reviews
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                We carefully read every customer review and suggestion.
              </p>

            </div>

            <div className="bg-white rounded-[28px] border border-gray-200 p-5 shadow-sm">

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Secure & Private
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Your feedback stays confidential and securely stored.
              </p>

            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[28px] p-5 text-white shadow-lg">

              <p className="uppercase text-[11px] tracking-[0.2em] text-blue-100 mb-2">
                Satisfaction
              </p>

              <h2 className="text-4xl font-black mb-1">
                4.9/5
              </h2>

              <p className="text-sm text-blue-100">
                Trusted by thousands of happy customers worldwide.
              </p>

            </div>

          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 shadow-sm">

            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
                Feedback Form
              </p>

              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Share your thoughts
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                Tell us about your experience so we can continue improving.
              </p>

            </div>

            <form className="space-y-5">

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Carter"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>

              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Write subject..."
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your feedback..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              {/* Tags */}
              <div>

                <p className="text-sm font-medium text-gray-700 mb-3">
                  What impressed you most?
                </p>

                <div className="flex flex-wrap gap-2">

                  {[
                    "Support",
                    "Design",
                    "Performance",
                    "Features",
                    "Pricing",
                  ].map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 text-xs font-medium transition-all"
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

              {/* Footer */}
              <div className="pt-5 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 size={15} className="text-green-500" />
                  Your feedback is confidential.
                </div>

                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-blue-100"
                >
                  Submit Feedback
                  <Send size={15} />
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default App;