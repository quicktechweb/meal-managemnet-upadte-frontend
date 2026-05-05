import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown, Clock, ChevronUp } from "lucide-react";
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

  const [openDropdown, setOpenDropdown] = useState(null);
  const [alternativeChecked, setAlternativeChecked] = useState({});
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [selectedUserAlternatives, setSelectedUserAlternatives] = useState({});
  const [previewData, setPreviewData] = useState(null);

  // Mobile accordion: which day is expanded
  const [expandedDay, setExpandedDay] = useState(null);

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

  // ─── Step 2: existing routine restore ────────────────────
  useEffect(() => {
    if (packages.length === 0 || existingRoutine.length === 0) return;
    const newAlternativeChecked = {};
    const newSelectedAlternative = {};
    const newSelectedUserAlternatives = {};

    existingRoutine.forEach(
      ({ day, package_title, package_item, alternative_items }) => {
        const key = `${day}-${package_title}`;
        const pkg = packages.find(
          (p) => p.day === day && p.package_title === package_title,
        );
        if (!pkg) return;
        const savedTitle = (package_item ?? [])[0]?.title ?? "";
        const defaultTitle = pkg?.items?.[0]?.title ?? "";
        if (savedTitle === defaultTitle) {
          newAlternativeChecked[key] = false;
        } else {
          const matchedIndex = (pkg.alternative_items ?? []).findIndex(
            (group) => group.title === savedTitle,
          );
          if (matchedIndex !== -1) {
            newAlternativeChecked[key] = true;
            newSelectedAlternative[key] = matchedIndex;
          }
        }
        if (alternative_items?.length > 0) {
          const restoredIndices = alternative_items
            .map(({ title }) =>
              (pkg.alternative_items ?? []).findIndex(
                (group) => group.title === title,
              ),
            )
            .filter((i) => i !== -1);
          newSelectedUserAlternatives[key] = restoredIndices;
        }
      },
    );

    setAlternativeChecked(newAlternativeChecked);
    setSelectedAlternative(newSelectedAlternative);
    setSelectedUserAlternatives(newSelectedUserAlternatives);
    setPreviewData(existingRoutine);
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
        let selectedTitle = "";
        if (isAlternative && selectedAltIndex !== undefined) {
          selectedTitle =
            pkg?.alternative_items?.[selectedAltIndex]?.title ?? "";
        } else {
          selectedTitle = pkg?.items?.[0]?.title ?? "";
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
          package_item: [{ title: selectedTitle }],
          alternative_items: formattedUserAlternatives,
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
      package_routine: payload,
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

  if (isLoading) return <p className="text-center text-lg py-10">Loading...</p>;

  const groupedPreview = previewData ? groupPreviewData(previewData) : null;

  // ─── Shared: Package Cell Content ────────────────────────
  // Used in both mobile cards and desktop table cells
  const PackageCellContent = ({ pkg, day, package_type }) => {
    const key = `${day}-${package_type}`;
    const isAlternative = !!alternativeChecked[key];

    if (!pkg) {
      return (
        <div className="h-20 flex items-center justify-center text-gray-300 text-3xl font-light">
          —
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Price */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-lg shadow-inner shrink-0">
            ৳
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">
              PACKAGE PRICE
            </p>
            <p className="text-xl font-bold text-gray-800">
              ৳{pkg.package_price}
            </p>
          </div>
        </div>

        {/* Default Items */}
        <button
          onClick={() => {
            setAlternativeChecked((prev) => ({ ...prev, [key]: false }));
            setSelectedAlternative((prev) => {
              const next = { ...prev };
              delete next[key];
              return next;
            });
            setOpenDropdown((prev) => (prev === key ? null : prev));
          }}
          type="button"
          className={`w-full p-1.5 rounded-2xl transition-all duration-300 flex items-start gap-2 border ${
            isAlternative
              ? "bg-gray-50 border-gray-200"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-200 shadow-sm"
          }`}
        >
          <FaCheckCircle
            className={`mt-0.5 text-xl flex-shrink-0 transition-all ${isAlternative ? "text-gray-300" : "text-emerald-600"}`}
          />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Items</p>
            <p className="text-sm text-gray-600 text-start leading-snug">
              {pkg?.items?.[0]?.title ?? "—"}
            </p>
          </div>
        </button>

        {/* Admin Alternative */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-3 w-5 h-5 accent-orange-600 cursor-pointer shrink-0"
            checked={isAlternative}
            onChange={(e) => {
              setAlternativeChecked((prev) => ({
                ...prev,
                [key]: e.target.checked,
              }));
              if (!e.target.checked) {
                setOpenDropdown((prev) => (prev === key ? null : prev));
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
              onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
              type="button"
              className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 shadow-sm text-sm ${
                isAlternative
                  ? "bg-white border-orange-300 hover:border-orange-400 cursor-pointer"
                  : "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
              }`}
            >
              <span className="font-medium text-gray-700 truncate">
                {selectedAlternative[key] !== undefined
                  ? (pkg?.alternative_items?.[selectedAlternative[key]]
                      ?.title ?? "—")
                  : "Select Alternative Items"}
              </span>
              <ChevronDown
                className={`transition-transform shrink-0 ${openDropdown === key ? "rotate-180" : ""}`}
                size={18}
              />
            </button>

            {isAlternative && openDropdown === key && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto py-2">
                {pkg?.alternative_items?.map((group, gIndex) => (
                  <div
                    key={gIndex}
                    onClick={() => {
                      setSelectedAlternative((prev) => ({
                        ...prev,
                        [key]: gIndex,
                      }));
                      setOpenDropdown(null);
                      setSelectedUserAlternatives((prev) => ({
                        ...prev,
                        [key]: (prev[key] || []).filter((i) => i !== gIndex),
                      }));
                    }}
                    className={`mx-2 my-1 p-3 rounded-xl cursor-pointer transition-all ${
                      selectedAlternative[key] === gIndex
                        ? "bg-orange-50 border border-orange-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="text-xs font-bold text-orange-600 mb-1">
                      ALTERNATIVE {gIndex + 1}
                    </p>
                    <p className="text-sm text-gray-700">{group.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Alternatives */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-sm">
            User Alternatives Items
          </h4>
          <div className="relative flex-1">
            <button
              onClick={() => {
                const userKey = `user-${key}`;
                setOpenDropdown(openDropdown === userKey ? null : userKey);
              }}
              type="button"
              className="w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 shadow-sm bg-white border-orange-300 hover:border-orange-400 cursor-pointer text-sm"
            >
              <span className="font-medium text-gray-700 truncate">
                {selectedUserAlternatives[key]?.length > 0
                  ? `${selectedUserAlternatives[key].length} alternative(s) selected`
                  : "Select User Alternatives"}
              </span>
              <ChevronDown
                className={`transition-transform shrink-0 ${openDropdown === `user-${key}` ? "rotate-180" : ""}`}
                size={18}
              />
            </button>

            {openDropdown === `user-${key}` && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto py-2">
                {pkg?.alternative_items
                  ?.map((group, gIndex) => ({ group, gIndex }))
                  .filter(({ gIndex }) => gIndex !== selectedAlternative[key])
                  .map(({ group, gIndex }) => {
                    const isSelected =
                      selectedUserAlternatives[key]?.includes(gIndex);
                    return (
                      <div
                        key={gIndex}
                        onClick={() => {
                          setSelectedUserAlternatives((prev) => {
                            const current = prev[key] || [];
                            const updated = isSelected
                              ? current.filter((i) => i !== gIndex)
                              : [...current, gIndex];
                            return { ...prev, [key]: updated };
                          });
                        }}
                        className={`mx-2 my-1 p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-orange-50 border border-orange-400"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border-2 flex-shrink-0 ${isSelected ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
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
                          <p className="text-sm text-gray-700">{group.title}</p>
                        </div>
                      </div>
                    );
                  })}
                {pkg?.alternative_items?.filter(
                  (_, i) => i !== selectedAlternative[key],
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
    );
  };

  return (
    <div className="space-y-5 px-2 sm:px-0">
      <h3 className="text-2xl sm:text-3xl font-semibold text-center">
        Update Your Schedule
      </h3>

      {/* ════════════════════════════════════════
          DESKTOP TABLE (lg+)
      ════════════════════════════════════════ */}
      <div className="hidden lg:block border border-gray-100 shadow-xl rounded-3xl overflow-hidden bg-white">
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
                    return (
                      <td
                        key={package_type}
                        className="p-3 border-r border-gray-100 last:border-none"
                      >
                        <PackageCellContent
                          pkg={pkg}
                          day={day}
                          package_type={package_type}
                        />
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

      {/* ════════════════════════════════════════
          MOBILE ACCORDION (< lg)
      ════════════════════════════════════════ */}
      <div className="lg:hidden space-y-3">
        {/* Schedule Time section on mobile */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 p-4">
          <div className="flex items-center gap-2 text-white mb-3">
            <Clock size={18} />
            <span className="font-bold text-base">Schedule Time</span>
          </div>
          <div className="space-y-3">
            {packageTypes.map(({ package_type, start_time, end_time }) => (
              <div key={package_type} className="bg-white/10 rounded-2xl p-3">
                <p className="text-white font-semibold text-sm mb-2">
                  {package_type}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
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
                      className="w-full bg-white/20 border border-white/30 text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                  <div>
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
                      className="w-full bg-white/20 border border-white/30 text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day accordion cards */}
        {days.map((day) => {
          const dayData = groupedData[day] || {};
          const isOpen = expandedDay === day;

          return (
            <div
              key={day}
              className="border border-gray-100 shadow-sm rounded-3xl overflow-hidden bg-white"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setExpandedDay(isOpen ? null : day)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-lg text-gray-800">{day}</span>
                {isOpen ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="divide-y divide-gray-100">
                  {packageTypes.map(({ package_type }) => {
                    const pkg = dayData[package_type];
                    return (
                      <div key={package_type} className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {package_type}
                          </div>
                        </div>
                        <PackageCellContent
                          pkg={pkg}
                          day={day}
                          package_type={package_type}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="flex justify-center px-2">
        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
        >
          {isPending ? "Updating..." : "Submit and Update the Schedule"}
        </button>
      </div>

      {/* Preview */}
      {groupedPreview && (
        <div className="px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            {previewData === existingRoutine
              ? "Current Schedule"
              : "Updated Schedule Preview"}
          </h2>

          {/* ── Preview Desktop Table ── */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white">
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
                                  {pkg.package_item?.[0]?.title
                                    ?.split(",")
                                    .map((t, i) => (
                                      <span
                                        key={i}
                                        className="bg-green-100 text-green-700 text-xs font-medium px-4 py-2 rounded-2xl"
                                      >
                                        {t.trim()}
                                      </span>
                                    ))}
                                </div>
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

          {/* ── Preview Mobile Cards ── */}
          <div className="md:hidden space-y-3">
            {days.map((day) => {
              const dayPreview = groupedPreview[day] || {};
              const hasAny = packageTypes.some(
                ({ package_type }) => dayPreview[package_type],
              );
              if (!hasAny) return null;

              return (
                <div
                  key={day}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div className="bg-green-600 px-4 py-3">
                    <p className="text-white font-bold">{day}</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {packageTypes.map(
                      ({ package_type, start_time, end_time }) => {
                        const pkg = dayPreview[package_type];
                        if (!pkg) return null;
                        return (
                          <div key={package_type} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase">
                                {package_type}
                              </span>
                              <span className="text-green-700 font-bold">
                                ৳{pkg.package_price}
                              </span>
                            </div>
                            {(start_time || end_time) && (
                              <p className="text-xs text-gray-400 mb-2">
                                🕐 {start_time || "--:--"} →{" "}
                                {end_time || "--:--"}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {pkg.package_item?.[0]?.title
                                ?.split(",")
                                .map((t, i) => (
                                  <span
                                    key={i}
                                    className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                                  >
                                    {t.trim()}
                                  </span>
                                ))}
                            </div>
                            {pkg.alternative_items?.length > 0 && (
                              <div className="space-y-1.5 mt-2">
                                {pkg.alternative_items.map((alt, i) => (
                                  <div key={i}>
                                    <p className="text-[10px] font-bold text-amber-700 mb-1">
                                      Alt {i + 1}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {alt.title?.split(",").map((t, j) => (
                                        <span
                                          key={j}
                                          className="text-[11px] bg-amber-50 text-amber-800 font-medium px-2 py-0.5 rounded-full"
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
                        );
                      },
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteAdminPackageRoutine;
