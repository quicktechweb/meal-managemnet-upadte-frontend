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

            <div className="flex gap-4 mb-4">
              {/* User Type & Kitchen */}
              <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-bold text-blue-600 mb-1">
                  Account Type
                </p>
                <span className="block font-medium capitalize">
                  {singlePendingInstituteUser?.services?.user_type?.title ||
                    "N/A"}
                </span>
              </div>
              <div className="flex-1 p-3 bg-indigo-50 rounded-lg">
                <p className="text-xs font-bold text-indigo-600 mb-1">
                  Kitchen Type
                </p>
                <span className="block font-medium">
                  {singlePendingInstituteUser?.services?.kitchen_type?.title ||
                    "N/A"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              {/* Utility Bills */}
              <div className="flex-1 p-3 bg-green-50 rounded-lg">
                <p className="text-xs font-bold text-green-600 mb-2">
                  Utility Services
                </p>
                {singlePendingInstituteUser?.services?.utility_bills?.length >
                0 ? (
                  singlePendingInstituteUser.services.utility_bills.map(
                    (bill, i) => (
                      <div key={i} className="flex flex-col mb-1">
                        <span className="font-medium text-sm">{bill.name}</span>
                        {bill?.bear_the_cost?.title && (
                          <span className="text-xs text-gray-400">
                            Bear by: {bill.bear_the_cost.title}
                          </span>
                        )}
                      </div>
                    ),
                  )
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </div>

              {/* Service Features */}
              <div className="flex-1 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs font-bold text-purple-600 mb-2">
                  Service Features
                </p>
                {singlePendingInstituteUser?.services?.service_features
                  ?.length > 0 ? (
                  singlePendingInstituteUser.services.service_features.map(
                    (f, i) => (
                      <span key={i} className="block font-medium text-sm">
                        {f.name}
                      </span>
                    ),
                  )
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </div>
            </div>

            {/* Charges */}
            {singlePendingInstituteUser?.services?.charges?.length > 0 && (
              <div className="p-3 bg-orange-50 rounded-lg mb-4">
                <p className="text-xs font-bold text-orange-600 mb-2">
                  Charge Breakdown
                </p>
                <div className="flex flex-col gap-1">
                  {singlePendingInstituteUser.services.charges.map(
                    (charge, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-600">
                          {charge.charge_generate}
                        </span>
                        <span className="font-bold text-gray-800">
                          ৳ {charge.price}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-3 rounded-xl">
              <p className="text-sm text-gray-400">Total Monthly Amount</p>
              <p className="text-xl font-black">
                ৳ {singlePendingInstituteUser?.services?.total_amount || 0}
              </p>
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
                  {singlePendingInstituteUser?.roles?.map((p, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px]"
                    >
                      {p}
                    </span>
                  ))}
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
              {singlePendingInstituteUser?.admin_info?.documents_admin?.length >
                0 && (
                <img
                  src={
                    singlePendingInstituteUser?.admin_info?.documents_admin[0]
                      .document_files
                  }
                  alt="Admin NID"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePendingInstituteUser;
