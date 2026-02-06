import { useState, useEffect } from "react";
import { FaSun, FaUtensils, FaMoon, FaCheckCircle } from "react-icons/fa";

export const GuestCard = ({
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
  const defaultOption = data?.items?.[0];
  const otherOptions = data?.items?.slice(1);

  const [checkedSource, setCheckedSource] = useState("default"); 
  const [selectOtherOption, setSelectOtherOption] = useState("");

  
  useEffect(() => {
    if (!selectedOption) {
      setSelectedOption(defaultOption);
      setCheckedSource("default");
    }
  }, [defaultOption, selectedOption, setSelectedOption]);

  const handleDefaultClick = () => {
    setSelectedOption(defaultOption);
    setCheckedSource("default");
  };

  const handleDropdownChange = (meal_id) => {
    setSelectOtherOption(meal_id);
    const option = data?.items?.find((item) => item.meal_id === meal_id);
    if (!option) return;

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
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition hover:shadow-2xl transform hover:-translate-y-1 w-full md:w-[350px] lg:w-[320px] xl:w-[300px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-3 rounded-xl text-white
          ${data?.mealType === "dinner" && "bg-gradient-to-r from-indigo-500 to-purple-600"}
          ${data?.mealType === "lunch" && "bg-gradient-to-r from-green-500 to-emerald-600"}
          ${data?.mealType === "breakfast" && "bg-gradient-to-r from-yellow-400 to-orange-500"}
        `}
      >
        <div className="text-sm lg:text-xl">{icon}</div>
        <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
        <span className="ml-auto bg-white/20 px-1 lg:px-2 py-1 rounded-full font-bold text-xs lg:text-sm">
          ৳{selectedOption?.price}
        </span>
      </div>

      {/* OPTIONS */}
      <div className="mt-2 space-y-2">
        {/* DEFAULT ITEM */}
        <button
          type="button"
          onClick={handleDefaultClick}
          className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition"
        >
          <span className="w-4">
            {checkedSource === "default" && (
              <FaCheckCircle className="text-green-600 text-sm" />
            )}
          </span>
          <span className="flex-1">{defaultOption?.title}</span>
        </button>

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
              className="px-2 py-1 bg-orange-200 rounded-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              className="px-2 py-1 bg-orange-200 rounded-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        )}

        {/* MAIN TOGGLE */}
        <div className="flex items-center justify-center w-full mt-3">
          <label className="switch !text-xs">
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
        className={`mt-5 w-full py-2 cursor-pointer text-sm lg:text-base rounded-xl font-semibold transition ${
          selectedMeal
            ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
            : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
        }`}
      >
        {selectedMeal ? "Selected" : "Select Meal"}
      </button>
    </div>
  );
};
