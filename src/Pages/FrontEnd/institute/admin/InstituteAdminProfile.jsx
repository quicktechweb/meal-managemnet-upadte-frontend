import React, { useState } from "react";
import {
  Phone,
  Mail,
  Edit3,
  X,
  User,
  MapPin,
  Calendar,
  BookOpen,
} from "lucide-react";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";

import { useAllKitchen } from "../../../../api/admin/admin.api";
import { Link } from "react-router-dom";

const InstituteAdminProfile = () => {
  const { data } = useAllKitchen();

  const { user } = useInstituteAuth();

  const me = user?.user;

  console.log(me);

  const kitchenType = data?.find(
    (item) => item._id === me?.services?.kitchen_type,
  );

  if (!me) return null;

  return (
    <div className="p-3 lg:p-6 bg-gray-50 min-h-screen antialiased text-gray-800">
      {/* Header */}
      <div className=" mx-auto mb-4 flex justify-between items-center">
        <div>
          <h4 className="text-xl lg:text-3xl font-extrabold text-gray-900">
            Account Profile
          </h4>
          <p className="text-xs lg:text-base text-gray-500">
            View and manage your personal identity and records.
          </p>
        </div>

        <Link
          to={`/institute/dashboard/profile-update/${me?._id}`}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 cursor-pointer"
        >
          <Edit3 size={16} />
          Edit Profile
        </Link>
      </div>

      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
            <img
              src={"https://api.dicebear.com/7.x/avataaars/svg?seed=Institute"}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-indigo-50"
            />

            <h2 className="text-xl font-bold mt-3">
              {me?.information?.name_of_institute}
            </h2>

            <p className="text-indigo-600 text-sm">
              @{me?.information?.username}
            </p>

            <div className="w-full mt-5 pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} />
                <span>{me?.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} />
                <span>{me?.phone}</span>
              </div>
            </div>
          </div>

          {/* Institute Info */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BookOpen size={18} /> Institute Info
            </h3>

            <InfoItem
              label="Institute Type"
              value={me?.information?.instituteType}
            />

            <InfoItem
              label="Total Members"
              value={me?.information?.number_of_member}
            />

            <InfoItem label="Country" value={me?.information?.country} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-3 border-gray-200">
              <User size={18} /> Admin Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoItem
                label="Date of Birth"
                value={me?.admin_info?.date_of_birth}
                icon={<Calendar size={14} />}
              />

              <InfoItem
                label="Admin Email"
                value={me?.admin_info?.email_admin}
              />

              <InfoItem
                label="Admin Phone"
                value={me?.admin_info?.phone_admin}
              />

              <InfoItem
                label="Division"
                value={me?.admin_info?.division_admin}
              />

              <InfoItem
                label="District"
                value={me?.admin_info?.district_admin}
              />

              <InfoItem label="Village" value={me?.admin_info?.village_admin} />
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-3 border-gray-200">
              <MapPin size={18} /> Address
            </h3>

            <p className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
              {me?.information?.location}
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold mb-2">Institute Document</p>
              <img
                src={me?.information.documents[0].document_files}
                alt="NID"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold mb-2">Admin Document</p>
              {me?.admin_info?.documents_admin?.length > 0 && (
                <img
                  src={me?.admin_info?.documents_admin[0]?.document_files}
                  alt="Admin NID"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* service */}

      <div className=" mx-auto my-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header Section */}
        <div className="mb-8 border-b border-gray-100 pb-5 flex items-center justify-between">
          <div>
            <h4 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
              Manage Your Service
            </h4>
            <p className="text-gray-500 mt-1">
              View and oversee your active utility subscriptions.
            </p>
          </div>

          <div>
            <Link
              to={`/institute/dashboard/service-update/${me?._id}`}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 cursor-pointer"
            >
              <Edit3 size={16} />
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h5 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-4">
              Your Utility Services
            </h5>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Account Type
                </p>
                <p className="text-lg font-bold text-gray-800 capitalize">
                  {me?.services?.user_type || "Standard"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Kitchen Configuration
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {kitchenType?.title || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Services & Features List */}
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active Utilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {me?.services?.utility_service?.map((service, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 border border-gray-100 rounded-lg bg-white hover:border-indigo-200 transition-colors"
                    >
                      <span className="font-semibold text-gray-800">
                        {service?.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        Standard Service
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-3">
                  Included Features
                </p>
                <div className="flex flex-wrap gap-2">
                  {me?.services?.service_feature?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100"
                    >
                      {feature?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Billing Summary */}
            <div className="mt-10 p-5 bg-gray-900 rounded-2xl text-white flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Total Monthly Amount</p>
                <h4 className="text-3xl font-bold">
                  ${me?.services?.total_amount}
                </h4>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InstituteAdminProfile;

const InfoItem = ({ label, value, icon }) => (
  <div>
    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
      {icon}
      {label}
    </div>

    <p className="text-gray-900 font-semibold">{value || "N/A"}</p>
  </div>
);
