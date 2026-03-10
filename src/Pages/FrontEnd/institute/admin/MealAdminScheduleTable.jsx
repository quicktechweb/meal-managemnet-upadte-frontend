import { useState, useEffect } from "react";
import Select from "react-select";
import { useGetItems } from "../../../../api/admin/admin.api";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { useForm } from "react-hook-form";
import { useInstituteRegistration } from "../../../../api/auth/auth.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const MealAdminScheduleTable = () => {
  const { handleSubmit } = useForm();
  const { mutateAsync, isPending } = useInstituteRegistration();

  const { user } = useInstituteAuth();

  console.log(user);

  const { data: items = [] } = useGetItems();

  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [mealTypeLists, setMealTypeLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  console.log(mealTypeLists);

  console.log(scheduleList);

  const [meals, setMeals] = useState([]);

  console.log(meals);

  const [activeMeals, setActiveMeals] = useState([]);
  const [scheduleMap, setScheduleMap] = useState({});
  const [mealTimes, setMealTimes] = useState({});

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [newMealInput, setNewMealInput] = useState("");

  const itemOptions = items?.map((item) => ({
    value: item,
    label: `${item.title} - ${+item.price + user?.user?.services?.total_amount} TK`,
    title: item.title,
  }));

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

    setScheduleMap(map);

    setMealTypeLists(mealTypes);
    setScheduleList(schedules);
  }, [user]);

  /* ---------------- CREATE SCHEDULE ---------------- */

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

    if (!meals.includes(finalMealName)) {
      setMeals((prev) => [...prev, finalMealName]);
      setActiveMeals((prev) => [...prev, finalMealName]);
    }

    if (!mealTypeLists.some((m) => m.meal_type === finalMealName)) {
      setMealTypeLists((prev) => [
        ...prev,
        { meal_type: finalMealName, start_time: startTime, end_time: endTime },
      ]);
    }

    const selectedItemsList = selectedOptions.map((opt) => ({
      title: opt.title,
      price: opt.value.price + user?.user?.services?.total_amount,
    }));

    console.log(selectedItemsList);

    const newSchedule = {
      day: selectedDay,
      meal_type: finalMealName,
      start_time: startTime,
      end_time: endTime,
      items: selectedItemsList,
    };

    console.log("newscheduledata", newSchedule);

    setScheduleList((prev) => [...prev, newSchedule]);

    console.log("schedulelist", scheduleList);

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

    setMealTimes((prev) => ({
      ...prev,
      [finalMealName]: { startTime, endTime },
    }));

    setSelectedOptions([]);
    setStartTime("");
    setEndTime("");
    setNewMealInput("");
    setSelectedMeal("");
    setSelectedDay("");
  };

  /* ---------------- TOGGLE COLUMN ---------------- */

  const toggleMealColumn = (mealName) => {
    setActiveMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((m) => m !== mealName)
        : [...prev, mealName],
    );
  };

  /* ---------------- TIME FORMAT ---------------- */

  const formatTime12 = (time24) => {
    if (!time24) return "";

    const [hourStr, min] = time24.split(":");

    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${min} ${ampm}`;
  };

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

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 uppercase">
          Create and Update your Meal & Time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Day</label>

            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full border border-gray-200  rounded-lg p-2"
            >
              <option value="">Select Day</option>

              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Meal Type
            </label>

            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2"
            >
              <option value="">Select Meal</option>

              {meals.map((meal) => (
                <option key={meal}>{meal}</option>
              ))}

              <option value="Other">+ Create New</option>
            </select>
          </div>
        </div>

        {selectedMeal === "Other" && (
          <input
            type="text"
            placeholder="Enter new meal name"
            className="mt-4 w-full border border-gray-200 rounded-lg p-2"
            value={newMealInput}
            onChange={(e) => setNewMealInput(e.target.value)}
          />
        )}

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2">
            Select Items
          </label>

          <Select
            isMulti
            options={itemOptions}
            value={selectedOptions}
            onChange={setSelectedOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-200 rounded-lg p-2"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="mt-6 w-full cursor-pointer bg-orange-600 text-white py-3 rounded-lg"
        >
          Create Schedule
        </button>
      </div>

      {/* MEAL TOGGLE */}

      {meals.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {meals.map((meal) => (
            <div
              key={meal}
              className="bg-white flex flex-col gap-1.5 border border-gray-300 rounded-xl p-5 w-48 shadow"
            >
              <h3 className="font-semibold text-center">{meal}</h3>

              {mealTimes[meal] && (
                <p className="text-xs text-orange-600 text-center">
                  {formatTime12(mealTimes[meal].startTime)} -
                  {formatTime12(mealTimes[meal].endTime)}
                </p>
              )}
              <label className="relative  flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer "
                  checked={activeMeals.includes(meal)}
                  onChange={() => toggleMealColumn(meal)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* TABLE */}

      {activeMeals.length > 0 && (
        <div className="max-w-7xl mx-auto overflow-x-auto border border-gray-200 rounded-xl shadow">
          <table className="w-full bg-white">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4 text-left">Day</th>

                {activeMeals.map((meal) => (
                  <th key={meal} className="p-4 text-left">
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="p-4 font-bold">{day}</td>

                  {activeMeals.map((meal) => {
                    const schedule = scheduleList.find(
                      (s) => s.day === day && s.meal_type === meal,
                    );

                    return (
                      <td key={meal} className="p-4">
                        {schedule ? (
                          <div className="flex flex-col gap-1">
                            {schedule.items.map((item) => (
                              <p key={item.title}>
                                {item.title} (৳{item.price})
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">No Schedule yet</span>
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
