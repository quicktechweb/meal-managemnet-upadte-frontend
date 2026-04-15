import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Shield, Settings2, X, Check } from "lucide-react";
import {
  useCreateInstituteRole,
  useDeleteInstituteRole,
  useGetInstituteRole,
  usePermissionFunction,
  useAssignRolePermission,
  useApprovedInstituteUsers,
} from "../../../../api/cms/user.hook";
import PermissionModal from "../../../../Components/modal/PermissionModal";
import AddUserModal from "../../../../Components/modal/AddUserModal";
import CreateUserModal from "../../../../Components/modal/CreateUserModal";

// ─── Main Component ─────────────────────────────────────────────────────────
const UserSettings = () => {
  const { data: roles } = useGetInstituteRole();
  const { data: permissions } = usePermissionFunction();

  const { data: instituteUsers } = useApprovedInstituteUsers();

  const { mutateAsync, isPending } = useCreateInstituteRole();
  const { mutateAsync: deleteMutateAsync } = useDeleteInstituteRole();

  // Modal state
  const [selectedRole, setSelectedRole] = useState(null);

  // add user modal
  const [selectedUserRole, setSelectedUserRole] = useState(null);

  // create user modal
  const [selectedCreateUser, setSelectedCreateUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = async (formData) => {
    if (!formData.roleName) return;
    try {
      await mutateAsync({ name: formData.roleName });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInstituteRoleRemove = async (role) => {
    try {
      await deleteMutateAsync(role._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen">
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
                {...register("roleName", { required: "Role name is required" })}
              />
              {errors.roleName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.roleName.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 h-[50px] bg-blue-600 text-white rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Plus size={18} />
              {isPending ? "Add..." : "Add Role"}
            </button>
          </form>
        </div>

        {/* Role List */}
        <div>
          {roles?.length > 0 ? (
            <div className="divide-y divide-gray-200 rounded-xl overflow-hidden">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Shield size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 capitalize">
                        {role?.name || role}
                      </p>
                      <p className="text-xs text-gray-400">
                        Role access control
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition cursor-pointer">
                      Remove User
                    </button>
                    <button
                      onClick={() => setSelectedCreateUser(role)}
                      className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition cursor-pointer"
                    >
                      Create User
                    </button>
                    <button
                      onClick={() => setSelectedUserRole(role)}
                      className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition cursor-pointer"
                    >
                      Add User
                    </button>

                    {/* ← Modal trigger */}
                    <button
                      onClick={() => setSelectedRole(role)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                      Add Permission
                    </button>

                    <button
                      onClick={() => handleInstituteRoleRemove(role)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10">No roles found</p>
          )}
        </div>
      </div>

      {/* Permission Modal */}
      {selectedRole && (
        <PermissionModal
          role={selectedRole}
          permissions={permissions}
          onClose={() => setSelectedRole(null)}
        />
      )}

      {selectedUserRole && (
        <AddUserModal
          role={selectedUserRole}
          users={instituteUsers}
          onClose={() => setSelectedUserRole(null)}
        />
      )}

      {selectedCreateUser && (
        <CreateUserModal
          role={selectedCreateUser}
          onClose={() => setSelectedCreateUser(null)}
        />
      )}
    </div>
  );
};

export default UserSettings;
