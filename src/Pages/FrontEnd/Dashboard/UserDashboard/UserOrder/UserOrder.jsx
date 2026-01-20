import { Eye, Trash2, Banknote } from "lucide-react";
import SectionTitle from "../../../../../Components/SectionTitle";
import PropTypes from "prop-types";

const orderData = [
  {
    orderId: "ORD-1024",
    name: "Quick Tech",
    email: "quicktechltd@gmail.com",
    number: "0191523454345",
    status: "Pending",
    items: [
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
    ],
    branch_name: "Uttara",
  },
  {
    orderId: "ORD-1024",
    name: "Quick Tech",
    email: "quicktechltd@gmail.com",
    number: "0191523454345",
    status: "Pending",
    items: [
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
    ],
    branch_name: "Uttara",
  },
  {
    orderId: "ORD-1024",
    name: "Quick Tech",
    email: "quicktechltd@gmail.com",
    number: "0191523454345",
    status: "Pending",
    items: [
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
    ],
    branch_name: "Uttara",
  },
  {
    orderId: "ORD-1024",
    name: "Quick Tech",
    email: "quicktechltd@gmail.com",
    number: "0191523454345",
    status: "Pending",
    items: [
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
    ],
    branch_name: "Uttara",
  },
  {
    orderId: "ORD-1024",
    name: "Quick Tech",
    email: "quicktechltd@gmail.com",
    number: "0191523454345",
    status: "Pending",
    items: [
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
      {
        id: 1,
        date: "01-01-2026",
        breakFast: {
          menuItem: [
            { title: "Ruti", price: 30 },
            { title: "Baji", price: 20 },
          ],
        },
        lunch: {
          menuItem: [
            { title: "Rice", price: 30 },
            { title: "Chicken", price: 120 },
            { title: "Dal", price: 40 },
          ],
        },
        dinner: {
          menuItem: [
            { title: "Polao", price: 30 },
            { title: "Chicken", price: 30 },
            { title: "Kabab", price: 30 },
          ],
        },
      },
    ],
    branch_name: "Uttara",
  },
];

const OrderCard = ({ order, calculateTotal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 space-y-4 mt-2.5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-mono text-gray-400">{order.orderId}</p>
          <p className="text-sm font-bold text-gray-800">{order.name}</p>
          <p className="text-xs text-gray-500">{order.number}</p>
        </div>

        <span className="px-3 py-1  rounded-2xl text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
          {order.status}
        </span>
      </div>

      {/* Menu Items */}
      <div className="space-y-3 max-h-[180px] overflow-y-auto items-bar pr-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-[10px] text-gray-400 font-semibold">
              📅 {item.date}
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-orange-50 flex items-center gap-1.5 text-orange-700 px-2 py-1 rounded-md">
                <span className="text-[9px] font-bold bg-orange-500 text-white px-1 rounded">
                  Breakfast
                </span>
                {item.breakFast.menuItem.map((m) => m.title).join(", ")}
              </span>
              <span className="bg-green-50 flex items-center gap-1.5 text-green-700 px-2 py-1 rounded-md ">
                <span className="text-[9px] font-bold bg-green-500  text-white px-1 rounded">
                  Lunch
                </span>{" "}
                {item.lunch.menuItem.map((m) => m.title).join(", ")}
              </span>
              <span className="bg-indigo-50 flex items-center gap-1.5  text-indigo-700 px-2 py-1 rounded-md">
                <span className="text-[9px] font-bold bg-indigo-500 text-white px-1 rounded">
                  Dinner
                </span>{" "}
                {item.dinner.menuItem.map((m) => m.title).join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-black text-emerald-700">
            ৳{calculateTotal(order.items)}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:text-blue-600">
            <Eye size={18} />
          </button>
          <button className="p-3 bg-gray-50 border border-gray-200   rounded-xl hover:text-red-600">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  calculateTotal: PropTypes.func.isRequired,

  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    branch_name: PropTypes.string.isRequired,

    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,

        breakFast: PropTypes.shape({
          menuItem: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired,
            }),
          ).isRequired,
        }).isRequired,

        lunch: PropTypes.shape({
          menuItem: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired,
            }),
          ).isRequired,
        }).isRequired,

        dinner: PropTypes.shape({
          menuItem: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired,
            }),
          ).isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const UserOrder = () => {
  const calculateTotal = (items) => {
    return items.reduce((acc, day) => {
      const b = day.breakFast.menuItem.reduce((sum, i) => sum + i.price, 0);
      const l = day.lunch.menuItem.reduce((sum, i) => sum + i.price, 0);
      const d = day.dinner.menuItem.reduce((sum, i) => sum + i.price, 0);
      return acc + b + l + d;
    }, 0);
  };

  return (
    <div className="">
      <SectionTitle className="!text-black " title="User Orders" />

      <div className="lg:hidden space-y-4">
        {orderData.map((order, idx) => (
          <OrderCard key={idx} order={order} calculateTotal={calculateTotal} />
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 shadow-lg mt-3 mb-5">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-[#c78436] to-[#c78436] text-white border-b border-gray-200">
              {[
                "Order ID",
                "Customer",
                "Menu Items",
                "Total Price",
                "branch Name",
                "Status",
                "6th Hour",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#c78436]">
            {orderData.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-blue-50/30 transition-all group"
              >
                {/* Order ID */}
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-bold text-gray-400 group-hover:text-blue-600">
                    {order.orderId}
                  </span>
                </td>

                {/* Customer Info */}
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800">
                    {order.name}
                  </div>
                  <div className="text-xs text-gray-500">{order.number}</div>
                </td>

                {/* Menu Items  */}
                <td className="px-6 py-4 ">
                  <div className="h-[100px] flex flex-col gap-3 items-bar overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col  gap-1.5 ">
                        <p className="text-[10px] font-black text-gray-400 mb-1 italic">
                          Menu Date: {item.date}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-2 py-1 rounded-md">
                            <span className="text-[9px] font-bold bg-orange-500 text-white px-1 rounded">
                              Breakfast
                            </span>
                            <span className="text-[11px]  text-orange-800 font-medium">
                              {item.breakFast.menuItem
                                .map((m) => m.title)
                                .join(", ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 px-2 py-1 rounded-md">
                            <span className="text-[9px] font-bold bg-green-500 text-white px-1 rounded">
                              Lunch
                            </span>
                            <span className="text-[11px] text-green-800 font-medium">
                              {item.lunch.menuItem
                                .map((m) => m.title)
                                .join(", ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md">
                            <span className="text-[9px] font-bold bg-indigo-500 text-white px-1 rounded">
                              Dinner
                            </span>
                            <span className="text-[11px] text-indigo-800 font-medium">
                              {item.dinner.menuItem
                                .map((m) => m.title)
                                .join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                {/* total */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Banknote size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-emerald-700 leading-none">
                        ৳{calculateTotal(order.items)}
                      </div>
                    </div>
                  </div>
                </td>

                {/* branch naem */}
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800">
                    {order.branch_name}
                  </div>
                </td>

                {/* Status */}
                <td className="px-3 py-4">
                  <span className="relative inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tighter bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    {order.status}
                  </span>
                </td>

                <td className="px-3 py-4">
                  <p className="text-xs whitespace-nowrap px-2 flex items-center text-white rounded-md h-[20px] bg-violet-700 cursor-pointer">
                    Meal On/Off
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm rounded-xl transition-all cursor-pointer">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:shadow-sm rounded-xl transition-all cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrder;
