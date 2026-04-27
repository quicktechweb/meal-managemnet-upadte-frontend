import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphone" },
  { id: 2, name: "Leather Notebook" },
  { id: 3, name: "USB-C Hub" },
  { id: 4, name: "Desk Lamp" },
];

const InventoryPurchase = () => {
  const [toast, setToast] = useState(null);

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

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const [purchaseForm, setPurchaseForm] = useState({
    productId: "",
    price: "",
    quantity: "",
    unit: "Pieces",
  });

  return (
    <div>
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

          const product = products.find((p) => p.id == purchaseForm.productId);

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
            <label className="text-sm text-gray-500">Purchase Price</label>
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
  );
};

export default InventoryPurchase;
