import { useState } from "react";
import {
  FaSun,
  FaUtensils,
  FaMoon,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import PropTypes from "prop-types";

/* ===============================
   SAMPLE DATA (1–15 DATE)
================================ */
const mealPlans = Array.from({ length: 10 }, (_, i) => ({
  date: `2026-01-${String(i + 1).padStart(2, "0")}`,
  breakfast: { price: 80, items: ["Egg", "Vegetables", "Bread", "Tea"] },
  lunch: { price: 150, items: ["Rice", "Chicken Curry", "Dal", "Salad"] },
  dinner: { price: 120, items: ["Rice", "Fish Curry", "Mixed Vegetables", "Dal"] },
}));

/* ===============================
   MEAL CARD
================================ */
const MealCard = ({ title, icon, data, gradient, selected, onToggle }) => (
  <div
    className={`bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-lg transition
      hover:shadow-2xl transform hover:-translate-y-1`}
  >
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white ${gradient}`}>
      <div className="text-xl">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <span className="ml-auto bg-white/20 px-4 py-1 rounded-full font-bold text-sm">
        ৳ {data.price}
      </span>
    </div>

    <ul className="mt-5 space-y-2">
      {data.items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-2 rounded-lg">
          <FaCheckCircle className="text-green-500" />
          {item}
        </li>
      ))}
    </ul>

    <button
      onClick={onToggle}
      className={`mt-5 w-full py-2 rounded-xl font-semibold transition
        ${selected
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
export default function MealManagement() {
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
  const totalAmount = Object.entries(selectedMeals).reduce((sum, [date, meals]) => {
    const plan = mealPlans.find((p) => p.date === date);
    return sum + meals.reduce((s, m) => s + plan[m].price, 0);
  }, 0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <aside className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-5">
          <h2 className="flex items-center gap-3 font-bold mb-4 text-gray-800">
            <FaCalendarAlt className="text-orange-500" /> Meal Calendar
          </h2>

          {mealPlans.map((plan, index) => {
            const isSelected = selectedMeals[plan.date] && selectedMeals[plan.date].length > 0;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full mb-2 px-4 py-2 rounded-xl text-left font-medium
                  ${activeIndex === index
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
        </aside>

        {/* CONTENT */}
        <main className="lg:col-span-3 space-y-6">
       <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
  {/* Left side: heading + subtitle */}
  <div className="flex flex-col">
    <h1 className="text-3xl font-extrabold text-gray-800">Choose Your Meals</h1>
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
      <span className="text-2xl font-bold text-green-600 -ms-2">৳{totalAmount}</span>
    </div>
  </div>
</div>


          <div className="grid md:grid-cols-3 gap-6">
            <MealCard
              title="Breakfast"
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
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500">
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Order</h2>

            <div className="space-y-3 mb-4">
              <input className="w-full border rounded-xl px-4 py-2" placeholder="Name" />
              <input className="w-full border rounded-xl px-4 py-2" placeholder="Email" />
              <input className="w-full border rounded-xl px-4 py-2" placeholder="Phone" />
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
                              <FaCheckCircle className="text-green-500" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="font-bold text-lg mb-4 text-green-600">Total: ৳ {totalAmount}</div>

            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-500 transition-all">
              Confirm Order
            </button>
          </div>
        </div>
      )}

      
    </section>

    
  );

  
}
