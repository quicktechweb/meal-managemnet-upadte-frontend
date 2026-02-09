import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useUtilitiesService } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Services = () => {
  const { data, isLoading } = useUtilitiesService();

  const utilities = data?.data || [];

  return (
    <div className="service-container ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Utilities Services
        </h3>

        <Link
          to="/admin/dashboard/add-utilities"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-sm transition active:scale-95"
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

      {/* Empty State */}
      {!isLoading && utilities.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No utilities found
        </div>
      )}

      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">Utility Service Name</th>
              <th className="px-6 py-4 font-semibold">Kitchen</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {utilities.map((item) => (
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

                <td className="px-6 py-4 font-bold text-violet-600">
                  ৳ {item.price}
                </td>

                <td className="px-6 py-4 flex items-center justify-end gap-2.5 ">
                  <div className="flex items-center gap-2">
                    <Link className="text-xl cursor-pointer hover:text-violet-700  duration-300">
                      <FiEdit />
                    </Link>
                    <button
                      // onClick={() => handleDelete(day)}
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
    </div>
  );
};

export default Services;
