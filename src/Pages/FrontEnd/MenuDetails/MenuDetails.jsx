import React, { useState } from "react";
import { motion } from "framer-motion";
import FoodDetails from "../Dashboard/Foods/FoodDetails";
import RestaurantDetail from "../Dashboard/Restaurant/RestaurantDetail";
import MealDetails from "../meal-details/MealDetails";

const stats = [
  {
    id: 1,
    title: "Cloud Kitchen",
    icon: "☁️",
    foodData: [
      {
        id: 1,
        name: "Kacchi Biryani",
        category: "Bangla",
        price: 450,
        discount: 12,
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400&auto=format&fit=crop",
        desc: "Basmati rice with tender mutton and potatoes.",
      },
      {
        id: 2,
        name: "Kung Pao Chicken",
        category: "Chinese",
        price: 380,
        discount: 12,
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400&auto=format&fit=crop",
        desc: "Spicy stir-fried chicken with peanuts and veg.",
      },
      {
        id: 3,
        name: "Pad Thai",
        category: "Thai",
        price: 320,
        discount: 12,
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop",
        desc: "Rice noodles with shrimp, tofu, and sprouts.",
      },
      {
        id: 4,
        name: "Butter Chicken",
        category: "Indian",
        price: 420,
        discount: 12,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400&auto=format&fit=crop",
        desc: "Creamy tomato-based curry with grilled chicken.",
      },
      {
        id: 4,
        name: "Butter Chicken",
        category: "Indian",
        price: 420,
        discount: 12,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400&auto=format&fit=crop",
        desc: "Creamy tomato-based curry with grilled chicken.",
      },
    ],
  },
  { id: 2, title: "Canteens", icon: "🏢" },
  { id: 3, title: "Meal", icon: "🍱" },
];

const MenuDetails = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex mt-28 flex-col items-center justify-center min-h-[300px] p-4 font-sans">
      {/* Container with Glassmorphism effect */}
      <div className="flex space-x-1 bg-gray-200/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 shadow-inner">
        {stats.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2.5 text-sm font-semibold transition-colors duration-300 focus:outline-none ${
              activeTab === tab.id
                ? "text-[#896ADC] "
                : "text-gray-500 hover:text-gray-800 cursor-pointer "
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 text-center"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Explore our {stats.find((s) => s.id === activeTab)?.title}
        </h2>
        <div className="mt-4 h-1 w-12 bg-[#896ADC] mx-auto rounded-full" />
      </motion.div>

      {activeTab === 1 && <FoodDetails />}

      {activeTab === 2 && <RestaurantDetail />}

      {activeTab === 3 && <MealDetails />}
    </div>
  );
};

export default MenuDetails;
