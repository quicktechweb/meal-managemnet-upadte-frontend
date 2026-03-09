import { Plus, UtensilsCrossed } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useAllCost,
  useDeleteUtilities,
  useUtilitiesService,
} from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Services = () => {
  const { data: utilities, isLoading } = useUtilitiesService();

  console.log(utilities);

  const { mutateAsync, isPending } = useDeleteUtilities();

  const handleDelete = async (item) => {
    await mutateAsync(item?._id);
  };

  return (
    <div className="service-container ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Utilities Services
        </h3>

        <Link
          to="/admin/dashboard/add-utilites-service"
          className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700  text-white rounded-xl font-semibold shadow-lg text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add New Utilities
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20 text-slate-500">
          Loading utilities...
        </div>
      )}

      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
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
                className="border-t border-gray-300 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {item.name}
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                    {item?.kitchen?.title}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item?.bear_the_cost?.length > 0 ? (
                      item?.bear_the_cost?.map((cost) => (
                        <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                          {cost.title}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs font-bold text-gray-400 text-center">
                        {" "}
                        N/A
                      </p>
                    )}
                  </div>
                </td>

                <td className="px-6 text-xs py-4 font-bold text-violet-600">
                  {item?.price ? `৳ ${item.price}` : "N/A"}
                </td>
                <td className="px-6 py-4 font-bold text-violet-600">
                  {item?.ranges?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item?.ranges?.map((range, index) => (
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
                <td className="px-6 py-4 flex items-center justify-end gap-2.5 ">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/dashboard/update-utilities-service/${item?._id}`}
                      className="text-xl cursor-pointer hover:text-violet-700  duration-300"
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

        {utilities?.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <UtensilsCrossed size={48} className="mb-4 opacity-20" />
            <p className="font-medium">No Utilities records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
