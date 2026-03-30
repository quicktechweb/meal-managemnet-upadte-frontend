import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

const gradientMap = {
  breakfast: "bg-gradient-to-r from-yellow-400 to-orange-500",
  lunch: "bg-gradient-to-r from-green-500 to-emerald-600",
  dinner: "bg-gradient-to-r from-indigo-500 to-purple-600",
};

export const GuestCard = ({ title, data, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const hasSelection = selectedValues.length > 0;

  const itemOptions =
    data?.items?.map((item) => ({
      value: item,
      label: item?.title,
      price: +item?.price,
      image: item?.image,
      ingridents: item?.ingridents,
      video: item?.video,
    })) || [];

  const notify = (overrides = {}) => {
    onChange?.({
      mealType: data?.mealType,
      isOn,
      quantity,
      items: selectedValues.map((v) => v.value),
      ...overrides,
    });
  };

  const handleChange = (selected) => {
    setSelectedValues(selected || []);
    if (!selected || selected.length === 0) {
      setIsOn(false);
      setQuantity(1);
      notify({ isOn: false, quantity: 1, items: [] });
    } else {
      notify({ items: selected.map((v) => v.value) });
    }
  };

  const handleToggle = () => {
    if (!hasSelection) return;
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    notify({ isOn: newIsOn });
  };

  const handleQuantityChange = (val) => {
    const newQty = Math.max(1, val);
    setQuantity(newQty);
    notify({ quantity: newQty });
  };

  const gradient =
    gradientMap[data?.mealType] || "bg-gradient-to-r from-gray-400 to-gray-600";

  const CustomOption = (props) => {
    const { data: optData } = props;
    return (
      <div
        {...props.innerProps}
        className="flex items-center justify-between gap-3 p-2 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          {optData.image && (
            <img
              src={optData.image}
              alt={optData.label}
              className="w-10 h-10 rounded object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold">{optData.label}</span>
            <span className="text-xs text-orange-600">৳{optData.price}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(optData);
          }}
          className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
        >
          Details
        </button>
      </div>
    );
  };

  const CustomMultiValueLabel = (props) => {
    const { data: optData } = props;
    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center gap-1">
          <span>{optData.label}</span>
          <span className="text-orange-600 text-xs">(৳{optData.price})</span>
        </div>
      </components.MultiValueLabel>
    );
  };

  return (
    <div className="bg-white/90 rounded-2xl p-3 shadow-lg hover:shadow-2xl  w-full md:w-[350px] lg:w-[320px] xl:w-[300px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-2 px-3 py-3 rounded-xl text-white capitalize ${gradient}`}
      >
        <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
          {hasSelection
            ? `৳${selectedValues.reduce((sum, v) => sum + v.price, 0) * quantity}`
            : "৳0"}
        </span>
      </div>

      {/* SELECT */}
      <div className="mt-3">
        <Select
          isMulti
          options={itemOptions}
          value={selectedValues}
          getOptionValue={(opt) => opt.label}
          onChange={handleChange}
          placeholder={`Select ${title} for guest...`}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        />
      </div>

      {/* QUANTITY */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          disabled={!hasSelection}
          onClick={() => handleQuantityChange(quantity - 1)}
          className={`px-3 py-1 rounded-lg font-bold text-lg transition
            ${
              !hasSelection
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-orange-200 hover:bg-orange-300"
            }`}
        >
          -
        </button>
        <span
          className={`text-sm font-semibold ${!hasSelection ? "text-gray-300" : ""}`}
        >
          {quantity}
        </span>
        <button
          disabled={!hasSelection}
          onClick={() => handleQuantityChange(quantity + 1)}
          className={`px-3 py-1 rounded-lg font-bold text-lg transition
            ${
              !hasSelection
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-orange-200 hover:bg-orange-300"
            }`}
        >
          +
        </button>
      </div>

      {/* TOGGLE */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-xs text-gray-500">OFF</span>
        <label
          className={`switch !text-[10px]  ${!hasSelection ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
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
