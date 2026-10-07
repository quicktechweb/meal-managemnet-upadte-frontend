import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Room number onujayi sajano (100, 101, 102 ...). Room nai ("N/A") shobar shese.
// Same room er user der ekshathe rakhe, room er vitore uid onujayi.
const roomOf = (u) => {
  const r = u?.information?.room_number;
  return r === undefined || r === null || String(r).trim() === "" ? "" : String(r).trim();
};

const sortByRoom = (users) =>
  [...(users || [])].sort((a, b) => {
    const ra = roomOf(a);
    const rb = roomOf(b);
    if (!ra && rb) return 1;
    if (ra && !rb) return -1;
    const byRoom = ra.localeCompare(rb, undefined, { numeric: true });
    if (byRoom !== 0) return byRoom;
    return (a?.uid ?? 0) - (b?.uid ?? 0);
  });

// ID (uid) ba phone diye search.
//  - ID: puro mile gele (3 likhle shudhu ID 3, 30 na)
//  - Phone: kompokkhe 4 digit likhle, number er je kono ongsho mille dekhabe (+88 / 880 thakleo cholbe)
const matchesSearch = (u, query) => {
  const q = String(query || "").trim();
  if (!q) return true;
  const digits = q.replace(/\D/g, "");
  if (!digits) return false;

  if (String(u?.uid ?? "") === digits) return true;

  if (digits.length >= 4) {
    const phone = String(u?.phone || "").replace(/\D/g, "");
    const normalizedQ = digits.startsWith("880") ? "0" + digits.slice(3) : digits;
    const normalizedPhone = phone.startsWith("880") ? "0" + phone.slice(3) : phone;
    return normalizedPhone.includes(normalizedQ);
  }
  return false;
};

const initialsOf = (name) => {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const PendingInstituteUserList = ({ users }) => {
  const [search, setSearch] = useState("");

  const sortedUsers = useMemo(
    () => sortByRoom(users).filter((u) => matchesSearch(u, search)),
    [users, search],
  );

  const total = users?.length || 0;
  const pendingCount = (users || []).filter((u) => u.approval_status === "pending").length;
  const approvedCount = (users || []).filter((u) => u.approval_status === "approved").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-3 sm:p-6">
      <div className="mx-auto max-w-8xl">
        {/* ───── Header ───── */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Institute
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Institute User Lists
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Room onujayi sajano, ID ba phone diye search korun.
            </p>
          </div>

          {/* Stat chips */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatCard label="Total" value={total} tone="slate" />
            <StatCard label="Pending" value={pendingCount} tone="amber" />
            <StatCard label="Approved" value={approvedCount} tone="emerald" />
          </div>
        </div>

        {/* ───── Main card ───── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="relative w-full sm:max-w-sm">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                inputMode="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID or phone number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="text-xs font-medium text-slate-500">
              {search.trim() ? (
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700">
                  {sortedUsers.length} user{sortedUsers.length === 1 ? "" : "s"} found
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1.5">
                  Showing {sortedUsers.length} user{sortedUsers.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
          </div>

          {/* ───── DESKTOP TABLE (md+) ───── */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-3.5 text-left">S/N</th>
                    <th className="px-4 py-3.5 text-left">Full Name</th>
                    <th className="px-4 py-3.5 text-left">Room No.</th>
                    <th className="px-4 py-3.5 text-left">Email</th>
                    <th className="px-4 py-3.5 text-left">Phone</th>
                    <th className="px-4 py-3.5 text-center">Status</th>
                    <th className="px-4 py-3.5 text-left">ID</th>
                    <th className="px-6 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  {sortedUsers.map((user, index) => {
                    // room bodlale ekta mota line, jate room-wise group alada bojha jay
                    const newRoom = index > 0 && roomOf(sortedUsers[index - 1]) !== roomOf(user);
                    const name = user?.information?.full_name;
                    return (
                      <tr
                        key={user._id}
                        className={`group transition-colors hover:bg-indigo-50/40 ${
                          newRoom
                            ? "border-t-2 border-t-slate-200"
                            : index > 0
                            ? "border-t border-t-slate-100"
                            : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-slate-400 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={name} />
                            <span className="font-semibold text-slate-900">{name || "N/A"}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <RoomBadge room={roomOf(user)} />
                        </td>
                        <td className="px-4 py-4 text-slate-600">{user.email || "N/A"}</td>
                        <td className="whitespace-nowrap px-4 py-4 tabular-nums text-slate-600">
                          {user.phone || "N/A"}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <StatusBadge status={user.approval_status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold tabular-nums text-slate-700">
                            {user?.uid}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <ViewButton id={user._id} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ───── MOBILE CARDS (below md) ───── */}
          <div className="divide-y divide-slate-100 md:hidden">
            {sortedUsers.map((user, index) => {
              const name = user?.information?.full_name;
              return (
                <div key={user._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={name} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">{name || "N/A"}</p>
                        <p className="text-xs text-slate-400">
                          #{index + 1} · ID {user?.uid}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={user.approval_status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                    <InfoRow label="Room" value={roomOf(user) || "N/A"} />
                    <InfoRow label="Phone" value={user.phone || "N/A"} />
                    <InfoRow label="Email" value={user.email || "N/A"} full />
                  </div>

                  <div className="mt-3">
                    <ViewButton id={user._id} full />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {sortedUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">No users found</p>
              <p className="mt-1 text-xs text-slate-400">
                Onno ID ba phone number diye abar try korun.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Shared sub-components ── */

const StatCard = ({ label, value, tone = "slate" }) => {
  const tones = {
    slate: "from-slate-50 to-white text-slate-900 ring-slate-200",
    amber: "from-amber-50 to-white text-amber-700 ring-amber-200",
    emerald: "from-emerald-50 to-white text-emerald-700 ring-emerald-200",
  };
  return (
    <div
      className={`min-w-[84px] rounded-xl bg-gradient-to-br px-4 py-3 ring-1 ${tones[tone]}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-0.5 text-2xl font-bold tabular-nums leading-none">{value}</p>
    </div>
  );
};

const Avatar = ({ name }) => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-sm ring-2 ring-white">
    {initialsOf(name)}
  </div>
);

const RoomBadge = ({ room }) =>
  room ? (
    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100">
      Room {room}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400">
      N/A
    </span>
  );

const StatusBadge = ({ status }) => {
  const styles =
    status === "pending"
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : status === "approved"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : "bg-slate-100 text-slate-600 ring-slate-200";
  const dot =
    status === "pending"
      ? "bg-amber-500"
      : status === "approved"
      ? "bg-emerald-500"
      : "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};

const ViewButton = ({ id, full = false }) => (
  <Link
    to={`/dashboards/single-user-institute/${id}`}
    className={`items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 hover:shadow-md active:scale-[0.98] whitespace-nowrap
      ${full ? "flex w-full" : "inline-flex"}`}
  >
    View Details
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  </Link>
);

const InfoRow = ({ label, value, full = false }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
      {label}
    </p>
    <p className="truncate text-sm font-medium text-slate-700">{value}</p>
  </div>
);

export default PendingInstituteUserList;