import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { FaRegIdCard } from "react-icons/fa";

const DocumentUpload = () => {
  const [documentType, setDocumentType] = useState("");
  const [documentOptions, setDocumentOptions] = useState([
    "NID",
    "Passport",
    "Driving License",
  ]);

  const [documentNumber, setDocumentNumber] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);

  console.log(uploadedData);

  const handleCreateDocumentType = (newType) => {
    setDocumentOptions((prev) => [...prev, newType]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(previewFiles);
  };

  const handleUpload = () => {
    if (!documentType || !documentNumber || images.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const newData = {
      id: Date.now(),
      documentType,
      documentNumber,
      images,
    };

    setUploadedData((prev) => [...prev, newData]);

    // reset
    setDocumentType("");
    setDocumentNumber("");
    setImages([]);
  };

  return (
    <div className=" space-y-2 ">
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
      <div>
        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
          <FaRegIdCard className="mr-2 text-gray-400" />
          <input
            type="number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder="Enter document number"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Upload Box */}
      <div className="flex items-center gap-2 ">
        <div className="relative flex flex-3  items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-[#3170A6] transition">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <span className="text-gray-400 text-sm truncate">
            {images.length > 0
              ? `${images.length} file selected`
              : "Upload Document"}
          </span>

          <span className="bg-[#3170A6] text-white text-sm px-4 py-1.5 rounded-lg">
            Browse
          </span>
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUpload}
          className="w-auto cursor-pointer px-4 bg-[#112C4B] text-white py-2 rounded-xl"
        >
          Upload
        </button>
      </div>

      {/* Show Uploaded Data */}
      {uploadedData.length > 0 && (
        <div className="mt-6 space-y-3">
          {uploadedData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-sm transition"
            >
              {/* Left Side Info */}
              <div className="flex items-center gap-4">
                {/* Small Thumbnail */}
                <div className="flex -space-x-2">
                  {item.images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img.preview}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg border border-white shadow"
                    />
                  ))}
                  {item.images.length > 3 && (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-xs rounded-lg border">
                      +{item.images.length - 3}
                    </div>
                  )}
                </div>

                {/* Document Info */}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.documentType}
                  </p>
                  <p className="text-xs text-gray-500">{item.documentNumber}</p>
                </div>
              </div>

              {/* Right Side Action */}
              <button
                onClick={() =>
                  setUploadedData((prev) =>
                    prev.filter((data) => data.id !== item.id),
                  )
                }
                className="text-xs cursor-pointer px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
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

export default DocumentUpload;
