import { useState, useEffect, useCallback } from "react";

// Baki shob page er moto project er axiosSecure (baseURL = VITE_SITE_URL, token auto) use hocche
import { axiosSecure } from "../../Hooks/useAxiosSecure";

// Bangladesh (UTC+6) er aajker tarikh YYYY-MM-DD
const todayBD = () => {
  const d = new Date(Date.now() + 6 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
};

const apiErrorText = (err) =>
  err?.response?.data?.error
    ? `${err?.response?.data?.message || "Error"}: ${err.response.data.error}`
    : err?.response?.data?.message || err?.message || "Failed to load";

const MEAL_COLORS = {
  Breakfast: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
  Lunch: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400" },
  Dinner: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-400" },
};
const colorFor = (type) => MEAL_COLORS[type] || { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-700", dot: "bg-slate-400" };

export default function MealOverview() {
  const [tab, setTab] = useState("today"); // "today" | "history"

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meal Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            আজকে কোন meal এ কয়জন আছে, আর আগের meal গুলো history হিসেবে দেখুন
          </p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setTab("today")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${tab === "today" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
          >
            আজকের মিল
          </button>
          <button
            onClick={() => setTab("history")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${tab === "history" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
          >
            History
          </button>
        </div>
      </div>

      <div className="mt-6">
        {tab === "today" ? <TodayMeals /> : <MealHistory />}
      </div>
    </div>
  );
}

/* ============================================================
   TODAY TAB — GET /api/institute/meals/today?date=YYYY-MM-DD
   ============================================================ */
function TodayMeals() {
  const [date, setDate] = useState(todayBD);
  const [data, setData] = useState(null);
  const [openType, setOpenType] = useState(null); // কোন meal-type card expand করা আছে
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchToday = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: json } = await axiosSecure.get("/api/institute/meals/today", { params: { date } });
      if (!json.success) throw new Error(json.message || "Failed to load");
      setData(json);
    } catch (err) {
      setError(apiErrorText(err));
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

  const mealTypes = data ? Object.keys(data.groups || {}) : [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
        {data && <span className="text-sm text-slate-500">{data.day}</span>}
      </div>

      {loading && <div className="text-center text-slate-400 py-10 text-sm">লোড হচ্ছে...</div>}
      {error && <div className="text-center text-red-500 py-10 text-sm">{error}</div>}

      {data && !loading && (
        <>
          {/* Summary hero */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-6 flex flex-wrap gap-8 items-center mb-5">
            <div>
              <div className="text-xs tracking-wide text-slate-400">TOTAL ACTIVE MEALS TODAY</div>
              <div className="text-3xl font-bold mt-1">{data.summary.totalActiveMeals}</div>
              <div className="text-xs text-slate-400 mt-1">{data.summary.totalStudents} students</div>
            </div>
          </div>

          {/* Meal-type count cards */}
          {mealTypes.length === 0 ? (
            <div className="text-center text-slate-400 py-16 border border-dashed border-slate-200 rounded-2xl">
              আজকে কোনো meal active নেই
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {mealTypes.map((type) => {
                const c = colorFor(type);
                const group = data.groups[type];
                const isOpen = openType === type;
                return (
                  <div key={type} className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>
                    <button
                      onClick={() => setOpenType(isOpen ? null : type)}
                      className="w-full text-left px-5 py-4"
                    >
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                        {type}
                      </span>
                      <div className="text-3xl font-bold text-slate-900 mt-2">{group.count}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {isOpen ? "▲ hide students" : "▼ show students"}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="bg-white border-t border-slate-100 max-h-72 overflow-y-auto">
                        {group.entries.map((e, i) => (
                          <div key={i} className="px-5 py-3 border-b border-slate-50 last:border-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-sm text-slate-900">
                                  {e.user?.full_name || "N/A"}
                                </div>
                                <div className="text-xs text-slate-400">
                                  UID {e.user?.uid ?? "-"} · {e.user?.phone || "-"}
                                  {e.user?.room_number ? ` · Room ${e.user.room_number}` : ""}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-slate-900">৳{e.package_price}</div>
                                <div className="text-xs text-slate-400">{e.start_time}–{e.end_time}</div>
                              </div>
                            </div>
                            {e.items?.length > 0 && (
                              <div className="text-xs text-slate-500 mt-1">{e.items.join(", ")}</div>
                            )}
                            {e.guest_quantity > 0 && (
                              <div className="text-xs text-orange-600 mt-1">
                                + Guest × {e.guest_quantity}
                                {e.guest_items?.length > 0 ? ` (${e.guest_items.join(", ")})` : ""}
                                {" "}— এই user এর মোট {e.meal_count} টা মিল গণনা হয়েছে
                              </div>
                            )}
                            <div className="flex gap-2 mt-1">
                              <span className={`text-[11px] px-2 py-0.5 rounded-full ${e.is_attendance ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                {e.is_attendance ? "Attended" : "No Attendance"}
                              </span>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full ${e.balance_deducted ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                                {e.balance_deducted ? "Deducted" : "Pending"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ============================================================
   HISTORY TAB — GET /api/meal-deductions/institute (already exists)
   ============================================================ */
function MealHistory() {
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mealType, setMealType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page, limit: 15, meal_type: mealType });
      if (search) params.set("search", search);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const { data: json } = await axiosSecure.get(`/api/meal-deductions/institute?${params.toString()}`);
      if (!json.success) throw new Error(json.message || "Failed to load");

      setRows(json.data || []);
      setSummary(json.summary);
      setPagination({ page: json.pagination.page, pages: json.pagination.pages });
    } catch (err) {
      setError(apiErrorText(err));
    } finally {
      setLoading(false);
    }
  }, [search, from, to, mealType]);

  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);

  return (
    <div>
      {summary && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-6 flex flex-wrap gap-8 items-center mb-5">
          <div>
            <div className="text-xs tracking-wide text-slate-400">TOTAL DEDUCTED (CURRENT FILTER)</div>
            <div className="text-3xl font-bold mt-1">৳{summary.totalAmount?.toLocaleString("en-BD")}</div>
            <div className="text-xs text-slate-400 mt-1">
              {summary.totalCount} meals · {summary.uniqueStudents} students
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 items-end mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Student name / UID / phone / email"
          className="flex-1 min-w-[220px] border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">সব Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
        <span className="text-slate-400 text-sm">to</span>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
        <button onClick={() => fetchHistory(1)} className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg">
          খুঁজুন
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">DATE</th>
                <th className="px-5 py-3 font-medium">MEAL</th>
                <th className="px-5 py-3 font-medium">STUDENT</th>
                <th className="px-5 py-3 font-medium">ITEMS</th>
                <th className="px-5 py-3 font-medium">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const c = colorFor(r.meal_type);
                return (
                  <tr key={r._id} className="border-t border-slate-100">
                    <td className="px-5 py-3 align-top">
                      <div className="font-medium text-slate-900">{r.meal_date}</div>
                      <div className="text-xs text-slate-400">{r.day}</div>
                    </td>
                    <td className="px-5 py-3 align-top">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.badge}`}>{r.meal_type}</span>
                    </td>
                    <td className="px-5 py-3 align-top">
                      <div className="font-medium text-slate-900">{r.user_name}</div>
                      <div className="text-xs text-slate-400">UID {r.user_uid ?? "-"} · {r.user_phone}</div>
                    </td>
                    <td className="px-5 py-3 align-top text-slate-500">{(r.items || []).join(", ")}</td>
                    <td className="px-5 py-3 align-top font-semibold text-emerald-600">৳{r.amount}</td>
                  </tr>
                );
              })}
              {!loading && rows.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">কোনো data পাওয়া যায়নি</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {loading && <div className="px-5 py-6 text-center text-slate-400 text-sm">লোড হচ্ছে...</div>}
        {error && <div className="px-5 py-6 text-center text-red-500 text-sm">{error}</div>}
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button disabled={pagination.page <= 1} onClick={() => fetchHistory(pagination.page - 1)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40">← আগের</button>
          <span className="text-sm text-slate-500">{pagination.page} / {pagination.pages}</span>
          <button disabled={pagination.page >= pagination.pages} onClick={() => fetchHistory(pagination.page + 1)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40">পরের →</button>
        </div>
      )}
    </div>
  );
}
