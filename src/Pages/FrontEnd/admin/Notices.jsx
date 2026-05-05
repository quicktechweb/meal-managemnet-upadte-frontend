import React from "react";
import { useDeleteNotice, useGetNotices } from "../../../api/admin/admin.api";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { FiEdit } from "react-icons/fi";

const Notices = () => {
  const { data: notices } = useGetNotices();
  const { mutateAsync, isPending } = useDeleteNotice();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Notices</h2>

        <Link
          to="/admin/dashboard/add-notice"
          className="inline-flex items-center gap-2 px-3 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-xs md:text-sm"
        >
          <Plus size={16} />
          Add
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Expire Date</th>
              <th className="p-3 border border-gray-300">Created At</th>
              <th className="p-3 border text-center border-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {notices?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No notices found
                </td>
              </tr>
            )}

            {notices?.map((notice) => (
              <tr key={notice._id} className="text-sm">
                <td className="p-3 border border-gray-300 max-w-[250px]">
                  <p className="line-clamp-2">{notice.title}</p>
                </td>

                <td className="p-3 border border-gray-300">
                  {new Date(notice.notice_expire_date).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                <td className="p-3 border border-gray-300">
                  {new Date(notice.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/dashboard/update-notice/${notice._id}`}>
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(notice)}
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
        {notices?.length === 0 && (
          <p className="text-center py-4">No notices found</p>
        )}

        {notices?.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-300 rounded-xl p-3 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {notice.title}
            </h3>

            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Expire:</span>{" "}
                {new Date(notice.notice_expire_date).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                })}
              </p>

              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(notice.createdAt).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                })}
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-3">
              <Link to={`/admin/dashboard/update-notice/${notice._id}`}>
                <FiEdit className="text-lg hover:text-violet-600" />
              </Link>

              <button onClick={() => handleDelete(notice)} disabled={isPending}>
                <MdDelete className="text-lg hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
