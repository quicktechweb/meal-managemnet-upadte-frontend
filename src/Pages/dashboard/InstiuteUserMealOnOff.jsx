import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://alabadanbackendpart.alabadan.com/api";

const DAY_ORDER = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙" };

const MEAL_COLORS = {
  Breakfast: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  Lunch:     { bg: "bg-sky-50",   border: "border-sky-200",   badge: "bg-sky-100 text-sky-700"     },
  Dinner:    { bg: "bg-indigo-50",border: "border-indigo-200",badge: "bg-indigo-100 text-indigo-700"},
};

const DAY_COLORS = [
  "bg-rose-500", "bg-orange-500", "bg-amber-500",
  "bg-green-600", "bg-sky-500", "bg-indigo-500", "bg-purple-500",
];

// ── Toggle ────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, loading }) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none
        ${checked ? "bg-green-500" : "bg-gray-300"}
        ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300
        ${checked ? "translate-x-6" : "translate-x-1"}`} />
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

// ── Single Meal Card ──────────────────────────────────────────────────────
function MealCard({ meal, orderId, onToggle }) {
  const [loading, setLoading] = useState(false);
  const colors = MEAL_COLORS[meal.meal_type] || MEAL_COLORS.Lunch;

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(orderId, meal._id, !meal.is_on);
    setLoading(false);
  };

  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-3 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">{MEAL_ICONS[meal.meal_type]}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
            {meal.meal_type}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-medium ${meal.is_on ? "text-green-600" : "text-gray-400"}`}>
            {meal.is_on ? "Active" : "Off"}
          </span>
          <Toggle checked={meal.is_on} onChange={handleToggle} loading={loading} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {meal.selected_items.map((item) => (
          <span key={item._id} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {item.title}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
        <span>🕐 {meal.start_time} – {meal.end_time}</span>
        <span className="font-semibold text-gray-700">৳{meal.package_price}</span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full ${meal.is_attendance ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {meal.is_attendance ? "✓ Attendance" : "✗ No Attendance"}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${meal.balance_deducted ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
          {meal.balance_deducted ? "✓ Deducted" : "✗ Pending"}
        </span>
      </div>
    </div>
  );
}

// ── Day Section ───────────────────────────────────────────────────────────
function DaySection({ day, meals, orderId, onToggle }) {
  const dayIndex = DAY_ORDER.indexOf(day);
  const dotColor = DAY_COLORS[dayIndex >= 0 ? dayIndex : 0];
  const activeCount = meals.filter((m) => m.is_on).length;

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-3 w-3 rounded-full shrink-0 ${dotColor}`} />
        <h3 className="text-sm font-bold text-gray-800">{day}</h3>
        <span className="text-xs text-gray-400">
          ({activeCount}/{meals.length} active)
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} orderId={orderId} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}

// ── User Meal Card ────────────────────────────────────────────────────────
function UserMealCard({ order, onToggle, headerColor }) {
  const user = order.user_id;
  const info = user?.information || {};

  const mealsByDay = {};
  (order.meals || []).forEach((meal) => {
    if (!mealsByDay[meal.day]) mealsByDay[meal.day] = [];
    mealsByDay[meal.day].push(meal);
  });

  const sortedDays = Object.keys(mealsByDay).sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b)
  );

  const totalActive = order.meals.filter((m) => m.is_on).length;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
      {/* User Header */}
      <div className={`flex items-center gap-4 px-5 py-4 ${headerColor || "bg-gradient-to-r from-slate-800 to-slate-700"}`}>
        <div className="h-12 w-12 rounded-full bg-slate-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
          {info.full_name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate capitalize">{info.full_name || "Unknown User"}</p>
          <p className="text-slate-300 text-xs truncate">{user?.email} · {user?.phone}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            Room {info.room_number}
          </span>
          <p className="text-slate-300 text-xs mt-1">{info.year}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between">
        <div className="flex gap-3">
          <span className="text-xs text-gray-500">
            📅 <span className="font-semibold text-gray-700">{sortedDays.length}</span> days
          </span>
          <span className="text-xs text-gray-500">
            🍽️ <span className="font-semibold text-gray-700">{order.meals.length}</span> meals
          </span>
          <span className="text-xs text-gray-500">
            ✅ <span className="font-semibold text-green-600">{totalActive}</span> active
          </span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {order.routine_type}
        </span>
      </div>

      {/* Days & Meals */}
      <div className="px-5 pb-5 pt-3">
        {sortedDays.map((day) => (
          <DaySection
            key={day}
            day={day}
            meals={mealsByDay[day]}
            orderId={order._id}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section Block (DayWise / AllWise) ────────────────────────────────────
function SectionBlock({ title, icon, count, orders, onToggle, headerColor, emptyMsg }) {
  const [collapsed, setCollapsed] = useState(false);

  if (orders.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <button
        onClick={() => setCollapsed((p) => !p)}
        className="w-full flex items-center gap-3 mb-4 group text-left"
      >
        <span className="text-xl">{icon}</span>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <span className="text-xs text-white bg-gray-700 px-2 py-0.5 rounded-full">
          {count} user{count !== 1 ? "s" : ""}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
          {collapsed ? "▶ Show" : "▼ Hide"}
        </span>
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <UserMealCard
              key={order._id}
              order={order}
              onToggle={onToggle}
              headerColor={headerColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function MealManagement() {
  const [dayWise, setDayWise] = useState([]);
  const [allWise, setAllWise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/alldaymeal`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setDayWise(data.data.dayWise || []);
        setAllWise(data.data.allWise || []);
      } else {
        setError(data.message || "Failed to load meals");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generic toggle — updates whichever list contains the order
  const handleToggle = async (orderId, mealId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/allwise-institute-user-meal-order/toggle-meal`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ meal_order_id: orderId, meal_id: mealId, is_on: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        const patchList = (list) =>
          list.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  meals: order.meals.map((m) =>
                    m._id === mealId ? { ...m, is_on: newStatus } : m
                  ),
                }
              : order
          );
        setDayWise((prev) => patchList(prev));
        setAllWise((prev) => patchList(prev));
        showToast(`Meal turned ${newStatus ? "ON" : "OFF"} successfully`);
      } else {
        showToast(data.message || "Update failed", "error");
      }
    } catch {
      showToast("Network error while updating", "error");
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const totalUsers = dayWise.length + allWise.length;

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

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Meal Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Toggle meal on/off for users</p>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>

          <Link
  to="/dashboards/all-meal-on-off"
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
>
  Add Meal On/Off
</Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-8 h-8 animate-spin text-slate-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-500 text-sm">Loading meal orders...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={fetchOrders} className="mt-3 text-sm text-red-700 underline">Try again</button>
          </div>
        ) : totalUsers === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-gray-500 font-medium">No meal orders found</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {totalUsers} user{totalUsers !== 1 ? "s" : ""} found
              {dayWise.length > 0 && allWise.length > 0 && (
                <span className="ml-2 text-gray-400">
                  ({dayWise.length} day-wise · {allWise.length} all-wise)
                </span>
              )}
            </p>

            {/* ── Day Wise Section ── */}
            <SectionBlock
              title="Day Wise Orders"
              icon="📆"
              count={dayWise.length}
              orders={dayWise}
              onToggle={handleToggle}
              headerColor="bg-gradient-to-r from-emerald-700 to-teal-600"
            />

            {/* ── All Wise Section ── */}
            <SectionBlock
              title="All Wise Orders"
              icon="🗓️"
              count={allWise.length}
              orders={allWise}
              onToggle={handleToggle}
              headerColor="bg-gradient-to-r from-slate-800 to-slate-700"
            />
          </>
        )}
      </div>
    </div>
  );
}
