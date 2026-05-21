import React, { useState } from "react";
import { Star, User } from "lucide-react";

const Review = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Tonmoy",
      rating: 5,
      comment: "Service was excellent! খুব ভালো সার্ভিস পেয়েছি।",
      date: "2026-05-20",
    },
    {
      id: 2,
      name: "Rahim",
      rating: 4,
      comment: "Good service but একটু improvement দরকার।",
      date: "2026-05-18",
    },
    {
      id: 2,
      name: "Rahim",
      rating: 4,
      comment: "Good service but একটু improvement দরকার।",
      date: "2026-05-18",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Customer Reviews
        </h1>
        <p className="text-gray-500 mt-2">
          What our users say about our service
        </p>
      </div>

      {/* Reviews */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-3">
              
              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">
                    {r.name}
                  </h2>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span className="text-sm font-medium text-yellow-600">
                  {r.rating}.0
                </span>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < r.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;