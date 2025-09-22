import { useState } from "react";

const PostMarketPlace =() => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "Tools",
    condition: "Used – like new",
    brand: "",
    description: "",
    location: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  flex-col md:flex-row gap-6 p-6 mt-12">
      {/* Left Side Form */}
      <form
        onSubmit={handleSubmit}
        className="md:w-1/3 bg-white w-full p-6 rounded shadow max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Item for Sale</h2>

        {/* Upload Photo */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Photo</label>
          <div className="w-full h-40 bg-gray-100 border border-dashed flex items-center justify-center text-gray-500 rounded relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <span className="z-10">Click to upload image</span>
          </div>
        </div>

        {/* Form Fields */}
        {[
          { label: "Title", name: "title", type: "text", placeholder: "Enter product title" },
          { label: "Price (৳)", name: "price", type: "number", placeholder: "Enter price" },
        ].map(({ label, name, type, placeholder }) => (
          <div className="mb-3" key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={placeholder}
            />
          </div>
        ))}

        {/* Category */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Tools</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Home & Living</option>
            <option>Health & Beauty</option>
          </select>
        </div>

        {/* Condition */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Condition</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Used – like new</option>
            <option>Brand new</option>
            <option>Used – good</option>
          </select>
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter brand name"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Write something about the item..."
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter location"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Post
        </button>
      </form>

      {/* Right Side Preview */}
      <div className="w-2/3 h-[440px] bg-white p-6 rounded shadow md:block hidden">
        <h2 className="text-xl font-semibold mb-2 -mt-2">Preview</h2>

        <div className="flex border border-gray-300 rounded overflow-hidden">
          {/* Image */}
          <div className="w-1/2 h-[370px] bg-gray-200 flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No image uploaded</span>
            )}
          </div>

          {/* Info */}
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">{form.title || "Title"}</h3>
              <p className="text-lg text-gray-700 mb-1">
                ৳{form.price || "0"}
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Condition:</strong> {form.condition}</p>
                <p><strong>Brand:</strong> {form.brand || "N/A"}</p>
                <p><strong>Description:</strong> {form.description || "None"}</p>
                <p><strong>Location:</strong> {form.location || "Not set"}</p>
                <p><strong>Category:</strong> {form.category}</p>
              </div>
            </div>

            {/* Seller Info (Always visible) */}
            <div className="mt-4 border-t pt-3">
              <h4 className="text-md font-semibold mb-1">Seller information</h4>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-800">Fozle Hasan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostMarketPlace;