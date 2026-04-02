import React, { useState, useRef } from "react";
import { FaSun, FaUtensils, FaMoon, FaCalendarAlt } from "react-icons/fa";

import AllMealActivity from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import {
  useInstituteUserAdminData,
  useInstituteUserCreateMeal,
} from "../api/cms/user.hook";

import toast from "react-hot-toast";
import DayWiseMealActivity from "./DayWiseMealActivity";

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

  const routine = data?.routine;

  const [daywiseSelect, setDaywiseSelect] = useState("show-all");

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

      {daywiseSelect === "day-wise" && (
        <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
          <div className="flex flex-col gap-4">
            {daywiseSelect === "day-wise" && <DayWiseMealActivity />}
          </div>
        </div>
      )}

      {daywiseSelect === "show-all" && (
        <AllMealActivity allWise={daywiseSelect} />
      )}
    </div>
  );
};

export default MealActivity;
