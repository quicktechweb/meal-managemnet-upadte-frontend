import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  useAllCost,
  useAllKitchen,
  useCreateUtilites,
  useServiceType,
} from "../../../api/admin/admin.api";
import { PlusCircle, Utensils, Tag } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";

const AddUtilitiesService = () => {
  const { data } = useAllKitchen();
  const { data: service_type } = useServiceType();
  const { data: costs } = useAllCost();

  const { mutateAsync, isPending } = useCreateUtilites();

  const kitchens = data || [];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      kitchen: "",
      ranges: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranges",
  });

  const onSubmit = async (formData) => {
    try {
      await mutateAsync({
        ...formData,
        price: formData.price && Number(formData.price),
      });

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex bg-gray-50/50">
      <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PlusCircle className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              Add Utilities Service
            </h3>
          </div>
          <p className="text-slate-500 text-sm">
            Create a new utility service for your kitchen management system.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Kitchen */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Utensils size={16} className="text-slate-400" />
              Kitchen Type
            </label>

            <select
              onChange={(e) => handleChange(e)}
              {...register("kitchen", { required: "Kitchen is required" })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="">Choose a kitchen...</option>
              {kitchens.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>

            {errors.kitchen && (
              <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Utensils size={16} className="text-slate-400" />
              Service Type
            </label>

            <select
              onChange={(e) => handleChange(e)}
              {...register("service_type", {
                required: "service type is required",
              })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="">Choose a service type...</option>
              {service_type?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>

            {errors.kitchen && (
              <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Utensils size={16} className="text-slate-400" />
              Bear the cost
            </label>

            <Controller
              name="bear_the_cost"
              control={control}
              rules={{ required: "Bear the cost is required" }}
              defaultValue={[]}
              render={({ field }) => {
                const options =
                  costs?.map((c) => ({ value: c._id, label: c.title })) || [];
                const value = options.filter((option) =>
                  field.value?.includes(option.value),
                );

                return (
                  <Select
                    {...field}
                    isMulti
                    options={options}
                    value={value}
                    onChange={(selected) =>
                      field.onChange(selected.map((s) => s.value))
                    }
                  />
                );
              }}
            />

            {errors.bear_the_cost && (
              <p className="text-red-500 text-sm">
                {errors.bear_the_cost.message}
              </p>
            )}
          </div>

          {/* Service Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag size={16} className="text-slate-400" />
              Service Name
            </label>

            <input
              type="text"
              placeholder="e.g. Gas Maintenance"
              {...register("name", { required: "Service name is required" })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-slate-400 text-lg">৳</span>
              Service Price
            </label>

            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                {...register("price", {
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                ৳
              </span>
            </div>

            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* range */}

          <div className="flex flex-col gap-2 items-start">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag size={16} className="text-slate-400" />
              Price Range (if needed for any service)
            </label>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-wrap items-center gap-2 mb-2"
              >
                <input
                  type="number"
                  placeholder="Min"
                  {...register(`ranges.${index}.min`)}
                  className=" bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 w-full sm:w-fit outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />

                <input
                  type="number"
                  placeholder="Max"
                  {...register(`ranges.${index}.max`)}
                  className=" bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 w-full sm:w-fit  outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />

                <input
                  type="number"
                  placeholder="Price"
                  {...register(`ranges.${index}.price`)}
                  className=" bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 w-full sm:w-fit outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 cursor-pointer sm:w-[100px] rounded-xl h-[40px] w-[50px] sm:h-[50px] flex items-center justify-center font-semibold"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ min: "", max: "", price: "" })}
              className="bg-blue-500 cursor-pointer rounded-xl text-white px-4 py-2"
            >
              Add Range
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? "Processing..." : "Create Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUtilitiesService;
