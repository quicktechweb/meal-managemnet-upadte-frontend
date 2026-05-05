import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useChooseusBanner,
  useDeleteChooseusbanner,
} from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ChooseUsLists from "./ChooseUsLists";

const ChooseUs = () => {
  const { data } = useChooseusBanner();
  const { mutateAsync, isPending } = useDeleteChooseusbanner();

  const handleDelete = async (banner) => {
    await mutateAsync(banner?._id);
  };

  return (
    <div className="p-3 md:p-4 flex flex-col gap-6">
      {/* ================= BANNER SECTION ================= */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg md:text-xl font-bold">Banner</h4>

          <Link
            to="/admin/dashboard/add-choose-us-banner"
            className="inline-flex items-center gap-2 px-3 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-xs md:text-sm"
          >
            <Plus size={16} />
            Add
          </Link>
        </div>

        {/* ===== DESKTOP TABLE ===== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-xl">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border border-gray-300 text-center">
                  Banner
                </th>
                <th className="p-3 border border-gray-300 text-center">
                  Created
                </th>
                <th className="p-3 border border-gray-300 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No Banner found
                  </td>
                </tr>
              )}

              {data?.map((banner) => (
                <tr
                  key={banner._id}
                  className="border-t border-gray-300 text-sm"
                >
                  <td className="p-3 border border-gray-300 text-center">
                    <img
                      src={banner.banner_image}
                      alt=""
                      className="w-16 h-10 object-cover rounded mx-auto"
                    />
                  </td>

                  <td className="p-3 border border-gray-300 text-center">
                    {new Date(banner.createdAt).toLocaleString("en-BD", {
                      timeZone: "Asia/Dhaka",
                    })}
                  </td>

                  <td className="p-3 border border-gray-300">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/dashboard/update-choose-us-banner/${banner._id}`}
                      >
                        <FiEdit className="text-lg hover:text-violet-600" />
                      </Link>

                      <button
                        onClick={() => handleDelete(banner)}
                        disabled={isPending}
                      >
                        <MdDelete className="text-lg hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== MOBILE CARD ===== */}
        <div className="md:hidden space-y-3">
          {data?.length === 0 && (
            <p className="text-center py-4">No Banner found</p>
          )}

          {data?.map((banner) => (
            <div
              key={banner._id}
              className="bg-white border border-gray-300 rounded-xl shadow-sm p-3"
            >
              {/* Image */}
              <img
                src={banner.banner_image}
                alt=""
                className="w-full h-32 object-cover rounded-lg mb-2"
              />

              {/* Date */}
              <p className="text-xs text-gray-500">
                {new Date(banner.createdAt).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                })}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-3">
                <Link
                  to={`/admin/dashboard/update-choose-us-banner/${banner._id}`}
                >
                  <FiEdit className="text-lg hover:text-violet-600" />
                </Link>

                <button
                  onClick={() => handleDelete(banner)}
                  disabled={isPending}
                >
                  <MdDelete className="text-lg hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LIST SECTION ================= */}
      <ChooseUsLists />
    </div>
  );
};

export default ChooseUs;
