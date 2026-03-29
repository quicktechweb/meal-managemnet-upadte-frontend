import React, { useState, useRef } from "react";
import { FaSun, FaUtensils, FaMoon, FaCalendarAlt } from "react-icons/fa";

import MealCard from "./MealCard";
import AllMealActivity from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import {
  useInstituteUserAdminData,
  useInstituteUserCreateMeal,
} from "../api/cms/user.hook";

import { useDispatch, useSelector } from "react-redux";
import {
  setMeal,
  setGuestQty,
  selectTotal,
  selectGuestTotal,
  clearMeals,
  setGuestMeal,
} from "../feature/mealSlice";

import axios from "axios";
import toast from "react-hot-toast";

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
      return "bg-gradient-to-r from-blue-400 to-orange-500";
  }
};

const MealActivity = () => {
  const { user } = useInstituteAuth();

  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const { mutateAsync, isPending } = useInstituteUserCreateMeal();

  const routine = data?.routine;

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
        options: meal.items || [],
      };
    });

    return {
      date: `${dayObj.date} (${dayName})`,
      meals: mealsObj,
    };
  });

  /* ========================= STATES ========================= */
  const [activeIndex, setActiveIndex] = useState(0);
  const [daywiseSelect, setDaywiseSelect] = useState("day-wise");

  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan?.date;

  const dateRef = useRef(null);

  const dispatch = useDispatch();

  const selectedMeals = useSelector((state) => state.meal.selectedMeals);
  const guestMeals = useSelector((state) => state.meal.guestMeals);

  const total = useSelector((state) => selectTotal(state, activeDate));
  const guestTotal = useSelector((state) =>
    selectGuestTotal(state, activeDate),
  );

  const [showUserSubmit, setShowUserSubmit] = useState(false);
  const [showGuestSubmit, setShowGuestSubmit] = useState(false);
  const [selectedMealKeys, setSelectedMealKeys] = useState({});
  const [guestSelectedMealKeys, setGuestSelectedMealKeys] = useState({});
  /* ========================= HANDLERS ========================= */
  const handleMealSelect = (mealKey, items) => {
    dispatch(
      setMeal({
        date: activeDate,
        mealKey,
        items,
      }),
    );
  };
  const handleGuestMealSelect = (mealKey, items) => {
    dispatch(
      setGuestMeal({
        date: activeDate,
        mealKey,
        items,
      }),
    );
  };

  const setGuestMealQty = (mealKey, qty) => {
    dispatch(
      setGuestQty({
        date: activeDate,
        mealKey,
        qty,
      }),
    );
  };

  // toggle user meal
  const toggleUserMeal = (mealKey) => {
    setShowUserSubmit(true);

    setSelectedMealKeys((prev) => {
      const isSelected = prev?.[activeDate]?.[mealKey];

      if (isSelected) {
        dispatch(setMeal({ date: activeDate, mealKey, items: [] }));
      }

      return {
        ...prev,
        [activeDate]: {
          ...prev[activeDate],
          [mealKey]: !isSelected,
        },
      };
    });
  };

  const toggleGuestMeal = (mealKey) => {
    setShowGuestSubmit(true);

    setGuestSelectedMealKeys((prev) => {
      const isSelected = prev?.[activeDate]?.[mealKey];

      if (isSelected) {
        dispatch(setGuestMeal({ date: activeDate, mealKey, items: [] }));
      }

      return {
        ...prev,
        [activeDate]: {
          ...prev[activeDate],
          [mealKey]: !isSelected,
        },
      };
    });
  };

  /* ========================= SUBMIT ========================= */
  const handleSubmitMeals = async () => {
    const meals = selectedMeals[activeDate] || {};

    const payload = Object.entries(meals).map(([mealKey, items]) => ({
      date: activeDate.split(" ")[0],
      day: activeDate.split("(")[1]?.replace(")", ""),
      institute_id: user?.user?.institute_id,
      total_amount: total,
      meal_type: mealKey,
      status: "active",
      user_id: user?.user?._id,
      items: items.map((item) => ({
        item_name: item.label,
        price: item.price,
      })),
    }));

    console.log(payload, "payload");

    await mutateAsync(payload );
  };

  const handleGuestMeals = async () => {};

  return (
    <div className="flex flex-col gap-4">
      {/* TOGGLE */}
      <div className="flex gap-2">
        <button
          onClick={() => setDaywiseSelect("day-wise")}
          className={`px-4 py-2 font-semibold rounded ${
            daywiseSelect === "day-wise"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Day Wise
        </button>
        <button
          onClick={() => setDaywiseSelect("show-all")}
          className={`px-4 py-2 font-semibold rounded ${
            daywiseSelect === "show-all"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>
      </div>

      {daywiseSelect === "day-wise" && (
        <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
          {/* SIDEBAR */}
          <aside className="bg-white p-3 rounded-xl shadow w-[260px]">
            <h2 className="flex items-center justify-center gap-3 font-bold">
              <input type="date" ref={dateRef} className="absolute opacity-0" />
              <button onClick={() => dateRef.current?.showPicker()}>
                <FaCalendarAlt />
              </button>
              Meal Calendar
            </h2>

            {mealPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`block w-full p-2 rounded mb-2 ${
                  activeIndex === index
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {plan.date}
              </button>
            ))}
          </aside>

          {/* new code  */}

          <div className="flex flex-col gap-4">
            {daywiseSelect === "day-wise" && (
              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full">
                  {/* USER */}

                  <div>
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap mb-5">
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
                            ৳{total}
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
                            onChangeSelected={(items) =>
                              handleMealSelect(mealKey, items)
                            }
                            onSelectClick={() => toggleUserMeal(mealKey)}
                            isSelected={
                              selectedMealKeys?.[activeDate]?.[mealKey]
                            }
                          />
                        ),
                      )}
                    </div>

                    {showUserSubmit && (
                      <div className="flex items-center justify-center mt-4 ">
                        <button
                          onClick={handleSubmitMeals}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl cursor-pointer"
                        >
                          Submit Meal
                        </button>
                      </div>
                    )}
                  </div>

                  {/* GUEST */}
                  <div>
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap mb-5">
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
                            ৳{guestTotal}
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
                            quantity={1}
                            setQuantity={(qty) => setGuestMealQty(mealKey, qty)}
                            onChangeSelected={(items) =>
                              handleGuestMealSelect(mealKey, items)
                            }
                            onSelectClick={() => toggleGuestMeal(mealKey)}
                            isSelected={
                              guestSelectedMealKeys?.[activeDate]?.[mealKey]
                            }
                          />
                        ),
                      )}
                    </div>

                    {showGuestSubmit && (
                      <button
                        onClick={handleGuestMeals}
                        className="px-6 py-3 bg-green-600 cursor-pointer text-white rounded-xl"
                      >
                        Submit Meal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {daywiseSelect === "show-all" && <AllMealActivity />}
    </div>
  );
};

export default MealActivity;

{
  /* {daywiseSelect === "day-wise" && (
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
      )} */
}
