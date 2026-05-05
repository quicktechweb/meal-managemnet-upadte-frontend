import { Plus } from "lucide-react";
import React from "react";
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
      <div className="flex items-center justify-between mb-5 gap-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Package Lists
        </h3>
        <Link
          to="/admin/dashboard/add-package"
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium shadow-sm text-xs sm:text-sm transition shrink-0"
        >
          <Plus size={16} />
          Add Package
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-12 text-slate-500 text-sm">
          Loading Packages...
        </div>
      )}

      {/* Empty */}
      {!isLoading && data?.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No packages found
        </div>
      )}

      {/* ══ DESKTOP TABLE (lg+) ══ */}
      <div className="hidden lg:block bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
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
                  <td className="px-5 py-4">
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {pkg?.items?.map((it, i) => (
                        <div key={i} className="text-xs text-slate-700">
                          ({i + 1}) {it?.title}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                      {pkg?.alternative_items?.map((group, gi) => (
                        <div
                          key={gi}
                          className="bg-slate-50 rounded-md p-2 text-xs"
                        >
                          ({gi + 1}) {group.title}
                        </div>
                      ))}
                    </div>
                  </td>
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
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ MOBILE CARDS (< lg) ══ */}
      <div className="lg:hidden flex flex-col gap-3">
        {data?.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden"
          >
            {/* Card Header: day + name + price + actions */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-violet-100 text-violet-600 px-2.5 py-0.5 rounded-full">
                    {pkg.day}
                  </span>
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {pkg.package_title}
                  </p>
                </div>
                <p className="text-violet-600 font-bold text-base mt-1">
                  ৳ {pkg.package_price}
                </p>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <Link
                  to={`/admin/dashboard/update-package/${pkg?._id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
                >
                  <FiEdit size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(pkg?._id)}
                  disabled={isPending}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50 cursor-pointer"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            </div>

            {/* Card Body: items + alternatives */}
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              {/* Items */}
              <div className="px-3 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Items
                </p>
                <div className="space-y-1">
                  {pkg?.items?.length > 0 ? (
                    pkg.items.map((it, i) => (
                      <div key={i} className="text-xs text-slate-700">
                        ({i + 1}) {it?.title}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">None</p>
                  )}
                </div>
              </div>

              {/* Alternatives */}
              <div className="px-3 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Alternatives
                </p>
                <div className="space-y-1.5">
                  {pkg?.alternative_items?.length > 0 ? (
                    pkg.alternative_items.map((group, gi) => (
                      <div
                        key={gi}
                        className="text-xs bg-slate-50 rounded-md px-2 py-1 text-slate-700"
                      >
                        ({gi + 1}) {group.title}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">None</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
