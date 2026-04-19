import React, { useState, useMemo, useEffect } from "react";
import { Check, Shield, X, Search, User } from "lucide-react";
import axios from "axios";
import { useInstituteUserRoleChange } from "../../api/cms/user.hook";

const AddUserModal = ({ role, users = [], onClose }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());

  const { mutateAsync, isPending } = useInstituteUserRoleChange();
  useEffect(() => {
    if (!role || !users.length) return;

    const alreadyAssigned = users
      .filter((u) => {
        return u?.role === role?.name;
      })
      .map((u) => u._id);

    setSelected(new Set(alreadyAssigned));
  }, [users, role]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u?.information?.full_name?.toLowerCase().includes(q) ||
        u?.email?.toLowerCase().includes(q),
    );
  }, [search, users]);

  const toggleUser = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (filtered.every((u) => selected.has(u._id))) {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((u) => next.delete(u._id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((u) => next.add(u._id));
        return next;
      });
    }
  };

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((u) => selected.has(u._id));

  const handleAssign = async () => {
    try {
      const user_ids = [...selected];

      await mutateAsync({
        user_ids,
        role: role?.name,
      });

      onClose();
    } catch (error) {
      console.error("Role assign failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-blue-600" />
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Assign Role
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

        {/* Search Bar */}
        <div className="px-5 pt-4 pb-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Select All Row */}
        {filtered.length > 0 && (
          <div className="px-5 py-2 flex items-center justify-between">
            <button
              onClick={toggleAll}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                  allFilteredSelected
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {allFilteredSelected && (
                  <Check size={10} className="text-white" strokeWidth={3} />
                )}
              </div>
              Select all ({filtered.length})
            </button>
            {selected.size > 0 && (
              <span className="text-xs text-blue-600 font-medium">
                {selected.size} selected
              </span>
            )}
          </div>
        )}

        {/* User List */}
        <div className="overflow-y-auto max-h-64 px-5 pb-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <User size={28} className="mb-2 opacity-40" />
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            filtered.map((user) => {
              const isSelected = selected.has(user._id);
              const initials = user?.information?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <button
                  key={user._id}
                  onClick={() => toggleUser(user._id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                    isSelected
                      ? "bg-blue-50 border border-blue-100"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {initials || <User size={14} />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user?.information?.full_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <Check size={10} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={selected.size === 0 || isPending}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {isPending
              ? "Assigning..."
              : `Assign ${selected.size > 0 ? `(${selected.size})` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
