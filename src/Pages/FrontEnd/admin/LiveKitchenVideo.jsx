import React, { useState } from "react";
import {
  useAllLiveKitchenVideo,
  useDeleteKitchenvideo,
} from "../../../api/admin/admin.api";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Plus } from "lucide-react";

const LiveKitchenVideoTable = () => {
  const { data: liveKitchenVideo } = useAllLiveKitchenVideo();

  console.log(liveKitchenVideo);

  const { mutateAsync, isPending } = useDeleteKitchenvideo();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Kitchen Video</h2>

        <Link
          to="/admin/dashboard/add-live-kitchen"
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add Kitchen Video
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Video</th>
              <th className="px-6 py-3 text-left">Created at</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {liveKitchenVideo?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No Kitchen Video found
                </td>
              </tr>
            )}

            {liveKitchenVideo?.map((stream) => (
              <tr
                key={stream._id}
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="px-2 md:px-4 py-2  break-words max-w-[250px]">
                  <p className="line-clamp-2">{stream.title}</p>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedVideo(stream)}
                    className="text-blue-600 cursor-pointer hover:underline font-medium"
                  >
                    Play Video
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-500 font-medium">
                  {new Date(stream.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>
                <td className="px-6 py-4 font-medium">
                  <div className="flex items-center justify-start gap-2">
                    <Link
                      to={`/admin/dashboard/update-notice/${stream?._id}`}
                      className="text-lg md:text-xl hover:text-violet-700 duration-300"
                    >
                      <FiEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(stream)}
                      disabled={isPending}
                      className="text-lg cursor-pointer md:text-xl hover:text-red-600 duration-300"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>

              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 cursor-pointer hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="bg-black aspect-video">
              <video
                src={selectedVideo.kitchen_video}
                controls
                autoPlay
                className="w-full h-full"
                poster={selectedVideo?.kitchen_thumbnail?.[0]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveKitchenVideoTable;
