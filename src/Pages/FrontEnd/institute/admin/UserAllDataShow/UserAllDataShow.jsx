// ===== FILE: src/Pages/FrontEnd/institute/admin/InstitutePanel.jsx =====
import { useMemo, useState } from "react";
import {
  Search,
  X,
  Wallet,
  Users,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  Mail,
  DoorOpen,
  ChevronRight,
  SearchX,
} from "lucide-react";
import { useInstitutePanelUsers } from "../../../../../api/cms/user.hook";

const statusStyle = {
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusDot = {
  approved: "bg-emerald-500",
  pending: "bg-amber-500",
  rejected: "bg-rose-500",
};

const Row = ({ label, value }) =>
  value === undefined || value === null || value === "" ? null : (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-2.5 text-sm last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="break-all text-right font-medium text-slate-800">
        {String(value)}
      </span>
    </div>
  );

// Room number onujayi sajano (100, 101, 102 ...). Room nai shobar shese.
// Same room er user der ekshathe rakhe, room er vitore ID (uid) onujayi.
const roomOf = (u) => {
  const r = u?.information?.room_number;
  return r === undefined || r === null || String(r).trim() === "" ? "" : String(r).trim();
};

const sortByRoom = (list) =>
  [...list].sort((a, b) => {
    const ra = roomOf(a);
    const rb = roomOf(b);
    if (!ra && rb) return 1;
    if (ra && !rb) return -1;
    const byRoom = ra.localeCompare(rb, undefined, { numeric: true });
    if (byRoom !== 0) return byRoom;
    return (a?.uid ?? 0) - (b?.uid ?? 0);
  });

const initialsOf = (name) => {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Avatar = ({ name, size = "md" }) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-sm ring-2 ring-white ${
      size === "lg" ? "h-14 w-14 text-lg" : "h-9 w-9 text-xs"
    }`}
  >
    {initialsOf(name)}
  </div>
);

const StatusPill = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
      statusStyle[status] || "bg-slate-100 text-slate-500 ring-slate-200"
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status] || "bg-slate-400"}`} />
    {status || "-"}
  </span>
);

const RoomBadge = ({ room }) =>
  room ? (
    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100">
      {room}
    </span>
  ) : (
    <span className="text-slate-300">-</span>
  );

const cardTones = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
};

