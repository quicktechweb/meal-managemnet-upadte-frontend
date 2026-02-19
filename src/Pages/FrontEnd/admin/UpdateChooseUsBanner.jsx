import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Type } from "lucide-react";
import {
  useChooseusBanner,
  useUpdateBanner,
  useUpdateChooseusBanner,
} from "../../../api/admin/admin.api";
import { useParams } from "react-router-dom";

const UpdateChooseUsBanner = () => {
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedbannerImage, setSelectedbannerImage] = useState(null);

  const [selectedbannerImagefile, setSelectedbannerImagefile] = useState(null);
  const { data } = useChooseusBanner();

  const singleBanner = data?.find((b) => b?._id === id);

  useEffect(() => {
    if (singleBanner) {
      setSelectedbannerImage(singleBanner.banner_image || null);
    }
  }, [singleBanner, reset]);

  const { mutateAsync, isPending } = useUpdateChooseusBanner();

  const handlebannerImageChange = (e) => {
    setSelectedbannerImagefile(e.target.files[0]);

    setSelectedbannerImage(e.target.files[0]?.name);
  };

  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append(
      "banner_image",
      selectedbannerImagefile
        ? selectedbannerImagefile
        : singleBanner?.banner_image,
    );

    try {
      await mutateAsync({ id: id, payload: formdata });

      reset();
      setSelectedbannerImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-3">
        <h2 className="text-2xl font-bold text-gray-800">Update Banner</h2>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1  gap-6">
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
          className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateChooseUsBanner;
