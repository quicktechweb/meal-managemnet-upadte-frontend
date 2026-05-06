import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useBalanceList } from "../../api/cms/user.hook";

const getInitials = (email) => email?.slice(0, 2).toUpperCase() ?? "??";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatAmount = (amount) => "৳" + Number(amount).toLocaleString("en-BD");

const BalancePage = () => {
  const { data, isLoading } = useBalanceList();

  console.log(data);

  const list = data ?? [];

  const totalAmount = list.reduce((sum, b) => sum + (b.amount ?? 0), 0);
  const unassigned = list.filter((b) => !b.user).length;

  return (
    <div className=" mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">Balance lists</h2>
        <Link
          to="/dashboards/add-balance"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus size={15} />
          Add balance
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Total entries", value: list.length },
          {
            label: "Total amount",
            value: formatAmount(totalAmount),
            green: true,
          },
        ].map((m) => (
          <div key={m.label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{m.label}</p>
            <p
              className={`text-xl font-medium ${m.green ? "text-green-700" : "text-gray-900"}`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-sm text-gray-400 text-center py-10">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {list.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 transition"
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                  item.user
                    ? "bg-blue-50 text-blue-800"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {item.user ? getInitials(item.user.email) : "—"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {item.user ? (
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.user.email}
                  </p>
                ) : (
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">
                    User not found
                  </span>
                )}
                <p className="text-xs text-gray-400 mt-0.5">
                  Added by {item.added_by?.email}
                </p>
                {item.note && (
                  <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-50 rounded px-2 py-0.5">
                    {item.note}
                  </span>
                )}
              </div>

              {/* Amount + Date */}
              <div className="text-right flex-shrink-0">
                <p className="text-base font-medium text-green-700">
                  {formatAmount(item.amount)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalancePage;
