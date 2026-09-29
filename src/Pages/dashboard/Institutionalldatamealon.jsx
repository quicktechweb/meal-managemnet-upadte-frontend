// src/Pages/dashboard/Institutionalldatamealon.jsx
// Institute admin: user panel er hubohu mirror.
//  - All  : weekly baseline (7 din, aaj theke)
//  - Day Wise : aagamir 7 tarikh (baseline + override)
// Toggle => backend user panel er original logic e i cholbe (cutoff / refund / balance).

import { useState, useEffect, useMemo, useCallback } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

const GRADIENT = {
  breakfast: "bg-gradient-to-r from-yellow-400 to-orange-500",
  lunch: "bg-gradient-to-r from-green-500 to-emerald-600",
  dinner: "bg-gradient-to-r from-indigo-500 to-purple-600",
};
const gradientOf = (t) => GRADIENT[t?.toLowerCase()] || "bg-gradient-to-r from-blue-400 to-orange-500";

const initials = (n = "") =>
  n.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "U";
const monthShort = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${new Date(y, m - 1, d).toLocaleString("default", { month: "short" })}`;
};

// user panel er toggle er moto
function Switch({ on, onClick, disabled, size = "md" }) {
  const w = size === "sm" ? "w-10 h-5" : "w-12 h-6";
  const knob = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const left = on ? (size === "sm" ? "left-5" : "left-6") : "left-0.5";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative ${w} rounded-full transition-colors flex-shrink-0 ${on ? "bg-green-400" : "bg-gray-400"} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`absolute top-0.5 ${knob} bg-white rounded-full shadow transition-all duration-300 ${left}`} />
    </button>
  );
}

function MealCard({ meal, busy, onToggle }) {
  const isOn = meal.is_on === true;
  // backend purono hole `items` na-o thakte pare, tai duita field-i check kori
  const items = Array.isArray(meal.items)
    ? meal.items
    : (meal.selected_items || []).map((i) => i?.title).filter(Boolean);
  return (
    <div className="bg-white/90 rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[330px]">
      <div className={`px-3 py-3 rounded-xl text-white capitalize ${gradientOf(meal.meal_type)}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm lg:text-lg">{meal.meal_type}</h3>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{meal.day}</span>
          <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">৳{meal.price}</span>
          <Switch on={isOn} disabled={busy} onClick={() => onToggle(meal, !isOn)} />
        </div>
        <div className="flex font-semibold justify-center mt-1">
          <p>{meal.start_time}</p>-<p>{meal.end_time}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-0.5 mt-1">
        <h6 className="text-black font-semibold text-xs">Attendance Status</h6>
        <Switch on={meal.is_attendance === true} disabled />
      </div>

      <div className={`mt-2 ${!isOn ? "opacity-40" : ""}`}>
        <div className="flex items-center gap-2 border border-green-200 bg-green-50/50 rounded-full px-3 py-2 text-sm text-gray-700">
          <span className="text-green-500">✔</span>
          <span className="truncate">{items.length ? items.join(", ") : "—"}</span>
        </div>
        {meal.is_alternative && <p className="text-[11px] text-orange-500 mt-1 pl-2">Alternative item selected</p>}
      </div>

      {!isOn && (
        <p className="text-center text-xs text-gray-400 mt-1">This meal is turned OFF — won't be sent</p>
      )}

      {meal.guest_quantity > 0 && (
        <div className="mt-3 border-t border-gray-100 pt-2 text-xs font-semibold text-orange-600">
          Guest Meal × {meal.guest_quantity}
        </div>
      )}

      <div className="mt-2 flex gap-1.5 flex-wrap">
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${meal.balance_deducted ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
          {meal.balance_deducted ? "✓ Deducted" : "✗ Pending"}
        </span>
      </div>
    </div>
  );
}

