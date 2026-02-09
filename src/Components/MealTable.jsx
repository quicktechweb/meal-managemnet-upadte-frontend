import { useState, useEffect, useMemo } from "react";
import { FaCheckCircle, FaChevronDown, FaTimes } from "react-icons/fa";

/* ===============================
   CONFIG
================================ */

const dynamicTableBaseData = [
  "breakfast",
  "tiffin",
  "lunch",
  "snack",
  "dinner",
];

export const schedule2 = [
  {
    day: "Sat",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "Alu Vorta",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Egg",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 110,
        },
        {
          meal_id: 4,
          title: "Dal",
          price: 110,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 500,
        },
        {
          meal_id: 3,
          title: "goru",
          price: 500,
        },
        {
          meal_id: 4,
          title: "Vat",
          price: 500,
        },
        {
          meal_id: 5,
          title: "dal",
          price: 500,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "dud",
          price: 100,
        },
        {
          meal_id: 4,
          title: "vat",
          price: 10,
        },
      ],
    },
  },
  {
    day: "Sun",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "Ruti",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Dim baji",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Alu baji",
          price: 110,
        },
        {
          meal_id: 4,
          title: "Vat",
          price: 110,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 500,
        },
        {
          meal_id: 3,
          title: "goru",
          price: 500,
        },
        {
          meal_id: 4,
          title: "Polao",
          price: 500,
        },
        {
          meal_id: 5,
          title: "dal",
          price: 500,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Roast",
          price: 900,
        },
        {
          meal_id: 2,
          title: "polao",
          price: 600,
        },
        {
          meal_id: 3,
          title: "jorda",
          price: 100,
        },
        {
          meal_id: 4,
          title: "Dal",
          price: 10,
        },
      ],
    },
  },
  {
    day: "Mon",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Roast",
          price: 110,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 2,
          title: "Dal",
          price: 500,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 200,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 100,
        },
      ],
    },
  },
  {
    day: "Tue",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 1,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 2,
          title: "Roast",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 4,
          title: "Dal",
          price: 500,
        },
        {
          meal_id: 5,
          title: "Vat",
          price: 200,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Roast",
          price: 110,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "Dal",
          price: 200,
        },
        {
          meal_id: 4,
          title: "Vat",
          price: 100,
        },
      ],
    },
  },
  {
    day: "Wed",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Roast",
          price: 110,
        },
        {
          meal_id: 4,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 5,
          title: "Dal",
          price: 500,
        },
        {
          meal_id: 6,
          title: "Vat",
          price: 200,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Roast",
          price: 110,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "Dal",
          price: 200,
        },
        {
          meal_id: 4,
          title: "Vat",
          price: 100,
        },
      ],
    },
  },

  {
    day: "Thu",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "Alu Vorta",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Egg",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 110,
        },
        {
          meal_id: 4,
          title: "Dal",
          price: 110,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 500,
        },
        {
          meal_id: 3,
          title: "goru",
          price: 500,
        },
        {
          meal_id: 4,
          title: "Vat",
          price: 500,
        },
        {
          meal_id: 5,
          title: "dal",
          price: 500,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "dud",
          price: 100,
        },
        {
          meal_id: 4,
          title: "vat",
          price: 10,
        },
      ],
    },
  },
  {
    day: "Fri",
    breakfast: {
      mealType: "breakfast",
      time: "8:00-10:00",
      items: [
        {
          meal_id: 1,
          title: "biriyani",
          price: 125,
        },
        {
          meal_id: 2,
          title: "Polao",
          price: 110,
        },
        {
          meal_id: 3,
          title: "Roast",
          price: 110,
        },
      ],
    },
    lunch: {
      mealType: "lunch",
      time: "1:30-2:30",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 200,
        },
        {
          meal_id: 2,
          title: "Dal",
          price: 500,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 200,
        },
      ],
    },
    dinner: {
      mealType: "dinner",
      time: "9:00 - 11:00",
      items: [
        {
          meal_id: 1,
          title: "Murgi",
          price: 900,
        },
        {
          meal_id: 2,
          title: "Mach",
          price: 600,
        },
        {
          meal_id: 3,
          title: "Vat",
          price: 100,
        },
      ],
    },
  },
];

/* ===============================
   COMPONENT
================================ */

