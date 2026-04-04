import React, { useState, useRef, useEffect } from "react";
import {
  FaSun,
  FaUtensils,
  FaMoon,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import MealCard from "./MealCard";
import { AllMealActivityCard } from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivityCard";
import AllMealActivity from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../api/cms/user.hook";

// ----------------- SCHEDULE -----------------
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
    morning: ["Nesco/Soup + Bhat/Parota", "Nesco/Soup + Bhat/Parota"],
    afternoon: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)", "Alu Vorta + Dal"],
    night: ["Bhat, Dal + Alu Vorta", "Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
  },
  {
    day: "Tue",
    morning: ["Alu Vorta + Dal", "Nesco/Soup + Bhat/Parota"],
    afternoon: [
      "Mach (Bhaji/Porha) + Dal",
      "Gosht & Murgi + Bhat/Dal (Soup/Mukhar)",
    ],
    night: ["Bhat + Dim", "Mach (Bhaji/Porha) + Dal"],
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
   UTIL: NEXT 7 DAYS
========================= */
const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      date: d.toISOString().split("T")[0],
    });
  }
  return days;
};

// ----------------- DATE CALCULATIONS -----------------
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MealActivity = () => {
  const { user, loading } = useInstituteAuth();

  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const routine = data?.routine;

  const mealTypes = React.useMemo(() => {
    return (
      routine?.meal_type_lists?.map((m) => ({
        type: m.meal_type,
        start: m.start_time,
        end: m.end_time,
      })) || []
    );
  }, [routine]);

  // ----------------- MEAL PLANS -----------------
  const mealPlans = getNext7Days().map((dayObj) => {
    const dateObj = new Date(dayObj.date);
    const dayName = weekDays[dateObj.getDay()];

    const daySchedule = schedule2?.find((s) => s.day === dayName);

    // console.log(daySchedule);

    return {
      date: `${dayObj.date} (${dayName})`,
      breakfast: { price: 80, options: daySchedule.morning },
      lunch: { price: 150, options: daySchedule.afternoon },
      dinner: { price: 120, options: daySchedule.night },
    };
  });

  const mealPlanss = getNext7Days().map((dayObj) => {
    const dateObj = new Date(dayObj.date);
    const dayName = weekDays[dateObj.getDay()];

    const meals = routine?.schedule_lists?.filter((s) => s.day === dayName);

    return {
      date: dayObj.date,
      day: dayName,
      meals,
    };
  });

  console.log(mealPlanss);

  const getDateByDayName = (dayName) => {
    return mealPlans.find((p) => p.date.includes(`(${dayName})`))?.date;
  };

  const [weeklyMealStatus, setWeeklyMealStatus] = useState(getNext7Days());
  const [daywiseSelect, setDaywiseSelect] = useState("day-wise");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [guestMeals, setGuestMeals] = useState({});
  const [guestSelectedOptions, setGuestSelectedOptions] = useState({});

  const [selectedOptions, setSelectedOptions] = useState({});

  const activePlan = mealPlans[activeIndex];

  console.log(activePlan);

  const activeDate = activePlan?.date;
  const dateRef = useRef(null);

  useEffect(() => {
    setSelectedOptions((prev) => {
      if (!prev[activeDate]) {
        return {
          ...prev,
          [activeDate]: {
            breakfast: activePlan.breakfast.options[0],
            lunch: activePlan.lunch.options[0],
            dinner: activePlan.dinner.options[0],
          },
        };
      }
      return prev;
    });

    setGuestSelectedOptions((prev) => {
      if (!prev[activeDate]) {
        return {
          ...prev,
          [activeDate]: {
            breakfast: activePlan.breakfast.options[0],
            lunch: activePlan.lunch.options[0],
            dinner: activePlan.dinner.options[0],
          },
        };
      }
      return prev;
    });
  }, [activeDate]);

  // Toggle user meal
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

  // Toggle guest meal with quantity
  const toggleGuestMeal = (meal) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};
      if (dayMeals[meal]) {
        const updated = { ...dayMeals };
        delete updated[meal];
        return { ...prev, [activeDate]: updated };
      }
      return { ...prev, [activeDate]: { ...dayMeals, [meal]: 1 } };
    });
  };

  const setGuestMealQty = (meal, qty) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};
      return { ...prev, [activeDate]: { ...dayMeals, [meal]: qty } };
    });
  };

  // Totals
  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return sum + meals.reduce((s, m) => s + plan[m].price, 0);
    },
    0,
  );

  const guestTotalAmount = Object.entries(guestMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return (
        sum +
        Object.entries(meals).reduce(
          (s, [meal, qty]) => s + plan[meal].price * qty,
          0,
        )
      );
    },
    0,
  );

  // React Table

  const isMealActive = (date, meal) =>
    selectedMeals[date]?.includes(meal) || guestMeals[date]?.[meal];

  const getGuestInfo = (date, meal) => {
    const qty = guestMeals[date]?.[meal];
    if (!qty) return null;

    const option = guestSelectedOptions?.[date]?.[meal];
    return { qty, option };
  };

  const [globalMealStatus, setGlobalMealStatus] = useState({
    breakfast: false,
    lunch: true,
    dinner: true,
  });

  const getSelectedText = (date, meal) => {
    const userOption = selectedOptions[date]?.[meal];
    const guestOption = guestSelectedOptions[date]?.[meal];
    const guestQty = guestMeals[date]?.[meal];

    return {
      userOption,
      guestOption,
      guestQty,
    };
  };

  return (
    <div>
      {/* Meal Activity */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-lg font-semibold mb-3">Your Meal Activity</h4>
        <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
          {/* Sidebar */}
          <aside
            className={`bg-white/80 w-full backdrop-blur-xl rounded-3xl ${daywiseSelect === "day-wise" ? "h-fit" : "h-fit"} shadow-xl p-2 max-w-[300px] shrink-0`}
          >
            <h2 className="flex items-center justify-center gap-3 font-bold text-gray-800 ">
              <input
                type="date"
                ref={dateRef}
                className="absolute opacity-0 pointer-events-none"
              />
              <button
                onClick={() => dateRef.current?.showPicker()}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FaCalendarAlt className="text-orange-500" />
              </button>
              Meal Calendar
            </h2>

            <div className="flex items-center gap-3 bg-orange-50 p-1 rounded-full">
              <button
                onClick={() => setDaywiseSelect("day-wise")}
                className={`px-5 py-2 flex-1 rounded-full cursor-pointer text-xs font-semibold ${
                  daywiseSelect === "day-wise"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-orange-600  hover:bg-orange-100"
                } shadow-md  transition`}
              >
                Date Wise
              </button>
              <button
                onClick={() => setDaywiseSelect("show-all")}
                className={`px-5 flex-1 py-2 rounded-full cursor-pointer  text-xs font-semibold ${
                  daywiseSelect === "show-all"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-orange-600  hover:bg-orange-100"
                } transition`}
              >
                All
              </button>
            </div>

            {daywiseSelect === "day-wise" && (
              <div className="h-auto overflow-y-auto p-2">
                {mealPlans.map((plan, index) => {
                  const isSelected =
                    selectedMeals[plan.date] &&
                    selectedMeals[plan.date].length > 0;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full mb-2 text-sm 2xl:text-base px-4 py-2 rounded-xl text-left font-medium cursor-pointer ${
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
            )}
          </aside>

          {/* Content */}
          {daywiseSelect === "day-wise" && (
            <main className=" space-y-6">
              {/* for individual meal */}
              {/* User Meals */}
              <div className="flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
                  <div className="flex flex-col">
                    <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                      Choose Your Meals
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Select your preferred meals for the selected date(s)
                    </p>
                  </div>
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

                <div className="flex flex-wrap gap-6">
                  {/* Breakfast */}
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
                        [activeDate]: {
                          ...prev[activeDate],
                          breakfast: option,
                        },
                      }))
                    }
                  />
                  {/* Lunch */}
                  <MealCard
                    title="Lunch"
                    icon={<FaUtensils />}
                    data={activePlan.lunch}
                    gradient="bg-gradient-to-r from-green-500 to-emerald-600"
                    selected={selectedMeals[activeDate]?.includes("lunch")}
                    onToggle={() => toggleMeal("lunch")}
                    selectedOption={
                      selectedOptions[activeDate]?.lunch ||
                      activePlan.lunch.options[0]
                    }
                    setSelectedOption={(option) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: { ...prev[activeDate], lunch: option },
                      }))
                    }
                  />
                  {/* Dinner */}
                  <MealCard
                    title="Dinner"
                    icon={<FaMoon />}
                    data={activePlan.dinner}
                    gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
                    selected={selectedMeals[activeDate]?.includes("dinner")}
                    onToggle={() => toggleMeal("dinner")}
                    selectedOption={
                      selectedOptions[activeDate]?.dinner ||
                      activePlan.dinner.options[0]
                    }
                    setSelectedOption={(option) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: { ...prev[activeDate], dinner: option },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-center w-fulla">
                  {Object.keys(selectedMeals).length > 0 && (
                    <button
                      // onClick={() => setShowModal(true)}
                      className="w-[200px]  mx-auto  bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>

              {/* for guest meal */}
              {/* Guest Meals */}
              <div className="flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
                  <div className="flex flex-col">
                    <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                      Choose Your Meals for Guest
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Select meals and quantity for your guests
                    </p>
                  </div>
                  <div className="flex flex-col items-end mt-4 sm:mt-0">
                    <div className="flex items-center gap-4">
                      <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                        {activeDate}
                      </span>
                      <span className="text-md text-gray-500">Total:</span>
                      <span className="text-2xl font-bold text-green-600 -ms-2">
                        ৳{guestTotalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <MealCard
                    title="Breakfast"
                    icon={<FaSun />}
                    data={activePlan.breakfast}
                    gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
                    selected={!!guestMeals[activeDate]?.breakfast}
                    quantity={guestMeals[activeDate]?.breakfast || 1}
                    setQuantity={(qty) => setGuestMealQty("breakfast", qty)}
                    selectedOption={
                      guestSelectedOptions[activeDate]?.breakfast ||
                      activePlan.breakfast.options[0]
                    }
                    setSelectedOption={(option) =>
                      setGuestSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: {
                          ...prev[activeDate],
                          breakfast: option,
                        },
                      }))
                    }
                    onToggle={() => toggleGuestMeal("breakfast")}
                  />
                  <MealCard
                    title="Lunch"
                    icon={<FaUtensils />}
                    data={activePlan.lunch}
                    gradient="bg-gradient-to-r from-green-500 to-emerald-600"
                    selected={!!guestMeals[activeDate]?.lunch}
                    quantity={guestMeals[activeDate]?.lunch || 1}
                    setQuantity={(qty) => setGuestMealQty("lunch", qty)}
                    selectedOption={
                      guestSelectedOptions[activeDate]?.lunch ||
                      activePlan.lunch.options[0]
                    }
                    setSelectedOption={(option) =>
                      setGuestSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: {
                          ...prev[activeDate],
                          lunch: option,
                        },
                      }))
                    }
                    onToggle={() => toggleGuestMeal("lunch")}
                  />
                  <MealCard
                    title="Dinner"
                    icon={<FaMoon />}
                    data={activePlan.dinner}
                    gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
                    selected={!!guestMeals[activeDate]?.dinner}
                    quantity={guestMeals[activeDate]?.dinner || 1}
                    setQuantity={(qty) => setGuestMealQty("dinner", qty)}
                    selectedOption={
                      guestSelectedOptions[activeDate]?.dinner ||
                      activePlan.dinner.options[0]
                    }
                    setSelectedOption={(option) =>
                      setGuestSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: {
                          ...prev[activeDate],
                          dinner: option,
                        },
                      }))
                    }
                    onToggle={() => toggleGuestMeal("dinner")}
                  />
                </div>
                <div>
                  {Object.keys(guestMeals).length > 0 && (
                    <button
                      // onClick={() => setShowModal(true)}
                      className="w-1/2 lg:w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </main>
          )}

          {daywiseSelect !== "day-wise" && (
            <AllMealActivity
              globalMealStatus={globalMealStatus}
              setGlobalMealStatus={setGlobalMealStatus}
              weeklyMealStatus={weeklyMealStatus}
              setWeeklyMealStatus={setWeeklyMealStatus}
            />
          )}
        </div>

        {daywiseSelect === "day-wise" && (
          <div className="mt-6">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
              <table className="min-w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3">Breakfast</th>
                    <th className="px-4 py-3">Lunch</th>
                    <th className="px-4 py-3">Dinner</th>
                  </tr>
                </thead>

                <tbody>
                  {mealPlans.map((plan) => {
                    const dateKey = plan.date;

                    return (
                      <tr key={dateKey} className="border-b">
                        <td className="px-4 py-3 font-bold text-sm">
                          {dateKey}
                        </td>

                        {["breakfast", "lunch", "dinner"].map((meal) => {
                          const isUserActive =
                            selectedMeals?.[dateKey]?.includes(meal);

                          const userOption =
                            selectedOptions?.[dateKey]?.[meal] ||
                            plan[meal].options[0];

                          const guestQty = guestMeals?.[dateKey]?.[meal];
                          const guestOption =
                            guestSelectedOptions?.[dateKey]?.[meal] ||
                            plan[meal].options[0];

                          const isActive = isUserActive || guestQty;

                          return (
                            <td key={meal} className="px-4 py-3 text-sm">
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex flex-col leading-tight">
                                  <span
                                    className={`font-medium ${
                                      isUserActive
                                        ? "text-gray-800"
                                        : "text-gray-400 italic"
                                    }`}
                                  >
                                    {isUserActive
                                      ? userOption
                                      : plan[meal].options[0]}
                                  </span>

                                  {guestQty && (
                                    <span className="text-[10px] text-blue-600 font-semibold mt-1">
                                      {guestOption} ×{guestQty} (Guest)
                                    </span>
                                  )}
                                </div>

                                <span
                                  className={`px-2 py-1 text-[9px] h-[20px] text-white rounded ${
                                    isActive ? "bg-green-600" : "bg-red-600"
                                  }`}
                                >
                                  {isActive ? "ON" : "OFF"}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4">
              {mealPlans.map((plan) => {
                const dateKey = plan.date;
                return (
                  <div
                    key={dateKey}
                    className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3"
                  >
                    <div className="font-bold text-gray-700">{dateKey}</div>

                    {["breakfast", "lunch", "dinner"].map((meal) => {
                      const isUserActive =
                        selectedMeals?.[dateKey]?.includes(meal);

                      const userOption =
                        selectedOptions?.[dateKey]?.[meal] ||
                        plan[meal].options[0];

                      const guestQty = guestMeals?.[dateKey]?.[meal];
                      const guestOption =
                        guestSelectedOptions?.[dateKey]?.[meal] ||
                        plan[meal].options[0];

                      const isActive = isUserActive || guestQty;

                      return (
                        <div
                          key={meal}
                          className="flex justify-between items-center border-b border-gray-200 pb-2"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 capitalize">
                              {meal}
                            </span>
                            <span
                              className={`${
                                isUserActive
                                  ? "text-gray-800"
                                  : "text-gray-400 italic"
                              }`}
                            >
                              {isUserActive
                                ? userOption
                                : plan[meal].options[0]}
                            </span>
                            {guestQty && (
                              <span className="text-[10px] text-blue-600 font-semibold">
                                {guestOption} ×{guestQty} (Guest)
                              </span>
                            )}
                          </div>

                          <span
                            className={`px-2 py-1 text-[9px] h-[20px] text-white rounded ${
                              isActive ? "bg-green-600" : "bg-red-600"
                            }`}
                          >
                            {isActive ? "ON" : "OFF"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealActivity;
