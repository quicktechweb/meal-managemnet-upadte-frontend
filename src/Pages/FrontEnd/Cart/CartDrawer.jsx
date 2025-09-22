import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { CartContext } from "../../Shared/Context/CartContext";

export default function CartDrawer() {
  const [state, setState] = useState(false);
  const cartProducts = useContext(CartContext)[0];
  let totalQuantity = cartProducts.reduce((acc, product) => acc + (product.quantity || 1), 0);

  const toggleDrawer = (open) => () => setState(open);

  let navigate = useNavigate();
  const bookOrderReview = () => navigate("/OrderReview");

  return (
    <div className="inline">
      <button onClick={toggleDrawer(true)} className="relative p-2">
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {totalQuantity || 0}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l1 5m0 0h13l-1.4 7H7.4L6 8m0 0L5 3m2 15a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      </button>

      {state && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 z-50">
          <button onClick={toggleDrawer(false)} className="absolute top-2 right-2 text-xl">&times;</button>
          <Cart>
            <button onClick={bookOrderReview} className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
              Review Now
            </button>
          </Cart>
        </div>
      )}
    </div>
  );
}