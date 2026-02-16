import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useAllService,
  useCreateFeature,
  useGetFeature,
  useUpdateFeature,
} from "../../../api/admin/admin.api";
import { PlusCircle, Utensils, Tag } from "lucide-react";
import { useParams } from "react-router-dom";

const UpdateFeature = () => {
  const { id } = useParams();

  const { data: allFeature, isLoading: featureLoading } = useGetFeature();

  const singleFeature = allFeature?.data?.find((item) => item?._id === id);

  const { data: services, isLoading } = useAllService();

  const { mutateAsync, isPending } = useUpdateFeature();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleFeature && services.length > 0) {
      reset({
        name: singleFeature.name,
        price: singleFeature.price,
        service: singleFeature?.service?._id || "",
      });
    }
  }, [singleFeature, services, reset]);

  const onSubmit = async (formData) => {
    try {
      await mutateAsync({
        id,
        payload: {
          ...formData,
          price: Number(formData.price),
        },
      });

      reset();
    } catch (error) {
      console.error(error);
    }
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
              Update Feature
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* service */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Utensils size={16} className="text-slate-400" />
              Service Type
            </label>

            <select
              {...register("service", { required: "service is required" })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="">Choose a services...</option>
              {services?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>

            {errors.services && (
              <p className="text-red-500 text-sm">{errors.services.message}</p>
            )}
          </div>

          {/* Service Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag size={16} className="text-slate-400" />
              Feature Name
            </label>

            <input
              type="text"
              placeholder="e.g. balance"
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
              Feature Price
            </label>

            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                {...register("price", {
                  required: "Price is required",
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? "Processing..." : "Create Feature"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFeature;
