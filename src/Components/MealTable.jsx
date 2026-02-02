import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export const schedule2 = [
  {
    mealTypeid: 1,
    mealType: "breakfast",
    items: [
      {
        meal_id: 1,
        title: "Alu Vorta + Dal",
        price: 125,
      },
      {
        meal_id: 2,
        title: "Egg + Ruti",
        price: 110,
      },
    ],
  },
  {
    mealTypeid: 2,
    mealType: "lunch",
    items: [
      {
        meal_id: 2,
        title: "Murgi + Mangsho + Dal",
        price: 200,
      },
      {
        meal_id: 4,
        title: "Murgi + Mach + Dal",
        price: 500,
      },
    ],
  },
  {
    meal_type_id: 3,
    mealType: "dinner",
    items: [
      {
        meal_id: 5,
        title: "Murgi + Mach + Dal",
        price: 900,
      },
      {
        meal_id: 6,
        title: "Murgi + Mach + Dal",
        price: 600,
      },
    ],
  },
];

const MealScheduleTable = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const breakfastMeal = schedule2?.find(
    (item) => item?.mealType === "breakfast",
  );

  const lunchMeal = schedule2?.find((item) => item?.mealType === "lunch");
  const dinnerMeal = schedule2?.find((item) => item?.mealType === "dinner");

  console.log(breakfastMeal);

  const [selectedMeals, setSelectedMeals] = useState(() =>
    days.reduce((acc, day) => {
      acc[day] = { breakfast: null, lunch: null, dinner: null };
      return acc;
    }, {}),
  );

  // Handle select
  const handleSelect = (day, mealType, mealId) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: mealId,
      },
    }));
  };

  // Render meal buttons
  const renderMealColumn = (day, mealType, mealData) => (
    <td className="px-3 py-2 align-top">
      {mealData?.items?.map((item) => (
        <button
          key={item.meal_id}
          onClick={() => handleSelect(day, mealType, item.meal_id)}
          className="w-full flex items-center gap-2 py-2 text-left hover:bg-gray-50"
        >
          {selectedMeals[day][mealType] === item.meal_id && (
            <FaCheckCircle className="text-green-600 text-sm" />
          )}
          <span className="text-xs">{item.title}</span>
        </button>
      ))}
    </td>
  );

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-white">
                Days
              </th>
              <th className="px-4 py-3 text-left font-semibold text-white">
                Breakfast
              </th>
              <th className="px-4 py-3 text-left font-semibold text-white">
                Lunch
              </th>
              <th className="px-4 py-3 text-left font-semibold text-white">
                Dinner
              </th>
            </tr>
          </thead>

          <tbody>
            {days.map((day) => (
              <tr key={day} className="border-b border-gray-300">
                <td className="text-center font-medium">{day}</td>

                {renderMealColumn(day, "breakfast", breakfastMeal)}
                {renderMealColumn(day, "lunch", lunchMeal)}
                {renderMealColumn(day, "dinner", dinnerMeal)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {days.map((day) => (
          <div
            key={day}
            className="bg-white rounded-xl shadow border border-gray-200 p-4"
          >
            {/* Day Header */}
            <h3 className="text-lg font-semibold mb-3 text-orange-600">
              {day}
            </h3>

            {/* Meal Sections */}
            {[
              { label: "Breakfast", type: "breakfast", data: breakfastMeal },
              { label: "Lunch", type: "lunch", data: lunchMeal },
              { label: "Dinner", type: "dinner", data: dinnerMeal },
            ].map(({ label, type, data }) => (
              <div key={type} className="mb-4">
                <p className="text-sm font-medium mb-2">{label}</p>

                <div className="space-y-2">
                  {data?.items?.map((item) => {
                    const isSelected =
                      selectedMeals[day][type] === item.meal_id;

                    return (
                      <button
                        key={item.meal_id}
                        onClick={() => handleSelect(day, type, item.meal_id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left
                    ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                      >
                        <span className="text-sm">{item.title}</span>

                        {isSelected && (
                          <FaCheckCircle className="text-green-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MealScheduleTable;
