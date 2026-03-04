import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { FaRegIdCard } from "react-icons/fa";

const DocumentUpload = ({ onDocumentsChange, initialDocuments = [] }) => {
  const [documentType, setDocumentType] = useState("");
  const [documentOptions, setDocumentOptions] = useState([
    "NID",
    "Passport",
    "Driving License",
  ]);

  const [documentNumber, setDocumentNumber] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedData, setUploadedData] = useState(initialDocuments);

  useEffect(() => {
    onDocumentsChange?.(uploadedData);
  }, [uploadedData, onDocumentsChange]);

  const handleCreateDocumentType = (newType) => {
    setDocumentOptions((prev) => [...prev, newType]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setImages(previewFiles);
  };

  const handleUpload = () => {
    if (!documentType || !documentNumber || images.length === 0) {
      alert("Please select document type, number, and at least one file");
      return;
    }

    const newData = {
      id: Date.now(),
      documentType,
      documentNumber,
      images,
    };

    setUploadedData((prev) => [...prev, newData]);

    // Reset current inputs
    setDocumentType("");
    setDocumentNumber("");
    setImages([]);
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

      {/* File Input + Upload Button */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="relative flex-1 items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-[#3170A6] transition flex ">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <span className="text-gray-400 text-sm truncate">
            {images.length > 0
              ? `${images.length} file${images.length > 1 ? "s" : ""} selected`
              : "Choose document file(s)"}
          </span>
          <span className="bg-[#3170A6] text-white text-sm px-4 py-1.5 rounded-lg">
            Browse
          </span>
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!documentType || !documentNumber || images.length === 0}
          className={`px-5 py-2 rounded-xl text-white font-medium transition
            ${
              !documentType || !documentNumber || images.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#112C4B] hover:bg-[#0d2138]"
            }`}
        >
          Upload
        </button>
      </div>

      {/* Uploaded list */}
      {uploadedData.length > 0 && (
        <div className="space-y-2 mt-3">
          {uploadedData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Thumbnails */}
                <div className="flex -space-x-2">
                  {item.images.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.preview}
                      alt={img.name || "preview"}
                      className="w-10 h-10 object-cover rounded border-2 border-white shadow-sm"
                    />
                  ))}
                  {item.images.length > 3 && (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-xs rounded border">
                      +{item.images.length - 3}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.documentType}
                  </p>
                  <p className="text-sm text-gray-600">{item.documentNumber}</p>
                  <p className="text-xs text-gray-500">
                    {item.images.length} file{item.images.length > 1 ? "s" : ""}
                  </p>
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

      {/* <p className="text-sm text-red-600 font-medium">
        * At least one document is required
      </p> */}
    </div>
  );
};

export default DocumentUpload;
