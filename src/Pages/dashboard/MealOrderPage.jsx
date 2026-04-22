import React from "react";

const MealOrderPage = () => {
  const response = {
    success: true,
    data: [
      {
        _id: "69e86f2c0a2d09f406867526",
        meals: [
          {
            day: "Wednesday",
            meal_type: "Breakfast",
            package_price: 120,
            start_time: "09:00",
            end_time: "11:00",
            is_on: false,
            selected_items: [{ title: "Vat,Goru" }],
          },
          {
            day: "Wednesday",
            meal_type: "Lunch",
            package_price: 10,
            start_time: "12:00",
            end_time: "15:00",
            is_on: true,
            selected_items: [{ title: "Vat,Goru" }],
          },
          {
            day: "Wednesday",
            meal_type: "Dinner",
            package_price: 10,
            start_time: "21:00",
            end_time: "23:30",
            is_on: false,
            selected_items: [{ title: "Vat,Murgi" }],
          },
        ],
      },
    ],
  };

  const meals = response.data[0].meals;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-indigo-600">
          <h2 className="text-xl font-bold text-white">
            Daily Meal Routine - {meals[0].day}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                  Meal Type
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                  Time
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {meals.map((meal, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {meal.meal_type}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {meal.selected_items.map((item) => item.title).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {meal.start_time} - {meal.end_time}
                  </td>
                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    {meal.package_price} TK
                  </td>
                  <td className="px-6 py-4 text-center">
                    {meal.is_on ? (
                      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        Off
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MealOrderPage;
