import React, { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, decreaseCart } from "../../../../feature/cartSlice";
import ProductDetailsModal from "../../../../Components/ProductDetailsModal";
import { FaRegHeart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

const categories = ["All", "Bangla", "Chinese", "Thai"];

const foodData = [
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
];

const FoodDetails = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("low-to-high");

  const cartItems = useSelector((state) => state.cart.cartItems);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.cartQuantity : 0;
  };

  /* ---------------- FILTER ---------------- */
  const filteredItems =
    activeTab === "All"
      ? [...foodData]
      : foodData.filter((item) => item.category === activeTab);

  /* ---------------- SORT ---------------- */
  const sortedItems = filteredItems.sort((a, b) => {
    switch (sortBy) {
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      case "asc":
        return a.name.localeCompare(b.name);
      case "desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleItemDetails = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-3 mb-4">
          {/* Categories */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm font-semibold text-gray-600">Sort by</span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="low-to-high">Price : Low → High</option>
                <option value="high-to-low">Price : High → Low</option>
                <option value="asc">Name : A → Z</option>
                <option value="desc">Name : Z → A</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaChevronDown />
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- FOOD GRID ---------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {sortedItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              getQty={getQty}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              handleItemDetails={handleItemDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FoodCard = ({
  item,
  getQty,
  selectedItem,
  setSelectedItem,
  handleItemDetails,
}) => {
  const qty = getQty(item.id);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => handleItemDetails(item)}
      className="group border border-gray-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {item.discount && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg animate-pulse">
            {item.discount}% OFF
          </span>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-xl flex items-center justify-center text-lg shadow"
        >
          <FaRegHeart />
        </div>

        {/* Cart overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          {qty > 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-xl h-11 flex items-center justify-between px-3 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(decreaseCart({ id: item.id }));
                }}
              >
                {qty > 1 ? <FiMinus /> : <FiTrash2 />}
              </button>

              <span className="font-bold">{qty}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addtoCart(item));
                }}
              >
                <FiPlus />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addtoCart(item));
              }}
              className="w-full bg-gray-900 text-white h-11 rounded-xl font-bold hover:bg-orange-600 text-xs lg:text-base transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-sm md:text-base line-clamp-1">
            {item.name}
          </h3>
          <span className="font-black text-orange-600">৳{item.price}</span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 italic">{item.desc}</p>
      </div>

      {selectedItem && (
        <ProductDetailsModal
          selectedProduct={selectedItem}
          setSelectedProduct={setSelectedItem}
          qty={getQty(selectedItem.id)}
          getQty={getQty}
          products={foodData}
        />
      )}
    </div>
  );
};

export default FoodDetails;
