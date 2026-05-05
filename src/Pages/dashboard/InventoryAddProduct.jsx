import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import {
  useInventoryProductAdd,
  useInventoryProductLists,
} from "../../api/cms/user.hook";

const InventoryAddProduct = () => {
  const { data: initialProducts } = useInventoryProductLists();

  const { mutateAsync, isPending } = useInventoryProductAdd();

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(e.target.files[0]);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("image", imageUrl);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data?.name);

    formData.append("image", image);

    await mutateAsync(formData);

    reset();
    setImagePreview(null);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    reset();
    setImagePreview(null);
    setShowAddForm(false);
  };

  const filtered = initialProducts?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen text-slate-800 font-sans">
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
          <FaSearch />
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
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 animate-[fadeIn_0.2s]"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-700 border-b pb-3">
            Add New Product
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {/* Product Name */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition ${
                  errors.name ? "border-rose-400" : "border-slate-200"
                }`}
                placeholder="e.g. Wireless Mouse"
                {...register("name", {
                  required: "Product name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                  ⚠️ {errors.name.message}
                </p>
              )}
            </div>

            {/* Product Image */}
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

              {/* Image Preview */}
              {imagePreview && (
                <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden shrink-0 mt-5">
                  <img
                    src={imagePreview}
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
              onClick={handleCancel}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition"
            >
              {isPending ? "Saving" : "Save Product"}
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
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered?.length > 0 ? (
                filtered?.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg overflow-hidden shrink-0">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            p.title.charAt(0)
                          )}
                        </div>
                        <span className="font-semibold">{p.title}</span>
                      </div>
                    </td>
                  </tr>
                ))
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