// Calendar + Choose Your Meals (user panel er layout)
function MealPanel({ mode, days, orderId, userId, onToggleMeal, onToggleService, busyKey, hoursNote }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [userId, mode]);

  const active = days[activeIdx] || days[0];
  const meals = active?.meals || [];
  // (days/meals undefined hole crash na kore)
  const isParentOn = meals.some((m) => m.is_on);
  const dayHasOn = (d) => d.meals.some((m) => m.is_on);
  const parentBusy = busyKey === "service";

  if (!orderId && !days.some((d) => d.meals.length)) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-3xl mb-3">🍽️</p>
        <p className="text-gray-500 font-medium text-sm">
          No {mode === "daywise" ? "day-wise" : "all-wise"} meal order for this user
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
      <aside className="bg-white p-3 rounded-xl shadow w-full xl:w-[260px] xl:h-[360px] flex-shrink-0">
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="flex items-center justify-center gap-3 font-bold">
            <FaCalendarAlt /> Meal Calendar
          </h2>
          <p className="text-xs text-gray-500 text-center">Please Select Meal Day</p>
        </div>
        <div className="flex flex-col justify-center gap-1">
          {days.map((d, i) => {
            const viewing = i === activeIdx;
            const on = dayHasOn(d);
            return (
              <div
                key={d.day + i}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-all border ${
                  viewing
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : on
                      ? "bg-orange-100 text-orange-700 border-orange-300 font-semibold"
                      : "hover:bg-orange-50 text-gray-700 border-transparent"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">{d.day}</span>
                  {i === 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${viewing ? "bg-white/25 text-white" : "bg-orange-200 text-orange-600"}`}>
                      Today
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {mode === "daywise" && d.date && (
                    <span className={`text-xs ${viewing ? "text-white/90" : "text-gray-500"}`}>{monthShort(d.date)}</span>
                  )}
                  {on ? (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${viewing ? "bg-white text-orange-500" : "bg-orange-400 text-white"}`}>✓</span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-gray-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="flex flex-col w-full gap-3">
        <div className="bg-white/90 w-full rounded-3xl shadow-lg p-6">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">Choose Meals</h1>
          <p className="text-sm text-gray-500 mt-1">Manage this user's meals for the selected date</p>
          {hoursNote}
          {meals.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm font-semibold text-gray-700">
                {mode === "daywise" ? `${active.day} ` : ""}Meal Service ON / OFF
              </span>
              <Switch
                on={isParentOn}
                disabled={parentBusy}
                onClick={() => onToggleService(active, !isParentOn)}
              />
            </div>
          )}
        </div>

        {meals.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {meals.map((m) => (
              <MealCard
                key={`${m.day}-${m.meal_type}-${m.date || ""}`}
                meal={m}
                busy={busyKey === `${m.day}-${m.meal_type}-${m.date || ""}` || parentBusy}
                onToggle={onToggleMeal}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Meals Added on this day</p>
        )}
      </div>
    </div>
  );
}

export default function Institutionalldatamealon() {
  const [view, setView] = useState({ users: [], days: [], routine_type: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tab, setTab] = useState("allwise"); // "daywise" | "allwise"
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [toast, setToast] = useState(null);
  const [busyKey, setBusyKey] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchView = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    try {
      const { data } = await axiosSecure.get("/api/institute/meal-view");
      if (data.success) setView(data);
      else setError(data.message || "Failed to load");
    } catch (e) {
      setError(e?.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchView(); }, [fetchView]);

  const users = view.users || [];

  useEffect(() => {
    if (users.length && !selectedUserId) setSelectedUserId(users[0].user._id);
  }, [users, selectedUserId]);

  const rooms = useMemo(() => {
    const r = new Set(users.map((u) => u.user.information?.room_number).filter(Boolean));
    return ["All Rooms", ...Array.from(r).sort()];
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(({ user: u }) => {
      const info = u.information || {};
      const okRoom = roomFilter === "All Rooms" || String(info.room_number) === String(roomFilter);
      const okSearch =
        !q ||
        (info.full_name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q) ||
        String(u.uid || "").includes(q) ||
        String(info.room_number || "").includes(q);
      return okRoom && okSearch;
    });
  }, [users, search, roomFilter]);

  const selected = users.find((u) => u.user._id === selectedUserId);

  const callToggle = async (url, body, key) => {
    setBusyKey(key);
    try {
      const { data } = await axiosSecure.patch(url, body);
      showToast(data.message || "Updated");
    } catch (e) {
      showToast(e?.response?.data?.message || "Update failed", "error");
    } finally {
      await fetchView(true);
      setBusyKey(null);
    }
  };

  const onToggleMeal = (meal, is_on) =>
    callToggle(
      "/api/institute/meal-toggle",
      { user_id: selectedUserId, mode: tab, day: meal.day, date: meal.date, meal_type: meal.meal_type, is_on },
      `${meal.day}-${meal.meal_type}-${meal.date || ""}`,
    );

  const onToggleService = (dayObj, is_on) =>
    callToggle(
      "/api/institute/meal-toggle-service",
      { user_id: selectedUserId, mode: tab, day: dayObj.day, date: dayObj.date, is_on },
      "service",
    );

  const info = selected?.user.information || {};
  const name = info.full_name || selected?.user.email || "Unknown";
  const panel = selected ? (tab === "daywise" ? selected.dayWise : selected.allWise) : null;
  const countOn = (p) => p.days.reduce((s, d) => s + d.meals.filter((m) => m.is_on).length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? "✓ " : "✗ "}{toast.msg}
        </div>
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Meal On/Off Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Same as user panel{view.routine_type ? ` · ${view.routine_type}` : ""}
            </p>
          </div>
          <button onClick={() => fetchView()} className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-4">
          <select value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white">
            {rooms.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-500">Loading…</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={() => fetchView()} className="mt-3 text-sm text-red-700 underline">Try again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* LEFT: user list */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">User List</p>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, phone, UID, room…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 340px)" }}>
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No users found</div>
                ) : (
                  filtered.map(({ user: u, allWise, dayWise }) => {
                    const i = u.information || {};
                    const n = i.full_name || u.email || "Unknown";
                    const sel = u._id === selectedUserId;
                    return (
                      <button
                        key={u._id}
                        onClick={() => setSelectedUserId(u._id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 border-l-4 ${sel ? "bg-violet-50 border-l-violet-500" : "hover:bg-gray-50 border-l-transparent"}`}
                      >
                        <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{initials(n)}</div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 capitalize truncate">{n} <span className="text-xs text-gray-400">#{u.uid}</span></p>
                          <p className="text-xs text-gray-500 truncate">{u.email}</p>
                          <p className="text-[11px] text-gray-400">Room {i.room_number}</p>
                          <div className="flex gap-1 mt-1">
                            {dayWise.order_id && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Day Wise</span>}
                            {allWise.order_id && <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">All Wise</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {selected ? (
                <>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-violet-600 to-purple-600">
                      <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold">{initials(name)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold capitalize truncate">{name}</p>
                        <p className="text-purple-200 text-xs truncate">{selected.user.email} · {selected.user.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Room {info.room_number}</span>
                        <p className="text-purple-200 text-xs mt-1">{info.year} · #{selected.user.uid}</p>
                      </div>
                    </div>
                    <div className="flex px-5 pt-3 gap-2 bg-white border-b border-gray-100">
                      {[
                        { key: "daywise", label: "Day Wise", p: selected.dayWise },
                        { key: "allwise", label: "All", p: selected.allWise },
                      ].map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setTab(t.key)}
                          className={`text-sm font-semibold px-4 py-2 rounded-t-lg border-b-2 -mb-px ${tab === t.key ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                          {t.label}
                          <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">{countOn(t.p)} on</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <MealPanel
                    mode={tab}
                    days={panel?.days || []}
                    orderId={panel.order_id}
                    userId={selectedUserId}
                    onToggleMeal={onToggleMeal}
                    onToggleService={onToggleService}
                    busyKey={busyKey}
                  />
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
