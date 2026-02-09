import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useAllKitchen,
  useUpdateUtilities,
  useUtilitiesService,
} from "../../../api/admin/admin.api";
import { PlusCircle, Utensils, Tag } from "lucide-react";
import { useParams } from "react-router-dom";

const UpdateUtilitiesService = () => {
  const { id } = useParams();

  const { data: allUtilitiesServices } = useUtilitiesService();

  const singleUtilities = allUtilitiesServices?.data?.find(
    (item) => item?._id === id,
  );

  const { data } = useAllKitchen();
  const { mutateAsync, isPending } = useUpdateUtilities();

  const kitchens = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleUtilities && kitchens.length > 0) {
      reset({
        name: singleUtilities.name,
        price: singleUtilities.price,
        kitchen: singleUtilities?.kitchen?._id || "",
      });
    }
  }, [singleUtilities, kitchens, reset]);

  const onSubmit = async (formData) => {
    try {
      await mutateAsync({
        id,
        payload: {
          ...formData,
          ...formData,
          price: Number(formData.price),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-50/50">
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-300 p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PlusCircle className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Update Utilities Service</h3>
          </div>
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

          {/* Submit */}
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
