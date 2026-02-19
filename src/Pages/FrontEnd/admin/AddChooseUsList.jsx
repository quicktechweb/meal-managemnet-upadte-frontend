import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Type } from "lucide-react";
import { useCreateBanner } from "../../../api/admin/admin.api";

const AddChooseUsList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync, isPending } = useCreateBanner();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedbannerImage, setSelectedbannerImage] = useState(null);
  const [selectedImagefile, setSeletedImagefile] = useState(null);
  const [selectedbannerImagefile, setSelectedbannerImagefile] = useState(null);
  const handlebannerImageChange = (e) => {
    setSelectedbannerImagefile(e.target.files[0]);

    setSelectedbannerImage(e.target.files[0]?.name);
  };

  const handleimageChange = (e) => {
    setSeletedImagefile(e.target.files[0]);

    setSelectedImage(e.target.files[0]?.name);
  };

  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("title", data.title);

    formdata.append("description", data.description);

    formdata.append("banner_bg", selectedImagefile);

    formdata.append("banner_image", selectedbannerImagefile);

    try {
      await mutateAsync(formdata);

      reset();
      setSelectedImage(null);
      setSelectedbannerImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Choose-us Data</h2>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="e.g. Making the Perfect Sourdough"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Description
          </label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            placeholder="e.g. Making the Perfect Sourdough"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {isPending ? "uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AddChooseUsList;
