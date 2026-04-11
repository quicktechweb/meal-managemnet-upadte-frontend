import React from "react";

const DayWiseUserPackageMealSummary = ({
  sortedMeals,
  getKey,
  useAlternativeMap,
  selectedGroupMap,
  guestUseAlternativeMap,
  guestEnabledMap,
  getNext7Days,
  guestSelectedGroupMap,
  isMealOn,
  getNext7DaysWithDates,
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
            ...new Set(sortedMeals?.map((m) => m.package_title) ?? []),
          ];

          const groupedByDay = {};
          sortedMeals?.forEach((meal) => {
            if (!groupedByDay[meal.day]) groupedByDay[meal?.day] = {};
            const key = getKey(meal);
            const isAlternative = !!useAlternativeMap[key];
            const altGroupIndex = selectedGroupMap[key];
            const isGuestAdded = !!guestEnabledMap[key];
            const isGuestAlternative = !!guestUseAlternativeMap[key];
            const guestAltGroupIndex = guestSelectedGroupMap[key];

            groupedByDay[meal.day][meal.package_title] = {
              is_on: isMealOn(key),
              selected_items: isAlternative
                ? (meal?.alternative_items?.[altGroupIndex] ?? [])
                : (meal?.package_item ?? []),
              is_alternative: isAlternative,
              package_price: meal?.package_price,
              guest: isGuestAdded
                ? {
                    selected_items: isGuestAlternative
                      ? (meal?.alternative_items?.[guestAltGroupIndex] ?? [])
                      : (meal?.package_item ?? []),
                    quantity: guestQuantityMap[key] ?? 1,
                  }
                : null,
            };
          });

          const days = getNext7DaysWithDates;

          return (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-orange-400 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl font-semibold">
                    Date
                  </th>
                  {mealTypes?.map((type, i) => (
                    <th
                      key={type}
                      className={`px-4 py-3 text-left font-semibold capitalize ${
                        i === mealTypes?.length - 1 ? "rounded-tr-xl" : ""
                      }`}
                    >
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {days?.map((day, rowIndex) => {
                  const dayData = groupedByDay[day?.day];

                  return (
                    <tr
                      key={day?.day}
                      className={`border-b border-gray-100 ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-bold text-gray-700 flex items-center gap-1">
                        {day?.date} {day?.month}{" "}
                        <h5 className="text-xs">({day?.day})</h5>
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
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${
                                cell.is_on
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {cell.is_on ? "ON" : "OFF"}
                            </span>

                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold">
                                Package Price -{" "}
                              </h3>
                              <p className="text-green-700 font-semibold">
                                ৳{cell?.package_price}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold">
                                Items -{" "}
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {cell.selected_items?.map((item, i) => (
                                  <span
                                    key={i}
                                    className=" text-xs   rounded-full"
                                  >
                                    {item.title}{" "}
                                    {cell.selected_items?.length - 1 !== i &&
                                      ", "}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {cell.guest && (
                              <div className=" flex flex-wrap items-center gap-1">
                                <span className="text-[12px]  text-orange-500 font-semibold ">
                                  Guest x {cell.guest.quantity} :
                                </span>

                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-semibold">
                                    Items -{" "}
                                  </h3>
                                  <div className="flex flex-wrap gap-1">
                                    {cell.guest.selected_items?.map(
                                      (item, i) => (
                                        <span
                                          key={i}
                                          className="text-black font-semibold text-[12px] py-0.5 rounded-full"
                                        >
                                          {item.title}
                                          {cell.guest.selected_items?.length -
                                            1 !==
                                            i && ", "}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </div>
                                {/* {cell.guest.selected_items?.map((item, i) => (
                                  <span
                                    key={i}
                                    className="text-black font-semibold text-[12px] py-0.5 rounded-full"
                                  >
                                    {item.title}
                                  </span>
                                ))} */}
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

export default DayWiseUserPackageMealSummary;
