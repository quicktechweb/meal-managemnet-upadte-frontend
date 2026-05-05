import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteFaq, useGetAllFaq } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const FaqAdmin = () => {
  const { data } = useGetAllFaq();
  const { mutateAsync, isPending } = useDeleteFaq();

  const [openId, setOpenId] = useState(null);

  const handleDelete = async (faq) => {
    await mutateAsync(faq?._id);
  };

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg md:text-xl font-bold">All FAQ</h4>

        <Link
          to="/admin/dashboard/add-faq"
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
              <th className="p-3 border border-gray-300 text-left">Question</th>
              <th className="p-3 border border-gray-300 text-left">Answer</th>
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
                  No FAQ found
                </td>
              </tr>
            )}

            {data?.map((faq) => (
              <tr key={faq._id} className="border-t border-gray-300 text-sm">
                <td className="p-3 border border-gray-300 max-w-[220px]">
                  <p className="line-clamp-2">{faq.question}</p>
                </td>

                <td className="p-3 border border-gray-300 max-w-[220px] text-gray-600">
                  <div
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                    className="line-clamp-2"
                  />
                </td>

                <td className="p-3 border border-gray-300 text-center">
                  {new Date(faq.createdAt).toDateString()}
                </td>

                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/dashboard/update-faq/${faq._id}`}>
                      <FiEdit className="text-lg hover:text-violet-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(faq)}
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

      {/* ================= MOBILE ACCORDION ================= */}
      <div className="md:hidden space-y-3">
        {data?.length === 0 && <p className="text-center py-4">No FAQ found</p>}

        {data?.map((faq) => (
          <div
            key={faq._id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm"
          >
            {/* Question */}
            <button
              onClick={() => toggle(faq._id)}
              className="w-full text-left p-3 flex justify-between items-center"
            >
              <span className="font-semibold text-sm line-clamp-2">
                {faq.question}
              </span>
              <span className="text-xs text-gray-500">
                {openId === faq._id ? "▲" : "▼"}
              </span>
            </button>

            {/* Answer (Expandable) */}
            {openId === faq._id && (
              <div className="px-3 pb-3">
                <div
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                  className="text-xs text-gray-600"
                />

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(faq.createdAt).toDateString()}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-3">
                  <Link to={`/admin/dashboard/update-faq/${faq._id}`}>
                    <FiEdit className="text-lg hover:text-violet-600" />
                  </Link>

                  <button
                    onClick={() => handleDelete(faq)}
                    disabled={isPending}
                  >
                    <MdDelete className="text-lg hover:text-red-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAdmin;
