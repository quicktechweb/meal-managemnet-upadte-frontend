import React, { useState } from "react";
import { FaSun, FaUtensils, FaMoon } from "react-icons/fa";

/* =========================
   WEEKLY SCHEDULE
========================= */
const schedule2 = [
  {
    day: "Sat",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Dal",
    night: "Alu Vorta + Dal",
  },
  {
    day: "Sun",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Dal",
    night: "Alu Vorta + Dal",
  },
  {
    day: "Mon",
    morning: "Shobji Parota / Pitha",
    afternoon: "Mach + Dal",
    night: "Murgir Jhol + Shobji",
  },
  {
    day: "Tue",
    morning: "Alu Vorta + Dal",
    afternoon: "Mach + Dal",
    night: "Bhat + Dim",
  },
  {
    day: "Wed",
    morning: "Shobji + Dal",
    afternoon: "Murgi + Mach + Dal",
    night: "Bhat + Alu (Dim)",
  },
  {
    day: "Thu",
    morning: "Alu Piaj Vorta + Dal",
    afternoon: "Mach + Dal",
    night: "Murgir Jhol + Shobji",
  },
  {
    day: "Fri",
    morning: "Bhat + Dim + Shobji",
    afternoon: "Gorur Mangsho",
    night: "Ruti + Dal",
  },
];

/* =========================
   MEAL CARD
========================= */
const AllMealCard = ({ title, icon, checked, onToggle, gradient }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg">
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>

    <div className="flex justify-center mt-4">
      <label className="switch !text-xs">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span className="slider"></span>
      </label>
    </div>
  </div>
);

/* =========================
   MAIN COMPONENT
========================= */
const AllMealActivity = ({ globalMealStatus, setGlobalMealStatus }) => {
  const toggleMeal = (mealType) => {
    setGlobalMealStatus((prev) => ({
      ...prev,
      [mealType]: !prev[mealType],
    }));
  };

  return (
    <main className="lg:col-span-3 space-y-3">
      <h1 className="text-2xl font-bold">Meal Turn ON / OFF</h1>

      {/* GLOBAL TOGGLES */}
      <div className="grid md:grid-cols-3 gap-6">
        <AllMealCard
          title="Breakfast"
          icon={<FaSun />}
          gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
          checked={globalMealStatus.breakfast}
          onToggle={() => toggleMeal("breakfast")}
        />
        <AllMealCard
          title="Lunch"
          icon={<FaUtensils />}
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
          checked={globalMealStatus.lunch}
          onToggle={() => toggleMeal("lunch")}
        />
        <AllMealCard
          title="Dinner"
          icon={<FaMoon />}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
          checked={globalMealStatus.dinner}
          onToggle={() => toggleMeal("dinner")}
        />
      </div>
    </main>
  );
};

export default AllMealActivity;
