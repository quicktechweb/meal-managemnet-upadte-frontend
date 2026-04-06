import React, { useState } from "react";
import MealScheduleTable from "../MealTable";
import { ChevronDown } from "lucide-react";
import PackageSchedule from "./PackageSchedule";

const mealRoutineOption = [
  {
    id: 1,
    title: "Routine",
  },
  {
    id: 2,
    title: "Package",
  },
];

const StepThree = ({
  prevStep,
  form,
  nextStep,
  totalPrice,
  mealTypeLists,
  setMealTypeLists,
  scheduleList,
  setScheduleList,
  isPending,
  selectedRoutineOption,
  setSelectedRoutineOption,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setMealTypeLists([]);
    setScheduleList([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-center items-center gap-2">
        <label className="text-sm font-semibold text-slate-700">
          Select Meal Routine Options
        </label>

        <div className="relative w-[250px]">
          <div
            className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
            onClick={() => toggleDropdown("option")}
          >
            <span>
              {selectedRoutineOption
                ? selectedRoutineOption?.title
                : "Select the option"}
            </span>

            <ChevronDown
              className={`transition-transform ${
                activeDropdown === "option" ? "rotate-180" : ""
              }`}
              size={18}
            />
          </div>

          {activeDropdown === "option" && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50">
              {mealRoutineOption.map((opt) => (
                <div
                  key={opt.id}
                  className={`px-4 py-2 cursor-pointer rounded-xl ${
                    selectedRoutineOption?.id === opt.id
                      ? "bg-orange-500 text-white"
                      : "hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    setSelectedRoutineOption(opt);
                    setActiveDropdown(null);
                  }}
                >
                  {opt.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedRoutineOption?.title === "Routine" && (
        <MealScheduleTable
          mealTypeLists={mealTypeLists}
          setMealTypeLists={setMealTypeLists}
          scheduleList={scheduleList}
          setScheduleList={setScheduleList}
          totalPrice={totalPrice}
        />
      )}

      {selectedRoutineOption?.title === "Package" && <PackageSchedule />}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={prevStep}
          className="w-full border cursor-pointer py-1.5 lg:py-3 rounded-lg"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="w-full bg-black cursor-pointer text-white py-1.5 lg:py-3 rounded-lg"
        >
          {isPending ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
