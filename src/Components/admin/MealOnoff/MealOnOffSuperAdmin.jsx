import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://meal-management-backend-update-3.onrender.com/api";

const DAY_ORDER = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const MEAL_COLORS = {
  Breakfast: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
  Lunch:     { bg: "bg-sky-50",   border: "border-sky-200",   badge: "bg-sky-100 text-sky-700",     dot: "bg-sky-400"   },
  Dinner:    { bg: "bg-indigo-50",border: "border-indigo-200",badge: "bg-indigo-100 text-indigo-700",dot: "bg-indigo-400"},
};

const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙" };

const DAY_COLORS = [
  "bg-rose-400","bg-orange-400","bg-amber-400",
  "bg-green-500","bg-sky-400","bg-indigo-400","bg-purple-400",
];

const INST_GRADIENTS = [
  "from-violet-600 to-purple-700",
  "from-blue-600 to-cyan-600",
  "from-emerald-600 to-teal-600",
  "from-rose-600 to-pink-600",
  "from-orange-500 to-amber-600",
  "from-slate-700 to-slate-600",
];

function getInitials(name = "") {
  return name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";
}

function avatarColor(name = "") {
  const colors = ["bg-violet-500","bg-pink-500","bg-cyan-500","bg-emerald-500","bg-amber-500","bg-rose-500","bg-indigo-500","bg-blue-500"];
  let s = 0; for (let c of name) s += c.charCodeAt(0);
  return colors[s % colors.length];
}

function instGradient(name = "") {
  let s = 0; for (let c of name) s += c.charCodeAt(0);
  return INST_GRADIENTS[s % INST_GRADIENTS.length];
}

// ── Toggle ─────────────────────────────────────────────────────
function Toggle({ checked, onChange, loading }) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none
        ${checked ? "bg-green-500" : "bg-gray-200"}
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
        ${checked ? "translate-x-6" : "translate-x-1"}`}/>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="h-3 w-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </span>
      )}
    </button>
  );
}

// ── Single Meal Row ─────────────────────────────────────────────
function MealRow({ meal, orderId, onToggle }) {
  const [loading, setLoading] = useState(false);
  const c = MEAL_COLORS[meal.meal_type] || MEAL_COLORS.Lunch;

  return (
    <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${c.border} ${c.bg} mb-2`}>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm">{MEAL_ICONS[meal.meal_type]}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${c.badge}`}>{meal.meal_type}</span>
        <span className="text-xs text-gray-500 shrink-0">{meal.day}</span>
        <span className="text-xs text-gray-400 truncate hidden sm:block">
          · {(meal.selected_items || []).map(i => i.title).join(", ")}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span className="text-xs font-medium text-gray-600">৳{meal.package_price || meal.total_price || 0}</span>
        <span className={`text-xs ${meal.is_on ? "text-green-600" : "text-gray-400"}`}>{meal.is_on ? "On" : "Off"}</span>
        <Toggle
          checked={meal.is_on}
          loading={loading}
          onChange={async () => {
            setLoading(true);
            await onToggle(orderId, meal._id, !meal.is_on);
            setLoading(false);
          }}
        />
      </div>
    </div>
  );
}

