import { useState, useEffect, useMemo } from "react";

const API_BASE = "http://localhost:5000/api";

const DAY_ORDER = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙" };
const MEAL_COLORS = {
  Breakfast: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  Lunch:     { bg: "bg-sky-50",   border: "border-sky-200",   badge: "bg-sky-100 text-sky-700" },
  Dinner:    { bg: "bg-indigo-50",border: "border-indigo-200",badge: "bg-indigo-100 text-indigo-700" },
};
const DAY_COLORS = ["bg-rose-500","bg-orange-500","bg-amber-500","bg-green-600","bg-sky-500","bg-indigo-500","bg-purple-500"];

function getInitials(name = "") {
  return name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "U";
}
function avatarBg(name = "") {
  const colors = ["bg-violet-500","bg-pink-500","bg-cyan-500","bg-emerald-500","bg-amber-500","bg-rose-500","bg-indigo-500"];
  let sum = 0;
  for (let c of name) sum += c.charCodeAt(0);
  return colors[sum % colors.length];
}

function Toggle({ checked, onChange, loading }) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none
        ${checked ? "bg-violet-500" : "bg-gray-200"}
        ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300
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

function MealCard({ meal, orderId, onToggle }) {
  const [loading, setLoading] = useState(false);
  const colors = MEAL_COLORS[meal.meal_type] || MEAL_COLORS.Lunch;

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(orderId, meal._id, !meal.is_on);
    setLoading(false);
  };

  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-3 flex flex-col gap-2 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span>{MEAL_ICONS[meal.meal_type]}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{meal.meal_type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-medium ${meal.is_on ? "text-green-600" : "text-gray-400"}`}>
            {meal.is_on ? "Active" : "Off"}
          </span>
          <Toggle checked={meal.is_on} onChange={handleToggle} loading={loading} />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {(meal.selected_items || []).map(item => (
          <span key={item._id} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{item.title}</span>
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

function DaySection({ day, meals, orderId, onToggle }) {
  const idx = DAY_ORDER.indexOf(day);
  const dot = DAY_COLORS[idx >= 0 ? idx : 0];
  const active = meals.filter(m => m.is_on).length;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${dot}`} />
        <h4 className="text-sm font-bold text-gray-800">{day}</h4>
        <span className="text-xs text-gray-400">({active}/{meals.length} active)</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {meals.map(meal => (
          <MealCard key={meal._id} meal={meal} orderId={orderId} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}

function OrderBlock({ order, onToggle }) {
  const mealsByDay = {};
  (order.meals || []).forEach(m => {
    if (!mealsByDay[m.day]) mealsByDay[m.day] = [];
    mealsByDay[m.day].push(m);
  });
  const sortedDays = Object.keys(mealsByDay).sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  const totalActive = (order.meals || []).filter(m => m.is_on).length;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">{order.routine_type}</span>
        <span className="text-xs text-gray-400">UID #{order.uid}</span>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-green-600 font-medium">{totalActive}/{(order.meals||[]).length} active</span>
      </div>
      {sortedDays.map(day => (
        <DaySection key={day} day={day} meals={mealsByDay[day]} orderId={order._id} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default function AddMealOnOff() {
  const [dayWise, setDayWise] = useState([]);
  const [allWise, setAllWise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("allwise"); // "daywise" | "allwise"
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
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
        setError(data.message || "Failed to load");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // Extract unique users from both lists
  const users = useMemo(() => {
    const map = new Map();
    [...dayWise, ...allWise].forEach(order => {
      const u = order.user_id;
      if (u && u._id && !map.has(u._id)) {
        map.set(u._id, u);
      }
    });
    return Array.from(map.values());
  }, [dayWise, allWise]);

  // Auto-select first user
  useEffect(() => {
    if (users.length > 0 && !selectedUserId) {
      setSelectedUserId(users[0]._id);
    }
  }, [users]);

  const rooms = useMemo(() => {
    const r = new Set(users.map(u => u.information?.room_number).filter(Boolean));
    return ["All Rooms", ...Array.from(r).sort()];
  }, [users]);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u => {
      const info = u.information || {};
      const matchRoom = roomFilter === "All Rooms" || String(info.room_number) === String(roomFilter);
      const matchSearch = !q ||
        (info.full_name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q) ||
        String(u.uid || "").includes(q) ||
        String(info.room_number || "").includes(q);
      return matchRoom && matchSearch;
    });
  }, [users, search, roomFilter]);

  const selectedUser = users.find(u => u._id === selectedUserId);

  // Orders for selected user
  const userDayWise = dayWise.filter(o =>
    (o.user_id?._id || o.user_id) === selectedUserId
  );
  const userAllWise = allWise.filter(o =>
    (o.user_id?._id || o.user_id) === selectedUserId
  );
  const activeOrders = activeTab === "daywise" ? userDayWise : userAllWise;

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
        const patch = list =>
          list.map(order =>
            order._id === orderId
              ? { ...order, meals: order.meals.map(m => m._id === mealId ? { ...m, is_on: newStatus } : m) }
              : order
          );
        setDayWise(p => patch(p));
        setAllWise(p => patch(p));
        showToast(`Meal turned ${newStatus ? "ON" : "OFF"}`);
      } else {
        showToast(data.message || "Update failed", "error");
      }
    } catch {
      showToast("Network error", "error");
    }
  };

  const info = selectedUser?.information || {};
  const uName = info.full_name || selectedUser?.email || "Unknown";

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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Meal On/Off Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Select a user to manage their meal schedule</p>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

        {/* Room Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-4">
          {/* <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Filter By Room</label> */}
          <select
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
          >
            {rooms.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>

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
            <button onClick={fetchOrders} className="mt-3 text-sm text-red-700 underline">Try again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* ── LEFT: User List ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">User List</p>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone, UID or room..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div className="overflow-y-auto flex-1" style={{ maxHeight: "calc(100vh - 340px)" }}>
                {filteredUsers.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No users found</div>
                ) : (
                  filteredUsers.map((u, i) => {
                    const uInfo = u.information || {};
                    const name = uInfo.full_name || u.email || "Unknown";
                    const isSelected = u._id === selectedUserId;
                    const hasDayWise = dayWise.some(o => (o.user_id?._id || o.user_id) === u._id);
                    const hasAllWise = allWise.some(o => (o.user_id?._id || o.user_id) === u._id);
                    return (
                      <button
                        key={u._id}
                        onClick={() => setSelectedUserId(u._id)}
                        className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all border-b border-gray-50
                          ${isSelected
                            ? "bg-violet-50 border-l-4 border-l-violet-500"
                            : "hover:bg-gray-50 border-l-4 border-l-transparent"}`}
                      >
                        <div className={`h-10 w-10 rounded-full ${avatarBg(name)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                          {getInitials(name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-gray-800 capitalize truncate">{name}</p>
                            <span className="text-xs text-gray-400 shrink-0">#{u.uid || i + 1}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{u.email}</p>
                          <p className="text-xs text-gray-400">{u.phone}</p>
                          <div className="flex gap-1 mt-1">
                            {hasDayWise && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Day Wise</span>}
                            {hasAllWise && <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">All Wise</span>}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-semibold text-gray-700">Room {uInfo.room_number}</p>
                          <p className="text-xs text-gray-400 capitalize">{uInfo.designation || "Student"}</p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── RIGHT: Meal Panel ── */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              {selectedUser ? (
                <>
                  {/* User Info Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className={`flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-violet-600 to-purple-600`}>
                      <div className={`h-12 w-12 rounded-full ${avatarBg(uName)} flex items-center justify-center text-white text-lg font-bold shrink-0`}>
                        {getInitials(uName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold capitalize truncate">{uName}</p>
                        <p className="text-purple-200 text-xs truncate">{selectedUser.email} · {selectedUser.phone}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Room {info.room_number}</span>
                        <p className="text-purple-200 text-xs mt-1">{info.year} · #{selectedUser.uid}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="px-5 py-3 flex items-center gap-4 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs text-gray-500">
                        📆 <span className="font-semibold text-gray-700">{userDayWise.length}</span> Day Wise orders
                      </span>
                      <span className="text-xs text-gray-500">
                        🗓️ <span className="font-semibold text-gray-700">{userAllWise.length}</span> All Wise orders
                      </span>
                      <span className="text-xs text-gray-500">
                        ✅ <span className="font-semibold text-green-600">
                          {[...userDayWise, ...userAllWise].reduce((s, o) => s + o.meals.filter(m => m.is_on).length, 0)}
                        </span> active meals
                      </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-5 pt-3 gap-2 bg-white border-b border-gray-100">
                      {[
                        { key: "daywise", label: "📆 Day Wise", count: userDayWise.length },
                        { key: "allwise", label: "🗓️ All Wise", count: userAllWise.length },
                      ].map(t => (
                        <button
                          key={t.key}
                          onClick={() => setActiveTab(t.key)}
                          className={`text-sm font-semibold px-4 py-2.5 rounded-t-lg border-b-2 transition-all -mb-px
                            ${activeTab === t.key
                              ? "border-violet-500 text-violet-700 bg-white"
                              : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                          {t.label}
                          <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full
                            ${activeTab === t.key ? "bg-violet-100 text-violet-600" : "bg-gray-200 text-gray-500"}`}>
                            {t.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders */}
                  <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 400px)" }}>
                    {activeOrders.length === 0 ? (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                        <p className="text-3xl mb-3">🍽️</p>
                        <p className="text-gray-500 font-medium text-sm">
                          No {activeTab === "daywise" ? "day-wise" : "all-wise"} meal orders for this user
                        </p>
                      </div>
                    ) : (
                      activeOrders.map(order => (
                        <OrderBlock key={order._id} order={order} onToggle={handleToggle} />
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <p className="text-4xl mb-3">👈</p>
                  <p className="text-gray-500 font-medium">Select a user from the left</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
