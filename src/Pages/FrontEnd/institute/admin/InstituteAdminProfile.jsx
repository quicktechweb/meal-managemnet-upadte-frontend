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
import { useUpdateInstituteProfileInfo } from "../../../../api/cms/user.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const InstituteAdminProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useInstituteAuth();

  const me = user?.user;

  console.log(me);

  if (!me) return null;

  return (
    <div className="p-3 lg:p-6 bg-gray-50 min-h-screen antialiased text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
        <div>
          <h4 className="text-xl lg:text-3xl font-extrabold text-gray-900">
            Account Profile
          </h4>
          <p className="text-xs lg:text-base text-gray-500">
            View and manage your personal identity and records.
          </p>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 cursor-pointer"
        >
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
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
              <p className="font-bold mb-2">Institute Document (NID)</p>
              <img
                src={me?.information.documents[0].document_files}
                alt="NID"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold mb-2">Admin Document (NID)</p>

              <img
                src={me?.admin_info?.documents_admin[0].document_files}
                alt="Admin NID"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal me={me} onClose={() => setShowEditModal(false)} />
      )}
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

/* ============================
        EDIT PROFILE MODAL
============================ */

const EditProfileModal = ({ me, onClose }) => {
  const [formData, setFormData] = useState({
    instituteType: me?.information?.instituteType || "",
    name_of_institute: me?.information?.name_of_institute || "",
    number_of_member: me?.information?.number_of_member || "",
    username: me?.information?.username || "",
    country: me?.information?.country || "",
    state: me?.information?.state || "",
    division: me?.information?.division || "",
    district: me?.information?.district || "",
    village: me?.information?.village || "",
    location: me?.information?.location || "",
    documents: me?.information?.documents || [],
    password: me?.information?.password,
  });

  const { mutateAsync, isPending } = useUpdateInstituteProfileInfo();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentChange = (index, field, value) => {
    const updatedDocs = [...formData.documents];

    updatedDocs[index][field] = value;

    setFormData({
      ...formData,
      documents: updatedDocs,
    });
  };

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [
        ...formData.documents,
        {
          document_type: "",
          document_number: "",
          document_files: "",
        },
      ],
    });
  };

  const removeDocument = (index) => {
    const updatedDocs = formData.documents.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      documents: updatedDocs,
    });
  };
  const query = useQueryClient();
  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      information: formData,
    };

    await mutateAsync(
      { id: me?._id, payload: { ...payload } },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.data?.message);
            query.invalidateQueries(["instituteUserData"]);
            onClose();
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
          console.log(err);
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold">Edit Institute Information</h3>

          <button className="cursos-pointer" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-4">
          <InputField
            label="Institute Type"
            name="instituteType"
            value={formData.instituteType}
            onChange={handleChange}
          />

          <InputField
            label="Institute Name"
            name="name_of_institute"
            value={formData.name_of_institute}
            onChange={handleChange}
          />

          <InputField
            label="Total Members"
            name="number_of_member"
            value={formData.number_of_member}
            onChange={handleChange}
          />

          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <InputField
            label="Division"
            name="division"
            value={formData.division}
            onChange={handleChange}
          />

          <InputField
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />

          <InputField
            label="Village"
            name="village"
            value={formData.village}
            onChange={handleChange}
          />

          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            isTextArea
          />

          {/* DOCUMENTS */}
          <div className="pt-6">
            <h4 className="font-semibold mb-4">Documents</h4>

            {formData.documents.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-3 grid md:grid-cols-3 gap-3"
              >
                <InputField
                  label="Document Type"
                  value={doc.document_type}
                  onChange={(e) =>
                    handleDocumentChange(index, "document_type", e.target.value)
                  }
                />

                <InputField
                  label="Document Number"
                  value={doc.document_number}
                  onChange={(e) =>
                    handleDocumentChange(
                      index,
                      "document_number",
                      e.target.value,
                    )
                  }
                />

                <InputField
                  label="Document File URL"
                  value={doc.document_files}
                  onChange={(e) =>
                    handleDocumentChange(
                      index,
                      "document_files",
                      e.target.value,
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addDocument}
              className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg"
            >
              Add Document
            </button>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 cursor-pointer rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg"
            >
              {isPending ? "Upadating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ==============================
        INPUT FIELD
================================ */

const InputField = ({ label, name, value, onChange, isTextArea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold">{label}</label>

    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
    )}
  </div>
);
