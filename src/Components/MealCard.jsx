import React, { useState } from "react";

import Select from "react-select";
import { components } from "react-select";

const MealCard = ({
  title,
  icon,
  data,
  gradient = "bg-gradient-to-r from-orange-400 to-pink-500",
  quantity,
  setQuantity,
  onChangeSelected,
  onSelectClick,
  isSelected,
  selectedValues = [],
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  /* ================= OPTIONS ================= */
  const itemOptions = data?.options?.map((item) => ({
    value: item,
    label: item?.title,
    price: +item?.price,
    image: item?.image,
    ingridents: item?.ingridents,
    video: item?.video,
  }));

  const selectedOptions = selectedValues?.items?.map((item) => ({
    value: item.value,
    label: item.label,
    price: item.price,
    image: item.image,
    ingridents: item.ingridents,
    video: item.video,
  }));
  /* ================= SELECT HANDLER ================= */
  const handleChange = (selected) => {
    // setSelectedOptions(selected);
    onChangeSelected && onChangeSelected(selected);
  };

  /* ================= CUSTOM OPTION ================= */
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

  /* ================= SELECT LABEL ================= */
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
    <div className="bg-white rounded-2xl p-4 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[320px]">
      {/* HEADER */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}
      >
        <div>{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>

      {/* BODY */}
      <div className="mt-4 space-y-3">
        {/* MENU LIST */}
        {data?.options?.length > 0 && (
          <span className="w-full flex items-center gap-2 px-3 py-2 flex-wrap">
            {data?.options?.map((option, i) => (
              <span key={i}>
                {option.title}- ৳{option.price}
              </span>
            ))}
          </span>
        )}

        {/* SELECT */}
        <Select
          isMulti
          options={itemOptions}
          value={selectedOptions}
          getOptionValue={(opt) => opt.label}
          onChange={handleChange}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        />

        {/* QUANTITY (Guest) */}
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
        onClick={() => {
          if (!selectedOptions.length) {
            alert("Please select at least one item first!");
            return;
          }
          onSelectClick && onSelectClick();
        }}
        className={`mt-4 w-full py-2 rounded-xl font-semibold ${
          isSelected
            ? "bg-green-600 text-white"
            : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
        }`}
      >
        {isSelected ? "Selected " : "Select Meal"}
      </button>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[800px] h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
            >
              ✕
            </button>

            {/* Image */}
            <div className="h-56">
              <img
                src={selectedItem.image}
                alt={selectedItem.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-[calc(90vh-224px)]">
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedItem.label}</h2>

                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold">
                    ৳{selectedItem.price}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedItem?.ingridents || "No ingredients listed.",
                    }}
                    className="text-sm text-gray-600"
                  />

                  <div className="w-[300px] h-[190px]">
                    <video
                      src={selectedItem.video}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
