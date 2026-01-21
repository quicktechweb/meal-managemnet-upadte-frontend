import React from "react";
import { X, Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, restaurantName }) => {
  if (!isOpen) return null;

  // Mock data for the progress bars
  const ratingsData = [
    { stars: 5, width: "65%" },
    { stars: 4, width: "15%" },
    { stars: 3, width: "10%" },
    { stars: 2, width: "12%" },
    { stars: 1, width: "30%" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 p-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors z-10 bg-white"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            <p className="text-gray-500 text-sm">{restaurantName}</p>
          </div>

          {/* Rating Summary Card */}
          <div className="border border-gray-200 rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">3.5</div>
              <div className="flex text-orange-500 mb-1">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="none" />
                <Star size={16} fill="none" />
              </div>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                All Ratings (100+)
              </p>
            </div>

            <div className="flex-1 w-full space-y-2">
              {ratingsData.map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-3 text-xs font-medium"
                >
                  <span className="w-2 flex items-center gap-0.5">
                    {row.stars}{" "}
                    <Star
                      size={10}
                      fill="currentColor"
                      className="text-orange-500"
                    />
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">
              Top reviews
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">
              Newest
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">
              Highest rating
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">
              Lowest rating
            </button>
          </div>

          {/* Review Card */}
          <div className="border border-gray-200 rounded-2xl p-3">
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 text-lg">Alvee</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">3 weeks ago</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">10/10 would order again 😋🔥</p>

            <div className="space-y-3">
              <h5 className="font-bold text-sm text-gray-900 uppercase tracking-tight">
                Liked 1 dishes
              </h5>
              <div className="w-32 h-24 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
                  alt="Food dish"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
