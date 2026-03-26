import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Select from "react-select";
import { components } from "react-select";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const itemOptions = data?.options?.map((item) => ({
    value: item,
    label: item?.title,
    price: +item?.price,
    image: item?.image,
    ingridents: item?.ingridents,
    video: item?.video,
  }));

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
          {/* <img
            src={data.image}
            alt={data.label}
            className="w-4 h-4 rounded object-cover"
          /> */}
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

      {/* all menu items with price */}
      <div className="mt-4 space-y-3">
        {data?.options?.length > 0 && (
          <span className="w-full flex items-center gap-2 px-3 py-2 flex-wrap">
            {data?.options?.map((option) => (
              <span>
                {option.title}- ৳{option.price}
              </span>
            ))}
          </span>
        )}

        {/* select option */}

        <Select
          isMulti
          options={itemOptions}
          value={selectedOptions}
          onChange={setSelectedOptions}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        />
        {/* // <select className="w-full border border-gray-300 rounded-lg px-2 py-2">
          //   <option value="">Select {title}</option>
          //   {data.options.map((option, i) => (
          //     <option key={i} value={option}>
          //       <span>{option.title}</span>- ৳<span>{option.price}</span>
          //     </option>
          //   ))}
          // </select> */}

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

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background Overlay with Blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[800px] transform transition-all animate-in fade-in zoom-in duration-300 h-[90vh] overflow-y-auto ">
            {/* Close Button (Top Right) */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-md hover:bg-red-50 text-gray-600 hover:text-red-500 p-2 rounded-full transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Image Section */}
            <div className="relative h-56 w-full">
              <img
                src={selectedItem.image}
                alt={selectedItem.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="p-6 pt-5 flex flex-col h-[calc(90vh-224px)] justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    {selectedItem.label}
                  </h2>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold text-lg">
                    ৳{selectedItem.price}
                  </span>
                </div>

                <div className="flex justify-between">
                  <div className="space-y-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedItem?.ingridents || "No ingredients listed.",
                      }}
                      className="text-gray-600 leading-relaxed text-sm 
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 
              [&_h1]:text-lg [&_h2]:text-lg [&_h3]:text-md [&_h1]:font-bold [&_h4]:text-md"
                    />
                  </div>

                  <div className="w-[300px] h-[190px] aspect-video rounded-md">
                    <video
                      src={selectedItem.video}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}

              <div className="pb-5">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-8  w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-200"
                >
                  Got it, Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
