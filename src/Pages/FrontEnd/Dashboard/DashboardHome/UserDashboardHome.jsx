import React, { useState } from "react";
import {
  CheckCircle,
  MessageCircle,
  Send,
  ShieldCheck,
  Star,
  User,
  X,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const UserDashboardHome = () => {
  const [mealStatus, setMealStatus] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
  });
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [reviews, setReviews] = useState({
    Breakfast: {
      rating: 4,
      comment: "The paratha was a bit oily, but the curry was excellent!",
      ownerReply:
        "Thanks for the feedback, Alex! We'll tell the chef to go easy on the oil tomorrow.",
      date: "Oct 24, 9:15 AM",
    },
  });
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState("");

  const handleOpenModal = (mealName) => {
    setSelectedMeal(mealName);
    if (!reviews[mealName]) {
      setFormRating(0);
      setFormComment("");
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setReviews({
      ...reviews,
      [selectedMeal]: {
        rating: formRating,
        comment: formComment,
        ownerReply: null,
      },
    });
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Alex!
          </h1>
          <div className="flex items-center gap-4">
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
            <div className="flex mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold  text-gray-800">
                Today's Meal Attendance
              </h2>

              <p className="text-xs text-white font-semibold bg-rose-400 px-3 py-1 rounded-full">
                Meal on/off (within 6h / before 6h)
              </p>
            </div>
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
        <div className="bg-white p-6 mt-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Meal Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActivityCard
              label="Breakfast"
              price="৳120.00"
              status="SERVED"
              hasReview={!!reviews["Breakfast"]}
              onAction={() => handleOpenModal("Breakfast")}
            />

            <ActivityCard
              label="Lunch"
              price="৳150.00"
              status="SERVED"
              hasReview={!!reviews["Lunch"]}
              onAction={() => handleOpenModal("Lunch")}
            />

            <ActivityCard
              label="Dinner"
              price="--"
              status="UPCOMING"
              disabled
            />
          </div>
        </div>

        {selectedMeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h3 className="font-bold text-gray-800">
                  {reviews[selectedMeal]
                    ? "Review Thread"
                    : `Review Your ${selectedMeal}`}
                </h3>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                {reviews[selectedMeal] ? (
                  /* VIEW MODE: User Review + Owner Reply */
                  <div className="space-y-6">
                    {/* User's Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 bg-indigo-50/50 p-3 rounded-2xl rounded-tl-none border border-indigo-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-indigo-700">
                            You
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {reviews[selectedMeal].date}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < reviews[selectedMeal].rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {reviews[selectedMeal].comment}
                        </p>
                      </div>
                    </div>

                    {/* Owner's Reply */}
                    {reviews[selectedMeal].ownerReply ? (
                      <div className="flex gap-3">
                        <div className="flex-1 bg-emerald-50 p-3 rounded-2xl rounded-tr-none border border-emerald-100 ml-8">
                          <div className="flex items-center gap-1 mb-1">
                            <ShieldCheck
                              size={14}
                              className="text-emerald-600"
                            />
                            <span className="text-xs font-bold text-emerald-700">
                              Owner Response
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed italic">
                            "{reviews[selectedMeal].ownerReply}"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-xs text-gray-400 py-2">
                        Waiting for owner's response...
                      </p>
                    )}

                    <button
                      onClick={() => setSelectedMeal(null)}
                      className="w-full py-2.5 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  /* EDIT MODE: Submit New Review */
                  <form onSubmit={handleSubmitReview}>
                    <div className="flex gap-2 mb-6 justify-center">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Star
                          key={num}
                          size={32}
                          className={`cursor-pointer transition-all ${num <= formRating ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-200"}`}
                          onClick={() => setFormRating(num)}
                        />
                      ))}
                    </div>
                    <textarea
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      rows="4"
                      placeholder="Was the food hot? Tell us more..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 py-3 cursor-pointer bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send size={18} /> Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
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

const ActivityCard = ({
  label,
  price,
  status,
  hasReview,
  onAction,
  disabled,
}) => (
  <div className="flex flex-col p-4 rounded-xl border border-gray-100 bg-gray-50/50">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
          {label}
        </p>
        <p className="text-xl font-bold text-gray-800">{price}</p>
      </div>
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${status === "SERVED" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
      >
        {status}
      </span>
    </div>
    <button
      onClick={onAction}
      disabled={disabled}
      className={`w-full py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all border ${
        disabled
          ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
          : hasReview
            ? "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100"
            : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50"
      }`}
    >
      {hasReview ? <MessageCircle size={14} /> : null}
      {disabled ? status : hasReview ? "View Feedback" : "Review Meal"}
    </button>
  </div>
);

export default UserDashboardHome;
