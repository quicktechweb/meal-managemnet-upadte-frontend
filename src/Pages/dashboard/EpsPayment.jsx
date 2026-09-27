import { useState, useEffect, useCallback } from "react";

// 🔹 তোমার project এ axios instance / API base url যেভাবে সেট করা আছে, সেভাবে বসিয়ে নাও
const API_BASE = "https://alabadanbackendpart.alabadan.com/api"; // যেমন তোমার balance-list, meal payments এ যেটা ব্যবহার হচ্ছে সেটাই

export default function EpsPayments() {
  const [summary, setSummary] = useState({ totalAmount: 0, totalTransactions: 0, totalStudents: 0 });
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // 🔹 তোমার auth এ যেই key তে token রাখো সেটা বসাও

      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set("search", search);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`${API_BASE}/institute/eps-payments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load EPS payments");
      }

      setSummary(json.summary);
      setRows(json.data || []);
      setPagination({ page: json.pagination.page, totalPages: json.pagination.totalPages });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, startDate, endDate]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900">EPS Payments</h1>
      <p className="text-sm text-slate-500 mt-1">
        Student রা EPS দিয়ে যত টাকা balance top-up করেছে — কে, কবে, কত টাকা দিয়েছে
      </p>

      {/* Summary hero */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-6 flex flex-wrap gap-8 items-center">
        <div>
          <div className="text-xs tracking-wide text-slate-400">TOTAL RECEIVED (CURRENT FILTER)</div>
          <div className="text-3xl font-bold mt-1">৳{summary.totalAmount?.toLocaleString("en-BD") || 0}</div>
          <div className="text-xs text-slate-400 mt-1">
            {summary.totalTransactions} transactions · {summary.totalStudents} students
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-3 items-end">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Student name / UID / phone / email"
          className="flex-1 min-w-[220px] border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
        <span className="text-slate-400 text-sm">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={() => fetchData(1)}
          className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          খুঁজুন
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 text-xs font-semibold text-slate-400 tracking-wide">
          PAYMENT HISTORY
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-t border-slate-100">
                <th className="px-5 py-2 font-medium">DATE</th>
                <th className="px-5 py-2 font-medium">STUDENT</th>
                <th className="px-5 py-2 font-medium">INVOICE</th>
                <th className="px-5 py-2 font-medium">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b._id} className="border-t border-slate-100">
                  <td className="px-5 py-3 align-top">
                    <div className="font-medium text-slate-900">
                      {new Date(b.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(b.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="px-5 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                        {(b.user?.information?.full_name || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{b.user?.information?.full_name || "N/A"}</div>
                        <div className="text-xs text-slate-400">
                          UID {b.user?.uid ?? "-"} · {b.user?.phone || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 align-top text-slate-500">{b.invoiceId}</td>
                  <td className="px-5 py-3 align-top font-semibold text-emerald-600">
                    ৳{b.amount?.toLocaleString("en-BD")}
                  </td>
                </tr>
              ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                    কোনো EPS payment পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && <div className="px-5 py-6 text-center text-slate-400 text-sm">লোড হচ্ছে...</div>}
        {error && <div className="px-5 py-6 text-center text-red-500 text-sm">{error}</div>}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            disabled={pagination.page <= 1}
            onClick={() => fetchData(pagination.page - 1)}
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
          >
            ← আগের
          </button>
          <span className="text-sm text-slate-500">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => fetchData(pagination.page + 1)}
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
          >
            পরের →
          </button>
        </div>
      )}
    </div>
  );
}
