// Components/meal-payments/MealPaymentsView.jsx
// Institute panel আর Super Admin panel — দুই জায়গাতেই এই একই component ব্যবহার হয়।
//   Institute  → <MealPaymentsView endpoint="/api/meal-deductions/institute" />
//   Super Admin → <MealPaymentsView endpoint="/api/meal-deductions/admin" isSuperAdmin />
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Wallet,
  CalendarDays,
  Building2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const fmtAmount = (n) => "৳" + Number(n || 0).toLocaleString("en-BD");

const fmtDate = (d) =>
  d
    ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

// meal type অনুযায়ী রঙ
const mealStyle = (type = "") => {
  const t = type.toLowerCase();
  if (t.includes("breakfast")) return "bg-amber-50 text-amber-700 ring-amber-200";
  if (t.includes("lunch")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (t.includes("dinner")) return "bg-indigo-50 text-indigo-700 ring-indigo-200";
  return "bg-slate-50 text-slate-600 ring-slate-200";
};

const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

const todayBD = () =>
  new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 10);

const MEAL_OPTIONS = ["all", "Breakfast", "Lunch", "Dinner"];

const EMPTY_FILTERS = { from: "", to: "", meal_type: "all", search: "", instituteId: "" };

const MealPaymentsView = ({ endpoint, title, subtitle, isSuperAdmin = false }) => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState(""); // input box (debounced → filters.search)
  const [page, setPage] = useState(1);

  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // search box debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((f) => (f.search === search ? f : { ...f, search }));
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 20 };
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== "all") params[k] = v;
      });

          const { data } = await axiosSecure.get(`https://alabadanbackendpart.alabadan.com${endpoint}`, { params });
      setRes(data);
    } catch (e) {
      setError(e?.response?.data?.message || e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, endpoint, filters, page]);

  useEffect(() => {
    load();
  }, [load]);

  const setFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  const reset = () => {
    setSearch("");
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const rows = res?.data || [];
  const summary = res?.summary || {};
  const pagination = res?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Title ── */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            {title || "Meal Payments"}
          </h2>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>

        {/* ── Hero: total amount ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/[0.03]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">
                Total Received (current filter)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-orange-400 text-2xl font-bold">৳</span>
                <span className="text-white text-4xl md:text-5xl font-bold tracking-tight">
                  {Number(summary.totalAmount || 0).toLocaleString("en-BD")}
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-2">
                {summary.totalCount || 0} meals · {summary.uniqueStudents || 0} students
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-emerald-400 text-lg font-bold">
                  {fmtAmount(res?.today?.totalAmount)}
                </p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">
                  Today
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-white text-lg font-bold">
                  {fmtAmount(res?.overall?.totalAmount)}
                </p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">
                  All time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Meal type wise totals (Breakfast / Lunch / Dinner) ── */}
        {res?.byMealType?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {res.byMealType.map((m) => (
              <button
                key={m.meal_type}
                onClick={() =>
                  setFilter(
                    "meal_type",
                    filters.meal_type.toLowerCase() === m.meal_type ? "all" : cap(m.meal_type),
                  )
                }
                className={`text-left bg-white rounded-2xl p-4 ring-1 shadow-sm hover:shadow-md transition-all ${
                  filters.meal_type.toLowerCase() === m.meal_type
                    ? "ring-slate-800"
                    : "ring-gray-100"
                }`}
              >
                <span
                  className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${mealStyle(
                    m.meal_type,
                  )}`}
                >
                  {cap(m.meal_type)}
                </span>
                <p className="text-lg font-bold text-slate-800 mt-2">{fmtAmount(m.total)}</p>
                <p className="text-[11px] text-gray-400">{m.count} meals</p>
              </button>
            ))}
          </div>
        )}

        {/* ── Institute wise (Super admin only) ── */}
        {isSuperAdmin && res?.byInstitute?.length > 0 && (
          <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={14} className="text-gray-400" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Institute wise
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              <button
                onClick={() => setFilter("instituteId", "")}
                className={`shrink-0 rounded-xl px-4 py-3 text-left ring-1 ${
                  !filters.instituteId ? "ring-slate-800 bg-slate-50" : "ring-gray-100"
                }`}
              >
                <p className="text-sm font-semibold text-slate-700">All institutes</p>
                <p className="text-[11px] text-gray-400">
                  {res.byInstitute.length} institutes
                </p>
              </button>
              {res.byInstitute.map((i) => (
                <button
                  key={i.institute_id}
                  onClick={() => setFilter("instituteId", i.institute_id)}
                  className={`shrink-0 rounded-xl px-4 py-3 text-left ring-1 min-w-[170px] ${
                    filters.instituteId === i.institute_id
                      ? "ring-slate-800 bg-slate-50"
                      : "ring-gray-100 hover:ring-gray-300"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">
                    {i.institute_name}
                  </p>
                  <p className="text-base font-bold text-emerald-600">{fmtAmount(i.total)}</p>
                  <p className="text-[11px] text-gray-400">{i.count} meals</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Student name / UID / phone / email"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-gray-300 shrink-0" />
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilter("from", e.target.value)}
              className="text-sm bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5"
            />
            <span className="text-gray-300 text-xs">to</span>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilter("to", e.target.value)}
              className="text-sm bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {MEAL_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => setFilter("meal_type", m)}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold capitalize transition-all ${
                  filters.meal_type === m
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {m}
              </button>
            ))}
            <button
              onClick={() => {
                const t = todayBD();
                setFilters((f) => ({ ...f, from: t, to: t }));
                setPage(1);
              }}
              className="text-xs px-3.5 py-2.5 rounded-xl font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
            >
              Today
            </button>
            <button
              onClick={reset}
              className="text-xs px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Payment history
            </p>
            <p className="text-xs text-gray-300">{pagination.total} results</p>
          </div>

          {error && (
            <div className="m-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-9 h-9 border-4 border-slate-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">লোড হচ্ছে...</p>
            </div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wallet size={22} className="text-gray-200" />
              </div>
              <p className="text-sm font-medium text-gray-400">No payments found</p>
              <p className="text-xs text-gray-300 mt-1">
                Meal এর ১ ঘণ্টা আগে টাকা কাটলে এখানে দেখা যাবে
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-gray-400 bg-gray-50/60">
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 font-semibold">Meal</th>
                    <th className="px-3 py-3 font-semibold">Student</th>
                    {isSuperAdmin && (
                      <th className="px-3 py-3 font-semibold">Institute</th>
                    )}
                    <th className="px-3 py-3 font-semibold">Details</th>
                    <th className="px-3 py-3 font-semibold text-right">Amount</th>
                    <th className="px-5 py-3 font-semibold text-right">Student balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 whitespace-nowrap">
                        <p className="font-medium text-slate-700">{fmtDate(r.meal_date)}</p>
                        <p className="text-[11px] text-gray-400">{r.day}</p>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1 ${mealStyle(
                            r.meal_type,
                          )}`}
                        >
                          {r.meal_type}
                        </span>
                        {r.meal_time && (
                          <p className="text-[11px] text-gray-400 mt-1">{r.meal_time}</p>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                            {(r.user_name || "?").slice(0, 1).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-700 truncate">
                              {r.user_name || "—"}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              UID {r.user_uid ?? "—"}
                              {r.user_phone ? ` · ${r.user_phone}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>
                      {isSuperAdmin && (
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                          {r.institute_name || "—"}
                        </td>
                      )}
                      <td className="px-3 py-3 max-w-[220px]">
                        <p className="text-xs text-slate-600 truncate">
                          {r.items?.length ? r.items.join(", ") : "—"}
                        </p>
                        {r.guest_quantity > 0 && (
                          <p className="text-[11px] text-gray-400">
                            + {r.guest_quantity} guest
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <span className="font-bold text-emerald-600 tabular-nums">
                          +{fmtAmount(r.amount)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap text-[11px] text-gray-400 tabular-nums">
                        {fmtAmount(r.user_balance_before)} →{" "}
                        <span className="text-rose-500 font-semibold">
                          {fmtAmount(r.user_balance_after)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
              <p className="text-xs text-gray-400">
                Page {pagination.page} of {pagination.pages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-2 rounded-lg border border-gray-100 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-lg border border-gray-100 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPaymentsView;
