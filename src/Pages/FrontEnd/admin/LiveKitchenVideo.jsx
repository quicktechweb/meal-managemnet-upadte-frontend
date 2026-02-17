import React from "react";
import { Play, Users, Circle } from "lucide-react";
import { useAllLiveKitchenVideo } from "../../../api/admin/admin.api";

const kitchenStreams = [
  {
    id: 1,
    name: "Main Prep Station",
    chef: "Chef Marco",
    viewers: "1.2k",
    status: "Live",
    thumbnail:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400",
  },
  {
    id: 2,
    name: "Pastry & Dessert",
    chef: "Chef Elena",
    viewers: "850",
    status: "Live",
    thumbnail:
      "https://images.unsplash.com/photo-1556910602-3884ee026896?auto=format&fit=crop&w=400",
  },
  {
    id: 3,
    name: "Grill Section",
    chef: "Chef David",
    viewers: "420",
    status: "Offline",
    thumbnail:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400",
  },
];

const LiveKitchenVideo = () => {
  const { data: liveKitchenVideo } = useAllLiveKitchenVideo();

  console.log(liveKitchenVideo);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Live Kitchen Video List
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveKitchenVideo?.map((stream) => (
          <div
            key={stream._id}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Video Thumbnail Container */}
            <div className="relative aspect-video bg-gray-200">
              <img
                src={stream.kitchen_thumbnail[0]}
                alt={stream.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Play Button Hover State */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                  <Play className="text-red-600 fill-current" size={24} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900">
                {stream.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveKitchenVideo;
