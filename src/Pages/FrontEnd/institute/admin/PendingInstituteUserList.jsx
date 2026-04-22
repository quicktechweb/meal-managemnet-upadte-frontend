import React from "react";
import { Link } from "react-router-dom";

const PendingInstituteUserList = ({ users }) => {
  console.log(users);

  return (
    <div className=" bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
        Institute User Lists
      </h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">s/n</th>
              <th className="py-3 px-6 text-left">Institute User Full Name</th>
              <th className="py-3 px-6 text-left">Room Number</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>

              {/* <th className="py-3 px-6 text-center">Institute Name</th> */}

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
                <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                  {user?.uid}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="font-medium text-gray-800">
                    {user.information.full_name}
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="font-medium text-gray-800">
                    {user.information.room_number
                      ? user.information.room_number
                      : "N/A"}
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  {user.email ? user.email : "N/A"}
                </td>
                <td className="py-3 px-6 text-left">
                  {user.phone ? user.phone : "N/A"}
                </td>
                {/* <td className="py-3 px-6 text-center">
                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-semibold">
                      {user.information.name_of_the_institute}
                    </span>
                  </td> */}
                <td className="py-3 px-6 text-center">
                  <span
                    className={` ${user.approval_status === "pending" && "bg-yellow-100 text-yellow-700"} ${user.approval_status === "approved" && "bg-green-100 text-green-700"}  py-1 px-3 rounded-full text-xs font-semibold animate-pulse`}
                  >
                    {user.approval_status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link
                    to={`/dashboards/single-user-institute/${user._id}`}
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
  );
};

export default PendingInstituteUserList;
