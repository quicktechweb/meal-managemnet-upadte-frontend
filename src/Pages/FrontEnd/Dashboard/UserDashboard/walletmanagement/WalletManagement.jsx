import React, { useState } from "react";
import { PlusCircle, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

const transactionsData = [
  {
    id: 1,
    type: "Credit",
    amount: 500,
    date: "2026-01-20",
    description: "Top-up via Card",
  },
  {
    id: 2,
    type: "Debit",
    amount: 200,
    date: "2026-01-21",
    description: "Purchase: Food",
  },
  {
    id: 3,
    type: "Debit",
    amount: 100,
    date: "2026-01-22",
    description: "Purchase: Meal",
  },
  {
    id: 4,
    type: "Debit",
    amount: 150,
    date: "2026-01-23",
    description: "Purchase: Grocery",
  },
];

const WalletPage = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [balance, setBalance] = useState(
    transactionsData.reduce(
      (acc, t) => (t.type === "Credit" ? acc + t.amount : acc - t.amount),
      0,
    ),
  );
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");
  const [showAddFunds, setShowAddFunds] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const newTransaction = {
      id: Date.now(),
      type: "Credit",
      amount: parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      description: `Added via ${method.charAt(0).toUpperCase() + method.slice(1)}`,
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance((prev) => prev + newTransaction.amount);
    setAmount("");
    setShowAddFunds(false);
  };

  return (
    <div className="min-h-screen text-slate-900">
      <div className=" mx-auto space-y-4">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
            <p className="text-slate-500 text-sm">
              Manage your finances and top up easily.
            </p>
          </div>
        </header>

        {/* Balance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-4 text-white shadow shadow-blue-200">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1 flex items-center gap-2">
                <Wallet size={16} /> Total Balance
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                ৳
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
            <button
              onClick={() => setShowAddFunds(!showAddFunds)}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl transition-all duration-300 text-xs cursor-pointer"
            >
              <PlusCircle
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
              <span className="font-semibold">Add Funds</span>
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute right-20 -top-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* Dynamic Form Area */}
        {showAddFunds && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Top Up Wallet</h3>
              <button
                onClick={() => setShowAddFunds(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                  Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
                >
                  <option value="bkash">💳 Bkash</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-[10px] rounded-xl shadow-lg shadow-blue-100 transition active:scale-[0.98] cursor-pointer text-xs"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transactions Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-slate-800">
              Recent Activity
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {transactions.map((tx, idx) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                  idx !== transactions.length - 1
                    ? "border-b border-slate-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      tx.type === "Credit"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {tx.type === "Credit" ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownLeft size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{tx.description}</p>
                    <p className="text-xs text-slate-400 font-medium">
                      {tx.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.type === "Credit"
                        ? "text-emerald-600"
                        : "text-slate-900"
                    }`}
                  >
                    {tx.type === "Credit" ? "+" : "-"}৳
                    {tx.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    {tx.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
