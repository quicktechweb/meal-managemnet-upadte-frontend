import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaChevronDown, FaTimes } from "react-icons/fa";

export const schedule2 = [
  {
    mealTypeid: 1,
    day: "Sat",
    breakfast: {
      mealType: "breakfast",
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
    mealTypeid: 2,
    day: "Sun",
    breakfast: {
      mealType: "breakfast",
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
    meal_type_id: 3,
    day: "Mon",
    breakfast: {
      mealType: "breakfast",
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
    meal_type_id: 3,
    day: "Tue",
    breakfast: {
      mealType: "breakfast",
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
    meal_type_id: 3,
    day: "Wed",
    breakfast: {
      mealType: "breakfast",
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
    mealTypeid: 1,
    day: "Thu",
    breakfast: {
      mealType: "breakfast",
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
    meal_type_id: 3,
    day: "Fri",
    breakfast: {
      mealType: "breakfast",
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

const MealScheduleTable = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const [selectedMeals, setSelectedMeals] = useState(() =>
    days.reduce((acc, day) => {
      acc[day] = { breakfast: [], lunch: [], dinner: [] };
      return acc;
    }, {}),
  );

  const [openDropdown, setOpenDropdown] = useState({});

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown({});
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (e, day, mealType) => {
    e.stopPropagation();

    const key = `${day}-${mealType}`;
    setOpenDropdown({
      [key]: !openDropdown[key],
    });
  };

  const handleMealToggle = (day, mealType, mealId) => {
    setSelectedMeals((prev) => {
      const currentSelection = prev[day][mealType];
      const isSelected = currentSelection.includes(mealId);

      return {
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: isSelected
            ? currentSelection.filter((id) => id !== mealId)
            : [...currentSelection, mealId],
        },
      };
    });
  };

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

  const renderDropdown = (day, mealType, mealData, i) => {
    const key = `${day}-${mealType}`;
    const isOpen = openDropdown[key];

    return (
      <td className="px-3 py-2 flex-1 align-top relative">
        <div className="flex flex-wrap w-[315px]  gap-2 mb-1">
          {selectedMeals[day][mealType].map((id) => {
            const meal = mealData.items.find((m) => m.meal_id === id);
            return (
              <div
                key={id}
                className="flex items-center gap-1 text-gray-700   rounded-full text-xs"
              >
                <FaCheckCircle className="text-green-600 text-[10px]" />
                {meal?.title} ({meal?.price})
                <FaTimes
                  className="cursor-pointer hover:text-red-500"
                  onClick={(e) => removeTag(e, day, mealType, id)}
                />
              </div>
            );
          })}
        </div>

        {/* Dropdown toggle button */}
        <div
          className="border relative border-gray-300 rounded-md p-2 min-w-[80px] flex items-center justify-between cursor-pointer bg-white"
          onClick={(e) => toggleDropdown(e, day, mealType)}
        >
          <span className="text-gray-400 text-xs">
            {selectedMeals[day][mealType].length > 0
              ? `Select ${mealData?.items[2]?.title}...`
              : `Select ${mealData?.items[0]?.title}`}
          </span>
          <FaChevronDown className="ml-2 text-xs" />
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute ${(i === 5 || i === 6) && "-top-20"} border-gray-300 z-20  mt-1 w-[315px] bg-white border rounded-md shadow-lg max-h-30 overflow-y-auto`}
          >
            {mealData.items.map((item, idx) => {
              const isSelected = selectedMeals[day][mealType].includes(
                item.meal_id,
              );
              return (
                <label
                  key={`${item.meal_id}-${idx}`}
                  className="flex items-center justify-between px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                >
                  <span>
                    {item.title} ({item.price}৳)
                  </span>
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isSelected}
                    onChange={() =>
                      handleMealToggle(day, mealType, item.meal_id)
                    }
                  />
                </label>
              );
            })}
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full text-sm sm:text-base border-collapse">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Days</th>
            <th className="px-4 py-3 text-left">Breakfast</th>
            <th className="px-4 py-3 text-left">Lunch</th>
            <th className="px-4 py-3 text-left">Dinner</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, i) => {
            console.log(i);

            const dayMeals = schedule2.find((m) => m.day === day);
            return (
              <tr
                key={day}
                className="border-b w-[50%] border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-center font-bold text-gray-700">
                  {day}
                </td>
                {renderDropdown(day, "breakfast", dayMeals.breakfast, i)}
                {renderDropdown(day, "lunch", dayMeals.lunch, i)}
                {renderDropdown(day, "dinner", dayMeals.dinner, i)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MealScheduleTable;
