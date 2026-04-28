import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {
  useInventoryProductLists,
  useSellerCreate,
  useSellerList,
} from "../../api/cms/user.hook";

const buyerLists = [
  { id: 1, buyer_name: "Mr. Rahim" },
  { id: 2, buyer_name: "Mr. Karim" },
  { id: 3, buyer_name: "Mr. Malek" },
  { id: 4, buyer_name: "Mr. Kuddush" },
];

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

const InventoryPurchase = () => {
  const { data: products } = useInventoryProductLists();
  const { mutateAsync, isPending } = useSellerCreate();
  const { data: sellers, isLoading } = useSellerList();

  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  // ─── Main purchase form ───────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: "",
      seller: "",
      buyer: "",
      transport_cost: "",
      discount: "",
      price: "",
      selling_price: "",
      quantity: "",
      unit: "",
    },
  });

  // ─── Seller modal form ────────────────────────────────────────────────────
  const {
    register: registerSeller,
    handleSubmit: handleSubmitSeller,
    reset: resetSeller,
    formState: { errors: sellerErrors },
  } = useForm();

  // ─── Live total calculation via watch ─────────────────────────────────────
  const price = parseFloat(watch("price")) || 0;
  const quantity = parseFloat(watch("quantity")) || 0;
  const discount = parseFloat(watch("discount")) || 0;
  const subtotal = price * quantity;
  const total = subtotal - subtotal * (discount / 100);
  const calculatedTotal = total > 0 ? total.toFixed(2) : "";

  // ─── Submit handlers ──────────────────────────────────────────────────────
  const onSubmit = (data) => {
    console.log("Purchase data:", data);
    // TODO: call your API here
    reset();
  };

  const onAddSeller = async (data) => {
    const newSeller = { seller_name: data.seller_name.trim() };

    mutateAsync(newSeller);

    resetSeller();
    closeSellerModal();
  };

  // ─── Modal helpers ────────────────────────────────────────────────────────
  const openSellerModal = () => {
    setIsSellerModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSellerModal = () => {
    setIsSellerModalOpen(false);
    document.body.style.overflow = "visible";
    resetSeller();
  };

  return (
    <div className="mx-auto p-4 relative">
      <form
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
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
              {...register("productId", { required: "Product is required" })}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Product</option>
              {products?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="text-xs text-red-500">{errors.productId.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Price (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2345"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
            {errors.price && (
              <p className="text-xs text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 100"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {/* Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Unit</label>
            <select
              {...register("unit")}
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
              placeholder="e.g. 10"
              {...register("discount", {
                min: { value: 0, message: "Discount can't be negative" },
                max: { value: 100, message: "Discount can't exceed 100%" },
              })}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            />
            {errors.discount && (
              <p className="text-xs text-red-500">{errors.discount.message}</p>
            )}
          </div>

          {/* Seller */}
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
              {...register("seller")}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
            >
              <option value="">Select Seller</option>
              {sellers?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.seller_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buyer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Buyer</label>
            <select
              {...register("buyer")}
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

          {/* Total Price (read-only, derived) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="text"
              value={calculatedTotal ? `৳ ${calculatedTotal}` : ""}
              placeholder="Calculated automatically"
              readOnly
              className="w-full bg-gray-100 border border-gray-200 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
          >
            Confirm Purchase
          </button>
        </div>
      </form>

      {/* ── Seller Modal ─────────────────────────────────────────────────────── */}
      {isSellerModalOpen && (
        <>
          <div
            className="fixed inset-0 w-full h-full z-40 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeSellerModal}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-11/12 max-w-sm p-6 animate-[slideIn_0.2s_ease]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Seller
            </h3>

            <form
              onSubmit={handleSubmitSeller(onAddSeller)}
              className="space-y-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Seller Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mr. Shafiq"
                  autoFocus
                  {...registerSeller("seller_name", {
                    required: "Seller name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2.5 rounded-lg text-sm transition-all"
                />
                {sellerErrors.seller_name && (
                  <p className="text-xs text-red-500">
                    {sellerErrors.seller_name.message}
                  </p>
                )}
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
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {isPending ? "Saving" : "Save Seller"}
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
