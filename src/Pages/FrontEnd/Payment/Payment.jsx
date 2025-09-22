import { useState } from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Payment() {
  const [isDefault, setIsDefault] = useState(true);

  return (
    <div className="mx-auto max-w-6xl p-6 bg-gray-50 min-h-screen">
      <ScrollToTop/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ========== LEFT: Shipping Form ========== */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {/* Country / Region */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country/region
            </label>
            <div className="relative">
              <select className="w-full appearance-none border-1  border-gray-300 rounded-md pl-10 pr-8 py-2 focus:outline-none  focus:ring-1 focus:ring-red-500 focus:border-red-500 text-gray-700">
                <option>Bangladesh</option>
              </select>
              {/* <span className="absolute left-3 top-2.5 text-lg">🇧🇩</span> */}
              <svg
                className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Contact information */}
          <div className="mb-6">
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              Contact information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Contact name"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <div className="flex md:col-span-2">
                <input
                  type="text"
                  value="+880"
                  readOnly
                  className="border-1  border-gray-300 rounded-l-md py-2 px-3 w-20 bg-gray-50 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="border-1  border-gray-300 rounded-r-md py-2 px-3 flex-1 focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Please enter a contact name.
            </p>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Street address"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Apt, suite, unit, etc (optional)"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="State / Province"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Postal code"
                className="border-1  border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Default checkbox */}
          <label className="flex items-center text-sm text-gray-700 mb-6">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={() => setIsDefault(!isDefault)}
              className="w-4 h-4 mr-2 accent-red-500"
            />
            Set as default shipping address
          </label>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#19745B] hover:bg-red-600 text-white font-medium rounded-full px-8 py-2 shadow-sm transition"
            >
              Confirm
            </button>
            <button
              type="button"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-full px-8 py-2 transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* ========== RIGHT: Order Summary ========== */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total Quantity:</span> <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span> <span>1500 Taka</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span> <span>150 Taka</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span> <span>50 Taka</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Grand Total:</span> <span>1700 Taka</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
