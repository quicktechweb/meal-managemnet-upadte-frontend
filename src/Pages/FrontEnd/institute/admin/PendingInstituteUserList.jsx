import React from "react";
import { Link } from "react-router-dom";

const PendingInstituteUserList = ({ users }) => {
  console.log(users);

  return (
    <div className="bg-white min-h-screen ">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
        Institute User Lists
      </h2>

      {/* ───── DESKTOP TABLE (md+) ───── */}
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-left">
                  s/n
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-left">
                  Full Name
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-left">
                  Room No.
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base  text-left">
                  Email
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-left">
                  Phone
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-center">
                  Status
                </th>
                <th className="py-3 xl:px-6 text-[13px] xl:text-base text-center">
                  Action
                </th>
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
                      {user.information.room_number || "N/A"}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{user.email || "N/A"}</td>
                  <td className="py-3 px-6 text-left">{user.phone || "N/A"}</td>
                  <td className="py-3 px-6 text-center">
                    <StatusBadge status={user.approval_status} />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <ViewButton id={user._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {(!users || users.length === 0) && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No users found.
        </div>
      )}
    </div>
  );
};

/* ── Shared sub-components ── */

const StatusBadge = ({ status }) => (
  <span
    className={`py-1 px-3 rounded-full text-xs font-semibold animate-pulse
      ${status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
      ${status === "approved" ? "bg-green-100 text-green-700" : ""}
    `}
  >
    {status}
  </span>
);

const ViewButton = ({ id, full = false }) => (
  <Link
    to={`/dashboards/single-user-institute/${id}`}
    className={`bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded text-xs
      whitespace-nowrap transition-colors text-center font-medium
      ${full ? "block w-full" : "inline-block"}`}
  >
    View Details
  </Link>
);

const InfoRow = ({ label, value, full = false }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-gray-700 font-medium truncate">{value}</p>
  </div>
);

export default PendingInstituteUserList;