// ── User Order Card ─────────────────────────────────────────────
function UserOrderCard({ order, onToggle, onToggleAll }) {
  const [collapsed, setCollapsed] = useState(false);
  const u = order.user_id;
  const info = u?.information || {};
  const name = info.full_name || u?.email || "Unknown";
  const activeCount = (order.meals || []).filter(m => m.is_on).length;
  const total = (order.meals || []).length;

  // Group by day
  const byDay = {};
  (order.meals || []).forEach(m => {
    if (!byDay[m.day]) byDay[m.day] = [];
    byDay[m.day].push(m);
  });
  const sortedDays = Object.keys(byDay).sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      {/* User header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className={`h-9 w-9 rounded-full ${avatarColor(name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-gray-800 capitalize truncate">{name}</p>
            <span className="text-xs text-gray-400">#{u?.uid}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{u?.email} · {u?.phone}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">
            Room <span className="font-medium text-gray-600">{info.room_number}</span>
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${activeCount === total ? "bg-green-100 text-green-700" : activeCount === 0 ? "bg-gray-100 text-gray-500" : "bg-amber-100 text-amber-700"}`}>
            {activeCount}/{total} on
          </span>
          <button onClick={() => onToggleAll(order._id, true)} className="text-xs px-2 py-1 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors">All On</button>
          <button onClick={() => onToggleAll(order._id, false)} className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">All Off</button>
          <button onClick={() => setCollapsed(p => !p)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-1">
            {collapsed ? "▶" : "▼"}
          </button>
        </div>
      </div>

      {/* Meals */}
      {!collapsed && (
        <div className="px-4 py-3">
          {sortedDays.map(day => {
            const idx = DAY_ORDER.indexOf(day);
            const dot = DAY_COLORS[idx >= 0 ? idx : 0];
            return (
              <div key={day} className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${dot}`}/>
                  <span className="text-xs font-bold text-gray-700">{day}</span>
                  <div className="flex-1 h-px bg-gray-100"/>
                </div>
                {byDay[day].map(meal => (
                  <MealRow key={meal._id} meal={meal} orderId={order._id} onToggle={onToggle}/>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Institute Block ─────────────────────────────────────────────
function InstituteBlock({ inst, orders, onToggle, onToggleAll, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const totalMeals = orders.reduce((s, o) => s + (o.meals||[]).length, 0);
  const onMeals = orders.reduce((s, o) => s + (o.meals||[]).filter(m => m.is_on).length, 0);
  const grad = instGradient(inst.name || inst._id);

  return (
    <div className="mb-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Institute Header — clickable */}
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center gap-4 px-5 py-4 bg-gradient-to-r ${grad} text-left`}
      >
        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {getInitials(inst.name || "?")}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base truncate">{inst.name || inst._id}</p>
          <p className="text-white/70 text-xs">{inst.type} · {inst.hall} · {orders.length} user{orders.length !== 1 ? "s" : ""}</p>
        </div>
        {/* Stats pills */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
            ✅ {onMeals} on
          </span>
          <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
            🍽️ {totalMeals} total
          </span>
        </div>
        <span className="text-white/70 text-sm shrink-0 ml-2">{open ? "▼" : "▶"}</span>
      </button>

      {/* Users */}
      {open && (
        <div className="bg-gray-50 px-4 py-4">
          {orders.map(order => (
            <UserOrderCard key={order._id} order={order} onToggle={onToggle} onToggleAll={onToggleAll}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────
export default function MealOnOffAdmin() {
  const [dayWise, setDayWise]   = useState([]);
  const [allWise, setAllWise]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all"); // all | daywise | allwise
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/alldaymealadmindatashow`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setDayWise(data.data.dayWise || []);
        setAllWise(data.data.allWise || []);
      } else {
        setError(data.message || "Failed to load");
      }
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleToggle = async (orderId, mealId, newStatus) => {
  try {
    const res = await fetch(
      `${API_BASE}/superadmin/meal-toggle/${orderId}/${mealId}`,  // ← docId bug fix, /api/ double prefix সরানো
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ is_on: newStatus }),  // ← শুধু is_on পাঠাও, MealOnOffSuperAdmin এর মতো
      }
    );
    const data = await res.json();
    if (data.success) {
      const patch = (list) =>
        list.map((o) =>
          o._id === orderId
            ? { ...o, meals: o.meals.map((m) => (m._id === mealId ? { ...m, is_on: newStatus } : m)) }
            : o
        );
      setDayWise((p) => patch(p));
      setAllWise((p) => patch(p));
      showToast(`Meal turned ${newStatus ? "ON" : "OFF"}`);
    } else {
      showToast(data.message || "Update failed", "error");
    }
  } catch {
    showToast("Network error", "error");
  }
};

  const handleToggleAll = async (orderId, val) => {
    const order = [...dayWise, ...allWise].find(o => o._id === orderId);
    if (!order) return;
    for (const meal of order.meals) {
      await handleToggle(orderId, meal._id, val);
    }
  };

  // All available days for filter
  const allDays = useMemo(() => {
    const s = new Set([...dayWise, ...allWise].flatMap(o => (o.meals||[]).map(m => m.day)));
    return DAY_ORDER.filter(d => s.has(d));
  }, [dayWise, allWise]);

  // Combined orders filtered
  const combined = useMemo(() => {
    let orders = [];
    if (typeFilter !== "allwise") orders = [...orders, ...dayWise.map(o => ({ ...o, _type: "daywise" }))];
    if (typeFilter !== "daywise") orders = [...orders, ...allWise.map(o => ({ ...o, _type: "allwise" }))];

    const q = search.toLowerCase();
    return orders
      .map(order => {
        let meals = order.meals || [];
        if (dayFilter !== "all") meals = meals.filter(m => m.day === dayFilter);
        return { ...order, meals };
      })
      .filter(order => {
        if (order.meals.length === 0) return false;
        if (!q) return true;
        const u = order.user_id;
        const info = u?.information || {};
        const inst = order.institute_id;
        const instName = (inst?.name_of_institute || inst?.name || "").toLowerCase();
        return (
          (info.full_name || "").toLowerCase().includes(q) ||
          (u?.email || "").toLowerCase().includes(q) ||
          (u?.phone || "").toLowerCase().includes(q) ||
          String(u?.uid || "").includes(q) ||
          String(info.room_number || "").includes(q) ||
          instName.includes(q)
        );
      });
  }, [dayWise, allWise, search, dayFilter, typeFilter]);

  // Group by institute
  const byInstitute = useMemo(() => {
    const map = new Map();
    combined.forEach(order => {
      const inst = order.institute_id;
      const key = inst?._id || inst || "unknown";
      if (!map.has(key)) {
        map.set(key, {
          inst: {
            _id: key,
            name: inst?.name_of_institute || inst?.name || key,
            type: inst?.instituteType || "",
            hall: inst?.name_of_hall || "",
          },
          orders: [],
        });
      }
      map.get(key).orders.push(order);
    });
    return Array.from(map.values());
  }, [combined]);

  // Global stats
  const totalMeals = combined.reduce((s, o) => s + o.meals.length, 0);
  const onMeals    = combined.reduce((s, o) => s + o.meals.filter(m => m.is_on).length, 0);
  const totalUsers = new Set(combined.map(o => o.user_id?._id)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
          ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          <span>{toast.type === "success" ? "✓" : "✗"}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Meal Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Institute-wise meal on/off control</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type filter */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {[["all","All"],["daywise","Day Wise"],["allwise","All Wise"]].map(([v,l]) => (
                  <button key={v} onClick={() => setTypeFilter(v)}
                    className={`text-xs px-3 py-2 font-medium transition-colors
                      ${typeFilter === v ? "bg-violet-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                    {l}
                  </button>
                ))}
              </div>

              {/* Day filter */}
              <select value={dayFilter} onChange={e => setDayFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white">
                <option value="all">All Days</option>
                {allDays.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <button onClick={fetchData}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refresh
              </button>
            </div>

             <Link
  to="/admin/dashboard/allviewmealonoff"
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
>
  Add Meal On/Off
</Link>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, UID, room or institute..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <svg className="w-8 h-8 animate-spin text-violet-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={fetchData} className="mt-3 text-sm text-red-700 underline">Try again</button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Institutes", value: byInstitute.length, icon: "🏛️", color: "text-violet-700", bg: "bg-violet-50 border-violet-100" },
                { label: "Users",      value: totalUsers,          icon: "👥", color: "text-blue-700",   bg: "bg-blue-50 border-blue-100"   },
                { label: "Meals On",   value: onMeals,             icon: "✅", color: "text-green-700",  bg: "bg-green-50 border-green-100" },
                { label: "Meals Off",  value: totalMeals - onMeals,icon: "⛔", color: "text-red-600",    bg: "bg-red-50 border-red-100"     },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 text-center ${s.bg}`}>
                  <p className="text-xl mb-0.5">{s.icon}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Institute blocks */}
            {byInstitute.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-gray-500 font-medium">No meal orders found</p>
              </div>
            ) : (
              byInstitute.map(({ inst, orders }, idx) => (
                <InstituteBlock
                  key={inst._id}
                  inst={inst}
                  orders={orders}
                  onToggle={handleToggle}
                  onToggleAll={handleToggleAll}
                  defaultOpen={idx === 0}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
