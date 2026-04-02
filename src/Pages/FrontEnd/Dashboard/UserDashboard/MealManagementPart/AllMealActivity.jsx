import React, { useState } from "react";

import useInstituteAuth from "../../../../../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../../../../../api/cms/user.hook";

import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function AllMealActivity({ allWise }) {
  const { user } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const routine = data?.routine;
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortByToday = (data) => {
    const today = new Date().getDay();
    return data?.sort((a, b) => {
      const aIndex = weekDays.indexOf(a.day);
      const bIndex = weekDays.indexOf(b.day);
      return ((aIndex - today + 7) % 7) - ((bIndex - today + 7) % 7);
    });
  };

  const sortedMeals = sortByToday(routine?.schedule_lists);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(weekDays[d.getDay()]);
    }
    return days;
  };

  const [selectedDays, setSelectedDays] = useState([getNext7Days()[0]]);

  const [activeDayView, setActiveDayView] = useState(getNext7Days()[0]);

  const selectedMeals = sortedMeals?.filter(
    (item) => item?.day === activeDayView,
  );

  const getKey = (meal) => `${meal.day}-${meal.meal_type}`;

  const [selectedGroupMap, setSelectedGroupMap] = useState({});
  const [useAlternativeMap, setUseAlternativeMap] = useState({});
  const [openKey, setOpenKey] = useState(null);
  const handleSelect = (key, groupIndex) => {
    setSelectedGroupMap((prev) => ({ ...prev, [key]: groupIndex }));
    setOpenKey(null);
  };

  const handleCheckboxToggle = (key) => {
    setUseAlternativeMap((prev) => ({ ...prev, [key]: !prev[key] }));
    setSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
    setOpenKey(null);
  };

  const getMealTypeGradient = (type) => {
    switch (type?.toLowerCase()) {
      case "breakfast":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "lunch":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "dinner":
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-orange-500";
    }
  };

  const handleUpdate = () => {
    const allSelectedMeals = sortedMeals?.filter((item) =>
      selectedDays.includes(item?.day),
    );

    const finalSelections = allSelectedMeals?.map((meal) => {
      const key = getKey(meal);
      const isAlternative = !!useAlternativeMap[key];
      const altGroupIndex = selectedGroupMap[key];

      return {
        day: meal.day,
        meal_type: meal.meal_type,
        selected_items: isAlternative
          ? (meal?.alternative_items?.[altGroupIndex] ?? [])
          : (meal?.items ?? []),
        is_alternative: isAlternative,
      };
    });

    
  };

  const handleGuestUpdate = () => {
    console.log("Guest meal updated");
  };

  return (
    <div className="space-y-4">
      <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
        {/* Sidebar Calendar */}
        <aside className="bg-white p-3 rounded-xl shadow w-[260px] h-[350px]">
          <h2 className="flex items-center mb-2 justify-center gap-3 font-bold">
            <button>
              <FaCalendarAlt />
            </button>
            Meal Calendar
          </h2>
          <div className="flex flex-col justify-center">
            {getNext7Days().map((plan, index) => {
              const isSelected = selectedDays.includes(plan);
              const isViewing = activeDayView === plan;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 border-b border-gray-100 py-2 px-2 rounded-md cursor-pointer ${
                    isViewing
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-100"
                  }`}
                >
                  {/* Checkbox — day select/unselect */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      setSelectedDays((prev) =>
                        prev.includes(plan)
                          ? prev.filter((d) => d !== plan)
                          : [...prev, plan],
                      );
                    }}
                    className="cursor-pointer w-4 h-4 flex-shrink-0"
                  />

                  {/* Day name click → view এ দেখাও */}
                  <span
                    onClick={() => setActiveDayView(plan)}
                    className="flex-1 text-left"
                  >
                    {plan}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-3">
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
          <div className="flex flex-wrap gap-3">
            {selectedMeals?.map((meal) => {
              const key = getKey(meal);

              return (
                <div
                  key={key}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[330px]"
                >
                  {/* Meal Type Header */}
                  <div
                    className={`px-3 py-3 rounded-xl text-white capitalize ${getMealTypeGradient(meal?.meal_type)}`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm lg:text-lg">
                        {meal?.meal_type}
                      </h3>
                      {/* কোন day এর card সেটা দেখাও */}
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        {meal.day}
                      </span>
                      <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
                        ৳0
                      </span>
                    </div>
                    <div className="flex font-semibold justify-center">
                      <p>{meal?.start_time}</p>-<p>{meal?.end_time}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    {/* Default Items */}
                    <button
                      onClick={() => {
                        setUseAlternativeMap((prev) => ({
                          ...prev,
                          [key]: false,
                        }));
                        setSelectedGroupMap((prev) => ({
                          ...prev,
                          [key]: undefined,
                        }));
                        setOpenKey(null);
                      }}
                      className="px-2 w-full flex cursor-pointer items-center gap-2.5 bg-gray-100 my-2 rounded-2xl py-2"
                    >
                      <FaCheckCircle
                        className={`text-sm transition-colors flex-shrink-0 ${
                          useAlternativeMap[key]
                            ? "text-gray-300"
                            : "text-green-600"
                        }`}
                      />
                      <div className="flex flex-wrap gap-1">
                        {meal?.items?.map((foodItem, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="font-semibold text-xs">
                              {foodItem.title}
                            </span>
                            <span className="text-[10px] text-orange-600">
                              (৳{foodItem.price})
                            </span>
                            {meal.items.length - 1 !== i && ","}
                          </div>
                        ))}
                      </div>
                    </button>

                    {/* Alternative Row */}
                    <div className="flex items-center gap-2.5 my-2">
                      <input
                        type="checkbox"
                        checked={!!useAlternativeMap[key]}
                        onChange={() => handleCheckboxToggle(key)}
                        className="cursor-pointer w-4 h-4 flex-shrink-0"
                      />

                      <div className="relative w-full">
                        <button
                          type="button"
                          disabled={!useAlternativeMap[key]}
                          onClick={() =>
                            setOpenKey(openKey === key ? null : key)
                          }
                          className={`py-1 px-2 shadow-md w-full rounded-md flex items-center justify-between border transition-colors ${
                            useAlternativeMap[key]
                              ? "bg-white border-gray-200 cursor-pointer"
                              : "bg-gray-50 border-gray-100 cursor-not-allowed opacity-50"
                          }`}
                        >
                          <span className="text-sm">
                            {selectedGroupMap[key] !== undefined
                              ? meal?.alternative_items?.[selectedGroupMap[key]]
                                  ?.map(
                                    (food) => `${food.title} (৳${food.price})`,
                                  )
                                  .join(", ")
                              : "Select Alternative Item"}
                          </span>
                          <ChevronDown
                            className={`transition-transform duration-300 flex-shrink-0 ${
                              openKey === key ? "rotate-180" : ""
                            }`}
                            size={18}
                          />
                        </button>

                        {openKey === key && useAlternativeMap[key] && (
                          <div className="absolute w-full z-50 rounded-md p-2 bg-white border border-gray-200 shadow-md">
                            {meal?.alternative_items?.map((altGroup, i) => {
                              const isSelected = selectedGroupMap[key] === i;
                              return (
                                <div
                                  key={i}
                                  onClick={() => handleSelect(key, i)}
                                  className={`flex flex-wrap gap-2 py-2 px-2 rounded cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-100 border border-blue-400"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  {altGroup?.map((food, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-1"
                                    >
                                      <span className="font-semibold text-xs">
                                        {food.title}
                                      </span>
                                      <span className="text-[10px] text-orange-600">
                                        (৳{food.price})
                                      </span>
                                      {altGroup.length - 1 !== idx && ","}
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Update Button */}
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
          <div className="flex flex-wrap gap-6"></div>

          {/* Guest Update Button */}
          <button
            onClick={handleGuestUpdate}
            className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
          >
            Update Guest Meals
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* Weekly Summary Table */
}
{
  /* <div className="overflow-x-auto bg-white rounded-2xl shadow">
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
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-700">
                            {currentMeal?.items?.length > 0
                              ? currentMeal.items.map((i) => i.title).join(", ")
                              : "—"}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] text-white rounded ${
                              currentMeal?.meal_status
                                ? "bg-green-600"
                                : "bg-red-500"
                            }`}
                          >
                            {currentMeal?.meal_status ? "ON" : "OFF"}
                          </span>
                        </div>

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
      </div> */
}

{
  /* Guest Meal Header */
}
// <div className="bg-white/90 rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
//   <div className="flex flex-col">
//     <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
//       Choose Your Meals for Guest
//     </h1>
//     <p className="text-sm text-gray-500 mt-1">
//       Select your preferred meals for the selected date(s)
//     </p>
//   </div>
// </div>

{
  /* Guest Meal Cards */
}
// <div className="flex flex-wrap gap-6">
{
  /* {result?.map((meal) => (
              <GuestCard
                key={`guest-${meal.mealType}`}
                title={meal.mealType}
                data={meal}
                onChange={handleGuestMealChange}
              />
            ))} */
}
// </div>

// <button className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer">
//   Update Guest Meals
// </button>
