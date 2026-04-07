import React, { useState } from "react";

import AllMealActivity from "./AllMealActivity";
import DayWisePackageMealActivity from "../../../../../Components/DayWisePackageMealActivity";

const PackageMealActivity = () => {
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
            {daywiseSelect === "day-wise" && <DayWisePackageMealActivity />}
          </div>
        </div>
      )}

      {daywiseSelect === "show-all" && (
        <AllMealActivity allWise={daywiseSelect} />
      )}
    </div>
  );
};

export default PackageMealActivity;
