import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useAllPackage, usePackageDelete } from "../../../api/admin/admin.api";

const Packages = () => {
  const { data, isLoading } = useAllPackage();

  const { mutateAsync, isPending } = usePackageDelete();

  const handleDelete = async (item) => {
    await mutateAsync(item);
  };

  return (
    <div className="service-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-bold text-slate-800">Package Lists</h3>

        <Link
          to="/admin/dashboard/add-package"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium shadow-sm text-sm transition"
        >
          <Plus size={18} />
          Add Package
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-100">
              <tr className="text-left text-sm text-slate-600">
                <th className="px-5 py-3">Day</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Alternatives</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {!isLoading && data?.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">
                    No packages found
                  </td>
                </tr>
              )}

              {data?.map((pkg) => (
                <tr
                  key={pkg._id}
                  className="border-t border-gray-200 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4 font-medium">{pkg.day}</td>

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {pkg.package_title}
                  </td>

                  <td className="px-5 py-4 text-violet-600 font-bold">
                    ৳ {pkg.package_price}
                  </td>

                  {/* Items */}
                  <td className="px-5 py-4">
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {pkg?.items?.map((it, i) => (
                        <div key={i} className="text-xs text-slate-700">
                          ({i + 1}) {it?.title}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Alternative Items */}
                  <td className="px-5 py-4">
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                      {pkg?.alternative_items?.map((group, gi) => (
                        <div key={gi} className="bg-slate-50 rounded-md p-2">
                          ({gi + 1}) {group.title}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-3 text-lg">
                      <Link
                        to={`/admin/dashboard/update-package/${pkg?._id}`}
                        className="text-slate-600 hover:text-violet-600 transition"
                      >
                        <FiEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(pkg?._id)}
                        disabled={isPending}
                        className="text-slate-600 hover:text-red-500 transition disabled:opacity-50 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Loading */}
              {isLoading && (
                <tr>
                  <td colSpan="6">
                    <div className="flex justify-center items-center py-6 text-slate-500">
                      Loading Packages...
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packages;