const MealScheduleTable = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  /* -------- Active Column Selection -------- */
  const [activeMeals, setActiveMeals] = useState([
    "breakfast",
    "lunch",
    "dinner",
  ]);

  /* -------- Toggle Column -------- */
  const toggleMealColumn = (meal) => {
    setActiveMeals((prev) =>
      prev.includes(meal)
        ? prev.length === 1
          ? prev
          : prev.filter((m) => m !== meal)
        : [...prev, meal],
    );
  };

  /* -------- Schedule Fast Map -------- */
  const scheduleMap = useMemo(() => {
    return Object.fromEntries(schedule2.map((d) => [d.day, d]));
  }, []);

  /* -------- Selected Meal Items -------- */
  const [selectedMeals, setSelectedMeals] = useState(() =>
    days.reduce((acc, day) => {
      acc[day] = dynamicTableBaseData.reduce((mAcc, meal) => {
        mAcc[meal] = [];
        return mAcc;
      }, {});
      return acc;
    }, {}),
  );

  /* -------- Dropdown Open State -------- */
  const [openDropdown, setOpenDropdown] = useState({});

  useEffect(() => {
    const close = () => setOpenDropdown({});
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* -------- Dropdown Toggle -------- */
  const toggleDropdown = (e, day, mealType) => {
    e.stopPropagation();
    const key = `${day}-${mealType}`;
    setOpenDropdown((prev) => ({
      [key]: !prev[key],
    }));
  };

  /* -------- Item Select Toggle -------- */
  const handleMealToggle = (day, mealType, mealId) => {
    setSelectedMeals((prev) => {
      const current = prev[day][mealType];
      const isSelected = current.includes(mealId);

      return {
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: isSelected
            ? current.filter((id) => id !== mealId)
            : [...current, mealId],
        },
      };
    });
  };

  /* -------- Remove Tag -------- */
  const removeTag = (e, day, mealType, mealId) => {
    e.stopPropagation();
    setSelectedMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter((id) => id !== mealId),
      },
    }));
  };

  /* ===============================
     DROPDOWN CELL
  ================================ */

  const renderDropdown = (day, mealType, mealData) => {
    const key = `${day}-${mealType}`;
    const isOpen = openDropdown[key];
    const items = mealData?.items || [];

    return (
      <td key={mealType} className="px-3 py-2 align-top relative">
        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mb-1">
          {selectedMeals[day][mealType].map((id) => {
            const meal = items.find((m) => m.meal_id === id);
            if (!meal) return null;

            return (
              <div
                key={id}
                className="flex items-center gap-1 text-gray-700 text-xs"
              >
                <FaCheckCircle className="text-green-600 text-[10px]" />
                {meal.title} ({meal.price})
                <FaTimes
                  className="cursor-pointer hover:text-red-500"
                  onClick={(e) => removeTag(e, day, mealType, id)}
                />
              </div>
            );
          })}
        </div>

        {/* Toggle */}
        <div
          className="border border-gray-300 rounded-md p-2 flex justify-between cursor-pointer bg-white"
          onClick={(e) => toggleDropdown(e, day, mealType)}
        >
          <span className="text-gray-400 text-xs">
            {selectedMeals[day][mealType].length > 0
              ? `${selectedMeals[day][mealType].length} selected`
              : `Select ${mealType}`}
          </span>
          <FaChevronDown className="text-xs" />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            {items.length === 0 ? (
              <div className="p-2 text-gray-400 text-sm">
                No {mealType} available
              </div>
            ) : (
              items.map((item) => {
                const isSelected = selectedMeals[day][mealType].includes(
                  item.meal_id,
                );

                return (
                  <label
                    key={item.meal_id}
                    className="flex justify-between px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                  >
                    <span>
                      {item.title} ({item.price}৳)
                    </span>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleMealToggle(day, mealType, item.meal_id)
                      }
                    />
                  </label>
                );
              })
            )}
          </div>
        )}
      </td>
    );
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {dynamicTableBaseData.map((meal) => {
          const active = activeMeals.includes(meal);

          return (
            // <button
            //   key={meal}
            //   type="button"
            //   onClick={() => toggleMealColumn(meal)}
            //   className={`py-2 px-4 rounded-xl text-sm capitalize cursor-pointer font-semibold transition ${
            //     active
            //       ? "bg-orange-500 text-white"
            //       : "bg-gray-200 text-gray-600"
            //   }`}
            // >
            //   {meal}
            // </button>
            <div className="bg-white rounded-2xl p-4 shadow-lg w-full  md:w-[200px]">
              {/* HEADER */}
              <div
                className={`flex flex-col items-center gap-3 px-4 py-3 rounded-xl `}
              >
                <h3 className="font-semibold capitalize">{meal}</h3>
                <div className="flex justify-center ">
                  <label className="switch !text-[10px]">
                    <input
                      type="checkbox"
                      checked={!!active}
                      onClick={() => toggleMealColumn(meal)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                key={meal}
                type="button"
                onClick={() => toggleMealColumn(meal)}
                className={` w-full py-2 text-sm cursor-pointer rounded-xl font-semibold
                      ${
                        active
                          ? "bg-green-500 text-white"
                          : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                      }`}
              >
                {active ? "Selected" : "Select Meal"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Day</th>

              {activeMeals.map((meal) => (
                <th key={meal} className="px-4 py-3 text-left capitalize">
                  {meal}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day) => {
              const dayMeals = scheduleMap[day] || {};

              return (
                <tr
                  key={day}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-bold text-gray-700">{day}</td>

                  {activeMeals.map((mealType) =>
                    renderDropdown(day, mealType, dayMeals?.[mealType]),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-3">
        {days.map((day) => {
          const dayMeals = scheduleMap[day] || {};

          return (
            <div
              key={day}
              className="border border-gray-300 rounded-xl p-3 shadow-sm bg-white"
            >
              <h3 className="text-center font-bold text-orange-500">{day}</h3>

              {activeMeals.map((mealType) => (
                <div key={mealType}>
                  <p className="text-sm font-semibold capitalize">{mealType}</p>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        {renderDropdown(day, mealType, dayMeals?.[mealType])}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MealScheduleTable;
