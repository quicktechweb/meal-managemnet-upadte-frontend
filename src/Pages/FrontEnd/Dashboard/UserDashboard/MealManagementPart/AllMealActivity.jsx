import React, { useState } from "react";

import { AllMealActivityCard } from "./AllMealActivityCard";
import { GuestCard } from "./GuestCard";

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

export default function AllMealActivity() {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
  });

  const [selectedGuestMeals, setSelectedGuestMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
  });

  const handleGuestSelect = (mealType, option) => {
    setSelectedGuestMeals((prev) => ({
      ...prev,
      [mealType]: option,
    }));
  };
  const handleSelect = (mealType, option) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [mealType]: option,
    }));

    setSelectedOptions((prev) => ({
      ...prev,
      [mealType]: option,
    }));
  };

  const initialSelectedOptions = {
    breakfast:
      schedule2.find((m) => m.mealType === "breakfast")?.items?.[0] || null,
    lunch: schedule2.find((m) => m.mealType === "lunch")?.items?.[0] || null,
    dinner: schedule2.find((m) => m.mealType === "dinner")?.items?.[0] || null,
  };

  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions,
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const weekNames = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });

  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>
      </div>
      {/* Meal Cards */}
      <div className="flex flex-wrap gap-6">
        {["breakfast", "lunch", "dinner"].map((type) => (
          <AllMealActivityCard
            key={type}
            title={type}
            data={schedule2.find((m) => m.mealType === type)}
            selectedMeal={selectedMeals[type]}
            onSelect={(option) => handleSelect(type, option)}
            setSelectedOption={(option) =>
              setSelectedOptions((prev) => ({ ...prev, [type]: option }))
            }
            selectedOption={selectedOptions[type]}
          />
        ))}
      </div>
      {Object.values(selectedMeals).some(Boolean) && (
        <button className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl">
          Update
        </button>
      )}

      {/* for guest meal */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals for guest
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>
      </div>
      {/* Meal Cards */}
      <div className="flex flex-wrap gap-6">
        {["breakfast", "lunch", "dinner"].map((type) => (
          <GuestCard
            key={`guest-${type}`}
            title={type}
            data={schedule2.find((m) => m.mealType === type)}
            selectedMeal={selectedGuestMeals[type]}
            onSelect={(option) => handleGuestSelect(type, option)}
            setSelectedOption={(option) =>
              setSelectedGuestMeals((prev) => ({ ...prev, [type]: option }))
            }
            selectedOption={selectedGuestMeals[type]}
          />
        ))}
      </div>
      {Object.values(selectedGuestMeals).some(Boolean) && (
        <button className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl">
          Update Guest Meals
        </button>
      )}

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Breakfast</th>
              <th className="px-4 py-3">Lunch</th>
              <th className="px-4 py-3">Dinner</th>
            </tr>
          </thead>

          <tbody>
            {weekNames?.map((name) => (
              <tr className="border-b">
                <td className="text-center">{name}</td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col justify-between items-center gap-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs">
                        {selectedOptions?.breakfast?.title}
                      </span>

                      <span
                        className={`px-2 py-1 text-[9px] text-white rounded ${
                          selectedMeals?.breakfast
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {selectedMeals?.breakfast ? "ON" : "OFF"}
                      </span>
                    </div>

                    <span className="text-xs">
                      {" "}
                      {selectedGuestMeals?.breakfast?.title}{" "}
                      {selectedGuestMeals?.breakfast && "x guest"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex justify-between items-center gap-2">
                    {selectedOptions?.lunch?.title}

                    <span
                      className={`px-2 py-1 text-[9px] text-white rounded ${
                        selectedMeals?.lunch ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {selectedMeals?.lunch ? "ON" : "OFF"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex justify-between items-center gap-2">
                    {selectedOptions?.dinner?.title}

                    <span
                      className={`px-2 py-1 text-[9px] text-white rounded ${
                        selectedMeals?.dinner ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {selectedMeals?.dinner ? "ON" : "OFF"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
