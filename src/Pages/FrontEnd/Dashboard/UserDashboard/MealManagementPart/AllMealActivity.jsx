import React, { useState } from "react";
import { AllMealActivityCard } from "./AllMealActivityCard";
import { GuestCard } from "./GuestCard";
import useInstituteAuth from "../../../../../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../../../../../api/cms/user.hook";
import toast from "react-hot-toast";

export default function AllMealActivity() {
  const { user } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const [mealData, setMealData] = useState({});

  const [guestMealData, setGuestMealData] = useState({});

  const routine = data?.routine;

  const result =
    routine?.schedule_lists && routine.schedule_lists.length > 0
      ? Object.values(
          routine.schedule_lists.reduce((acc, curr) => {
            const key = curr.meal_type.toLowerCase();
            if (!acc[key]) {
              acc[key] = { mealType: key, items: [] };
            }
            curr.items.forEach((item) => {
              const exists = acc[key].items.some((i) => i.title === item.title);
              if (!exists) {
                acc[key].items.push({
                  meal_id: item._id || item.title,
                  title: item.title,
                  price: item.price,
                  image: item.image,
                  video: item.video,
                  ingridents: item.ingridents,
                });
              }
            });
            return acc;
          }, {}),
        )
      : [];

  const handleMealChange = (payload) => {
    setMealData((prev) => ({
      ...prev,
      [payload.mealType]: payload,
    }));
  };

  const handleGuestMealChange = (payload) => {
    setGuestMealData((prev) => ({
      ...prev,
      [payload.mealType]: payload,
    }));
  };

  const handleUpdate = () => {
    const payload = {
      meals: Object.values(mealData),
    };

    console.log(payload, "all meals");

    if (!payload.meals.length) {
      toast.error("Please select at least one meal.");
      return;
    }
  };

  const handleGuestUpdate = () => {
    const payload = {
      guestMeals: Object.values(guestMealData),
    };
    console.log("Sending guest data to backend:", payload.guestMeals);
  };

  const weekNames = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="flex flex-wrap gap-6">
        {result?.map((meal) => (
          <AllMealActivityCard
            key={meal.mealType}
            title={meal.mealType}
            data={meal}
            onChange={handleMealChange}
          />
        ))}
      </div>

      <button
        onClick={handleUpdate}
        className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
      >
        Update
      </button>

      {/* Guest Meal Header */}
      <div className="bg-white/90 rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
            Choose Your Meals for Guest
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred meals for the selected date(s)
          </p>
        </div>
      </div>

      {/* Guest Meal Cards */}
      <div className="flex flex-wrap gap-6">
        {result?.map((meal) => (
          <GuestCard
            key={`guest-${meal.mealType}`}
            title={meal.mealType}
            data={meal}
            onChange={handleGuestMealChange}
          />
        ))}
      </div>

      <button
        onClick={handleGuestUpdate}
        className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
      >
        Update Guest Meals
      </button>

      {/* Weekly Summary Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3">Day</th>
              {result?.map((meal) => (
                <th key={meal.mealType} className="px-4 py-3 capitalize">
                  {meal.mealType}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekNames?.map((name) => (
              <tr key={name} className="border-b">
                <td className="text-center px-4 py-3 font-medium">{name}</td>

                {result?.map((meal) => {
                  const currentMeal = mealData[meal.mealType];
                  const currentGuestMeal = guestMealData[meal.mealType];

                  return (
                    <td key={meal.mealType} className="px-4 py-3 text-sm">
                      <div className="flex flex-col gap-1 items-center">
                        {/* Regular meal info */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-700">
                            {currentMeal?.items?.length > 0
                              ? currentMeal.items.map((i) => i.title).join(", ")
                              : "—"}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] text-white rounded ${
                              currentMeal?.isOn ? "bg-green-600" : "bg-red-500"
                            }`}
                          >
                            {currentMeal?.isOn ? "ON" : "OFF"}
                          </span>
                        </div>

                        {/* Guest meal info */}
                        {currentGuestMeal?.items?.length > 0 && (
                          <span className="text-[10px] text-gray-400">
                            Guest:{" "}
                            {currentGuestMeal.items
                              .map((i) => i.title)
                              .join(", ")}{" "}
                            x{currentGuestMeal.quantity}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
