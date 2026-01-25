import React, { useState } from "react";

const data = {
  user: {
    name: "Quick Tech",
    email: "quicktech@gmail.com",
    phone: "01517834534",
  },
  order: [
    {
      id: 0,
      name: "Quick Tech",
      phone: "01517834534",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil",
      mealInfo: [
        {
          date: "2026-01-01 (Thu)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu, Piaj Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            {
              type: "dinner",
              price: 120,
              items: ["Murgir Jhol + Shobji Lettuce"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-03 (Sat)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu Vorta + Dal"] },
            {
              type: "lunch",
              price: 150,
              items: ["Murgi + Mach/Mangsho + Dal"],
            },
            {
              type: "dinner",
              price: 120,
              items: ["Bhat, Alu (Dim-er shonge)"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-05 (Mon)",
          meals: [
            {
              type: "breakfast",
              price: 80,
              items: ["Nesco/Soup + Bhat/Parota"],
            },
            {
              type: "lunch",
              price: 150,
              items: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
            },
            { type: "dinner", price: 120, items: ["Bhat, Dal + Alu Vorta"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-07 (Wed)",
          meals: [
            { type: "breakfast", price: 80, items: ["Dim Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Fish Curry + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Murgir Jhol + Bhat"] },
          ],
          total: 350,
        },
      ],
    },
    {
      id: 1,
      name: "Naymur Rahman",
      phone: "01517834324",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
      mealInfo: [
        {
          date: "2026-01-01 (Thu)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu, Piaj Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            {
              type: "dinner",
              price: 120,
              items: ["Murgir Jhol + Shobji Lettuce"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-04 (Sun)",
          meals: [
            { type: "breakfast", price: 80, items: ["Shobji Parota/Pitha"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            {
              type: "dinner",
              price: 120,
              items: ["Murgir Jhol + Bhaja Shobji"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-05 (Mon)",
          meals: [
            {
              type: "breakfast",
              price: 80,
              items: ["Nesco/Soup + Bhat/Parota"],
            },
            {
              type: "lunch",
              price: 150,
              items: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
            },
            { type: "dinner", price: 120, items: ["Bhat, Dal + Alu Vorta"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-08 (Thu)",
          meals: [
            { type: "breakfast", price: 80, items: ["Pitha + Chai"] },
            { type: "lunch", price: 150, items: ["Murgi + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Bhat + Shobji + Dal"] },
          ],
          total: 350,
        },
      ],
    },
    {
      id: 2,
      name: "Sakil Ahmed",
      phone: "01712345678",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil",
      mealInfo: [
        {
          date: "2026-01-01 (Thu)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu, Piaj Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            {
              type: "dinner",
              price: 120,
              items: ["Murgir Jhol + Shobji Lettuce"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-04 (Sun)",
          meals: [
            { type: "breakfast", price: 80, items: ["Shobji Parota/Pitha"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            {
              type: "dinner",
              price: 120,
              items: ["Murgir Jhol + Bhaja Shobji"],
            },
          ],
          total: 350,
        },
        {
          date: "2026-01-06 (Tue)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach (Bhaji/Porha) + Dal"] },
            { type: "dinner", price: 120, items: ["Bhat + Dim"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-09 (Fri)",
          meals: [
            { type: "breakfast", price: 80, items: ["Dim Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Murgi + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Fish Curry + Bhat"] },
          ],
          total: 350,
        },
      ],
    },
    {
      id: 3,
      name: "Arif Hossain",
      phone: "01987654321",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif",
      mealInfo: [
        {
          date: "2026-01-02 (Fri)",
          meals: [
            { type: "breakfast", price: 80, items: ["Pitha + Chai"] },
            { type: "lunch", price: 150, items: ["Beef Curry + Rice"] },
            { type: "dinner", price: 120, items: ["Dal + Bhat + Shobji"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-03 (Sat)",
          meals: [
            { type: "breakfast", price: 80, items: ["Dim Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Murgir Jhol + Bhat"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-05 (Mon)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Murgi + Bhat + Dal"] },
            { type: "dinner", price: 120, items: ["Fish Curry + Rice"] },
          ],
          total: 350,
        },
      ],
    },
    {
      id: 4,
      name: "Fatema Khatun",
      phone: "01876543210",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatema",
      mealInfo: [
        {
          date: "2026-01-01 (Thu)",
          meals: [
            { type: "breakfast", price: 80, items: ["Pitha + Chai"] },
            { type: "lunch", price: 150, items: ["Beef + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Dal + Shobji + Bhat"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-04 (Sun)",
          meals: [
            { type: "breakfast", price: 80, items: ["Dim Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Mach + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Murgir Jhol + Bhat"] },
          ],
          total: 350,
        },
        {
          date: "2026-01-07 (Wed)",
          meals: [
            { type: "breakfast", price: 80, items: ["Alu Vorta + Dal"] },
            { type: "lunch", price: 150, items: ["Murgi + Rice + Dal"] },
            { type: "dinner", price: 120, items: ["Fish Curry + Bhat"] },
          ],
          total: 350,
        },
      ],
    },
  ],
};

const MessOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getTotalPrice = (mealInfo) =>
    mealInfo.reduce((sum, day) => sum + day.total, 0);

  return (
    <div className="p-2 md:p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mess Orders</h2>
        <p className="text-gray-500">Managed by {data.user.name}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Meal Days</th>
              <th className="px-6 py-4 text-left">Total Price</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.order.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="font-medium text-gray-800">{item.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.phone}</td>
                <td className="px-6 py-4">{item.mealInfo.length}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {getTotalPrice(item.mealInfo)} ৳
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition cursor-pointer"
                    onClick={() => setSelectedOrder(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl h-[90vh] p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedOrder.img}
                alt={selectedOrder.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedOrder.name}
                </h3>
                <p className="text-gray-500">{selectedOrder.phone}</p>
                <p className="mt-1 font-medium">
                  Total Price: {getTotalPrice(selectedOrder.mealInfo)} ৳
                </p>
              </div>
            </div>

            {/* Date-wise Meal Details */}
            <div className="space-y-4 h-[65vh] overflow-y-auto">
              {selectedOrder.mealInfo.map((day, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    {day.date} - Total: {day.total} ৳
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.map((meal, i) => (
                      <div key={i} className="bg-white p-3 rounded-md shadow">
                        <p className="font-medium text-gray-600 capitalize">
                          {meal.type} - {meal.price} ৳
                        </p>
                        <ul className="text-gray-700 text-xs mt-1 list-disc list-inside">
                          {meal.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessOrder;
