import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Film, Image as ImageIcon, Type } from "lucide-react";
import {
  useAllLiveKitchenVideo,
  useCreateKitchenvideo,
} from "../../../api/admin/admin.api";
import { useParams } from "react-router-dom";

const UpdateLiveKitchenVideo = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: liveKitchenVideo } = useAllLiveKitchenVideo();

  const singleliveKitchenVideo = liveKitchenVideo?.find(
    (kitchenVideo) => kitchenVideo?._id === id,
  );

  const { mutateAsync, isPending } = useCreateKitchenvideo();

  // Preview + File State
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImagefile, setSeletedImagefile] = useState(null);
  const [selectedVideofile, setSelectedVideofile] = useState(null);

  // Load Old Data
  useEffect(() => {
    if (singleliveKitchenVideo) {
      reset({
        title: singleliveKitchenVideo.title,
      });

      // OLD Preview Show
      setSelectedImage(singleliveKitchenVideo.kitchen_thumbnail || null);
      setSelectedVideo(singleliveKitchenVideo.kitchen_video || null);
    }
  }, [singleliveKitchenVideo, reset]);

  // Image Change
  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSeletedImagefile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  // Video Change
  const handlevideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedVideofile(file);
    setSelectedVideo(URL.createObjectURL(file));
  };

  // Submit
  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("title", data.title);

    // Only append if new file selected
    if (selectedImagefile) {
      formdata.append("kitchen_thumbnail", selectedImagefile);
    }

    if (selectedVideofile) {
      formdata.append("kitchen_video", selectedVideofile);
    }

    try {
      await mutateAsync(formdata);

      reset();
      setSelectedImage(null);
      setSelectedVideo(null);
      setSeletedImagefile(null);
      setSelectedVideofile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Update Live Kitchen Video
        </h2>
        <p className="text-gray-500 text-sm">
          Update your live kitchen content.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Video Title
          </label>

          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Thumbnail
            </label>

            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 text-center">
              {/* Preview */}
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="thumbnail"
                  className="w-40 h-24 object-cover mx-auto mb-2 rounded"
                />
              )}

              <input
                accept="image/*"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleimageChange}
              />

              <Upload className="mx-auto text-gray-400 mb-2" size={24} />

              <span className="text-xs text-gray-500">
                Click to change thumbnail
              </span>
            </div>
          </div>

          {/* Video */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Film size={16} /> Video
            </label>

            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 text-center">
              {/* Preview */}
              {selectedVideo && (
                <video
                  src={selectedVideo}
                  controls
                  className="w-24 mx-auto mb-2 rounded"
                />
              )}

              <input
                accept="video/*"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handlevideoChange}
              />

              <Upload className="mx-auto text-gray-400 mb-2" size={24} />

              <span className="text-xs text-gray-500">
                Click to change video
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          {isPending ? "Updating..." : "Update Video"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLiveKitchenVideo;
