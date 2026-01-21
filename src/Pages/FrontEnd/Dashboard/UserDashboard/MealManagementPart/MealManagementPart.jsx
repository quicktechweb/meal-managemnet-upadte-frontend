import { useMemo, useState } from "react";
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
const schedule = [
  {
    day: "Sat",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Mach/Mangsho + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Sun",
    morning: "Shobji Parota/Pitha",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Bhaja Shobji",
  },
  {
    day: "Mon",
    morning: "Nesco/Soup + Bhat/Parota",
    afternoon: "Gosht & Murgi + Bhat/Dal (Soup/Mukhar)",
    night: "Bhat, Dal + Alu Vorta",
  },
  {
    day: "Tue",
    morning: "Alu Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Bhat + Dim",
  },
  {
    day: "Wed",
    morning: "Nesco/Shobji + Dal",
    afternoon: "Murgi + Mach + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Thu",
    morning: "Alu, Piaj Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Shobji Lettuce",
  },
  {
    day: "Fri",
    morning: "Ruti/Shobji/Dal",
    afternoon: "Gorur Mangsho/Prani Jhol",
    night: "Bhat, Dim + Shobji (Shak, Mushroom)",
  },
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ===============================
   SAMPLE DATA (1–15 DATE)
================================ */

const mealPlans = Array.from({ length: daysInMonth }, (_, i) => {
  const dateObj = new Date(year, month, i + 1);
  const dayName = weekDays[dateObj.getDay()];

  const daySchedule = schedule.find((s) => s.day === dayName);

  return {
    date: `2026-01-${String(i + 1).padStart(2, "0")} (${dayName})`,
    breakfast: { price: 80, items: [daySchedule.morning] },
    lunch: { price: 150, items: [daySchedule.afternoon] },
    dinner: { price: 120, items: [daySchedule.night] },
  };
});

/* ===============================
   MEAL CARD
================================ */
const MealCard = ({ title, icon, data, gradient, selected, onToggle }) => (
  <div
    className={`bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg transition
      hover:shadow-2xl transform hover:-translate-y-1`}
  >
    <div
      className={`flex items-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-3 rounded-xl text-white ${gradient}`}
    >
      <div className="text-sm lg:text-xl">{icon}</div>
      <h3 className="font-semibold text-sm lg:text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-1  lg:px-2 py-1 rounded-full font-bold text-xs lg:text-sm">
        ৳{data.price}
      </span>
    </div>

    <ul className="mt-5 space-y-2">
      {data.items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2 text-[10px] md:text-xs whitespace-nowrap xl:text-sm bg-gray-50  xl:px-3 py-2 rounded-lg"
        >
          <FaCheckCircle className="text-green-500 shrink-0" />
          {item}
        </li>
      ))}
    </ul>

    <button
      onClick={onToggle}
      className={`mt-5 w-full py-2 cursor-pointer text-sm lg:text-base rounded-xl font-semibold transition
        ${
          selected
            ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
            : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400"
        }`}
    >
      {selected ? "Selected" : "Select Meal"}
    </button>
  </div>
);

MealCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  gradient: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  data: PropTypes.shape({
    price: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

/* ===============================
   MAIN COMPONENT
================================ */

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("day", { header: "Day" }),
  columnHelper.accessor("morning", { header: "Morning" }),
  columnHelper.accessor("afternoon", { header: "Afternoon" }),
  columnHelper.accessor("night", { header: "Night" }),
];

export default function MealManagementPart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [showModal, setShowModal] = useState(false);

  const activePlan = mealPlans[activeIndex];
  const activeDate = activePlan.date;

  // Toggle meal for a specific date
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

  // Total amount across all selected dates and meals
  const totalAmount = Object.entries(selectedMeals).reduce(
    (sum, [date, meals]) => {
      const plan = mealPlans.find((p) => p.date === date);
      return sum + meals.reduce((s, m) => s + plan[m].price, 0);
    },
    0,
  );

  const [isExpanded, setIsExpanded] = useState(true);

  const table = useReactTable({
    data: schedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 lg:p-6 flex flex-col gap-3.5">
      <ScrollToTop />
      {/* menu table */}
      <div className="shadow-xl">
        <h4 className="text-lg font-semibold mb-3">Menu Lists</h4>

        {/* DESKTOP TABLE */}
        <div className="w-full ">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center bg-orange-500 p-2 lg:p-4 text-white rounded-t-md cursor-pointer font-bold transition-colors hover:bg-orange-600 text-xs lg:text-base"
          >
            <span>Weekly Meal Lists</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Expandable Container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden  ${isExpanded ? "max-h-[1000px] border border-gray-300" : "max-h-0"}`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-orange-500 hidden md:table-header-group">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left font-semibold text-white border-b border-gray-300"
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
                          className="px-4 py-2 md:py-3 border-gray-300 md:border-b flex justify-between md:table-cell"
                        >
                          {/* Mobile Label */}
                          <span className="font-bold text-orange-600 md:hidden mr-4">
                            {cell.column.columnDef.header?.toString()}:
                          </span>
                          {/* Data */}
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-y-4 xl:gap-6">
        {/* SIDEBAR */}
        <aside className="bg-white/80 w-full xl:w-auto backdrop-blur-xl rounded-3xl shadow-xl p-2">
          <h2 className="flex px-2 pt-2 items-center gap-3 font-bold mb-4 text-gray-800">
            <FaCalendarAlt className="text-orange-500" /> Meal Calendar
          </h2>

          <div className="h-[70vh] overflow-y-auto p-2">
            {mealPlans.map((plan, index) => {
              const isSelected =
                selectedMeals[plan.date] && selectedMeals[plan.date].length > 0;
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
        </aside>

        {/* CONTENT */}
        <main className="lg:col-span-3 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
            {/* Left side: heading + subtitle */}
            <div className="flex flex-col">
              <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                Choose Your Meals
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select your preferred meals for the selected date(s)
              </p>
            </div>

            {/* Right side: date + total on same line */}
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

          <div className="grid md:grid-cols-3 gap-6 ">
            <MealCard
              title="Breakfast"
              className="text-sm"
              icon={<FaSun />}
              data={activePlan.breakfast}
              gradient="bg-gradient-to-r from-yellow-400 to-orange-500"
              selected={selectedMeals[activeDate]?.includes("breakfast")}
              onToggle={() => toggleMeal("breakfast")}
            />
            <MealCard
              title="Lunch"
              icon={<FaUtensils />}
              data={activePlan.lunch}
              gradient="bg-gradient-to-r from-green-500 to-emerald-600"
              selected={selectedMeals[activeDate]?.includes("lunch")}
              onToggle={() => toggleMeal("lunch")}
            />
            <MealCard
              title="Dinner"
              className=""
              icon={<FaMoon />}
              data={activePlan.dinner}
              gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
              selected={selectedMeals[activeDate]?.includes("dinner")}
              onToggle={() => toggleMeal("dinner")}
            />
          </div>

          {Object.keys(selectedMeals).length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="w-1/2 lg:w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-orange-400 transition-all"
            >
              Proceed to Order
            </button>
          )}
        </main>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Confirm Order
            </h2>

            <div className="space-y-3 mb-4">
              <input
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Name"
              />
              <input
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Email"
              />
              <input
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Phone"
              />
            </div>

            <div className="space-y-4 mb-4">
              {Object.entries(selectedMeals).map(([date, meals]) => {
                const plan = mealPlans.find((p) => p.date === date);
                return (
                  <div key={date} className="p-3 bg-gray-50 rounded-xl">
                    <h3 className="font-bold mb-2 text-gray-700">{date}</h3>
                    {meals.map((meal) => (
                      <div key={meal} className="mb-2">
                        <p className="font-semibold capitalize text-gray-800">
                          {meal} – ৳ {plan[meal].price}
                        </p>
                        <ul className="ml-4 text-sm">
                          {plan[meal].items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="font-bold text-lg mb-4 text-green-600">
              Total: ৳ {totalAmount}
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-500 transition-all">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
