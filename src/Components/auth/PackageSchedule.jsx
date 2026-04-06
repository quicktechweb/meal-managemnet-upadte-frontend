import React, { useState } from "react";
import { useAllPackage } from "../../api/admin/admin.api";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const PackageSchedule = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const { data: packages = [], isLoading } = useAllPackage();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [alternativeChecked, setAlternativeChecked] = useState({});
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [packageTimes, setPackageTimes] = useState({});

  const packageTypes = [
    ...new Set(packages.map((item) => item.package_title)),
  ].reverse();

  const groupedData = packages?.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = {};
    acc[item.day][item.package_title] = item;
    return acc;
  }, {});

  const handleTimeChange = (type, field, value) => {
    setPackageTimes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const getSelectedPayload = () => {
    const result = [];

    days.forEach((day) => {
      const dayData = groupedData[day] || {};

      packageTypes.forEach((type) => {
        const pkg = dayData[type];
        if (!pkg) return;

        const key = `${day}-${type}`;
        const isAlternative = !!alternativeChecked[key];
        const selectedAltIndex = selectedAlternative[key];

        let selectedItems = [];

        if (isAlternative && selectedAltIndex !== undefined) {
          selectedItems = pkg?.alternative_items?.[selectedAltIndex] ?? [];
        } else {
          selectedItems = pkg?.items ?? [];
        }

        result.push({
          day,
          package_title: pkg.package_title,
          package_price: pkg.package_price,
          start_time: packageTimes[type]?.start || "",
          end_time: packageTimes[type]?.end || "",
          package_item: selectedItems.map((item) => ({ title: item.title })),
        });
      });
    });

    return result;
  };

  const groupPreviewData = (payload) => {
    return payload.reduce((acc, item) => {
      if (!acc[item.day]) acc[item.day] = {};
      acc[item.day][item.package_title] = item;
      return acc;
    }, {});
  };

  const handleSubmit = () => {
    const payload = getSelectedPayload();
    
    setPreviewData(payload);
  };

  if (isLoading) return <p>Loading...</p>;

  const groupedPreview = previewData ? groupPreviewData(previewData) : null;

  return (
    <div className="space-y-8">
      {/* ── Main Schedule Table ── */}
      <div className="max-w-7xl mx-auto overflow-x-auto border border-gray-200 rounded-xl shadow-lg">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-orange-600 text-white sticky top-0">
            <tr>
              <th className="p-4 border border-orange-700 w-32">Day</th>
              {packageTypes.map((type) => (
                <th key={type} className="p-4 border border-orange-700 w-48">
                  <p className="mb-2">{type}</p>
                  {/* Time inputs inside header */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-orange-100 w-10 shrink-0">
                        Start
                      </label>
                      <input
                        type="time"
                        value={packageTimes[type]?.start || ""}
                        onChange={(e) =>
                          handleTimeChange(type, "start", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-orange-500 border border-orange-400 text-white text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-orange-100 w-10 shrink-0">
                        End
                      </label>
                      <input
                        type="time"
                        value={packageTimes[type]?.end || ""}
                        onChange={(e) =>
                          handleTimeChange(type, "end", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-orange-500 border border-orange-400 text-white text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day) => {
              const dayData = groupedData[day] || {};

              return (
                <tr key={day} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-200 font-semibold">
                    {day}
                  </td>

                  {packageTypes.map((type) => {
                    const pkg = dayData[type];
                    const key = `${day}-${type}`;

                    const isAlternative = !!alternativeChecked[key];

                    return (
                      <td key={type} className="p-4 border border-gray-200">
                        {pkg ? (
                          <div>
                            <p className="text-sm text-gray-500">
                              Package Price - {pkg.package_price}
                            </p>

                            {/* Default Items Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setAlternativeChecked((prev) => ({
                                  ...prev,
                                  [key]: false,
                                }));
                                setSelectedAlternative((prev) => {
                                  const next = { ...prev };
                                  delete next[key];
                                  return next;
                                });
                                setOpenDropdown((prev) =>
                                  prev === key ? null : prev,
                                );
                              }}
                              className={`px-2 w-full flex cursor-pointer items-center gap-2.5 my-2 rounded-2xl py-2 transition-all ${
                                isAlternative
                                  ? "bg-gray-50 opacity-50"
                                  : "bg-gray-100"
                              }`}
                            >
                              <FaCheckCircle
                                className={`text-sm flex-shrink-0 transition-colors ${
                                  isAlternative
                                    ? "text-gray-300"
                                    : "text-green-600"
                                }`}
                              />
                              <div className="flex flex-wrap gap-1">
                                {pkg?.items?.map((foodItem, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1"
                                  >
                                    <span className="font-semibold text-xs">
                                      {foodItem.title}
                                    </span>
                                    {pkg.items.length - 1 !== i && ","}
                                  </div>
                                ))}
                              </div>
                            </button>

                            {/* Alternative Dropdown */}
                            <div className="flex items-start gap-2.5 my-2">
                              <input
                                type="checkbox"
                                className="cursor-pointer w-4 h-4 mt-2"
                                checked={isAlternative}
                                onChange={(e) => {
                                  setAlternativeChecked((prev) => ({
                                    ...prev,
                                    [key]: e.target.checked,
                                  }));
                                  if (!e.target.checked) {
                                    setOpenDropdown((prev) =>
                                      prev === key ? null : prev,
                                    );
                                    setSelectedAlternative((prev) => {
                                      const next = { ...prev };
                                      delete next[key];
                                      return next;
                                    });
                                  }
                                }}
                              />

                              <div className="relative w-full">
                                <button
                                  type="button"
                                  disabled={!isAlternative}
                                  onClick={() =>
                                    setOpenDropdown(
                                      openDropdown === key ? null : key,
                                    )
                                  }
                                  className={`py-1 px-2 shadow-md w-full rounded-md flex items-center justify-between border transition-all ${
                                    isAlternative
                                      ? "bg-gray-50 border-gray-200 cursor-pointer"
                                      : "bg-gray-100 border-gray-100 cursor-not-allowed opacity-50"
                                  }`}
                                >
                                  <span className="text-sm truncate">
                                    {selectedAlternative[key] !== undefined
                                      ? pkg?.alternative_items?.[
                                          selectedAlternative[key]
                                        ]
                                          ?.map((i) => i.title)
                                          .join(", ")
                                      : "Select Alternatives"}
                                  </span>
                                  <ChevronDown
                                    className={`transition-transform duration-300 flex-shrink-0 ${
                                      openDropdown === key ? "rotate-180" : ""
                                    }`}
                                    size={18}
                                  />
                                </button>

                                {isAlternative && openDropdown === key && (
                                  <div className="absolute w-full z-50 mt-1 rounded-md p-2 bg-white border border-gray-200 shadow-md max-h-60 overflow-y-auto">
                                    {pkg?.alternative_items?.map(
                                      (group, gIndex) => {
                                        const isSelected =
                                          selectedAlternative[key] === gIndex;
                                        return (
                                          <div
                                            key={gIndex}
                                            onClick={() => {
                                              setSelectedAlternative(
                                                (prev) => ({
                                                  ...prev,
                                                  [key]: gIndex,
                                                }),
                                              );
                                              setOpenDropdown(null);
                                            }}
                                            className={`mb-2 p-1 rounded-md cursor-pointer border transition-all ${
                                              isSelected
                                                ? "bg-orange-50 border-orange-400"
                                                : "border-transparent hover:bg-gray-50"
                                            }`}
                                          >
                                            <p className="text-xs font-semibold text-gray-400 mb-1">
                                              Alternative {gIndex + 1}
                                            </p>
                                            <div className="flex items-center flex-wrap gap-1">
                                              {group?.map((item, index) => (
                                                <div
                                                  key={index}
                                                  className="flex items-center gap-1"
                                                >
                                                  <span className="text-sm">
                                                    {item?.title}
                                                  </span>
                                                  {group.length - 1 !== index &&
                                                    ","}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Submit Schedule
        </button>
      </div>

      {/* ── Preview Table ── */}
      {groupedPreview && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold text-gray-700 mb-3">
            Selected Schedule Preview
          </h2>
          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-lg">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="p-4 border border-green-700 w-32">Day</th>
                  {packageTypes.map((type) => (
                    <th key={type} className="p-4 border border-green-700 w-48">
                      <p>{type}</p>
                      {(packageTimes[type]?.start ||
                        packageTimes[type]?.end) && (
                        <p className="text-xs font-normal text-green-100 mt-1">
                          {packageTimes[type]?.start || "--:--"} →{" "}
                          {packageTimes[type]?.end || "--:--"}
                        </p>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {days.map((day) => {
                  const dayPreview = groupedPreview[day] || {};

                  return (
                    <tr key={day} className="hover:bg-gray-50">
                      <td className="p-4 border border-gray-200 font-semibold">
                        {day}
                      </td>

                      {packageTypes.map((type) => {
                        const pkg = dayPreview[type];

                        return (
                          <td
                            key={type}
                            className="p-4 border border-gray-200 text-sm"
                          >
                            {pkg ? (
                              <div className="space-y-1">
                                <p className="text-xs text-gray-400">
                                  Price: {pkg.package_price}
                                </p>
                                {/* {(pkg.start_time || pkg.end_time) && (
                                  <p className="text-xs text-blue-500">
                                    {pkg.start_time || "--:--"} →{" "}
                                    {pkg.end_time || "--:--"}
                                  </p>
                                )} */}
                                <div className="flex flex-wrap gap-1">
                                  {pkg.package_item?.map((item, i) => (
                                    <span
                                      key={i}
                                      className="bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full"
                                    >
                                      {item.title}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSchedule;
