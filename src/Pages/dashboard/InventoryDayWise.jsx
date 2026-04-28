import React, { useMemo, useState } from "react";
import { useGlobalDayWise } from "../../api/cms/user.hook";

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

  const { data } = useGlobalDayWise();

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

  // Global amount set হলে সব items এ apply হবে, individual override থাকলে সেটা নেবে
  const getEffectiveAmount = (key) => {
    if (measures[key] !== undefined && measures[key] !== "") {
      return parseFloat(measures[key]) || 0;
    }
    return parseFloat(globalAmount) || 0;
  };

  const handleMeasureChange = (key, value) => {
    setMeasures((prev) => ({ ...prev, [key]: value }));
  };

  const handleGlobalAmountChange = (value) => {
    setGlobalAmount(value);
  };

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
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Global Amount
            </label>
            <input
              type="number"
              min="0"
              value={globalAmount}
              onChange={(e) => handleGlobalAmountChange(e.target.value)}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
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
              Save
            </button>
          </div>
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

        {/* Per Institute Tables */}
        {instituteData.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-sm">
            No data available. Please select a day and meal type.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {instituteData.map((institute) => (
              <div
                key={institute.instituteId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                  <h2 className="text-base font-bold ">
                    Institute Name -{" "}
                    <span className="text-blue-800">
                      {institute.instituteName}
                    </span>
                  </h2>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        #
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Item Name
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Quantity
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Amount (per gram)
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Total Amount (kg)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {institute.items.map((item, index) => {
                      const key = `${institute.instituteId}_${item.title}`;
                      const effectiveAmount = getEffectiveAmount(key);
                      const total = (item.count * effectiveAmount) / 1000;
                      const isOverridden =
                        measures[key] !== undefined && measures[key] !== "";

                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                              <span className="text-sm font-medium text-gray-800">
                                {item.title}
                              </span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                              {item.count}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                value={measures[key] ?? ""}
                                onChange={(e) =>
                                  handleMeasureChange(key, e.target.value)
                                }
                                placeholder={globalAmount || "0"}
                                className={`w-24 text-center text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                  isOverridden
                                    ? "border-emerald-400 bg-emerald-50"
                                    : "border-gray-200"
                                }`}
                              />

                              {isOverridden && (
                                <button
                                  onClick={() =>
                                    setMeasures((prev) => {
                                      const updated = { ...prev };
                                      delete updated[key];
                                      return updated;
                                    })
                                  }
                                  className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                                >
                                  reset
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`text-sm font-semibold ${
                                total > 0 ? "text-emerald-600" : "text-gray-300"
                              }`}
                            >
                              {total > 0 ? total.toFixed(2) : "-"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryDayWise;
