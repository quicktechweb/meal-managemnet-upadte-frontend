import React, { useState } from "react";
import { useInventoryPurchaseProductList } from "../../api/cms/user.hook";
import { FaSearch } from "react-icons/fa";

const StatusBadge = ({ discount }) => {
  if (discount >= 10)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
        🔥 {discount}% OFF
      </span>
    );
  if (discount > 0)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        {discount}% OFF
      </span>
    );
  return null;
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array(7)
      .fill(0)
      .map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
  </tr>
);

const InventoryPurchaseProductLists = () => {
  const { data, isLoading } = useInventoryPurchaseProductList();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const purchases = data?.data || data || [];

  const filtered = purchases.filter((item) =>
    [item.product?.title, item.seller?.seller_name, item.buyer?.buyer_name]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    return sortDir === "asc" ? valA - valB : valB - valA;
  });

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <span className="text-gray-300 ml-1">↕</span>;
    return (
      <span className="text-indigo-500 ml-1">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const totalSpend = sorted.reduce(
    (acc, cur) => acc + (cur.total_price || 0),
    0,
  );
  const totalItems = sorted.reduce((acc, cur) => acc + (cur.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Purchase Lists
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your inventory purchases
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-xl">
            📦
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Purchase
            </p>
            <p className="text-2xl font-bold text-gray-800">{sorted.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-xl">
            💰
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Spend
            </p>
            <p className="text-2xl font-bold text-gray-800">
              ৳{totalSpend.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-xl">
            🔢
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Quantity
            </p>
            <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search product, seller, buyer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-gray-50 placeholder-gray-400"
            />
          </div>
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">{sorted.length}</span>{" "}
            records
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th
                  className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("price")}
                >
                  Price <SortIcon field="price" />
                </th>
                <th
                  className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("quantity")}
                >
                  Qty <SortIcon field="quantity" />
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Seller / Buyer
                </th>
                <th
                  className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 select-none"
                  onClick={() => handleSort("total_price")}
                >
                  Total <SortIcon field="total_price" />
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => <SkeletonRow key={i} />)
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🗃️</span>
                      <p className="text-sm font-medium">
                        No purchase records found
                      </p>
                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="text-xs text-indigo-500 underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                sorted.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-indigo-50/40 transition-colors duration-150 group"
                  >
                    {/* Index */}
                    <td className="px-5 py-4 text-gray-400 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-base shrink-0">
                          🌾
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product?.title || "—"}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {item._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-gray-700 font-medium">
                      ৳{item.price}
                      <span className="text-xs text-gray-400 ml-1">
                        /{item.unit}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-semibold text-xs">
                        {item.quantity} {item.unit}
                      </span>
                    </td>

                    {/* Discount */}
                    <td className="px-5 py-4">
                      <StatusBadge discount={item.discount} />
                      {item.discount === 0 && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>

                    {/* Seller / Buyer */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-gray-400">Seller:</span>
                          <span className="font-medium text-gray-700">
                            {item.seller?.seller_name || "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-gray-400">Buyer:</span>
                          <span className="font-medium text-gray-700">
                            {item.buyer?.buyer_name || "—"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className="px-5 py-4">
                      <span className="font-bold text-gray-900 text-base">
                        ৳{item.total_price?.toLocaleString()}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      <span className="text-gray-300">
                        {new Date(item.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {sorted.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 bg-gray-50/60">
            <span>{sorted.length} purchase products</span>
            <span className="font-semibold text-gray-600">
              Grand Total: ৳{totalSpend.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPurchaseProductLists;
