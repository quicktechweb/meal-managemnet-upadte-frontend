import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const UserDashboardHome = () => {
  const [mealStatus, setMealStatus] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
  });

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Alex!
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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
          <StatCard
            title="Total Meals (Month)"
            value="42"
            sub="+3 from last month"
            color="indigo"
          />
          <StatCard
            title="Current Meal Rate"
            value="৳ 2.10"
            sub="Fixed rate"
            color="emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Meal Toggle Section */}
          <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Today's Meal Attendance
            </h2>
            <div className="flex flex-col gap-2.5">
              <MealToggle
                label="Breakfast"
                time="8:00 AM - 10:00 Am"
                isOn={mealStatus.breakfast}
                toggle={() =>
                  setMealStatus({
                    ...mealStatus,
                    breakfast: !mealStatus.breakfast,
                  })
                }
              />
              <MealToggle
                label="Lunch"
                time="1:00 PM - 2:30 PM"
                isOn={mealStatus.lunch}
                toggle={() =>
                  setMealStatus({ ...mealStatus, lunch: !mealStatus.lunch })
                }
              />
              <MealToggle
                label="Dinner"
                time="8:00 PM - 9:30 PM"
                isOn={mealStatus.dinner}
                toggle={() =>
                  setMealStatus({ ...mealStatus, dinner: !mealStatus.dinner })
                }
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Recent Transactions
            </h2>
            <div className="space-y-4">
              <TransactionItem
                date="Oct 24"
                type="Meal Deduction"
                amount="-৳2.10"
              />
              <TransactionItem
                date="Oct 23"
                type="Deposit"
                amount="+৳50.00"
                positive
              />
              <TransactionItem
                date="Oct 23"
                type="Meal Deduction"
                amount="-৳4.20"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Meal Activity Section */}
        <div className="bg-white p-5 mt-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Meal Activity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Breakfast Activity */}
            <div className="flex flex-col p-4 rounded-xl border border-gray-50 bg-gray-50/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    Breakfast
                  </p>
                  <p className="text-xl font-bold text-gray-800">৳120.00</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  SERVED
                </span>
              </div>
              <button className="w-full py-2 bg-white border border-indigo-100 text-indigo-600 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                Review Meal
              </button>
            </div>

            {/* Lunch Activity (Example of another state) */}
            <div className="flex flex-col p-4 rounded-xl border border-gray-50 bg-gray-50/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    Lunch
                  </p>
                  <p className="text-xl font-bold text-gray-800">৳150.00</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  PENDING
                </span>
              </div>
              <button
                className="w-full py-2 bg-white border border-gray-100 text-gray-400 text-sm font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                Wait for Serve
              </button>
            </div>

            {/* Dinner Activity (Placeholder) */}
            <div className="flex flex-col p-4 rounded-xl border border-gray-50 bg-gray-50/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    Dinner
                  </p>
                  <p className="text-xl font-bold text-gray-800">--</p>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  UPCOMING
                </span>
              </div>
              <button
                className="w-full py-2 bg-white border border-gray-100 text-gray-400 text-sm font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, sub, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    <p className="text-xs text-gray-400 mt-2">{sub}</p>
  </div>
);

const MealToggle = ({ label, time, isOn, toggle }) => (
  <div className="flex items-center justify-between  rounded-lg border border-gray-50 bg-gray-50/50">
    <div>
      <p className="font-bold text-gray-800">{label}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium transition ${isOn ? "bg-green-100  text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {isOn ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {isOn ? "On" : "Off"}
    </button>
  </div>
);

const TransactionItem = ({ date, type, amount, positive = false }) => (
  <div className="flex justify-between items-center text-sm">
    <div>
      <p className="font-medium text-gray-800">{type}</p>
      <p className="text-gray-400">{date}</p>
    </div>
    <span
      className={`font-bold ${positive ? "text-green-600" : "text-gray-700"}`}
    >
      {amount}
    </span>
  </div>
);

export default UserDashboardHome;
