import React, { useState } from "react";
import { useAllPackage } from "../../api/admin/admin.api";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown, Clock } from "lucide-react";

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

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  const groupedPreview = previewData ? groupPreviewData(previewData) : null;

  return (
    <div className="space-y-5">
      {/* Main Schedule Table */}
      <div className="max-w-7xl mx-auto">
        <div className="border border-gray-100 shadow-xl rounded-3xl overflow-hidden bg-white">
          <table className="w-full text-left">
            <tbody>
              {days.map((day) => {
                const dayData = groupedData[day] || {};
                return (
                  <tr
                    key={day}
                    className=" transition-all border-b border-gray-100 last:border-none"
                  >
                    <td className="p-6 font-bold text-xl text-gray-800 border-r border-gray-100 bg-gray-50 w-32">
                      {day}
                    </td>

                    {packageTypes.map((type) => {
                      const pkg = dayData[type];
                      const key = `${day}-${type}`;
                      const isAlternative = !!alternativeChecked[key];

                      return (
                        <td
                          key={type}
                          className="p-3 border-r border-gray-100 last:border-none"
                        >
                          {pkg ? (
                            <div className="space-y-5">
                              {/* Package Price */}
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-inner">
                                  ৳
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    PACKAGE PRICE
                                  </p>
                                  <p className="text-2xl font-bold text-gray-800">
                                    ৳{pkg.package_price}
                                  </p>
                                </div>
                              </div>

                              {/* Default Items */}
                              <button
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
                                type="button"
                                className={`w-full p-1.5 rounded-2xl transition-all duration-300 flex items-start gap-2 border ${
                                  isAlternative
                                    ? "bg-gray-50 border-gray-200"
                                    : "bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-200 shadow-sm"
                                }`}
                              >
                                <FaCheckCircle
                                  className={`mt-0.5 text-2xl flex-shrink-0 transition-all ${
                                    isAlternative
                                      ? "text-gray-300"
                                      : "text-emerald-600"
                                  }`}
                                />
                                <div>
                                  <p className="font-semibold text-gray-700 ">
                                    Default Items
                                  </p>
                                  <p className="text-sm text-gray-600 text-start leading-snug">
                                    {pkg?.items
                                      ?.map((item) => item.title)
                                      .join(", ")}
                                  </p>
                                </div>
                              </button>

                              {/* Alternative Section */}
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  className="mt-3 w-5 h-5 accent-orange-600 cursor-pointer"
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

                                <div className="relative flex-1">
                                  <button
                                    disabled={!isAlternative}
                                    onClick={() =>
                                      setOpenDropdown(
                                        openDropdown === key ? null : key,
                                      )
                                    }
                                    type="button"
                                    className={`w-full px-5 py-4 rounded-2xl border flex items-center justify-between transition-all duration-300 shadow-sm ${
                                      isAlternative
                                        ? "bg-white border-orange-300 hover:border-orange-400 cursor-pointer"
                                        : "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
                                    }`}
                                  >
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                      {selectedAlternative[key] !== undefined
                                        ? pkg?.alternative_items?.[
                                            selectedAlternative[key]
                                          ]
                                            ?.map((i) => i.title)
                                            .join(", ")
                                        : "Select Alternative Items"}
                                    </span>
                                    <ChevronDown
                                      className={`transition-transform ${openDropdown === key ? "rotate-180" : ""}`}
                                      size={20}
                                    />
                                  </button>

                                  {/* Dropdown */}
                                  {isAlternative && openDropdown === key && (
                                    <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto py-2">
                                      {pkg?.alternative_items?.map(
                                        (group, gIndex) => (
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
                                            className={`mx-2 my-1 p-4 rounded-xl cursor-pointer transition-all ${
                                              selectedAlternative[key] ===
                                              gIndex
                                                ? "bg-orange-50 border border-orange-400"
                                                : "hover:bg-gray-50"
                                            }`}
                                          >
                                            <p className="text-xs font-bold text-orange-600 mb-2">
                                              ALTERNATIVE {gIndex + 1}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                              {group
                                                .map((item) => item.title)
                                                .join(", ")}
                                            </p>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-40 flex items-center justify-center text-gray-300 text-4xl font-light">
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/* Time Inputs Footer */}
            <tfoot className="bg-gradient-to-r from-orange-600 to-amber-600">
              <tr>
                <th className="p-2 text-white font-semibold text-lg ">
                  Schedule Time
                </th>
                {packageTypes.map((type) => (
                  <th key={type} className="p-1.5">
                    <div className="flex items-center gap-2 text-white mb-1.5">
                      <Clock size={20} />
                      <span className="font-semibold">{type}</span>
                    </div>

                    <div className="flex gap-1">
                      <div className="flex-1">
                        <label className="text-xs text-orange-100 block mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={packageTimes[type]?.start || ""}
                          onChange={(e) =>
                            handleTimeChange(type, "start", e.target.value)
                          }
                          className="w-full bg-white/20 border border-white/30 text-white rounded-2xl px-4 py-1.5 focus:outline-none focus:border-white backdrop-blur-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-orange-100 block mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={packageTimes[type]?.end || ""}
                          onChange={(e) =>
                            handleTimeChange(type, "end", e.target.value)
                          }
                          className="w-full bg-white/20 border border-white/30 text-white rounded-2xl px-4 py-1.5 focus:outline-none focus:border-white backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
        >
          Submit Schedule
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Preview Section */}
      {groupedPreview && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-green-600">📋</span> Selected Schedule Preview
          </h2>

          <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white">
            <table className="w-full">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="p-6 text-left w-32">Day</th>
                  {packageTypes.map((type) => (
                    <th key={type} className="p-6 text-left">
                      <p className="font-semibold">{type}</p>
                      {(packageTimes[type]?.start ||
                        packageTimes[type]?.end) && (
                        <p className="text-sm text-green-100 mt-1 font-medium">
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
                    <tr
                      key={day}
                      className="border-b last:border-none hover:bg-green-50/50 transition-colors"
                    >
                      <td className="p-6 font-bold text-lg border-r">{day}</td>
                      {packageTypes.map((type) => {
                        const pkg = dayPreview[type];
                        return (
                          <td
                            key={type}
                            className="p-6 border-r last:border-none"
                          >
                            {pkg ? (
                              <div>
                                <p className="text-green-700 font-semibold mb-2">
                                  ৳{pkg.package_price}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {pkg.package_item?.map((item, i) => (
                                    <span
                                      key={i}
                                      className="bg-green-100 text-green-700 text-xs font-medium px-4 py-2 rounded-2xl"
                                    >
                                      {item.title}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-2xl">—</span>
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
