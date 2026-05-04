import React from "react";
import { useInventoryStock } from "../../api/cms/user.hook";

const StockList = () => {
  const { data } = useInventoryStock();

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold mb-3">Inventory Stock List</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Current Stock</th>
              <th className="px-6 py-4">Stock In</th>
              <th className="px-6 py-4">Stock Out</th>
              <th className="px-6 py-4">Last Price</th>
              <th className="px-6 py-4">Avg Price</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                {/* Product */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                  </div>
                </td>

                {/* Current Stock */}
                <td className="px-6 py-4 font-medium">
                  {item.current_quantity} {item.unit}
                </td>

                {/* Stock In */}
                <td className="px-6 py-4 text-green-600 font-medium">
                  +{item.total_stock_in}
                </td>

                {/* Stock Out */}
                <td className="px-6 py-4 text-red-500 font-medium">
                  -{item.total_stock_out}
                </td>

                {/* Prices */}
                <td className="px-6 py-4">৳{item.last_purchase_price}</td>
                <td className="px-6 py-4">৳{item.average_purchase_price}</td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;
