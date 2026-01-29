import React, { useState } from "react";
import { FaSun, FaUtensils, FaMoon, FaCheckCircle } from "react-icons/fa";

/* =========================
   WEEKLY MENU
========================= */
const schedule2 = [
  {
    day: "Sat",
    morning: ["Alu Vorta + Dal", "Egg + Ruti"],
    afternoon: ["Murgi + Mangsho + Dal", "Murgi + Mach + Dal"],
    night: ["Bhat, Alu (Dim-er shonge)", "Dal + Shobji"],
  },
  {
    day: "Sun",
    morning: ["Shobji Parota / Pitha", "Egg + Ruti"],
    afternoon: ["Mach (Bhaji/Porha) + Dal", "Murgi + Mangsho + Dal"],
    night: ["Murgir Jhol + Bhaja Shobji", "Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Mon",
    morning: ["Nesco/Soup + Bhat/Parota"],
    afternoon: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
    night: ["Bhat, Dal + Alu Vorta"],
  },
  {
    day: "Tue",
    morning: ["Alu Vorta + Dal"],
    afternoon: ["Mach (Bhaji/Porha) + Dal"],
    night: ["Bhat + Dim"],
  },
  {
    day: "Wed",
    morning: ["Shobji + Dal / Nesco + Dal", "Bhat, Alu (Dim-er shonge)"],
    afternoon: ["Murgi + Mach + Dal", "Bhat, Alu (Dim-er shonge)"],
    night: ["Bhat, Alu (Dim-er shonge)", "Murgi + Mach + Dal"],
  },
  {
    day: "Thu",
    morning: ["Alu, Piaj Vorta + Dal", "Shobji + Dal / Nesco + Dal"],
    afternoon: ["Mach + Dal", "Murgi + Mach + Dal"],
    night: ["Murgir Jhol + Shobji Lettuce", "Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Fri",
    morning: ["Ruti + Shobji/ Ruti + Dal"],
    afternoon: ["Gorur Mangsho/Prani Jhol"],
    night: ["Bhat, Dim + Shobji (Shak, Mushroom)"],
  },
];

/* =========================
   MEAL CARD
========================= */
const MealCard = ({
  title,
  icon,
  data,
  gradient,
  selected,
  onToggle,
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
}) => (
  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition hover:shadow-2xl transform hover:-translate-y-1">
    <div
      className={`flex items-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      <div className="text-sm lg:text-xl">{icon}</div>
      <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-1 lg:px-2 py-1 rounded-full font-bold text-xs lg:text-sm">
        ৳{data.price}
      </span>
    </div>

    <div className="mt-2 space-y-2">
      {data.options.map((option, i) => {
        const isSelected = selectedOption === option;

        return (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedOption(option)}
            className={`w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition`}
          >
            <span className="w-4">
              {isSelected && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
            </span>
            <span className="flex-1">{option}</span>
          </button>
        );
      })}

      {quantity !== undefined && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <button
            className="px-2 py-1 bg-orange-200 rounded-lg"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            className="px-2 py-1 bg-orange-200 rounded-lg"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      )}

      <div className="flex items-center justify-center w-full mt-3">
        <label className="switch !text-xs">
          <input type="checkbox" checked={selected} onChange={onToggle} />
          <span className="slider"></span>
        </label>
      </div>
    </div>

    <button
      onClick={onToggle}
      className={`mt-5 w-full py-2 cursor-pointer text-sm lg:text-base rounded-xl font-semibold transition ${
        selected
          ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
          : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
      }`}
    >
      {selected ? "Selected" : "Select Meal"}
    </button>
  </div>
);

/* =========================
   HELPER FUNCTIONS
========================= */
const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      date: d.toISOString().split("T")[0],
      breakfast: true,
      lunch: true,
      dinner: true,
    });
  }
  return days;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mealPlans = getNext7Days().map((dayObj) => {
  const dateObj = new Date(dayObj.date);
  const dayName = weekDays[dateObj.getDay()];
  const daySchedule = schedule2.find((s) => s.day === dayName);

  return {
    date: dayObj.date,
    breakfast: { price: 80, options: daySchedule.morning },
    lunch: { price: 150, options: daySchedule.afternoon },
    dinner: { price: 120, options: daySchedule.night },
  };
});

/* =========================
   MAIN COMPONENT
========================= */
export default function AllMealActivity({
  weeklyMealStatus,
  globalMealStatus,
  setGlobalMealStatus,
  setWeeklyMealStatus,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan.date;

  /* -----------------------------
     TOGGLE MEAL FOR THE ACTIVE DATE
  ----------------------------- */
  const toggleMeal = (mealKey) => {
    setSelectedMeals((prev) => {
      const currentDayMeals = prev[activeDate] || [];
      const isSelected = currentDayMeals.includes(mealKey);

      const updatedMeals = isSelected
        ? currentDayMeals.filter((m) => m !== mealKey)
        : [...currentDayMeals, mealKey];

      return { ...prev, [activeDate]: updatedMeals };
    });
  };

  return (
    <div className="lg:col-span-3 space-y-4">
      {/* Header */}
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

      {/* Meal Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <MealCard
          title="Breakfast"
          icon={<FaSun />}
          data={activePlan.breakfast}
          gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
          selected={selectedMeals[activeDate]?.includes("breakfast")}
          onToggle={() => toggleMeal("breakfast")}
          selectedOption={
            selectedOptions[activeDate]?.breakfast ||
            activePlan.breakfast.options[0]
          }
          setSelectedOption={(option) =>
            setSelectedOptions((prev) => ({
              ...prev,
              [activeDate]: { ...prev[activeDate], breakfast: option },
            }))
          }
        />

        <MealCard
          title="Lunch"
          icon={<FaUtensils />}
          data={activePlan.lunch}
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
          selected={selectedMeals[activeDate]?.includes("lunch")}
          onToggle={() => toggleMeal("lunch")}
          selectedOption={
            selectedOptions[activeDate]?.lunch || activePlan.lunch.options[0]
          }
          setSelectedOption={(option) =>
            setSelectedOptions((prev) => ({
              ...prev,
              [activeDate]: { ...prev[activeDate], lunch: option },
            }))
          }
        />

        <MealCard
          title="Dinner"
          icon={<FaMoon />}
          data={activePlan.dinner}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
          selected={selectedMeals[activeDate]?.includes("dinner")}
          onToggle={() => toggleMeal("dinner")}
          selectedOption={
            selectedOptions[activeDate]?.dinner || activePlan.dinner.options[0]
          }
          setSelectedOption={(option) =>
            setSelectedOptions((prev) => ({
              ...prev,
              [activeDate]: { ...prev[activeDate], dinner: option },
            }))
          }
        />

        {Object.keys(selectedMeals).length > 0 && (
          <div className="col-span-3">
            <button className="w-1/2 lg:w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all">
              Update
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      {/* <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Day</th>
              <th className="px-4 py-3">Morning</th>
              <th className="px-4 py-3">Afternoon</th>
              <th className="px-4 py-3">Night</th>
            </tr>
          </thead>

          <tbody>
            {schedule2.map((row, index) => {
              const dayStatus = weeklyMealStatus[index];

              return (
                <tr key={row.day} className="border-b">
                  <td className="px-4 py-3 font-bold">
                    {row.day}
                    <div className="text-[10px] text-gray-500">
                      {dayStatus.date}
                    </div>
                  </td>

                  {[
                    ["morning", "breakfast"],
                    ["afternoon", "lunch"],
                    ["night", "dinner"],
                  ].map(([slot, mealKey]) => {
                   const finalStatus =
                     globalMealStatus[mealKey] &&
                     selectedMeals[row.day]?.includes(mealKey);

                    const displayText =
                      selectedOptions[dayStatus.date]?.[mealKey] ||
                      row[slot].join(", ");

                    return (
                      <td key={mealKey} className="px-4 py-3 text-sm">
                        <div className="flex justify-between items-center gap-2">
                          <span>{displayText}</span>

                          <button
                            disabled={!globalMealStatus[mealKey]}
                            className={`px-2 py-1 text-[9px] font-bold text-white rounded ${
                              finalStatus ? "bg-green-600" : "bg-red-600"
                            } ${
                              !globalMealStatus[mealKey] &&
                              "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {finalStatus ? "ON" : "OFF"}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
