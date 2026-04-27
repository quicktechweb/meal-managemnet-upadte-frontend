import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Wireless Headphone" },
  { id: 2, name: "Leather Notebook" },
  { id: 3, name: "USB-C Hub" },
  { id: 4, name: "Desk Lamp" },
];

const InventoryAddProduct = () => {
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "" });
  const [products, setProducts] = useState(initialProducts);
  const handleAddProduct = () => {
    if (!newProduct.name) {
      showToast("Please fill all fields", "error");
      return;
    }
    const product = { id: Date.now(), name: newProduct.name };
    setProducts([...products, product]);
    setNewProduct({ name: "" });
    setShowAddForm(false);
    showToast(`${product.name} added`);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-xl text-sm placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all shadow-sm whitespace-nowrap"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border border-blue-200 rounded-2xl p-5 mb-5 flex gap-3 items-center shadow-sm">
          <input
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
          />
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
            onClick={handleAddProduct}
          >
            Add
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-widest">
                Product
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors duration-150"
              >
                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                  {p.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryAddProduct;
