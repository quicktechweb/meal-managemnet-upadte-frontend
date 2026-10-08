// User er "Meal Summary" (UserWeeklyMealSummary): running week (aj theke 7 din) e All Wise + Day Wise mile
// ami kon din kon meal e ON/OFF ache, ar koto taka lagbe.
//
// Niyom (cron ar Meal Overview er sathe ek-i):
//   - oi tarikh er Day Wise entry thakle (ON ba OFF) seta jite
//   - na thakle oi weekday er All Wise entry
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useInstituteAuth from "../../../../../Hooks/useInstituteAuth";
import {
  userAllWiseGetMealFunction,
  userDayWiseGetMealFunction,
  userAllWiseRoutineGetMealFunction,
  userDayWiseRoutineGetMealFunction,
} from "../../../../../api/cms/user.api";
import { cleanItemsTitle } from "../../../../../utils/cleanItemsTitle";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MEAL_ORDER = ["Breakfast", "Lunch", "Dinner"];

// Bangladesh (UTC+6) er aj theke 7 din
const getNext7Days = () => {
  const bdNow = new Date(Date.now() + 6 * 60 * 60 * 1000);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.UTC(bdNow.getUTCFullYear(), bdNow.getUTCMonth(), bdNow.getUTCDate() + i));
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    return {
      date: `${y}-${m}-${dd}`,
      day: DAY_NAMES[d.getUTCDay()],
      label: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`,
      isToday: i === 0,
    };
  });
};

const priceOf = (m) => Number(m?.package_price ?? m?.total_price ?? 0) || 0;
const guestOf = (m) => Math.max(0, Math.floor(Number(m?.guest_quantity) || 0));
const itemsOf = (m) =>
  (m?.selected_items || [])
    .map((i) => (typeof i === "string" ? i : i?.title))
    .filter(Boolean);

const UserWeeklyMealSummary = () => {
  const { user, token } = useInstituteAuth();
  const isRoutine = user?.user?.routine_type === "Routine";

  // 404 ("Meal not found") mane user ekhono kono meal e ON kore ni — eta error na
  const opts = { retry: false, enabled: !!token };
  const allQ = useQuery({
    queryKey: [isRoutine ? "all-wise-routine-get-meal-list" : "all-wise-get-meal"],
    queryFn: isRoutine ? userAllWiseRoutineGetMealFunction : userAllWiseGetMealFunction,
    ...opts,
  });
  const dayQ = useQuery({
    queryKey: [isRoutine ? "all-wise-routine-get-meal" : "day-wise-get-meal"],
    queryFn: isRoutine ? userDayWiseRoutineGetMealFunction : userDayWiseGetMealFunction,
    ...opts,
  });

  const loading = allQ.isLoading || dayQ.isLoading;
  const realError = [allQ.error, dayQ.error].find(
    (e) => e && e?.response?.status && e.response.status !== 404
  );

  const week = useMemo(() => {
    const allMeals = allQ.data?.meals || [];
    const dayMeals = dayQ.data?.meals || [];
    const days = getNext7Days();

    const rows = days.map((d) => {
      const cells = new Map();
      allMeals.filter((m) => m?.day === d.day).forEach((m) => cells.set(m.meal_type, { meal: m, source: "all" }));
      dayMeals.filter((m) => m?.date === d.date).forEach((m) => cells.set(m.meal_type, { meal: m, source: "day" }));
      const onCells = [...cells.values()].filter((c) => c.meal.is_on === true);
      return {
        ...d,
        cells,
        onCount: onCells.length,
        cost: onCells.reduce((s, c) => s + priceOf(c.meal) * (1 + guestOf(c.meal)), 0),
      };
    });

    const present = new Set(rows.flatMap((r) => [...r.cells.keys()]));
    const types = [
      ...MEAL_ORDER.filter((t) => present.has(t)),
      ...[...present].filter((t) => !MEAL_ORDER.includes(t)),
    ];

    return {
      rows,
      types,
      totalOn: rows.reduce((s, r) => s + r.onCount, 0),
      totalCost: rows.reduce((s, r) => s + r.cost, 0),
      offDays: rows.filter((r) => r.onCount === 0).length,
    };
  }, [allQ.data, dayQ.data]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Meal Summary</h1>
        <p className="text-sm text-gray-500">
          Ei shoptaher (aj theke 7 din) All Wise + Day Wise mile apnar meal koi din ache, ar koto taka lagbe.
        </p>
      </div>

      {loading && <p className="py-16 text-center text-gray-400">Loading…</p>}

      {!loading && realError && (
        <p className="py-6 text-center text-red-500 text-sm">
          {realError?.response?.data?.message || "Meal data load kora jayni"}
        </p>
      )}

      {!loading && !realError && week.types.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <p className="text-gray-700 font-semibold">Apni ekhono kono meal ON koren ni.</p>
          <Link
            to="/dashboards/mealonof"
            className="inline-block mt-3 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
          >
            Meal ON korun
          </Link>
        </div>
      )}

      {!loading && !realError && week.types.length > 0 && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Meals ON this week</p>
              <p className="text-3xl font-extrabold text-orange-500 mt-1">{week.totalOn}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Estimated cost</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">৳{week.totalCost}</p>
              <p className="text-[11px] text-gray-400">guest er dam shoho</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Days with no meal</p>
              <p className="text-3xl font-extrabold text-gray-800 mt-1">{week.offDays}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mb-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> ON</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> OFF</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> No meal</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">All Wise</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">Day Wise</span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  {week.types.map((t) => (
                    <th key={t} className="px-4 py-3 text-left font-semibold capitalize">{t}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold">Day total</th>
                </tr>
              </thead>
              <tbody>
                {week.rows.map((r, idx) => (
                  <tr
                    key={r.date}
                    className={`border-b border-gray-100 ${r.isToday ? "bg-orange-50/60" : idx % 2 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <td className="px-4 py-3 align-top whitespace-nowrap">
                      <p className="font-bold text-gray-800 flex items-center gap-2">
                        {r.day}
                        {r.isToday && (
                          <span className="text-[10px] font-semibold bg-orange-500 text-white px-1.5 py-0.5 rounded-full">Today</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{r.label}</p>
                    </td>

                    {week.types.map((t) => {
                      const cell = r.cells.get(t);
                      if (!cell) {
                        return (
                          <td key={t} className="px-4 py-3 align-top">
                            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                              <span className="w-2 h-2 rounded-full bg-gray-300" /> No meal
                            </span>
                          </td>
                        );
                      }
                      const m = cell.meal;
                      const on = m.is_on === true;
                      const guest = guestOf(m);
                      const items = itemsOf(m);
                      return (
                        <td key={t} className={`px-4 py-3 align-top ${on ? "" : "opacity-70"}`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${on ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                              {on ? "ON" : "OFF"}
                            </span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cell.source === "day" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>
                              {cell.source === "day" ? "Day Wise" : "All Wise"}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-green-700">৳{priceOf(m)}</p>
                          {(m.start_time || m.end_time) && (
                            <p className="text-[11px] text-gray-500">
                              {m.start_time}{m.end_time ? `–${m.end_time}` : ""}
                            </p>
                          )}
                          {items.length > 0 && (
                            <p className="text-xs text-gray-700 mt-0.5">{cleanItemsTitle(items.join(","))}</p>
                          )}
                          {guest > 0 && (
                            <p className="text-[11px] font-semibold text-orange-500 mt-0.5">
                              Guest × {guest}{on ? ` (৳${priceOf(m) * (1 + guest)})` : ""}
                            </p>
                          )}
                        </td>
                      );
                    })}

                    <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                      <p className="font-bold text-gray-800">{r.onCount} meal{r.onCount === 1 ? "" : "s"}</p>
                      <p className="text-xs text-green-700">৳{r.cost}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-gray-400 mt-3">
            Day Wise e kono tarikh er meal OFF korle shudhu oi tarikh e OFF dekhabe, porer shoptahe All Wise onujayi abar ON dekhabe.
          </p>
        </>
      )}
    </div>
  );
};

export default UserWeeklyMealSummary;
