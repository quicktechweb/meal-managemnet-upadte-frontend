import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Type, Film } from "lucide-react";
import {
  useAddChooseusLists,
  useCreateItem,
} from "../../../api/admin/admin.api";
import RichTextEditor from "../../../Components/RichTextEditor";

const AddItem = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImagefile, setSeletedImagefile] = useState(null);
  const [selectedVideofile, setSelectedVideofile] = useState(null);
  const handlevideoChange = (e) => {
    setSelectedVideofile(e.target.files[0]);

    setSelectedVideo(e.target.files[0]?.name);
  };

  const handleimageChange = (e) => {
    setSeletedImagefile(e.target.files[0]);

    setSelectedImage(e.target.files[0]?.name);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { mutateAsync, isPending } = useCreateItem();

  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("title", data.title);
    formdata.append("price", data.price);
    formdata.append("ingridents", data.ingridents);
    formdata.append("image", selectedImagefile);

    try {
      await mutateAsync(formdata);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Item</h2>
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
            placeholder="e.g. vat"
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
            <Type size={16} /> Price
          </label>
          <input
            {...register("price", { required: "Price is required" })}
            type="text"
            placeholder="e.g. 4"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <span className="text-red-500 text-xs">{errors.price.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Image
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

          {/* Video Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Film size={16} /> Video
            </label>
            <div className="relative group border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors bg-gray-50 text-center">
              <input
                accept="video/*"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handlevideoChange(e)}
              />
              <Upload
                className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2"
                size={24}
              />
              <span className="text-xs text-gray-500">
                {selectedVideo ? selectedVideo : "Click to upload MP4/MOV"}
              </span>
            </div>
            {errors.video && (
              <span className="text-red-500 text-xs">
                {errors.video.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Ingridients
          </label>

          <Controller
            name="ingridents"
            control={control}
            rules={{ required: "ingridients is required" }}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />

          {errors.ingridents && (
            <span className="text-red-500 text-xs">
              {errors.ingridents.message}
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

export default AddItem;
