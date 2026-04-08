import React, { useState } from "react";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { Edit3, Plus, Trash2, Shield } from "lucide-react";
import { useApprovedInstituteUsers } from "../../../../api/cms/user.hook";

const UserSettings = () => {
  const { user } = useInstituteAuth();

  const { data } = useApprovedInstituteUsers();

  console.log(data);

  const permissions = user?.user?.admin_info?.permission || [];

  console.log(permissions);

  const [selectPermission, setSelectPermission] = useState(null);

  console.log(selectPermission);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Permission Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your administrative access and roles
        </p>
      </div>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {permissions.map((permission, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              {/* Permission Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Shield size={20} />
                </div>
                <h4 className="font-semibold text-lg text-gray-700 capitalize">
                  {permission.replace(/_/g, " ")}
                </h4>
              </div>

              {/* Description Placeholder */}
              <p className="text-sm text-gray-400 mb-6">
                Grant or revoke access for this specific module within the
                institute.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                {/* <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-medium hover:bg-indigo-100 transition-colors cursor-pointer">
                  <Edit3 size={14} /> Edit
                </button> */}
                <button
                  onClick={() => setSelectPermission(permission)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Add
                </button>
                <button
                  onClick={() => setSelectPermission(permission)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Create
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-md text-xs font-medium hover:bg-rose-100 transition-colors cursor-pointer">
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State if no permissions */}
        {permissions.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No permissions found.</p>
          </div>
        )}
      </div>

      {selectPermission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectPermission(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
              {selectPermission.replace(/_/g, " ")}
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Add permissions or configure access for this module.
            </p>

            {/* Example Form */}
            <div className="space-y-2">
              <label className="text-base font-semibold">User Lists</label>
              <select className="w-full border rounded-lg px-3 py-3 text-sm">
                <option value="">Select User</option>
                {data?.map((user) => (
                  <option value={user?._id}>
                    {user?.information?.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectPermission(null)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
