import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Trash2,
  Shield,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useCreateInstituteRole,
  useDeleteInstituteRole,
  useGetInstituteRole,
  usePermissionFunction,
  useApprovedInstituteUsers,
} from "../../../../api/cms/user.hook";
import PermissionModal from "../../../../Components/modal/PermissionModal";
import AddUserModal from "../../../../Components/modal/AddUserModal";
import CreateUserModal from "../../../../Components/modal/CreateUserModal";
import RemoveUserModal from "../../../../Components/modal/RemoveUserModal";

// ─── Main Component ─────────────────────────────────────────────────────────
const UserSettings = () => {
  const { data: roles } = useGetInstituteRole();
  const { data: permissions } = usePermissionFunction();
  const { data: instituteUsers } = useApprovedInstituteUsers();

  const { mutateAsync, isPending } = useCreateInstituteRole();
  const { mutateAsync: deleteMutateAsync } = useDeleteInstituteRole();

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [selectedCreateUser, setSelectedCreateUser] = useState(null);
  const [selectedRemoveUser, setSelectedRemoveUser] = useState(null);

  // Track which role card is expanded on mobile
  const [expandedRole, setExpandedRole] = useState(null);

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
    <div className="min-h-screen px-3 sm:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 className="text-blue-600" size={22} />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Role Settings
          </h2>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">
          Manage roles and access levels
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-100 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-blue-500" />
            Active Roles
          </h3>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3"
          >
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
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm font-medium hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              {isPending ? "Adding..." : "Add Role"}
            </button>
          </form>
        </div>

        {/* Role List */}
        <div>
          {roles?.length > 0 ? (
            <div className="divide-y divide-gray-100 rounded-xl overflow-hidden">
              {roles.map((role, i) => {
                const isExpanded = expandedRole === i;

                return (
                  <div key={i} className="hover:bg-gray-50 transition">
                    {/* ── Row (always visible) ── */}
                    <div className="flex items-center justify-between px-4 py-3">
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
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

                      {/* Right — Desktop buttons (hidden on mobile) */}
                      <div className="hidden sm:flex items-center gap-2">
                        <ActionButtons
                          role={role}
                          onRemoveUser={() => setSelectedRemoveUser(role)}
                          onCreateUser={() => setSelectedCreateUser(role)}
                          onAddUser={() => setSelectedUserRole(role)}
                          onAddPermission={() => setSelectedRole(role)}
                          onDelete={() => handleInstituteRoleRemove(role)}
                        />
                      </div>

                      {/* Mobile: expand toggle + delete */}
                      <div className="flex sm:hidden items-center gap-2">
                        <button
                          onClick={() => handleInstituteRoleRemove(role)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          onClick={() => setExpandedRole(isExpanded ? null : i)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                        >
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* ── Expanded action panel (mobile only) ── */}
                    {isExpanded && (
                      <div className="sm:hidden px-4 pb-3 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedRemoveUser(role);
                            setExpandedRole(null);
                          }}
                          className="py-2 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium"
                        >
                          Remove User
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCreateUser(role);
                            setExpandedRole(null);
                          }}
                          className="py-2 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition font-medium"
                        >
                          Create User
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserRole(role);
                            setExpandedRole(null);
                          }}
                          className="py-2 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition font-medium"
                        >
                          Add User
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setExpandedRole(null);
                          }}
                          className="py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                          Add Permission
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10 text-sm">
              No roles found
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
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
      {selectedRemoveUser && (
        <RemoveUserModal
          role={selectedRemoveUser}
          users={instituteUsers}
          onClose={() => setSelectedRemoveUser(null)}
        />
      )}
    </div>
  );
};

// ─── Shared desktop action buttons ──────────────────────────────────────────
const ActionButtons = ({
  role,
  onRemoveUser,
  onCreateUser,
  onAddUser,
  onAddPermission,
  onDelete,
}) => (
  <>
    <button
      onClick={onRemoveUser}
      className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition cursor-pointer"
    >
      Remove User
    </button>
    <button
      onClick={onCreateUser}
      className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition cursor-pointer"
    >
      Create User
    </button>
    <button
      onClick={onAddUser}
      className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition cursor-pointer"
    >
      Add User
    </button>
    <button
      onClick={onAddPermission}
      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
    >
      Add Permission
    </button>
    <button
      onClick={onDelete}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
    >
      <Trash2 size={16} />
    </button>
  </>
);

export default UserSettings;
