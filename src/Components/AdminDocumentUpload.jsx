import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { FaRegIdCard } from "react-icons/fa";

const AdminDocumentUpload = ({
  onDocumentsChange,
  initialDocuments = [],
  setAdminFormUploadData,
}) => {
  const [documentType, setDocumentType] = useState("");
  const [documentOptions, setDocumentOptions] = useState([
    "NID",
    "Passport",
    "Driving License",
  ]);

  const [documentNumber, setDocumentNumber] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedData, setUploadedData] = useState(initialDocuments);
  const [loading, setLoading] = useState(false);

  console.log(uploadedData);

  useEffect(() => {
    onDocumentsChange?.(uploadedData);
  }, [uploadedData, onDocumentsChange]);

  const handleCreateDocumentType = (newType) => {
    setDocumentOptions((prev) => [...prev, newType]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    });
  };

  const handleUpload = async () => {
    if (!documentType || !documentNumber || !image) {
      alert("Please select document type, number, and file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image.file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error("Upload failed");
      }
      const uploadedUrl = data.data.url;

      const newData = {
        id: Date.now(),
        document_type: documentType,
        document_number: documentNumber,
        document_files: uploadedUrl,
      };

      setUploadedData((prev) => [...prev, newData]);
      setAdminFormUploadData((prev) => [...prev, newData]);

      // Reset
      setDocumentType("");
      setDocumentNumber("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const removeDocument = (id) => {
    setUploadedData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Document Type */}
      <CustomSelect
        label="Type of Document"
        options={documentOptions}
        value={documentType}
        onChange={setDocumentType}
        onCreate={handleCreateDocumentType}
        allowCreate
        showOther
        otherLabel="Other"
      />

      {/* Document Number */}
      <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
        <FaRegIdCard className="mr-2 text-gray-400" />
        <input
          type="text"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          placeholder="Enter document number"
          className="w-full outline-none"
        />
      </div>

      {/* File Input */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="relative flex-1 flex items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-[#3170A6] transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <span className="text-gray-400 text-sm truncate">
            {image ? image.name : "Choose document file"}
          </span>

          <span className="bg-[#3170A6] text-white text-sm px-4 py-1.5 rounded-lg">
            Browse
          </span>
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!documentType || !documentNumber || !image || loading}
          className={`px-5 py-2 rounded-xl text-white font-medium transition
            ${
              !documentType || !documentNumber || !image
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#112C4B] hover:bg-[#0d2138]"
            }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Preview before upload */}
      {image && (
        <div className="mt-2">
          <img
            src={image.preview}
            alt="preview"
            className="w-20 h-20 object-cover rounded border"
          />
        </div>
      )}

      {/* Uploaded list */}
      {uploadedData?.length > 0 && (
        <div className="space-y-2 mt-3">
          {uploadedData?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex -space-x-2">
                  <img
                    src={item.document_files}
                    alt="preview"
                    className="w-10 h-10 object-cover rounded border-2 border-white shadow-sm"
                  />
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.document_type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.document_number}
                  </p>
                  <p className="text-xs text-gray-500">1 file(s)</p>
                </div>
              </div>

              <button
                onClick={() => removeDocument(item.id)}
                className="mt-2 sm:mt-0 text-sm px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDocumentUpload;
