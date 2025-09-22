import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";

const EarnApplyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    nidImages: [],
    monitizetion:"pending"
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      nidImages: [...prev.nidImages, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      nidImages: prev.nidImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form Submitted Successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-20">
      <h2 className="text-xl font-bold text-green-600 mb-4">Earning Apply Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Number */}
        <div>
          <label className="block text-sm font-medium">Number</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* NID Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload NID (Both Sides)</label>
          <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center cursor-pointer hover:bg-green-50 transition">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="nid-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="nid-upload" className="flex flex-col items-center gap-2">
              <FiUploadCloud className="text-3xl text-green-500" />
              <span className="text-sm text-gray-500">Click or Drag & Drop to upload NID images</span>
            </label>
          </div>

          {/* Image Previews */}
          {formData.nidImages.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {formData.nidImages.map((img, i) => (
                <div key={i} className="relative w-24 h-20">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="NID Preview"
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium shadow-md"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default EarnApplyForm;
