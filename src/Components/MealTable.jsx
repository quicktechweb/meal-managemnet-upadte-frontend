import { useState } from "react";
import Select from "react-select";
import { useGetItems } from "../api/admin/admin.api";

const MealScheduleTable = ({
  totalPrice,
  mealTypeLists,
  setMealTypeLists,
  scheduleList,
  setScheduleList,
}) => {
  const { data: items = [] } = useGetItems();
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  // States

  const [meals, setMeals] = useState([]);
  const [activeMeals, setActiveMeals] = useState([]);
  const [scheduleMap, setScheduleMap] = useState({});
  const [mealTimes, setMealTimes] = useState({});

  // Form states
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [newMealInput, setNewMealInput] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  console.log(selectedItem);

  const itemOptions = items?.map((item) => ({
    value: item,
    label: item.title,
    price: +item.price + +totalPrice,
    image: item.image,
    ingridents: item.ingridents,
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
      title: opt.title,
      price: +opt.value.price + +totalPrice,
    }));

    // Add to scheduleList
    setScheduleList((prev) => [
      ...prev,
      {
        day: selectedDay,
        meal_type: finalMealName,
        start_time: startTime,
        end_time: endTime,
        items: selectedItemsList,
      },
    ]);

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
            components={{ Option: CustomOption }}
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
                  <th key={meal} className="p-4 border border-orange-700 w-32">
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
                    return (
                      <td key={meal} className="py-6 px-6">
                        {schedule ? (
                          <div className="flex items-center flex-wrap max-w-[350px] gap-1">
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

                <div className="space-y-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedItem?.ingridents || "No ingredients listed.",
                    }}
                    className="text-gray-600 leading-relaxed text-sm 
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 
              [&_h1]:text-lg [&_h2]:text-lg [&_h3]:text-md [&_h1]:font-bold [&_h4]:text-md"
                  />
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
  );
};

export default MealScheduleTable;
