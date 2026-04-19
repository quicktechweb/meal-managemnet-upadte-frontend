import React, { useState } from "react";
import { useAssignRolePermission } from "../../api/cms/user.hook";
import { Check, Shield, X } from "lucide-react";

const PermissionModal = ({ role, permissions, onClose }) => {
  const [selected, setSelected] = useState(
    () => role?.permissions?.map((p) => p._id ?? p) ?? [],
  );

  const { mutateAsync: assignPermission, isPending } =
    useAssignRolePermission();

  const togglePermission = (permId) => {
    setSelected((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId],
    );
  };

  const handleAssign = async () => {
    if (selected.length === 0) return;
    try {
      await assignPermission({
        roleId: role._id,
        payload: { permissionIds: selected },
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-blue-600" />
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Assign Permissions
              </h3>
              <p className="text-xs text-gray-400 capitalize">
                Role: {role?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Permission List */}
        <div className="px-5 py-4 max-h-72 overflow-y-auto space-y-2">
          {permissions?.length > 0 ? (
            permissions.map((perm) => {
              const isSelected = selected.includes(perm._id);
              return (
                <div
                  key={perm._id}
                  onClick={() => togglePermission(perm._id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 capitalize">
                      {perm?.name || perm?.function_name || "Permission"}
                    </p>
                    {perm?.description && (
                      <p className="text-xs text-gray-400">
                        {perm.description}
                      </p>
                    )}
                  </div>
                  {/* Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check size={12} className="text-white" />}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 py-8 text-sm">
              No permissions available
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50">
          <p className="text-xs text-gray-400">
            {selected.length} permission{selected.length !== 1 ? "s" : ""}{" "}
            selected
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={isPending || selected.length === 0}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {isPending ? "Saving..." : "Assign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
