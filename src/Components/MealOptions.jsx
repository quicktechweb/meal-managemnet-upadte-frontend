import React, { useState } from "react";
import { calculateTotal } from "../../lib/calculateTotal";
import { IoMdPricetag } from "react-icons/io";

export const MealOptions = ({ meals, date, mealType }) => {
  const totalPrice = calculateTotal(meals);

  const [checkedMeals, setCheckedMeals] = useState({});

  const handleChecked = (date, mealType) => {
    setCheckedMeals((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [mealType]: !prev?.[date]?.[mealType],
      },
    }));
  };

  const isChecked = checkedMeals?.[date]?.[mealType] ?? false;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-end">
        <span className="bg-[#FF6F61] text-white w-[70px] h-[20px] rounded-4xl text-[10px] flex items-center justify-center gap-0.5">
          <IoMdPricetag />
          <p>{totalPrice} BDT</p>
        </span>
      </div>

      <div className="flex gap-2 items-start">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleChecked(date, mealType)}
            className="sr-only peer"
          />

          <div
            className={`w-[30px] h-5 rounded-full transition ${
              isChecked ? "bg-[#FF6F61]" : "bg-gray-300"
            }`}
          ></div>

          <div
            className={`absolute left-[2px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition ${
              isChecked ? "translate-x-[10px]" : ""
            }`}
          ></div>
        </label>

        <div className="flex flex-wrap gap-2">
          {meals.map((meal, index) => (
            <span key={meal.id} className="text-sm font-medium">
              {meal.title}
              {index !== meals.length - 1 && ","}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
