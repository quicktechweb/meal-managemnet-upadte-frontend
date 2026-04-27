import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Wireless Headphone" },
  { id: 2, name: "Leather Notebook" },
  { id: 3, name: "USB-C Hub" },
  { id: 4, name: "Desk Lamp" },
];

const TABS = ["Inventory", "Purchase", "History"];

export default function InventoryPage() {
  const [tab, setTab] = useState("Inventory");
  const [products, setProducts] = useState(initialProducts);
  const [history, setHistory] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "" });

  const UNITS = [
    "Pieces",
    "Dozen",
    "Gram",
    "Kilogram",
    "Liter",
    "Milliliter",
    "Meter",
    "Box",
  ];

  // purchaseInputs: { productId: { amount: string, unit: string } }
  const [purchaseInputs, setPurchaseInputs] = useState({});
  // cart: { productId, name, amount, unit }[]
  const [cart, setCart] = useState([]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

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

  const [purchaseForm, setPurchaseForm] = useState({
    productId: "",
    price: "",
    quantity: "",
    unit: "Pieces",
  });

  return (
    <div className="min-h-screen  ">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm border shadow-lg ${
            toast.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 px-10 py-4 flex items-center shadow-sm">
        <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm transition-all duration-200 ${
                tab === t
                  ? "bg-blue-400 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className=" mx-auto px-10 py-9">
        {/* ── PURCHASE ── */}
        {tab === "Purchase" && (
          <div>
            <form
              className="bg-white rounded-2xl shadow-md p-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                if (!purchaseForm.productId) {
                  showToast("Select product", "error");
                  return;
                }
                if (!purchaseForm.price || !purchaseForm.quantity) {
                  showToast("Fill all fields", "error");
                  return;
                }

                const product = products.find(
                  (p) => p.id == purchaseForm.productId,
                );

                const entry = {
                  id: Date.now(),
                  date: new Date().toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                  items: [
                    {
                      productId: product.id,
                      name: product.name,
                      amount: purchaseForm.quantity,
                      unit: purchaseForm.unit,
                      price: purchaseForm.price,
                    },
                  ],
                };

                setHistory((prev) => [entry, ...prev]);

                setPurchaseForm({
                  productId: "",
                  price: "",
                  quantity: "",
                  unit: "Pieces",
                });

                showToast("Purchase added ✓");
              }}
            >
              <h3 className="text-lg font-semibold">Purchase Product</h3>

              <div className="flex items-center gap-4">
                {/* Product */}
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Product</label>
                  <select
                    value={purchaseForm.productId}
                    onChange={(e) =>
                      setPurchaseForm({
                        ...purchaseForm,
                        productId: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="flex-1">
                  <label className="text-sm text-gray-500">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    value={purchaseForm.price}
                    placeholder="৳ 1000"
                    onChange={(e) =>
                      setPurchaseForm({
                        ...purchaseForm,
                        price: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                {/* Quantity */}
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Quantity</label>
                  <input
                    type="number"
                    value={purchaseForm.quantity}
                    placeholder="e.g 199"
                    onChange={(e) =>
                      setPurchaseForm({
                        ...purchaseForm,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                {/* Unit */}
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Unit</label>
                  <select
                    value={purchaseForm.unit}
                    onChange={(e) =>
                      setPurchaseForm({
                        ...purchaseForm,
                        unit: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Total Price</label>
                  <input
                    type="number"
                    value={
                      purchaseForm.price && purchaseForm.quantity
                        ? purchaseForm.price * purchaseForm.quantity
                        : ""
                    }
                    placeholder="Total price calculate here.."
                    readOnly
                    className="w-full bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Confirm Purchase
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── HISTORY ── */}
        {tab === "History" && (
          <>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
              Purchase History
            </p>
            {history.length === 0 ? (
              <p className="text-center text-gray-300 text-sm py-16">
                No purchases yet
              </p>
            ) : (
              history.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl mb-4 shadow-md overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs text-gray-400">
                      🕐 {entry.date}
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">
                      PURCHASE #{history.length - idx}
                    </span>
                  </div>
                  {entry.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full font-semibold">
                        {item.amount} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </>
        )}
      </main>
    </div>
  );
}
