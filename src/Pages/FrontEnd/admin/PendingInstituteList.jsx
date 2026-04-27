import React from "react";
import { Link } from "react-router-dom";

const PendingInstituteList = ({ users }) => {
  return (
    <div className="bg-white p-6 min-h-screen">
      <div className=" mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
          Institute Lists
        </h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Institute Name</th>
                <th className="py-3 px-6 text-left">Admin Email</th>
                <th className="py-3 px-6 text-left">Admin Phone</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {user.information.name_of_institute}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.information.district}, {user.information.division}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {user.admin_info.email_admin
                      ? user.admin_info.email_admin
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {user.admin_info.phone_admin
                      ? user.admin_info.phone_admin
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-semibold">
                      {user.information.instituteType}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={` ${user.approval_status === "pending" && "bg-yellow-100 text-yellow-700"} ${user.approval_status === "approved" && "bg-green-100 text-green-700"}  py-1 px-3 rounded-full text-xs font-semibold animate-pulse`}
                    >
                      {user.approval_status}
                    </span>
                  </td>
                  <td className="py-3 px-6 ">
                    <Link
                      to={`/admin/dashboard/institute-user/${user._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-xs whitespace-nowrap transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingInstituteList;
