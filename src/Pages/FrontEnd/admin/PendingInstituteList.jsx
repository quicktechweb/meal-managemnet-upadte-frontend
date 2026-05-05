import React from "react";
import { Link } from "react-router-dom";

const PendingInstituteList = ({ users = [] }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
          Institute Lists
        </h2>

        {/* ================= MOBILE CARD UI ================= */}
        <div className="block md:hidden space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {user.information.name_of_institute}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {user.information.district}, {user.information.division}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      user.approval_status === "pending" &&
                      "bg-yellow-100 text-yellow-700"
                    } ${
                      user.approval_status === "approved" &&
                      "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.approval_status}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {user.admin_info.email_admin || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {user.admin_info.phone_admin || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs ml-1">
                      {user.information.instituteType}
                    </span>
                  </p>
                </div>

                {/* Action */}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/admin/dashboard/institute-user/${user._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No institutes found
            </div>
          )}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">Institute Name</th>
                <th className="py-3 px-6 text-left">Admin Email</th>
                <th className="py-3 px-6 text-left">Admin Phone</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <div className="font-medium text-gray-800">
                        {user.information.name_of_institute}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.information.district}, {user.information.division}
                      </div>
                    </td>

                    <td className="py-3 px-6">
                      {user.admin_info.email_admin || "N/A"}
                    </td>

                    <td className="py-3 px-6">
                      {user.admin_info.phone_admin || "N/A"}
                    </td>

                    <td className="py-3 px-6 text-center">
                      <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs">
                        {user.information.instituteType}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          user.approval_status === "pending" &&
                          "bg-yellow-100 text-yellow-700"
                        } ${
                          user.approval_status === "approved" &&
                          "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.approval_status}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-center">
                      <Link
                        to={`/admin/dashboard/institute-user/${user._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-xs"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No institutes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingInstituteList;
