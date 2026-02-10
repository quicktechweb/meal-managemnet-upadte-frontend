import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { useCreateSchedule } from "../../../api/admin/admin.api";

const AddSchedule = () => {
  const { control, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      day: "Sat",
      meals: [
        {
          mealType: "Breakfast",
          items: [{ meal_id: 1, title: "", price: "" }],
        },
        { mealType: "Lunch", items: [{ meal_id: 1, title: "", price: "" }] },
        { mealType: "Dinner", items: [{ meal_id: 1, title: "", price: "" }] },
      ],
    },
  });

  const selectedDay = watch("day");

  const {
    fields: mealsFields,
    append: appendMeal,
    remove: removeMeal,
  } = useFieldArray({
    control,
    name: "meals",
  });

  const { mutateAsync, isPending } = useCreateSchedule();

  const onSubmit = async (data) => {
    console.log(data, "meal data");

    const meals = data.meals.map((meal) => ({
      mealType: meal.mealType,
      items: meal.items.map((item, idx) => ({ ...item, meal_id: idx + 1 })),
    }));

    await mutateAsync({ day: data.day, meals });
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
            Add Meal Schedule
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
            {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setValue("day", d)}
                className={`px-4 py-2 rounded-full cursor-pointer font-medium transition-all ${
                  selectedDay === d
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-purple-100 outline outline-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Meals Sections */}
          <div className="space-y-6">
            {mealsFields.map((meal, mealIndex) => (
              <MealSection
                key={meal.id}
                mealIndex={mealIndex}
                control={control}
                register={register}
              />
            ))}

            <button
              type="button"
              onClick={() =>
                appendMeal({
                  mealType: "New Meal",
                  items: [{ meal_id: 1, title: "", price: "" }],
                })
              }
              className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Add New Meal Type
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 text-sm rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-purple-200 cursor-pointer "
          >
            <Save className="w-5 h-5" />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

const MealSection = ({ mealIndex, control, register }) => {
  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `meals.${mealIndex}.items`,
  });

  return (
    <div className="group border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors bg-white">
      {/* Meal Name  */}
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        <input
          {...register(`meals.${mealIndex}.mealType`, { required: true })}
          className="font-bold text-gray-800 text-lg uppercase tracking-wide border-b border-gray-300 focus:outline-none rounded-md focus:ring-1 focus:ring-purple-500 p-1"
        />
      </div>

      {/* Items */}
      <div className="space-y-3">
        {itemFields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-wrap sm:flex-nowrap gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Item Name"
              {...register(`meals.${mealIndex}.items.${index}.title`)}
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Price"
              {...register(`meals.${mealIndex}.items.${index}.price`)}
              className="w-24 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
            {itemFields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({ meal_id: itemFields.length + 1, title: "", price: "" })
        }
        className="mt-3 flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Add Item
      </button>
    </div>
  );
};

export default AddSchedule;
