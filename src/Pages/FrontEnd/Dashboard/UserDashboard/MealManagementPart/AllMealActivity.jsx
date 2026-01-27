import React, { useState } from "react";
import {
  FaSun,
  FaUtensils,
  FaMoon,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
const schedule2 = [
  {
    day: "Sat",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Mangsho + Dal / Murgi + Mach + Dal ",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Sun",
    morning: "Shobji Parota / Pitha",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Bhaja Shobji",
  },
  {
    day: "Mon",
    morning: "Nesco/Soup + Bhat/Parota",
    afternoon: "Gosht & Murgi + Bhat/Dal (Soup/Mukhar)",
    night: "Bhat, Dal + Alu Vorta",
  },
  {
    day: "Tue",
    morning: "Alu Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Bhat + Dim",
  },
  {
    day: "Wed",
    morning: "Shobji + Dal / Nesco + Dal  ",
    afternoon: "Murgi + Mach + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Thu",
    morning: "Alu, Piaj Vorta + Dal",
    afternoon: "Mach  + Dal",
    night: "Murgir Jhol + Shobji Lettuce",
  },
  {
    day: "Fri",
    morning: "Ruti + Shobji/ Ruti + Dal",
    afternoon: "Gorur Mangsho/Prani Jhol",
    night: "Bhat, Dim + Shobji (Shak, Mushroom)",
  },
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mealPlans = Array.from({ length: daysInMonth }, (_, i) => {
  const dateObj = new Date(year, month, i + 1);
  const dayName = weekDays[dateObj.getDay()];

  const daySchedule = schedule2.find((s) => s.day === dayName);

  return {
    date: `2026-01-${String(i + 1).padStart(2, "0")} (${dayName})`,
    breakfast: { price: 80, items: [daySchedule.morning] },
    lunch: { price: 150, items: [daySchedule.afternoon] },
    dinner: { price: 120, items: [daySchedule.night] },
  };
});

const AllMealCard = ({ title, icon, data, gradient, selected, onToggle }) => (
  <div
    className={`bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition
      hover:shadow-2xl transform hover:-translate-y-1`}
  >
    <div
      className={`flex items-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      <div className="text-sm lg:text-xl">{icon}</div>
      <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-1  lg:px-2 py-1 rounded-full font-bold text-xs lg:text-sm">
        ৳{data.price}
      </span>
    </div>

    <ul className="mt-5 space-y-2">
      {data.items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2 text-[10px] md:text-xs whitespace-nowrap xl:text-sm bg-gray-50  xl:px-3 py-2 rounded-lg"
        >
          {item}
        </li>
      ))}

      <div className="flex items-center justify-center w-full">
        <label class="switch !text-xs">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
    </ul>

    {/* <button
      onClick={onToggle}
      className={`mt-5 w-full py-2 cursor-pointer text-sm lg:text-base rounded-xl font-semibold transition
        ${
          selected
            ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
            : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
        }`}
    >
      {selected ? "Selected" : "Select Meal"}
    </button> */}
  </div>
);

const AllMealActivity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});

  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan.date;
  const toggleMeal = (meal) => {
    setSelectedMeals((prev) => {
      const mealsForDate = prev[activeDate] || [];
      return {
        ...prev,
        [activeDate]: mealsForDate.includes(meal)
          ? mealsForDate.filter((m) => m !== meal)
          : [...mealsForDate, meal],
      };
    });
  };

  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return sum + meals.reduce((s, m) => s + plan[m].price, 0);
    },
    0,
  );

  return (
    <main className="lg:col-span-3 space-y-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        {/* Left side: heading + subtitle */}
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>

        {/* Right side: date + total on same line */}
        <div className="flex flex-col items-end mt-4 sm:mt-0">
          <div className="flex items-center gap-4">
            <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              {activeDate}
            </span>
            <span className="text-md text-gray-500">Total:</span>
            <span className="text-2xl font-bold text-green-600 -ms-2">
              ৳{totalAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 ">
        <AllMealCard
          title="Breakfast"
          className="text-sm"
          icon={<FaSun />}
          data={activePlan.breakfast}
          gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
          selected={selectedMeals[activeDate]?.includes("breakfast")}
          onToggle={() => toggleMeal("breakfast")}
        />
        <AllMealCard
          title="Lunch"
          icon={<FaUtensils />}
          data={activePlan.lunch}
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
          selected={selectedMeals[activeDate]?.includes("lunch")}
          onToggle={() => toggleMeal("lunch")}
        />
        <AllMealCard
          title="Dinner"
          className=""
          icon={<FaMoon />}
          data={activePlan.dinner}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
          selected={selectedMeals[activeDate]?.includes("dinner")}
          onToggle={() => toggleMeal("dinner")}
        />
      </div>

      {/* {Object.keys(selectedMeals).length > 0 && (
                      <button
                        // onClick={() => setShowModal(true)}
                        className="w-1/2 lg:w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all"
                      >
                        Update
                      </button>
                    )} */}

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">
        <table className="min-w-full">
          <thead className="bg-orange-500 hidden md:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left text-white">Day</th>
              <th className="px-4 py-3 text-left text-white">Morning</th>
              <th className="px-4 py-3 text-left text-white">Afternoon</th>
              <th className="px-4 py-3 text-left text-white">Night</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {schedule2.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 flex flex-col md:table-row mb-4 border md:border-none rounded-xl"
              >
                <td className="px-4 py-3 font-bold text-orange-600 md:text-gray-800">
                  {row.day}
                </td>

                {["morning", "afternoon", "night"].map((mealType) => {
                  return (
                    <td
                      key={mealType}
                      className="px-2 py-2 md:py-3 flex justify-between md:table-cell border-b md:border-none"
                    >
                      <span className="font-bold text-orange-600 md:hidden mr-4 capitalize">
                        {mealType}:
                      </span>

                      <span className="text-gray-700 text-xs flex items-center justify-between w-full gap-2">
                        <p> {row[mealType]}</p>

                        {/* <p className="px-1 py-1 text-[8px] font-black text-white bg-green-600">
                                      On
                                    </p> */}

                        <p className="px-1 py-1 text-[8px] font-black text-white bg-red-600">
                          Off
                        </p>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AllMealActivity;
