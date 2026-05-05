import { CalendarDays } from "lucide-react";
import React, { useRef, useState } from "react";
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
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
          className="flex items-center gap-2 text-[10px] md:text-xs whitespace-nowrap xl:text-sm bg-gray-50 xl:px-3 py-2 rounded-lg"
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

const MessDetailsModal = ({
  member,
  setMessDetails,
  selectedMeals,
  setSelectedMeals,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan.date;
  const dateRef = useRef(null);

  const toggleMeal = (meal) => {
    const mealObj = {
      type: meal,
      price: activePlan[meal].price,
      items: activePlan[meal].items,
    };

    setSelectedMeals((prev) => {
      const memberIndex = prev.findIndex((m) => m.id === member.id);

      if (memberIndex !== -1) {
        const memberData = prev[memberIndex];
        const dateIndex = memberData.mealInfo.findIndex(
          (d) => d.date === activeDate,
        );

        let updatedMealInfo;

        if (dateIndex !== -1) {
          const dateData = memberData.mealInfo[dateIndex];
          const exists = dateData.meals.some((m) => m.type === meal);

          const updatedMeals = exists
            ? dateData.meals.filter((m) => m.type !== meal)
            : [...dateData.meals, mealObj];

          if (updatedMeals.length === 0) {
            updatedMealInfo = memberData.mealInfo.filter(
              (_, i) => i !== dateIndex,
            );
          } else {
            updatedMealInfo = memberData.mealInfo.map((d, i) =>
              i === dateIndex
                ? {
                    ...d,
                    meals: updatedMeals,
                    total: updatedMeals.reduce((s, m) => s + m.price, 0),
                  }
                : d,
            );
          }
        } else {
          updatedMealInfo = [
            ...memberData.mealInfo,
            { date: activeDate, meals: [mealObj], total: mealObj.price },
          ];
        }

        return prev.map((m, i) =>
          i === memberIndex ? { ...memberData, mealInfo: updatedMealInfo } : m,
        );
      }

      return [
        ...prev,
        {
          id: member.id,
          name: member.name,
          phone: member.phone,
          img: member.img,
          mealInfo: [
            { date: activeDate, meals: [mealObj], total: mealObj.price },
          ],
        },
      ];
    });
  };

  const memberData = selectedMeals.find((m) => m.id === member.id);
  const dateData = memberData?.mealInfo.find((d) => d.date === activeDate);
  const totalAmount =
    memberData?.mealInfo.reduce((s, d) => s + d.total, 0) || 0;

  return (
    <div
      onClick={() => setMessDetails(null)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-auto p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white mx-auto grid lg:grid-cols-4 gap-6 rounded-3xl p-6"
      >
        <button
          onClick={() => {
            document.body.style.overflow = "visible";
            setMessDetails(null);
          }}
          className="absolute top-4 right-4 z-50 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
        >
          <FaTimes />
        </button>

        <aside className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <h2 className="flex items-center gap-3 font-bold text-gray-800 p-5">
            <input
              type="date"
              ref={dateRef}
              className="absolute opacity-0 pointer-events-none"
            />
            <button
              onClick={() => dateRef.current?.showPicker()}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <FaCalendarAlt className="text-orange-500" />
            </button>
            Meal Calendar
          </h2>

          <div className="h-[70vh] overflow-y-auto p-5">
            {mealPlans.map((plan, index) => {
              const isSelected = memberData?.mealInfo.some(
                (d) => d.date === plan.date && d.meals.length > 0,
              );

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

        <main className="lg:col-span-3 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-center">
            <h1 className="text-xl lg:text-3xl font-extrabold text-gray-800">
              Choose Your Meals
            </h1>
            <span className="text-xl lg:text-2xl font-bold text-green-600">
              ৳{totalAmount}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MealCard
              title="Breakfast"
              icon={<FaSun />}
              data={activePlan.breakfast}
              gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
              selected={dateData?.meals.some((m) => m.type === "breakfast")}
              onToggle={() => toggleMeal("breakfast")}
            />
            <MealCard
              title="Lunch"
              icon={<FaUtensils />}
              data={activePlan.lunch}
              gradient="bg-gradient-to-r from-green-500 to-emerald-600"
              selected={dateData?.meals.some((m) => m.type === "lunch")}
              onToggle={() => toggleMeal("lunch")}
            />
            <MealCard
              title="Dinner"
              icon={<FaMoon />}
              data={activePlan.dinner}
              gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
              selected={dateData?.meals.some((m) => m.type === "dinner")}
              onToggle={() => toggleMeal("dinner")}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessDetailsModal;
