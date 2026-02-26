import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useCreateWebsite,
  useGetWebsiteData,
} from "../../../api/admin/admin.api";
import axios from "axios";

const WebsiteSettings = () => {
  const { data: websiteData } = useGetWebsiteData();

  console.log(websiteData);

  const { mutateAsync } = useCreateWebsite();

  const [logo, setLogo] = useState(null);

  const [favIcon, setFavIcon] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      siteName: "",
      tagline: "",
      logoUrl: "",
      faviconUrl: "",
      email: "",
      phone: "",
      address: "",
      // socialLinks: {
      //   facebook: "",
      //   twitter: "",
      //   instagram: "",
      //   linkedin: "",
      // },
    },
  });

  useEffect(() => {
    if (websiteData) {
      reset(websiteData);
    }
  }, [websiteData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("siteName", data?.siteName);
    formData.append("tagline", data?.tagline);
    formData.append("logoUrl", logo ? logo : data?.logoUrl);
    formData.append("faviconUrl", favIcon ? favIcon : data?.faviconUrl);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("address", data?.address);

    await mutateAsync(formData);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleFavIcon = (e) => {
    const file = e.target.files[0];
    setFavIcon(file);
  };

  return (
    <div className=" w-full p-6 bg-white shadow rounded ">
      <h2 className="text-2xl font-bold mb-6">Website Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block font-medium">Site Name *</label>
          <input
            type="text"
            {...register("siteName", { required: true })}
            placeholder="Enter the Site Name"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Tagline</label>
          <input
            type="text"
            {...register("tagline")}
            placeholder="Enter the Tagline"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Upload Website Logo</label>
          <input
            type="file"
            onChange={handleLogo}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {websiteData?.logoUrl && (
            <img
              className="w-[100px] mt-2.5"
              src={websiteData?.logoUrl}
              alt={websiteData?.siteName}
            />
          )}
        </div>

        <div>
          <label className="block font-medium">Upload Website Favicon</label>
          <input
            type="file"
            onChange={handleFavIcon}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {/* fav preview */}

          {websiteData?.faviconUrl && (
            <img
              className="w-[100px] mt-2.5"
              src={websiteData?.faviconUrl}
              alt={websiteData?.siteName}
            />
          )}
        </div>

        {/* Contact Info */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Contact Info</h3>

        <div>
          <label className="block font-medium">Email *</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter the Email"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            {...register("phone")}
            placeholder="Enter the Phone"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            type="text"
            {...register("address")}
            placeholder="Enter the Address"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Social Links */}
        {/* <h3 className="text-xl font-semibold mt-6 mb-2">Social Links</h3>

        {["facebook", "twitter", "instagram", "linkedin"].map((key) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key}</label>
            <Controller
              name={`socialLinks.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={`Enter ${key} Url`}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                />
              )}
            />
          </div>
        ))} */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default WebsiteSettings;
