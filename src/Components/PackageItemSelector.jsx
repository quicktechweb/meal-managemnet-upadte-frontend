import { ChevronDown } from "lucide-react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getKey } from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/AllMealActivity";

const PackageItemSelector = ({
  meal,
  isGuest,
  useAlternativeMap,
  guestUseAlternativeMap,
  selectedGroupMap,
  guestSelectedGroupMap,
  setGuestUseAlternativeMap,
  setGuestSelectedGroupMap,
  setUseAlternativeMap,
  setSelectedGroupMap,
  openKey,
  setOpenKey,
  handleGuestSelect,
  handleGuestCheckboxToggle,
  guestOpenKey,
  handleSelect,
  handleCheckboxToggle,
  setGuestOpenKey,
}) => {
  const key = getKey(meal);

  console.log(key);

  const useAlt = isGuest
    ? guestUseAlternativeMap?.[key]
    : useAlternativeMap?.[key];

  console.log(useAlt);

  const selGroupMap = isGuest ? guestSelectedGroupMap : selectedGroupMap;
  const curOpenKey = isGuest ? guestOpenKey : openKey;
  const selectedAltIndex = selGroupMap?.[key];

  const onDefaultClick = () => {
    if (isGuest) {
      setGuestUseAlternativeMap((prev) => ({ ...prev, [key]: false }));
      setGuestSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
      setGuestOpenKey(null);
    } else {
      setUseAlternativeMap((prev) => ({ ...prev, [key]: false }));
      setSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
      setOpenKey(null);
    }
  };

  const onCheckboxToggle = () =>
    isGuest ? handleGuestCheckboxToggle(key) : handleCheckboxToggle(key);

  const onDropdownToggle = () => {
    if (isGuest) {
      setGuestOpenKey(guestOpenKey === key ? null : key);
    } else {
      setOpenKey(openKey === key ? null : key);
    }
  };

  const onSelect = (i) =>
    isGuest ? handleGuestSelect(key, i) : handleSelect(key, i);

  // Selected alternative group এর items
  const selectedAltItems =
    selectedAltIndex !== undefined
      ? meal?.alternative_items?.[selectedAltIndex]
      : null;

  return (
    <div className="space-y-2">
      {/* ── Default Items Button ── */}
      <button
        onClick={onDefaultClick}
        className={`px-2 w-full flex cursor-pointer items-center gap-2.5 my-1 rounded-2xl py-2 transition-colors ${
          !useAlt ? "bg-green-50 ring-1 ring-green-300" : "bg-gray-100"
        }`}
      >
        <FaCheckCircle
          className={`text-sm flex-shrink-0 transition-colors ${
            !useAlt ? "text-green-600" : "text-gray-300"
          }`}
        />
        <div className="flex flex-wrap gap-1">
          {meal?.package_item?.map((foodItem, i) => (
            <span key={i} className="font-semibold text-xs">
              {foodItem.title}
              {i !== meal.package_item.length - 1 && ","}
            </span>
          ))}
        </div>
      </button>

      <div className="flex items-center gap-2.5 my-2">
        <input
          type="checkbox"
          checked={!!useAlt}
          onChange={onCheckboxToggle}
          className="cursor-pointer w-4 h-4 flex-shrink-0"
        />
        <div className="relative w-full">
          <button
            type="button"
            disabled={!useAlt}
            onClick={onDropdownToggle}
            className={`py-1 px-2 shadow-md w-full rounded-md flex items-center justify-between border transition-colors ${
              useAlt
                ? "bg-white border-gray-200 cursor-pointer"
                : "bg-gray-50 border-gray-100 cursor-not-allowed opacity-50"
            }`}
          >
            <span className="text-sm">
              {selGroupMap?.[key] !== undefined
                ? meal?.alternative_items?.[selGroupMap[key]]?.title
                : "Select Alternative Item"}
            </span>
            <ChevronDown
              className={`transition-transform duration-300 flex-shrink-0 ${
                curOpenKey === key ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {curOpenKey === key && useAlt && (
            <div className="absolute w-full z-50 rounded-md p-2 bg-white border border-gray-200 shadow-md">
              {meal?.alternative_items?.map((altGroup, i) => {
                const isSelected = selGroupMap[key] === i;
                return (
                  <div
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`flex flex-wrap gap-2 py-2 px-2 rounded cursor-pointer ${
                      isSelected
                        ? "bg-blue-100 border border-blue-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-xs">
                        {altGroup.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageItemSelector;
