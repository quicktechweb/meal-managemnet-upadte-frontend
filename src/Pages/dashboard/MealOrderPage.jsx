import React, { useState } from "react";
import { useAllwiseInstituteUserOrderLists } from "../../api/cms/user.hook";

const KNOWN_MEAL_CONFIG = {
  breakfast: { emoji: "🍳", bg: "bg-orange-100", text: "text-orange-600" },
  lunch: { emoji: "🍱", bg: "bg-green-100", text: "text-green-700" },
  dinner: { emoji: "🌙", bg: "bg-indigo-100", text: "text-indigo-600" },
  brunch: { emoji: "🥞", bg: "bg-yellow-100", text: "text-yellow-700" },
  snack: { emoji: "🍿", bg: "bg-pink-100", text: "text-pink-600" },
};

// Dynamic color palette for unknown types (cycles by hash)
const DYNAMIC_PALETTES = [
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-rose-100", text: "text-rose-600" },
  { bg: "bg-violet-100", text: "text-violet-600" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
];

// Simple hash: consistent color per unique meal_type string
const hashString = (str) =>
  [...str].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

const getMealConfig = (meal_type = "") => {
  const key = meal_type.toLowerCase().trim();
  if (KNOWN_MEAL_CONFIG[key]) return KNOWN_MEAL_CONFIG[key];
  const palette = DYNAMIC_PALETTES[hashString(key) % DYNAMIC_PALETTES.length];
  return { emoji: "🍽️", ...palette };
};

/* ── Helpers ── */
const getUsername = (user) => user?.user_id?.email?.split("@")[0] ?? "Unknown";

const getInitials = (user) => getUsername(user).slice(0, 2).toUpperCase();

const formatTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour % 12 || 12}:${m} ${hour < 12 ? "AM" : "PM"}`;
};

/* ── Stat Card ── */
const StatCard = ({ label, value, valueClass }) => (
  <div className="flex-1 bg-white rounded-2xl p-4 shadow-md border border-gray-100">
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className={`text-2xl font-black mt-1 ${valueClass}`}>{value}</p>
  </div>
);

/* ── Skeleton Loader ── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gray-200" />
        <div>
          <div className="h-3.5 w-28 bg-gray-200 rounded-full" />
          <div className="h-2.5 w-40 bg-gray-100 rounded-full mt-2" />
        </div>
      </div>
      <div className="h-6 w-16 bg-gray-200 rounded-full" />
    </div>
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-36 bg-gray-100 rounded-2xl" />
      ))}
    </div>
  </div>
);

/* ── Meal Card ── */
const MealCard = ({ meal }) => {
  const cfg = getMealConfig(meal.meal_type);
  const showAttendance = meal.is_on;
  const attended = meal.is_attendance;
  const hasGuests = meal.guest_quantity > 0;

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-200
        ${
          meal.is_on
            ? "bg-white border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            : "bg-gray-50 border-gray-200 opacity-50"
        }`}
    >
      {/* Left attendance color strip */}
      {showAttendance && (
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl
          ${attended ? "bg-green-400" : "bg-red-300"}`}
        />
      )}

      <div className="p-4 pl-5">
        {/* OFF ribbon */}
        {!meal.is_on && (
          <div className="absolute top-3 -right-4 bg-gray-300 text-gray-500 text-[8px] font-black uppercase tracking-widest px-6 py-0.5 rotate-45">
            OFF
          </div>
        )}

        {/* Row 1 — type badge + is_on dot */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
          >
            {cfg.emoji} {meal.meal_type}
          </span>
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
            ${meal.is_on ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}
          >
            {meal.is_on ? "✓" : "✕"}
          </span>
        </div>

        {/* Row 2 — day */}
        <p className="text-xs font-semibold text-gray-400 mb-1">
          📅 {meal.day}
        </p>

        {/* Row 3 — time range */}
        {meal.start_time && meal.end_time && (
          <p className="text-[11px] font-medium text-gray-400 mb-1">
            🕐 {formatTime(meal.start_time)} – {formatTime(meal.end_time)}
          </p>
        )}

        {/* Row 4 — items */}
        <p className="text-sm font-medium text-gray-600">
          🍴 {meal.selected_items?.map((i) => i.title).join(", ")}
        </p>

        {/* Row 5 — guest badge */}
        {hasGuests && (
          <span className="inline-block mt-2 text-[10px] font-bold bg-purple-50 border border-purple-200 text-purple-600 px-2 py-0.5 rounded-full">
            👥 {meal.guest_quantity} Guest{meal.guest_quantity > 1 ? "s" : ""}
          </span>
        )}

        {/* Row 6 — price */}
        <p className="mt-3 text-base font-black text-gray-900">
          ৳{meal.package_price}
        </p>

        {/* Attendance section */}
        {showAttendance && (
          <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Attendance
              </span>
              {attended ? (
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Present
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-500 text-[11px] font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  Absent
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── User Card ── */
const UserCard = ({ user, filter }) => {
  const filteredMeals =
    filter === "All" ? user.meals : user.meals.filter((m) => m.day === filter);

  const activeMeals = filteredMeals.filter((m) => m.is_on);
  const attendedMeals = filteredMeals.filter((m) => m.is_on && m.is_attendance);
  const totalBill = activeMeals.reduce((s, m) => s + m.package_price, 0);
  const username = getUsername(user);

  console.log(user);

  const attendanceRate =
    activeMeals.length > 0
      ? Math.round((attendedMeals.length / activeMeals.length) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      {/* ── Card Head ── */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center text-sm font-black shrink-0">
            {getInitials(user)}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {user?.user_id?.information.full_name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              ✉ {user.user_id?.email}
            </p>
            <p className="text-xs text-gray-400">
              📞 {user.user_id?.phone} · ID #{user.user_id?.uid}
            </p>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1.5">
          <p className="text-xl font-black text-gray-900">৳{totalBill}</p>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              ✓ {activeMeals.length} Active
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide
              ${
                attendanceRate >= 80
                  ? "bg-green-100 text-green-700"
                  : attendanceRate >= 50
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-500"
              }`}
            >
              👤 {attendanceRate}% Present
            </span>
          </div>
        </div>
      </div>

      {/* ── Attendance Progress Bar ── */}
      {activeMeals.length > 0 && (
        <div className="px-5 pt-4 pb-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Attendance Progress
            </span>
            <span className="text-[10px] font-bold text-gray-500">
              {attendedMeals.length} / {activeMeals.length} meals
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500
                ${
                  attendanceRate >= 80
                    ? "bg-green-400"
                    : attendanceRate >= 50
                      ? "bg-yellow-400"
                      : "bg-red-400"
                }`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Meal Grid ── */}
      {filteredMeals.length === 0 ? (
        <div className="px-5 py-8 text-center text-gray-400 text-sm font-semibold">
          No meals registered for{" "}
          <span className="text-gray-600 font-bold">{filter}</span>
        </div>
      ) : (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main Page ── */
export default function MealOrderPage() {
  const {
    data: rawData,
    isLoading,
    isError,
  } = useAllwiseInstituteUserOrderLists();
  const [filter, setFilter] = useState("All");

  // Safely fall back to empty array
  const data = rawData ?? [];

  console.log(data);

  const allDays = [
    "All",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const totalUsers = data.length;
  const totalActiveMeals = data.reduce(
    (s, u) => s + u.meals.filter((m) => m.is_on).length,
    0,
  );
  const totalAttended = data.reduce(
    (s, u) => s + u.meals.filter((m) => m.is_on && m.is_attendance).length,
    0,
  );
  const grandTotal = data.reduce(
    (s, u) =>
      s +
      u.meals.filter((m) => m.is_on).reduce((ss, m) => ss + m.package_price, 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Dark Header ── */}
      <div className="bg-gray-900 px-6 pt-7 pb-20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-orange-500 opacity-10 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl shadow-lg shrink-0">
            🍽️
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Meal Routine Dashboard
            </h1>
            {/* <p className="text-xs text-gray-500 mt-0.5">
              QuickTech IT Ltd. — All Members' Meal List
            </p> */}
          </div>
          <div className="ml-auto text-[11px] text-gray-500 bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">
            {new Date().toLocaleDateString("en-BD", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Floating Stats ── */}
        <div className="flex gap-3 sm:gap-4 -mt-10 relative z-10">
          <StatCard
            label="Total Members"
            value={isLoading ? "—" : totalUsers}
            valueClass="text-gray-900"
          />
          <StatCard
            label="Active Meals"
            value={isLoading ? "—" : totalActiveMeals}
            valueClass="text-orange-500"
          />
          <StatCard
            label="Present"
            value={isLoading ? "—" : totalAttended}
            valueClass="text-blue-600"
          />
          <StatCard
            label="Total Bill"
            value={isLoading ? "—" : `৳${grandTotal}`}
            valueClass="text-green-600"
          />
        </div>

        {/* ── Day Filter ── */}
        <div className="flex items-center gap-2 mt-7 mb-5 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mr-1 whitespace-nowrap">
            Day Filter
          </span>
          {allDays.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 whitespace-nowrap
                ${
                  filter === d
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-400 hover:text-orange-500"
                }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* ── Legend ── */}
        <div className="flex items-center gap-4 mb-5 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Legend:
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />{" "}
            Present
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />{" "}
            Absent
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />{" "}
            Meal Off
          </span>
        </div>

        {/* ── States ── */}
        {isLoading && (
          <div className="flex flex-col gap-5">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-5 text-sm font-semibold text-center">
            ⚠️ Failed to load data. Please try again.
          </div>
        )}

        {!isLoading && !isError && data.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-10 text-center text-gray-400 text-sm font-semibold">
            😕 No orders found.
          </div>
        )}

        {/* ── User Cards ── */}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-5 pb-16">
            {data.map((user) => (
              <UserCard key={user._id} user={user} filter={filter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
