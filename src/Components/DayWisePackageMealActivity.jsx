import React, { useState } from "react";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../api/cms/user.hook";
import { FaCalendarAlt } from "react-icons/fa";
import { Plus, X } from "lucide-react";

import DayWiseUserMealSummary from "./DayWiseUserMealSummary";
import ItemsSelector from "./ItemsSelector";
import PackageItemSelector from "./PackageItemSelector";
import DayWiseUserPackageMealSummary from "./DayWiseUserMealSummary copy";

const DayWisePackageMealActivity = () => {
  const { user } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const routine = data?.packages;
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortByToday = (data) => {
    const today = new Date().getDay();
    return data?.sort((a, b) => {
      const aIndex = weekDays.indexOf(a.day);
      const bIndex = weekDays.indexOf(b.day);
      return ((aIndex - today + 7) % 7) - ((bIndex - today + 7) % 7);
    });
  };

  const sortedMeals = sortByToday(routine?.package_routine);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(weekDays[d.getDay()]);
    }
    return days;
  };

  // 7 days with month
  const getNext7DaysWithDates = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        day: weekDays[d.getDay()],
        date: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
      });
    }
    return days;
  };

  const [selectedDays, setSelectedDays] = useState([getNext7Days()[0]]);
  const [activeDayView, setActiveDayView] = useState(getNext7Days()[0]);

  const selectedMeals = sortedMeals?.filter(
    (item) => item?.day === activeDayView,
  );

  console.log(selectedMeals);

  const getKey = (meal) => `${meal.day}-${meal.package_title}`;

  // Regular Meal State
  const [openKey, setOpenKey] = useState(null);
  const [selectedGroupMap, setSelectedGroupMap] = useState({});
  const [useAlternativeMap, setUseAlternativeMap] = useState({});
  //  Default OFF (undefined/false = OFF)
  const [mealOnOffMap, setMealOnOffMap] = useState({});

  const handleSelect = (key, groupIndex) => {
    setSelectedGroupMap((prev) => ({ ...prev, [key]: groupIndex }));
    setOpenKey(null);
  };

  const handleCheckboxToggle = (key) => {
    setUseAlternativeMap((prev) => ({ ...prev, [key]: !prev[key] }));
    setSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
    setOpenKey(null);
  };

  //  Updated toggle — default OFF
  const handleMealToggle = (key) => {
    setMealOnOffMap((prev) => ({
      ...prev,
      [key]: prev[key] !== true,
    }));
  };

  //  Default OFF — undefined/false
  const isMealOn = (key) => mealOnOffMap[key] === true;

  // Guest Meal State
  const [guestOpenKey, setGuestOpenKey] = useState(null);
  const [guestSelectedGroupMap, setGuestSelectedGroupMap] = useState({});
  const [guestUseAlternativeMap, setGuestUseAlternativeMap] = useState({});
  const [guestQuantityMap, setGuestQuantityMap] = useState({});
  const [guestEnabledMap, setGuestEnabledMap] = useState({});

  const handleGuestSelect = (key, groupIndex) => {
    setGuestSelectedGroupMap((prev) => ({ ...prev, [key]: groupIndex }));
    setGuestOpenKey(null);
  };

  const handleGuestCheckboxToggle = (key) => {
    setGuestUseAlternativeMap((prev) => ({ ...prev, [key]: !prev[key] }));
    setGuestSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
    setGuestOpenKey(null);
  };

  const handleQuantityChange = (key, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setGuestQuantityMap((prev) => ({ ...prev, [key]: qty }));
  };

  const handleAddGuest = (key) => {
    setGuestEnabledMap((prev) => ({ ...prev, [key]: true }));
    setGuestQuantityMap((prev) => ({ ...prev, [key]: 1 }));
  };

  const handleRemoveGuest = (key) => {
    setGuestEnabledMap((prev) => ({ ...prev, [key]: false }));
    setGuestSelectedGroupMap((prev) => ({ ...prev, [key]: undefined }));
    setGuestUseAlternativeMap((prev) => ({ ...prev, [key]: false }));
    setGuestQuantityMap((prev) => ({ ...prev, [key]: 1 }));
    setGuestOpenKey(null);
  };

  const getMealTypeGradient = (type) => {
    switch (type?.toLowerCase()) {
      case "breakfast":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "lunch":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "dinner":
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-orange-500";
    }
  };

  const handleUpdate = () => {
    const allSelectedMeals = sortedMeals?.filter((item) =>
      selectedDays.includes(item?.day),
    );

    const finalSelections = allSelectedMeals
      ?.filter((meal) => isMealOn(getKey(meal)))
      ?.map((meal) => {
        const key = getKey(meal);
        const isAlternative = !!useAlternativeMap[key];
        const altGroupIndex = selectedGroupMap[key];

        return {
          day: meal.day,
          meal_type: meal.meal_type,
          is_on: true,
          selected_items: isAlternative
            ? (meal?.alternative_items?.[altGroupIndex] ?? [])
            : (meal?.items ?? []),
          is_alternative: isAlternative,
        };
      });

    const finalGuestSelections = allSelectedMeals
      ?.filter((meal) => guestEnabledMap[getKey(meal)])
      ?.map((meal) => {
        const key = getKey(meal);
        const isAlternative = !!guestUseAlternativeMap[key];
        const altGroupIndex = guestSelectedGroupMap[key];

        return {
          day: meal.day,
          meal_type: meal.meal_type,
          selected_items: isAlternative
            ? (meal?.alternative_items?.[altGroupIndex] ?? [])
            : (meal?.items ?? []),
          is_alternative: isAlternative,
          quantity: guestQuantityMap[key] ?? 1,
        };
      });
  };

  // Meal Item Selector

  return (
    <>
      <div className="space-y-4">
        <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
          {/* Sidebar Calendar */}
          <aside className="bg-white p-3 rounded-xl shadow w-[260px] h-[360px]">
            <div className="flex flex-col gap-1 mb-2">
              <h2 className="flex items-center justify-center gap-3 font-bold">
                <span>
                  <FaCalendarAlt />
                </span>
                Meal Calendar
              </h2>
              <p className="text-xs text-gray-500 text-center">
                Please Select Your Meal Day
              </p>
            </div>
            <div className="flex flex-col justify-center">
              {getNext7DaysWithDates().map(({ day, date, month }, index) => {
                const isSelected = selectedDays.includes(day);
                const isViewing = activeDayView === day;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveDayView(day);
                      setSelectedDays((prev) =>
                        prev.includes(day)
                          ? prev.filter((d) => d !== day)
                          : [...prev, day],
                      );
                    }}
                    className={`flex items-center justify-between border-b border-gray-100 py-2 px-3 rounded-md cursor-pointer transition-colors ${
                      isViewing
                        ? "bg-orange-500 text-white"
                        : isSelected
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-orange-50 text-gray-700"
                    }`}
                  >
                    <span className="font-medium">{day}</span>
                    {/* Date */}
                    <span
                      className={`text-xs ${
                        isViewing ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {date} {month}
                    </span>
                    {isSelected && !isViewing && (
                      <span className="w-2 h-2 rounded-full bg-orange-400 ml-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="flex flex-col gap-3">
            {/* Regular Meal Header */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6">
              <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                Choose Your Meals
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select your preferred meals for the selected date(s)
              </p>
            </div>

            {/* Regular Meal Cards */}
            <div className="flex flex-wrap gap-3">
              {selectedMeals?.map((meal) => {
                const key = getKey(meal);
                const isOn = isMealOn(key);
                const isGuestAdded = !!guestEnabledMap[key];

                return (
                  <div
                    key={key}
                    className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[330px]"
                  >
                    {/* Meal Header + Toggle */}
                    <div
                      className={`px-3 py-3 rounded-xl text-white capitalize ${getMealTypeGradient(meal?.package_title)}`}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm lg:text-lg">
                          {meal?.package_title}
                        </h3>
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          {meal.day}
                        </span>
                        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
                          ৳0
                        </span>

                        {/* ON/OFF Toggle */}
                        <button
                          onClick={() => handleMealToggle(key)}
                          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                            isOn ? "bg-green-400" : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                              isOn ? "left-6" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex font-semibold justify-center mt-1">
                        <p>{meal?.start_time}</p>-<p>{meal?.end_time}</p>
                      </div>
                    </div>

                    {/* OFF overlay */}
                    <div
                      className={`mt-2 ${!isOn ? "opacity-40 pointer-events-none" : ""}`}
                    >
                      <PackageItemSelector
                        getKey={getKey}
                        meal={meal}
                        isGuest={false}
                        useAlternativeMap={useAlternativeMap}
                        guestUseAlternativeMap={guestUseAlternativeMap}
                        selectedGroupMap={selectedGroupMap}
                        guestSelectedGroupMap={guestSelectedGroupMap}
                        setGuestUseAlternativeMap={setGuestUseAlternativeMap}
                        setGuestSelectedGroupMap={setGuestSelectedGroupMap}
                        setUseAlternativeMap={setUseAlternativeMap}
                        setSelectedGroupMap={setSelectedGroupMap}
                        openKey={openKey}
                        setOpenKey={setOpenKey}
                        handleGuestSelect={handleGuestSelect}
                        handleGuestCheckboxToggle={handleGuestCheckboxToggle}
                        guestOpenKey={guestOpenKey}
                        handleSelect={handleSelect}
                        handleCheckboxToggle={handleCheckboxToggle}
                      />
                    </div>

                    {/* OFF message */}
                    {!isOn && (
                      <p className="text-center text-xs text-gray-400 mt-1">
                        This meal is turned OFF — won't be sent
                      </p>
                    )}

                    {/* Guest Section */}
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      {!isGuestAdded ? (
                        <button
                          onClick={() => handleAddGuest(key)}
                          className="flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-600 font-semibold"
                        >
                          <Plus size={14} />
                          Add Guest Meal
                        </button>
                      ) : (
                        <div className="bg-orange-50 rounded-xl p-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-orange-600">
                              Guest Meal
                            </span>
                            <button
                              onClick={() => handleRemoveGuest(key)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <PackageItemSelector
                            meal={meal}
                            isGuest={true}
                            useAlternativeMap={useAlternativeMap}
                            guestUseAlternativeMap={guestUseAlternativeMap}
                            selectedGroupMap={selectedGroupMap}
                            guestSelectedGroupMap={guestSelectedGroupMap}
                            setGuestUseAlternativeMap={
                              setGuestUseAlternativeMap
                            }
                            setGuestSelectedGroupMap={setGuestSelectedGroupMap}
                            setUseAlternativeMap={setUseAlternativeMap}
                            setSelectedGroupMap={setSelectedGroupMap}
                            openKey={openKey}
                            setOpenKey={setOpenKey}
                            handleGuestSelect={handleGuestSelect}
                            handleGuestCheckboxToggle={
                              handleGuestCheckboxToggle
                            }
                            guestOpenKey={guestOpenKey}
                            handleSelect={handleSelect}
                            handleCheckboxToggle={handleCheckboxToggle}
                            setGuestOpenKey={setGuestOpenKey}
                          />

                          {/* Quantity */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              Quantity:
                            </span>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    key,
                                    (guestQuantityMap[key] ?? 1) - 1,
                                  )
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min={1}
                                value={guestQuantityMap[key] ?? 1}
                                onChange={(e) =>
                                  handleQuantityChange(key, e.target.value)
                                }
                                className="w-12 text-center text-sm py-1 border-x border-gray-200 outline-none bg-white"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    key,
                                    (guestQuantityMap[key] ?? 1) + 1,
                                  )
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdate}
              className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <DayWiseUserPackageMealSummary
          sortedMeals={sortedMeals}
          getKey={getKey}
          useAlternativeMap={useAlternativeMap}
          selectedGroupMap={selectedGroupMap}
          guestUseAlternativeMap={guestUseAlternativeMap}
          guestEnabledMap={guestEnabledMap}
          getNext7Days={getNext7Days}
          getNext7DaysWithDates={getNext7DaysWithDates()}
          guestSelectedGroupMap={guestSelectedGroupMap}
          isMealOn={isMealOn}
          guestQuantityMap={guestQuantityMap}
        />
      </div>
    </>
  );
};

export default DayWisePackageMealActivity;
