import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useAllBanner,
  useChooseusLists,
  useDeletebanner,
} from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ChooseUsLists = () => {
  const { data } = useChooseusLists();

  const { mutateAsync, isPending } = useDeletebanner();

  const handleDelete = async (banner) => {
    await mutateAsync(banner?._id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg md:text-xl font-bold">All Choose-us Data</h4>
        <Link
          to="/admin/dashboard/add-banner"
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add Data
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full border border-gray-300 rounded-xl ">
          <thead className="bg-gray-100 text-gray-700 text-sm border-b border-gray-300">
            <tr className="bg-gray-50">
              <th className="px-3 md:px-4 py-3 text-left">Title</th>
              <th className="px-3 md:px-4 py-3 text-left">Description</th>
              <th className="px-3 md:px-4 py-3 text-center">Created</th>
              <th className="px-3 md:px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No Banner found
                </td>
              </tr>
            )}
            {data?.map((banner) => (
              <tr
                key={banner._id}
                className="border-t border-gray-300 bg-gray-50 transition"
              >
                {/* Title */}
                <td className="px-3 md:px-4 py-3 font-medium max-w-[250px] border-r border-gray-300 ">
                  <p className="line-clamp-2">{banner.title}</p>
                </td>

                {/* Description */}
                <td className="px-3 md:px-4 py-3  border-r border-gray-300 text-sm text-gray-600 max-w-[250px]">
                  <p className="line-clamp-2">{banner.description}</p>
                </td>

                {/* Date */}
                <td className="px-3 md:px-4  text-xs md:text-sm text-center  border-r border-gray-300">
                  {new Date(banner.createdAt).toDateString()}
                </td>

                {/* Action */}
                <td className="px-3 md:px-4 py-3">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <Link
                      to={`/admin/dashboard/update-banner/${banner._id}`}
                      className=" text-violet-600 transition"
                    >
                      <FiEdit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(banner)}
                      disabled={isPending}
                      className=" text-red-500 transition cursor-pointer"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChooseUsLists;
