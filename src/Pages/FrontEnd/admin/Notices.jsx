import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetNotices } from "../../../api/admin/admin.api";
import { MdDelete } from "react-icons/md";

const Notices = () => {
  const { data: notices } = useGetNotices();

  // // Delete notice
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this notice?")) return;

  //   try {
  //     await axios.delete(`/api/notices/${id}`);
  //     setNotices(notices.filter((n) => n._id !== id));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Notices</h2>

      <table className="min-w-full border border-gray-300">
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
            <tr key={notice._id} className="text-center">
              <td className="px-4 py-2 border border-gray-300">
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
                  // onClick={() => handleDelete(item)}
                  // disabled={isPending}
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
