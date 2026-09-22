import React, { useEffect, useState } from "react";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import {
  useAllwiseGetMealList,
  useDaywiseGetMealList,
  useDaywiseUserCreateMeal,
  useGetMealOnOffTime,
  useInstituteUserAdminData,
} from "../api/cms/user.hook";
import { FaCalendarAlt } from "react-icons/fa";
import { Plus, X } from "lucide-react";

import PackageItemSelector from "./PackageItemSelector";
import DayWiseUserPackageMealSummary from "./DayWiseUserPackageMealSummary";

const DayWisePackageMealActivity = ({ allWise }) => {
  const { user } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);
  const { data: mealOnOffTime } = useGetMealOnOffTime();

  const routine = data?.packages;

  const { mutateAsync, isPending } = useDaywiseUserCreateMeal();

  const { data: daywiseMealData, isLoading } = useDaywiseGetMealList();

  // All (প্রতি সপ্তাহে চলতে থাকা baseline)
  const { data: allWiseMealData } = useAllwiseGetMealList();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      days.push({
        day: weekDays[d.getDay()],
        date: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        dateStr: `${d.getFullYear()}-${mm}-${dd}`, // "YYYY-MM-DD"
      });
    }
    return days;
  };

  const [activeDayView, setActiveDayView] = useState(getNext7Days()[0]);

  // weekday → তারিখ ("Monday" → "2026-09-21"). ৭ দিনে প্রতিটা weekday একবারই আসে।
  const dateByDay = {};
  getNext7DaysWithDates().forEach((d) => {
    dateByDay[d.day] = d.dateStr;
  });

  const selectedMeals = sortedMeals?.filter(
    (item) => item?.day === activeDayView,
  );

  const getKey = (meal) => `${meal.day}-${meal.package_title}`;

  // Regular Meal State
  const [openKey, setOpenKey] = useState(null);
  const [selectedGroupMap, setSelectedGroupMap] = useState({});
  const [useAlternativeMap, setUseAlternativeMap] = useState({});
  //  Default OFF (undefined/false = OFF)
  const [mealOnOffMap, setMealOnOffMap] = useState({});
  // All এ যেগুলো ON (প্রতি সপ্তাহের baseline)
  const [baseOnMap, setBaseOnMap] = useState({});

  // is_attendance
  const [mealAttandence, setMealAttandence] = useState({});

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
  const isMealAttendence = (key) => mealAttandence[key] === true;

  // এই তারিখে কোনো meal ON আছে কিনা (calendar এর ✓ এর জন্য — All এর মতোই)
  const isDayOn = (day) =>
    !!sortedMeals?.some((m) => m.day === day && isMealOn(getKey(m)));

  // ── Parent switch (active date) ──
  const isParentOn = !!selectedMeals?.some((m) => isMealOn(getKey(m)));

  const handleParentToggle = async () => {
    const prevOn = mealOnOffMap;
    const nextOn = { ...prevOn };

    if (isParentOn) {
      // OFF: শুধু এই তারিখের সব meal OFF
      selectedMeals?.forEach((m) => {
        nextOn[getKey(m)] = false;
      });
    } else {
      // ON: All এ যেগুলো ON ছিল সেগুলো ON। All এ কিছুই ON না থাকলে সব ON
      const hasBase = selectedMeals?.some(
        (m) => baseOnMap[getKey(m)] === true,
      );
      selectedMeals?.forEach((m) => {
        const k = getKey(m);
        nextOn[k] = hasBase ? baseOnMap[k] === true : true;
      });
    }

    setMealOnOffMap(nextOn);

    try {
      await saveMeals(nextOn);
    } catch (err) {
      setMealOnOffMap(prevOn);
    }
  };
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

  useEffect(() => {
    const newMealOnOffMap = {};
    const newBaseOnMap = {};
    const newUseAlternativeMap = {};
    const newGuestEnabledMap = {};
    const newGuestQuantityMap = {};
    const newMealAttendanceMap = {};

    const applyMeal = (meal) => {
      const key = `${meal.day}-${meal.meal_type}`;
      newMealOnOffMap[key] = meal.is_on === true;
      newMealAttendanceMap[key] = meal.is_attendance;
      newUseAlternativeMap[key] = meal.is_alternative;
      if (meal.guest_quantity > 0) {
        newGuestEnabledMap[key] = true;
        newGuestQuantityMap[key] = meal.guest_quantity;
      } else {
        newGuestEnabledMap[key] = false;
      }
    };

    // 1) প্রথমে All (baseline) — প্রতি সপ্তাহে যা চলে
    allWiseMealData?.meals?.forEach((meal) => {
      newBaseOnMap[`${meal.day}-${meal.meal_type}`] = meal.is_on === true;
      applyMeal(meal);
    });

    // 2) তারপর Day Wise override — শুধু আগামী ৭ দিনের নির্দিষ্ট তারিখের জন্য
    daywiseMealData?.meals?.forEach((meal) => {
      if (!meal.date || dateByDay[meal.day] !== meal.date) return;
      applyMeal(meal);
    });

    setMealOnOffMap(newMealOnOffMap);
    setBaseOnMap(newBaseOnMap);
    setUseAlternativeMap(newUseAlternativeMap);
    setGuestEnabledMap(newGuestEnabledMap);
    setGuestQuantityMap(newGuestQuantityMap);
    setMealAttandence(newMealAttendanceMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daywiseMealData, allWiseMealData]);

  // ৭ দিনের সব meal পাঠানো হয়। backend শুধু All থেকে আলাদা গুলো override হিসেবে রাখে।
  const saveMeals = async (onMap) => {
    const allMeals = sortedMeals?.filter((item) => !!dateByDay[item?.day]);

    const finalSelections = allMeals?.map((meal) => {
      const key = getKey(meal);
      const isAlternative = !!useAlternativeMap[key];
      const isGuestAlternative = !!guestUseAlternativeMap[key];
      const altGuestGroupIndex = guestSelectedGroupMap[key];
      const altGroupIndex = selectedGroupMap[key];

      const isGuestEnabled = guestEnabledMap[key];

      return {
        day: meal.day,
        date: dateByDay[meal.day],
        meal_type: meal.package_title,
        is_on: onMap[key] === true,
        package_price: meal.package_price,
        start_time: meal.start_time,
        end_time: meal.end_time,
        selected_items: isAlternative
          ? ([meal?.alternative_items?.[altGroupIndex]] ?? [])
          : (meal?.package_item ?? []),
        guest_items: isGuestEnabled
          ? isGuestAlternative
            ? ([meal?.alternative_items?.[altGuestGroupIndex]] ?? [])
            : (meal?.package_item ?? [])
          : [],
        is_alternative: isAlternative,
        guest_quantity: isGuestEnabled ? (guestQuantityMap[key] ?? 1) : 0,
      };
    });

    const payload = {
      type: allWise,
      routine_type: "Package",
      meals: finalSelections,
    };

    await mutateAsync(payload);
  };

  // Update button এর জন্য
  const handleUpdate = () => saveMeals(mealOnOffMap);

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
                // ✓ = এই তারিখে অন্তত একটা meal ON আছে (All এর মতো)
                const isSelected = isDayOn(day);

                const isViewing = activeDayView === day;
                const isToday = index === 0;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveDayView(day);
                    }}
                    className={`
        flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer
        transition-all duration-200 border
        ${
          isViewing
            ? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.02]"
            : isSelected
              ? "bg-orange-100 text-orange-700 border-orange-300 font-semibold"
              : "hover:bg-gray-50 text-gray-600 border-transparent"
        }
      `}
                  >
                    {/* Left: Day + Today badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm w-auto">
                        {day}
                      </span>
                      {isToday && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
              ${isViewing ? "bg-white/25 text-white" : "bg-orange-200 text-orange-600"}
            `}
                        >
                          Today
                        </span>
                      )}
                    </div>

                    {/* Right: Date + Checkmark */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs ${isViewing ? "text-white/80" : "text-gray-400"}`}
                      >
                        {date} {month}
                      </span>

                      {/* Selected checkmark — clearly visible */}
                      {isSelected ? (
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0
              ${isViewing ? "bg-white text-orange-500" : "bg-orange-400 text-white"}
            `}
                        >
                          ✓
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                      )}
                    </div>
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
              <h6 className="bg-yellow-100 mt-2 text-yellow-800 px-3 py-2 rounded-md font-medium inline-block">
                ⏰ Meals can be turned on or off up to{" "}
                <span className="font-bold">
                  {mealOnOffTime?.meal_on_off_time} hours
                </span>{" "}
                before the start time.
              </h6>

              {/* Parent switch — শুধু এই তারিখের জন্য */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  {activeDayView} Meal Service ON / OFF
                </span>
                <button
                  type="button"
                  onClick={handleParentToggle}
                  disabled={!selectedMeals?.length}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                    isParentOn ? "bg-green-400" : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                      isParentOn ? "left-6" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Regular Meal Cards */}
            <div className="flex flex-wrap gap-3">
              {selectedMeals?.map((meal) => {
                const key = getKey(meal);
                const isOn = isMealOn(key);
                const isGuestAdded = !!guestEnabledMap[key];
                const isMealAttendences = isMealAttendence(key);
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
                          ৳{meal?.package_price}
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
                    <div className="flex flex-col items-end gap-0.5">
                      <h6 className="text-black font-semibold text-xs">
                        Attendance Status
                      </h6>
                      <button
                        disabled
                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                          isMealAttendences ? "bg-green-400" : "bg-gray-400"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                            isMealAttendences ? "left-6" : "left-0.5"
                          }`}
                        />
                      </button>
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
              disabled={isPending}
              className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
            >
              {isPending ? "Updating.." : "Update"}
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
