import React, { useState } from "react";

import AllMealActivity from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";

import DayWiseMealActivity from "./DayWiseMealActivity";
import { useLayoutSwitch } from "../providers/LayoutSwitchProvider";

const MealActivity = () => {
  const { daywiseSelect, setDaywiseSelect } = useLayoutSwitch();

  return (
    <div id="meal-activity" className="flex flex-col gap-4">
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
        <DayWiseMealActivity allWise={daywiseSelect} />
      )}

      {daywiseSelect === "show-all" && (
        <AllMealActivity allWise={daywiseSelect} />
      )}
    </div>
  );
};

export default MealActivity;
