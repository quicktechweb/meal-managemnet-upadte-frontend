import React, { useState } from "react";
import { FaSun, FaUtensils, FaMoon, FaCheckCircle } from "react-icons/fa";

/* =========================
   WEEKLY MENU
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
const AllMealCard = ({
  title,
  icon,
  checked,
  onToggle,
  gradient,
  price,
  item_name,
}) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg">
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      {icon}
      <h3 className="font-semibold">{title}</h3>
      <span className="ml-auto bg-white/20 px-2 py-1 rounded-full font-bold text-xs">
        ৳{price}
      </span>
    </div>

    <li className="flex items-center gap-2 text-xs py-2">
      <FaCheckCircle className="text-green-500" />
      {item_name}
    </li>

    <select
      value={""}
      className="w-full border border-gray-300 px-2 py-1 rounded-lg text-xs"
    >
      <option>Alu Borta</option>
    </select>

    <div className="flex justify-center mt-3">
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
export default function AllMealPage({ weeklyMealStatus, setWeeklyMealStatus }) {
  /* GLOBAL MASTER SWITCH */
  const [globalMealStatus, setGlobalMealStatus] = useState({
    breakfast: false,
    lunch: true,
    dinner: true,
  });

  /* WEEKLY OVERRIDE */
  const toggleGlobalMeal = (mealType) => {
    setGlobalMealStatus((prev) => {
      const newValue = !prev[mealType];

      // sync weekly
      setWeeklyMealStatus((days) =>
        days.map((day) => ({
          ...day,
          [mealType]: newValue,
        })),
      );

      return { ...prev, [mealType]: newValue };
    });
  };

  /* DAY-WISE TOGGLE */
  const toggleWeeklyMeal = (date, mealType) => {
    if (!globalMealStatus[mealType]) return;

    setWeeklyMealStatus((prev) =>
      prev.map((day) =>
        day.date === date ? { ...day, [mealType]: !day[mealType] } : day,
      ),
    );
  };

  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <AllMealCard
          title="Breakfast"
          price="120"
          item_name="Ruti"
          icon={<FaSun />}
          gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
          checked={globalMealStatus.breakfast}
          onToggle={() => toggleGlobalMeal("breakfast")}
        />

        <AllMealCard
          title="Lunch"
          price="130"
          item_name="Alu Vorta"
          icon={<FaUtensils />}
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
          checked={globalMealStatus.lunch}
          onToggle={() => toggleGlobalMeal("lunch")}
        />

        <AllMealCard
          title="Dinner"
          price="190"
          item_name="Mach / Vat"
          icon={<FaMoon />}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
          checked={globalMealStatus.dinner}
          onToggle={() => toggleGlobalMeal("dinner")}
        />
      </div>
    </div>
  );
}
