import { useState } from "react";
import {
  Trophy,
  Gift,
  CalendarDays,
  Clock,
  Truck,
  DollarSign,
  User,
} from "lucide-react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

export default function WinnerStatics() {
  const winners = [
    { name: "Ayesha Rahman", product: "Wireless Earbuds", ticket: "WIN-39482", date: "2025-09-15", status: "shipped" },
    { name: "Shafin Ahmed",  product: "Smartwatch",       ticket: "WIN-40127", date: "2025-09-17", status: "pending" },
    { name: "Nadia Khan",    product: "Gift Voucher 1000৳", ticket: "WIN-40901", date: "2025-09-20", status: "repurchase" },
  ];

  // filter state
  const [filter, setFilter] = useState("ALL");

  // filter logic demo
  const filteredWinners = winners.filter((w) => {
    if (filter === "ALL") return true;
    if (filter === "TOTAL WINNERS") return true; // same as all
    if (filter === "COUPONS WITH WINNERS") return w.product.toLowerCase().includes("voucher");
    if (filter === "RECENT WINNERS (30 DAYS)") {
      const d = new Date(w.date);
      const thirty = new Date();
      thirty.setDate(thirty.getDate() - 30);
      return d >= thirty;
    }
    if (filter === "PENDING CHOICES") return w.status === "pending";
    if (filter === "SHIPPING CHOICES") return w.status === "shipped";
    if (filter === "REPURCHASE CHOICES") return w.status === "repurchase";
    return true;
  });

  const stats = [
    { label: "TOTAL WINNERS",       icon: <Trophy className="w-6 h-6" /> },
    { label: "COUPONS WITH WINNERS",icon: <Gift className="w-6 h-6" /> },
    { label: "RECENT WINNERS (30 DAYS)", icon: <CalendarDays className="w-6 h-6" /> },
    { label: "PENDING CHOICES",     icon: <Clock className="w-6 h-6" /> },
    { label: "SHIPPING CHOICES",    icon: <Truck className="w-6 h-6" /> },
    { label: "REPURCHASE CHOICES",  icon: <DollarSign className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ScrollToTop/>
      {/* ===== Winners Statistics ===== */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Winners Statistics
        </h1>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Click a card to filter the table below
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((item) => (
            <button
              key={item.label}
              onClick={() => setFilter(item.label)}
              className={`bg-white border rounded-lg shadow-sm p-5 flex flex-col items-center text-center transition 
                ${filter === item.label ? "border-green-600 ring-2 ring-green-600" : "border-gray-200 hover:border-green-400"}`}
            >
              <div className="text-green-600">{item.icon}</div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {item.label === "TOTAL WINNERS" ? winners.length : 
                 filteredWinners.length}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">{item.label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Recent Winners Table ===== */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {filter === "ALL" ? "All Winners" : filter}
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          {filter === "ALL"
            ? "Latest lucky winners and their prizes"
            : `Showing results for: ${filter}`}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left font-medium flex items-center gap-1">
                  <User className="w-4 h-4" /> WINNER
                </th>
                <th className="py-3 px-4 text-left font-medium">🎁 COUPON PRODUCT</th>
                <th className="py-3 px-4 text-left font-medium">🎫 WINNING TICKET</th>
                <th className="py-3 px-4 text-left font-medium">🗓 WON DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredWinners.length > 0 ? (
                filteredWinners.map((w, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">{w.name}</td>
                    <td className="py-3 px-4 text-gray-700">{w.product}</td>
                    <td className="py-3 px-4 text-gray-700">{w.ticket}</td>
                    <td className="py-3 px-4 text-gray-700">{w.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No winners found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
