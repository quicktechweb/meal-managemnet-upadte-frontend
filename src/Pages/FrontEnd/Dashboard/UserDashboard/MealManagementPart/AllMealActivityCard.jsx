import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

import Select from "react-select";
import { components } from "react-select";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const handleChange = (selected) => {};

  console.log(data);

  const itemOptions = data?.options?.map((item) => ({
    value: item,
    label: item?.title,
    price: +item?.price,
    image: item?.image,
    ingridents: item?.ingridents,
    video: item?.video,
  }));

  console.log(itemOptions);

  const CustomOption = (props) => {
    const { data } = props;

    return (
      <div
        {...props.innerProps}
        className="flex items-center justify-between gap-3 p-2 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={data.label}
            className="w-10 h-10 rounded object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold">{data.label}</span>
            <span className="text-xs text-orange-600">৳{data.price}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(data);
          }}
          className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
        >
          Details
        </button>
      </div>
    );
  };

  const CustomMultiValueLabel = (props) => {
    const { data } = props;

    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center gap-1">
          <span>{data.label}</span>
          <span className="text-orange-600 text-xs">(৳{data.price})</span>
        </div>
      </components.MultiValueLabel>
    );
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
        <Select
          isMulti
          options={itemOptions}
          value={""}
          getOptionValue={(opt) => opt.label}
          onChange={handleChange}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        />

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
