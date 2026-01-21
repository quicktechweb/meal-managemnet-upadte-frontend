import React, { useState } from "react";
import { Star, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { restaurants } from "./Restaurent";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, decreaseCart } from "../../../../feature/cartSlice";
import ProductDetailsModal from "../../../../Components/ProductDetailsModal";
import ReviewModal from "../review/ReviewModal";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const singleRestaurantInfo = restaurants?.find(
    (res) => res?.id === Number(id),
  );

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.cartQuantity : 0;
  };

  const handleItemDetails = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
        <div className="flex gap-5 items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <img
              src={singleRestaurantInfo?.image}
              alt={singleRestaurantInfo?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {singleRestaurantInfo?.name}
            </h1>

            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={16} />
              {singleRestaurantInfo?.location}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold">
                <Star size={14} fill="currentColor" />
                {singleRestaurantInfo?.rating}
              </span>

              <button
                onClick={() => setShowReviews(true)}
                className="text-sm text-blue-600  cursor-pointer hover:underline"
              >
                (500+ Reviews)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Popular Dishes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {singleRestaurantInfo?.items?.map((item) => {
            const qty = getQty(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleItemDetails(item)}
                className="group p-2 hover:shadow-xl transition-shadow cursor-pointer rounded-xl"
              >
                <div className="relative h-32 mb-4 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {qty > 0 ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white shadow rounded-md h-[44px] w-[150px] flex items-center justify-between px-4"
                    >
                      <span
                        onClick={() => dispatch(decreaseCart({ id: item.id }))}
                      >
                        {qty > 1 ? <FiMinus /> : <FiTrash2 />}
                      </span>

                      <span className="font-medium">{qty}</span>

                      <span onClick={() => dispatch(addtoCart(item))}>
                        <FiPlus />
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addtoCart(item));
                      }}
                      className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
                    >
                      <FiPlus />
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold line-clamp-1 text-sm text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs line-clamp-1 text-gray-500">
                      {item.description || "Fresh & delicious"}
                    </p>
                  </div>

                  <p className="text-orange-600 font-bold">
                    ৳{item.price || 12}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Modal */}
      {selectedItem && (
        <ProductDetailsModal
          selectedProduct={selectedItem}
          setSelectedProduct={(item) => {
            setSelectedItem(item);
            document.body.style.overflow = "auto";
          }}
          qty={getQty(selectedItem.id)}
          getQty={getQty}
          products={singleRestaurantInfo?.items}
        />
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        restaurantName={singleRestaurantInfo?.name}
        rating={singleRestaurantInfo?.rating}
      />
    </div>
  );
};

export default RestaurantDetails;
