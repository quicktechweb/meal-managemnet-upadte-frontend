import React from "react";
import {
  FaBell,
  FaUtensils,
  FaUsers,
  FaWallet,
  FaReceipt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
          <StatCard
            title="Today's Meals"
            value="90"
            icon={<FaUtensils className="text-orange-500" />}
            color="bg-orange-50"
          />
          <StatCard
            title="Total Members"
            value="30"
            icon={<FaUsers className="text-blue-500" />}
            color="bg-blue-50"
          />
          <StatCard
            title="Expenses Today"
            value="৳4,500"
            icon={<FaReceipt className="text-red-500" />}
            color="bg-red-50"
          />

          <Link to="/dashboard/wallet-management" className="group">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-indigo-100 font-medium">
                  Wallet Balance
                </span>
                <FaWallet className="text-indigo-200 text-xl" />
              </div>
              <span className="text-3xl font-bold text-white mt-4 block">
                ৳12,000
              </span>
              <span className="text-indigo-200 text-xs mt-2 block group-hover:underline">
                View Details →
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  <span className="flex items-center gap-3">
                    <FaPlus /> Add Funds
                  </span>
                  <span className="text-sm opacity-70">+৳5,000</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-rose-50 text-rose-700 rounded-xl font-semibold hover:bg-rose-100 transition-colors">
                  <span className="flex items-center gap-3">
                    <FaMinus /> Deduct Funds
                  </span>
                  <span className="text-sm opacity-70">-৳2,500</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transaction History (2/3 width) */}
          <div className="lg:col-span-2 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Transactions
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">
                See All
              </button>
            </div>

            <div className="space-y-1">
              <TransactionRow
                amount="5,000"
                date="25 Jan"
                type="credit"
                label="Funds Added"
              />
              <TransactionRow
                amount="2,500"
                date="24 Jan"
                type="debit"
                label="Market Shopping"
              />
              <TransactionRow
                amount="1,500"
                date="23 Jan"
                type="debit"
                label="Utility Bill"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
    <div
      className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 text-xl`}
    >
      {icon}
    </div>
    <span className="text-slate-500 font-medium block">{title}</span>
    <span className="text-2xl font-bold text-slate-800 mt-1 block">
      {value}
    </span>
  </div>
);

const TransactionRow = ({ amount, date, type, label }) => (
  <div className="flex items-center justify-between py-2 px-4 rounded-xl hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div
        className={`w-2 h-2 rounded-full ${type === "credit" ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      <div>
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>
    </div>
    <span
      className={`font-bold ${type === "credit" ? "text-emerald-600" : "text-slate-700"}`}
    >
      {type === "credit" ? "+" : "-"}৳{amount}
    </span>
  </div>
);

export default DashboardHome;
