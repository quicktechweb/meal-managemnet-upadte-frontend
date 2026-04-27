import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useInventoryProductLists,
  useSellerCreate,
} from "../../api/cms/user.hook";

const buyerLists = [
  { id: 1, buyer_name: "Mr. Rahim" },
  { id: 2, buyer_name: "Mr. Karim" },
  { id: 3, buyer_name: "Mr. Malek" },
  { id: 4, buyer_name: "Mr. Kuddush" },
];

const InventoryPurchase = () => {
  const { data: products } = useInventoryProductLists();

  // seller

  const { mutateAsync, isPending } = useSellerCreate();
  

  const [sellers, setSellers] = useState([
    { id: 1, seller_name: "Mr. Rahim" },
    { id: 2, seller_name: "Mr. Karim" },
    { id: 3, seller_name: "Mr. Malek" },
    { id: 4, seller_name: "Mr. Kuddush" },
  ]);

  // Modal states
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [newSellerName, setNewSellerName] = useState("");

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

  const [purchaseForm, setPurchaseForm] = useState({
    productId: "",
    seller: "",
    buyer: "",
    transport_cost: "",
    discount: "",
    price: "",
    selling_price: "",
    quantity: "",
    unit: "",
  });

  const calculateTotal = () => {
    const price = parseFloat(purchaseForm.price) || 0;
    const quantity = parseFloat(purchaseForm.quantity) || 0;
    const discount = parseFloat(purchaseForm.discount) || 0;
    const subtotal = price * quantity;
    const total = subtotal - subtotal * (discount / 100);
    return total > 0 ? total.toFixed(2) : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!purchaseForm.productId) {
      showToast("Select product", "error");
      return;
    }
    if (!purchaseForm.price || !purchaseForm.quantity) {
      showToast("Fill all required fields", "error");
      return;
    }

    setPurchaseForm({
      productId: "",
      seller: "",
      buyer: "",
      transport_cost: "",
      discount: "",
      price: "",
      selling_price: "",
      quantity: "",
      unit: "",
    });

    showToast("Purchase added ✓");
  };

  // Handle adding a new seller
  const handleAddSeller = (e) => {
    e.preventDefault();

    const newSeller = {
      id: Date.now(),
      seller_name: newSellerName.trim(),
    };

    setSellers([...sellers, newSeller]);

    setPurchaseForm({ ...purchaseForm, seller: newSeller.id });

    // Reset and close modal
    setNewSellerName("");
    setIsSellerModalOpen(false);
    document.body.style.overflow = "visible";
  };

  const openSellerModal = () => {
    setIsSellerModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSellerModal = () => {
    setIsSellerModalOpen(false);
    document.body.style.overflow = "visible";
    setNewSellerName("");
  };

  return (
    <div className=" mx-auto p-4 relative">
      <form
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Purchase Product
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Enter the details of your new inventory purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Product */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Product <span className="text-red-500">*</span>
            </label>
            <select
              value={purchaseForm.productId}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, productId: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Price (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={purchaseForm.price}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, price: e.target.value })
              }
              placeholder="e.g. 2345"
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={purchaseForm.quantity}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, quantity: e.target.value })
              }
              placeholder="e.g. 100"
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
          </div>

          {/* Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Unit</label>
            <select
              value={purchaseForm.unit}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, unit: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Unit</option>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              value={purchaseForm.discount}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, discount: e.target.value })
              }
              placeholder="e.g. 10"
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
          </div>

          {/* Seller Name */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Seller
              </label>
              <button
                type="button"
                onClick={openSellerModal}
                className="text-xs cursor-pointer text-white flex items-center justify-center font-semibold w-[16px] h-[16px] rounded-full bg-blue-600 hover:bg-blue-700 transition"
              >
                <FaPlus />
              </button>
            </div>
            <select
              value={purchaseForm.seller}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, seller: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Seller</option>
              {sellers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.seller_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buyer Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Buyer</label>
            <select
              value={purchaseForm.buyer}
              onChange={(e) =>
                setPurchaseForm({ ...purchaseForm, buyer: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Buyer</option>
              {buyerLists.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.buyer_name}
                </option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="text"
              value={calculateTotal() ? `৳ ${calculateTotal()}` : ""}
              placeholder="Calculated automatically"
              readOnly
              className="w-full bg-gray-100 border border-gray-200 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
          >
            Confirm Purchase
          </button>
        </div>
      </form>

      {/* --- Seller Add Modal --- */}
      {isSellerModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 w-full h-full z-40 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeSellerModal}
          />

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 w-11/12 max-w-sm p-6 animate-[slideIn_0.2s_ease]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Seller
            </h3>

            <form onSubmit={handleAddSeller} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Seller Name
                </label>
                <input
                  type="text"
                  value={newSellerName}
                  onChange={(e) => setNewSellerName(e.target.value)}
                  placeholder="e.g. Mr. Shafiq"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeSellerModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Save Seller
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryPurchase;
