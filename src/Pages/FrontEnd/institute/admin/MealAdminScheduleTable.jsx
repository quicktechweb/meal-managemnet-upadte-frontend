import { useState, useEffect } from "react";
import Select from "react-select";
import { useGetItems } from "../../../../api/admin/admin.api";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { useForm } from "react-hook-form";
import { useInstituteRegistration } from "../../../../api/auth/auth.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FaMinus, FaPlus } from "react-icons/fa";
import { components } from "react-select";
const MealAdminScheduleTable = () => {
  const { handleSubmit } = useForm();
  const { mutateAsync, isPending } = useInstituteRegistration();

  const { user } = useInstituteAuth();

  const { data: items = [] } = useGetItems();
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  // States
  const [mealTypeLists, setMealTypeLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeMeals, setActiveMeals] = useState([]);
  const [scheduleMap, setScheduleMap] = useState({});
  const [mealTimes, setMealTimes] = useState({});

  // Form states
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [alternativeGroups, setAlternativeGroups] = useState([[]]);
  const [activeAlternatives, setActiveAlternatives] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [newMealInput, setNewMealInput] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const itemOptions = items?.map((item) => ({
    value: item,
    label: item.title,
    price: +item.price + +user?.user?.services?.total_amount,
    image: item.image,
    ingridents: item.ingridents,
    video: item.video,
  }));

  const alternativeOptions = items?.map((item) => ({
    value: item,
    label: item.title,
    price: +item.price + +user?.user?.services?.total_amount,
    image: item.image,
    ingridents: item.ingridents,
    video: item.video,
  }));

  // Custom option
  const CustomOption = (props) => {
    const { data } = props;

    return (
      <div
        {...props.innerProps}
        className="flex items-center justify-between gap-3 p-2 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={data.label}
            className="w-10 h-10 rounded object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold">{data.label}</span>
            <span className="text-xs text-orange-600">৳{data.price}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(data);
          }}
          className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
        >
          Details
        </button>
      </div>
    );
  };

  const alternativeCustomOption = (props) => {
    const { data } = props;

    return (
      <div
        {...props.innerProps}
        className="flex items-center justify-between gap-3 p-2 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={data.label}
            className="w-10 h-10 rounded object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold">{data.label}</span>
            <span className="text-xs text-orange-600">৳{data.price}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(data);
          }}
          className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
        >
          Details
        </button>
      </div>
    );
  };

  const CustomMultiValueLabel = (props) => {
    const { data } = props;

    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center gap-1">
          <img
            src={data.image}
            alt={data.label}
            className="w-4 h-4 rounded object-cover"
          />
          <span>{data.label}</span>
          <span className="text-orange-600 text-xs">(৳{data.price})</span>
        </div>
      </components.MultiValueLabel>
    );
  };

  const alternativeCustomMultiValueLabel = (props) => {
    const { data } = props;

    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center gap-1">
          <img
            src={data.image}
            alt={data.label}
            className="w-4 h-4 rounded object-cover"
          />
          <span>{data.label}</span>
          <span className="text-orange-600 text-xs">(৳{data.price})</span>
        </div>
      </components.MultiValueLabel>
    );
  };

  // Create meal & schedule
  const handleCreate = () => {
    const finalMealName =
      selectedMeal === "Other" ? newMealInput.trim() : selectedMeal;

    if (
      !selectedDay ||
      !finalMealName ||
      selectedOptions.length === 0 ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill all fields properly");
      return;
    }

    // Add new meal
    if (!meals.includes(finalMealName)) {
      setMeals((prev) => [...prev, finalMealName]);
      setActiveMeals((prev) => [...prev, finalMealName]);
    }

    // Add to mealTypeLists
    if (!mealTypeLists.some((m) => m.meal_type === finalMealName)) {
      setMealTypeLists((prev) => [
        ...prev,
        {
          meal_type: finalMealName,
          start_time: startTime,
          end_time: endTime,
          items: selectedItemsList,
          status: "active",
        },
      ]);
    }

    // Prepare items
    const selectedItemsList = selectedOptions.map((opt) => ({
      title: opt.label,
      price: +opt.price + +totalPrice,
      image: opt.image,
      video: opt.video,
      ingridents: opt.ingridents,
    }));

    //alternative selected item list

    const alternativeSelectedItemsList = alternativeGroups.map((group) =>
      group.map((opt) => ({
        title: opt.label,
        price: +opt.price + +totalPrice,
        image: opt.image,
        video: opt.video,
        ingridents: opt.ingridents,
      })),
    );

    // Add to scheduleList
    setScheduleList((prev) => [
      ...prev,
      {
        day: selectedDay,
        meal_type: finalMealName,
        start_time: startTime,
        end_time: endTime,
        items: selectedItemsList,
        alternative_items: alternativeSelectedItemsList,
      },
    ]);

    alternativeSelectedItemsList.forEach((_, idx) => {
      setActiveAlternatives((prev) =>
        prev.includes(idx) ? prev : [...prev, idx],
      );
    });

    // Update table map
    setScheduleMap((prev) => ({
      ...prev,
      [selectedDay]: {
        ...(prev[selectedDay] || {}),
        [finalMealName]: {
          items: selectedItemsList.map((i) => i.title),
          startTime,
          endTime,
        },
      },
    }));

    // Update mealTimes for header/toggle
    setMealTimes((prev) => ({
      ...prev,
      [finalMealName]: { startTime, endTime },
    }));

    // Reset form
    setSelectedOptions([]);
    setAlternativeGroups([[]]);
    setStartTime("");
    setEndTime("");
    setNewMealInput("");
    setSelectedMeal("");
    setSelectedDay("");
  };

  // Toggle meal column
  const toggleMealColumn = (mealName) => {
    setActiveMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((m) => m !== mealName)
        : [...prev, mealName],
    );
  };

  // Format time
  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${min} ${ampm}`;
  };
  /* ---------------- LOAD ROUTINE DATA ---------------- */

  useEffect(() => {
    const routine = user?.user?.routine;

    if (!routine) return;

    const mealTypes = routine?.meal_type_lists || [];

    const schedules = routine?.schedule_lists || [];

    const mealNames = mealTypes.map((m) => m.meal_type);

    setMeals(mealNames);
    setActiveMeals(mealNames);

    const times = {};
    mealTypes.forEach((m) => {
      times[m.meal_type] = {
        startTime: m.start_time,
        endTime: m.end_time,
      };
    });

    setMealTimes(times);

    const map = {};

    schedules.forEach((s) => {
      if (!map[s.day]) map[s.day] = {};

      map[s.day][s.meal_type] = {
        items: s.items.map((i) => i.title),
        startTime: s.start_time,
        endTime: s.end_time,
      };
    });

    const maxAlts = Math.max(
      0,
      ...schedules.map((s) => s.alternative_items?.length || 0),
    );
    const altIndices = Array.from({ length: maxAlts }, (_, i) => i);
    setActiveAlternatives(altIndices);

    setScheduleMap(map);

    setMealTypeLists(mealTypes);
    setScheduleList(schedules);
  }, [user]);

  const query = useQueryClient();

  const onSubmit = async (data) => {
    const payload = {
      meal_type_lists: mealTypeLists,
      schedule_lists: scheduleList,
      registration_step: 3,
    };

    await mutateAsync(
      { userId: user?.user?._id, routine: { ...payload } },
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-gray-50">
      {/* CREATE FORM */}

      <div className="p-8 bg-gray-50">
        {/* CREATE FORM */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 uppercase tracking-wide">
            Create Meal & Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Day</option>
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Meal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meal Type
              </label>
              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Meal</option>
                {meals.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
                <option value="Other">+ Create New</option>
              </select>
            </div>
          </div>

          {selectedMeal === "Other" && (
            <input
              type="text"
              placeholder="Enter new meal name"
              className="mt-4 w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
              value={newMealInput}
              onChange={(e) => setNewMealInput(e.target.value)}
            />
          )}

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Items
            </label>
            <Select
              isMulti
              options={itemOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
              components={{
                Option: CustomOption,
                MultiValueLabel: CustomMultiValueLabel,
              }}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alternative Items
            </label>

            {alternativeGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-2 mb-3">
                <div className="flex-1">
                  <Select
                    isMulti
                    options={alternativeOptions}
                    value={group}
                    onChange={(newValues) => {
                      if (newValues.length <= selectedOptions.length) {
                        const updated = [...alternativeGroups];
                        updated[groupIndex] = newValues;
                        setAlternativeGroups(updated);
                      } else {
                        toast.error(
                          `Maximum ${selectedOptions.length}টি alternative item select করা যাবে!`,
                          {
                            duration: 3000,
                            position: "top-right",
                            style: {
                              background: "#f97316",
                              color: "#fff",
                              fontWeight: "600",
                            },
                            iconTheme: {
                              primary: "#fff",
                              secondary: "#f97316",
                            },
                          },
                        );
                      }
                    }}
                    isDisabled={selectedOptions.length === 0}
                    placeholder={
                      selectedOptions.length === 0
                        ? "First select items above..."
                        : `Alternative group ${groupIndex + 1}...`
                    }
                    components={{
                      Option: alternativeCustomOption,
                      MultiValueLabel: alternativeCustomMultiValueLabel,
                    }}
                  />
                </div>

                {/* Remove button */}
                {groupIndex > 0 && (
                  <button
                    onClick={() => {
                      const updated = alternativeGroups.filter(
                        (_, i) => i !== groupIndex,
                      );
                      setAlternativeGroups(updated);
                    }}
                    className="w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <FaMinus />
                  </button>
                )}

                {/* Add button */}
                {groupIndex === alternativeGroups.length - 1 && (
                  <button
                    onClick={() =>
                      setAlternativeGroups((prev) => [...prev, []])
                    }
                    className="w-8 h-8 rounded-full bg-orange-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCreate}
              className="flex-1 cursor-pointer bg-orange-600 text-white py-3 font-bold rounded-lg hover:bg-orange-700 transition"
            >
              Create Schedule
            </button>
          </div>
        </div>

        {/* MEAL TOGGLE */}
        {meals.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {meals.map((meal) => (
              <div
                key={meal}
                className="bg-white border flex flex-col items-center  border-gray-200 rounded-xl p-5 w-48 shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-800 uppercase text-sm mb-2">
                  {meal}
                </h3>
                {mealTimes[meal] && (
                  <p className="text-xs text-orange-600 font-bold mb-3">
                    {formatTime12(mealTimes[meal].startTime)} -{" "}
                    {formatTime12(mealTimes[meal].endTime)}
                  </p>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={activeMeals.includes(meal)}
                    onChange={() => toggleMealColumn(meal)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* DYNAMIC TABLE WITH TIMES */}
        {activeMeals.length > 0 && (
          <div className="max-w-7xl mx-auto overflow-x-auto border border-gray-200 rounded-xl shadow-lg">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-orange-600 text-white sticky top-0">
                <tr>
                  <th className="p-4 border border-orange-700 w-32">Day</th>
                  {activeMeals.map((meal) => (
                    <th
                      key={meal}
                      className="p-4 border border-orange-700 w-32"
                    >
                      {meal}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {days.map((day) => (
                  <tr key={day} className="hover:bg-slate-50">
                    <td className="py-6 px-6 font-bold">{day}</td>
                    {activeMeals.map((meal) => {
                      const schedule = scheduleList.find(
                        (s) => s.day === day && s.meal_type === meal,
                      );

                      console.log(schedule);

                      return (
                        <td key={meal} className="py-6 px-6">
                          {schedule ? (
                            <div className="flex flex-col gap-3">
                              {/* Main Items */}
                              <div className="flex flex-wrap gap-1">
                                {schedule.items.map((item) => (
                                  <span
                                    key={item.title}
                                    className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium"
                                  >
                                    {item.title} (৳{item.price})
                                  </span>
                                ))}
                              </div>

                              {/* Active Alternative Groups */}
                              {activeAlternatives.length > 0 && (
                                <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
                                  {activeAlternatives.map((altIdx) => {
                                    const group =
                                      schedule.alternative_items?.[altIdx];
                                    if (!group || group.length === 0)
                                      return null;
                                    return (
                                      <div
                                        key={altIdx}
                                        className="flex flex-wrap gap-1 items-center"
                                      >
                                        <span className="text-xs text-gray-400 font-semibold mr-1">
                                          Alt {altIdx + 1}:
                                        </span>
                                        {group.map((item) => (
                                          <span
                                            key={item.title}
                                            className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium"
                                          >
                                            {item.title} (৳{item.price})
                                          </span>
                                        ))}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              No Schedule yet
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay with Blur */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[800px] transform transition-all animate-in fade-in zoom-in duration-300 h-[90vh] overflow-y-auto ">
              {/* Close Button (Top Right) */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-md hover:bg-red-50 text-gray-600 hover:text-red-500 p-2 rounded-full transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              {/* Image Section */}
              <div className="relative h-56 w-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.label}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 pt-5 flex flex-col h-[calc(90vh-224px)] justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                      {selectedItem.label}
                    </h2>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold text-lg">
                      ৳{selectedItem.price}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="space-y-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedItem?.ingridents ||
                            "No ingredients listed.",
                        }}
                        className="text-gray-600 leading-relaxed text-sm 
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 
              [&_h1]:text-lg [&_h2]:text-lg [&_h3]:text-md [&_h1]:font-bold [&_h4]:text-md"
                      />
                    </div>

                    <div className="w-[300px] h-[190px] aspect-video rounded-md">
                      <video
                        src={selectedItem.video}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}

                <div className="pb-5">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="mt-8  w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-200"
                  >
                    Got it, Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 px-8 cursor-pointer bg-orange-600 text-white py-3 rounded-lg"
        >
          {isPending ? "Updating..." : "Update Meal Routine"}
        </button>
      </div>
    </form>
  );
};

export default MealAdminScheduleTable;
