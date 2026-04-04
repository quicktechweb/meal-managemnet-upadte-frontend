import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Select from "react-select";
import { components } from "react-select";

const gradientMap = {
  breakfast: "bg-gradient-to-r from-yellow-400 to-orange-500",
  lunch: "bg-gradient-to-r from-green-500 to-emerald-600",
  dinner: "bg-gradient-to-r from-indigo-500 to-purple-600",
};

export const AllMealActivityCard = ({
  title,
  data,
  onChange,
  institute_id,
  user_id,
  allWise,
}) => {
  console.log(data?.items);

  const [selectedValues, setSelectedValues] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const hasSelection = selectedValues.length > 0;

  const handleChange = (selected) => {
    setSelectedValues(selected || []);
    if (!selected || selected.length === 0) {
      setIsOn(false);
      onChange?.({
        mealType: data?.mealType,
        start_time: data?.start_time,
        institute_id: institute_id,
        end_time: data?.end_time,
        type: allWise,
        user_id: user_id,
        meal_status: false,
        items: [],
      });
    } else {
      onChange?.({
        mealType: data?.mealType,
        institute_id: institute_id,
        start_time: data?.start_time,
        end_time: data?.end_time,
        type: allWise,
        user_id: user_id,
        meal_status,
        items: selected.map((v) => v.value),
      });
    }
  };

  const handleToggle = () => {
    if (!hasSelection) return;
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    onChange?.({
      mealType: data?.mealType,
      institute_id: institute_id,
      start_time: data?.start_time,
      end_time: data?.end_time,
      user_id: user_id,
      type: allWise,
      meal_status: newIsOn,
      items: selectedValues.map((v) => v.value),
    });
  };

  const gradient =
    gradientMap[data?.mealType] || "bg-gradient-to-r from-gray-400 to-gray-600";

  const [open, setOpen] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedGroupIndex(index);
    setOpen(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[330px]">
      {/* HEADER */}
      <div
        className={`  px-3 py-3 rounded-xl text-white capitalize ${gradient}`}
      >
        <div className="flex items-center gap-2 ">
          <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
          <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
            {hasSelection
              ? `৳${selectedValues.reduce((sum, v) => sum + v.price, 0)}`
              : "৳0"}
          </span>
        </div>
        <div className="flex font-semibold justify-center">
          <p>{data?.start_time}</p>-<p>{data?.end_time}</p>
        </div>
      </div>

      {/* SELECT */}
      <div className="">
        <button className="px-2 w-full flex cursor-pointer items-center gap-2.5 bg-gray-100 my-2 rounded-2xl">
          <FaCheckCircle className="text-green-600 text-sm" />
          {data?.items?.map((item, index) => (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-xs">{item.title}</span>
              <span className="text-[10px] text-orange-600">
                (৳{item.price})
              </span>{" "}
              {data?.items?.length - 1 !== index && ","}
            </div>
          ))}
        </button>

        <div className="relative">
          {/* Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="bg-white py-1 px-2 shadow-md w-full my-2 rounded-md flex items-center justify-between border border-gray-200"
          >
            <span className="text-sm">
              {selectedGroupIndex !== null
                ? data?.alternative_items?.[selectedGroupIndex]
                    ?.map((item) => `${item.title} (৳${item.price})`)
                    .join(", ")
                : "Select Alternative Item"}
            </span>

            <ChevronDown
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute w-full z-50 rounded-md p-2 bg-white border border-gray-200 shadow-md">
              {data?.alternative_items?.map((alternative_item, i) => {
                const isSelected = selectedGroupIndex === i;

                return (
                  <div
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`flex flex-wrap gap-2 py-2 px-2 rounded cursor-pointer
                  ${
                    isSelected
                      ? "bg-blue-100 border border-blue-400"
                      : "hover:bg-gray-100"
                  }
                `}
                  >
                    {alternative_item?.map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <span className="font-semibold text-xs">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-orange-600">
                          (৳{item.price})
                        </span>
                        {alternative_item.length - 1 !== index && ","}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <Select
          isMulti
          options={itemOptions}
          value={selectedValues}
          getOptionValue={(opt) => opt.label}
          onChange={handleChange}
          placeholder={`Select ${title}...`}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        /> */}
      </div>

      {/* TOGGLE */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-xs text-gray-500">OFF</span>
        <label
          className={`switch !text-[10px] ${!hasSelection ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input
            type="checkbox"
            checked={isOn}
            onChange={handleToggle}
            disabled={!hasSelection}
          />
          <span className="slider"></span>
        </label>
        <span className="text-xs text-gray-500">ON</span>
      </div>

      {!hasSelection && (
        <p className="text-center text-[11px] text-red-400 mt-1">
          আগে meal select করো
        </p>
      )}

      {/* DETAILS POPUP */}
      {selectedItem && (
        <div className="mt-3 p-2 bg-orange-50 rounded-xl text-sm">
          <p className="font-semibold">{selectedItem.label}</p>
          <p className="text-orange-600">৳{selectedItem.price}</p>
          {selectedItem.ingridents && (
            <p className="text-gray-500 text-xs mt-1">
              {selectedItem.ingridents}
            </p>
          )}
          <button
            onClick={() => setSelectedItem(null)}
            className="text-xs text-red-400 mt-1"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
