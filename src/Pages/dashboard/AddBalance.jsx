import React, { useState } from "react";
import { useApprovedInstituteUsers } from "../../api/cms/user.hook";

const avatarColors = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-blue-100 text-blue-700",
];

const getInitials = (fullName = "") => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AddBalance = () => {
  const { data: instituteUsers } = useApprovedInstituteUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = (instituteUsers ?? []).filter(
    (u) =>
      u.information?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      String(u.uid).includes(search),
  );

  const handleSubmit = () => {
    if (!selectedUser || !amount || isNaN(amount) || Number(amount) <= 0)
      return;
    // TODO: call your API here to add balance
    // e.g. addBalanceMutation({ userId: selectedUser._id, amount: Number(amount), note })
    setSuccess(true);
    setAmount("");
    setNote("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Balance Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Select a user and add balance to their account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── User List ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                User List
              </p>
              <input
                type="text"
                placeholder="Search by name, email or UID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
            </div>

            <ul className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {!instituteUsers && (
                <li className="px-5 py-8 text-center text-sm text-slate-400">
                  Loading users...
                </li>
              )}

              {instituteUsers && filteredUsers.length === 0 && (
                <li className="px-5 py-8 text-center text-sm text-slate-400">
                  No users found
                </li>
              )}

              {filteredUsers.map((user, i) => {
                const fullName = user.information?.full_name ?? "Unknown";
                const isSelected = selectedUser?._id === user._id;

                return (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setSuccess(false);
                      setAmount("");
                      setNote("");
                    }}
                    className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-violet-50 border-l-4 border-violet-500"
                        : "hover:bg-slate-50 border-l-4 border-transparent"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                        avatarColors[i % avatarColors.length]
                      }`}
                    >
                      {getInitials(fullName)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800 truncate capitalize">
                          {fullName}
                        </p>
                        <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                          #{user.uid}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Room */}
                    <div className="text-right flex-shrink-0">
                      {user.information?.room_number ? (
                        <>
                          <p className="text-sm font-semibold text-slate-700">
                            Room {user.information.room_number}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user.information?.designation ?? "—"}
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-slate-300">No room</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Selected User Card */}
            {selectedUser ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Selected User
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      avatarColors[
                        (instituteUsers ?? []).findIndex(
                          (u) => u._id === selectedUser._id,
                        ) % avatarColors.length
                      ]
                    }`}
                  >
                    {getInitials(selectedUser.information?.full_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 capitalize truncate">
                      {selectedUser.information?.full_name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                {/* Detail rows */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 divide-y divide-slate-100">
                  {[
                    ["Phone", selectedUser.phone],
                    ["UID", `#${selectedUser.uid}`],
                    [
                      "Room",
                      selectedUser.information?.room_number
                        ? `Room ${selectedUser.information.room_number}`
                        : "—",
                    ],
                    [
                      "Designation",
                      selectedUser.information?.designation ?? "—",
                    ],
                    ["Division", selectedUser.information?.division ?? "—"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center px-4 py-2"
                    >
                      <span className="text-xs text-slate-400">{label}</span>
                      <span className="text-xs font-medium text-slate-600">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-400">
                  Select a user from the list
                </p>
              </div>
            )}

            {/* Add Balance Form */}
            <div
              className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 transition-opacity duration-300 ${
                selectedUser ? "opacity-100" : "opacity-50 pointer-events-none"
              }`}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Add Balance
              </p>

              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Amount (৳)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Quick preset chips */}
              <div className="flex gap-2 flex-wrap mb-4">
                {[500, 1000, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(String(preset))}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 transition"
                  >
                    +৳{preset.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Reason for adding balance..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
                />
              </div>

              {success && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Balance added successfully!
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!amount || isNaN(amount) || Number(amount) <= 0}
                className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Balance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBalance;
