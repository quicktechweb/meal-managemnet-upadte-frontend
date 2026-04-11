import React from "react";

const UserMealSummary = ({
  sortedMeals,
  getKey,
  useAlternativeMap,
  selectedGroupMap,
  guestUseAlternativeMap,
  guestEnabledMap,
  getNext7Days,
  guestSelectedGroupMap,
  isMealOn,
  guestQuantityMap,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 mt-4 w-full">
      <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800 mb-4">
        Meal Summary
      </h1>

      <div className="overflow-x-auto">
        {(() => {
          const mealTypes = [
            ...new Set(sortedMeals?.map((m) => m.meal_type) ?? []),
          ];

          const groupedByDay = {};
          sortedMeals?.forEach((meal) => {
            if (!groupedByDay[meal.day]) groupedByDay[meal.day] = {};
            const key = getKey(meal);
            const isAlternative = !!useAlternativeMap[key];
            const altGroupIndex = selectedGroupMap[key];
            const isGuestAdded = !!guestEnabledMap[key];
            const isGuestAlternative = !!guestUseAlternativeMap[key];
            const guestAltGroupIndex = guestSelectedGroupMap[key];

            groupedByDay[meal.day][meal.meal_type] = {
              is_on: isMealOn(key),
              selected_items: isAlternative
                ? (meal?.alternative_items?.[altGroupIndex] ?? [])
                : (meal?.items ?? []),
              is_alternative: isAlternative,
              guest: isGuestAdded
                ? {
                    selected_items: isGuestAlternative
                      ? (meal?.alternative_items?.[guestAltGroupIndex] ?? [])
                      : (meal?.items ?? []),
                    quantity: guestQuantityMap[key] ?? 1,
                  }
                : null,
            };
          });

          const days = getNext7Days();

          return (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-orange-400 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl font-semibold">
                    Day
                  </th>
                  {mealTypes.map((type, i) => (
                    <th
                      key={type}
                      className={`px-4 py-3 text-left font-semibold capitalize ${
                        i === mealTypes.length - 1 ? "rounded-tr-xl" : ""
                      }`}
                    >
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {days.map((day, rowIndex) => {
                  const dayData = groupedByDay[day];

                  return (
                    <tr
                      key={day}
                      className={`border-b border-gray-100 ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {/* Day cell */}
                      <td className="px-4 py-3 font-bold text-gray-700">
                        {day}
                      </td>

                      {mealTypes.map((type) => {
                        const cell = dayData?.[type];

                        if (!cell) {
                          return (
                            <td
                              key={type}
                              className="px-4 py-3 text-gray-400 text-xs"
                            >
                              No Meal Added
                            </td>
                          );
                        }

                        return (
                          <td
                            key={type}
                            className={`px-4 py-3 ${!cell.is_on ? "opacity-80" : ""}`}
                          >
                            {/* ON/OFF badge */}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${
                                cell.is_on
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {cell.is_on ? "ON" : "OFF"}
                            </span>

                            {/* Selected items */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cell.selected_items?.map((item, i) => (
                                <span
                                  key={i}
                                  className="bg-orange-50 text-orange-600 text-xs px-2 py-0.5 rounded-full"
                                >
                                  {item.title}
                                  <span className="text-[10px] ml-1 text-orange-400">
                                    ৳{item.price}
                                  </span>
                                </span>
                              ))}
                              {cell.is_alternative && (
                                <span className="bg-blue-50 text-blue-500 text-[10px] px-2 py-0.5 rounded-full">
                                  alt
                                </span>
                              )}
                            </div>

                            {/* Guest info */}
                            {cell.guest && (
                              <div className="mt-1.5 flex flex-wrap items-center gap-1">
                                <span className="text-[10px] text-purple-500 font-semibold">
                                  Guest x{cell.guest.quantity}:
                                </span>
                                {cell.guest.selected_items?.map((item, i) => (
                                  <span
                                    key={i}
                                    className="bg-purple-50 text-purple-600 text-[10px] px-2 py-0.5 rounded-full"
                                  >
                                    {item.title}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })()}
      </div>
    </div>
  );
};

export default UserMealSummary;
