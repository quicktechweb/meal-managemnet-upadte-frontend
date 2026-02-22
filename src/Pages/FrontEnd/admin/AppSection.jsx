import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAllAppData, useDeletebanner } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const AppSection = () => {
  const { data } = useAllAppData();

  console.log(data);

  const { mutateAsync, isPending } = useDeletebanner();

  const handleDelete = async (banner) => {
    await mutateAsync(banner?._id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg md:text-xl font-bold">App Section List</h4>
        <Link
          to="/admin/dashboard/add-app-section"
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add App Section
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full border border-gray-300 rounded-xl ">
          <thead className="bg-gray-100 text-gray-700 text-sm border-b border-gray-300">
            <tr>
              <th className="px-3 md:px-4 py-3 text-left">Title</th>
              <th className="px-3 md:px-4 py-3 text-left">Description</th>
              <th className="px-3 md:px-4 py-3 text-center">Background</th>
              <th className="px-3 md:px-4 py-3 text-center">Banner</th>
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
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                {/* Title */}
                <td className="px-3 md:px-4 py-3 font-medium max-w-[250px] border-r border-gray-300 ">
                  <p className="line-clamp-2">{banner.title}</p>
                </td>

                {/* Description */}
                <td className="px-3 md:px-4 py-3  border-r border-gray-300 text-sm text-gray-600 max-w-[250px]">
                  <p
                    dangerouslySetInnerHTML={{ __html: banner.description }}
                    className="[&_h1]:text-xl [&_h2]:text-xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside line-clamp-2"
                  />
                </td>

                {/* Background Image */}
                <td className="px-3 md:px-4 py-3  border-r border-gray-300">
                  <img
                    src={banner.bg_app}
                    alt={banner.title}
                    className="w-24 md:w-28 h-14 md:h-16 object-cover rounded-lg mx-auto"
                  />
                </td>

                {/* Banner Image */}
                <td className="px-3 md:px-4 py-3  border-r border-gray-300">
                  <img
                    src={banner.img_app}
                    alt={banner.title}
                    className="w-20 object-cover rounded-lg mx-auto"
                  />
                </td>

                {/* Date */}
                <td className="px-3 md:px-4  text-xs md:text-sm text-center  border-r border-gray-300">
                  {new Date(banner.createdAt).toDateString()}
                </td>

                {/* Action */}
                <td className="px-3 md:px-4 py-3">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <Link
                      to={`/admin/dashboard/update-app-section/${banner._id}`}
                      className="p-2 rounded-lg hover:bg-violet-100 text-violet-600 transition"
                    >
                      <FiEdit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(banner)}
                      disabled={isPending}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition cursor-pointer"
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

export default AppSection;
