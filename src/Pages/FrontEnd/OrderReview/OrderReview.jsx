import { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function OrderReview() {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <ScrollToTop/>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 Cart (1)</h1>

          {/* Select all */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked
                readOnly
                className="w-5 h-5 accent-red-600"
              />
              <span className="text-sm text-gray-700 cursor-pointer hover:underline">
                Select all items
              </span>
              <button className="text-sm text-red-500 hover:underline">
                Delete selected
              </button>
            </div>
          </div>

          {/* Sale Banner */}
          <div className="bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)]  rounded-xl p-4 flex items-center justify-between mb-6">
            <span className="text-black font-semibold text-sm uppercase tracking-wide">
              🎉 Fall Sale Ends:
            </span>
            <div className="flex space-x-2 font-mono text-gray-800 font-bold">
              <span className="bg-white px-3 py-1 rounded-lg shadow-sm">00</span> :
              <span className="bg-white px-3 py-1 rounded-lg shadow-sm">00</span> :
              <span className="bg-white px-3 py-1 rounded-lg shadow-sm">00</span>
            </div>
          </div>

          {/* Item Row */}
          <div className="flex items-start space-x-4 bg-gray-50 rounded-xl shadow-[0_2px_18px_rgba(0,0,0,0.15)] p-4 hover:shadow-md transition">
            <input
              type="checkbox"
              checked
              readOnly
              className="w-5 h-5 mt-2 accent-red-600"
            />
            <img
              src="https://www.siwaklifestyle.com/media/2024/09/SST0245.webp"
              alt="Hair Claw"
              className="w-24 h-24 object-cover rounded-xl border"
            />
            <div className="flex-1 ">
              <p className="text-sm text-gray-800 font-semibold mb-1">
                Acetate Butterfly Hair Claw Colorful French Style Hair Styling Tools
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span>B01</span>
                <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded-full font-medium">
                  SALE
                </span>
              </div>
              <div className="flex items-center mt-3 space-x-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-1.5 border rounded-lg hover:bg-gray-100 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-1.5 border rounded-lg hover:bg-gray-100 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-red-600 font-bold text-lg">$0.70</span>
              <span className="line-through text-gray-400 text-sm">$1.34</span>
              <button className="text-gray-400 hover:text-red-500 transition">
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Summary</h2>

          <div className="flex items-center mb-5 space-x-3">
            <img
              src="https://www.siwaklifestyle.com/media/2024/09/SST0245.webp"
              alt="Thumb"
              className="w-14 h-14 rounded-lg object-cover border"
            />
            <p className="text-sm text-gray-700 font-medium">
              Acetate Butterfly Hair Claw
            </p>
          </div>

          <div className="text-sm text-gray-600 space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Items total</span>
              <span className="line-through">$1.34</span>
            </div>
            <div className="flex justify-between">
              <span>Items discount</span>
              <span className="text-red-600 font-medium">- $0.64</span>
            </div>
            <div className="flex justify-between font-medium text-gray-800">
              <span>Subtotal</span>
              <span>$0.70</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t">
              <span>Estimated total</span>
              <span>$0.70</span>
            </div>
          </div>

          <Link to="/payment">
          <button className="w-full bg-[#19745B]  hover:bg-red-700 text-white py-2 rounded-xl text-lg font-semibold shadow-md transition">
            Checkout (1)
          </button>
          </Link>

          {/* Payment Logos */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Pay with</p>
            <div className="flex space-x-3">
              <img
                src="https://ae01.alicdn.com/kf/S2ee1f368a78345c293982065980ceddeG/216x144.png"
                alt="Visa"
                className="h-8 w-auto"
              />
              <img
                src="https://ae01.alicdn.com/kf/S7b20ce778ba44e60a062008c35e98b57M/216x144.png"
                alt="Mastercard"
                className="h-8 w-auto"
              />
              <img
                src="https://ae01.alicdn.com/kf/S2ee1f368a78345c293982065980ceddeG/216x144.png"
                alt="Amex"
                className="h-8 w-auto"
              />
            </div>
          </div>

          {/* Buyer Protection */}
          <div className="mt-6 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start space-x-2">
            <span className="text-green-600">✔</span>
            <span>
              Get a full refund if the item is not as described or not delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
