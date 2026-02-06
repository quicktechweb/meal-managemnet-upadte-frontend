import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export const AllMealActivityCard = ({
  title,
  icon,
  data,
  selectedMeal,
  onSelect,
  quantity,
  setQuantity,
  setSelectedOption,
  selectedOption,
}) => {
  const defaultOption = data?.items?.[0]; // first item
  const otherOptions = data?.items?.slice(1); // rest

  const [checkedSource, setCheckedSource] = useState("default"); // "default" or "other"
  const [selectOtherOption, setSelectOtherOption] = useState(""); // meal_id of dropdown

  // Initialize selection on load
  useEffect(() => {
    if (!selectedOption) {
      setSelectedOption(defaultOption);
      setCheckedSource("default");
    }
  }, [defaultOption, selectedOption, setSelectedOption]);

  // Upper default click
  const handleDefaultClick = () => {
    setSelectedOption(defaultOption);
    setCheckedSource("default");
    // checkbox unchecked but dropdown value remains
  };

  // Dropdown change
  const handleDropdownChange = (meal_id) => {
    setSelectOtherOption(meal_id);
    const option = data?.items?.find((item) => item.meal_id === meal_id);
    if (!option) return;
    // only move tick if checkbox is already checked
    if (checkedSource === "other") {
      setSelectedOption(option);
    }
  };

 
  const handleCheckboxChange = (checked) => {
    if (checked) {
      setCheckedSource("other");
     
      if (selectOtherOption) {
        const option = data?.items?.find(
          (item) => item.meal_id === selectOtherOption,
        );
        if (option) setSelectedOption(option);
      }
    } else {
      setCheckedSource("default");
      setSelectedOption(defaultOption);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[300px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-2 px-3 py-3 rounded-xl text-white
          ${
            data?.mealType === "dinner"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600"
              : data?.mealType === "lunch"
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-yellow-400 to-orange-500"
          }
        `}
      >
        <div>{icon}</div>
        <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
          ৳{selectedOption?.price}
        </span>
      </div>

      {/* OPTIONS */}
      <div className="mt-3 space-y-2">
        {/* DEFAULT OPTION */}
        <button
          type="button"
          onClick={handleDefaultClick}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left"
        >
          <span className="w-4">
            {checkedSource === "default" && (
              <FaCheckCircle className="text-green-600 text-sm" />
            )}
          </span>
          <span className="flex-1">{defaultOption?.title}</span>
        </button>

        {/* OTHER OPTIONS */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedSource === "other"}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          />

          <select
            value={selectOtherOption}
            onChange={(e) => handleDropdownChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm"
          >
            <option value="">Select {title}</option>
            {otherOptions.map((option) => (
              <option key={option.meal_id} value={option.meal_id}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        {quantity !== undefined && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-orange-200 rounded-lg"
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-orange-200 rounded-lg"
            >
              +
            </button>
          </div>
        )}

        {/* MAIN TOGGLE */}
        <div className="flex justify-center mt-3">
          <label className="switch">
            <input
              type="checkbox"
              checked={!!selectedMeal}
              onChange={() => onSelect(selectedMeal ? null : selectedOption)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={() => onSelect(selectedOption)}
        className={`mt-5 w-full py-2 rounded-xl font-semibold text-sm
          ${
            selectedMeal
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
          }
        `}
      >
        {selectedMeal ? "Selected" : "Select Meal"}
      </button>
    </div>
  );
};
