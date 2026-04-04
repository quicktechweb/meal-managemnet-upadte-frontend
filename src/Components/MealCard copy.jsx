import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const MealCard = ({
  title,
  icon,
  data,
  gradient = "bg-gradient-to-r from-orange-400 to-pink-500",
  selected,
  onToggle,
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
}) => {
  const [localOption, setLocalOption] = useState("");

  /* =========================
     DEFAULT OPTION SYNC
  ========================= */
  useEffect(() => {
    if (!selectedOption && data?.options?.length > 0) {
      setSelectedOption(data.options[0]);
      setLocalOption(data.options[0]);
    } else {
      setLocalOption(selectedOption);
    }
  }, [selectedOption, data]);

  /* =========================
     HANDLE SELECT CHANGE
  ========================= */
  const handleChange = (value) => {
    setLocalOption(value);
    setSelectedOption(value);

    // auto select meal if not selected
    if (!selected) {
      onToggle();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[300px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
      >
        <div>{icon}</div>
        <h3 className="font-semibold">{title}</h3>

        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
          ৳{data?.price || 0}
        </span>
      </div>

      {/* OPTIONS */}
      <div className="mt-4 space-y-3">
        {/* MAIN OPTION */}
        {data?.options?.length > 0 && (
          <button
            type="button"
            onClick={() => handleChange(data.options[0])}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            {localOption === data.options[0] && (
              <FaCheckCircle className="text-green-600" />
            )}
            <span>{data.options[0]}</span>
          </button>
        )}

        {/* OTHER OPTIONS */}
        {data?.options?.length > 1 && (
          <select
            value={data.options.includes(localOption) ? localOption : ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-2"
          >
            <option value="">Select {title}</option>
            {data.options.slice(1).map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/* QUANTITY (for guest) */}
        {quantity !== undefined && (
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-orange-200 rounded"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-orange-200 rounded"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={onToggle}
        className={`mt-4 w-full py-2 rounded-xl font-semibold transition ${
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
