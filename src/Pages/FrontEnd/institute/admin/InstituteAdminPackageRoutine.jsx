import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown, Clock } from "lucide-react";
import { useAllPackage } from "../../../../api/admin/admin.api";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { useInstituteRegistration } from "../../../../api/auth/auth.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const InstituteAdminPackageRoutine = () => {
  const { user } = useInstituteAuth();
  const { mutateAsync, isPending } = useInstituteRegistration();
  const existingRoutine = user?.user?.packages?.package_routine ?? [];
  const existingTypeList = user?.user?.packages?.package_type_lists ?? [];

  const [packageMealRoutine, setPackageMealRoutine] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const { data: packages = [], isLoading } = useAllPackage();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [alternativeChecked, setAlternativeChecked] = useState({});
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [previewData, setPreviewData] = useState(null);

  // ─── Step 1: packageTypes initialize ───────────────────
  useEffect(() => {
    if (packages.length === 0) return;

    const uniqueTitles = [
      ...new Set(packages.map((item) => item.package_title)),
    ].reverse();

    setPackageTypes(
      uniqueTitles.map((title) => {
        const existing = existingTypeList.find((t) => t.package_type === title);
        return {
          package_type: title,
          start_time: existing?.start_time ?? "",
          end_time: existing?.end_time ?? "",
        };
      }),
    );
  }, [packages]);

  // ─── Step 2: existing routine ────────
  useEffect(() => {
    if (packages.length === 0 || existingRoutine.length === 0) return;

    const newAlternativeChecked = {};
    const newSelectedAlternative = {};

    existingRoutine.forEach(({ day, package_title, package_item }) => {
      const key = `${day}-${package_title}`;

      const pkg = packages.find(
        (p) => p.day === day && p.package_title === package_title,
      );
      if (!pkg) return;

      const savedTitles = (package_item ?? [])
        .map((i) => i.title)
        .sort()
        .join(",");
      const defaultTitles = (pkg.items ?? [])
        .map((i) => i.title)
        .sort()
        .join(",");

      if (savedTitles === defaultTitles) {
        newAlternativeChecked[key] = false;
      } else {
        const matchedIndex = (pkg.alternative_items ?? []).findIndex(
          (group) => {
            const groupTitles = group
              .map((i) => i.title)
              .sort()
              .join(",");
            return groupTitles === savedTitles;
          },
        );

        if (matchedIndex !== -1) {
          newAlternativeChecked[key] = true;
          newSelectedAlternative[key] = matchedIndex;
        }
      }
    });

    setAlternativeChecked(newAlternativeChecked);
    setSelectedAlternative(newSelectedAlternative);

    setPreviewData(existingRoutine);
  }, [packages]);

  // ─── Grouped raw packages ────────────────────────────
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
          start_time,
          end_time,
          package_item: selectedItems.map((item) => ({ title: item.title })),
        });
      });
    });

    return result;
  };

  const groupPreviewData = (payload) =>
    payload.reduce((acc, item) => {
      if (!acc[item.day]) acc[item.day] = {};
      acc[item.day][item.package_title] = item;
      return acc;
    }, {});
  const query = useQueryClient();
  const handleSubmit = async () => {
    const payload = getSelectedPayload();
    setPackageMealRoutine(payload);
    setPreviewData(payload);
    const payloads = {
      package_routine: packageMealRoutine,
      package_type_lists: packageTypes,
      registration_step: 3,
    };

    await mutateAsync(
      { userId: user?.user?._id, packages: { ...payloads } },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.data?.message);
            query.invalidateQueries(["instituteUserData"]);
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
          console.log(err);
        },
      },
    );
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  const groupedPreview = previewData ? groupPreviewData(previewData) : null;

  return (
    <div className="space-y-5">
      <h3 className="text-3xl font-semibold text-center">
        Update Your Schedule
      </h3>

      {/* ── Main Schedule Table ── */}

      <div className="border border-gray-100 shadow-xl rounded-3xl overflow-hidden bg-white">
        <table className="w-full text-left">
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
                            {/* Price */}
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
                                <p className="text-sm text-gray-600 text-start leading-snug">
                                  {pkg?.items
                                    ?.map((item) => item.title)
                                    .join(", ")}
                                </p>
                              </div>
                            </button>

                            {/* Alternative */}
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
                                    className={`transition-transform ${
                                      openDropdown === key ? "rotate-180" : ""
                                    }`}
                                    size={20}
                                  />
                                </button>

                                {isAlternative && openDropdown === key && (
                                  <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto py-2">
                                    {pkg?.alternative_items?.map(
                                      (group, gIndex) => (
                                        <div
                                          key={gIndex}
                                          onClick={() => {
                                            setSelectedAlternative((prev) => ({
                                              ...prev,
                                              [key]: gIndex,
                                            }));
                                            setOpenDropdown(null);
                                          }}
                                          className={`mx-2 my-1 p-4 rounded-xl cursor-pointer transition-all ${
                                            selectedAlternative[key] === gIndex
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

          {/* Time Footer */}
          <tfoot className="bg-gradient-to-r from-orange-600 to-amber-600">
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
          </tfoot>
        </table>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          {isPending ? "Updating..." : "Submit and Update the Schedule"}
        </button>
      </div>

      {/* Preview */}
      {groupedPreview && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {previewData === existingRoutine
              ? "Current Schedule"
              : "Updated Schedule Preview"}
          </h2>

          <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white">
            <table className="w-full">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="p-6 text-left w-32">Day</th>
                  {packageTypes.map(
                    ({ package_type, start_time, end_time }) => (
                      <th key={package_type} className="p-6 text-left">
                        <p className="font-semibold">{package_type}</p>
                        {(start_time || end_time) && (
                          <p className="text-sm text-green-100 mt-1 font-medium">
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
                      className="border-b border-gray-200 last:border-none hover:bg-green-50/50 transition-colors"
                    >
                      <td className="p-6 font-bold text-lg border-r border-gray-200">
                        {day}
                      </td>
                      {packageTypes.map(({ package_type }) => {
                        const pkg = dayPreview[package_type];
                        return (
                          <td
                            key={package_type}
                            className="p-6 border-r border-gray-200 last:border-none"
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

export default InstituteAdminPackageRoutine;
