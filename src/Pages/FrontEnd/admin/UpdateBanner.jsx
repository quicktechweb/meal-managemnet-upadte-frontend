import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Type } from "lucide-react";
import {
  useAllBanner,
  useCreateBanner,
  useUpdateBanner,
} from "../../../api/admin/admin.api";
import { useParams } from "react-router-dom";

const UpdateBanner = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedbannerImage, setSelectedbannerImage] = useState(null);
  const [selectedImagefile, setSeletedImagefile] = useState(null);
  const [selectedbannerImagefile, setSelectedbannerImagefile] = useState(null);
  const { data } = useAllBanner();

  const singleBanner = data?.find((b) => b?._id === id);

  useEffect(() => {
    if (singleBanner) {
      reset({
        title: singleBanner.title,
        description: singleBanner.description,
      });

      setSelectedImage(singleBanner.banner_bg || null);
      setSelectedbannerImage(singleBanner.banner_image || null);
    }
  }, [singleBanner, reset]);

  const { mutateAsync, isPending } = useUpdateBanner();

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

    formdata.append(
      "banner_bg",
      selectedImagefile ? selectedImagefile : singleBanner?.banner_bg,
    );

    formdata.append(
      "banner_image",
      selectedbannerImagefile
        ? selectedbannerImagefile
        : singleBanner?.banner_image,
    );

    try {
      await mutateAsync({ id: id, payload: formdata });

      reset();
      setSelectedImage(null);
      setSelectedbannerImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Add Banner</h2>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner background Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Banner background
            </label>
            <div className="relative group border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors bg-gray-50 text-center">
              <input
                accept="image/*"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleimageChange(e)}
              />
              <Upload
                className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2"
                size={24}
              />
              <span className="text-xs text-gray-500">
                {selectedImage ? selectedImage : "Click to upload JPG/PNG"}
              </span>
            </div>
            {errors.image && (
              <span className="text-red-500 text-xs">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* bannerImage Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Banner image
            </label>
            <div className="relative group border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors bg-gray-50 text-center">
              <input
                accept="image/*"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handlebannerImageChange(e)}
              />
              <Upload
                className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2"
                size={24}
              />
              <span className="text-xs text-gray-500">
                {selectedbannerImage
                  ? selectedbannerImage
                  : "Click to upload JPG/PNG"}
              </span>
            </div>
            {errors.bannerImage && (
              <span className="text-red-500 text-xs">
                {errors.bannerImage.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