const UserAllDataShow = () => {
  const { data, isLoading, isError, error } = useInstitutePanelUsers();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  const users = data?.users || [];
  const summary = data?.summary || {};

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = users.filter((u) => {
      if (status !== "all" && u.approval_status !== status) return false;
      if (!q) return true;
      return [u.information?.full_name, u.email, u.phone, String(u.uid ?? ""), roomOf(u)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
    return sortByRoom(list);
  }, [users, search, status]);

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="p-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          <p className="mb-1 font-semibold">Data load korte problem hoyeche.</p>
          <p>Status: {error?.response?.status ?? "no response"}</p>
          <p className="mt-1 break-words">
            {error?.response?.data?.message ||
              error?.response?.data?.error ||
              error?.message}
          </p>
        </div>
      </div>
    );

  const cards = [
    { label: "Total Users", value: summary.total_users, icon: Users, tone: "indigo" },
    { label: "Approved", value: summary.approved, icon: CheckCircle2, tone: "emerald" },
    { label: "Pending", value: summary.pending, icon: Clock, tone: "amber" },
    {
      label: "Total Balance",
      value: `৳ ${summary.total_balance ?? 0}`,
      icon: Wallet,
      tone: "violet",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 lg:p-8">
      <div className="mx-auto max-w-8xl space-y-6">
        {/* Header */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Admin
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Institute Panel
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sob user, room onujayi sajano, balance shoho.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(15,23,42,0.25)]"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cardTones[c.tone]}`}
              >
                <c.icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {c.label}
                </p>
                <p className="truncate text-xl font-bold tabular-nums text-slate-900">
                  {c.value ?? 0}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]">
          {/* Filters */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email, phone, ID ba room diye search..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="all">All status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
              {filtered.length} user{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {["S/N", "Name", "Room", "Email", "Phone", "Role", "ID", "Status", "Balance", ""].map(
                    (h, i) => (
                      <th key={i} className="whitespace-nowrap px-4 py-3.5 first:pl-6 last:pr-6">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10}>
                      <EmptyState />
                    </td>
                  </tr>
                )}
                {filtered.map((u, index) => (
                  <tr
                    key={u._id}
                    className={`transition-colors hover:bg-indigo-50/40 ${
                      index > 0 && roomOf(filtered[index - 1]) !== roomOf(u)
                        ? "border-t-2 border-slate-200"
                        : index > 0
                        ? "border-t border-slate-100"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3.5 pl-6 tabular-nums text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.information?.full_name} />
                        <span className="whitespace-nowrap font-semibold text-slate-900">
                          {u.information?.full_name || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <RoomBadge room={roomOf(u)} />
                    </td>
                    <td className="px-4 py-3.5">{u.email || "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 tabular-nums">
                      {u.phone || "-"}
                    </td>
                    <td className="px-4 py-3.5 capitalize">{u.role || "-"}</td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold tabular-nums text-slate-700">
                        {u.uid}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={u.approval_status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 font-bold tabular-nums text-slate-900">
                      ৳ {u.balance ?? 0}
                    </td>
                    <td className="px-4 py-3.5 pr-6">
                      <button
                        onClick={() => setSelected(u)}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 hover:shadow-md active:scale-[0.98]"
                      >
                        Details
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filtered.length === 0 && <EmptyState />}
            {filtered.map((u, index) => (
              <button
                key={u._id}
                onClick={() => setSelected(u)}
                className="block w-full p-4 text-left transition active:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={u.information?.full_name} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {u.information?.full_name || "-"}
                      </p>
                      <p className="text-xs text-slate-400">
                        #{index + 1} · ID {u.uid}
                      </p>
                    </div>
                  </div>
                  <StatusPill status={u.approval_status} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <DoorOpen size={13} className="text-slate-400" />
                    {roomOf(u) || "-"}
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Wallet size={13} className="text-slate-400" />৳ {u.balance ?? 0}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Phone size={13} className="text-slate-400" />
                    {u.phone || "-"}
                  </div>
                  <div className="flex items-center gap-1.5 truncate text-slate-600">
                    <Mail size={13} className="shrink-0 text-slate-400" />
                    <span className="truncate">{u.email || "-"}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Details drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                User Details
              </p>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {/* Profile */}
              <div className="mb-5 flex items-center gap-4">
                <Avatar name={selected.information?.full_name} size="lg" />
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-bold text-slate-900">
                    {selected.information?.full_name || "User"}
                  </h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <StatusPill status={selected.approval_status} />
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold tabular-nums text-slate-700">
                      #{selected.uid}
                    </span>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-5 text-white shadow-lg shadow-indigo-500/20">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/10" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-100">
                  Current Balance
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums">
                  ৳ {selected.balance ?? 0}
                </p>
              </div>

              {/* Info */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-1">
                <Row label="ID" value={selected.uid} />
                <Row label="Email" value={selected.email} />
                <Row label="Phone" value={selected.phone} />
                <Row label="Role" value={selected.role} />
                <Row label="Status" value={selected.approval_status} />
                <Row label="Nickname" value={selected.information?.nickname} />
                <Row label="Father" value={selected.information?.father_name} />
                <Row label="Mother" value={selected.information?.mother_name} />
                <Row label="Guardian" value={selected.information?.guardian_name} />
                <Row
                  label="Guardian Contact"
                  value={selected.information?.guardian_contact_number}
                />
                <Row label="Gender" value={selected.information?.gender} />
                <Row label="Room" value={selected.information?.room_number} />
                <Row label="Religion" value={selected.information?.religion} />
                <Row label="Date of Birth" value={selected.information?.date_of_birth} />
                <Row label="Hall" value={selected.information?.name_of_the_hall} />
                <Row label="Mess" value={selected.information?.name_of_the_mess} />
                <Row label="District" value={selected.information?.district} />
                <Row label="Village" value={selected.information?.village} />
                <Row label="Meal Type" value={selected.routine_type} />
                <Row
                  label="Registered"
                  value={selected.createdAt && new Date(selected.createdAt).toLocaleDateString()}
                />
              </div>

              {/* Balance history */}
              <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wider text-slate-700">
                Balance History
              </h3>
              {selected.balance_history?.length ? (
                <div className="space-y-2.5">
                  {[...selected.balance_history].reverse().map((h, i) => {
                    const credit = h.type === "credit";
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                      >
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            credit ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {credit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-bold tabular-nums ${
                                credit ? "text-emerald-600" : "text-rose-600"
                              }`}
                            >
                              {credit ? "+" : "-"} ৳ {h.amount}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(h.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {h.note} · {h.balance_before} → {h.balance_after}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400">
                  Kono history nai
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
      <SearchX size={26} />
    </div>
    <p className="text-sm font-semibold text-slate-700">Kono user pawa jayni</p>
    <p className="mt-1 text-xs text-slate-400">Search ba status filter change kore dekhun.</p>
  </div>
);

export default UserAllDataShow;