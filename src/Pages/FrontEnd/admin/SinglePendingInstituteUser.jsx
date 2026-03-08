import React from "react";
import {
  useApprovedInstitute,
  usePendingInstituteUser,
} from "../../../api/admin/admin.api";
import { useNavigate, useParams } from "react-router-dom";

const SinglePendingInstituteUser = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const { data } = usePendingInstituteUser();

  const singlePendingInstituteUser = data?.find(
    (institute) => institute._id === id,
  );

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Institute Information */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-blue-800 border-b pb-2">
              Institute Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold">
                  Name
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.name_of_institute}
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
                  Total Members
                </p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.information.number_of_member}
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
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4 text-blue-800 border-b pb-2">
              Services & Features
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-bold text-blue-600">
                  Utility Services
                </p>
                {singlePendingInstituteUser?.services.utility_service.map(
                  (s) => (
                    <span key={s._id} className="block font-medium">
                      {s.name}
                    </span>
                  ),
                )}
              </div>
              <div className="flex-1 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs font-bold text-purple-600">
                  Service Features
                </p>
                {singlePendingInstituteUser?.services.service_feature.map(
                  (f) => (
                    <span key={f._id} className="block font-medium">
                      {f.name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Admin Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-600">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Admin Details
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-semibold">Naymur Rahman (Admin)</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.admin_info.email_admin}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">
                  {singlePendingInstituteUser?.admin_info.phone_admin}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                  Permissions
                </p>
                <div className="flex flex-wrap gap-1">
                  {singlePendingInstituteUser?.admin_info.permission.map(
                    (p, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px]"
                      >
                        {p}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Routine & Schedule */}
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-orange-800 border-b pb-2">
              Meal Routine
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="p-2">Day</th>
                    <th className="p-2">Time Slot</th>
                    <th className="p-2">Items</th>
                    <th className="p-2 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {singlePendingInstituteUser?.routine.schedule_lists.map(
                    (sch) => (
                      <tr key={sch._id} className="border-b border-gray-300">
                        <td className="p-2 font-bold">{sch.day}</td>
                        <td className="p-2">
                          {sch.start_time} - {sch.end_time}
                        </td>
                        <td className="p-2">
                          {sch.items.map((item) => (
                            <span
                              key={item._id}
                              className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-1 text-xs"
                            >
                              {item.title} (৳{item.price})
                            </span>
                          ))}
                        </td>
                        <td className="p-2 text-right font-bold text-blue-600">
                          ৳
                          {sch.items.reduce((acc, curr) => acc + curr.price, 0)}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Documents Section */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePendingInstituteUser;
