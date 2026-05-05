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
  const { mutateAsync, isPending } = useDeleteKitchenvideo();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Kitchen Video</h2>

        <Link
          to="/admin/dashboard/add-live-kitchen"
          className="inline-flex items-center gap-2 px-3 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-xs md:text-sm"
        >
          <Plus size={16} />
          Add
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Video</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {liveKitchenVideo?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Kitchen Video found
                </td>
              </tr>
            )}

            {liveKitchenVideo?.map((stream) => (
              <tr
                key={stream._id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="px-6 py-4 max-w-[250px]">
                  <p className="line-clamp-2">{stream.title}</p>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedVideo(stream)}
                    className="text-blue-600 hover:underline"
                  >
                    Play Video
                  </button>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(stream.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link
                      to={`/admin/dashboard/update-live-kithen/${stream._id}`}
                    >
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(stream)}
                      disabled={isPending}
                    >
                      <MdDelete className="text-lg hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden space-y-3">
        {liveKitchenVideo?.length === 0 && (
          <p className="text-center py-4">No Kitchen Video found</p>
        )}

        {liveKitchenVideo?.map((stream) => (
          <div
            key={stream._id}
            className="bg-white p-3 rounded-xl shadow-sm border border-gray-300"
          >
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {stream.title}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              {new Date(stream.createdAt).toLocaleString("en-BD", {
                timeZone: "Asia/Dhaka",
              })}
            </p>

            <button
              onClick={() => setSelectedVideo(stream)}
              className="text-blue-600 text-sm font-medium mb-2"
            >
              ▶ Play Video
            </button>

            <div className="flex justify-end gap-4 mt-2">
              <Link to={`/admin/dashboard/update-live-kithen/${stream._id}`}>
                <FiEdit className="text-lg hover:text-violet-600" />
              </Link>

              <button onClick={() => handleDelete(stream)} disabled={isPending}>
                <MdDelete className="text-lg hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3">
          <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-300">
              <h3 className="font-semibold text-sm md:text-lg line-clamp-1">
                {selectedVideo.title}
              </h3>

              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Video */}
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
