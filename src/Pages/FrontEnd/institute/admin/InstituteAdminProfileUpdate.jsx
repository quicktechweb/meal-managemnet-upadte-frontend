import React, { useState } from "react";
import { useUpdateInstituteProfileInfo } from "../../../../api/cms/user.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import { useParams } from "react-router-dom";

const InstituteAdminProfileUpdate = () => {
  const { id } = useParams();

  const { user } = useInstituteAuth();

  const me = user?.user;

  console.log(me);

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

    // admin info
    admin_email: me?.admin_info?.email_admin || "",
    date_of_birth: me?.admin_info?.date_of_birth || "",
    admin_phone: me?.admin_info?.phone_admin || "",
    admin_country: me?.admin_info?.country_admin || "",
    admin_state: me?.admin_info?.state_admin || "",
    admin_division: me?.admin_info?.division_admin || "",
    admin_district: me?.admin_info?.district_admin || "",
    admin_village: me?.admin_info?.village_admin || "",
    admin_location: me?.admin_info?.location_admin || "",
    admin_documents: me?.admin_info?.documents_admin || [],
    // admin_info: {
    //       date_of_birth: '1997-05-24',
    //       email_admin: 'naymur@gmail.com',
    //       phone_admin: '01517842345',
    //       country_admin: 'bangladesh',
    //       state_admin: 'bangladesh',
    //       division_admin: 'Dhaka',
    //       district_admin: 'Dhaka',
    //       village_admin: 'uttara',
    //       location_admin: 'uttara',
    //       permission: [
    //         'Institute Admin Panel', 'Institute User Panel', 'Institute Staff Panel', 'Institute Management Panel'
    //       ],
    //       documents_admin: [
    //         {
    //           document_type: 'NID',
    //           document_number: '12345678',
    //           document_files: 'https://i.ibb.co/gMBfFpX6/hand-with-app.png',
    //           _id: '69b7b7d042d61b4ae80e3c65'
    //         }
    //       ]
    //     },
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
            toast.success(data?.message);
            query.invalidateQueries(["instituteUserData"]);
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
    <div className="bg-white w-full ">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold">Edit Institute Information</h3>
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
                  handleDocumentChange(index, "document_number", e.target.value)
                }
              />

              <InputField
                label="Document File URL"
                value={doc.document_files}
                onChange={(e) =>
                  handleDocumentChange(index, "document_files", e.target.value)
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

        <div className="flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold">Edit Admin Information</h3>
          </div>

          <div className="p-6 space-y-4">
            <InputField
              label="Admin Email"
              name="admin_email"
              value={formData.admin_email}
              onChange={handleChange}
            />
            <InputField
              label="Admin Phone"
              name="admin_phone"
              value={formData.admin_phone}
              onChange={handleChange}
            />
            <InputField
              label="Date of Birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            {/* admin_country: me?.admin_info?.country_admin || "", admin_state:
          me?.admin_info?.state_admin || "", admin_division:
          me?.admin_info?.district_admin || "", admin_village:
          me?.admin_info?.village_admin || "", admin_location:
          me?.admin_info?.location_admin || "", admin_documents:
          me?.admin_info?.documents_admin || [],{" "} */}
            <InputField
              label="Country"
              name="admin_country"
              value={formData.admin_country}
              onChange={handleChange}
            />
            <InputField
              label="State"
              name="admin_state"
              value={formData.admin_state}
              onChange={handleChange}
            />
            <InputField
              label="Division"
              name="admin_division"
              value={formData.admin_division}
              onChange={handleChange}
            />
            <InputField
              label="District"
              name="admin_district"
              value={formData.admin_district}
              onChange={handleChange}
            />
            <InputField
              label="Village"
              name="admin_village"
              value={formData.admin_village}
              onChange={handleChange}
            />
            <InputField
              label="Location"
              name="admin_location"
              value={formData.admin_location}
              onChange={handleChange}
              isTextArea
            />
            {/* DOCUMENTS */}
            <div className="pt-6">
              <h4 className="font-semibold mb-4">Documents</h4>

              {formData.admin_documents.map((doc, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-3 grid md:grid-cols-3 gap-3"
                >
                  <InputField
                    label="Document Type"
                    value={doc.document_type}
                    onChange={(e) =>
                      handleDocumentChange(
                        index,
                        "document_type",
                        e.target.value,
                      )
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
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg"
            >
              {isPending ? "Upadating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteAdminProfileUpdate;

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
