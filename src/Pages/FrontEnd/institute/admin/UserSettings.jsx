import React from "react";
import { useForm } from "react-hook-form";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { Plus, Trash2, Shield, Settings2 } from "lucide-react";
import { useApprovedInstituteUsers } from "../../../../api/cms/user.hook";

const UserSettings = () => {
  const { user } = useInstituteAuth();
  const { data } = useApprovedInstituteUsers();

  const roles = user?.user?.admin_info?.roles || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: "",
    },
  });

  const onSubmit = async (formData) => {
    if (!formData.roleName) return;

    const payload = {
      name: formData.roleName,
    };

    try {
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="text-blue-600" size={24} />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Role Settings
            </h2>
          </div>
          <p className="text-gray-500 text-base">
            Manage roles and access levels
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-50 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-blue-500" />
            Active Roles
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter new role name..."
                className={`w-full pl-4 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                  errors.roleName
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-blue-500/20"
                }`}
                {...register("roleName", {
                  required: "Role name is required",
                })}
              />
              {errors.roleName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.roleName.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-5 h-[50px] bg-blue-600 text-white rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Add Role
            </button>
          </form>
        </div>

        {/* Role List */}
        <div className="p-3">
          {roles.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {roles.map((role, i) => (
                <li
                  key={i}
                  className="p-4 rounded-xl border flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <Shield size={16} />
                    <span className="capitalize font-medium">
                      {role?.name || role}
                    </span>
                  </div>

                  <button className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400 py-10">No roles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
