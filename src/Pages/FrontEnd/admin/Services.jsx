import { Plus, UtensilsCrossed } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteUtilities,
  useUtilitiesService,
} from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Services = () => {
  const { data: utilities, isLoading } = useUtilitiesService();
  const { mutateAsync, isPending } = useDeleteUtilities();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="service-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Utilities Services
        </h3>
        <Link
          to="/admin/dashboard/add-utilites-service"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs sm:text-sm transition active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Add New Utilities
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20 text-slate-500">
          Loading utilities...
        </div>
      )}

      {/* Empty */}
      {!isLoading && utilities?.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-100 shadow">
          <UtensilsCrossed size={48} className="mb-4 opacity-20" />
          <p className="font-medium">No Utilities records found.</p>
        </div>
      )}

      {/* ══ DESKTOP TABLE (lg+) ══ */}
      <div className="hidden lg:block bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">Utility Service Name</th>
              <th className="px-6 py-4 font-semibold">Kitchen</th>
              <th className="px-6 py-4 font-semibold">Bear the Cost</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Ranges</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {utilities?.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full whitespace-nowrap">
                    {item?.kitchen?.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item?.bear_the_cost?.length > 0 ? (
                      item.bear_the_cost.map((cost, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full"
                        >
                          {cost.title}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs font-bold text-gray-400">N/A</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-violet-600">
                  {item?.price ? `৳ ${item.price}` : "N/A"}
                </td>
                <td className="px-6 py-4 font-bold text-violet-600">
                  {item?.ranges?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.ranges.map((range, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm hover:shadow-md transition"
                        >
                          <p className="text-xs font-medium text-gray-700">
                            <span className="text-indigo-600 font-semibold">
                              {range?.min}
                            </span>
                            {" - "}
                            <span className="text-purple-600 font-semibold">
                              {range?.max}
                            </span>
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {range?.price}৳
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      No Range Available
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/dashboard/update-utilities-service/${item?._id}`}
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

      {/* ══ MOBILE CARDS (< lg) ══ */}
      <div className="lg:hidden flex flex-col gap-3">
        {utilities?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden"
          >
            {/* Card Header: name + kitchen + price + actions */}
            <div className="flex items-start justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800 text-sm truncate">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {item?.kitchen?.title && (
                    <span className="text-[11px] font-semibold bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full">
                      {item.kitchen.title}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-violet-600">
                    {item?.price ? `৳ ${item.price}` : "N/A"}
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <Link
                  to={`/admin/dashboard/update-utilities-service/${item?._id}`}
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
            <div className="px-4 py-3 space-y-3">
              {/* Bear the Cost */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Bear the Cost
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item?.bear_the_cost?.length > 0 ? (
                    item.bear_the_cost.map((cost, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full"
                      >
                        {cost.title}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-medium">N/A</p>
                  )}
                </div>
              </div>

              {/* Ranges */}
              {item?.ranges?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                    Ranges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.ranges.map((range, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm"
                      >
                        <p className="text-xs font-medium text-gray-700">
                          <span className="text-indigo-600 font-semibold">
                            {range?.min}
                          </span>
                          {" - "}
                          <span className="text-purple-600 font-semibold">
                            {range?.max}
                          </span>
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {range?.price}৳
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!item?.ranges?.length && (
                <p className="text-xs text-gray-400 italic">
                  No Range Available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
