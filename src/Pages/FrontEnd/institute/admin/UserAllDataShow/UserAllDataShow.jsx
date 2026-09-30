// ===== FILE (new): src/Pages/FrontEnd/institute/admin/InstitutePanel.jsx =====
import { useMemo, useState } from "react";
import { Search, X, Wallet, Users, CheckCircle2, Clock } from "lucide-react";
import { useInstitutePanelUsers } from "../../../../../api/cms/user.hook";

const statusStyle = {
  approved: "bg-green-50 text-green-600",
  pending: "bg-yellow-50 text-yellow-600",
  rejected: "bg-red-50 text-red-600",
};

const Row = ({ label, value }) =>
  value === undefined || value === null || value === "" ? null : (
    <div className="flex justify-between gap-4 py-1.5 border-b border-gray-50 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800 text-right break-all">
        {String(value)}
      </span>
    </div>
  );

const UserAllDataShow = () => {
 const { data, isLoading, isError, error } = useInstitutePanelUsers();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  const users = data?.users || [];
  const summary = data?.summary || {};

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (status !== "all" && u.approval_status !== status) return false;
      if (!q) return true;
      return [u.information?.full_name, u.email, u.phone, String(u.uid ?? "")]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [users, search, status]);

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
   if (isError)
    return (
      <div className="p-6 text-red-500">
        Data load korte problem hoyeche.
        <br />
        Status: {error?.response?.status ?? "no response"} <br />
        {error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message}
      </div>
    );

  const cards = [
    { label: "Total Users", value: summary.total_users, icon: Users },
    { label: "Approved", value: summary.approved, icon: CheckCircle2 },
    { label: "Pending", value: summary.pending, icon: Clock },
    { label: "Total Balance", value: `৳ ${summary.total_balance ?? 0}`, icon: Wallet },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-800">Institute Panel</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <c.icon size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className="text-lg font-bold text-gray-800">{c.value ?? 0}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email, phone ba UID diye search..."
            className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 px-3 border border-gray-200 rounded-xl text-sm"
        >
          <option value="all">All status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              {["UID", "Name", "Email", "Phone", "Role", "Status", "Balance", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400">
                  Kono user pawa jayni
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u._id} className="border-t border-gray-50 hover:bg-gray-50/60">
                <td className="px-4 py-3">{u.uid}</td>
                <td className="px-4 py-3 font-medium">{u.information?.full_name || "-"}</td>
                <td className="px-4 py-3">{u.email || "-"}</td>
                <td className="px-4 py-3">{u.phone || "-"}</td>
                <td className="px-4 py-3">{u.role || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[u.approval_status] || "bg-gray-100 text-gray-500"}`}>
                    {u.approval_status || "-"}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">৳ {u.balance ?? 0}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelected(u)} className="text-blue-600 hover:underline">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{selected.information?.full_name || "User"}</h2>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-blue-700">৳ {selected.balance ?? 0}</p>
            </div>

            <Row label="UID" value={selected.uid} />
            <Row label="Email" value={selected.email} />
            <Row label="Phone" value={selected.phone} />
            <Row label="Role" value={selected.role} />
            <Row label="Status" value={selected.approval_status} />
            <Row label="Nickname" value={selected.information?.nickname} />
            <Row label="Father" value={selected.information?.father_name} />
            <Row label="Mother" value={selected.information?.mother_name} />
            <Row label="Guardian" value={selected.information?.guardian_name} />
            <Row label="Guardian Contact" value={selected.information?.guardian_contact_number} />
            <Row label="Gender" value={selected.information?.gender} />
            <Row label="Room" value={selected.information?.room_number} />
            <Row label="Religion" value={selected.information?.religion} />
            <Row label="Date of Birth" value={selected.information?.date_of_birth} />
            <Row label="Hall" value={selected.information?.name_of_the_hall} />
            <Row label="Mess" value={selected.information?.name_of_the_mess} />
            <Row label="District" value={selected.information?.district} />
            <Row label="Village" value={selected.information?.village} />
            <Row label="Meal Type" value={selected.routine_type} />
            <Row label="Registered" value={selected.createdAt && new Date(selected.createdAt).toLocaleDateString()} />

            <h3 className="mt-5 mb-2 font-semibold">Balance History</h3>
            {selected.balance_history?.length ? (
              <div className="space-y-2">
                {[...selected.balance_history].reverse().map((h, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-3 text-sm">
                    <div className="flex justify-between">
                      <span className={h.type === "credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {h.type === "credit" ? "+" : "-"} ৳ {h.amount}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(h.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {h.note} · {h.balance_before} → {h.balance_after}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Kono history nai</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAllDataShow;
