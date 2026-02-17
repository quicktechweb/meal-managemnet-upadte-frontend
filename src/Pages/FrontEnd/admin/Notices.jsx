import React, { useEffect, useState } from "react";

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Notices</h2>

        <Link
          to="/admin/dashboard/add-notice"
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add Notice
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Title
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Expire Date
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Created At
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {notices?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No notices found
                </td>
              </tr>
            )}

            {notices?.map((notice) => (
              <tr key={notice._id}>
                <td className="px-2 md:px-4 py-2 border border-gray-300 break-words max-w-[250px]">
                  <p className="line-clamp-2">{notice.title}</p>
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  {new Date(notice.notice_expire_date).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  {new Date(notice.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/admin/dashboard/update-notice/${notice?._id}`}
                      className="text-lg md:text-xl hover:text-violet-700 duration-300"
                    >
                      <FiEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(notice)}
                      disabled={isPending}
                      className="text-lg md:text-xl hover:text-red-600 duration-300"
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
    </div>
  );
};

export default Notices;
