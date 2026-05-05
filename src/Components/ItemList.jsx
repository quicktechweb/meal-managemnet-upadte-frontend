import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDeleteItem, useGetItems } from "../api/admin/admin.api";

const ItemList = () => {
  const { data, isLoading } = useGetItems();
  const { mutateAsync, isPending } = useDeleteItem();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="service-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Item Lists
        </h3>
        <Link
          to="/admin/dashboard/add-item"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs sm:text-sm transition active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Add New Item
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20 text-slate-500">Loading Items...</div>
      )}

      {/* ══ DESKTOP TABLE (md+) ══ */}
      <div className="hidden md:block bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">Item Image</th>
              <th className="px-6 py-4 font-semibold">Item Name</th>
              <th className="px-6 py-4 font-semibold">Ingredients</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Item Video</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-20 object-contain rounded-lg mx-auto"
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
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2.5">
                    <Link
                      to={`/admin/dashboard/update-item/${item?._id}`}
                      className="text-xl cursor-pointer hover:text-violet-700 duration-300"
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

      {/* ══ MOBILE CARDS (< md) ══ */}
      <div className="md:hidden flex flex-col gap-3">
        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden"
          >
            {/* Top: image + name + price + actions */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-xl shrink-0 bg-slate-50"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">
                  {item.title}
                </p>
                <p className="text-violet-600 font-bold text-base mt-0.5">
                  ৳ {item.price}
                </p>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin/dashboard/update-item/${item?._id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
                >
                  <FiEdit size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={isPending}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            </div>

            {/* Bottom: ingredients + video */}
            <div className="px-4 py-3 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Ingredients
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.ingridents ? item?.ingridents : "N/A",
                  }}
                  className="text-xs text-slate-600 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside line-clamp-2"
                />
              </div>
              {item?.video && (
                <button
                  onClick={() => setSelectedVideo(item)}
                  className="shrink-0 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                >
                  ▶ Video
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="text-center py-16 text-slate-400 text-sm">
          No items found.
        </div>
      )}

      {/* Video Modal — unchanged */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 cursor-pointer hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>
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
