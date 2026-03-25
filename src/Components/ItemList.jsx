import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDeleteItem, useGetItems } from "../api/admin/admin.api";

const ItemList = () => {
  const { data, isLoading } = useGetItems();
  const { mutateAsync, isPending } = useDeleteItem();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="service-container ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Item Lists
        </h3>

        <Link
          to="/admin/dashboard/add-item"
          className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700  text-white rounded-xl font-semibold shadow-lg text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add New Item
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20 text-slate-500">Loading Items...</div>
      )}

      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">Item Image</th>
              <th className="px-6 py-4 font-semibold">Item Name</th>
              <th className="px-6 py-4 font-semibold">Ingridients</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Item video</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-300 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 md:w-28 h-14 md:h-20 object-contain rounded-lg mx-auto"
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item.title}
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.ingridents ? item?.ingridents : "N/A",
                    }}
                    className="[&_h1]:text-xl [&_h2]:text-xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside line-clamp-2"
                  />
                </td>
                <td className="px-6 py-4 font-bold text-violet-600">
                  ৳ {item.price}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item?.video ? (
                    <button
                      onClick={() => setSelectedVideo(item)}
                      className="text-blue-600 cursor-pointer hover:underline font-medium"
                    >
                      Play Video
                    </button>
                  ) : (
                    "N/A"
                  )}
                </td>

                <td className="px-6 py-4 flex items-center justify-end gap-2.5 ">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/dashboard/update-item/${item?._id}`}
                      className="text-xl cursor-pointer hover:text-violet-700  duration-300"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      disabled={isPending}
                      className="text-xl duration-300 hover:text-red-600 cursor-pointer"
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
                src={selectedVideo.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
