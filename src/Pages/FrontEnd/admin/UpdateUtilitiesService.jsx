import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  useAllCost,
  useAllKitchen,
  useAllService,
  useUpdateUtilities,
  useUtilitiesService,
} from "../../../api/admin/admin.api";
import { PlusCircle, Utensils, Tag } from "lucide-react";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";

const UpdateUtilitiesService = () => {
  const { id } = useParams();

  const { data: allUtilitiesServices } = useUtilitiesService();
  const { data: costs } = useAllCost();
  const { data: services } = useAllService();

  const { data: kitchens } = useAllKitchen();
  const { mutateAsync, isPending } = useUpdateUtilities();

  const singleUtilities = allUtilitiesServices?.find(
    (item) => item?._id === id,
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      kitchen: "",
      bear_the_cost: [],
      service: [],
      ranges: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranges",
  });

  useEffect(() => {
    if (singleUtilities && kitchens?.length > 0) {
      reset({
        name: singleUtilities.name,
        price: singleUtilities.price,
        kitchen: singleUtilities?.kitchen?._id || "",
        bear_the_cost: singleUtilities?.bear_the_cost?.map((c) => c._id) || [],
        service: singleUtilities?.service?._id || [],
        ranges: singleUtilities?.ranges || [],
      });
    }
  }, [singleUtilities, kitchens, reset]);

  const onSubmit = async (formData) => {
    try {
      await mutateAsync({
        id,
        payload: {
          ...formData,
          price: formData.price && Number(formData.price),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-50/50">
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-300 p-4">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <PlusCircle className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Update Utilities Service</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Kitchen */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Utensils size={16} />
              Kitchen Type
            </label>
            <select
              {...register("kitchen", { required: "Kitchen is required" })}
              className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3"
            >
              <option value="">Choose a kitchen...</option>
              {kitchens?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {errors.kitchen && (
              <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
            )}
          </div>

          {/* Bear the cost */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Utensils size={16} />
              Bear the cost
            </label>

            <Controller
              name="bear_the_cost"
              control={control}
              rules={{ required: "Bear the cost is required" }}
              defaultValue={[]}
              render={({ field }) => {
                const options =
                  costs?.map((c) => ({
                    value: c._id,
                    label: c.title,
                  })) || [];

                const value = options.filter((opt) =>
                  field.value?.includes(opt.value),
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

    
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Utensils size={16} />
              Service
            </label>
            <select
              {...register("service", { required: "Service is required" })}
              className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3"
            >
              <option value="">Choose a Service...</option>
              {services?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm">{errors.service.message}</p>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Tag size={16} />
              Service Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Service name is required" })}
              className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-semibold">Service Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Ranges */}
          <div className="flex flex-col gap-2 items-start">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Tag size={16} />
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
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full sm:w-fit"
                />
                <input
                  type="number"
                  placeholder="Max"
                  {...register(`ranges.${index}.max`)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full sm:w-fit"
                />
                <input
                  type="number"
                  placeholder="Price"
                  {...register(`ranges.${index}.price`)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full sm:w-fit"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 rounded-xl h-[40px] flex items-center justify-center"
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

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 cursor-pointer text-white py-2.5 rounded-xl"
          >
            {isPending ? "Updating..." : "Update Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUtilitiesService;
