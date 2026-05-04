import React, { useEffect, useMemo, useState } from "react";
import {
  useGetInventoryGlobalAmount,
  useGlobalDayWise,
  useInventoryGlobalAmount,
} from "../../api/cms/user.hook";
import InventoryDayWiseTableList from "./InventoryDayWiseTableList";
import InventoryDayWIseSummary from "./InventoryDayWIseSummary";
import InventoryIngredients from "./InventoryIngredients";

const InventoryDayWise = () => {
  const dayNames = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [measures, setMeasures] = useState({});
  const [globalAmount, setGlobalAmount] = useState("");

  const { data: getInventoryGlobalAmount } = useGetInventoryGlobalAmount();
  const [inputAmount, setInputAmount] = useState("");

  const { data } = useGlobalDayWise();

  const { mutateAsync, isPending } = useInventoryGlobalAmount();
  // Global amount set
  const getEffectiveAmount = (key) => {
    if (measures[key] !== undefined && measures[key] !== "") {
      return parseFloat(measures[key]) || 0;
    }
    return parseFloat(globalAmount) || 0;
  };
  const instituteData = useMemo(() => {
    if (!data || !selectedDay || !selectedMealType) return [];

    return data
      .map((user) => {
        const filteredMeals =
          user?.meals?.filter(
            (meal) =>
              meal.day === selectedDay && meal.meal_type === selectedMealType,
          ) ?? [];

        const countMap = {};
        filteredMeals.forEach((meal) => {
          meal.selected_items.forEach((item) => {
            const titles = item.title.split(",").map((t) => t.trim());
            titles.forEach((title) => {
              countMap[title] = (countMap[title] || 0) + 1;
            });
          });
        });

        const items = Object.entries(countMap).map(([title, count]) => ({
          title,
          count,
        }));

        return {
          instituteId: user?.institute_id?._id,
          instituteName:
            user?.institute_id?.information?.name_of_institute ?? "Unknown",
          items,
        };
      })
      .filter((inst) => inst.items.length > 0);
  }, [data, selectedDay, selectedMealType]);

  const summary = useMemo(() => {
    if (instituteData?.length === 0) return [];

    const summaryMap = {};

    instituteData.forEach((institute) => {
      institute.items.forEach((item) => {
        const key = `${institute.instituteId}_${item.title}`;
        const effectiveAmount = getEffectiveAmount(key);
        const totalKg = (item.count * effectiveAmount) / 1000;

        if (!summaryMap[item.title]) {
          summaryMap[item.title] = { totalCount: 0, totalKg: 0 };
        }
        summaryMap[item.title].totalCount += item.count;
        summaryMap[item.title].totalKg += totalKg;
      });
    });

    return Object.entries(summaryMap).map(([title, values]) => ({
      title,
      ...values,
    }));
  }, [instituteData, measures, globalAmount]);

  const mealTypes = useMemo(() => {
    if (!data || !selectedDay) return [];
    const types = data.flatMap(
      (user) =>
        user?.meals
          ?.filter((meal) => meal.day === selectedDay)
          .map((meal) => meal.meal_type) ?? [],
    );
    return [...new Set(types)];
  }, [data, selectedDay]);

  const handleSaveGlobalAmount = async () => {
    if (!inputAmount) return;
    await mutateAsync({ global_amount: parseFloat(inputAmount) });
    setGlobalAmount(inputAmount);
  };

  useEffect(() => {
    if (getInventoryGlobalAmount?.global_amount !== undefined) {
      setGlobalAmount(String(getInventoryGlobalAmount.global_amount));
      setInputAmount(String(getInventoryGlobalAmount.global_amount));
    }
  }, [getInventoryGlobalAmount]);

  // ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Day Wise Inventory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Per institute meal item count
            </p>
          </div>
          {/* <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Global Amount
            </label>
            <input
              type="number"
              min="0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0"
              className="w-32 text-center text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {globalAmount && (
              <span className="text-xs text-blue-500 text-center">
                Applied to all items
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveGlobalAmount}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {isPending ? "Saving..." : "Save"}
            </button>
          </div> */}
        </div>

        {/* Day Selector */}
        <div className="flex flex-col gap-1.5 mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Select Day</h4>
          <div className="flex flex-wrap gap-2">
            {dayNames.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedMealType(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedDay === day
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Selector */}
        {mealTypes?.length > 0 && (
          <div className="flex flex-col gap-1.5 mb-6">
            <h4 className="text-lg font-semibold text-gray-800">
              Select Meal Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {mealTypes?.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedMealType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedMealType === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 cursor-pointer"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overall Summary */}
        <InventoryDayWIseSummary
          instituteData={instituteData}
          measures={measures}
          globalAmount={globalAmount}
          getEffectiveAmount={getEffectiveAmount}
          summary={summary}
          selectedDay={selectedDay}
          selectedMealType={selectedMealType}
        />

        {/* Per institute table */}
        <InventoryDayWiseTableList
          getEffectiveAmount={getEffectiveAmount}
          instituteData={instituteData}
          measures={measures}
          globalAmount={globalAmount}
          setMeasures={setMeasures}
          selectedDay={selectedDay}
          selectedMealType={selectedMealType}
        />

        {/* day wise and meal type */}

        {selectedDay && selectedMealType && (
          <InventoryIngredients
            selectedDay={selectedDay}
            selectedMealType={selectedMealType}
            summary={summary}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryDayWise;
