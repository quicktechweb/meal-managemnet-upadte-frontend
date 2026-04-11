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

  const useAlt = isGuest
    ? guestUseAlternativeMap?.[key]
    : useAlternativeMap?.[key];
  const selGroupMap = isGuest ? guestSelectedGroupMap : selectedGroupMap;
  const curOpenKey = isGuest ? guestOpenKey : openKey;

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

  return (
    <>
      {/* Default Items */}
      <button
        onClick={onDefaultClick}
        className="px-2 w-full flex cursor-pointer items-center gap-2.5 bg-gray-100 my-2 rounded-2xl py-2"
      >
        <FaCheckCircle
          className={`text-sm transition-colors flex-shrink-0 ${
            useAlt ? "text-gray-300" : "text-green-600"
          }`}
        />
        <div className="flex flex-wrap gap-1">
          {meal?.package_item?.map((foodItem, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="font-semibold text-xs">{foodItem.title}</span>

              {meal?.package_item?.length - 1 !== i && ","}
            </div>
          ))}
        </div>
      </button>
    </>
  );
};

export default PackageItemSelector;
