import React from "react";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { Edit3, Plus, Trash2, Shield } from "lucide-react";

const UserSettings = () => {
  const { user } = useInstituteAuth();
  const permissions = user?.user?.admin_info?.permission || [];

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
                <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors cursor-pointer">
                  <Plus size={14} /> Add
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors cursor-pointer">
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
    </div>
  );
};

export default UserSettings;
