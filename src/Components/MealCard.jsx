import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const MealCard = ({
  title,
  icon,
  data,
  gradient,
  selected,
  onToggle,
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
}) => {
  const [checkedSource, setCheckedSource] = useState("default");

  const [selectOtherOption, setSelectOtherOption] = useState("");

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[300px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
      >
        <div>{icon}</div>
        <h3 className="font-semibold">{title}</h3>
        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
          ৳{data.price}
        </span>
      </div>

      {/* OPTIONS */}
      <div className="mt-4 space-y-3">
        {data.options?.slice(0, 1).map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setSelectedOption(option);
              setCheckedSource("default");
            }}
            className="w-full flex items-center gap-2 px-3 py-2  rounded-lg"
          >
            {checkedSource === "default" && (
              <FaCheckCircle className="text-green-600" />
            )}
            <span>{option}</span>
          </button>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedSource === "other"}
            onChange={(e) => {
              if (e.target.checked) {
                setCheckedSource("other");
              } else {
                setCheckedSource("default");
              }
            }}
          />

          <select
            value={selectOtherOption}
            onChange={(e) => {
              setSelectOtherOption(e.target.value);
              setSelectedOption(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg px-2 py-2"
          >
            <option value="">Select {title}</option>
            {data.options?.slice(1).map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        {quantity !== undefined && (
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 bg-orange-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 bg-orange-200 rounded"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={onToggle}
        className={`mt-4 w-full py-2 rounded-xl font-semibold
          ${
            selected
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
          }`}
      >
        {selected ? "Selected" : "Select Meal"}
      </button>
    </div>
  );
};

export default MealCard;
