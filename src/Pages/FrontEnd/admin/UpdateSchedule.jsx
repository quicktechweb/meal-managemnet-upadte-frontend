import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2, Utensils, Save } from "lucide-react";
import {
  useScheduleAdminData,
  useUpdateSchedule,
} from "../../../api/admin/admin.api";
import { useParams } from "react-router-dom";

const UpdateSchedule = () => {
  const { id } = useParams();

  const { data, isLoading } = useScheduleAdminData();
  const { mutateAsync, isPending } = useUpdateSchedule();

  const singleSchedule = data?.data?.find((s) => s._id === id);

  /* ================= FORM ================= */

  const { control, register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      day: "Sat",
      meals: [
        {
          mealType: "",
          items: [{ meal_id: Date.now(), title: "", price: "" }],
        },
      ],
    },
  });

  /* ================= FIELD ARRAY ================= */

  const mealsArray = useFieldArray({
    control,
    name: "meals",
  });

  /* ================= RESET FROM API ================= */

  useEffect(() => {
    if (singleSchedule) {
      reset({
        day: singleSchedule.day,
        meals:
          singleSchedule.meals?.length > 0
            ? singleSchedule.meals
            : [
                {
                  mealType: "",
                  items: [{ meal_id: 1, title: "", price: "" }],
                },
              ],
      });
    }
  }, [singleSchedule, reset]);

  /* ================= SUBMIT ================= */

  const onSubmit = async (formData) => {
    await mutateAsync({
      id,
      payload: formData,
    });
  };

  const day = watch("day");

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl border border-gray-300"
      >
        {/* Header */}
        <div className="bg-purple-600 text-white p-6 flex items-center gap-2">
          <Utensils />
          <h2 className="text-xl font-bold">Update Schedule</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* ============ Day Selector ============ */}
          <div className="flex flex-wrap gap-2">
            {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setValue("day", d)}
                className={`px-4 py-2 rounded-full ${
                  day === d
                    ? "bg-purple-600 text-white"
                    : "border border-gray-300 bg-white text-gray-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* ============ Dynamic Meals ============ */}

          {mealsArray.fields.map((meal, mealIndex) => (
            <MealSection
              key={meal.id}
              mealIndex={mealIndex}
              control={control}
              register={register}
              removeMeal={mealsArray.remove}
            />
          ))}

          {/* Add Meal Type */}
          <button
            type="button"
            onClick={() =>
              mealsArray.append({
                mealType: "",
                items: [{ meal_id: 1, title: "", price: "" }],
              })
            }
            className="flex items-center gap-2 text-purple-600 font-semibold"
          >
            <PlusCircle size={18} />
            Add Meal Type
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2 cursor-pointer"
          >
            <Save size={18} />
            {isPending ? "Updating..." : "Update Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSchedule;

const MealSection = ({ mealIndex, control, register, removeMeal }) => {
  const itemsArray = useFieldArray({
    control,
    name: `meals.${mealIndex}.items`,
  });

  return (
    <div className="border border-gray-300 rounded-xl p-5 space-y-3">
      {/* Meal Type Input */}
      <div className="flex gap-2">
        <input
          {...register(`meals.${mealIndex}.mealType`)}
          placeholder="Meal Type (Breakfast / Lunch / Snacks)"
          className="border uppercase border-gray-300 p-2 rounded w-[200px]"
        />

        <button
          type="button"
          onClick={() => removeMeal(mealIndex)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Items */}
      {itemsArray.fields.map((item, itemIndex) => (
        <div key={item.id} className="flex gap-2">
          <input
            {...register(`meals.${mealIndex}.items.${itemIndex}.title`)}
            placeholder="Item name"
            className="border border-gray-300 p-2 rounded w-full"
          />

          <input
            type="number"
            {...register(`meals.${mealIndex}.items.${itemIndex}.price`)}
            placeholder="Price"
            className="border border-gray-300 p-2 rounded w-32"
          />

          <button
            type="button"
            onClick={() => itemsArray.remove(itemIndex)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      {/* Add Item */}
      <button
        type="button"
        onClick={() =>
          itemsArray.append({
            meal_id: Date.now(),
            title: "",
            price: "",
          })
        }
        className="text-purple-600 flex gap-1 items-center text-sm font-semibold"
      >
        <PlusCircle size={16} />
        Add Item
      </button>
    </div>
  );
};
