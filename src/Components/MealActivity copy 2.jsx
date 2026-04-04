import React, { useState, useRef, useEffect } from "react";
import { FaSun, FaUtensils, FaMoon, FaCalendarAlt } from "react-icons/fa";

import MealCard from "./MealCard";
import AllMealActivity from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../api/cms/user.hook";

/* ========================= */
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ========================= */
const getMealIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "breakfast":
      return <FaSun />;
    case "lunch":
      return <FaUtensils />;
    case "dinner":
      return <FaMoon />;
    default:
      return <FaUtensils />;
  }
};

const getMealTypeGradient = (type) => {
  switch (type?.toLowerCase()) {
    case "breakfast":
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    case "lunch":
      return "bg-gradient-to-r from-green-500 to-emerald-600";
    case "dinner":
      return "bg-gradient-to-r from-indigo-500 to-purple-600";
    default:
      return "";
  }
};

const MealActivity = () => {
  const { user } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const routine = data?.routine;

  /* =========================
     Meal Plan
  ========================= */
  const mealPlans = getNext7Days().map((dayObj) => {
    const dateObj = new Date(dayObj.date);
    const dayName = weekDays[dateObj.getDay()];

    const meals =
      routine?.schedule_lists?.filter((s) => s.day === dayName) || [];

    const mealsObj = {};

    meals.forEach((meal) => {
      const key = meal.meal_type.toLowerCase();

      mealsObj[key] = {
        type: meal.meal_type,
        price:
          meal.items?.reduce((sum, item) => sum + Number(item.price || 0), 0) ||
          0,
        options: meal.items?.map((i) => i.title) || ["No meal available"],
      };
    });

    return {
      date: `${dayObj.date} (${dayName})`,
      meals: mealsObj,
    };
  });

  /* ========================= STATES ========================= */
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan?.date;

  const [daywiseSelect, setDaywiseSelect] = useState("day-wise");

  const [selectedMeals, setSelectedMeals] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const [guestMeals, setGuestMeals] = useState({});
  const [guestSelectedOptions, setGuestSelectedOptions] = useState({});

  const [weeklyMealStatus, setWeeklyMealStatus] = useState(getNext7Days());
  const [globalMealStatus, setGlobalMealStatus] = useState({});

  const dateRef = useRef(null);

  /* ========================= DEFAULT OPTIONS ========================= */
  useEffect(() => {
    if (!activePlan) return;

    const init = (setter) => {
      setter((prev) => {
        if (!prev[activeDate]) {
          const obj = {};
          Object.entries(activePlan.meals || {}).forEach(
            ([mealKey, mealData]) => {
              obj[mealKey] = mealData.options?.[0];
            },
          );
          return { ...prev, [activeDate]: obj };
        }
        return prev;
      });
    };

    init(setSelectedOptions);
    init(setGuestSelectedOptions);
  }, [activeDate, activePlan]);

  /* ========================= HANDLERS ========================= */
  const toggleMeal = (mealKey) => {
    setSelectedMeals((prev) => {
      const mealsForDate = prev[activeDate] || [];
      return {
        ...prev,
        [activeDate]: mealsForDate.includes(mealKey)
          ? mealsForDate.filter((m) => m !== mealKey)
          : [...mealsForDate, mealKey],
      };
    });
  };

  const toggleGuestMeal = (mealKey) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};

      if (dayMeals[mealKey]) {
        const updated = { ...dayMeals };
        delete updated[mealKey];
        return { ...prev, [activeDate]: updated };
      }

      return {
        ...prev,
        [activeDate]: { ...dayMeals, [mealKey]: 1 },
      };
    });
  };

  const setGuestMealQty = (mealKey, qty) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};
      return {
        ...prev,
        [activeDate]: { ...dayMeals, [mealKey]: qty },
      };
    });
  };

  /* ========================= TOTAL ========================= */
  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return (
        sum + meals.reduce((s, m) => s + (plan?.meals?.[m]?.price || 0), 0)
      );
    },
    0,
  );

  const guestTotalAmount = Object.entries(guestMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return (
        sum +
        Object.entries(meals).reduce(
          (s, [mealKey, qty]) => s + (plan?.meals?.[mealKey]?.price || 0) * qty,
          0,
        )
      );
    },
    0,
  );

  const mealKeys = Object.keys(activePlan?.meals || {});

  return (
    <div className="flex flex-col gap-4">
      {/* TOGGLE */}
      <div className="flex gap-2">
        <button
          onClick={() => setDaywiseSelect("day-wise")}
          className={`px-4 py-2 font-semibold rounded ${
            daywiseSelect === "day-wise"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 cursor-pointer"
          }`}
        >
          Day Wise
        </button>
        <button
          onClick={() => setDaywiseSelect("show-all")}
          className={`px-4 py-2 font-semibold rounded ${
            daywiseSelect === "show-all"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 cursor-pointer"
          }`}
        >
          All
        </button>
      </div>

      {/* ================= DAY WISE ================= */}
      {daywiseSelect === "day-wise" && (
        <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
          {/* SIDEBAR */}
          <aside className="bg-white p-3 rounded-xl shadow w-[260px]">
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

            {mealPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`block w-full text-left p-2 rounded mb-2 ${
                  activeIndex === index
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {plan.date}
              </button>
            ))}
          </aside>

          <div className="flex flex-col gap-4">
            <div>
              {/* USER */}
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

              <div className="flex flex-wrap gap-4">
                {Object.entries(activePlan?.meals || {}).map(
                  ([mealKey, mealData]) => (
                    <MealCard
                      key={mealKey}
                      title={mealData.type}
                      icon={getMealIcon(mealData.type)}
                      gradient={getMealTypeGradient(mealData.type)}
                      data={mealData}
                      selected={selectedMeals[activeDate]?.includes(mealKey)}
                      onToggle={() => toggleMeal(mealKey)}
                      selectedOption={selectedOptions?.[activeDate]?.[mealKey]}
                      setSelectedOption={(option) =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [activeDate]: {
                            ...prev[activeDate],
                            [mealKey]: option,
                          },
                        }))
                      }
                    />
                  ),
                )}
              </div>
            </div>

            <div>
              {/* GUEST */}
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

              <div className="flex flex-wrap gap-4">
                {Object.entries(activePlan?.meals || {}).map(
                  ([mealKey, mealData]) => (
                    <MealCard
                      key={mealKey}
                      title={mealData.type}
                      icon={getMealIcon(mealData.type)}
                      gradient={getMealTypeGradient(mealData.type)}
                      data={mealData}
                      selected={!!guestMeals[activeDate]?.[mealKey]}
                      quantity={guestMeals[activeDate]?.[mealKey] || 1}
                      setQuantity={(qty) => setGuestMealQty(mealKey, qty)}
                      onToggle={() => toggleGuestMeal(mealKey)}
                      selectedOption={
                        guestSelectedOptions?.[activeDate]?.[mealKey]
                      }
                      setSelectedOption={(option) =>
                        setGuestSelectedOptions((prev) => ({
                          ...prev,
                          [activeDate]: {
                            ...prev[activeDate],
                            [mealKey]: option,
                          },
                        }))
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SHOW ALL ================= */}
      {daywiseSelect === "show-all" && (
        <AllMealActivity
          globalMealStatus={globalMealStatus}
          setGlobalMealStatus={setGlobalMealStatus}
          weeklyMealStatus={weeklyMealStatus}
          setWeeklyMealStatus={setWeeklyMealStatus}
        />
      )}

      {daywiseSelect === "day-wise" && (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-2">Date</th>
                {mealKeys.map((meal) => (
                  <th key={meal} className="p-2 capitalize">
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {mealPlans.map((plan) => (
                <tr key={plan.date} className="border-b">
                  <td className="p-2 font-semibold">{plan.date}</td>

                  {mealKeys.map((meal) => {
                    const isUserActive =
                      selectedMeals?.[plan.date]?.includes(meal);

                    const guestQty = guestMeals?.[plan.date]?.[meal];

                    const isActive = isUserActive || guestQty;

                    const userOption = selectedOptions?.[plan.date]?.[meal];

                    const guestOption =
                      guestSelectedOptions?.[plan.date]?.[meal];

                    return (
                      <td key={meal} className="p-2 text-sm">
                        <div className="flex flex-col">
                          <span>
                            {isUserActive
                              ? userOption
                              : plan.meals?.[meal]?.options?.[0]}
                          </span>

                          {guestQty && (
                            <span className="text-blue-600 text-xs">
                              {guestOption} ×{guestQty} (Guest)
                            </span>
                          )}

                          <span
                            className={`text-xs px-2 py-1 mt-1 rounded text-white w-fit ${
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MealActivity;
