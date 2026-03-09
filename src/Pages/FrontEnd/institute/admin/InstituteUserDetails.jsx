import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useApprovedInstitute } from "../../../../api/admin/admin.api";
import { useInstituteUserList } from "../../../../api/cms/user.hook";

const InstituteUserDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const { data } = useInstituteUserList();
  const singlePendingInstituteUser = data?.find(
    (institute) => institute._id === id,
  );

  console.log(singlePendingInstituteUser);

  const { mutateAsync, isPending } = useApprovedInstitute();

  const handleApprove = async () => {
    const payload = {
      userId: id,
      status: "approved",
    };
    await mutateAsync({ ...payload });
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Area */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={handleBack}
            className="text-blue-600 cursor-pointer hover:underline text-xs flex items-center gap-2"
          >
            ← Back to List
          </button>
          <div className="flex gap-3">
            {/* <button className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition font-semibold text-xs">
              Reject
            </button> */}
            <button
              onClick={handleApprove}
              className="bg-green-800 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-green-700 transition font-semibold text-xs"
            >
              {isPending ? "Approving..." : "Approve User"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1  gap-3">
          {/* Institute Information */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-blue-800 border-b pb-2">
              User Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Name
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.full_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Gender
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Religion
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.religion}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Occupation
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.occupation}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Designation
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.designation}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Company
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.company}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Designation
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.designation}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Year
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information?.year}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Father Name
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.father_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Mother Name
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.mother_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Guardian Name
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.guardian_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Guardian Number
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.guardian_phone}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Relation With Guardian
                </p>
                <p className="font-semibold">
                  {
                    singlePendingInstituteUser?.information
                      .relation_with_guardian
                  }
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Username
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.username}
                </p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Country
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.country},{" "}
                  {singlePendingInstituteUser?.information.division}
                </p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Address
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.village},{" "}
                  {singlePendingInstituteUser?.information.district}
                </p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-3">
                  Documents
                </p>
                <div className="grid grid-cols-1  gap-6">
                  {singlePendingInstituteUser?.information?.documents?.map(
                    (doc, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
                      >
                        {/* Document Image */}
                        <div className="w-full h-40 mb-4 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={doc.document_files}
                            alt="document"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Document Info */}
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-sm text-gray-500">
                              Document Type
                            </h3>
                            <p className="text-base font-semibold text-gray-800">
                              {doc.document_type}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm text-gray-500">
                              Document Number
                            </h3>
                            <p className="text-base font-medium text-gray-700">
                              {doc.document_number}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          {/* <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold mb-2">Institute Document (NID)</p>
              <img
                src={
                  singlePendingInstituteUser?.information.documents[0]
                    .document_files
                }
                alt="NID"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold mb-2">Admin Document (NID)</p>

              <img
                src={
                  singlePendingInstituteUser?.admin_info?.documents_admin[0]
                    .document_files
                }
                alt="Admin NID"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InstituteUserDetails;
