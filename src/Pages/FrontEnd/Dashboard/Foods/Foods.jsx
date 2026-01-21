import React, { useState } from "react";
import { FiPlus, FiMinus, FiTrash2, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, decreaseCart } from "../../../../feature/cartSlice";
import ProductDetailsModal from "../../../../Components/ProductDetailsModal";
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
const Foods = () => {
  const [cart, setCart] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.cartQuantity : 0;
  };

  const setQty = (id, qty) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (qty <= 0) delete copy[id];
      else copy[id] = qty;
      return copy;
    });
  };
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems =
    activeTab === "All"
      ? foodData
      : foodData.filter((item) => item.category === activeTab);

  const handleItemDetails = (item) => {
    setSelectedItem(item);

    document.body.style.overflow = "hidden";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Delicious Food
            </h1>
            <p className="text-gray-500 text-sm">
              Select your favorite category and enjoy
            </p>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search food..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl w-full md:w-64 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar mb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === cat
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {filteredItems.map((item) => (
            <FoodCard
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              handleItemDetails={handleItemDetails}
              cart={cart}
              setQty={setQty}
              getQty={getQty}
              key={item.id}
              item={item}
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
  setQty,
  handleItemDetails,
  cart,
}) => {
  const qty = getQty(item.id);

  const dispatch = useDispatch();

  return (
    <div
      onClick={() => handleItemDetails(item)}
      className="group border border-gray-100  transition-all duration-500 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] mb-4 overflow-hidden ">
        <img
          src={item.image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={item.name}
        />
        {item.discount && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg uppercase tracking-wider animate-pulse">
              {item.discount}% OFF
            </span>
          </div>
        )}
        {/* Overlay  */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {qty > 0 ? (
            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl h-11 flex items-center justify-between px-3 border border-white">
              <button
                onClick={() => dispatch(decreaseCart({ id: item.id }))}
                className="text-gray-800 hover:text-red-500 p-1"
              >
                {qty > 1 ? <FiMinus size={18} /> : <FiTrash2 size={18} />}
              </button>
              <span className="font-bold text-gray-900">{qty}</span>
              <button
                onClick={() => dispatch(addtoCart(item))}
                className="text-gray-800 hover:text-orange-500 p-1"
              >
                <FiPlus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addtoCart(item))}
              className="w-full bg-gray-900 text-white h-11 rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold hover:bg-orange-600 transition-colors"
            >
              <FiPlus size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
            {item.name}
          </h3>
          <span className="text-orange-600 font-black text-lg">
            ৳{item.price}
          </span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed italic">
          {item.desc}
        </p>
      </div>

      {selectedItem && (
        <ProductDetailsModal
          selectedProduct={selectedItem}
          setSelectedProduct={setSelectedItem}
          qty={getQty(selectedItem.id)}
          setQty={setQty}
          getQty={getQty}
          cart={cart}
          products={foodData}
        />
      )}
    </div>
  );
};

export default Foods;
