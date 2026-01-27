import { useMemo, useState, useRef } from "react";
import {
  FaSun,
  FaUtensils,
  FaMoon,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import PropTypes from "prop-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";
import Marquee from "react-fast-marquee";
import VideoSlider from "../../../../../Components/VideoSlider";
import AllMealActivity from "./AllMealActivity";

// ----------------- SCHEDULE -----------------
const schedule2 = [
  {
    day: "Sat",
    morning: ["Alu Vorta + Dal", "Egg + Ruti"],
    afternoon: ["Murgi + Mangsho + Dal", "Murgi + Mach + Dal"],
    night: ["Bhat, Alu (Dim-er shonge)", "Dal + Shobji"],
  },
  {
    day: "Sun",
    morning: ["Shobji Parota / Pitha"],
    afternoon: ["Mach (Bhaji/Porha) + Dal"],
    night: ["Murgir Jhol + Bhaja Shobji"],
  },
  {
    day: "Mon",
    morning: ["Nesco/Soup + Bhat/Parota"],
    afternoon: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
    night: ["Bhat, Dal + Alu Vorta"],
  },
  {
    day: "Tue",
    morning: ["Alu Vorta + Dal"],
    afternoon: ["Mach (Bhaji/Porha) + Dal"],
    night: ["Bhat + Dim"],
  },
  {
    day: "Wed",
    morning: ["Shobji + Dal / Nesco + Dal"],
    afternoon: ["Murgi + Mach + Dal"],
    night: ["Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Thu",
    morning: ["Alu, Piaj Vorta + Dal"],
    afternoon: ["Mach + Dal"],
    night: ["Murgir Jhol + Shobji Lettuce"],
  },
  {
    day: "Fri",
    morning: ["Ruti + Shobji/ Ruti + Dal"],
    afternoon: ["Gorur Mangsho/Prani Jhol"],
    night: ["Bhat, Dim + Shobji (Shak, Mushroom)"],
  },
];

// ----------------- DATE CALCULATIONS -----------------
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ----------------- MEAL PLANS -----------------
const mealPlans = Array.from({ length: daysInMonth }, (_, i) => {
  const dateObj = new Date(year, month, i + 1);
  const dayName = weekDays[dateObj.getDay()];
  const daySchedule = schedule2.find((s) => s.day === dayName);

  return {
    date: `2026-01-${String(i + 1).padStart(2, "0")} (${dayName})`,
    breakfast: { price: 80, options: daySchedule.morning },
    lunch: { price: 150, options: daySchedule.afternoon },
    dinner: { price: 120, options: daySchedule.night },
  };
});

// ----------------- MEAL CARD -----------------
const MealCard = ({
  title,
  icon,
  data,
  gradient,
  selected,
  onToggle,
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
}) => (
  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition hover:shadow-2xl transform hover:-translate-y-1">
    <div
      className={`flex items-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      <div className="text-sm lg:text-xl">{icon}</div>
      <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-1 lg:px-2 py-1 rounded-full font-bold text-xs lg:text-sm">
        ৳{data.price}
      </span>
    </div>

    <ul className="mt-5 space-y-2">
      {data.options.length > 1 ? (
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border border-gray-300 px-2 py-1 rounded-lg text-sm"
        >
          {data.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <li className="flex items-center gap-2 text-[10px] md:text-xs whitespace-nowrap xl:text-sm bg-gray-50 xl:px-3 py-2 rounded-lg">
          {data.options[0]}
        </li>
      )}

      {quantity !== undefined && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <button
            className="px-2 py-1 bg-orange-200 rounded-lg"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            className="px-2 py-1 bg-orange-200 rounded-lg"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      )}

      <div className="flex items-center justify-center w-full mt-3">
        <label className="switch !text-xs">
          <input type="checkbox" checked={selected} onChange={onToggle} />
          <span className="slider"></span>
        </label>
      </div>
    </ul>

    <button
      onClick={onToggle}
      className={`mt-5 w-full py-2 cursor-pointer text-sm lg:text-base rounded-xl font-semibold transition ${
        selected
          ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
          : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
      }`}
    >
      {selected ? "Selected" : "Select Meal"}
    </button>
  </div>
);

// ----------------- TABLE -----------------
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("day", { header: "Day" }),
  columnHelper.accessor("morning", { header: "Morning" }),
  columnHelper.accessor("afternoon", { header: "Afternoon" }),
  columnHelper.accessor("night", { header: "Night" }),
];

// ----------------- MAIN COMPONENT -----------------
export default function MealManagementPart() {
  const [daywiseSelect, setDaywiseSelect] = useState("show-all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [guestMeals, setGuestMeals] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [globalMealStatus, setGlobalMealStatus] = useState({
    breakfast: false,
    lunch: true,
    dinner: true,
  });

  const activePlan = mealPlans[activeIndex];

  const activeDate = activePlan.date;
  const dateRef = useRef(null);

  // Initialize options for the date if not set
  if (!selectedOptions[activeDate]) {
    setSelectedOptions((prev) => ({
      ...prev,
      [activeDate]: {
        breakfast: activePlan.breakfast.options[0],
        lunch: activePlan.lunch.options[0],
        dinner: activePlan.dinner.options[0],
      },
    }));
  }

  // Toggle user meal
  const toggleMeal = (meal) => {
    setSelectedMeals((prev) => {
      const mealsForDate = prev[activeDate] || [];
      return {
        ...prev,
        [activeDate]: mealsForDate.includes(meal)
          ? mealsForDate.filter((m) => m !== meal)
          : [...mealsForDate, meal],
      };
    });
  };

  // Toggle guest meal with quantity
  const toggleGuestMeal = (meal) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};
      if (dayMeals[meal]) {
        const updated = { ...dayMeals };
        delete updated[meal];
        return { ...prev, [activeDate]: updated };
      }
      return { ...prev, [activeDate]: { ...dayMeals, [meal]: 1 } };
    });
  };

  const setGuestMealQty = (meal, qty) => {
    setGuestMeals((prev) => {
      const dayMeals = prev[activeDate] || {};
      return { ...prev, [activeDate]: { ...dayMeals, [meal]: qty } };
    });
  };

  // Totals
  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return sum + meals.reduce((s, m) => s + plan[m].price, 0);
    },
    0,
  );

  const guestTotalAmount = Object.entries(guestMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return (
        sum +
        Object.entries(meals).reduce(
          (s, [meal, qty]) => s + plan[meal].price * qty,
          0,
        )
      );
    },
    0,
  );

  // React Table
  const table = useReactTable({
    data: schedule2,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 lg:p-6 flex flex-col gap-3.5">
      <ScrollToTop />

      {/* Marquee */}
      <div className="h-[50px] rounded-md bg-white overflow-hidden flex items-center px-4 mx-auto shadow">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <span className="text-black">
            🚨 Notice: Hostel will remain closed on Friday due to maintenance.
            Website • New offers available now • Please check updates regularly
          </span>
        </Marquee>
      </div>

      {/* Live Kitchen */}
      <div className="live-kitchen-container max-w-[300px] md:max-w-[650px] xl:max-w-[1000px] w-full mx-auto">
        <h4 className="text-lg font-semibold mb-3">Live Kitchen</h4>
        <VideoSlider />
      </div>

      {/* Menu Table */}
      <div className="shadow-xl">
        <h4 className="text-lg font-semibold mb-3">Menu Lists</h4>
        <div className="w-full ">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center bg-orange-500 p-2 lg:p-4 text-white rounded-t-md cursor-pointer font-bold transition-colors hover:bg-orange-600 text-xs lg:text-base"
          >
            <span>Weekly Meal Lists</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden  ${
              isExpanded ? "max-h-[1000px] border border-gray-300" : "max-h-0"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-orange-500 hidden md:table-header-group">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left font-semibold text-white border-b border-black"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 flex flex-col md:table-row mb-4 md:mb-0 border md:border-none rounded-lg md:rounded-none"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 md:py-3 border-black md:border-b flex justify-between md:table-cell"
                        >
                          <span className="font-bold text-orange-600 md:hidden mr-4">
                            {cell.column.columnDef.header?.toString()}:
                          </span>
                          <span className="text-right md:text-left">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Activity */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-lg font-semibold mb-3">Your Meal Activity</h4>
        <div className="max-w-7xl grid grid-cols-1 xl:grid-cols-4 gap-y-4 xl:gap-3">
          {/* Sidebar */}
          <aside
            className={`bg-white/80 w-full xl:w-auto backdrop-blur-xl rounded-3xl ${daywiseSelect === "day-wise" ? "h-fit" : "h-fit"} shadow-xl p-2`}
          >
            <h2 className="flex items-center justify-center gap-3 font-bold text-gray-800 ">
              <input
                type="date"
                ref={dateRef}
                className="absolute opacity-0 pointer-events-none"
              />
              <button
                onClick={() => dateRef.current?.showPicker()}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FaCalendarAlt className="text-orange-500" />
              </button>
              Meal Calendar
            </h2>

            <div className="flex items-center gap-3 bg-orange-50 p-1 rounded-full">
              <button
                onClick={() => setDaywiseSelect("day-wise")}
                className={`px-5 py-2 flex-1 rounded-full cursor-pointer text-xs font-semibold ${
                  daywiseSelect === "day-wise"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-orange-600  hover:bg-orange-100"
                } shadow-md  transition`}
              >
                Date Wise
              </button>
              <button
                onClick={() => setDaywiseSelect("show-all")}
                className={`px-5 flex-1 py-2 rounded-full cursor-pointer  text-xs font-semibold ${
                  daywiseSelect === "show-all"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-orange-600  hover:bg-orange-100"
                } transition`}
              >
                All
              </button>
            </div>

            {daywiseSelect === "day-wise" && (
              <div className="h-[100vh] overflow-y-auto p-2">
                {mealPlans.map((plan, index) => {
                  const isSelected =
                    selectedMeals[plan.date] &&
                    selectedMeals[plan.date].length > 0;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full mb-2 text-sm 2xl:text-base px-4 py-2 rounded-xl text-left font-medium cursor-pointer ${
                        activeIndex === index
                          ? "bg-orange-500 text-white shadow-md"
                          : isSelected
                            ? "bg-green-100 text-green-700 shadow-sm"
                            : "bg-gray-100 hover:bg-orange-100"
                      }`}
                    >
                      {plan.date}
                    </button>
                  );
                })}
              </div>
            )}
          </aside>

          {/* Content */}
          {daywiseSelect === "day-wise" && (
            <main className="lg:col-span-3 space-y-6">
              {/* User Meals */}
              <div className="flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
                  <div className="flex flex-col">
                    <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                      Choose Your Meals
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Select your preferred meals for the selected date(s)
                    </p>
                  </div>
                  <div className="flex flex-col items-end mt-4 sm:mt-0">
                    <div className="flex items-center gap-4">
                      <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                        {activeDate}
                      </span>
                      <span className="text-md text-gray-500">Total:</span>
                      <span className="text-2xl font-bold text-green-600 -ms-2">
                        ৳{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Breakfast */}
                  <MealCard
                    title="Breakfast"
                    icon={<FaSun />}
                    data={activePlan.breakfast}
                    gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
                    selected={selectedMeals[activeDate]?.includes("breakfast")}
                    onToggle={() => toggleMeal("breakfast")}
                    selectedOption={
                      selectedOptions[activeDate]?.breakfast ||
                      activePlan.breakfast.options[0]
                    }
                    setSelectedOption={(option) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: {
                          ...prev[activeDate],
                          breakfast: option,
                        },
                      }))
                    }
                  />
                  {/* Lunch */}
                  <MealCard
                    title="Lunch"
                    icon={<FaUtensils />}
                    data={activePlan.lunch}
                    gradient="bg-gradient-to-r from-green-500 to-emerald-600"
                    selected={selectedMeals[activeDate]?.includes("lunch")}
                    onToggle={() => toggleMeal("lunch")}
                    selectedOption={
                      selectedOptions[activeDate]?.lunch ||
                      activePlan.lunch.options[0]
                    }
                    setSelectedOption={(option) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: { ...prev[activeDate], lunch: option },
                      }))
                    }
                  />
                  {/* Dinner */}
                  <MealCard
                    title="Dinner"
                    icon={<FaMoon />}
                    data={activePlan.dinner}
                    gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
                    selected={selectedMeals[activeDate]?.includes("dinner")}
                    onToggle={() => toggleMeal("dinner")}
                    selectedOption={
                      selectedOptions[activeDate]?.dinner ||
                      activePlan.dinner.options[0]
                    }
                    setSelectedOption={(option) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeDate]: { ...prev[activeDate], dinner: option },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Guest Meals */}
              <div className="flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
                  <div className="flex flex-col">
                    <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                      Choose Your Meals for Guest
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Select meals and quantity for your guests
                    </p>
                  </div>
                  <div className="flex flex-col items-end mt-4 sm:mt-0">
                    <div className="flex items-center gap-4">
                      <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                        {activeDate}
                      </span>
                      <span className="text-md text-gray-500">Total:</span>
                      <span className="text-2xl font-bold text-green-600 -ms-2">
                        ৳{guestTotalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <MealCard
                    title="Breakfast"
                    icon={<FaSun />}
                    data={activePlan.breakfast}
                    gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
                    selected={!!guestMeals[activeDate]?.breakfast}
                    quantity={guestMeals[activeDate]?.breakfast || 1}
                    setQuantity={(qty) => setGuestMealQty("breakfast", qty)}
                    onToggle={() => toggleGuestMeal("breakfast")}
                  />
                  <MealCard
                    title="Lunch"
                    icon={<FaUtensils />}
                    data={activePlan.lunch}
                    gradient="bg-gradient-to-r from-green-500 to-emerald-600"
                    selected={!!guestMeals[activeDate]?.lunch}
                    quantity={guestMeals[activeDate]?.lunch || 1}
                    setQuantity={(qty) => setGuestMealQty("lunch", qty)}
                    onToggle={() => toggleGuestMeal("lunch")}
                  />
                  <MealCard
                    title="Dinner"
                    icon={<FaMoon />}
                    data={activePlan.dinner}
                    gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
                    selected={!!guestMeals[activeDate]?.dinner}
                    quantity={guestMeals[activeDate]?.dinner || 1}
                    setQuantity={(qty) => setGuestMealQty("dinner", qty)}
                    onToggle={() => toggleGuestMeal("dinner")}
                  />
                </div>
              </div>
            </main>
          )}

          {daywiseSelect !== "day-wise" && (
            <AllMealActivity
              globalMealStatus={setGlobalMealStatus}
              setGlobalMealStatus={setGlobalMealStatus}
            />
          )}
        </div>
        {/* WEEKLY TABLE */}
        {daywiseSelect !== "day-wise" && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Day</th>
                  <th className="px-4 py-3">Morning</th>
                  <th className="px-4 py-3">Afternoon</th>
                  <th className="px-4 py-3">Night</th>
                </tr>
              </thead>
              <tbody>
                {schedule2.map((row) => (
                  <tr key={row.day} className="border-b">
                    <td className="px-4 py-3 font-bold">{row.day}</td>

                    {[
                      ["morning", "breakfast"],
                      ["afternoon", "lunch"],
                      ["night", "dinner"],
                    ].map(([slot, key]) => (
                      <td key={key} className="px-4 py-3 text-sm">
                        <div className="flex justify-between items-center">
                          {row[slot]}
                          <span
                            className={`px-2 py-1 text-[9px] font-bold text-white rounded ${
                              globalMealStatus[key]
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          >
                            {globalMealStatus[key] ? "ON" : "OFF"}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
