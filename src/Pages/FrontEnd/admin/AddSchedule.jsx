import React, { useState } from "react";
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
  const [day, setDay] = useState("Sat");
  const [breakfastItems, setBreakfastItems] = useState([
    { meal_id: 1, title: "", price: "" },
  ]);
  const [lunchItems, setLunchItems] = useState([
    { meal_id: 1, title: "", price: "" },
  ]);
  const [dinnerItems, setDinnerItems] = useState([
    { meal_id: 1, title: "", price: "" },
  ]);

  const { mutateAsync, isPending } = useCreateSchedule();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      day,
      breakfast: { mealType: "breakfast", items: breakfastItems },
      lunch: { mealType: "lunch", items: lunchItems },
      dinner: { mealType: "dinner", items: dinnerItems },
    };

    await mutateAsync(payload);
  };

  const handleItemChange = (setter, index, field, value) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addItem = (setter) => {
    setter((prev) => [
      ...prev,
      { meal_id: prev.length + 1, title: "", price: "" },
    ]);
  };

  const removeItem = (setter, index) => {
    setter((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );
  };

  return (
    <div className="min-h-screen ">
      <form
        onSubmit={handleSubmit}
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
                  onClick={() => setDay(d)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    day === d
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
              icon={<Sunrise className="text-orange-500" />}
              items={breakfastItems}
              setItems={setBreakfastItems}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />
            <MealSection
              title="Lunch"
              icon={<Sun className="text-yellow-500" />}
              items={lunchItems}
              setItems={setLunchItems}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />
            <MealSection
              title="Dinner"
              icon={<Moon className="text-indigo-500" />}
              items={dinnerItems}
              setItems={setDinnerItems}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />
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

const MealSection = ({
  title,
  icon,
  items,
  setItems,
  handleItemChange,
  addItem,
  removeItem,
}) => {
  return (
    <div className="group border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors bg-white">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        {icon}
        <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-center animate-in fade-in slide-in-from-left-2"
          >
            <div className="flex-grow grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Ex: Pancakes"
                value={item.title}
                onChange={(e) =>
                  handleItemChange(setItems, index, "title", e.target.value)
                }
                className="col-span-2 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ৳
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(setItems, index, "price", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2.5 pl-7 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(setItems, index)}
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
        onClick={() => addItem(setItems)}
        className="mt-4 flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Add another item
      </button>
    </div>
  );
};

export default AddSchedule;
