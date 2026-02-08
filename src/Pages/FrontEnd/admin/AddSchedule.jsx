import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  PlusCircle,
  Trash2,
  Utensils,
  Sun,
  Sunrise,
  Moon,
  Save,
} from "lucide-react";
import { useCreateSchedule } from "../../../api/admin/admin.api";

const AddSchedule = () => {
  const { mutateAsync, isPending } = useCreateSchedule();

  // 1. Initialize useForm
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      day: "Sat",
      breakfast: [{ title: "", price: "" }],
      lunch: [{ title: "", price: "" }],
      dinner: [{ title: "", price: "" }],
    },
  });

  const selectedDay = watch("day");

  // 2. Setup Field Arrays for each meal type
  const breakfastFields = useFieldArray({ control, name: "breakfast" });
  const lunchFields = useFieldArray({ control, name: "lunch" });
  const dinnerFields = useFieldArray({ control, name: "dinner" });

  const onSubmit = async (data) => {
    // Transform data to match your API payload
    const payload = {
      day: data.day,
      breakfast: { mealType: "breakfast", items: data.breakfast },
      lunch: { mealType: "lunch", items: data.lunch },
      dinner: { mealType: "dinner", items: data.dinner },
    };

    await mutateAsync(payload);
  };

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Utensils className="w-8 h-8" /> Add Meal Schedule
          </h2>
          <p className="mt-2 text-purple-100">
            Plan and price your meals for the week
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Day Selector */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <label className="text-purple-900 font-bold text-lg min-w-[120px]">
              Select Day:
            </label>
            <div className="flex flex-wrap gap-2">
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setValue("day", d)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedDay === d
                      ? "bg-purple-600 text-white shadow-md scale-105"
                      : "bg-white text-gray-600 hover:bg-purple-100 border border-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Meals Sections */}
          <div className="grid gap-6">
            <MealSection
              title="Breakfast"
              name="breakfast"
              icon={<Sunrise className="text-orange-500" />}
              fieldArray={breakfastFields}
              register={register}
            />
            <MealSection
              title="Lunch"
              name="lunch"
              icon={<Sun className="text-yellow-500" />}
              fieldArray={lunchFields}
              register={register}
            />
            <MealSection
              title="Dinner"
              name="dinner"
              icon={<Moon className="text-indigo-500" />}
              fieldArray={dinnerFields}
              register={register}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 text-sm rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-purple-200 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

const MealSection = ({ title, name, icon, fieldArray, register }) => {
  const { fields, append, remove } = fieldArray;

  return (
    <div className="group border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors bg-white">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        {icon}
        <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 items-center animate-in fade-in slide-in-from-left-2"
          >
            <div className="flex-grow grid grid-cols-3 gap-2">
              <input
                {...register(`${name}.${index}.title`, { required: true })}
                type="text"
                placeholder="Ex: Pancakes"
                className="col-span-2 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ৳
                </span>
                <input
                  {...register(`${name}.${index}.price`, { required: true })}
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-gray-300 p-2.5 pl-7 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ title: "", price: "" })}
        className="mt-4 flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 cursor-pointer transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Add another item
      </button>
    </div>
  );
};

export default AddSchedule;
