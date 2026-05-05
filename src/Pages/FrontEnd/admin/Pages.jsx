import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAllPage, useDeletePage } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Pages = () => {
  const { data } = useAllPage();
  const { mutateAsync, isPending } = useDeletePage();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "archived":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Page lists</h2>

        <Link
          to="/admin/dashboard/add-page"
          className="inline-flex items-center gap-2 px-3 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-xs md:text-sm"
        >
          <Plus size={16} />
          Add
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Content</th>
              <th className="p-3 border border-gray-300 text-center">Status</th>
              <th className="p-3 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Data found
                </td>
              </tr>
            )}

            {data?.map((page) => (
              <tr key={page._id} className="border-t border-gray-300 text-sm">
                <td className="p-3 border border-gray-300 max-w-[220px]">
                  <p className="line-clamp-2">{page.title}</p>
                </td>

                <td className="p-3 border border-gray-300 max-w-[220px]">
                  <div
                    dangerouslySetInnerHTML={{ __html: page.content }}
                    className="line-clamp-2"
                  />
                </td>

                <td className="p-3 border border-gray-300 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                      page.status,
                    )}`}
                  >
                    {page.status}
                  </span>
                </td>

                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/dashboard/update-page/${page._id}`}>
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(page)}
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
        {data?.length === 0 && (
          <p className="text-center py-4">No Data found</p>
        )}

        {data?.map((page) => (
          <div
            key={page._id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm p-3"
          >
            {/* Title */}
            <h3 className="font-semibold text-sm line-clamp-2">{page.title}</h3>

            {/* Status */}
            <div className="mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                  page.status,
                )}`}
              >
                {page.status}
              </span>
            </div>

            {/* Content */}
            <div
              dangerouslySetInnerHTML={{ __html: page.content }}
              className="text-xs text-gray-600 line-clamp-3 mt-2"
            />

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-3">
              <Link to={`/admin/dashboard/update-page/${page._id}`}>
                <FiEdit className="text-lg hover:text-violet-600" />
              </Link>

              <button onClick={() => handleDelete(page)} disabled={isPending}>
                <MdDelete className="text-lg hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pages;
