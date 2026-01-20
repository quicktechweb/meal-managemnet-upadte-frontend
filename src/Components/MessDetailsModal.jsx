import React, { useState } from "react";
import {
  FaSun,
  FaUtensils,
  FaMoon,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

const schedule = [
  {
    day: "Sat",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Mach/Mangsho + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Sun",
    morning: "Shobji Parota/Pitha",
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
    morning: "Nesco/Shobji + Dal",
    afternoon: "Murgi + Mach + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Thu",
    morning: "Alu, Piaj Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Shobji Lettuce",
  },
  {
    day: "Fri",
    morning: "Ruti/Shobji/Dal",
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

  const daySchedule = schedule.find((s) => s.day === dayName);

  return {
    date: `2026-01-${String(i + 1).padStart(2, "0")} (${dayName})`,
    breakfast: { price: 80, items: [daySchedule.morning] },
    lunch: { price: 150, items: [daySchedule.afternoon] },
    dinner: { price: 120, items: [daySchedule.night] },
  };
});

const MealCard = ({ title, icon, data, gradient, selected, onToggle }) => (
  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition hover:shadow-2xl transform hover:-translate-y-1">
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      <div className="text-base lg:text-xl">{icon}</div>
      <h3 className="font-semibold text-base lg:text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-2 py-1 rounded-full font-bold whitespace-nowrap text-xs lg:text-sm">
        ৳{data.price}
      </span>
    </div>

    <ul className="mt-2.5 lg:mt-5 space-y-2">
      {data.items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2 text-[10px] md:text-xs whitespace-nowrap xl:text-sm bg-gray-50  xl:px-3 py-2 rounded-lg"
        >
          <FaCheckCircle className="text-green-500 shrink-0" />
          {item}
        </li>
      ))}
    </ul>

    <button
      onClick={onToggle}
      className={`mt-2.5 lg:mt-5 w-full py-1.5 lg:py-3 text-sm cursor-pointer lg:text-base rounded-xl font-semibold transition ${
        selected
          ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
          : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
      }`}
    >
      {selected ? "Selected" : "Select Meal"}
    </button>
  </div>
);

const MessDetailsModal = ({ member, setMessDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [showModal, setShowModal] = useState(false);

  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan.date;

  // Toggle meal for a specific date
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

  // Total amount across all selected dates and meals
  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return sum + meals.reduce((s, m) => s + plan[m].price, 0);
    },
    0,
  );

  return (
    <div
      onClick={() => {
        setMessDetails(null);
        document.body.style.overflow = "visible";
      }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-auto p-4"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full  max-h-[90vh] overflow-y-auto bg-white mx-auto grid lg:grid-cols-4 gap-6 rounded-3xl p-6"
      >
        {/* Top-Right Close Button */}
        <button
          onClick={() => {
            setMessDetails(null);
            document.body.style.overflow = "visible";
          }}
          className="absolute top-4 right-4 z-50 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg text-gray-800 cursor-pointer"
        >
          <FaTimes />
        </button>

        {/* Sidebar */}
        <aside className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl ">
          <h2 className="flex items-center gap-3 font-bold  text-gray-800 p-5">
            <FaCalendarAlt className="text-orange-500" /> Meal Calendar
          </h2>

          <div className="h-[70vh] overflow-y-auto p-5">
            {mealPlans.map((plan, index) => {
              const isSelected =
                selectedMeals[plan.date] && selectedMeals[plan.date].length > 0;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full mb-2 text-sm 2xl:text-base px-4 py-2 rounded-xl text-left font-medium ${
                    activeIndex === index
                      ? "bg-orange-500 text-white shadow-md"
                      : isSelected
                        ? "bg-green-100 text-green-700 shadow-sm"
                        : "bg-gray-100 hover:bg-orange-100"
                  }`}
                >
                  {plan.date}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-3xl font-extrabold text-gray-800">
                Choose Your Meals
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">
                Select your preferred meals for the selected date(s)
              </p>
            </div>

            <div className="flex flex-col items-end mt-4 sm:mt-0">
              <div className="flex items-center gap-4">
                <span className="text-xs lg:text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                  {activeDate}
                </span>
                <span className="text-sm lg:text-xl text-gray-500">Total:</span>
                <span className="text-xl lg:text-2xl font-bold text-green-600 -ms-2">
                  ৳{totalAmount}
                </span>
              </div>
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
            />
            <MealCard
              title="Lunch"
              icon={<FaUtensils />}
              data={activePlan.lunch}
              gradient="bg-gradient-to-r from-green-500 to-emerald-600"
              selected={selectedMeals[activeDate]?.includes("lunch")}
              onToggle={() => toggleMeal("lunch")}
            />
            <MealCard
              title="Dinner"
              icon={<FaMoon />}
              data={activePlan.dinner}
              gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
              selected={selectedMeals[activeDate]?.includes("dinner")}
              onToggle={() => toggleMeal("dinner")}
            />
          </div>

          {/* Proceed Button */}
          {Object.keys(selectedMeals).length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="w-1/2 lg:w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all"
            >
              Proceed to Order
            </button>
          )}
        </main>
      </div>

      {/* Confirm Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Confirm Order
            </h2>

            <div className="space-y-3 mb-4">
              <input
                className="w-full border rounded-xl px-4 py-2"
                value={member?.name}
                placeholder="Name"
              />

              <input
                className="w-full border rounded-xl px-4 py-2"
                value={member?.phone}
                placeholder="Phone"
              />
            </div>

            <div className="space-y-4 mb-4">
              {Object.entries(selectedMeals).map(([date, meals]) => {
                const plan = mealPlans.find((p) => p.date === date);
                return (
                  <div key={date} className="p-3 bg-gray-50 rounded-xl">
                    <h3 className="font-bold mb-2 text-gray-700">{date}</h3>
                    {meals.map((meal) => (
                      <div key={meal} className="mb-2">
                        <p className="font-semibold capitalize text-gray-800">
                          {meal} – ৳ {plan[meal].price}
                        </p>
                        <ul className="ml-4 text-sm">
                          {plan[meal].items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="font-bold text-lg mb-4 text-green-600">
              Total: ৳ {totalAmount}
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-500 transition-all">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessDetailsModal;
