import { useState } from "react";
import Select from "react-select";
import { useGetItems } from "../api/admin/admin.api";

const mealTypeLists = [
  {
    mealType: "Breakfast",
    start_time: "9:00",
    end_titme: "10:00",
  },
  {
    mealType: "Dinner",
    start_time: "9:00",
    end_titme: "10:00",
  },
];

const scheduleList = [
  {
    day: "Sat",
    mealType: "Breakfast",
    start_time: "9:00",
    end_time: "10:00",
    items: [
      {
        _id: 1,
        title: "vat",
        price: 3,
      },
    ],
  },
];

const MealScheduleTable = ({ totalPrice }) => {
  const { data: items = [] } = useGetItems();
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const [meals, setMeals] = useState([]);

  const [activeMeals, setActiveMeals] = useState(meals);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [newMealInput, setNewMealInput] = useState("");

  const [scheduleMap, setScheduleMap] = useState({});
  const [mealTimes, setMealTimes] = useState({});

  const itemOptions = items.map((item) => ({
    value: item,
    label: `${item.title} - ${+item.price + +totalPrice} TK`,
    title: item.title,
  }));

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

    if (selectedMeal === "Other" && !meals.includes(finalMealName)) {
      setMeals((prev) => [...prev, finalMealName]);
      setActiveMeals((prev) => [...prev, finalMealName]);
    }

    const selectedItemsList = selectedOptions.map((opt) => opt.title);

    setScheduleMap((prev) => ({
      ...prev,
      [selectedDay]: {
        ...(prev[selectedDay] || {}),
        [finalMealName]: { items: selectedItemsList, startTime, endTime },
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
  };

  const toggleMealColumn = (mealName) => {
    setActiveMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((m) => m !== mealName)
        : [...prev, mealName],
    );
  };

  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${min} ${ampm}`;
  };

  return (
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
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
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
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
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
            className="mt-4 w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
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
            className="shadow-sm"
          />
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
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
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
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="w-full mt-6 cursor-pointer bg-orange-600 text-white py-3 font-bold rounded-lg hover:bg-orange-700 transition"
        >
          Create Schedule
        </button>
      </div>

      {/* MEAL TOGGLE */}
      {meals?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {meals.map((meal) => (
            <div
              key={meal}
              className="bg-white border flex flex-col items-center border-gray-200 rounded-xl p-5 w-48 shadow hover:shadow-lg transition"
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

      {/* DYNAMIC TABLE */}
      {meals?.length > 0 && (
        <div className="max-w-7xl mx-auto overflow-x-auto border border-gray-200 rounded-xl shadow-lg">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-orange-600 text-white sticky top-0">
              <tr>
                <th className="p-4 border border-orange-700 text-center w-32">
                  Day
                </th>
                {activeMeals.map((meal) => (
                  <th
                    key={meal}
                    className="p-4 border border-orange-700 text-center"
                  >
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day) => (
                <tr key={day} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold border border-gray-200 text-center bg-gray-100">
                    {day}
                  </td>
                  {activeMeals.map((meal) => {
                    const data = scheduleMap[day]?.[meal];
                    return (
                      <td
                        key={meal}
                        className="p-4 border border-gray-200 align-top max-w-[200px]"
                      >
                        {data ? (
                          <div>
                            <ul className="flex flex-wrap gap-2">
                              {data.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-xs bg-orange-50 p-1 border border-gray-200 rounded font-semibold"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic text-center py-4">
                            Empty
                          </p>
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
    </div>
  );
};

export default MealScheduleTable;
