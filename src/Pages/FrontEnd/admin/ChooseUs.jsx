import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useChooseusBanner,
  useDeletebanner,
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
    <div className="choose-us-container flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg md:text-xl font-bold">Banner</h4>
          <Link
            to="/admin/dashboard/add-choose-us-banner"
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
          >
            <Plus size={18} />
            Add Banner
          </Link>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full border border-gray-300 rounded-xl ">
            <thead className="bg-gray-100 text-gray-700 text-sm border-b border-gray-300">
              <tr className="bg-gray-50 ">
                <th className="px-3 md:px-4 py-3 text-center">Banner</th>
                <th className="px-3 md:px-4 py-3 text-center">Created</th>
                <th className="px-3 md:px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center bg-gray-50 text-gray-500 py-4"
                  >
                    No Banner found
                  </td>
                </tr>
              )}
              {data?.map((banner) => (
                <tr
                  key={banner._id}
                  className="border-t border-gray-300 bg-gray-50 transition"
                >
                  {/* Banner Image */}
                  <td className="px-3 md:px-4 py-3  border-r border-gray-300">
                    <img
                      src={banner.banner_image}
                      alt={"banner image"}
                      className="w-10 object-cover rounded-lg mx-auto"
                    />
                  </td>

                  {/* Date */}
                  <td className="px-3 md:px-4  text-xs md:text-sm text-center  border-r border-gray-300">
                    {new Date(banner.createdAt).toLocaleString()}
                  </td>

                  {/* Action */}
                  <td className="px-3 md:px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/dashboard/update-choose-us-banner/${banner._id}`}
                        className=" rounded-lg  text-violet-600 transition"
                      >
                        <FiEdit size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(banner)}
                        disabled={isPending}
                        className=" rounded-lg  text-red-500 transition cursor-pointer"
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

      <ChooseUsLists />
    </div>
  );
};

export default ChooseUs;
