import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useChooseusLists,
  useDeleteChooseusList,
} from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ChooseUsLists = () => {
  const { data } = useChooseusLists();
  const { mutateAsync, isPending } = useDeleteChooseusList();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg md:text-xl font-bold">All Choose-us Data</h4>

        <Link
          to="/admin/dashboard/add-choose-us-list"
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
              <th className="p-3 border border-gray-300 text-left">Title</th>
              <th className="p-3 border border-gray-300 text-left">
                Description
              </th>
              <th className="p-3 border border-gray-300 text-center">
                Created
              </th>
              <th className="p-3 border border-gray-300 text-center">Action</th>
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

            {data?.map((item) => (
              <tr key={item._id} className="border-t border-gray-300 text-sm">
                <td className="p-3 border border-gray-300 max-w-[220px]">
                  <p className="line-clamp-2">{item.title}</p>
                </td>

                <td className="p-3 border border-gray-300 text-gray-600 max-w-[220px]">
                  <p
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className="line-clamp-2 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold"
                  />
                </td>

                <td className="p-3 border border-gray-300 text-center">
                  {new Date(item.createdAt).toDateString()}
                </td>

                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/dashboard/update-banner/${item._id}`}>
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(item)}
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

        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm p-3"
          >
            {/* Title */}
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {item.title}
            </h3>

            {/* Description */}
            <div
              dangerouslySetInnerHTML={{ __html: item.description }}
              className="text-xs text-gray-600 line-clamp-3 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold"
            />

            {/* Date */}
            <p className="text-xs text-gray-400 mt-2">
              {new Date(item.createdAt).toDateString()}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-3">
              <Link to={`/admin/dashboard/update-banner/${item._id}`}>
                <FiEdit className="text-lg hover:text-violet-600" />
              </Link>

              <button onClick={() => handleDelete(item)} disabled={isPending}>
                <MdDelete className="text-lg hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUsLists;
