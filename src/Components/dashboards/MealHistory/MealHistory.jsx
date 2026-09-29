// src/Pages/FrontEnd/institute/admin/MealHistory.jsx
// User panel: "Meal History" — which day, which meal, which items, and how much was deducted.
// Data: GET /api/meal-deductions/my  (already exists in the backend, no new backend code needed)

import { useState, useEffect, useCallback, useMemo } from "react";
import { Utensils, Wallet, CalendarDays, Loader2, Filter, X, Receipt } from "lucide-react";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";

const LIMIT = 20;

const MEAL_STYLE = {
  breakfast: { grad: "from-yellow-400 to-orange-500", chip: "bg-orange-50 text-orange-600 ring-orange-200", emoji: "🌅" },
  lunch: { grad: "from-green-500 to-emerald-600", chip: "bg-emerald-50 text-emerald-600 ring-emerald-200", emoji: "☀️" },
  dinner: { grad: "from-indigo-500 to-purple-600", chip: "bg-indigo-50 text-indigo-600 ring-indigo-200", emoji: "🌙" },
};
const styleOf = (t) =>
  MEAL_STYLE[String(t || "").toLowerCase()] || { grad: "from-blue-400 to-orange-500", chip: "bg-blue-50 text-blue-600 ring-blue-200", emoji: "🍽️" };

const SOURCE_LABEL = {
  all_wise: "All",
  day_wise: "Day Wise",
  routine_all_wise: "All (Routine)",
  routine_day_wise: "Day Wise (Routine)",
};

const money = (n) => "৳" + Number(n || 0).toLocaleString("en-BD");

const fmtDay = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long", day: "2-digit", month: "short", year: "numeric",
  });
};

function StatCard({ icon: Icon, label, value, sub, tone }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight">{value}</p>
        {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

export default function MealHistory() {
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState({ totalAmount: 0, totalCount: 0 });
  const [byMealType, setByMealType] = useState([]);
  const [today, setToday] = useState({ totalAmount: 0, totalCount: 0 });
  const [balance, setBalance] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mealType, setMealType] = useState("all");

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchPage = useCallback(
    async (page, append) => {
      append ? setLoadingMore(true) : setLoading(true);
      setError("");
      try {
        const params = { page, limit: LIMIT, meal_type: mealType };
        if (from) params.from = from;
        if (to) params.to = to;
        const { data } = await axiosSecure.get("/api/meal-deductions/my", { params });
        if (!data.success) throw new Error(data.message || "Failed to load");

        setRows((prev) => (append ? [...prev, ...(data.data || [])] : data.data || []));
        setSummary(data.summary || { totalAmount: 0, totalCount: 0 });
        setByMealType(data.byMealType || []);
        setToday(data.today || { totalAmount: 0, totalCount: 0 });
        setBalance(data.currentBalance ?? 0);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Network error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [from, to, mealType],
  );

  // When a filter changes, start again from the first page
  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  // Group by date
  const groups = useMemo(() => {
    const map = new Map();
    rows.forEach((r) => {
      if (!map.has(r.meal_date)) map.set(r.meal_date, []);
      map.get(r.meal_date).push(r);
    });
    return [...map.entries()].map(([date, items]) => ({
      date,
      items,
      total: items.reduce((s, i) => s + (Number(i.amount) || 0), 0),
    }));
  }, [rows]);

  const hasFilter = from || to || mealType !== "all";
  const clearFilters = () => {
    setFrom("");
    setTo("");
    setMealType("all");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 lg:p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-800">Meal History</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your past meals: what you ate each day and how much was deducted
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Utensils} label="Total Meals" value={summary.totalCount} sub="based on filters" tone="from-orange-400 to-orange-600" />
          <StatCard icon={Receipt} label="Total Spent" value={money(summary.totalAmount)} sub="based on filters" tone="from-rose-400 to-pink-500" />
          <StatCard icon={CalendarDays} label="Today" value={money(today.totalAmount)} sub={`${today.totalCount} ${today.totalCount === 1 ? "meal" : "meals"}`} tone="from-emerald-400 to-teal-500" />
          <StatCard icon={Wallet} label="Current Balance" value={money(balance)} tone="from-indigo-400 to-purple-500" />
        </div>

        {/* Meal type breakdown */}
        {byMealType.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {byMealType.map((b) => {
              const s = styleOf(b.meal_type);
              return (
                <span key={b.meal_type} className={`text-xs font-semibold px-3 py-1.5 rounded-full ring-1 capitalize ${s.chip}`}>
                  {s.emoji} {b.meal_type}: {b.count} {b.count === 1 ? "time" : "times"} · {money(b.total)}
                </span>
              );
            })}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
            <Filter size={15} /> Filter
          </div>
          <label className="flex flex-col text-[11px] text-gray-500">
            From
            <input type="date" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700" />
          </label>
          <label className="flex flex-col text-[11px] text-gray-500">
            To
            <input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700" />
          </label>
          <label className="flex flex-col text-[11px] text-gray-500">
            Meal
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 bg-white">
              <option value="all">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </label>
          {hasFilter && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 font-semibold pb-1.5">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <Loader2 className="animate-spin mr-2" size={18} /> Loading…
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={() => fetchPage(1, false)} className="mt-3 text-sm text-red-700 underline">Try again</button>
          </div>
        ) : groups.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-3xl mb-2">🍽️</p>
            <p className="text-gray-500 text-sm">{hasFilter ? "No meal history found for these filters" : "No meal history yet"}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {groups.map((g) => (
              <div key={g.date}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shrink-0" />
                  <h3 className="text-sm font-bold text-gray-800">{fmtDay(g.date)}</h3>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-semibold text-rose-500">−{money(g.total)}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {g.items.map((r) => {
                    const s = styleOf(r.meal_type);
                    return (
                      <div key={r._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-lg shrink-0`}>
                          {s.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-gray-800 capitalize">{r.meal_type}</p>
                            {r.meal_time && <span className="text-xs text-gray-400">{r.meal_time}</span>}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                              {SOURCE_LABEL[r.source] || r.source}
                            </span>
                            {r.guest_quantity > 0 && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
                                Guest × {r.guest_quantity}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {r.items?.length ? r.items.join(", ") : "—"}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Balance: {money(r.user_balance_before)} → {money(r.user_balance_after)}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-base font-bold text-rose-500">−{money(r.amount)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {pagination.page < pagination.pages && (
              <button
                onClick={() => fetchPage(pagination.page + 1, true)}
                disabled={loadingMore}
                className="mx-auto bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : `Load more (${rows.length}/${pagination.total})`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}