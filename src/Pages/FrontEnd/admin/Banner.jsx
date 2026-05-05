import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAllBanner, useDeletebanner } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Banner = () => {
  const { data } = useAllBanner();
  const { mutateAsync, isPending } = useDeletebanner();

  const handleDelete = async (banner) => {
    await mutateAsync(banner?._id);
  };

  return (
    <div className="p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg md:text-xl font-bold">Banner List</h4>

        <Link
          to="/admin/dashboard/add-banner"
          className="inline-flex items-center gap-2 px-3 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-xs md:text-sm"
        >
          <Plus size={16} />
          Add
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-xl">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Description</th>
              <th className="p-3 border border-gray-300 text-center">
                Background
              </th>
              <th className="p-3 border border-gray-300 text-center">Banner</th>
              <th className="p-3 border border-gray-300 text-center">
                Created
              </th>
              <th className="p-3 border border-gray-300 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Banner found
                </td>
              </tr>
            )}

            {data?.map((banner) => (
              <tr key={banner._id} className="border-t border-gray-300 text-sm">
                <td className="p-3 border border-gray-300 max-w-[220px]">
                  <p className="line-clamp-2">{banner.title}</p>
                </td>

                <td className="p-3 border border-gray-300 max-w-[220px] text-gray-600">
                  <p className="line-clamp-2">{banner.description}</p>
                </td>

                <td className="p-3 border border-gray-300 text-center">
                  <img
                    src={banner.banner_bg}
                    alt=""
                    className="w-28 h-16 object-cover rounded mx-auto"
                  />
                </td>

                <td className="p-3 border border-gray-300 text-center">
                  <img
                    src={banner.banner_image}
                    alt=""
                    className="w-10 mx-auto"
                  />
                </td>

                <td className="p-3 border border-gray-300  text-center">
                  {new Date(banner.createdAt).toDateString()}
                </td>

                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/dashboard/update-banner/${banner._id}`}>
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(banner)}
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
      <div className="md:hidden space-y-4">
        {data?.length === 0 && (
          <p className="text-center py-4">No Banner found</p>
        )}

        {data?.map((banner) => (
          <div
            key={banner._id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm p-3"
          >
            {/* Image Preview */}
            <div className="relative mb-2">
              <img
                src={banner.banner_bg}
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />

              <img
                src={banner.banner_image}
                alt=""
                className="w-12 absolute bottom-2 right-2 bg-white p-1 rounded"
              />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-sm line-clamp-2">
              {banner.title}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {banner.description}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(banner.createdAt).toDateString()}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-3">
              <Link to={`/admin/dashboard/update-banner/${banner._id}`}>
                <FiEdit className="text-lg hover:text-violet-600" />
              </Link>

              <button onClick={() => handleDelete(banner)} disabled={isPending}>
                <MdDelete className="text-lg hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
