import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDeleteFeature, useGetFeature } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Features = () => {
  const { data: features, isLoading } = useGetFeature();
  const { mutateAsync, isPending } = useDeleteFeature();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="service-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Features
        </h3>
        <Link
          to="/admin/dashboard/add-feature"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs sm:text-sm transition active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Add New Features
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20 text-slate-500">
          Loading features...
        </div>
      )}

      {/* Empty */}
      {!isLoading && features?.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm bg-white rounded-2xl border border-slate-100 shadow">
          No features found.
        </div>
      )}

      {/* ══ DESKTOP TABLE (md+) ══ */}
      <div className="hidden md:block bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">Feature Name</th>
              <th className="px-6 py-4 font-semibold">Service Type</th>
              <th className="px-6 py-4 font-semibold">Kitchen</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {features?.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item.name}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item?.service_type?.title}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                    {item?.kitchen?.title}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-violet-600">
                  ৳ {item.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/dashboard/update-feature/${item?._id}`}
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
        {features?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800 text-sm truncate">
                  {item.name}
                </p>
                <p className="text-violet-600 font-bold text-base mt-0.5">
                  ৳ {item.price}
                </p>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <Link
                  to={`/admin/dashboard/update-feature/${item?._id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
                >
                  <FiEdit size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={isPending}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50 cursor-pointer"
                >
                  <MdDelete size={15} />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-4 py-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Service Type
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {item?.service_type?.title || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Kitchen
                </p>
                <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full">
                  {item?.kitchen?.title || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
