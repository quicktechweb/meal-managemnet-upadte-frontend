import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDeleteNotice, useGetNotices } from "../../../api/admin/admin.api";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Notices = () => {
  const { data: notices } = useGetNotices();

  const { mutateAsync, isPending } = useDeleteNotice();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold ">All Notices</h2>
        <Link
          to="/admin/dashboard/add-notice"
          className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700  text-white rounded-xl font-semibold shadow-lg text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add New Notice
        </Link>
      </div>
      <table className="min-w-full  border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Title</th>
            <th className="px-4 py-2 border border-gray-300">Expire Date</th>
            <th className="px-4 py-2 border border-gray-300">Created At</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
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
              <td className="px-4 py-2  border border-gray-300">
                {notice.title}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {new Date(notice.notice_expire_date).toLocaleString()}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {new Date(notice.createdAt).toLocaleString()}
              </td>

              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleDelete(notice)}
                  disabled={isPending}
                  className="text-xl duration-300 hover:text-red-600 cursor-pointer"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notices;
