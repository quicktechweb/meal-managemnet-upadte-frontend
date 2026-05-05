import React, { useState } from "react";

const InventoryDayWiseTableList = ({
  instituteData,
  getEffectiveAmount,
  measures,
  globalAmount,
  setMeasures,
  selectedDay,
  selectedMealType,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleMeasureChange = (key, value) => {
    setMeasures((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = instituteData?.filter((institute) =>
    institute.instituteName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* Search Box */}
      {selectedDay && selectedMealType && (
        <div className="mb-6">
          <div className="relative max-w-sm">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by institute name..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {filteredData?.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-sm">
          {searchQuery
            ? `No institute found matching "${searchQuery}".`
            : "No data available. Please select a day and meal type."}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredData.map((institute) => (
            <div
              key={institute.instituteId}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <h2 className="text-base font-bold ">
                  Institute Name -{" "}
                  <span className="text-blue-800">
                    {institute.instituteName}
                  </span>
                </h2>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                      #
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                      Item Name
                    </th>
                    <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                      Quantity
                    </th>
                    <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                      Amount (per gram)
                    </th>
                    <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                      Total Amount (kg)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {institute.items.map((item, index) => {
                    const key = `${institute.instituteId}_${item.title}`;
                    const effectiveAmount = getEffectiveAmount(key);
                    const total = (item.count * effectiveAmount) / 1000;
                    const isOverridden =
                      measures[key] !== undefined && measures[key] !== "";

                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span className="text-sm font-medium text-gray-800">
                              {item.title}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                            {item.count}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              value={measures[key] ?? ""}
                              onChange={(e) =>
                                handleMeasureChange(key, e.target.value)
                              }
                              placeholder={globalAmount || "0"}
                              className={`w-24 text-center text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                isOverridden
                                  ? "border-emerald-400 bg-emerald-50"
                                  : "border-gray-200"
                              }`}
                            />
                            {isOverridden && (
                              <button
                                onClick={() =>
                                  setMeasures((prev) => {
                                    const updated = { ...prev };
                                    delete updated[key];
                                    return updated;
                                  })
                                }
                                className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                              >
                                reset
                              </button>
                            )}
                          </div>
                        </td>
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
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InventoryDayWiseTableList;
