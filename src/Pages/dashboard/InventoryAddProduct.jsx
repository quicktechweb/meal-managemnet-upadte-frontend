import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphone",
    // price: 1200,
    // sell_price: 1500,
    image: null,
  },
  { id: 2, name: "Leather Notebook", image: null },
  { id: 3, name: "USB-C Hub", image: null },
  { id: 4, name: "Desk Lamp", image: null },
];

const InventoryAddProduct = () => {
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    // price: "",
    // sell_price: "",
    image: null,
  });
  const [products, setProducts] = useState(initialProducts);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL for the uploaded image to display it immediately
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.sell_price) {
      showToast("Please fill all required fields", "error");
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,

      image: newProduct.image,
    };

    setProducts([product, ...products]);
    setNewProduct({ name: "", image: null });
    setShowAddForm(false);
    showToast(`${product.name} added successfully`);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="  min-h-screen text-slate-800 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium shadow-2xl backdrop-blur-lg transition-all animate-[fadeIn_0.3s] ${
            toast.type === "success"
              ? "bg-emerald-100/90 text-emerald-800 border border-emerald-200"
              : "bg-rose-100/90 text-rose-800 border border-rose-200"
          }`}
        >
          <span className="text-xl">
            {toast.type === "success" ? "✅" : "⚠️"}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your products and pricing
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:shadow transition-all flex items-center gap-2"
        >
          {showAddForm ? "✕ Cancel Adding" : "+ Add New Product"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
        <input
          className="w-full bg-white border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition shadow-sm placeholder:text-slate-400"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 animate-[fadeIn_0.2s]"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-700 border-b pb-3">
            Add New Product
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                placeholder="e.g. Wireless Mouse"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>

            {/* <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Buy Price <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>
            </div> */}

            {/* <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Sell Price <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                  placeholder="0.00"
                  value={newProduct.sell_price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      sell_price: e.target.value,
                    })
                  }
                />
              </div>
            </div> */}

            {/* Product Image Input */}
            <div className="md:col-span-2 lg:col-span-4 flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                  Product Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              {/* Image Preview in Form */}
              {newProduct.image && (
                <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden shrink-0 mt-5">
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition"
            >
              Save Product
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 text-left font-semibold">
                  Product Lists
                </th>
                {/* <th className="px-6 py-4 text-left font-semibold">Buy Price</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Sell Price
                </th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((p) => {
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        <div className="flex items-center gap-4">
                          {/* Product Image / Fallback Avatar */}
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg overflow-hidden shrink-0">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              p.name.charAt(0)
                            )}
                          </div>
                          <span className="font-semibold">{p.name}</span>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-slate-600">
                        ৳ {p.price}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        ৳ {p.sell_price}
                      </td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <div className="text-4xl mb-3">📦</div>
                    <p className="text-slate-500 text-sm font-medium">
                      No products found
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Try adjusting your search or add a new product.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryAddProduct;
