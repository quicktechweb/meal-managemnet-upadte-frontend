import { Type } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiPackage } from "react-icons/bi";
import { FaMoneyBill } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import Select from "react-select";
import { useGetItems } from "../../api/admin/admin.api";
import { components } from "react-select";
const dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const AddPackage = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { data: items = [] } = useGetItems();
  const itemOptions = items?.map((item) => ({
    value: item,
    label: item.title,
    price: +item.price,
    image: item.image,
    ingridents: item.ingridents,
    video: item.video,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

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
          <img
            src={data.image}
            alt={data.label}
            className="w-4 h-4 rounded object-cover"
          />
          <span>{data.label}</span>
          <span className="text-orange-600 text-xs">(৳{data.price})</span>
        </div>
      </components.MultiValueLabel>
    );
  };
  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Package</h2>
      </header>

      <form action="">
        <div className="flex flex-wrap gap-3">
          {dayNames.map((day, index) => {
            const isActive = selectedDay === day;

            return (
              <button
                key={index}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 cursor-pointer"
                }
              `}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <BiPackage size={16} /> Package Name
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="e.g. vat"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FaMoneyBill size={16} /> Package Price
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="e.g. vat"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MdRestaurantMenu size={16} /> Package Items
          </label>
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
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
