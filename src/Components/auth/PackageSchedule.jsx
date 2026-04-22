import React, { useState, useEffect } from "react";
import { useAllPackage } from "../../api/admin/admin.api";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown, Clock } from "lucide-react";

const PackageSchedule = ({
  setPackageMealRoutine,
  setPackageTypes,
  packageTypes,
}) => {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const { data: packages = [], isLoading } = useAllPackage();

  console.log(packages);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [alternativeChecked, setAlternativeChecked] = useState({});
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [selectedUserAlternatives, setSelectedUserAlternatives] = useState({});
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    if (packages.length > 0) {
      const uniqueTitles = [
        ...new Set(packages.map((item) => item.package_title)),
      ].reverse();

      setPackageTypes(
        uniqueTitles.map((title) => ({
          package_type: title,
          start_time: "",
          end_time: "",
        })),
      );
    }
  }, [packages]);

  const groupedData = packages?.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = {};
    acc[item.day][item.package_title] = item;
    return acc;
  }, {});

  const handleTimeChange = (package_type, field, value) => {
    setPackageTypes((prev) =>
      prev.map((pkg) =>
        pkg.package_type === package_type ? { ...pkg, [field]: value } : pkg,
      ),
    );
  };

  // ── Payload builder ──────────────────────────────────────────────────────
  const getSelectedPayload = () => {
    const result = [];

    days.forEach((day) => {
      const dayData = groupedData[day] || {};

      packageTypes.forEach(({ package_type, start_time, end_time }) => {
        const pkg = dayData[package_type];
        if (!pkg) return;

        const key = `${day}-${package_type}`;
        const isAlternative = !!alternativeChecked[key];
        const selectedAltIndex = selectedAlternative[key];

        // items & alternative_items are now [{title: "ভাত,ডাল,ডিম"}] format
        let selectedItemTitle = "";
        if (isAlternative && selectedAltIndex !== undefined) {
          selectedItemTitle =
            pkg?.alternative_items?.[selectedAltIndex]?.title ?? "";
        } else {
          selectedItemTitle = pkg?.items?.[0]?.title ?? "";
        }

        const userAltIndices = selectedUserAlternatives[key] || [];
        const formattedUserAlternatives = userAltIndices.map((idx) => ({
          title: pkg?.alternative_items?.[idx]?.title ?? "",
        }));

        result.push({
          day,
          package_title: pkg.package_title,
          package_price: pkg.package_price,
          start_time,
          end_time,
          package_item: [{ title: selectedItemTitle }],
          alternative_items: formattedUserAlternatives,
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

    setPackageMealRoutine(payload);
    setPreviewData(payload);
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  const groupedPreview = previewData ? groupPreviewData(previewData) : null;

  return (
    <div className="space-y-5">
      {/* Main Schedule Table */}
      <div className="max-w-7xl mx-auto">
        <div className="border border-gray-100 shadow-xl rounded-3xl bg-white">
          <table className="w-full text-left overflow-visible">
            {/* Time Inputs header */}
            <thead className="bg-gradient-to-r from-orange-600 to-amber-600">
              <tr>
                <th className="p-2 text-white font-semibold text-lg">
                  Schedule Time
                </th>
                {packageTypes.map(({ package_type, start_time, end_time }) => (
                  <th key={package_type} className="p-1.5">
                    <div className="flex items-center gap-2 text-white mb-1.5">
                      <Clock size={20} />
                      <span className="font-semibold">{package_type}</span>
                    </div>

                    <div className="flex gap-1">
                      <div className="flex-1">
                        <label className="text-xs text-orange-100 block mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={start_time}
                          onChange={(e) =>
                            handleTimeChange(
                              package_type,
                              "start_time",
                              e.target.value,
                            )
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
                          value={end_time}
                          onChange={(e) =>
                            handleTimeChange(
                              package_type,
                              "end_time",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white/20 border border-white/30 text-white rounded-2xl px-4 py-1.5 focus:outline-none focus:border-white backdrop-blur-sm"
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
                  <tr
                    key={day}
                    className="transition-all border-b border-gray-100 last:border-none"
                  >
                    <td className="p-6 font-bold text-xl text-gray-800 border-r border-gray-100 bg-gray-50 w-32">
                      {day}
                    </td>

                    {packageTypes.map(({ package_type }) => {
                      const pkg = dayData[package_type];
                      const key = `${day}-${package_type}`;
                      const isAlternative = !!alternativeChecked[key];

                      return (
                        <td
                          key={package_type}
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
                                  className={`mt-0.5 text-xl flex-shrink-0 transition-all ${
                                    isAlternative
                                      ? "text-gray-300"
                                      : "text-emerald-600"
                                  }`}
                                />
                                <div>
                                  <p className="font-semibold text-gray-700">
                                    Items
                                  </p>
                                  {/* items[0].title is "ভাত,ডাল,ডিম" */}
                                  <p className="text-sm text-gray-600 text-start leading-snug">
                                    {pkg?.items?.[0]?.title ?? "—"}
                                  </p>
                                </div>
                              </button>

                              {/* Admin Alternative Section */}
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
                                        ? (pkg?.alternative_items?.[
                                            selectedAlternative[key]
                                          ]?.title ?? "—")
                                        : "Select Alternative Items"}
                                    </span>
                                    <ChevronDown
                                      className={`transition-transform ${
                                        openDropdown === key ? "rotate-180" : ""
                                      }`}
                                      size={20}
                                    />
                                  </button>

                                  {/* Admin Dropdown */}
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
                                              setSelectedUserAlternatives(
                                                (prev) => ({
                                                  ...prev,
                                                  [key]: (
                                                    prev[key] || []
                                                  ).filter((i) => i !== gIndex),
                                                }),
                                              );
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
                                            {/* group = {title: "ভাত,ডাল,ডিম"} */}
                                            <p className="text-sm text-gray-700">
                                              {group.title}
                                            </p>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* User Alternatives Section */}
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">
                                  User Alternatives Items
                                </h4>
                                <div className="relative flex-1">
                                  <button
                                    onClick={() => {
                                      const userKey = `user-${key}`;
                                      setOpenDropdown(
                                        openDropdown === userKey
                                          ? null
                                          : userKey,
                                      );
                                    }}
                                    type="button"
                                    className="w-full px-5 py-4 rounded-2xl border flex items-center justify-between transition-all duration-300 shadow-sm bg-white border-orange-300 hover:border-orange-400 cursor-pointer"
                                  >
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                      {selectedUserAlternatives[key]?.length > 0
                                        ? `${selectedUserAlternatives[key].length} alternative(s) selected`
                                        : "Select User Alternatives"}
                                    </span>
                                    <ChevronDown
                                      className={`transition-transform ${
                                        openDropdown === `user-${key}`
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                      size={20}
                                    />
                                  </button>

                                  {/* User Dropdown */}
                                  {openDropdown === `user-${key}` && (
                                    <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto py-2">
                                      {pkg?.alternative_items
                                        ?.map((group, gIndex) => ({
                                          group,
                                          gIndex,
                                        }))
                                        .filter(
                                          ({ gIndex }) =>
                                            gIndex !== selectedAlternative[key],
                                        )
                                        .map(({ group, gIndex }) => {
                                          const isSelected =
                                            selectedUserAlternatives[
                                              key
                                            ]?.includes(gIndex);
                                          return (
                                            <div
                                              key={gIndex}
                                              onClick={() => {
                                                setSelectedUserAlternatives(
                                                  (prev) => {
                                                    const current =
                                                      prev[key] || [];
                                                    const updated = isSelected
                                                      ? current.filter(
                                                          (i) => i !== gIndex,
                                                        )
                                                      : [...current, gIndex];
                                                    return {
                                                      ...prev,
                                                      [key]: updated,
                                                    };
                                                  },
                                                );
                                              }}
                                              className={`mx-2 my-1 p-4 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                                                isSelected
                                                  ? "bg-orange-50 border border-orange-400"
                                                  : "hover:bg-gray-50 border border-transparent"
                                              }`}
                                            >
                                              <div
                                                className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border-2 flex-shrink-0 ${
                                                  isSelected
                                                    ? "bg-orange-500 border-orange-500"
                                                    : "border-gray-300"
                                                }`}
                                              >
                                                {isSelected && (
                                                  <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={3}
                                                      d="M5 13l4 4L19 7"
                                                    />
                                                  </svg>
                                                )}
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold text-orange-600 mb-1">
                                                  ALTERNATIVE {gIndex + 1}
                                                </p>
                                                {/* group = {title: "ভাত,ডাল,ডিম"} */}
                                                <p className="text-sm text-gray-700">
                                                  {group.title}
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        })}

                                      {pkg?.alternative_items?.filter(
                                        (_, i) =>
                                          i !== selectedAlternative[key],
                                      ).length === 0 && (
                                        <p className="text-center text-gray-400 text-sm py-4">
                                          No alternatives available
                                        </p>
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
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          Submit Schedule
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Preview Section */}
      {groupedPreview && (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              Selected schedule preview
            </h2>
          </div>

          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table
              className="w-full border-collapse"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-left text-xs font-medium text-gray-500 w-20">
                    Day
                  </th>
                  {packageTypes.map(
                    ({ package_type, start_time, end_time }) => (
                      <th
                        key={package_type}
                        className="p-4 text-left border-l border-gray-100"
                      >
                        <p className="text-xs font-medium text-gray-700">
                          {package_type}
                        </p>
                        {(start_time || end_time) && (
                          <p className="text-xs text-gray-400 mt-0.5 font-normal">
                            {start_time || "--:--"} → {end_time || "--:--"}
                          </p>
                        )}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {days.map((day) => {
                  const dayPreview = groupedPreview[day] || {};
                  return (
                    <tr
                      key={day}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="p-4 text-xs font-medium text-gray-700 border-r border-gray-100">
                        {day}
                      </td>

                      {packageTypes.map(({ package_type }) => {
                        const pkg = dayPreview[package_type];
                        return (
                          <td
                            key={package_type}
                            className="p-4 border-l border-gray-100 align-top"
                          >
                            {pkg ? (
                              <div>
                                {/* Price */}
                                <p className="text-xs font-medium text-gray-600 mb-2">
                                  ৳{pkg.package_price}
                                </p>

                                {/* Items — package_item = [{title: "ভাত,ডাল,ডিম"}] */}
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                                  Items
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {pkg.package_item?.[0]?.title
                                    ?.split(",")
                                    .map((t, i) => (
                                      <span
                                        key={i}
                                        className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                                      >
                                        {t.trim()}
                                      </span>
                                    ))}
                                </div>

                                {/* User Alternatives — [{title: "খিচুড়ি,মাংস"}] */}
                                {pkg.alternative_items?.length > 0 && (
                                  <div className="mt-2.5 space-y-2">
                                    {pkg.alternative_items.map((alt, i) => (
                                      <div key={i}>
                                        <p className="text-[10px] font-medium text-amber-700 mb-1">
                                          Alt {i + 1}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                          {alt.title?.split(",").map((t, j) => (
                                            <span
                                              key={j}
                                              className="text-[11px] font-medium bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full"
                                            >
                                              {t.trim()}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-300 text-lg">—</span>
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
