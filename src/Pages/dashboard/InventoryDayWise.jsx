import React, { useMemo, useState } from "react";
import { useGlobalDayWise } from "../../api/cms/user.hook";

const InventoryDayWise = () => {
  const { data } = useGlobalDayWise();
  const [measures, setMeasures] = useState({});

  const itemCountMap = useMemo(() => {
    if (!data) return [];

    const countMap = {};

    data.forEach((user) => {
      user.meals.forEach((meal) => {
        meal.selected_items.forEach((item) => {
          const titles = item.title.split(",").map((t) => t.trim());
          titles.forEach((title) => {
            countMap[title] = (countMap[title] || 0) + 1;
          });
        });
      });
    });

    return Object.entries(countMap).map(([title, count]) => ({
      title,
      count,
    }));
  }, [data]);

  const handleMeasureChange = (title, value) => {
    setMeasures((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const totalMeasureSum = itemCountMap.reduce((sum, item) => {
    const measure = parseFloat(measures[item.title]) || 0;
    return sum + item.count * measure;
  }, 0);

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Day Wise Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Meal item count & measure calculator
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Items
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {itemCountMap.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Quantity
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {itemCountMap.reduce((sum, item) => sum + item.count, 0)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                  #
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                  Item Name
                </th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                  Quantity
                </th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                  Amount (per item)
                </th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {itemCountMap.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-400 py-12 text-sm"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                itemCountMap.map((item, index) => {
                  const measure = parseFloat(measures[item.title]) || 0;
                  const total = item.count * measure;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Index */}
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {index + 1}
                      </td>

                      {/* Item Name */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="text-sm font-medium text-gray-800">
                            {item.title}
                          </span>
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                          {item.count}
                        </span>
                      </td>

                      {/* Measure Input */}
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={measures[item.title] || ""}
                          onChange={(e) =>
                            handleMeasureChange(item.title, e.target.value)
                          }
                          placeholder="0"
                          className="w-24 text-center text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                        />
                      </td>

                      {/* Total Measure */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`text-sm font-semibold ${
                            total > 0 ? "text-emerald-600" : "text-gray-300"
                          }`}
                        >
                          {total > 0 ? total.toFixed(2) : "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDayWise;
